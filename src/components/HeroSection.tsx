import { useState, useEffect } from 'react';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-40 md:pt-40 md:pb-52 overflow-hidden flex items-center min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20"></div>
        
        {/* Animated background circles */}
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-green-500/10 filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-green-500/10 filter blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10 py-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Column - Text Content */}
          <div className={`z-10 pt-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Breathe <span className="text-green-400">Natural</span> <br />
              Feel <span className="text-green-400">Beautiful</span>
            </h1>
            <p className="text-gray-300 mb-8 max-w-md text-sm leading-relaxed">
              Transform your space into a lush sanctuary with our premium collection of indoor plants. 
              Carefully selected and sustainably grown for the modern plant enthusiast.
            </p>
            <div className="flex items-center gap-5">
              <button 
                className="relative px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-white hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 text-sm font-medium overflow-hidden group"
                onMouseEnter={() => setHoveredButton('explore')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Collection
                  <FiArrowRight size={16} className={`transition-transform duration-300 ${hoveredButton === 'explore' ? 'translate-x-1' : ''}`} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </button>
              <button 
                className="px-6 py-2.5 bg-transparent border border-white/30 rounded-full text-white hover:bg-white/10 transition-all duration-300 text-sm"
                onMouseEnter={() => setHoveredButton('learn')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-400">50+</h3>
                <p className="text-xs text-gray-400 mt-1">Plant Varieties</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-400">4.9</h3>
                <p className="text-xs text-gray-400 mt-1">Customer Rating</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-green-400">24h</h3>
                <p className="text-xs text-gray-400 mt-1">Support</p>
              </div>
            </div>
          </div>

          {/* Right Column - Large Plant Image Container */}
          <div className="relative flex items-center justify-center">
            <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
              {/* Enhanced plant image with larger size and removed background */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-8 bg-green-500/20 rounded-full filter blur-3xl"></div>
                
                {/* Main plant image - larger and with removed background */}
                <img 
                  src="flower.png" 
                  alt="Beautiful Plant with Transparent Background" 
                  className="relative z-10 h-[550px] md:h-[600px] w-auto object-contain"
                />
                
                {/* Floating particle elements */}
                <div className="absolute top-1/4 left-0 w-2 h-2 bg-green-400 rounded-full animate-float"></div>
                <div className="absolute top-1/3 right-0 w-3 h-3 bg-green-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-green-400 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Card (Positioned absolutely) */}
      <div 
        className={`absolute top-1/4 right-8 md:right-16 lg:right-32 bg-black/40 backdrop-blur-md rounded-2xl p-4 w-56 border border-white/10 z-10 transition-all duration-1000 delay-500 shadow-xl shadow-black/20 hover:shadow-green-900/20 hover:scale-105 hover:-translate-y-1 ${
          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs text-green-400 font-medium">Premium Plant</p>
          <div className="flex text-yellow-400">
            <AiFillStar size={12} />
            <AiFillStar size={12} />
            <AiFillStar size={12} />
            <AiFillStar size={12} />
            <AiFillStar size={12} />
          </div>
        </div>
        <h3 className="font-medium text-lg mb-1">Calathea Orbifolia</h3>
        <p className="text-xs text-gray-300 mb-3">
          Known for its stunning round leaves with silver stripes. Loves humidity and indirect light.
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Rs. 799/-</span>
          <button className="flex items-center gap-1 text-xs bg-green-500 hover:bg-green-600 transition px-3 py-1.5 rounded-full">
            <FiShoppingBag size={12} />
            Buy now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 