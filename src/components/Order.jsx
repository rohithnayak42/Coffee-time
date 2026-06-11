import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { categories, products as staticProducts } from '../data/products';
import ProductCard from './shop/ProductCard';
import { useNavigate } from 'react-router-dom';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const SkeletonLoader = () => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse flex flex-col h-[400px]">
    <div className="w-full h-48 bg-white/10 rounded-xl mb-4"></div>
    <div className="h-6 bg-white/10 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
    <div className="h-4 bg-white/10 rounded w-5/6 mb-auto"></div>
    <div className="flex justify-between items-end mt-4">
      <div className="h-8 bg-white/10 rounded w-1/3"></div>
      <div className="h-10 bg-white/10 rounded-xl w-24"></div>
    </div>
  </div>
);

export default function Order() {
  const [activeCategory, setActiveCategory] = useState(categories[0].name);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from PostgreSQL via backend API, fallback to static data
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setAllProducts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.warn('Failed to fetch products from API, falling back to static products:', err);
        setAllProducts(staticProducts);
        setIsLoading(false);
      });
  }, []);

  const handleCategoryChange = (catName) => {
    if (catName === activeCategory) return;
    setIsLoading(true);
    setActiveCategory(catName);
    setTimeout(() => setIsLoading(false), 500);
  };

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [activeCategory, searchQuery, sortBy, allProducts]);

  return (
    <div className="min-h-screen bg-primary-maroon pt-28 pb-20 font-sans relative">
      
      {/* Back Button */}
      <div className="container mx-auto mb-6">
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-accent-orange text-white rounded-full font-medium transition-all duration-300 shadow-lg group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </button>
      </div>

      {/* Hero Banner */}
      <section className="container mx-auto mb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 p-10 md:p-16 rounded-[2rem] border border-white/10 relative overflow-hidden flex flex-col justify-center min-h-[320px] shadow-2xl"
        >
          <div 
            className="absolute inset-0 z-0 opacity-30 bg-cover bg-center mix-blend-screen"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1600&auto=format&fit=crop)' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-maroon via-primary-maroon/80 to-transparent z-0"></div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/40 backdrop-blur-md border border-accent-orange/30 text-accent-orange rounded-full text-sm font-bold mb-6 tracking-wide shadow-lg">
              <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></span>
              LIVE MENU AVAILABLE
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-xl leading-tight">
              Order Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400">Favorite</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-light max-w-lg leading-relaxed">
              Experience our premium handcrafted beverages and artisan treats, delivered fresh to you.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Catalog Section */}
      <section className="container mx-auto" id="catalog">
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-orange transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search our premium menu..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-orange/60 focus:bg-black/60 transition-all backdrop-blur-md shadow-inner"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto bg-black/40 border border-white/10 rounded-2xl px-4 py-1 backdrop-blur-md focus-within:border-accent-orange/60 transition-all">
            <SlidersHorizontal className="text-gray-400" size={18} />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent py-3 text-white focus:outline-none appearance-none min-w-[180px] font-medium cursor-pointer"
            >
              <option value="default" className="bg-primary-maroon">Sort: Recommended</option>
              <option value="price-low" className="bg-primary-maroon">Price: Low to High</option>
              <option value="price-high" className="bg-primary-maroon">Price: High to Low</option>
              <option value="rating" className="bg-primary-maroon">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Premium Category Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 pb-4">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`px-6 py-3 rounded-2xl whitespace-nowrap font-bold transition-all duration-300 flex items-center gap-2 relative border ${
              activeCategory === 'All' 
                ? 'text-white border-transparent shadow-[0_4px_20px_rgba(245,166,35,0.4)] transform -translate-y-1' 
                : 'text-gray-400 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-md'
            }`}
          >
            {activeCategory === 'All' && (
              <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-accent-orange to-orange-600 rounded-2xl z-[-1]" />
            )}
            ✨ All Menu
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={`px-6 py-3 rounded-2xl whitespace-nowrap font-bold transition-all duration-300 flex items-center gap-2 relative border ${
                activeCategory === cat.name 
                  ? 'text-white border-transparent shadow-[0_4px_20px_rgba(245,166,35,0.4)] transform -translate-y-1' 
                  : 'text-gray-400 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-md'
              }`}
            >
              {activeCategory === cat.name && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-accent-orange to-orange-600 rounded-2xl z-[-1]" />
              )}
              <span className="text-xl">{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="min-h-[500px]">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <SkeletonLoader key={i} />)}
            </div>
          ) : (
            <motion.div 
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                
                {filteredProducts.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="col-span-full flex flex-col items-center justify-center py-32 text-gray-400 bg-white/5 rounded-3xl border border-white/10"
                  >
                    <Search size={64} className="mb-6 opacity-20 text-accent-orange" />
                    <h3 className="text-2xl font-bold text-white mb-2">No items found</h3>
                    <p className="text-lg">We couldn't find anything matching your search.</p>
                    <button onClick={() => setSearchQuery('')} className="mt-6 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                      Clear Search
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

      </section>
    </div>
  );
}
