import React, { useState, useEffect } from 'react';
import { Coffee, Menu as MenuIcon, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navItems = ['Home', 'About', 'Menu', 'Testimonials', 'Gallery', 'Contact'];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();

  const isOrderPage = location.pathname.includes('/order') || location.pathname.includes('/checkout');

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
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-primary-maroon shadow-lg py-3' : 'bg-primary-maroon py-5'}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('Home')}>
          <Coffee size={32} className="text-white" />
          <span className="text-white text-2xl font-bold tracking-wider">Coffee</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`px-5 py-2 rounded-full transition-all duration-300 ${
                (!isOrderPage && active === item)
                  ? 'bg-accent-orange text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {item}
            </button>
          ))}
          
          <button 
            onClick={() => navigate('/order')}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
              isOrderPage
                ? 'bg-accent-orange text-white shadow-[0_0_15px_rgba(245,166,35,0.4)] scale-105'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            Order Online
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
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

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
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
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/order');
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
    </nav>
  );
}
