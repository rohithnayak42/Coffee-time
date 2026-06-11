import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, setIsCartOpen, cartItems } = useCart();
  const isWishlisted = wishlist.includes(product.id);
  const inCart = cartItems.find(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <motion.div 
      variants={cardVariants}
      className="bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 hover:border-accent-orange/50 shadow-xl hover:shadow-[0_0_25px_rgba(245,166,35,0.25)] transition-all duration-300 group flex flex-col h-full hover:-translate-y-1.5 relative"
    >
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        {/* Glass reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-transparent z-10 pointer-events-none mix-blend-overlay"></div>
        
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 p-2.5 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 hover:scale-110 transition-all z-20"
        >
          <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
        </button>

        {product.isSpecial && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-accent-orange text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 flex items-center gap-1">
            ⭐ Featured
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow relative z-20">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-accent-orange transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-lg">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-semibold">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-5 line-clamp-2 flex-grow font-light">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-accent-orange">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button 
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg active:scale-[0.98] ${
              inCart 
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/25' 
                : 'bg-gradient-to-r from-orange-500 to-accent-orange hover:from-orange-400 hover:to-orange-500 text-white shadow-orange-500/25 hover:scale-105'
            }`}
          >
            {inCart ? (
              <><Check size={18} /> Added</>
            ) : (
              <><ShoppingBag size={18} /> Add</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
