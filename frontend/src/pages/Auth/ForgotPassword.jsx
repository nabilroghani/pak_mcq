import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgot = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
            if (res.data.success) {
                Swal.fire('Sent!', 'Reset link aapke email par bhej diya gaya hai.', 'success');
            }
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Something went wrong', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 w-full max-w-md shadow-xl">
                <Link to="/login" className="flex items-center gap-2 text-blue-600 text-sm font-bold mb-6">
                    <ArrowLeft size={16} /> Back to Login
                </Link>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
                <p className="text-gray-500 text-sm mb-6">Apna registered email enter karein, hum aapko reset link bhejenge.</p>

                <form onSubmit={handleForgot} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                        <input 
                            type="email" required placeholder="name@example.com"
                            className="w-full bg-gray-50 border border-gray-300 p-3 pl-10 rounded-xl outline-none focus:border-blue-500 transition"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition active:scale-95 disabled:bg-gray-400">
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;