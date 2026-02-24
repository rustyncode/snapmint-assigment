import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2, ArrowLeft, Info, Percent, Calendar, ShieldCheck } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.get(`${apiUrl}/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setSelectedVariant(res.data.variants[0]);
                setSelectedPlan(res.data.emiPlans[0]);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-screen space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-400 font-medium animate-pulse">Fetching product details...</p>
        </div>
    );

    if (!product) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <Link to="/" className="text-blue-400 hover:underline flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to store
            </Link>
        </div>
    );

    const colors = [...new Set(product.variants.map(v => v.color))];
    const storages = [...new Set(product.variants.filter(v => v.color === selectedVariant.color).map(v => v.storage))];

    const handleColorChange = (color) => {
        const newVariant = product.variants.find(v => v.color === color && v.storage === selectedVariant.storage)
            || product.variants.find(v => v.color === color);
        setSelectedVariant(newVariant);
    };

    const handleStorageChange = (storage) => {
        const newVariant = product.variants.find(v => v.color === selectedVariant.color && v.storage === storage);
        setSelectedVariant(newVariant);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Products
            </Link>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Gallery */}
                <div className="lg:w-1/2">
                    <div className="bg-slate-800/50 rounded-[2.5rem] p-12 border border-slate-700/50 backdrop-blur-sm sticky top-28 group">
                        <img
                            src={selectedVariant.image}
                            alt={selectedVariant.name}
                            className="w-full h-auto object-contain mix-blend-lighten transform group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    <div className="mt-8 bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
                                <ShieldCheck className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-400 mb-1 text-sm uppercase tracking-wider">Mutual Fund Backed EMI</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Your purchase is secured and funded via high-yield short-term mutual funds. This structure ensures <strong>0% processing fees</strong> and guaranteed cashback returns for consistent payers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="lg:w-1/2">
                    <div className="mb-8">
                        <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-[1.1]">{product.name}</h1>
                        <p className="text-slate-400 text-lg leading-relaxed">{product.description}</p>
                    </div>

                    <div className="flex items-baseline gap-4 mb-10">
                        <span className="text-4xl font-black text-blue-400">₹{selectedVariant.price.toLocaleString()}</span>
                        <span className="text-xl text-slate-500 line-through">₹{selectedVariant.mrp.toLocaleString()}</span>
                        <div className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                            {Math.round((1 - selectedVariant.price / selectedVariant.mrp) * 100)}% OFF
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Select Finish</h3>
                        <div className="flex flex-wrap gap-3">
                            {colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => handleColorChange(color)}
                                    className={`px-5 py-2.5 rounded-xl border-2 transition-all duration-300 font-medium ${selectedVariant.color === color
                                        ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                                        : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Storage Selection */}
                    <div className="mb-12">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Select Capacity</h3>
                        <div className="flex flex-wrap gap-3">
                            {storages.map(storage => (
                                <button
                                    key={storage}
                                    onClick={() => handleStorageChange(storage)}
                                    className={`px-5 py-2.5 rounded-xl border-2 transition-all duration-300 font-medium ${selectedVariant.storage === storage
                                        ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                                        : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                                        }`}
                                >
                                    {storage}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* EMI Plans Selection */}
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Available EMI Plans</h3>
                            <span className="text-[10px] text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20 font-bold">1Fi EXCLUSIVE</span>
                        </div>
                        <div className="space-y-4">
                            {product.emiPlans.map(plan => (
                                <div
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan)}
                                    className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 group flex justify-between items-center ${selectedPlan.id === plan.id
                                        ? 'border-blue-500 bg-blue-500/10 ring-4 ring-blue-500/5'
                                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                                        }`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`p-4 rounded-2xl transition-colors ${selectedPlan.id === plan.id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'}`}>
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl font-black text-slate-100">₹{plan.monthlyAmount.toLocaleString()}</span>
                                                <span className="text-slate-500 font-medium">/ mo</span>
                                                {plan.interestRate === 0 && (
                                                    <span className="animate-pulse bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded border border-emerald-500/30 uppercase">No Cost</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-slate-400 text-sm font-medium">{plan.tenure} Months</span>
                                                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                                <span className="text-slate-400 text-sm font-medium">{plan.interestRate}% Interest</span>
                                            </div>
                                        </div>
                                    </div>
                                    {plan.cashback > 0 && (
                                        <div className="text-right">
                                            <div className="text-emerald-400 text-sm font-bold flex items-center justify-end gap-1">
                                                <Percent className="w-3 h-3" /> Cashback
                                            </div>
                                            <div className="text-emerald-400 text-lg font-black tracking-tight">₹{plan.cashback.toLocaleString()}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-700/50">
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-lg py-6 rounded-[2rem] transition-all transform active:scale-[0.98] shadow-2xl shadow-blue-600/30 flex justify-center items-center gap-3"
                            onClick={() => alert(`Proceeding with ${product.name} - ${selectedVariant.name} on ${selectedPlan.tenure} months EMI strategy`)}
                        >
                            Secure this Plan <CheckCircle2 className="w-6 h-6" />
                        </button>
                        <p className="text-center text-slate-500 text-xs font-medium flex items-center justify-center gap-2">
                            <Info className="w-3 h-3" /> T&C Apply • Secure Checkout via 1Fi Gateway
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
