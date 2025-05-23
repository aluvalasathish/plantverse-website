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
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-black/90 backdrop-blur-md border-l border-white/10 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FiShoppingBag className="text-green-400" size={20} />
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
              {state.totalItems} items
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close cart"
          >
            <FiX size={20} />
          </button>
        </div>
        
        {/* Cart content */}
        <div className="h-[calc(100%-180px)] overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FiShoppingBag size={48} className="text-gray-500 mb-4" />
              <p className="text-gray-400 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-500 mb-6 max-w-xs">
                Looks like you haven't added any plants to your cart yet.
              </p>
              <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full text-sm font-medium transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                  {/* Product image */}
                  <div className="w-20 h-20 bg-black/20 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Product details */}
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <p className="text-green-400 text-sm mb-2">Rs. {item.price}/-</p>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={12} />
                        </button>
                        
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                      
                      {/* Remove button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Clear cart button */}
              {state.items.length > 0 && (
                <button 
                  onClick={clearCart}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <FiTrash2 size={14} />
                  Clear Cart
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Cart footer */}
        {state.items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4 bg-black/70 backdrop-blur-md">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-medium">Rs. {state.totalPrice.toFixed(2)}/-</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-gray-400">Shipping</span>
              <span className="font-medium">
                {state.totalPrice >= 999 ? 'Free' : 'Rs. 99/-'}
              </span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold text-green-400">
                Rs. {(state.totalPrice + (state.totalPrice >= 999 ? 0 : 99)).toFixed(2)}/-
              </span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full font-medium transition-all">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart; 