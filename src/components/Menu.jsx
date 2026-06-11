import React from 'react';
import { motion } from 'framer-motion';

const menuItems = [
  {
    title: 'Espresso',
    description: 'A concentrated form of coffee served in small, strong shots.',
    price: '$3.00',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'Cappuccino',
    description: 'Perfect balance of espresso, steamed milk, and rich foam.',
    price: '$4.50',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'Latte',
    description: 'Smooth and creamy coffee with a delicate layer of foam.',
    price: '$4.00',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'Americano',
    description: 'Classic espresso diluted with hot water for a smooth finish.',
    price: '$3.50',
    image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'Mocha',
    description: 'Espresso combined with rich chocolate and steamed milk.',
    price: '$5.00',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'Cold Coffee',
    description: 'Creamy and frothy blended cold coffee to cool you down.',
    price: '$4.50',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'Iced Latte',
    description: 'Chilled espresso and milk over ice for a refreshing kick.',
    price: '$4.50',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'Fresh Juice',
    description: 'Fruit and icy refreshing drink to make you feel refreshed.',
    price: '$5.50',
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'Chocolate Shake',
    description: 'Thick, creamy blend of rich chocolate and ice cream.',
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400&auto=format&fit=crop'
  }
];

export default function Menu() {
  return (
    <section id="menu" className="py-24 bg-dark-menu">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center"
        >
          <h2 className="text-4xl font-bold text-white mb-2">OUR MENU</h2>
          <div className="w-16 h-1 bg-accent-orange"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.2 }}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div className="overflow-hidden rounded-full w-56 h-56 mx-auto mb-6 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:shadow-accent-orange/20 border-4 border-transparent group-hover:border-accent-orange/30">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-accent-orange font-bold text-xl mb-3">{item.price}</p>
              <p className="text-gray-400 px-4">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
