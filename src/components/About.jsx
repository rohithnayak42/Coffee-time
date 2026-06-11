import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function About() {
  return (
    <section id="about" className="py-24 bg-light-bg">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=800&auto=format&fit=crop" 
              alt="People enjoying coffee" 
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-[2rem] md:rounded-full shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h2 className="text-4xl font-bold text-text-dark mb-2">ABOUT US</h2>
            <div className="w-16 h-1 bg-accent-orange mx-auto md:mx-0 mb-8"></div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              At Coffee House in Berndorf, Germany, we pride ourselves on being a go-to destination for coffee lovers and conversation seekers alike. We're dedicated to providing an exceptional coffee experience in a cozy and inviting atmosphere, where guests can relax, unwind, and enjoy their time in comfort.
            </p>

            <div className="flex justify-center md:justify-start gap-6">
              <a href="https://www.instagram.com/toxic.boy.03" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-maroon text-white flex items-center justify-center hover:bg-accent-orange transition-all duration-300 hover:scale-110">
                <FaInstagram size={20} />
              </a>
              <a href="https://wa.me/919908058796" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-maroon text-white flex items-center justify-center hover:bg-accent-orange transition-all duration-300 hover:scale-110">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
