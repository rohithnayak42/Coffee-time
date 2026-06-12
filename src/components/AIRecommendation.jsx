import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCcw, Coffee, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 'temperature',
    text: "How do you prefer your coffee today?",
    options: [
      { label: 'Hot & Cozy', value: 'hot', icon: '☕' },
      { label: 'Cold & Refreshing', value: 'cold', icon: '🧊' }
    ]
  },
  {
    id: 'strength',
    text: "How strong should it be?",
    options: [
      { label: 'Mild & Sweet', value: 'mild', icon: '🍯' },
      { label: 'Strong & Bold', value: 'strong', icon: '⚡' }
    ]
  },
  {
    id: 'milk',
    text: "What about milk?",
    options: [
      { label: 'Creamy (Milk Based)', value: 'milk', icon: '🥛' },
      { label: 'Black (No Milk)', value: 'black', icon: '🌑' }
    ]
  }
];

export default function AIRecommendation({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (option) => {
    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: option.value };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      generateRecommendation(newAnswers);
    }
  };

  const generateRecommendation = (finalAnswers) => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let rec = {
        name: 'Caramel Macchiato',
        description: 'A perfect balance of espresso, steamed milk, and sweet caramel syrup.',
        price: '$5.50',
        match: '98%',
        image: '/images/coffee_fallback.png'
      };

      if (finalAnswers.temperature === 'cold' && finalAnswers.strength === 'mild') {
        rec = { name: 'Vanilla Iced Latte', description: 'Smooth espresso chilled with milk and sweet vanilla.', price: '$4.80', match: '96%', image: '/images/vanilla_scoop.png' };
      } else if (finalAnswers.strength === 'strong' && finalAnswers.milk === 'black') {
        rec = { name: 'Nitro Cold Brew', description: 'Intense, velvety, and steeped for 24 hours. No milk needed.', price: '$5.00', match: '99%', image: '/images/coffee_fallback.png' };
      } else if (finalAnswers.temperature === 'hot' && finalAnswers.strength === 'strong') {
        rec = { name: 'Double Espresso', description: 'A bold, pure shot of our premium roasted coffee beans.', price: '$3.50', match: '95%', image: '/images/coffee_fallback.png' };
      }

      setRecommendation(rec);
      setIsAnalyzing(false);
    }, 2000);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendation(null);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-primary-maroon border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative"
      >
        {/* Close Button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 bg-black/20 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        )}

        <div className="p-8">
          <div className="flex items-center gap-2 text-accent-orange mb-6 justify-center">
            <Sparkles size={24} />
            <h2 className="text-xl font-bold text-white">AI Coffee Matchmaker</h2>
          </div>

          <AnimatePresence mode="wait">
            {!isAnalyzing && !recommendation && (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="flex justify-center gap-2 mb-8">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`w-12 h-1.5 rounded-full ${i <= currentStep ? 'bg-accent-orange' : 'bg-white/10'}`} />
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-white mb-8">{QUESTIONS[currentStep].text}</h3>

                <div className="grid grid-cols-1 gap-4">
                  {QUESTIONS[currentStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt)}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent-orange text-white p-4 rounded-2xl flex items-center gap-4 transition-all group"
                    >
                      <span className="text-3xl">{opt.icon}</span>
                      <span className="text-lg font-medium flex-1 text-left">{opt.label}</span>
                      <ArrowRight className="text-gray-500 group-hover:text-accent-orange group-hover:translate-x-1 transition-all" size={20} />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {isAnalyzing && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 relative mb-6">
                  <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-accent-orange rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Coffee className="text-accent-orange" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Analyzing your preferences...</h3>
                <p className="text-gray-400">Finding the perfect match in our menu</p>
              </motion.div>
            )}

            {recommendation && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="inline-block bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-bold mb-6 flex items-center gap-2 mx-auto w-max">
                  <Sparkles size={16} /> {recommendation.match} Match Found!
                </div>

                <div className="bg-black/40 rounded-3xl p-6 mb-6 border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/20 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2"></div>
                  
                  <img src={recommendation.image} alt={recommendation.name} className="w-32 h-32 object-contain mx-auto mb-4 relative z-10 drop-shadow-2xl" />
                  <h3 className="text-2xl font-black text-white mb-2 relative z-10">{recommendation.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 relative z-10">{recommendation.description}</p>
                  <p className="text-xl font-bold text-accent-orange relative z-10">{recommendation.price}</p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      if(onClose) onClose();
                      navigate('/order');
                    }}
                    className="flex-1 bg-accent-orange hover:bg-orange-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                  >
                    Order Now
                  </button>
                  <button 
                    onClick={reset}
                    className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors"
                    title="Retake Quiz"
                  >
                    <RefreshCcw size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
