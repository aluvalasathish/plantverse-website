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
  
  // Responsive items per view based on screen size
  const [itemsPerView, setItemsPerView] = useState(3);
  
  // Update items per view based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    // Initial call
    handleResize();

    // Set up event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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

  // Calculate visible products based on current index and items per view
  const visibleProducts = () => {
    const startIndex = currentIndex * itemsPerView;
    return products.slice(startIndex, startIndex + itemsPerView);
  };

  // Fix for linter errors: check if ProductDetail supports these props
  // If ProductDetail doesn't support these props, we'll pass only the required ones
  const productDetailProps = {
    product: selectedProduct,
    onClose: () => setSelectedProduct(null)
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-72 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold relative inline-block mb-2">
              <span className="relative z-10">Top Selling Plants</span>
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-green-400 to-transparent"></span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm max-w-md">
              Our most popular plants loved by plant enthusiasts around the world
            </p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-0">
            <button 
              onClick={prevSlide} 
              disabled={currentIndex === 0 || isAnimating}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === 0 ? 'bg-black/20 text-gray-500 cursor-not-allowed' : 'bg-black/30 text-white hover:bg-black/40'
              }`}
              aria-label="Previous products"
            >
              <FiChevronLeft size={16} className="sm:text-xl" />
            </button>
            <button 
              onClick={nextSlide} 
              disabled={currentIndex >= totalSlides - 1 || isAnimating}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex >= totalSlides - 1 ? 'bg-black/20 text-gray-500 cursor-not-allowed' : 'bg-black/30 text-white hover:bg-black/40'
              }`}
              aria-label="Next products"
            >
              <FiChevronRight size={16} className="sm:text-xl" />
            </button>
          </div>
        </div>
        
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {visibleProducts().map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => handleProductClick(product)}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Card */}
                <div className="relative h-full rounded-lg sm:rounded-2xl overflow-hidden transition-all duration-500 bg-gradient-to-b from-black/40 via-black/30 to-black/40 backdrop-blur-[2px] border border-white/10 hover:border-green-400/30">
                  {/* Card Content */}
                  <div className="p-3 sm:p-5 flex flex-col h-full">
                    {/* Product Image Container */}
                    <div className="relative mb-3 sm:mb-4 h-36 sm:h-48 md:h-56 flex items-center justify-center overflow-hidden rounded-lg sm:rounded-xl group-hover:shadow-lg transition-all duration-500">
                      {/* Badge if exists */}
                      {product.badge && (
                        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white text-[10px] sm:text-xs py-0.5 sm:py-1 px-2 sm:px-3 rounded-full">
                          {product.badge}
                        </div>
                      )}
                      
                      {/* Stock indicator */}
                      {product.stock <= 5 && (
                        <div className="absolute top-2 right-2 z-10 bg-red-500/80 text-white text-[10px] sm:text-xs py-0.5 sm:py-1 px-2 sm:px-3 rounded-full">
                          Only {product.stock} left
                        </div>
                      )}
                      
                      {/* Favorite button */}
                      <button 
                        className={`absolute bottom-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${likedProducts.includes(product.id) ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'}`}
                        onClick={(e) => toggleLike(product.id, e)}
                        aria-label={likedProducts.includes(product.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <FiHeart 
                          size={14} 
                          className={`sm:size-4 ${likedProducts.includes(product.id) ? 'fill-current' : ''}`} 
                        />
                      </button>
                      
                      {/* Product Image with background glow */}
                      <div className="relative w-full h-full flex items-center justify-center p-4 transition-transform duration-700 transform group-hover:scale-105">
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-full bg-green-500/10 filter blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>
                        
                        {/* Product image */}
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-full w-auto object-contain relative z-10 transform transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 flex flex-col">
                      <div className="mb-1.5 sm:mb-2">
                        {renderStars(product.rating)}
                      </div>
                      
                      <h3 className="font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1 text-white group-hover:text-green-400 transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-400 text-[10px] sm:text-xs font-light mb-2 sm:mb-3 line-clamp-2 flex-grow">
                        {product.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base md:text-lg font-bold">Rs. {(product.price / 100).toFixed(0)}</span>
                          {product.oldPrice && (
                            <span className="text-gray-500 line-through text-[10px] sm:text-xs">Rs. {(product.oldPrice / 100).toFixed(0)}</span>
                          )}
                        </div>
                        
                        <button 
                          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors"
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <FiShoppingBag size={12} className="sm:size-[14px]" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8">
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mx-1 transition-all duration-300 ${currentIndex === i ? 'bg-green-500 scale-110' : 'bg-white/30'}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
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