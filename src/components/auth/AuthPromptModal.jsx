import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, UserPlus } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AuthPromptModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle } = useAuth();

  if (!isOpen) return null;

  const handleNavigate = (path) => {
    onClose();
    navigate(path, { state: { from: { pathname: '/order' } } });
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
      navigate('/order');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            {/* Background Ornaments */}
            <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-accent-orange/20 rounded-full blur-[80px] pointer-events-none"></div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-orange/20">
                <LogIn size={28} className="text-accent-orange" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Login Required</h2>
              <p className="text-gray-400 mb-8">Please login to continue ordering and access premium features.</p>

              <div className="space-y-4">
                <button 
                  onClick={() => handleNavigate('/login')}
                  className="w-full bg-accent-orange hover:bg-orange-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <LogIn size={20} /> Log In
                </button>
                
                <button 
                  onClick={() => handleNavigate('/signup')}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus size={20} /> Create Account
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-gray-500">Or continue with</span>
                  </div>
                </div>

                <button 
                  onClick={handleGoogleLogin}
                  className="w-full bg-white text-gray-900 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
                >
                  <FcGoogle size={24} /> Google Sign In
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
