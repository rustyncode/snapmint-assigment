import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Star, ShieldCheck, ShoppingBag, Wallet } from 'lucide-react';

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
        <div className="space-y-16 pb-20">
            {/* Premium Hero Banner */}
            <div className="relative overflow-hidden group rounded-[2.5rem]">
                <div className="absolute inset-0 bg-teal-900 group-hover:scale-105 transition-transform duration-[2s] ease-out">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-900/60 to-transparent z-10"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-teal-900/80 to-transparent z-10"></div>
                </div>

                <div className="relative z-20 p-8 md:p-20 flex flex-col md:flex-row items-center gap-12 text-white">
                    <div className="flex-1 space-y-8 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-teal-400/20 backdrop-blur-xl border border-teal-400/30 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-teal-200">
                            <Star className="w-3.5 h-3.5 fill-teal-200" /> Premium Collection 2026
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
                            Shop Smart. <br />
                            <span className="text-teal-400 italic">Pay Easy.</span>
                        </h1>
                        <p className="text-teal-50/70 text-lg md:text-xl max-w-lg font-medium leading-relaxed">
                            Zero interest EMI on the latest smartphones. No paperwork, instant approval, and guaranteed cashback on every order.
                        </p>
                        <div className="flex flex-wrap gap-5 justify-center md:justify-start">
                            <button className="bg-white text-teal-950 font-black px-12 py-5 rounded-[1.5rem] hover:bg-teal-50 transition-all shadow-2xl shadow-teal-950/40 active:scale-95 text-lg">
                                Buy on EMI
                            </button>
                            <button className="bg-teal-700/30 backdrop-blur-xl border border-teal-500/20 text-white font-black px-12 py-5 rounded-[1.5rem] hover:bg-teal-700/50 transition-all active:scale-95 text-lg">
                                View Offers
                            </button>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-1 justify-center relative">
                        {/* Decorative floating card */}
                        <div className="absolute -top-10 -right-10 bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl z-30 shadow-2xl animate-bounce duration-[3s]">
                            <div className="flex items-center gap-3">
                                <div className="bg-teal-400 p-2 rounded-xl"><ShieldCheck className="w-6 h-6 text-teal-950" /></div>
                                <div className="text-left font-black tracking-tight text-white">
                                    <div className="text-[10px] uppercase text-teal-300">Verified</div>
                                    <div>Instant Approval</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 w-80 h-80 bg-gradient-to-br from-teal-400 to-teal-600 rounded-[4rem] rotate-12 flex items-center justify-center shadow-inner group-hover:rotate-[15deg] transition-transform duration-700">
                            <ShoppingBag className="w-40 h-40 text-teal-950/20 -rotate-12" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Snapmint - Trust Section */}
            <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { title: 'Zero% Interest', desc: 'No hidden charges or high interest rates. Transparency is our core value.', icon: <Wallet className="w-8 h-8" /> },
                    { title: '99% Approval', desc: 'Most users get approved within 2 minutes with basic identity verification.', icon: <ShieldCheck className="w-8 h-8" /> },
                    { title: 'Flexible Plans', desc: 'Choose between 3 to 24 months tenure based on your monthly budget.', icon: <Star className="w-8 h-8" /> }
                ].map((item, i) => (
                    <div key={i} className="space-y-4">
                        <div className="bg-teal-50 text-teal-700 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{item.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Shop by Category Icons */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Browse Categories</h2>
                    <div className="h-px flex-grow mx-8 bg-slate-100"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {[
                        { name: 'Mobiles', icon: '📱', color: 'bg-orange-50 text-orange-600' },
                        { name: 'Laptops', icon: '💻', color: 'bg-blue-50 text-blue-600' },
                        { name: 'Audio', icon: '🎧', color: 'bg-purple-50 text-purple-600' },
                        { name: 'Watches', icon: '⌚', color: 'bg-rose-50 text-rose-600' },
                        { name: 'Gaming', icon: '🎮', color: 'bg-indigo-50 text-indigo-600' },
                        { name: 'Cameras', icon: '📷', color: 'bg-teal-50 text-teal-600' }
                    ].map(cat => (
                        <div key={cat.name} className="group bg-white p-8 rounded-[2rem] border border-slate-100 flex flex-col items-center gap-5 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-teal-500/20 transition-all cursor-pointer">
                            <div className={`w-20 h-20 rounded-full ${cat.color} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}>
                                {cat.icon}
                            </div>
                            <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="space-y-10">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Exclusive EMI Deals</h2>
                        <p className="text-slate-500 font-medium">Top picks with no processing fees</p>
                    </div>
                    <button className="text-teal-600 font-bold border-b-2 border-teal-600/20 hover:border-teal-600 transition-all pb-1">Explore All</button>
                </div>

                {products.length === 0 ? (
                    <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                        <p className="text-slate-500">Try refreshing or check your connection.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {products.map(product => {
                            const minPrice = Math.min(...product.variants.map(v => v.price));
                            const minEmi = Math.min(...product.emiPlans.map(p => p.monthlyAmount));

                            return (
                                <Link key={product.id} to={`/products/${product.id}`} className="group bg-white rounded-[2.5rem] border border-slate-100/80 hover:border-teal-400/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col overflow-hidden">
                                    <div className="relative p-10 bg-slate-50/20 aspect-square flex items-center justify-center overflow-hidden border-b border-slate-50">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                                            <div className="bg-teal-500 text-white text-[8px] font-black tracking-widest uppercase px-2 py-1 rounded-md">Top Rated</div>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1 mb-4">
                                            {product.name}
                                        </h3>

                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-black text-slate-900">₹{minPrice.toLocaleString()}</span>
                                                <span className="text-xs text-slate-400 line-through">₹{(minPrice * 1.25).toLocaleString()}</span>
                                            </div>
                                            <div className="text-[10px] font-black tracking-[0.1em] uppercase text-teal-700 bg-teal-50 px-3 py-2 rounded-xl flex items-center gap-3 border border-teal-100/50">
                                                <div className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-pulse"></div>
                                                EMI starts ₹{minEmi.toLocaleString()}/mo
                                            </div>
                                        </div>

                                        <div className="mt-8 flex items-center justify-between text-teal-700 font-black text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                                            <span>Shop Now</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
