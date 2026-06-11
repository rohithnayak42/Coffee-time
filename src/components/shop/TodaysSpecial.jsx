import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import ProductCard from './ProductCard';

export default function TodaysSpecial() {
  // Get 3 special items
  const specials = products.filter(p => p.isSpecial).slice(0, 3);

  if (specials.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span className="text-4xl">🔥</span> Today's Special
          </h2>
          <div className="h-px bg-white/20 flex-1"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specials.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
