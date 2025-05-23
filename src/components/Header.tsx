import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import Cart from './Cart';
import Search from './Search';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { state } = useCart();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close search dropdown when cart is opened
  useEffect(() => {
    if (cartOpen) {
      setSearchOpen(false);
    }
  }, [cartOpen]);

  // Close cart when search is opened
  useEffect(() => {
    if (searchOpen) {
      setCartOpen(false);
    }
  }, [searchOpen]);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-2 sm:py-3 bg-plant-bg/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/10' 
            : 'py-3 sm:py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="relative">
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-[36px] sm:h-[36px]">
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
                
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <h1 className="ml-2 text-base sm:text-xl font-bold tracking-wide">
                Plant<span className="text-green-400">Verse</span>
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `relative text-sm ${isActive ? 'text-green-400 font-medium' : 'text-white/80'} transition-colors hover:text-green-400 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-green-400 after:transition-all ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/products" 
                className={({ isActive }) => 
                  `relative text-sm ${isActive ? 'text-green-400 font-medium' : 'text-white/80'} transition-colors hover:text-green-400 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-green-400 after:transition-all ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                }
              >
                Products
              </NavLink>
              <NavLink 
                to="/categories" 
                className={({ isActive }) => 
                  `relative text-sm ${isActive ? 'text-green-400 font-medium' : 'text-white/80'} transition-colors hover:text-green-400 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-green-400 after:transition-all ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                }
              >
                Categories
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `relative text-sm ${isActive ? 'text-green-400 font-medium' : 'text-white/80'} transition-colors hover:text-green-400 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-green-400 after:transition-all ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `relative text-sm ${isActive ? 'text-green-400 font-medium' : 'text-white/80'} transition-colors hover:text-green-400 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-green-400 after:transition-all ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                }
              >
                Contact
              </NavLink>
            </nav>
            
            {/* Right Side Icons */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Search"
              >
                <FiSearch size={16} className="text-white sm:size-[18px]" />
              </button>
              
              {/* Cart */}
              <button 
                className="relative p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors" 
                aria-label="Cart"
                onClick={() => setCartOpen(true)}
              >
                <FiShoppingBag size={16} className="text-white sm:size-[18px]" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-500 rounded-full text-white text-[9px] sm:text-[10px] flex items-center justify-center">
                    {state.totalItems > 99 ? '99+' : state.totalItems}
                  </span>
                )}
              </button>
              
              {/* Account */}
              <button className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors md:block hidden" aria-label="Account">
                <FiUser size={16} className="text-white sm:size-[18px]" />
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors md:hidden ml-1" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FiX size={18} className="sm:size-[20px]" /> : <FiMenu size={18} className="sm:size-[20px]" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          ref={menuRef}
          className={`md:hidden absolute left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-[calc(100vh-70px)] py-4 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-3">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `${isActive ? 'text-green-400 font-medium' : 'text-white/80'} py-2.5 border-b border-white/10 flex items-center`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/products" 
                className={({ isActive }) => 
                  `${isActive ? 'text-green-400 font-medium' : 'text-white/80'} py-2.5 border-b border-white/10 flex items-center`
                }
              >
                Products
              </NavLink>
              <NavLink 
                to="/categories" 
                className={({ isActive }) => 
                  `${isActive ? 'text-green-400 font-medium' : 'text-white/80'} py-2.5 border-b border-white/10 flex items-center`
                }
              >
                Categories
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `${isActive ? 'text-green-400 font-medium' : 'text-white/80'} py-2.5 border-b border-white/10 flex items-center`
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `${isActive ? 'text-green-400 font-medium' : 'text-white/80'} py-2.5 flex items-center`
                }
              >
                Contact
              </NavLink>
              {/* Account link in mobile menu */}
              <div className="pt-2 mt-2 border-t border-white/10">
                <button className="flex items-center gap-2.5 text-white/80 py-2.5">
                  <FiUser size={16} />
                  <span>My Account</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Cart Sidebar */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
      {/* Search Panel */}
      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header; 