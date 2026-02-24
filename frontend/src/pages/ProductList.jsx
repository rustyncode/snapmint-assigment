import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';

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
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-medium tracking-wide">Loading 1Fi Catalog...</p>
        </div>
    );

    return (
        <div>
            <div className="mb-16 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20 mb-6 text-sm font-bold uppercase tracking-widest">
                    <Star className="w-4 h-4 fill-blue-400" /> Exclusive EMI Collection
                </div>
                <h2 className="text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
                    The Future of Payments.
                </h2>
                <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
                    Select premium smartphones with EMI plans backed by secure mutual funds. Get rewarded while you pay.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.map(product => {
                    const minPrice = Math.min(...product.variants.map(v => v.price));
                    const minEmi = Math.min(...product.emiPlans.map(p => p.monthlyAmount));

                    return (
                        <Link key={product.id} to={`/products/${product.id}`} className="group relative">
                            {/* Background Glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2.5rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

                            <div className="relative bg-slate-800/80 backdrop-blur-md rounded-[2.3rem] overflow-hidden border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full">
                                <div className="relative p-8 h-80 flex items-center justify-center bg-slate-900/50 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain mix-blend-lighten transform group-hover:scale-110 transition-transform duration-700 ease-out z-10"
                                    />
                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 p-6">
                                        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-3 shadow-2xl">
                                            <ShieldCheck className="w-6 h-6 text-blue-400" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">{product.name}</h3>
                                    </div>

                                    <p className="text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed">
                                        {product.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-slate-700/50 flex justify-between items-end">
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Starting from</div>
                                            <div className="text-blue-400 text-2xl font-black">₹{minPrice.toLocaleString()}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Low EMI</div>
                                            <div className="text-emerald-400 text-xl font-black">₹{minEmi.toLocaleString()}<span className="text-xs text-slate-500 font-medium">/mo</span></div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex items-center justify-center w-full py-4 bg-slate-700/30 group-hover:bg-blue-600 rounded-2xl text-slate-300 group-hover:text-white font-bold transition-all gap-2 border border-slate-600/50 group-hover:border-blue-500">
                                        Explore Plans <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-24 p-12 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/10 rounded-[3rem] text-center">
                <h4 className="text-2xl font-bold mb-4">Why choose 1Fi Backed EMI?</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {[
                        { title: 'Zero Interest', desc: 'Select plans with 0% interest rates backed by low-risk mutual funds.' },
                        { title: 'Instant Cashback', desc: 'Get guaranteed cashback rewards credited to your linked fund.' },
                        { title: 'Flexible Tenure', desc: 'Choose from 3 to 24 months of flexible payment durations.' }
                    ].map((feature, i) => (
                        <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                            <div className="text-blue-400 font-black mb-2">0{i + 1}. {feature.title}</div>
                            <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
