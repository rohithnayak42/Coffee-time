import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-light-bg">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl font-bold text-text-dark mb-2">CONTACT US</h2>
          <div className="w-16 h-1 bg-accent-orange"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-orange/10 flex items-center justify-center shrink-0">
                <MapPin className="text-accent-orange" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Address</h4>
                <p className="text-gray-600 leading-relaxed">Coffee House in Berndorf,<br />Germany, 12345</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-orange/10 flex items-center justify-center shrink-0">
                <Mail className="text-accent-orange" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Email</h4>
                <p className="text-gray-600">info@coffeehouse.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-orange/10 flex items-center justify-center shrink-0">
                <Phone className="text-accent-orange" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Phone</h4>
                <p className="text-gray-600">+49 123 456 7890</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent-orange/10 flex items-center justify-center shrink-0">
                <Clock className="text-accent-orange" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Working hours</h4>
                <p className="text-gray-600">Mon - Sun: 8:00 AM - 10:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent-orange transition-colors"
                  required
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent-orange transition-colors"
                  required
                />
              </div>
              <div>
                <textarea 
                  rows="4" 
                  placeholder="Your Message" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent-orange transition-colors resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-accent-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
