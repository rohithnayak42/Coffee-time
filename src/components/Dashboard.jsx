import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Coffee, Star, MapPin, Heart, Package } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-primary-maroon pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 sticky top-28"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-accent-orange/20 rounded-full flex items-center justify-center mb-4 border-2 border-accent-orange">
                  <User size={40} className="text-accent-orange" />
                </div>
                <h2 className="text-xl font-bold text-white">{currentUser?.name}</h2>
                <p className="text-gray-400 text-sm">{currentUser?.email}</p>
                {currentUser?.role === 'admin' && (
                  <span className="mt-2 bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30 uppercase tracking-wider">Admin</span>
                )}
              </div>

              <div className="space-y-2 mb-8">
                <button className="w-full flex items-center gap-3 text-white bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors text-sm font-medium">
                  <Package size={18} className="text-accent-orange" /> My Orders
                </button>
                <button className="w-full flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 p-3 rounded-xl transition-colors text-sm font-medium">
                  <Heart size={18} /> Favorites
                </button>
                <button className="w-full flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 p-3 rounded-xl transition-colors text-sm font-medium">
                  <MapPin size={18} /> Saved Addresses
                </button>
                {currentUser?.role === 'admin' && (
                  <button onClick={() => navigate('/admin')} className="w-full flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 p-3 rounded-xl transition-colors text-sm font-medium">
                    <Star size={18} /> Admin Panel
                  </button>
                )}
              </div>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 p-3 rounded-xl transition-colors text-sm font-bold"
              >
                <LogOut size={18} /> Logout
              </button>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold text-white mb-6">Welcome back, {currentUser?.name.split(' ')[0]}! 👋</h1>
              
              {/* Loyalty Card */}
              <div className="bg-gradient-to-r from-accent-orange to-orange-600 rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-orange-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <p className="text-white/80 font-medium mb-1 text-sm uppercase tracking-wider">Loyalty Rewards</p>
                    <div className="flex items-end gap-2">
                      <h2 className="text-5xl font-black text-white">{currentUser?.loyaltyPoints || 0}</h2>
                      <span className="text-white/80 font-bold mb-1">Pts</span>
                    </div>
                  </div>
                  <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-4 w-full md:w-64">
                    <div className="flex justify-between text-white text-sm font-bold mb-2">
                      <span>Bronze</span>
                      <span>500 Pts to Silver</span>
                    </div>
                    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: `${Math.min(((currentUser?.loyaltyPoints || 0) / 500) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Orders Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Recent Orders</h3>
                <button onClick={() => navigate('/my-orders')} className="text-accent-orange text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="text-center py-10 border-2 border-dashed border-white/10 rounded-2xl">
                <Coffee className="mx-auto text-gray-500 mb-3" size={32} />
                <p className="text-gray-400">You haven't placed any recent orders.</p>
                <button onClick={() => navigate('/order')} className="mt-4 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl font-medium transition-colors">
                  Order Now
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
