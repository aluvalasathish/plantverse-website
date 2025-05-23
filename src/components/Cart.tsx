import { useState, useEffect, useRef } from 'react';
import { FiX, FiShoppingBag, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Set isMounted to true after component mounts for animations
  useEffect(() => {
    setIsMounted(true);
    
    // Add event listener for ESC key to close cart
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  // Handle clicks outside cart to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Disable body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Cart overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      
      {/* Cart sidebar */}
      <div 
        ref={cartRef}
        className={`fixed top-0 right-0 h-full w-full xs:w-[85%] sm:w-[400px] md:w-[450px] bg-black/90 backdrop-blur-md border-l border-white/10 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart header */}
        <div className="p-3 sm:p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <FiShoppingBag className="text-green-400" size={18} />
            <h2 className="text-base sm:text-lg font-semibold">Your Cart</h2>
            <span className="px-1.5 sm:px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] sm:text-xs rounded-full">
              {state.totalItems} items
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close cart"
          >
            <FiX size={18} />
          </button>
        </div>
        
        {/* Cart content */}
        <div className="h-[calc(100%-160px)] sm:h-[calc(100%-180px)] overflow-y-auto p-3 sm:p-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FiShoppingBag size={36} className="text-gray-500 mb-3 sm:mb-4 sm:text-[48px]" />
              <p className="text-gray-400 mb-1 sm:mb-2 text-sm sm:text-base">Your cart is empty</p>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 max-w-xs">
                Looks like you haven't added any plants to your cart yet.
              </p>
              <button 
                onClick={onClose}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full text-xs sm:text-sm font-medium transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-2 sm:gap-3 bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
                  {/* Product image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/20 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Product details */}
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-medium mb-0.5 sm:mb-1">{item.name}</h3>
                    <p className="text-green-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Rs. {item.price}/-</p>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button 
                          onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={10} className="sm:text-xs" />
                        </button>
                        
                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">{item.quantity}</span>
                        
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={10} className="sm:text-xs" />
                        </button>
                      </div>
                      
                      {/* Remove button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={14} className="sm:text-base" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Clear cart button */}
              {state.items.length > 0 && (
                <button 
                  onClick={clearCart}
                  className="w-full flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <FiTrash2 size={12} className="sm:text-sm" />
                  Clear Cart
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Cart footer */}
        {state.items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-3 sm:p-4 bg-black/70 backdrop-blur-md">
            <div className="flex justify-between mb-2 sm:mb-4 text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-medium">Rs. {state.totalPrice.toFixed(2)}/-</span>
            </div>
            <div className="flex justify-between mb-2 sm:mb-4 text-sm">
              <span className="text-gray-400">Shipping</span>
              <span className="font-medium">
                {state.totalPrice >= 999 ? 'Free' : 'Rs. 99/-'}
              </span>
            </div>
            <div className="flex justify-between mb-4 sm:mb-6">
              <span className="text-base sm:text-lg font-semibold">Total</span>
              <span className="text-base sm:text-lg font-semibold text-green-400">
                Rs. {(state.totalPrice + (state.totalPrice >= 999 ? 0 : 99)).toFixed(2)}/-
              </span>
            </div>
            <button className="w-full py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full text-sm sm:text-base font-medium transition-all">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart; 