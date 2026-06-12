import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Clock, MapPin, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedOrders = JSON.parse(localStorage.getItem('coffee_orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Preparing Order': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'Out For Delivery': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-400 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-primary-maroon pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')} 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-accent-orange text-white rounded-full font-medium transition-all duration-300 shadow-lg group mb-8"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </button>
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={32} className="text-accent-orange" />
          <h1 className="text-3xl font-bold text-white">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white/5 border border-white/10 rounded-3xl p-12"
          >
            <ShoppingBag size={48} className="text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No orders yet</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't placed any orders yet.</p>
            <button 
              onClick={() => navigate('/order')}
              className="bg-accent-orange hover:bg-orange-500 text-white px-8 py-3 rounded-full font-bold transition-colors"
            >
              Start Ordering
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="bg-white/5 border border-white/10 hover:border-white/20 transition-colors rounded-3xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{order.orderId}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <span className="flex items-center gap-1"><Clock size={14} /> {new Date(order.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-gray-400 text-sm mb-1">Total Amount</p>
                    <p className="text-xl font-bold text-accent-orange">${order.grandTotal.toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="text-gray-400 text-sm mb-3">Order Items</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {order.items.map((item, i) => (
                      <span key={i} className="bg-black/30 text-gray-300 px-3 py-1.5 rounded-lg text-sm border border-white/5">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-4">
                    {order.status !== 'Delivered' && (
                      <button 
                        onClick={() => navigate('/track-order', { state: { orderId: order.orderId, formData: { name: 'Customer' }, grandTotal: order.grandTotal, cartItems: order.items } })}
                        className="bg-accent-orange hover:bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        Track Order <ChevronRight size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => navigate('/order')}
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-bold transition-colors text-center"
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
