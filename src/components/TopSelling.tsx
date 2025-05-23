import { useState, useRef, useEffect } from 'react';
import { FiHeart, FiShoppingCart, FiChevronLeft, FiChevronRight, FiShoppingBag, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ProductDetail from './ProductDetail';

// Enhanced product data with local images from public folder
const products = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    description: 'The iconic Swiss Cheese Plant with unique split leaves that create a dramatic tropical statement.',
    price: 1299,
    oldPrice: 1499,
    image: 'flower4.png',
    rating: 4.9,
    reviewCount: 128,
    badge: 'Bestseller',
    stock: 15,
    benefits: ['Air purifying', 'Low maintenance', 'Stunning foliage']
  },
  {
    id: 2,
    name: 'Snake Plant',
    description: 'A virtually indestructible plant with striking upright leaves, perfect for beginners and busy plant parents.',
    price: 899,
    image: 'flower5.png',
    rating: 4.7,
    reviewCount: 98,
    badge: 'Easy Care',
    stock: 8,
    benefits: ['Air purifying', 'Low light tolerant', 'Drought resistant']
  },
  {
    id: 3,
    name: 'Peace Lily',
    description: 'Elegant white blooms and glossy leaves make this air-purifying plant a timeless favorite.',
    price: 999,
    image: 'flower6.png',
    rating: 4.8,
    reviewCount: 112,
    badge: 'Air Purifier',
    stock: 12,
    benefits: ['Air purifying', 'Beautiful blooms', 'Low light tolerant']
  },
  {
    id: 4,
    name: 'Fiddle Leaf Fig',
    description: 'The Instagram darling with large violin-shaped leaves that brings designer style to any room.',
    price: 1599,
    oldPrice: 1899,
    image: 'flower7.png',
    rating: 4.6,
    reviewCount: 87,
    badge: 'Trending',
    stock: 5,
    benefits: ['Statement plant', 'Architectural shape', 'Instagram favorite']
  },
  {
    id: 5,
    name: 'Pothos Golden',
    description: 'Fast-growing vining plant with heart-shaped leaves variegated in green and golden yellow.',
    price: 799,
    image: 'flower8.png',
    rating: 4.9,
    reviewCount: 156,
    stock: 20,
    benefits: ['Air purifying', 'Fast growing', 'Low maintenance']
  },
  {
    id: 6,
    name: 'ZZ Plant',
    description: 'Virtually unkillable plant with glossy leaves that thrives in low light and requires minimal water.',
    price: 899,
    image: 'flower9.png',
    rating: 4.8,
    reviewCount: 92,
    stock: 10,
    benefits: ['Low maintenance', 'Low light tolerant', 'Drought resistant']
  }
];

const TopSelling = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  
  const itemsPerView = 3; // Number of products to show at once on desktop
  const totalSlides = Math.ceil(products.length / itemsPerView);
  
  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedProducts.includes(id)) {
      setLikedProducts(likedProducts.filter(productId => productId !== id));
    } else {
      setLikedProducts([...likedProducts, id]);
    }
  };
  
  const nextSlide = () => {
    if (currentIndex < totalSlides - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(prev => prev + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(prev => prev - 1);
    }
  };
  
  const goToSlide = (index: number) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(index);
    }
  };

  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleProductClick = (product: typeof products[0]) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Function to render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-500'}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-xs text-gray-400">({rating})</span>
      </div>
    );
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-72 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold relative inline-block mb-2">
              <span className="relative z-10">Top Selling Plants</span>
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-green-400 to-transparent"></span>
            </h2>
            <p className="text-gray-300 text-sm max-w-md">
              Our most popular plants loved by plant enthusiasts around the world
            </p>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button 
              onClick={prevSlide} 
              disabled={currentIndex === 0 || isAnimating}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === 0 ? 'bg-black/20 text-gray-500 cursor-not-allowed' : 'bg-black/30 text-white hover:bg-black/40'
              }`}
              aria-label="Previous products"
            >
              <FiChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide} 
              disabled={currentIndex >= totalSlides - 1 || isAnimating}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex >= totalSlides - 1 ? 'bg-black/20 text-gray-500 cursor-not-allowed' : 'bg-black/30 text-white hover:bg-black/40'
              }`}
              aria-label="Next products"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Products Grid */}
          <div 
            ref={carouselRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${totalSlides * 100}%`,
              gridTemplateColumns: `repeat(${products.length}, minmax(0, 1fr))`,
            }}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => handleProductClick(product)}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Card */}
                <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 bg-gradient-to-b from-black/40 via-black/30 to-black/40 backdrop-blur-[2px] border border-white/10 hover:border-green-400/30">
                  {/* Card Content */}
                  <div className="p-5 flex flex-col h-full">
                    {/* Product Image Container */}
                    <div className="relative mb-4 h-56 flex items-center justify-center overflow-hidden rounded-xl group-hover:shadow-lg transition-all duration-500">
                      {/* Badge if exists */}
                      {product.badge && (
                        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs py-1 px-3 rounded-full">
                          {product.badge}
                        </div>
                      )}
                      
                      {/* Stock indicator */}
                      {product.stock <= 5 && (
                        <div className="absolute top-2 right-2 z-10 bg-red-500/80 text-white text-xs py-1 px-3 rounded-full">
                          Only {product.stock} left
                        </div>
                      )}
                      
                      {/* Favorite button */}
                      <button 
                        onClick={(e) => toggleLike(product.id, e)}
                        className="absolute top-2 right-2 z-10 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <FiHeart 
                          size={16} 
                          className={likedProducts.includes(product.id) ? 'text-red-500 fill-red-500' : 'text-white'} 
                        />
                      </button>
                      
                      {/* Product Image */}
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="h-full w-auto max-h-full object-contain transition-all duration-700 group-hover:scale-110"
                      />
                      
                      {/* Quick add button (visible on hover) */}
                      <div className={`absolute bottom-3 left-0 right-0 mx-auto w-40 transition-all duration-300 ${
                        hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        <button 
                          onClick={(e) => handleAddToCart(product, e)}
                          className="w-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 rounded-full py-2 px-4 text-white text-xs flex items-center justify-center gap-2 transition-all duration-300"
                        >
                          <FiShoppingCart size={14} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-grow">
                      {/* Title and Rating */}
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-lg group-hover:text-green-400 transition-colors duration-300 line-clamp-1">
                          {product.name}
                        </h3>
                      </div>
                      
                      {/* Rating */}
                      <div className="mb-2">
                        {renderStars(product.rating)}
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-300 text-xs mb-4 line-clamp-2 h-10">
                        {product.description}
                      </p>
                    </div>
                    
                    {/* Price and Action */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">₹{product.price}</span>
                            {product.oldPrice && (
                              <span className="text-xs text-gray-400 line-through">₹{product.oldPrice}</span>
                            )}
                          </div>
                          <div className="text-[10px] text-gray-400">Free shipping</div>
                        </div>
                        
                        <button 
                          className="w-9 h-9 bg-gradient-to-br from-green-500/80 to-green-700/80 rounded-full flex items-center justify-center hover:from-green-500 hover:to-green-700 transition-all duration-300 group"
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <FiPlus size={18} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === i 
                  ? 'w-6 h-2 bg-green-400' 
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-black/30 hover:bg-black/50 border border-white/10 hover:border-green-400/30 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-green-900/10">
            View All Products
            <FiShoppingBag size={16} className="ml-1" />
          </a>
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

export default TopSelling; 