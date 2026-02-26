import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Professional popups ke liye
import { UserPlus, User, Mail, Lock, ShieldCheck } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", formData);
            if (res.data.success) {
                // Success Popup
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'Account created! Please login to continue.',
                    confirmButtonColor: '#059669', // Emerald color
                });
                navigate("/login");
            }
        } catch (err) {
            // Error Popup
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: err.response?.data?.message || "Something went wrong. Please try again.",
                confirmButtonColor: '#ef4444'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 w-full max-w-md shadow-xl">
                <div className="text-center mb-8">
                    <div className="bg-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-100">
                        <UserPlus className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-500 text-sm mt-1">Join the MCQS Portal community</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-gray-600 text-xs font-bold uppercase mb-1.5 block tracking-wider">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="text" required
                                className="w-full bg-gray-50 border border-gray-300 p-3 pl-10 rounded-xl text-gray-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                                placeholder="Nabil"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-600 text-xs font-bold uppercase mb-1.5 block tracking-wider">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="email" required
                                className="w-full bg-gray-50 border border-gray-300 p-3 pl-10 rounded-xl text-gray-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                                placeholder="name@example.com"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-600 text-xs font-bold uppercase mb-1.5 block tracking-wider">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="password" required
                                className="w-full bg-gray-50 border border-gray-300 p-3 pl-10 rounded-xl text-gray-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    

                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-200 mt-2 active:scale-[0.98]">
                        Sign Up Now
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6 text-sm">
                    Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;