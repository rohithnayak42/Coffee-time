import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CheckCircle, Phone, MessageCircle, Star, Package, Coffee, Bike, Home, Clock, ChevronLeft, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet Default Icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const createCustomIcon = (iconHtml, bgColor = 'bg-[#1a1a24]') => {
  return L.divIcon({
    html: `<div class="w-10 h-10 ${bgColor} rounded-full flex items-center justify-center border-2 border-white shadow-lg text-white">
            ${iconHtml}
           </div>`,
    className: 'custom-leaflet-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

const shopIcon = createCustomIcon(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`, 'bg-black');

const homeIcon = createCustomIcon(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`, 'bg-green-600');

const bikeIconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"></circle><circle cx="18.5" cy="17.5" r="3.5"></circle><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"></path></svg>`;

const TRACKING_STEPS = [
  { id: 1, title: 'Order Confirmed', desc: 'We have received your order', icon: CheckCircle, time: '10:00 AM' },
  { id: 2, title: 'Preparing Coffee', desc: 'Your coffee is being prepared ☕', icon: Coffee, time: '10:03 AM' },
  { id: 3, title: 'Packed', desc: 'Ready for pickup', icon: Package, time: '10:08 AM' },
  { id: 4, title: 'Rider Assigned', desc: 'Rohit is on the way to the shop', icon: Bike, time: '10:10 AM' },
  { id: 5, title: 'Out For Delivery', desc: 'Order picked up 🛵', icon: MapPin, time: '10:15 AM' },
  { id: 6, title: 'Near Your Location', desc: 'Arriving very soon 🎉', icon: MapPin, time: '10:25 AM' },
  { id: 7, title: 'Delivered', desc: 'Enjoy your coffee!', icon: Home, time: '10:30 AM' }
];

// Mock Route Points for Map
const routeCoords = [
  [17.3850, 78.4866], // Shop
  [17.3870, 78.4886],
  [17.3910, 78.4890],
  [17.3950, 78.4900],
  [17.3980, 78.4920],
  [17.4010, 78.4950],
  [17.4050, 78.4966]  // Customer
];

// Component to handle map view fitting
function MapBounds({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, coords]);
  return null;
}

export default function TrackOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(24 * 60 + 59); // 24:59
  const [bikePosition, setBikePosition] = useState(routeCoords[0]);
  const [notification, setNotification] = useState(null);

  // Notifications logic
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Timer logic
  useEffect(() => {
    if (currentStep === 7) return; 
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentStep]);

  // Step advancement & bike animation logic
  useEffect(() => {
    if (currentStep === 7) return;
    
    // Simulate progression over time
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = prev + 1;
        if (nextStep > 7) {
          clearInterval(interval);
          return prev;
        }

        // Trigger notifications based on step
        if (nextStep === 2) showNotification("☕ Your coffee is being prepared");
        if (nextStep === 3) showNotification("📦 Order packed successfully");
        if (nextStep === 5) showNotification("🏍 Rider picked up your order");
        if (nextStep === 6) showNotification("📍 Rider is approaching your location");
        if (nextStep === 7) showNotification("🎉 Order delivered successfully");

        // Calculate bike position
        // Steps 5, 6, 7 represent moving on the map
        if (nextStep >= 5) {
          const routeIndex = Math.min(
            Math.floor(((nextStep - 4) / 3) * (routeCoords.length - 1)), 
            routeCoords.length - 1
          );
          setBikePosition(routeCoords[routeIndex]);
        }

        return nextStep;
      });
    }, 8000); // Step advances every 8 seconds for demo

    return () => clearInterval(interval);
  }, [currentStep]);

  if (!state) {
    return <Navigate to="/my-orders" />;
  }

  const { orderId, formData, cartItems, grandTotal, paymentMethod } = state;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getActiveBikeIcon = () => {
    return createCustomIcon(bikeIconHtml, currentStep >= 5 ? 'bg-accent-orange' : 'bg-gray-500');
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] pt-28 pb-20 font-sans text-white relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 bg-[#1a1a24] border border-accent-orange/30 shadow-xl px-6 py-3 rounded-full flex items-center gap-3 whitespace-nowrap"
          >
            <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></div>
            <p className="font-medium text-white">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Back Navigation */}
        <button 
          onClick={() => navigate('/order-confirmation', { state })} 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-accent-orange text-white rounded-full font-medium transition-all duration-300 shadow-lg group mb-6"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Receipt
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Live Tracking</h1>
            <p className="text-gray-400 font-mono text-sm">Order #{orderId}</p>
          </div>
          {currentStep < 7 && (
            <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-3 flex items-center gap-4 backdrop-blur-md">
              <div className="bg-accent-orange/20 p-2 rounded-full">
                <Clock className="text-accent-orange" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Estimated Arrival</p>
                <p className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                  {formatTime(timeLeft)}
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-orange"></span>
                  </span>
                </p>
              </div>
            </div>
          )}
          {currentStep === 7 && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-2xl px-6 py-3 flex items-center gap-4 backdrop-blur-md">
              <CheckCircle className="text-green-500" size={32} />
              <p className="text-xl font-bold text-green-500">Delivered Successfully</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Map & Rider Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Real Map Component */}
            <div className="bg-[#1a1a24] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative h-96 z-0">
              <MapContainer 
                center={routeCoords[0]} 
                zoom={14} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <MapBounds coords={routeCoords} />
                
                {/* Static Markers */}
                <Marker position={routeCoords[0]} icon={shopIcon} />
                <Marker position={routeCoords[routeCoords.length - 1]} icon={homeIcon} />
                
                {/* Route Polyline */}
                <Polyline positions={routeCoords} color="#F5A623" weight={4} dashArray="8, 8" opacity={0.6} />
                
                {/* Animated Bike Marker */}
                {currentStep >= 4 && (
                  <Marker 
                    position={bikePosition} 
                    icon={getActiveBikeIcon()}
                  />
                )}
              </MapContainer>
            </div>

            {/* Live Delivery Card */}
            <AnimatePresence>
              {currentStep >= 4 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1a1a24] rounded-3xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent-orange"></div>
                  
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Rider" className="w-16 h-16 rounded-full object-cover border-2 border-white/20" />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#1a1a24]"></div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1 font-bold">Delivery Partner</p>
                      <h3 className="text-xl font-bold text-white mb-1">Rohit Kumar</h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1 text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded"><Star size={14} className="fill-current" /> 4.9</span>
                        <span className="text-gray-400 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10 uppercase">TS09AB1234</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 transition-colors p-3.5 rounded-xl flex justify-center items-center">
                      <MessageCircle size={22} className="text-white" />
                    </button>
                    <button className="flex-1 sm:flex-none bg-accent-orange hover:bg-orange-500 transition-colors px-6 py-3.5 rounded-xl flex justify-center items-center gap-2 font-bold text-white shadow-lg shadow-orange-500/20">
                      <Phone size={20} /> Call Rider
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>

          {/* Right Column: Timeline & Order Details */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Live Timeline */}
            <div className="bg-[#1a1a24] rounded-3xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                Order Status
              </h2>
              
              <div className="relative pl-4 space-y-7">
                {/* Vertical Line */}
                <div className="absolute top-2 bottom-2 left-[23px] w-0.5 bg-white/10 z-0"></div>
                
                {TRACKING_STEPS.map((step) => {
                  const isCompleted = currentStep >= step.id;
                  const isCurrent = currentStep === step.id;
                  const Icon = step.icon;

                  return (
                    <div key={step.id} className="relative z-10 flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isCompleted ? 'bg-accent-orange text-white shadow-[0_0_10px_rgba(245,166,35,0.4)] scale-110' : 'bg-[#0f0f13] border border-white/20 text-gray-500'
                      }`}>
                        <Icon size={16} />
                      </div>
                      <div className={`flex-1 transition-all duration-500 pt-1 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                        <div className="flex justify-between items-start mb-0.5">
                          <h4 className={`font-bold text-sm ${isCurrent ? 'text-accent-orange' : 'text-white'}`}>{step.title}</h4>
                        </div>
                        <p className="text-xs text-gray-400">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Details Panel */}
            <div className="bg-[#1a1a24] rounded-3xl p-6 border border-white/10">
              <h3 className="font-bold text-white mb-4 border-b border-white/10 pb-4 text-sm uppercase tracking-wider">Order Details</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase">Order ID</p>
                  <p className="text-white font-mono">{orderId}</p>
                </div>
                
                <div className="bg-black/30 rounded-xl p-4 border border-white/5 space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                  {cartItems?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <span className="text-gray-300 flex-1">{item.name}</span>
                      <span className="text-gray-400 w-8 text-center">x{item.quantity}</span>
                      <span className="text-white font-mono w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center bg-accent-orange/10 p-3 rounded-lg border border-accent-orange/20">
                  <span className="text-white font-bold">Total Amount</span>
                  <span className="text-accent-orange font-bold font-mono">${grandTotal.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase mb-1">Payment</p>
                    <p className="text-sm text-white">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase mb-1">Delivery To</p>
                    <p className="text-sm text-white line-clamp-2">{formData?.address || 'Customer Address'}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
