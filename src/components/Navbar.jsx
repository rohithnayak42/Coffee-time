import React, { useState, useEffect } from 'react';
import { Coffee, Menu as MenuIcon, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, ChevronDown, LayoutDashboard, FileText } from 'lucide-react';
import AuthPromptModal from './auth/AuthPromptModal';

const navItems = ['Home', 'About', 'Menu', 'Testimonials', 'Gallery', 'Contact'];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const { currentUser, logout } = useAuth();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const isOrderPage = location.pathname.includes('/order') || location.pathname.includes('/checkout');

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-dropdown-container')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      if (location.pathname !== '/') return;

      const sections = navItems.map(item => document.getElementById(item.toLowerCase()));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActive(navItems[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (item) => {
    if (isOrderPage) {
      navigate('/');
    }
    setActive(item);
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      setTimeout(() => {
        const element = document.getElementById(item.toLowerCase());
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }, 300);
    } else {
      const element = document.getElementById(item.toLowerCase());
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-primary-maroon/90 backdrop-blur-md shadow-lg py-4' : 'bg-primary-maroon py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer lg:w-[200px]" onClick={() => handleNavClick('Home')}>
          <Coffee size={32} className="text-white" />
          <span className="text-white text-2xl font-bold tracking-wider">Coffee</span>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-8 xl:gap-12">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`relative text-[15px] font-medium transition-colors duration-300 ${
                (!isOrderPage && active === item)
                  ? 'text-accent-orange'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item}
              {(!isOrderPage && active === item) && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent-orange rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Section: Auth + Order + Cart (Desktop) */}
        <div className="hidden md:flex items-center justify-end gap-5 lg:w-auto xl:w-[400px]">
          {currentUser ? (
            <div className="relative profile-dropdown-container">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 text-[15px] font-medium text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-white/5"
              >
                <div className="w-8 h-8 rounded-full bg-accent-orange/20 border border-accent-orange/30 flex items-center justify-center text-accent-orange">
                  <User size={16} />
                </div>
                <span>{currentUser.name ? currentUser.name.split(' ')[0] : 'My Account'}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-[#1a0f0f] border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-2 space-y-1">
                      <button 
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          navigate('/dashboard');
                        }}
                        className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        <LayoutDashboard size={16} /> Dashboard
                      </button>
                      <button 
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          navigate('/my-orders');
                        }}
                        className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                      >
                        <FileText size={16} /> My Orders
                      </button>
                      <div className="h-[1px] bg-white/10 my-1"></div>
                      <button 
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate('/login')}
                className={`text-[15px] font-medium transition-colors ${
                  location.pathname === '/login' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className={`text-[15px] font-medium transition-colors ${
                  location.pathname === '/signup' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Subtle Divider */}
          <div className="w-[1px] h-6 bg-white/15 mx-1 hidden lg:block"></div>

          {/* Order Online Button */}
          <button 
            onClick={() => {
              if (!currentUser) {
                setShowAuthPrompt(true);
              } else {
                navigate('/order');
              }
            }}
            className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 text-[15px] whitespace-nowrap ${
              isOrderPage
                ? 'bg-accent-orange text-white shadow-[0_0_15px_rgba(245,166,35,0.4)] scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            Order Online
          </button>

          {/* Desktop Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white hover:text-accent-orange transition-colors ml-1"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute 0 -right-1 bg-accent-orange text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-5">
          {/* Mobile Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white hover:text-accent-orange transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-orange text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-primary-maroon shadow-xl py-4 flex flex-col items-center gap-4 border-t border-white/10"
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`px-6 py-2 rounded-full w-3/4 transition-all duration-300 ${
                  (!isOrderPage && active === item)
                    ? 'bg-accent-orange text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
            {currentUser ? (
              <>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/dashboard');
                  }}
                  className={`px-6 py-2 rounded-full w-3/4 font-semibold flex items-center justify-center gap-2 ${
                    location.pathname === '/dashboard' ? 'bg-white/20 text-white' : 'bg-transparent border border-white/20 text-white'
                  }`}
                >
                  <User size={16} /> Dashboard
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/my-orders');
                  }}
                  className={`px-6 py-2 rounded-full w-3/4 font-semibold flex items-center justify-center gap-2 ${
                    location.pathname === '/my-orders' ? 'bg-white/20 text-white' : 'bg-transparent border border-white/20 text-white'
                  }`}
                >
                  Orders
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="px-6 py-2 rounded-full w-3/4 font-semibold flex items-center justify-center gap-2 text-red-400 border border-red-400/20"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className={`px-6 py-2 rounded-full w-3/4 font-semibold ${
                    location.pathname === '/login' ? 'bg-white/20 text-white' : 'bg-transparent border border-white/20 text-white'
                  }`}
                >
                  Login
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/signup');
                  }}
                  className={`px-6 py-2 rounded-full w-3/4 font-semibold ${
                    location.pathname === '/signup' ? 'bg-white/20 text-white' : 'bg-transparent border border-white/20 text-white'
                  }`}
                >
                  Sign Up
                </button>
              </>
            )}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (!currentUser) {
                  setShowAuthPrompt(true);
                } else {
                  navigate('/order');
                }
              }}
              className={`px-6 py-2 rounded-full w-3/4 font-semibold ${
                isOrderPage ? 'bg-accent-orange text-white shadow-lg shadow-orange-500/20' : 'bg-white/10 text-white'
              }`}
            >
              Order Online
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AuthPromptModal isOpen={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />
    </nav>
  );
}
