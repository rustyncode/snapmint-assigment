import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <nav className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-400">1Fi Store</h1>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto p-4 md:p-8">
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
