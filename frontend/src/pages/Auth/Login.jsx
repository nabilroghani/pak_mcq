import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Popup ke liye
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                
                // Success Popup
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'Login successful.',
                    timer: 2000,
                    showConfirmButton: false
                });

                if (res.data.user.role === 'admin') {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            }
        } catch (err) {
            // Error Popup
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: err.response?.data?.message || "Invalid email or password",
                confirmButtonColor: '#2563eb'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 w-full max-w-md shadow-xl">
                <div className="text-center mb-8">
                    <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                        <LogIn className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Login to Account</h2>
                    <p className="text-gray-500 text-sm mt-1">Access your EduAdmin control panel</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-gray-600 text-xs font-bold uppercase mb-2 block tracking-wider">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="email" required
                                className="w-full bg-gray-50 border border-gray-300 p-3 pl-10 rounded-xl text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                placeholder="name@example.com"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-600 text-xs font-bold uppercase mb-2 block tracking-wider">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="password" required
                                className="w-full bg-gray-50 border border-gray-300 p-3 pl-10 rounded-xl text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" size="sm" className="text-xs text-blue-600 font-semibold hover:underline">Forgot Password?</Link>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">
                        Sign In
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-medium">Or continue with</span></div>
                </div>

                <p className="text-center text-gray-600 text-sm">
                    New here? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;