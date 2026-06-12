import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Truck, CreditCard, ShoppingBag, Download, ChevronLeft, MapPin } from 'lucide-react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!state) {
    return <Navigate to="/my-orders" />;
  }

  const orderId = state?.orderId || `COF-${Math.floor(10000 + Math.random() * 90000)}`;
  const formData = state?.formData || {};
  const paymentMethod = state?.paymentMethod || 'cod';
  const cartItems = state?.cartItems || [];
  const grandTotal = state?.grandTotal || 0;
  const subtotal = state?.subtotal || 0;
  const gst = state?.gst || 0;
  const deliveryFee = state?.deliveryFee || 0;

  const getPaymentLabel = (method) => {
    switch(method) {
      case 'cod': return 'Cash on Delivery';
      case 'upi': return 'UPI / Wallet';
      case 'card': return 'Credit / Debit Card';
      default: return 'Standard';
    }
  };

  const handleDownloadReceipt = () => {
    window.print();
  };

  const handleTrackOrder = () => {
    navigate('/track-order', { state });
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] pt-28 pb-20 px-4 font-sans print:bg-white print:pt-0 print:pb-0">
      <div className="container mx-auto max-w-2xl">
        
        {/* Back Navigation */}
        <button 
          onClick={() => navigate('/checkout')} 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-accent-orange text-white rounded-full font-medium transition-all duration-300 shadow-lg group mb-6 print:hidden"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Checkout
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a24] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden print:bg-white print:border-none print:shadow-none print:p-0 print:text-black"
        >
          {/* Header Banner */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-orange to-yellow-500 print:hidden"></div>
          
          <div className="text-center mb-8 pb-8 border-b border-white/10 print:border-gray-200">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 print:bg-green-100"
            >
              <CheckCircle size={40} className="text-green-500" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2 print:text-black">🎉 Order Placed Successfully!</h1>
            <p className="text-gray-400 print:text-gray-600">
              "Thank you for your order. Your coffee is being prepared."
            </p>
          </div>

          {/* Receipt Details */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm print:text-black">Receipt Details</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 bg-black/30 p-6 rounded-2xl border border-white/5 print:bg-gray-50 print:border-gray-200">
              <div>
                <p className="text-gray-400 text-xs mb-1 uppercase">Order ID</p>
                <p className="font-mono text-white font-bold print:text-black">{orderId}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1 uppercase">Date & Time</p>
                <p className="text-white text-sm font-medium print:text-black">{new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1 uppercase">Customer Name</p>
                <p className="text-white text-sm font-medium print:text-black">{formData.name || 'Customer'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1 uppercase">Phone Number</p>
                <p className="text-white text-sm font-medium print:text-black">{formData.phone || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 text-xs mb-1 uppercase">Delivery Address</p>
                <p className="text-white text-sm font-medium print:text-black">{formData.address}, {formData.city} - {formData.pincode}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 text-xs mb-1 uppercase">Payment Method</p>
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-accent-orange print:text-black" />
                  <p className="text-white text-sm font-medium print:text-black">{getPaymentLabel(paymentMethod)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm print:text-black">Ordered Items</h3>
            <div className="space-y-4">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5 print:bg-transparent print:border-b print:border-gray-200 print:rounded-none print:px-0">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-white/10 print:hidden" />
                    <div>
                      <p className="text-white font-medium print:text-black">{item.name}</p>
                      <p className="text-gray-400 text-xs print:text-gray-600">Unit Price: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs mb-0.5 print:text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-white font-mono font-bold print:text-black">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mb-8 bg-black/30 p-6 rounded-2xl border border-white/5 print:bg-gray-50 print:border-gray-200">
            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm print:text-black">Price Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400 text-sm print:text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm print:text-gray-600">
                <span>GST (5%)</span>
                <span>${gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm print:text-gray-600">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg pt-4 mt-4 border-t border-white/10 border-dashed print:text-black print:border-gray-300">
                <span>Grand Total</span>
                <span className="text-accent-orange print:text-black">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="mb-10 bg-accent-orange/10 border border-accent-orange/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
            <div>
              <p className="text-accent-orange text-xs font-bold uppercase mb-1">Current Status</p>
              <div className="flex items-center gap-2 text-white font-medium text-lg">
                <CheckCircle size={20} className="text-green-500" />
                Order Confirmed
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-accent-orange text-xs font-bold uppercase mb-1">Estimated Delivery Time</p>
              <p className="text-white font-mono text-xl font-bold">25 Minutes</p>
            </div>
          </div>

          {/* Receipt Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden border-t border-white/10 pt-8">
            <button 
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold transition-colors"
            >
              <Download size={20} /> Download Receipt
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold transition-colors"
            >
              <Home size={20} /> Back To Home
            </button>
            <button 
              onClick={handleTrackOrder}
              className="flex items-center justify-center gap-2 bg-accent-orange hover:bg-orange-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1"
            >
              <MapPin size={20} /> Track My Order
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
