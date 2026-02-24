import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';

import { Search, ShoppingBag, User, Menu, PhoneCall, Wallet } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        {/* Top Professional Navbar */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
            {/* Logo */}
            <Link to="/" className="text-2xl font-black tracking-tighter text-teal-800 shrink-0">
              snapmint
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-grow max-w-2xl relative">
              <input
                type="text"
                placeholder="Search for TV, Mobiles, Headphones & more"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
              <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
            </div>

            {/* Right Nav */}
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-2 text-slate-600 hover:text-teal-700 cursor-pointer text-sm font-medium">
                <ShoppingBag className="w-5 h-5" />
                <span>For Business</span>
              </div>
              <div className="hidden lg:flex items-center gap-2 text-slate-600 hover:text-teal-700 cursor-pointer text-sm font-medium">
                <Wallet className="w-5 h-5 text-teal-600" />
                <span>Pay EMI</span>
              </div>
              <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-100 transition-all text-sm font-bold">
                <User className="w-5 h-5" />
                <span>Sign-up</span>
              </button>
            </div>
          </div>

          {/* Category Bar */}
          <div className="bg-white border-t border-slate-100 hidden md:block">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-8 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-sm cursor-pointer whitespace-nowrap">
                <Menu className="w-4 h-4" />
                <span>ALL</span>
              </div>
              {['Mobiles', 'Electronics', 'TV, AC & Appliances', 'Kitchen & Home', 'Health & Wellness', 'Fashion', 'Baby & Kids', 'Sports & Fitness'].map(cat => (
                <span key={cat} className="text-slate-600 hover:text-teal-600 text-[13px] font-medium cursor-pointer whitespace-nowrap transition-colors">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto p-4 md:py-10">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
