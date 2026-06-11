import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal, gst, grandTotal } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Blur Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Premium Glass Drawer */}
          <motion.div 
            initial={{ x: '100%', boxShadow: '-20px 0 50px rgba(0,0,0,0)' }}
            animate={{ x: 0, boxShadow: '-20px 0 50px rgba(0,0,0,0.5)' }}
            exit={{ x: '100%', boxShadow: '-20px 0 50px rgba(0,0,0,0)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-primary-maroon/95 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20">
              <div className="flex items-center gap-4 text-white">
                <div className="bg-accent-orange/20 p-3 rounded-2xl">
                  <ShoppingCart size={24} className="text-accent-orange" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-wide">Your Cart</h2>
                  <p className="text-sm text-gray-400 font-medium">{cartItems.length} items</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10 hover:rotate-90 duration-300"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cartItems.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-gray-400 gap-6"
                >
                  <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <ShoppingCart size={48} className="opacity-30 text-accent-orange" />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-2">Your cart is empty</p>
                    <p className="text-gray-500">Looks like you haven't made a choice yet.</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all"
                  >
                    Start Browsing
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: 50 }}
                      key={item.id} 
                      className="flex gap-4 bg-black/40 p-4 rounded-2xl border border-white/5 relative group hover:border-white/20 transition-all shadow-lg"
                    >
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative border border-white/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start pr-8">
                          <div>
                            <h4 className="text-white font-bold text-lg leading-tight mb-1">{item.name}</h4>
                            <span className="text-accent-orange font-extrabold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-3 bg-black/50 w-fit rounded-lg border border-white/10 p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-white font-bold w-6 text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Remove item */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all p-2 rounded-full opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer / Summary */}
            {cartItems.length > 0 && (
              <motion.div 
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md"
              >
                <div className="space-y-3 mb-6 bg-white/5 p-5 rounded-2xl border border-white/5">
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Subtotal</span>
                    <span className="text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>GST (5%)</span>
                    <span className="text-white">${gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-black pt-4 border-t border-white/10 mt-2">
                    <span className="text-white">Grand Total</span>
                    <span className="text-accent-orange text-2xl">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-accent-orange hover:from-orange-400 hover:to-orange-500 text-white rounded-2xl font-bold flex justify-center items-center gap-2 shadow-[0_10px_30px_rgba(245,166,35,0.3)] transition-all hover:-translate-y-1 text-lg"
                >
                  Proceed to Checkout <ArrowRight size={22} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
