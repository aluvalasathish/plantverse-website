import { useState, useRef, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

// Enhanced review data
const reviews = [
  {
    id: 1,
    name: 'Maxen Royal',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    stars: 5,
    text: 'These plants completely transformed my living space! The Calathea I ordered arrived in perfect condition and has been thriving ever since. The customer service was outstanding too.',
    date: '2 weeks ago',
    location: 'New York',
    verified: true
  },
  {
    id: 2,
    name: 'Verity K.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    stars: 5,
    text: "I've ordered plants from many online stores, but the quality here is exceptional. My apartment now feels like a lush paradise, and I've already placed another order!",
    date: '1 month ago',
    location: 'California',
    verified: true
  },
  {
    id: 3,
    name: 'Lil Thakur',
    avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
    stars: 4,
    text: "Beautiful plants and fast delivery. I appreciate the care instructions that came with my order. One plant had a slightly damaged leaf, but it's growing well otherwise.",
    date: '3 weeks ago',
    location: 'Toronto',
    verified: true
  },
  {
    id: 4,
    name: 'James Parker',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    stars: 5,
    text: "I was hesitant to order plants online, but I'm so glad I did! The selection is amazing, and the plants arrived healthy and well-packaged. Highly recommend!",
    date: '2 days ago',
    location: 'London',
    verified: true
  },
  {
    id: 5,
    name: 'Ella Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    stars: 5,
    text: "I've become a repeat customer because the quality is consistently excellent. The rare varieties they carry are hard to find elsewhere. My collection keeps growing!",
    date: '1 week ago',
    location: 'Miami',
    verified: true
  }
];

const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const visibleReviews = reviews.slice(activeIndex, activeIndex + 3);
  
  const nextSlide = () => {
    if (activeIndex + 3 < reviews.length && !isAnimating) {
      setIsAnimating(true);
      setActiveIndex(activeIndex + 1);
    }
  };
  
  const prevSlide = () => {
    if (activeIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setActiveIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold relative inline-block mb-3">
              <span className="relative z-10">Customer Review</span>
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-green-400 to-transparent"></span>
            </h2>
            <p className="text-gray-300 text-sm max-w-md">See what our customers have to say about their experiences with our plants and service.</p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <button 
              onClick={prevSlide} 
              disabled={activeIndex === 0 || isAnimating}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeIndex === 0 ? 'bg-black/20 text-gray-500' : 'bg-black/30 text-white hover:bg-black/40'
              }`}
              aria-label="Previous review"
            >
              <FiArrowLeft size={18} />
            </button>
            <button 
              onClick={nextSlide} 
              disabled={activeIndex + 3 >= reviews.length || isAnimating}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeIndex + 3 >= reviews.length ? 'bg-black/20 text-gray-500' : 'bg-black/30 text-white hover:bg-black/40'
              }`}
              aria-label="Next review"
            >
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div 
            ref={reviewsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 transition-all duration-500"
            style={{ 
              transform: `translateX(-${activeIndex * (100 / reviews.length)}%)`,
              width: `${(reviews.length / 3) * 100}%`
            }}
          >
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="relative rounded-2xl overflow-hidden group"
              >
                {/* Card background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
                
                {/* Card content */}
                <div className="relative z-10 h-full p-6 backdrop-blur-[2px] border border-white/10 rounded-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-green-400/50"
                        />
                        {review.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm flex items-center gap-2">
                          {review.name}
                          <span className="text-[10px] text-gray-400 font-normal">• {review.location}</span>
                        </p>
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <AiFillStar key={i} size={12} className={i < review.stars ? 'text-yellow-400' : 'text-gray-600'} />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400 ml-2">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 3L13 11M21 3V8M21 3H16M10 14L3 21L6 21L9 21L13 21L19 21L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <p className="text-gray-200 text-sm leading-relaxed mb-4">
                      "{review.text}"
                    </p>
                    
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-xs text-gray-400">
                        Posted {review.date}
                      </div>
                      <button className="text-xs text-white/80 hover:text-white flex items-center gap-1 transition-colors">
                        <span>Helpful</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 11V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 11H20V9C20 8.44772 19.5523 8 19 8H5C4.44772 8 4 8.44772 4 9V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 8V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, i) => (
            <button
              key={i}
              onClick={() => !isAnimating && setActiveIndex(i * 3)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(activeIndex / 3) === i 
                  ? 'bg-green-400 w-6' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews; 