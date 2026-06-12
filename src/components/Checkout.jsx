import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Banknote, ShieldCheck, MapPin, Loader2, CheckCircle, Smartphone } from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartTotal, gst, clearCart } = useCart();
  const navigate = useNavigate();

  const DELIVERY_FEE = cartTotal > 0 ? 2.50 : 0;
  const grandTotal = cartTotal + gst + DELIVERY_FEE;

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', city: '', pincode: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success
  const [isPlacing, setIsPlacing] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    number: '', name: '', expiry: '', cvv: ''
  });

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Valid 10-digit phone required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Valid email required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.pincode.trim()) errors.pincode = 'Pincode is required';
    return errors;
  };

  useEffect(() => {
    setFormErrors(validateForm());
    // Reset payment status when changing methods
    if (paymentMethod !== 'cod') {
      setPaymentStatus('idle');
    }
  }, [formData, paymentMethod]);

  const isFormValid = Object.keys(formErrors).length === 0;
  const isPaymentValid = paymentMethod === 'cod' || paymentStatus === 'success';
  const canPlaceOrder = isFormValid && isPaymentValid && cartItems.length > 0;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCardChange = (e) => setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await res.json();
        
        setFormData(prev => ({
          ...prev,
          address: data.display_name || '',
          city: data.address?.city || data.address?.town || data.address?.village || data.address?.county || '',
          pincode: data.address?.postcode || ''
        }));
        alert("Location detected successfully!");
      } catch (err) {
        alert("Failed to reverse geocode location. Please enter manually.");
      } finally {
        setIsLocating(false);
      }
    }, (error) => {
      setIsLocating(false);
      alert("Location permission denied or unavailable. Please enter manually.");
    });
  };

  const handleSimulatePayment = () => {
    if (paymentMethod === 'card' && (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      return alert("Please fill all card details for the demo simulation.");
    }
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!canPlaceOrder) return;
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
      
      if (res.ok && data.success) {
        clearCart();
        
        const newOrder = { 
          orderId: `COF-${data.orderId}`, 
          date: new Date().toISOString(), 
          status: 'Preparing Order', 
          grandTotal, 
          items: cartItems 
        };
        const existingOrders = JSON.parse(localStorage.getItem('coffee_orders') || '[]');
        localStorage.setItem('coffee_orders', JSON.stringify([newOrder, ...existingOrders]));

        navigate('/order-confirmation', { 
          state: { orderId: `COF-${data.orderId}`, formData, paymentMethod, grandTotal, cartItems, deliveryFee: DELIVERY_FEE, subtotal: cartTotal, gst }
        });
      } else {
        throw new Error('API failed');
      }
    } catch (err) {
      console.warn('Backend unavailable. Mocking order placement for production demo:', err);
      const mockOrderId = Math.floor(Math.random() * 1000000);
      clearCart();
      
      const newOrder = { 
        orderId: `COF-${mockOrderId}`, 
        date: new Date().toISOString(), 
        status: 'Preparing Order', 
        grandTotal, 
        items: cartItems 
      };
      const existingOrders = JSON.parse(localStorage.getItem('coffee_orders') || '[]');
      localStorage.setItem('coffee_orders', JSON.stringify([newOrder, ...existingOrders]));

      navigate('/order-confirmation', { 
        state: { orderId: `COF-${mockOrderId}`, formData, paymentMethod, grandTotal, cartItems, deliveryFee: DELIVERY_FEE, subtotal: cartTotal, gst }
      });
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
      <div className="container mx-auto max-w-6xl">
        <button 
          onClick={() => navigate('/order')} 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-accent-orange text-white rounded-full font-medium transition-all duration-300 shadow-lg group mb-8"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Cart
        </button>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-white">Delivery Details</h2>
                <button 
                  type="button" 
                  onClick={handleGetLocation} 
                  disabled={isLocating}
                  className="flex items-center gap-2 bg-accent-orange/20 text-accent-orange hover:bg-accent-orange/30 px-4 py-2 rounded-xl transition-colors font-semibold text-sm disabled:opacity-50"
                >
                  {isLocating ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
                  Use My Current Location
                </button>
              </div>
              
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full bg-black/20 border ${formData.name && formErrors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors`} />
                  {formData.name && formErrors.name && <span className="text-red-500 text-xs mt-1 block">{formErrors.name}</span>}
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full bg-black/20 border ${formData.phone && formErrors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors`} />
                  {formData.phone && formErrors.phone && <span className="text-red-500 text-xs mt-1 block">{formErrors.phone}</span>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full bg-black/20 border ${formData.email && formErrors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors`} />
                  {formData.email && formErrors.email && <span className="text-red-500 text-xs mt-1 block">{formErrors.email}</span>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Delivery Address *</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} className={`w-full bg-black/20 border ${formData.address && formErrors.address ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors`} />
                  {formData.address && formErrors.address && <span className="text-red-500 text-xs mt-1 block">{formErrors.address}</span>}
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">City *</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className={`w-full bg-black/20 border ${formData.city && formErrors.city ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors`} />
                  {formData.city && formErrors.city && <span className="text-red-500 text-xs mt-1 block">{formErrors.city}</span>}
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Pincode *</label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleChange} className={`w-full bg-black/20 border ${formData.pincode && formErrors.pincode ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-accent-orange outline-none transition-colors`} />
                  {formData.pincode && formErrors.pincode && <span className="text-red-500 text-xs mt-1 block">{formErrors.pincode}</span>}
                </div>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
              <div className="space-y-4">
                
                {/* Cash on Delivery */}
                <div className={`rounded-xl border transition-all ${paymentMethod === 'cod' ? 'border-accent-orange bg-accent-orange/5' : 'border-white/10 hover:border-white/30'}`}>
                  <label className="flex items-center gap-4 p-4 cursor-pointer w-full">
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-accent-orange" />
                    <Banknote className={paymentMethod === 'cod' ? 'text-accent-orange' : 'text-gray-400'} />
                    <span className="text-white font-medium">Cash on Delivery</span>
                  </label>
                </div>

                {/* UPI / Wallet */}
                <div className={`rounded-xl border overflow-hidden transition-all ${paymentMethod === 'upi' ? 'border-accent-orange bg-accent-orange/5' : 'border-white/10 hover:border-white/30'}`}>
                  <label className="flex items-center gap-4 p-4 cursor-pointer w-full">
                    <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-accent-orange" />
                    <Smartphone className={paymentMethod === 'upi' ? 'text-accent-orange' : 'text-gray-400'} />
                    <span className="text-white font-medium">UPI / Wallet (Demo)</span>
                  </label>
                  <AnimatePresence>
                    {paymentMethod === 'upi' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-6 pt-2 border-t border-white/5">
                        <div className="flex flex-col items-center p-4 bg-black/40 rounded-xl">
                          <div className="w-32 h-32 bg-white p-2 rounded-lg mb-4 flex items-center justify-center">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DemoPayment" alt="UPI QR" className="w-full h-full object-cover" />
                          </div>
                          <p className="text-gray-400 text-sm mb-4">Scan QR code using any UPI app</p>
                          <div className="flex gap-4 mb-4 opacity-50">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-xs text-white">GPay</div>
                            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center font-bold text-xs text-white">PhPe</div>
                            <div className="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-bold text-xs text-white">Paytm</div>
                          </div>
                          
                          {paymentStatus === 'idle' && (
                            <button type="button" onClick={handleSimulatePayment} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-white font-medium transition-colors text-sm">
                              Simulate Payment
                            </button>
                          )}
                          {paymentStatus === 'processing' && (
                            <div className="flex items-center gap-2 text-accent-orange">
                              <Loader2 size={18} className="animate-spin" /> Processing...
                            </div>
                          )}
                          {paymentStatus === 'success' && (
                            <div className="flex items-center gap-2 text-green-500 font-bold">
                              <CheckCircle size={18} /> Payment Successful!
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Credit / Debit Card */}
                <div className={`rounded-xl border overflow-hidden transition-all ${paymentMethod === 'card' ? 'border-accent-orange bg-accent-orange/5' : 'border-white/10 hover:border-white/30'}`}>
                  <label className="flex items-center gap-4 p-4 cursor-pointer w-full">
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-accent-orange" />
                    <CreditCard className={paymentMethod === 'card' ? 'text-accent-orange' : 'text-gray-400'} />
                    <span className="text-white font-medium">Credit / Debit Card (Demo)</span>
                  </label>
                  <AnimatePresence>
                    {paymentMethod === 'card' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-6 pt-2 border-t border-white/5">
                        <div className="bg-black/40 p-5 rounded-xl space-y-4">
                          <div>
                            <label className="block text-gray-400 text-xs mb-1">Card Number</label>
                            <input type="text" name="number" placeholder="0000 0000 0000 0000" value={cardDetails.number} onChange={handleCardChange} className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-accent-orange font-mono" />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-xs mb-1">Cardholder Name</label>
                            <input type="text" name="name" placeholder="JOHN DOE" value={cardDetails.name} onChange={handleCardChange} className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-accent-orange uppercase" />
                          </div>
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className="block text-gray-400 text-xs mb-1">Expiry Date</label>
                              <input type="text" name="expiry" placeholder="MM/YY" value={cardDetails.expiry} onChange={handleCardChange} className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-accent-orange font-mono" />
                            </div>
                            <div className="flex-1">
                              <label className="block text-gray-400 text-xs mb-1">CVV</label>
                              <input type="password" name="cvv" placeholder="•••" maxLength="4" value={cardDetails.cvv} onChange={handleCardChange} className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-accent-orange font-mono" />
                            </div>
                          </div>
                          
                          <div className="pt-4 flex justify-end">
                            {paymentStatus === 'idle' && (
                              <button type="button" onClick={handleSimulatePayment} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-white font-medium transition-colors text-sm">
                                Verify Card
                              </button>
                            )}
                            {paymentStatus === 'processing' && (
                              <div className="flex items-center gap-2 text-accent-orange">
                                <Loader2 size={18} className="animate-spin" /> Verifying...
                              </div>
                            )}
                            {paymentStatus === 'success' && (
                              <div className="flex items-center gap-2 text-green-500 font-bold">
                                <CheckCircle size={18} /> Card Verified!
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-black/40 border border-white/10 rounded-3xl p-6 sticky top-32 backdrop-blur-md shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-bold line-clamp-1">{item.name}</h4>
                        <p className="text-gray-400 text-xs mt-0.5">Qty: {item.quantity}</p>
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
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Delivery Fee</span>
                  <span className="text-white">${DELIVERY_FEE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white text-lg font-bold pt-3 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="text-accent-orange">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {!isFormValid && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg mb-4">
                  Please complete all required delivery details correctly.
                </div>
              )}
              
              {isFormValid && !isPaymentValid && (
                <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs p-3 rounded-lg mb-4">
                  Please complete the payment simulation to proceed.
                </div>
              )}

              <button 
                type="submit" 
                form="checkout-form"
                disabled={!canPlaceOrder || isPlacing}
                className="w-full py-4 bg-accent-orange hover:bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
              >
                <ShieldCheck size={20} />
                {isPlacing ? 'Processing...' : 'Place Order Securely'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
