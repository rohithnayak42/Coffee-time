import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ThumbsUp, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const dummyReviews = [
  { id: 1, user: 'Alice Smith', rating: 5, text: 'Absolutely love this coffee! Perfect balance of flavors.', likes: 12, date: '2 days ago' },
  { id: 2, user: 'John Doe', rating: 4, text: 'Great taste, but I wish it was a bit stronger.', likes: 5, date: '1 week ago' },
  { id: 3, user: 'Emma Wilson', rating: 5, text: 'My everyday morning go-to drink. Highly recommend!', likes: 24, date: '2 weeks ago' },
];

export default function ProductDetailsModal({ product, isOpen, onClose }) {
  const { addToCart, cartItems, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState('details'); // details, reviews
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  if (!isOpen || !product) return null;

  const inCart = cartItems.find(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userRating === 0) return alert('Please select a star rating');
    alert('Review submitted successfully!');
    setUserRating(0);
    setReviewText('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-primary-maroon border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Image Section */}
            <div className="w-full md:w-1/2 bg-black/20 relative min-h-[300px] md:min-h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-primary-maroon via-transparent to-transparent z-10 md:hidden" />
              <img 
                src={product.image || '/images/coffee_fallback.png'} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-1/2 flex flex-col h-full max-h-[500px] md:max-h-full overflow-hidden">
              <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                
                {/* Header Info */}
                <div className="mb-6 relative z-20">
                  <span className="text-accent-orange text-sm font-bold uppercase tracking-wider mb-2 block">{product.category}</span>
                  <h2 className="text-3xl font-black text-white mb-2">{product.name}</h2>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-white">${parseFloat(product.price).toFixed(2)}</span>
                    <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-bold">{product.rating}</span>
                      <span className="text-gray-400 text-sm ml-1">(128 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 border-b border-white/10 mb-6">
                  <button 
                    onClick={() => setActiveTab('details')}
                    className={`pb-3 font-bold text-sm transition-colors relative ${activeTab === 'details' ? 'text-accent-orange' : 'text-gray-400 hover:text-white'}`}
                  >
                    Details
                    {activeTab === 'details' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-orange" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-3 font-bold text-sm transition-colors relative ${activeTab === 'reviews' ? 'text-accent-orange' : 'text-gray-400 hover:text-white'}`}
                  >
                    Reviews (128)
                    {activeTab === 'reviews' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-orange" />}
                  </button>
                </div>

                {/* Tab Content */}
                <div className="mb-8">
                  {activeTab === 'details' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {product.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                          <p className="text-gray-400 text-xs mb-1">Roast Level</p>
                          <p className="text-white font-bold">Medium Dark</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                          <p className="text-gray-400 text-xs mb-1">Intensity</p>
                          <p className="text-white font-bold">8 / 10</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      
                      {/* Write Review Form */}
                      <form onSubmit={handleSubmitReview} className="bg-black/30 p-5 rounded-2xl border border-white/10 mb-6">
                        <h4 className="text-white font-bold mb-3">Write a Review</h4>
                        <div className="flex gap-2 mb-3">
                          {[1,2,3,4,5].map(star => (
                            <button key={star} type="button" onClick={() => setUserRating(star)}>
                              <Star size={24} className={star <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
                            </button>
                          ))}
                        </div>
                        <textarea 
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your experience..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-accent-orange resize-none h-20 mb-3"
                        />
                        <button type="submit" className="bg-accent-orange text-white px-4 py-2 rounded-lg font-bold text-sm w-full">
                          Submit Review
                        </button>
                      </form>

                      {/* Reviews List */}
                      <div className="space-y-4">
                        {dummyReviews.map(review => (
                          <div key={review.id} className="border-b border-white/5 pb-4 last:border-0">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center font-bold text-white text-xs">
                                  {review.user.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-white text-sm font-bold">{review.user}</p>
                                  <p className="text-gray-500 text-xs">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex gap-0.5">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-3">{review.text}</p>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-white text-xs font-medium transition-colors">
                              <ThumbsUp size={14} /> Helpful ({review.likes})
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 md:p-8 bg-black/40 border-t border-white/10">
                <button 
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all shadow-lg text-lg ${
                    inCart 
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20' 
                      : 'bg-accent-orange hover:bg-orange-500 text-white shadow-orange-500/20 hover:-translate-y-0.5'
                  }`}
                >
                  {inCart ? (
                    <><Check size={20} /> Added to Cart</>
                  ) : (
                    <><ShoppingBag size={20} /> Add to Cart - ${(parseFloat(product.price)).toFixed(2)}</>
                  )}
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
