import { useState } from 'react';
import { FiShoppingCart, FiArrowRight, FiHeart, FiCheck, FiExternalLink } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ProductDetail from './ProductDetail';

// Enhanced trendy plants data
const trendyPlants = [
  {
    id: 7,
    name: "Alocasia Zebrina",
    price: 1299,
    image: "flower2.png",
    description: "Known for its striking zebra-patterned stems and large arrow-shaped leaves, this tropical plant adds exotic drama to any space.",
    rating: 4.8,
    reviewCount: 94,
    badge: "Trending",
    stock: 7,
    benefits: ['Stunning zebra-patterned stems', 'Bold tropical look', 'Statement piece']
  },
  {
    id: 8,
    name: "Calathea Orbifolia",
    price: 799,
    image: "flower3.png",
    description: "Featuring large, round leaves with stunning silver and green stripes that move throughout the day. A true plant collector's favorite.",
    rating: 4.7,
    reviewCount: 87,
    badge: "Popular",
    stock: 12,
    benefits: ['Air purifying', 'Pet friendly', 'Decorative leaves']
  },
  {
    id: 9,
    name: "Philodendron Pink Princess",
    price: 1999,
    oldPrice: 2499,
    image: "flower2.png",
    description: "One of the most sought-after houseplants with stunning dark green leaves splashed with vibrant pink variegation.",
    rating: 4.9,
    reviewCount: 156,
    badge: "Rare Find",
    stock: 3,
    benefits: ['Stunning pink variegation', 'Collector\'s item', 'Fast growing']
  },
  {
    id: 10,
    name: "Hoya Kerrii",
    price: 599,
    image: "flower3.png",
    description: "The adorable heart-shaped leaf plant, perfect for adding a touch of love to any space. Low maintenance and long-lasting.",
    rating: 4.6,
    reviewCount: 78,
    badge: "Gift Favorite",
    stock: 18,
    benefits: ['Heart-shaped leaves', 'Long-lasting', 'Low maintenance']
  },
  {
    id: 11,
    name: "Pilea Peperomioides",
    price: 699,
    image: "flower2.png",
    description: "Chinese Money Plant with quirky coin-shaped leaves that brings a modern, minimalist aesthetic to any space.",
    rating: 4.8,
    reviewCount: 112,
    badge: "Bestseller",
    stock: 15,
    benefits: ['Unique coin-shaped leaves', 'Produces baby plants', 'Modern aesthetic']
  },
  {
    id: 12,
    name: "String of Pearls",
    price: 549,
    image: "flower3.png",
    description: "This succulent features cascading stems of bead-like leaves, creating a waterfall effect perfect for hanging displays.",
    rating: 4.7,
    reviewCount: 94,
    badge: null,
    stock: 9,
    benefits: ['Drought tolerant', 'Unique trailing habit', 'Space-efficient']
  }
];

// Tab options 
const tabs = [
  { id: 'trending', label: 'Trending' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'popular', label: 'Most Popular' }
];

const TrendyPlants = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [hovered, setHovered] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof trendyPlants[0] | null>(null);
  const { addToCart } = useCart();
  
  const handleProductClick = (product: typeof trendyPlants[0]) => {
    setSelectedProduct(product);
  };
  
  const handleAddToCart = (product: typeof trendyPlants[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-1/4 w-60 h-60 bg-green-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute right-0 bottom-1/4 w-60 h-60 bg-green-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold relative inline-block mb-2">
              <span className="relative z-10">Our Trendy Plants</span>
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-green-400 to-transparent"></span>
            </h2>
            <p className="text-gray-300 text-sm max-w-md">
              Explore our collection of trending plants that are taking the plant world by storm
            </p>
          </div>
          
          <a href="#" className="flex items-center gap-2 text-green-400 text-sm mt-4 md:mt-0 group transition-all">
            <span>View all</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Tab navigation */}
        <div className="flex mb-10 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm relative transition-all ${
                activeTab === tab.id 
                ? 'text-green-400 font-medium' 
                : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400"></span>
              )}
            </button>
          ))}
        </div>
        
        {/* Plants grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendyPlants.map((plant, index) => (
            <div 
              key={plant.id}
              onClick={() => handleProductClick(plant)}
              onMouseEnter={() => setHovered(plant.id)}
              onMouseLeave={() => setHovered(null)}
              className={`group cursor-pointer relative overflow-hidden transition-all duration-500 ${
                index % 2 === 0 ? 'md:translate-y-6' : ''
              }`}
            >
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 group-hover:border-green-400/30 rounded-xl p-5 transition-all duration-300 h-full flex flex-col">
                {/* Image container */}
                <div className="relative mb-4 h-48 flex items-center justify-center overflow-hidden rounded-lg">
                  {/* Badge if exists */}
                  {plant.badge && (
                    <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs py-1 px-3 rounded-full">
                      {plant.badge}
                    </div>
                  )}
                  
                  {/* Low stock indicator */}
                  {plant.stock <= 5 && (
                    <div className="absolute top-2 right-2 z-10 bg-red-500/80 text-white text-xs py-1 px-3 rounded-full">
                      Only {plant.stock} left
                    </div>
                  )}
                  
                  {/* Plant image with hover effect */}
                  <img 
                    src={plant.image} 
                    alt={plant.name}
                    className="h-full w-auto object-contain transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Quick action buttons on hover */}
                  <div className={`absolute bottom-3 left-0 right-0 flex justify-center space-x-2 transition-all duration-300 ${
                    hovered === plant.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <button 
                      onClick={(e) => handleAddToCart(plant, e)}
                      className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 rounded-full py-2 px-4 text-white text-xs flex items-center gap-2 transition-all"
                    >
                      <FiShoppingCart size={12} />
                      Add to Cart
                    </button>
                    
                    <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 rounded-full py-2 px-3 text-white text-xs transition-all">
                      <FiExternalLink size={12} />
                    </button>
                  </div>
                </div>
                
                {/* Plant details */}
                <div className="flex-grow">
                  <h3 className="font-medium text-lg mb-1 group-hover:text-green-400 transition-colors duration-300">
                    {plant.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(plant.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-gray-400">({plant.rating})</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-xs mb-4 line-clamp-2 h-10">
                    {plant.description}
                  </p>
                </div>
                
                {/* Price and action */}
                <div className="mt-auto flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">₹{plant.price}</span>
                      {plant.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">₹{plant.oldPrice}</span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-400">Free shipping</div>
                  </div>
                  
                  <button 
                    onClick={(e) => handleAddToCart(plant, e)}
                    className="w-9 h-9 bg-gradient-to-br from-green-500/80 to-green-700/80 rounded-full flex items-center justify-center hover:from-green-500 hover:to-green-700 transition-all duration-300"
                  >
                    <FiShoppingCart size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
};

export default TrendyPlants; 