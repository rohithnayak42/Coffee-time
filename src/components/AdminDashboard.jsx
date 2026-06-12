import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, ShoppingBag, Coffee, ArrowUpRight, Plus, Edit2, Trash2 } from 'lucide-react';

const data = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 5000, orders: 35 },
  { name: 'Thu', revenue: 4500, orders: 28 },
  { name: 'Fri', revenue: 6000, orders: 42 },
  { name: 'Sat', revenue: 8000, orders: 56 },
  { name: 'Sun', revenue: 7500, orders: 48 },
];

const dummyProducts = [
  { id: 1, name: 'Cappuccino', price: 4.50, stock: 'In Stock', category: 'Hot Coffee' },
  { id: 2, name: 'Iced Latte', price: 4.80, stock: 'In Stock', category: 'Cold Coffee' },
  { id: 3, name: 'Blueberry Muffin', price: 3.50, stock: 'Low Stock', category: 'Bakery' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="min-h-screen bg-primary-maroon pt-28 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <div className="flex gap-4 mt-4">
              <button onClick={() => setActiveTab('analytics')} className={`pb-2 px-2 font-bold transition-all ${activeTab === 'analytics' ? 'text-accent-orange border-b-2 border-accent-orange' : 'text-gray-400 hover:text-white'}`}>Analytics</button>
              <button onClick={() => setActiveTab('products')} className={`pb-2 px-2 font-bold transition-all ${activeTab === 'products' ? 'text-accent-orange border-b-2 border-accent-orange' : 'text-gray-400 hover:text-white'}`}>Products</button>
              <button onClick={() => setActiveTab('users')} className={`pb-2 px-2 font-bold transition-all ${activeTab === 'users' ? 'text-accent-orange border-b-2 border-accent-orange' : 'text-gray-400 hover:text-white'}`}>Users</button>
            </div>
          </div>
          {activeTab === 'products' && (
            <button className="bg-accent-orange text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-500 transition-colors shadow-lg shadow-orange-500/20 flex items-center gap-2">
              <Plus size={18} /> Add Product
            </button>
          )}
        </div>

        {activeTab === 'analytics' && (
          <>
            {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Revenue', value: '$38,000', icon: DollarSign, trend: '+12.5%' },
            { title: 'Total Orders', value: '251', icon: ShoppingBag, trend: '+8.2%' },
            { title: 'Active Users', value: '1,429', icon: Users, trend: '+15.3%' },
            { title: 'Top Product', value: 'Cappuccino', icon: Coffee, trend: null },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white/5 p-3 rounded-xl">
                  <stat.icon className="text-accent-orange" size={24} />
                </div>
                {stat.trend && (
                  <span className="flex items-center text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full">
                    {stat.trend} <ArrowUpRight size={14} className="ml-1" />
                  </span>
                )}
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-black text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts & Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Revenue Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#ffffff50" />
                  <YAxis stroke="#ffffff50" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #ffffff20', borderRadius: '12px', color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#F5A623" strokeWidth={3} dot={{ fill: '#F5A623', strokeWidth: 2 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Orders List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Recent Orders</h3>
              <button className="text-accent-orange text-sm font-medium hover:underline">View All</button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div>
                    <p className="text-white font-bold text-sm">#COF-123{i}</p>
                    <p className="text-gray-400 text-xs mt-0.5">2 mins ago</p>
                  </div>
                  <div className="text-right">
                    <p className="text-accent-orange font-bold text-sm">$24.50</p>
                    <p className="text-green-500 text-xs mt-0.5 bg-green-500/10 px-2 rounded">Paid</p>
                  </div>
                </div>
              ))}
            </div>
            </motion.div>
          </div>
          </>
        )}

        {activeTab === 'products' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-white">
                <thead className="text-gray-400 border-b border-white/10">
                  <tr>
                    <th className="py-4 px-4 font-medium">Product Name</th>
                    <th className="py-4 px-4 font-medium">Category</th>
                    <th className="py-4 px-4 font-medium">Price</th>
                    <th className="py-4 px-4 font-medium">Status</th>
                    <th className="py-4 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {dummyProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold">{prod.name}</td>
                      <td className="py-4 px-4 text-gray-400">{prod.category}</td>
                      <td className="py-4 px-4 font-bold text-accent-orange">${prod.price.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${prod.stock === 'In Stock' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {prod.stock}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors"><Edit2 size={18} /></button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
