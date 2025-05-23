import { useState } from 'react';
import { getAllProducts } from '../services/productService';
import ProductDetail from '../components/ProductDetail';
import { useCart } from '../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

// Define the categories
const categories = [
  {
    id: 'indoor',
    name: 'Indoor Plants',
    description: 'Perfect plants for brightening up your indoor spaces',
    image: 'flower4.png'
  },
  {
    id: 'tropical',
    name: 'Tropical Plants',
    description: 'Exotic tropical varieties to create your own indoor jungle',
    image: 'flower2.png'
  },
  {
    id: 'air-purifying',
    name: 'Air Purifying',
    description: 'Plants that help clean and purify your indoor air',
    image: 'flower6.png'
  },
  {
    id: 'succulent',
    name: 'Succulents',
    description: 'Low-maintenance, water-storing plants perfect for beginners',
    image: 'flower5.png'
  },
  {
    id: 'hanging',
    name: 'Hanging Plants',
    description: 'Trailing and cascading plants for hanging displays',
    image: 'flower3.png'
  },
  {
    id: 'beginner-friendly',
    name: 'Beginner Friendly',
    description: 'Easy to care for plants that are perfect for new plant parents',
    image: 'flower9.png'
  },
  {
    id: 'pet-friendly',
    name: 'Pet Friendly',
    description: 'Safe plants for homes with curious pets',
    image: 'flower8.png'
  },
  {
    id: 'rare',
    name: 'Rare & Unique',
    description: 'Special and hard-to-find varieties for collectors',
    image: 'flower7.png'
  }
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const allProducts = getAllProducts();
  const { addToCart } = useCart();
  
  // Filter products by selected category
  const filteredProducts = selectedCategory 
    ? allProducts.filter(product => product.category.includes(selectedCategory))
    : [];
  
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
    <main className="py-28 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Plant Categories</h1>
          <p className="text-gray-300 max-w-2xl">
            Explore our plants by category to find the perfect addition to your collection.
          </p>
        </div>
        
        {!selectedCategory ? (
          // Categories Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div 
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group cursor-pointer relative overflow-hidden rounded-xl border border-white/10 hover:border-green-400/30 transition-all duration-300"
              >
                {/* Category image with overlay */}
                <div className="h-56 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10"></div>
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Category info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                    <h3 className="text-lg font-medium mb-1 group-hover:text-green-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Selected Category View
          <>
            {/* Category Header */}
            <div className="mb-10">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-green-400 text-sm hover:underline mb-4 inline-flex items-center gap-1"
              >
                ← Back to Categories
              </button>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-300">
                {categories.find(c => c.id === selectedCategory)?.description}
              </p>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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
                ))
              ) : (
                <div className="col-span-full py-16 text-center">
                  <p className="text-gray-400 mb-4">No plants found in this category</p>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-full text-sm font-medium transition-colors"
                  >
                    Browse Other Categories
                  </button>
                </div>
              )}
            </div>
          </>
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

export default Categories; 