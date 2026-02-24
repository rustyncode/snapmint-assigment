import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Star, ShieldCheck, ShoppingBag } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.get(`${apiUrl}/products`)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4 text-teal-600">
            <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
            <p className="font-medium tracking-wide">Fetching Collection...</p>
        </div>
    );

    return (
        <div className="space-y-12">
            {/* Professional E-commerce Banner */}
            <div className="relative overflow-hidden group">
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 text-white shadow-2xl shadow-teal-900/10">
                    <div className="flex-1 space-y-6 z-10 text-center md:text-left">
                        <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                            Limited Time Offer
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
                            The Future of <br />
                            <span className="text-teal-200">Phone Financing.</span>
                        </h1>
                        <p className="text-teal-50/80 text-lg max-w-md font-medium">
                            Get the latest smartphones today. Pay later with no-cost EMI and zero interest. Approved in seconds.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <button className="bg-white text-teal-900 font-bold px-10 py-4 rounded-2xl hover:bg-teal-50 transition-all shadow-xl shadow-teal-900/20 active:scale-95">
                                Browse Mobiles
                            </button>
                            <button className="bg-teal-700/50 backdrop-blur-md border border-teal-500/30 text-white font-bold px-10 py-4 rounded-2xl hover:bg-teal-700 transition-all active:scale-95">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Decorative Image Side */}
                    <div className="flex-1 relative hidden lg:flex items-center justify-center">
                        <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full scale-150"></div>
                        <div className="relative z-10 w-full max-w-sm aspect-square bg-teal-500/20 rounded-[3rem] border border-teal-400/30 flex items-center justify-center p-8 backdrop-blur-sm transform hover:rotate-2 transition-transform duration-700">
                            <ShoppingBag className="w-40 h-40 text-teal-200/50" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Shop by Category Icons */}
            <div className="space-y-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    Shop by Category <div className="h-0.5 flex-grow bg-slate-100 rounded-full"></div>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {[
                        { name: 'Mobiles', icon: '📱' },
                        { name: 'Laptops', icon: '💻' },
                        { name: 'Watches', icon: '⌚' },
                        { name: 'Audio', icon: '🎧' },
                        { name: 'Cameras', icon: '📷' },
                        { name: 'Gaming', icon: '🎮' }
                    ].map(cat => (
                        <div key={cat.name} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center gap-4 hover:shadow-xl hover:shadow-slate-200/50 hover:border-teal-500/30 transition-all cursor-pointer group">
                            <div className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</div>
                            <span className="text-sm font-bold text-slate-700 group-hover:text-teal-600 transition-colors uppercase tracking-widest text-[10px]">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="space-y-6 pt-6">
                <div className="flex justify-between items-end">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Best Sellers on EMI</h2>
                    <span className="text-teal-600 font-bold text-sm cursor-pointer hover:underline">View All &rarr;</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map(product => {
                        const minPrice = Math.min(...product.variants.map(v => v.price));
                        const minEmi = Math.min(...product.emiPlans.map(p => p.monthlyAmount));

                        return (
                            <Link key={product.id} to={`/products/${product.id}`} className="group bg-white rounded-3xl border border-slate-100 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col overflow-hidden">
                                <div className="relative p-10 bg-slate-50/30 aspect-[4/5] flex items-center justify-center overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute top-6 right-6 bg-white shadow-xl p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        <ShieldCheck className="w-6 h-6 text-teal-600" />
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow bg-white">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>

                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-2xl font-black text-slate-900">₹{minPrice.toLocaleString()}</span>
                                                <span className="text-sm text-slate-400 font-medium line-through decoration-teal-500/30">₹{(minPrice * 1.25).toLocaleString()}</span>
                                            </div>
                                            <div className="text-[11px] font-black tracking-widest uppercase text-teal-600 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100/50 flex items-center gap-2">
                                                <Wallet className="w-3.5 h-3.5" /> EMI @ ₹{minEmi.toLocaleString()}/mo
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-slate-400 group-hover:text-teal-600 transition-colors">
                                        <span className="text-xs font-bold uppercase tracking-widest">Available Now</span>
                                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
