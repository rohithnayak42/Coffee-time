import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/shop/CartDrawer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FloatingChatbot from './components/FloatingChatbot';

// Lazy loaded components for performance
const Home = React.lazy(() => import('./components/Home'));
const Order = React.lazy(() => import('./components/Order'));
const Checkout = React.lazy(() => import('./components/Checkout'));
const OrderConfirmation = React.lazy(() => import('./components/OrderConfirmation'));
const TrackOrder = React.lazy(() => import('./components/TrackOrder'));
const MyOrders = React.lazy(() => import('./components/MyOrders'));
const Login = React.lazy(() => import('./components/auth/Login'));
const SignUp = React.lazy(() => import('./components/auth/SignUp'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const FallbackLoader = () => (
  <div className="min-h-screen bg-primary-maroon flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-white/20 border-t-accent-orange rounded-full animate-spin"></div>
  </div>
);

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <CartProvider>
        <div className="font-sans antialiased text-text-dark bg-primary-maroon relative min-h-screen overflow-hidden">
          <Navbar />
          <CartDrawer />
          <FloatingChatbot />
          <AnimatePresence mode="wait">
            <Suspense fallback={<FallbackLoader />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/order" element={<PageTransition><ProtectedRoute><Order /></ProtectedRoute></PageTransition>} />
                <Route path="/checkout" element={<PageTransition><ProtectedRoute><Checkout /></ProtectedRoute></PageTransition>} />
                <Route path="/order-confirmation" element={<PageTransition><ProtectedRoute><OrderConfirmation /></ProtectedRoute></PageTransition>} />
                <Route path="/track-order" element={<PageTransition><ProtectedRoute><TrackOrder /></ProtectedRoute></PageTransition>} />
                <Route path="/my-orders" element={<PageTransition><ProtectedRoute><MyOrders /></ProtectedRoute></PageTransition>} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
                
                {/* Dashboard */}
                <Route path="/dashboard" element={<PageTransition><ProtectedRoute><Dashboard /></ProtectedRoute></PageTransition>} />
                
                {/* Admin */}
                <Route path="/admin" element={<PageTransition><ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute></PageTransition>} />
              </Routes>
            </Suspense>
          </AnimatePresence>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
