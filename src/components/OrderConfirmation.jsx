import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const orderId = state?.orderId || `COF-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="min-h-screen bg-primary-maroon flex items-center justify-center pt-20 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-orange to-yellow-500"></div>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} className="text-green-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2">Thank you for your order!</h1>
        <p className="text-gray-400 mb-8">
          We've received your order and are preparing it fresh for you.
        </p>

        <div className="bg-black/30 rounded-2xl p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between border-b border-white/5 pb-4">
            <span className="text-gray-400">Order ID</span>
            <span className="font-mono text-white font-bold">{orderId}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-400">Estimated Prep Time</span>
            <span className="flex items-center gap-2 text-accent-orange font-bold">
              <Clock size={18} /> 15 - 20 mins
            </span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center gap-2 mx-auto"
        >
          <Home size={20} /> Back to Home
        </button>
      </motion.div>
    </div>
  );
}
