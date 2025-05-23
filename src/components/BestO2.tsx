import { useState } from 'react';
import { FiArrowRight, FiShoppingBag, FiPlus } from 'react-icons/fi';
import { IoLeafOutline, IoWaterOutline } from 'react-icons/io5';
import { MdOutlineWbSunny } from 'react-icons/md';

const BestO2 = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const bestO2Plants = [
    {
      id: 1,
      name: "Snake Plant",
      scientificName: "Sansevieria trifasciata",
      description: "The Snake Plant is one of the most efficient oxygen producers, converting CO₂ to O₂ even at night. Its tall, architectural leaves add a modern touch to any room.",
      price: 899,
      badge: "Premium Pick",
      tag: "Night Oxygen",
      image: "flower8.png",
      benefits: [
        { icon: <IoLeafOutline size={18} />, text: "Produces oxygen at night" },
        { icon: <IoWaterOutline size={18} />, text: "Low maintenance, drought-resistant" },
        { icon: <MdOutlineWbSunny size={18} />, text: "Thrives in low to bright indirect light" }
      ]
    },
    {
      id: 2,
      name: "Peace Lily",
      scientificName: "Spathiphyllum wallisii",
      description: "The elegant Peace Lily is renowned for its ability to filter indoor air pollutants. Its striking white flowers and glossy leaves make it both functional and decorative.",
      price: 799,
      badge: "Staff Pick",
      tag: "Air Purifier",
      image: "flower7.png",
      benefits: [
        { icon: <IoLeafOutline size={18} />, text: "Removes airborne toxins" },
        { icon: <IoWaterOutline size={18} />, text: "Increases humidity levels" },
        { icon: <MdOutlineWbSunny size={18} />, text: "Thrives in low-light conditions" }
      ]
    }
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated O2 bubbles */}
        <div className="absolute top-20 right-40 w-16 h-16 rounded-full border border-green-400/30 opacity-30 animate-float"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full border border-green-400/30 opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full border border-green-400/30 opacity-25 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-10 h-10 rounded-full border border-green-400/30 opacity-15 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-800/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-800/10 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-2 px-4 py-1.5 bg-green-500/10 rounded-full">
            <span className="text-green-400 text-sm font-medium">Breathe Better</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Best <span className="text-green-400">O₂</span> Producing Plants
          </h2>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto">
            These exceptional air-purifying plants not only elevate your space aesthetically but also improve indoor air quality by converting CO₂ to oxygen more efficiently.
          </p>
        </div>
        
        {/* O2 Plants Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {bestO2Plants.map((plant) => (
            <div 
              key={plant.id}
              className="relative rounded-3xl overflow-hidden group"
              onMouseEnter={() => setHoveredCard(plant.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Background with glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm border border-white/10 rounded-3xl"></div>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`}></div>
              
              <div className="relative z-10 p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Image Container */}
                  <div className="md:w-2/5 flex justify-center">
                    <div className="relative">
                      {/* Soft glow beneath image */}
                      <div className="absolute bottom-0 inset-x-0 h-24 bg-green-500/20 blur-xl rounded-full"></div>
                      
                      {/* Badge */}
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium py-1 px-3 rounded-full">
                        {plant.badge}
                      </div>
                      
                      {/* Plant Image */}
                      <img 
                        src={plant.image} 
                        alt={plant.name} 
                        className="h-64 md:h-80 w-auto object-contain relative z-10 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                      />
                      
                      {/* O2 molecule decoration */}
                      <div className="absolute top-1/4 right-0 opacity-70">
                        <span className="text-green-400 text-xs font-bold">O₂</span>
                      </div>
                      <div className="absolute bottom-1/3 left-0 opacity-60">
                        <span className="text-green-400 text-xs font-bold">O₂</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="md:w-3/5 text-center md:text-left">
                    {/* Plant Tags */}
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-black/30 rounded-full text-white/80 text-xs">{plant.tag}</span>
                    </div>
                    
                    {/* Plant Name */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-1 group-hover:text-green-400 transition-colors">
                      {plant.name}
                    </h3>
                    <p className="text-green-400/80 text-sm italic mb-4">{plant.scientificName}</p>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-6">
                      {plant.description}
                    </p>
                    
                    {/* Benefits List */}
                    <ul className="space-y-3 mb-6">
                      {plant.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm text-gray-200">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                            {benefit.icon}
                          </div>
                          {benefit.text}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Price and Actions */}
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <span className="text-xl md:text-2xl font-bold">Rs. {plant.price}/-</span>
                        <p className="text-xs text-gray-400">Free shipping on orders above Rs. 999</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
                          <FiShoppingBag size={18} />
                        </button>
                        <button className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full text-sm font-medium flex items-center gap-2 transition-all">
                          View Details
                          <FiArrowRight 
                            size={14} 
                            className={`transition-transform duration-300 ${hoveredCard === plant.id ? 'translate-x-1' : ''}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Oxygen bubble elements */}
              <div className="absolute bottom-20 left-10 w-3 h-3 rounded-full bg-green-400/40 animate-float"></div>
              <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-green-400/40 animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-black/30 hover:bg-black/50 border border-white/10 hover:border-green-400/30 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-green-900/10 group">
            Explore All O₂ Plants
            <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BestO2; 