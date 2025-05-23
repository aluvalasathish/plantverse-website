import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="relative pt-12 sm:pt-16 pb-6 sm:pb-8 border-t border-white/10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-green-900/5 via-transparent to-transparent opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="relative">
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-8 sm:h-8">
                  <path 
                    d="M18 3.00001C15.6131 3.00001 13.3239 3.76753 11.636 5.45547C9.94821 7.14342 9.18069 9.43262 9.18069 11.8195C9.18069 14.2063 8.41317 16.4955 6.72522 18.1835C5.03728 19.8714 2.74808 20.639 0.361328 20.639L0.361328 29.4573C2.74808 29.4573 5.03728 30.2248 6.72522 31.9128C8.41317 33.6007 9.18069 35.8899 9.18069 38.2767L26.8192 38.2767C26.8192 35.8899 27.5868 33.6007 29.2747 31.9128C30.9626 30.2248 33.2518 29.4573 35.6386 29.4573V20.639C33.2518 20.639 30.9626 19.8714 29.2747 18.1835C27.5868 16.4955 26.8192 14.2063 26.8192 11.8195C26.8192 9.43262 26.0517 7.14342 24.3638 5.45547C22.6758 3.76753 20.3866 3.00001 18 3.00001Z" 
                    fill="url(#paint0_linear)" 
                  />
                  <defs>
                    <linearGradient id="paint0_linear" x1="18" y1="3.00001" x2="18" y2="38.2767" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4ADE80" />
                      <stop offset="1" stopColor="#22C55E" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 className="ml-2 text-lg sm:text-xl font-bold tracking-wide">
                Plant<span className="text-green-400">Verse</span>
              </h2>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 max-w-xs">
              Transform your space into a lush sanctuary with our premium collection of indoor plants. Carefully selected and sustainably grown.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 sm:w-9 sm:h-9 bg-black/30 rounded-full flex items-center justify-center border border-white/10 hover:bg-green-500/20 hover:border-green-500/50 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={14} className="sm:size-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-9 sm:h-9 bg-black/30 rounded-full flex items-center justify-center border border-white/10 hover:bg-green-500/20 hover:border-green-500/50 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={14} className="sm:size-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-9 sm:h-9 bg-black/30 rounded-full flex items-center justify-center border border-white/10 hover:bg-green-500/20 hover:border-green-500/50 transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={14} className="sm:size-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-9 sm:h-9 bg-black/30 rounded-full flex items-center justify-center border border-white/10 hover:bg-green-500/20 hover:border-green-500/50 transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube size={14} className="sm:size-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mt-2 sm:mt-0">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-5">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-xs sm:text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Plants Collection
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-xs sm:text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Plant Care
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-xs sm:text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-xs sm:text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-xs sm:text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="mt-2 sm:mt-0">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-5">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-xs sm:text-sm">
                <span className="font-medium text-white">Address:</span><br />
                123 Green Street, Plant City, PC 12345
              </li>
              <li className="text-gray-400 text-xs sm:text-sm">
                <span className="font-medium text-white">Email:</span><br />
                <a href="mailto:hello@plantverse.com" className="hover:text-green-400 transition-colors">
                  hello@plantverse.com
                </a>
              </li>
              <li className="text-gray-400 text-xs sm:text-sm">
                <span className="font-medium text-white">Phone:</span><br />
                <a href="tel:+11234567890" className="hover:text-green-400 transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="text-gray-400 text-xs sm:text-sm">
                <span className="font-medium text-white">Hours:</span><br />
                Monday-Friday: 9am-6pm<br />
                Weekend: 10am-4pm
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="mt-2 sm:mt-0">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-5">Stay Updated</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
              Subscribe to our newsletter for plant care tips, new arrivals, and exclusive offers.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-black/30 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all placeholder-gray-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-green-500 hover:bg-green-600 rounded-md flex items-center justify-center transition-colors">
                <FiArrowRight size={14} className="sm:size-4" />
              </button>
            </div>
            <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-[10px] sm:text-xs mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} PlantVerse. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
            <a href="#" className="text-gray-500 hover:text-white text-[10px] sm:text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] sm:text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] sm:text-xs transition-colors">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;