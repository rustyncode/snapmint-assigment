import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2, ArrowLeft, Info, Percent, Calendar, ShieldCheck, Wallet } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
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
        <div className="flex flex-col justify-center items-center h-[60vh] space-y-4 text-teal-600">
            <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
            <p className="font-medium animate-pulse">Loading Product Details...</p>
        </div>
    );

    if (!product) return (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <Link to="/" className="text-teal-600 hover:underline flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to store
            </Link>
        </div>
    );

    const colors = [...new Set(product.variants.map(v => v.color))];
    const storages = [...new Set(product.variants.filter(v => v.color === selectedVariant.color).map(v => v.storage))];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Breadcrumbs */}
            <div className="text-xs text-slate-500 flex items-center gap-2 px-2">
                <Link to="/" className="hover:text-teal-600">Shop on EMI</Link>
                <span>&gt;</span>
                <span className="hover:text-teal-600 cursor-pointer">Smart Phones</span>
                <span>&gt;</span>
                <span className="text-slate-900 font-bold">{product.name}</span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
                {/* Thumbnails Sidebar - Hidden on small screens */}
                <div className="hidden md:flex flex-col gap-4 p-6 border-r border-slate-100 bg-slate-50/30 w-24">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`aspect-square rounded-xl border-2 p-1 cursor-pointer transition-all ${i === 1 ? 'border-teal-500 bg-white' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                            <img src={selectedVariant.image} alt="thumb" className="w-full h-full object-contain" />
                        </div>
                    ))}
                </div>

                {/* Main Product Image Container */}
                <div className="flex-grow p-10 flex flex-col items-center justify-center relative bg-white">
                    <img
                        src={selectedVariant.image}
                        alt={selectedVariant.name}
                        className="max-w-md w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700"
                    />

                    <div className="mt-12 flex gap-4 w-full max-w-sm">
                        <div className="flex-1 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex flex-col text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Color</span>
                            <span className="text-sm font-bold text-slate-800">{selectedVariant.color}</span>
                        </div>
                        <div className="flex-1 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex flex-col text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Storage</span>
                            <span className="text-sm font-bold text-slate-800">{selectedVariant.storage}</span>
                        </div>
                    </div>
                </div>

                {/* Pricing and EMI Sidebar */}
                <div className="lg:w-[450px] bg-sky-50/50 p-8 border-l border-slate-100 flex flex-col">
                    <div className="mb-6">
                        <h1 className="text-2xl font-black text-slate-900 mb-1 leading-tight">{product.name}</h1>
                        <p className="text-slate-500 text-sm italic">(Storage: {selectedVariant.storage}, Color: {selectedVariant.color})</p>
                    </div>

                    <div className="mb-8">
                        <div className="text-3xl font-black text-slate-900">₹{selectedVariant.price.toLocaleString()}</div>
                    </div>

                    {/* EMI Selection Box */}
                    <div className="bg-white rounded-3xl border border-teal-100 p-6 shadow-xl shadow-teal-500/5 space-y-6">
                        <div className="flex items-center gap-2 text-teal-700">
                            <Wallet className="w-5 h-5" />
                            <span className="font-bold text-sm">Pay Now : ₹19 Downpayment</span>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-black text-slate-800">Choose EMI Tenure</h3>
                            {product.emiPlans.map(plan => (
                                <label key={plan.id} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPlan.id === plan.id ? 'border-teal-500 bg-teal-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="emi"
                                            checked={selectedPlan.id === plan.id}
                                            onChange={() => setSelectedPlan(plan)}
                                            className="w-4 h-4 accent-teal-600"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900">₹{plan.monthlyAmount.toLocaleString()} x {plan.tenure} months</span>
                                        </div>
                                    </div>
                                    {plan.interestRate === 0 && (
                                        <span className="text-[10px] font-black bg-lime-400 text-lime-950 px-2 py-0.5 rounded italic">^0% EMI</span>
                                    )}
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowSuccess(true)}
                            className="w-full bg-teal-900 hover:bg-teal-950 text-white font-black py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
                        >
                            Buy on {selectedPlan.tenure} months EMI
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-teal-800">
                            <div className="bg-teal-100 p-1.5 rounded-lg"><CheckCircle2 className="w-4 h-4" /></div>
                            Free Delivery
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-teal-800">
                            <div className="bg-teal-100 p-1.5 rounded-lg"><ShieldCheck className="w-4 h-4" /></div>
                            Secure Transaction
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Specs Section */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 space-y-8">
                <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">Product Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {product.description}
                        </p>
                        <div className="space-y-3">
                            {['Storage', 'Color', 'Display', 'Processor'].map(spec => (
                                <div key={spec} className="flex border-b border-slate-50 py-2 text-sm">
                                    <span className="w-32 text-slate-400 font-medium">{spec}</span>
                                    <span className="font-bold text-slate-800">Available in multiple variants</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <h4 className="font-bold text-teal-800 mb-4 flex items-center gap-2">
                            <Percent className="w-4 h-4" /> Offers & Incentives
                        </h4>
                        <ul className="text-xs text-slate-500 space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500">•</span>
                                <div><strong>Insta-Approval:</strong> No credit score required for first-time buyers.</div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500">•</span>
                                <div><strong>Bonus Cashback:</strong> ₹1,500 extra off on your 3rd EMI payment.</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 max-w-md w-full text-center shadow-2xl animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-4">Application Success!</h3>
                        <p className="text-slate-500 mb-8 leading-relaxed text-sm">
                            Your order for <strong>{product.name}</strong> has been initiated. Our verification team will contact you within 2 hours.
                        </p>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
