import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Order from './components/Order';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import CartDrawer from './components/shop/CartDrawer';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Testimonials />
      <Gallery />
      <Contact />
    </>
  );
}

function App() {
  const location = useLocation();

  return (
    <CartProvider>
      <div className="font-sans antialiased text-text-dark bg-primary-maroon relative min-h-screen overflow-hidden">
        <Navbar />
        <CartDrawer />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/order" element={<PageTransition><Order /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="/order-confirmation" element={<PageTransition><OrderConfirmation /></PageTransition>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
