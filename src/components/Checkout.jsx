import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Banknote, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartTotal, gst, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', city: '', pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [isPlacing, setIsPlacing] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Your cart is empty!");
    setIsPlacing(true);
    
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            fullName: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode,
            paymentMethod
          },
          items: cartItems,
          total: cartTotal,
          gst,
          grandTotal
        })
      });
      const data = await res.json();
      
      if (data.success) {
        clearCart();
        navigate('/order-confirmation', { 
          state: { orderId: `COF-${data.orderId}`, ...formData }
        });
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (err) {
      console.error('Order error:', err);
      alert('Network error. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-primary-maroon flex items-center justify-center pt-20">
        <div className="text-center text-white">
          <h2 className="text-2xl mb-4">Your cart is empty!</h2>
          <button onClick={() => navigate('/order')} className="bg-accent-orange px-6 py-2 rounded-full font-bold">
            Go back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-maroon pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <button onClick={() => navigate('/order')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ChevronLeft size={20} /> Back to Menu
        </button>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">Delivery Details</h2>
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Customer Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Delivery Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Pincode</label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors" />
                </div>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-accent-orange bg-accent-orange/10' : 'border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-accent-orange" />
                  <Banknote className={paymentMethod === 'cod' ? 'text-accent-orange' : 'text-gray-400'} />
                  <span className="text-white font-medium">Cash on Delivery</span>
                </label>
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-accent-orange bg-accent-orange/10' : 'border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-accent-orange" />
                  <ShieldCheck className={paymentMethod === 'upi' ? 'text-accent-orange' : 'text-gray-400'} />
                  <span className="text-white font-medium">UPI / Wallet</span>
                </label>
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-accent-orange bg-accent-orange/10' : 'border-white/10 hover:border-white/30'}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-accent-orange" />
                  <CreditCard className={paymentMethod === 'card' ? 'text-accent-orange' : 'text-gray-400'} />
                  <span className="text-white font-medium">Credit / Debit Card</span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-black/40 border border-white/10 rounded-3xl p-6 sticky top-32 backdrop-blur-md">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-semibold line-clamp-1">{item.name}</h4>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-accent-orange font-bold text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span className="text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>GST (5%)</span>
                  <span className="text-white">${gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white text-lg font-bold pt-2">
                  <span>Total</span>
                  <span className="text-accent-orange">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isPlacing}
                className="w-full py-4 bg-accent-orange hover:bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <ShieldCheck size={20} />
                {isPlacing ? 'Placing Order...' : 'Place Order'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
