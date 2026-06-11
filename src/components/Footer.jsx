import React from 'react';
import { Coffee } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-primary-maroon text-gray-300 py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Coffee size={32} className="text-white" />
            <span className="text-white text-2xl font-bold tracking-wider">Coffee</span>
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="#home" className="hover:text-accent-orange transition-colors">Home</a>
            <a href="#about" className="hover:text-accent-orange transition-colors">About</a>
            <a href="#menu" className="hover:text-accent-orange transition-colors">Menu</a>
            <a href="#testimonials" className="hover:text-accent-orange transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-accent-orange transition-colors">Contact</a>
          </div>

          <div className="flex gap-4">
            <a href="https://www.instagram.com/toxic.boy.03" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-maroon text-white flex items-center justify-center hover:bg-accent-orange transition-all duration-300 hover:scale-110">
              <FaInstagram size={20} />
            </a>
            <a href="https://wa.me/919908058796" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-maroon text-white flex items-center justify-center hover:bg-accent-orange transition-all duration-300 hover:scale-110">
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Coffee House. All rights reserved. Designed for excellence.</p>
        </div>
      </div>
    </footer>
  );
}
