import { useEffect } from 'react';
import { FiHeart, FiUsers, FiPackage, FiGlobe, FiMap } from 'react-icons/fi';
import { scrollToTop } from '../utils/scrollUtils';

const About = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <main className="py-28 md:py-32 overflow-y-auto">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">About PlantVerse</h1>
          <p className="text-gray-300 text-lg">
            We're on a mission to bring the beauty and benefits of plants to homes and offices everywhere.
          </p>
        </div>
        
        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-24">
          <div>
            <h2 className="text-2xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Our Story</span>
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-green-400 to-transparent"></span>
            </h2>
            <p className="text-gray-300 mb-4">
              PlantVerse began in 2018 as a small passion project by a group of plant enthusiasts who wanted to make premium plants more accessible to everyone. What started as a tiny collection in a basement has now grown into one of India's most loved plant destinations.
            </p>
            <p className="text-gray-300 mb-4">
              We believe that plants do more than beautify spaces - they improve air quality, reduce stress, and create a connection to nature that's essential in our digital world. Our team personally selects each plant in our collection, ensuring you receive only the healthiest and most beautiful specimens.
            </p>
            <p className="text-gray-300">
              Today, we ship thousands of plants monthly across India, but our mission remains the same: to help people create their own green sanctuary, one plant at a time.
            </p>
          </div>
          
          <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
            <img 
              src="flower.png" 
              alt="Our greenhouse" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Values Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Our Values</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-transparent"></span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at PlantVerse.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <FiHeart size={24} className="text-green-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Plant Passion</h3>
              <p className="text-gray-300 text-sm">
                We're genuinely obsessed with plants and dedicated to sharing that passion with our customers.
              </p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <FiUsers size={24} className="text-green-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Customer Care</h3>
              <p className="text-gray-300 text-sm">
                We're committed to providing exceptional service and support to every plant enthusiast we serve.
              </p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <FiPackage size={24} className="text-green-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Quality First</h3>
              <p className="text-gray-300 text-sm">
                We never compromise on the health and quality of our plants, pots, or accessories.
              </p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <FiGlobe size={24} className="text-green-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Sustainability</h3>
              <p className="text-gray-300 text-sm">
                We prioritize sustainable practices in growing, packaging, and shipping our products.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Our Team</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-transparent"></span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Meet the plant enthusiasts behind PlantVerse.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Rahul Sharma', role: 'Founder & CEO', image: 'flower4.png' },
              { name: 'Priya Patel', role: 'Head Botanist', image: 'flower5.png' },
              { name: 'Vikram Singh', role: 'Customer Experience', image: 'flower6.png' },
              { name: 'Ananya Desai', role: 'Operations Manager', image: 'flower7.png' }
            ].map((member) => (
              <div key={member.name} className="group bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-green-400/30 transition-all duration-300">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1 group-hover:text-green-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Visit Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative h-80 md:h-full rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <FiMap size={48} className="text-white/50" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Visit Our Nursery</span>
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-green-400 to-transparent"></span>
            </h2>
            <p className="text-gray-300 mb-6">
              We'd love to meet you in person! Visit our nursery in Bangalore to explore our full collection and get expert advice from our plant specialists.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Address</h3>
                <p className="text-gray-300 text-sm">
                  123 Green Avenue, Koramangala<br />
                  Bangalore, Karnataka 560034
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Hours</h3>
                <p className="text-gray-300 text-sm">
                  Monday - Saturday: 9am - 6pm<br />
                  Sunday: 10am - 4pm
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Contact</h3>
                <p className="text-gray-300 text-sm">
                  Phone: +91 1234567890<br />
                  Email: hello@plantverse.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About; 