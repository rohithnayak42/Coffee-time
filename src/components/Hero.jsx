import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  // Coffee bean SVG component for floating beans
  const FloatingBean = ({ className, delay, yOff }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, y: yOff || [0, -20, 0], rotate: [0, 15, -15, 0] }}
      transition={{ 
        opacity: { duration: 1, delay: delay },
        scale: { duration: 1, delay: delay },
        y: { repeat: Infinity, duration: 4 + delay, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: 5 + delay, ease: "easeInOut" }
      }}
      className={`absolute z-20 ${className}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#6F4E37" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
        <path d="M18.89 7.64c-1.39-3.79-5.65-5.99-9.5-4.88-3.86 1.11-6.17 5.09-5.18 8.94 1 3.86 5.28 5.76 9.14 4.65 3.86-1.12 6.93-4.92 5.54-8.71zm-2.02 6.8c-.83.24-4.57 1.09-8.4-3.08-3.83-4.18-3.32-7.85-3.09-8.67.82-.24 4.56-1.09 8.39 3.09 3.83 4.18 3.32 7.84 3.1 8.66z" />
        <path d="M12.91 8.87c-1.8-1.95-4.04-2.1-4.71-2.07-.3.01-.58.19-.71.46-.13.27-.08.59.13.8.31.3 1.94 1.74 3.73 3.68 1.8 1.95 3.52 2.37 3.84 2.39.26.02.51-.11.64-.34.13-.23.13-.53-.01-.75-.4-.64-1.12-2.22-2.91-4.17z" />
      </svg>
    </motion.div>
  );

  return (
    <section id="home" className="min-h-screen bg-primary-maroon flex items-center pt-28 pb-12 md:pt-20 md:pb-0 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white z-10"
        >
          <h2 className="text-accent-orange font-bold text-3xl mb-4 tracking-wider" style={{ fontFamily: 'cursive' }}>Premium Quality</h2>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-sm">
            Experience the True Taste of Coffee
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-lg font-light leading-relaxed">
            Indulge in our masterfully roasted blends. Every sip is crafted to awaken your senses and elevate your day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => navigate('/order')}
              className="bg-accent-orange hover:bg-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1 hover:shadow-orange-500/50"
            >
              Order Now
            </button>
            <a 
              href="#menu"
              className="border-2 border-white/80 hover:bg-white hover:text-primary-maroon text-white px-8 py-3 rounded-full font-bold transition-all hover:-translate-y-1 text-center inline-block"
            >
              Explore Menu
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex justify-center items-center h-full w-full"
        >
          {/* Soft Premium Glow */}
          <div className="absolute inset-0 bg-accent-orange/30 rounded-full blur-[100px] w-[300px] h-[300px] md:w-[450px] md:h-[450px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
          
          {/* Floating Coffee Beans */}
          <FloatingBean className="top-[10%] left-[10%] w-8 h-8 opacity-70" delay={0.2} yOff={[0, -15, 0]} />
          <FloatingBean className="top-[20%] right-[15%] w-10 h-10 opacity-80" delay={0.5} yOff={[0, 20, 0]} />
          <FloatingBean className="bottom-[15%] left-[20%] w-12 h-12 opacity-90" delay={0.8} yOff={[0, -25, 0]} />
          <FloatingBean className="bottom-[25%] right-[10%] w-7 h-7 opacity-60" delay={1.1} yOff={[0, 10, 0]} />

          <motion.img 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            src="/hero-coffee-transparent.png" 
            alt="Premium Splash Coffee Transparent" 
            className="relative z-10 w-full max-w-[400px] md:max-w-[650px] lg:max-w-[750px] mx-auto h-auto object-contain drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 25px 25px rgba(0,0,0,0.5))", WebkitFontSmoothing: "antialiased" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
