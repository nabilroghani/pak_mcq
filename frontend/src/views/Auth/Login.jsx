"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'; 
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../../utils/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", formData);
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'Login successful.',
                    timer: 1500,
                    showConfirmButton: false,
                    borderRadius: '20px'
                });

                // Role based navigation
                if (res.data.user.role === 'admin') {
                    router.push("/admin/dashboard");
                } else {
                    router.push("/");
                }
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: err.response?.data?.message || "Invalid email or password",
                confirmButtonColor: '#2563eb'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans antialiased">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 w-full max-w-md shadow-2xl shadow-blue-100/50">
                <div className="text-center mb-8">
                    <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-200">
                        <LogIn className="text-white" size={28} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Login</h2>
                    <p className="text-slate-500 text-sm mt-2 font-medium">Access your <span className="text-blue-600 font-bold tracking-tighter italic uppercase">Pak Learners</span> account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
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

                    {/* Password Field with Toggle */}
                    <div>
                        <div className="flex justify-between items-center mb-1.5 ml-1">
                            <label className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Password</label>
                            <Link href="/forgot-password" size="sm" className="text-[10px] text-blue-600 font-black uppercase tracking-wider hover:underline">Forgot?</Link>
                        </div>
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
                        Sign In
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black"><span className="bg-white px-4 text-slate-300">Or</span></div>
                </div>

                <p className="text-center text-slate-500 text-sm font-medium">
                    New here? <Link href="/signup" className="text-blue-600 font-black hover:underline underline-offset-4">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;