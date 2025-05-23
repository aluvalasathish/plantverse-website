import { useState } from 'react';
import { FiShoppingCart, FiArrowLeft, FiHeart, FiCheck, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    image: string;
    benefits: string[];
    rating: number;
    reviewCount: number;
    stock: number;
  };
  onClose: () => void;
}

const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Product Detail Container */}
      <div className="relative bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
        >
          <FiArrowLeft size={20} />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Left Column - Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Glow effect under plant */}
              <div className="absolute bottom-0 inset-x-0 h-32 bg-green-500/20 filter blur-xl rounded-full"></div>
              
              {/* Product Image */}
              <img 
                src={product.image} 
                alt={product.name}
                className="relative z-10 h-[300px] md:h-[400px] w-auto object-contain"
              />
              
              {/* Like button */}
              <button 
                onClick={() => setLiked(!liked)}
                className="absolute top-2 right-2 w-10 h-10 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-colors"
              >
                <FiHeart 
                  size={18} 
                  className={liked ? 'fill-red-500 text-red-500' : 'text-white'} 
                />
              </button>
              
              {/* Stock indicator */}
              {product.stock <= 5 && (
                <div className="absolute top-2 left-2 bg-red-500/80 text-white text-xs py-1 px-3 rounded-full z-10">
                  Only {product.stock} left
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-400">({product.rating}) {product.reviewCount} reviews</span>
            </div>
            
            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold">Rs. {product.price}/-</span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through">Rs. {product.oldPrice}/-</span>
              )}
              {product.oldPrice && (
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-300 text-sm mb-6">{product.description}</p>
            
            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-green-400 uppercase mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-200">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <FiCheck size={14} />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="mt-auto space-y-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-400 mr-4">Quantity:</span>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      quantity <= 1 ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-black/40 hover:bg-black/60 text-white transition-colors'
                    }`}
                  >
                    <FiMinus size={14} />
                  </button>
                  
                  <span className="w-10 text-center">{quantity}</span>
                  
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      quantity >= product.stock ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-black/40 hover:bg-black/60 text-white transition-colors'
                    }`}
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <FiShoppingCart size={18} />
                  Add to Cart
                </button>
                
                <button className="py-3 px-6 border border-white/20 hover:bg-white/5 rounded-full font-medium transition-all">
                  Buy Now
                </button>
              </div>
              
              <p className="text-xs text-center text-gray-400">
                Free shipping on orders above Rs. 999
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 