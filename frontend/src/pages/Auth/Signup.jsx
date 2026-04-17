import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import { UserPlus, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../../utils/api';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/register", formData);
            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'Account created! Please login to continue.',
                    confirmButtonColor: '#2563eb', // Blue-600
                });
                navigate("/login");
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: err.response?.data?.message || "Something went wrong. Please try again.",
                confirmButtonColor: '#ef4444'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans antialiased">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 w-full max-w-md shadow-2xl shadow-blue-100/50">
                <div className="text-center mb-8">
                    <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-200">
                        <UserPlus className="text-white" size={28} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Create Account</h2>
                    <p className="text-slate-500 text-sm mt-2 font-medium">Join the <span className="text-blue-600 font-bold tracking-tighter italic uppercase">Pak Learners</span> community</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="text-slate-500 text-[10px] font-black uppercase mb-1.5 block tracking-[0.2em] ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                            <input 
                                type="text" required
                                className="w-full bg-slate-50 border border-slate-200 p-3.5 pl-12 rounded-2xl text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:font-normal"
                                placeholder="Nabil Ahmad"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="text-slate-500 text-[10px] font-black uppercase mb-1.5 block tracking-[0.2em] ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                            <input 
                                type="email" required
                                className="w-full bg-slate-50 border border-slate-200 p-3.5 pl-12 rounded-2xl text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:font-normal"
                                placeholder="name@example.com"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* Password with Show/Hide */}
                    <div>
                        <label className="text-slate-500 text-[10px] font-black uppercase mb-1.5 block tracking-[0.2em] ml-1">Secure Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                required
                                className="w-full bg-slate-50 border border-slate-200 p-3.5 pl-12 pr-12 rounded-2xl text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:font-normal"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-200 mt-2 active:scale-[0.97] uppercase tracking-widest text-xs">
                        Sign Up Now
                    </button>
                </form>

                <p className="text-center text-slate-500 mt-8 text-sm font-medium">
                    Already have an account? <Link to="/login" className="text-blue-600 font-black hover:underline underline-offset-4">Log in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;