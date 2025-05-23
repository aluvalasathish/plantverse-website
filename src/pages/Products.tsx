import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import ProductDetail from '../components/ProductDetail';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiFilter, FiGrid, FiList, FiChevronDown } from 'react-icons/fi';
import { scrollToTop } from '../utils/scrollUtils';

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const products = getAllProducts();
  const { addToCart } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <main className="py-28 md:py-32 overflow-y-auto">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">All Plants</h1>
          <p className="text-gray-300 max-w-2xl">
            Browse our complete collection of premium plants, carefully selected and sustainably grown for plant enthusiasts.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-black/30 rounded-lg border border-white/10 hover:bg-black/40 transition-colors"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FiFilter size={18} />
            <span>Filters</span>
            <FiChevronDown size={16} className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm appearance-none cursor-pointer hover:bg-black/40 transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="flex items-center bg-black/30 rounded-lg border border-white/10 overflow-hidden">
              <button 
                className={`p-2 ${viewMode === 'grid' ? 'bg-black/50 text-green-400' : 'hover:bg-black/20'}`} 
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <FiGrid size={18} />
              </button>
              <button 
                className={`p-2 ${viewMode === 'list' ? 'bg-black/50 text-green-400' : 'hover:bg-black/20'}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <FiList size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel (expandable) */}
        {filterOpen && (
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {['Indoor', 'Outdoor', 'Tropical', 'Succulents', 'Hanging', 'Air Purifying'].map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-white/20 bg-black/30 text-green-500 focus:ring-green-500" />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Min" 
                    className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-sm"
                  />
                  <input 
                    type="text" 
                    placeholder="Max" 
                    className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-sm"
                  />
                </div>
                <input type="range" className="w-full" />
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Care Level</h3>
              <div className="space-y-2">
                {['Easy', 'Moderate', 'Expert'].map((level) => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-white/20 bg-black/30 text-green-500 focus:ring-green-500" />
                    <span className="text-sm">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Special Features</h3>
              <div className="space-y-2">
                {['Pet Friendly', 'Low Light', 'Flowering', 'Rare', 'Edible', 'Medicinal'].map((feature) => (
                  <label key={feature} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-white/20 bg-black/30 text-green-500 focus:ring-green-500" />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="group cursor-pointer bg-black/30 backdrop-blur-sm border border-white/10 hover:border-green-400/30 rounded-xl p-5 transition-all duration-300"
              >
                {/* Image container */}
                <div className="relative mb-4 h-48 flex items-center justify-center overflow-hidden rounded-lg">
                  {/* Badge if exists */}
                  {product.badge && (
                    <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs py-1 px-3 rounded-full">
                      {product.badge}
                    </div>
                  )}
                  
                  {/* Low stock indicator */}
                  {product.stock <= 5 && (
                    <div className="absolute top-2 right-2 z-10 bg-red-500/80 text-white text-xs py-1 px-3 rounded-full">
                      Only {product.stock} left
                    </div>
                  )}
                  
                  {/* Plant image with hover effect */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-full w-auto object-contain transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Quick action button on hover */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 rounded-full py-2 px-4 text-white text-xs flex items-center gap-2 transition-all"
                    >
                      <FiShoppingCart size={12} />
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                {/* Product details */}
                <h3 className="font-medium text-base mb-1 group-hover:text-green-400 transition-colors duration-300">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs text-gray-400">({product.rating})</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base">₹{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-400 line-through">₹{product.oldPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div 
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="group cursor-pointer bg-black/30 backdrop-blur-sm border border-white/10 hover:border-green-400/30 rounded-xl p-5 transition-all duration-300 flex gap-6"
              >
                {/* Image container */}
                <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg">
                  {/* Badge if exists */}
                  {product.badge && (
                    <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs py-1 px-2 rounded-full">
                      {product.badge}
                    </div>
                  )}
                  
                  {/* Plant image */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-full w-auto object-contain transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Product details */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-lg mb-1 group-hover:text-green-400 transition-colors duration-300">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-gray-400">({product.reviewCount} reviews)</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">₹{product.price}</span>
                        {product.oldPrice && (
                          <span className="text-xs text-gray-400 line-through">₹{product.oldPrice}</span>
                        )}
                      </div>
                      
                      {/* Stock indicator */}
                      {product.stock <= 5 && (
                        <div className="text-red-400 text-xs mt-1">
                          Only {product.stock} left
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-auto">
                    {product.description}
                  </p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {product.category.slice(0, 3).map((category) => (
                        <span key={category} className="px-2 py-1 bg-black/20 text-xs rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full py-2 px-4 text-white text-sm flex items-center gap-2 transition-all"
                    >
                      <FiShoppingCart size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </main>
  );
};

export default Products; 