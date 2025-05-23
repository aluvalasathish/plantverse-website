import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { searchProducts } from '../services/productService';
import ProductDetail from './ProductDetail';
import { useCart } from '../context/CartContext';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const Search = ({ isOpen, onClose }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [selectedProduct, setSelectedProduct] = useState<typeof searchResults[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  
  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Handle search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Debounce search
    const debounceTimer = setTimeout(() => {
      setIsLoading(true);
      const results = searchProducts(searchTerm);
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);
  
  // Handle clicks outside search container
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Close search on escape key
  useEffect(() => {
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
  
  const handleProductClick = (product: typeof searchResults[0]) => {
    setSelectedProduct(product);
  };
  
  const handleAddToCart = (product: typeof searchResults[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };
  
  return (
    <>
      {/* Search Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      
      {/* Search Container */}
      <div 
        ref={searchContainerRef}
        className={`fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[80vh]' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          {/* Search Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Search Products</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close search"
            >
              <FiX size={24} />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <FiSearch size={20} className="text-gray-400" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for plants, categories, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
            />
          </div>
          
          {/* Popular Searches */}
          {searchTerm === '' && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {['Monstera', 'Air Purifying', 'Succulents', 'Low Light', 'Pet Friendly'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-4 py-2 bg-black/30 hover:bg-black/50 border border-white/10 rounded-full text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Search Results */}
          {searchTerm !== '' && (
            <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="bg-black/30 border border-white/10 hover:border-green-400/30 rounded-lg p-4 flex gap-4 cursor-pointer transition-all hover:bg-black/40"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-black/20 rounded-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{product.name}</h3>
                        <p className="text-xs text-gray-400 mb-2 line-clamp-1">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-green-400 font-medium">₹{product.price}</span>
                          <button 
                            onClick={(e) => handleAddToCart(product, e)}
                            className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs rounded-full transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">No products found for "{searchTerm}"</p>
                  <p className="text-sm text-gray-500">Try a different search term or browse our categories</p>
                </div>
              )}
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
    </>
  );
};

export default Search; 