import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, UserPlus, ArrowLeft, User } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    try {
      setError('');
      setLoading(true);
      await signup(email, password, name);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to create an account.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to sign up with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-maroon flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-accent-orange/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-red-900/40 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10 my-10">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Join us for premium coffee experiences</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm mb-2 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-orange/50 focus:bg-white/10 transition-all"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-orange/50 focus:bg-white/10 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-accent-orange/50 focus:bg-white/10 transition-all"
                  placeholder="Create a password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-accent-orange hover:bg-orange-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><UserPlus size={20} /> Sign Up</>}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-500">Or continue with</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleSignup}
            disabled={loading}
            className="mt-6 w-full bg-white text-gray-900 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <FcGoogle size={24} /> Google
          </button>

          <p className="mt-8 text-center text-gray-400 text-sm">
            Already have an account? <Link to="/login" className="text-accent-orange font-bold hover:underline">Log In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
