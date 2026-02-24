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
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4 text-teal-600">
            <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
            <p className="font-medium tracking-wide">Fetching Collection...</p>
        </div>
    );

    return (
        <div>
            {/* Banner Section */}
            <div className="mb-12 bg-teal-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-4">
                    <span className="text-teal-700 font-bold text-xs uppercase tracking-widest px-3 py-1 bg-teal-100 rounded-full">New Arrivals</span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
                        Upgrade to <span className="text-teal-600">Smart Living</span> with Easy EMIs
                    </h1>
                    <p className="text-slate-600 text-lg max-w-xl">
                        Shop the latest smartphones and electronics with no-cost EMI plans. Zero paper-work, instant approval.
                    </p>
                    <button className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-teal-700/20">
                        View All Offers
                    </button>
                </div>
                <div className="flex-1 hidden md:block">
                    <div className="relative w-full aspect-video bg-emerald-100/50 rounded-3xl overflow-hidden border border-teal-100 shadow-inner flex items-center justify-center">
                        <ShoppingBag className="w-32 h-32 text-teal-200" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => {
                    const minPrice = Math.min(...product.variants.map(v => v.price));
                    const minEmi = Math.min(...product.emiPlans.map(p => p.monthlyAmount));

                    return (
                        <Link key={product.id} to={`/products/${product.id}`} className="group bg-white rounded-2xl border border-slate-200 hover:border-teal-500/50 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col overflow-hidden">
                            <div className="relative p-6 bg-slate-50/50 aspect-square flex items-center justify-center overflow-hidden border-b border-slate-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-slate-100 invisible group-hover:visible transition-all">
                                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1 mb-2">
                                    {product.name}
                                </h3>

                                <div className="space-y-1 mb-4">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-black text-slate-900">₹{minPrice.toLocaleString()}</span>
                                        <span className="text-xs text-slate-400 line-through">₹{(minPrice * 1.2).toLocaleString()}</span>
                                    </div>
                                    <div className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md inline-block">
                                        EMI starts at ₹{minEmi.toLocaleString()}/mo
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center text-teal-700 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductList;
