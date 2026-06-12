import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const MOCK_RESPONSES = {
  default: "I'm your coffee assistant! Ask me about our menu, recommendations, or order tracking.",
  menu: "We have a wide range of espresso drinks, cold brews, frappes, and fresh bakery items. Try our signature Caramel Macchiato!",
  track: "To track your order, please visit the 'My Orders' section in your dashboard.",
  recommend: "If you like sweet coffee, I highly recommend our Vanilla Iced Latte or Mocha Frappe. If you prefer strong coffee, our Americano or Cold Brew is perfect!",
  hi: "Hello there! How can I help you today?",
};

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your AI Coffee Assistant ☕. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      let botText = MOCK_RESPONSES.default;
      const lowerInput = userMessage.text.toLowerCase();
      
      if (lowerInput.includes('menu') || lowerInput.includes('coffee')) {
        botText = MOCK_RESPONSES.menu;
      } else if (lowerInput.includes('track') || lowerInput.includes('order')) {
        botText = MOCK_RESPONSES.track;
      } else if (lowerInput.includes('recommend') || lowerInput.includes('suggest')) {
        botText = MOCK_RESPONSES.recommend;
      } else if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
        botText = MOCK_RESPONSES.hi;
      }

      setMessages(prev => [...prev, { id: Date.now(), text: botText, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-accent-orange text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-80 md:w-96 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent-orange/20 rounded-full flex items-center justify-center text-accent-orange">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Coffee AI</h3>
                  <p className="text-green-500 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-white/10 text-white' : 'bg-accent-orange/20 text-accent-orange'}`}>
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-accent-orange text-white rounded-tr-sm' : 'bg-white/10 text-gray-200 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 bg-accent-orange/20 text-accent-orange flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-orange/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="absolute right-2 w-8 h-8 bg-accent-orange text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors disabled:opacity-50"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
