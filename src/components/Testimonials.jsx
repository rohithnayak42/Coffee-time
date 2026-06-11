import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { name: 'Sarah Johnson', text: '"Loved the French roast. Perfectly balanced and rich. Will order again!"', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
  { name: 'James Wilson', text: '"Great espresso blend! Smooth and bold flavor. Fast shipping too!"', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
  { name: 'Michael Brown', text: '"Fantastic mocha flavor. Fresh and aromatic. Quick shipping!"', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' },
  { name: 'Emily Davis', text: '"The latte art on my morning coffee was beautiful, and it tasted even better!"', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
  { name: 'David Miller', text: '"Best Americano I\'ve ever had. Highly recommend this place."', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
  { name: 'Sophia Taylor', text: '"The cold coffee is so refreshing on a hot day. Love the creamy texture!"', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
  { name: 'Christopher Anderson', text: '"Exceptional quality beans. I can taste the freshness in every sip."', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop' },
  { name: 'Olivia Martinez', text: '"A wonderful cozy atmosphere and top-tier cappuccino. My new favorite spot."', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
  { name: 'Daniel Thomas', text: '"I\'m a regular here for a reason. Consistently great espresso every time."', image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=200&auto=format&fit=crop' },
  { name: 'Isabella Garcia', text: '"The fresh juice options are a perfect healthy alternative. Highly recommend!"', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop' },
  { name: 'Matthew Robinson', text: '"Chocolate shake is absolutely decadent. Will definitely come back for more!"', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop' },
  { name: 'Emma Clark', text: '"Beautifully crafted drinks and incredibly friendly staff. Love it here!"', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop' },
  { name: 'Joshua Rodriguez', text: '"The mocha perfectly balances the coffee and chocolate. Perfection!"', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop' },
  { name: 'Ava Lewis', text: '"Always look forward to my iced latte here. Unbeatable flavor and quality."', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop' },
  { name: 'William Lee', text: '"This coffee shop sets the standard for excellent service and premium roasts."', image: 'https://images.unsplash.com/photo-1507114845806-0347f6150324?q=80&w=200&auto=format&fit=crop' }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [itemsToShow]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    let visible = [];
    for (let i = 0; i < itemsToShow; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section id="testimonials" className="py-24 bg-light-bg overflow-hidden">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center"
        >
          <h2 className="text-4xl font-bold text-text-dark mb-2">TESTIMONIALS</h2>
          <div className="w-16 h-1 bg-accent-orange"></div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={handlePrev} className="p-2 text-accent-orange hover:text-orange-600 transition-colors z-10 hidden md:block">
            <ChevronLeft size={48} strokeWidth={1.5} />
          </button>

          <div className="flex-1 overflow-hidden px-4 min-h-[300px] flex items-center">
            <div className={`grid w-full gap-8 transition-all duration-500 ${
              itemsToShow === 1 ? 'grid-cols-1' : itemsToShow === 2 ? 'grid-cols-2' : 'grid-cols-3'
            }`}>
              {getVisibleTestimonials().map((t, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 shadow-xl ring-4 ring-accent-orange/20">
                    <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-text-dark">{t.name}</h3>
                  <p className="text-gray-600 italic text-sm md:text-base max-w-[280px]">{t.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <button onClick={handleNext} className="p-2 text-accent-orange hover:text-orange-600 transition-colors z-10 hidden md:block">
            <ChevronRight size={48} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-12 flex-wrap max-w-md mx-auto">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-accent-orange' : 'bg-orange-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
