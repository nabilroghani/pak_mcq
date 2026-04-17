import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate add kiya
import api from '../../utils/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Navigation ke liye

    const handleForgot = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/auth/forgot-password", { email });
            
            // Backend agar success true bhej raha hai
            if (res.data.success) {
                await Swal.fire({
                    title: 'Email Sent!',
                    text: 'Reset link aapke email par bhej diya gaya hai. Inbox check karein.',
                    icon: 'success',
                    confirmButtonColor: '#2563eb',
                    borderRadius: '15px'
                });
                // Password reset link bhejte hi login par wapas bhej dein
                navigate('/login');
            }
        } catch (err) {
            Swal.fire({
                title: 'Request Failed',
                text: err.response?.data?.message || 'Email bhejte waqt masla hua. Dobara koshish karein.',
                icon: 'error',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans antialiased">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 w-full max-w-md shadow-2xl shadow-gray-200/50">
                
                {/* Back Button */}
                <Link to="/login" className="inline-flex items-center gap-2 text-blue-600 text-sm font-bold mb-8 hover:text-blue-700 transition-colors">
                    <ArrowLeft size={16} strokeWidth={3} /> Back to Login
                </Link>

                <div className="mb-8">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Forgot Password?</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Apna registered email enter karein, hum aapko password reset karne ke liye aik secure link bhejenge.
                    </p>
                </div>

                <form onSubmit={handleForgot} className="space-y-5">
                    <div className="group relative">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input 
                                type="email" 
                                required 
                                placeholder="name@example.com"
                                className="w-full bg-gray-50 border border-gray-200 p-4 pl-12 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button 
                        disabled={loading} 
                        className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:shadow-none flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Sending Link...
                            </>
                        ) : "Send Reset Link"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
                        Secure Authentication System
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;