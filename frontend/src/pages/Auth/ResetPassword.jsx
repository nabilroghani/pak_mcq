import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Lock } from 'lucide-react';
import api from '../../utils/api';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(`/auth/reset-password/${token}`, { password });
            if (res.data.success) {
                Swal.fire('Success!', 'Password update ho gaya hai. Login karein.', 'success');
                navigate("/login");
            }
        } catch (err) {
            Swal.fire('Error', 'Link expire ho chuka hai ya token invalid hai.', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 w-full max-w-md shadow-xl text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">New Password</h2>
                <form onSubmit={handleReset} className="space-y-4">
                    <div className="relative text-left">
                        <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                        <input 
                            type="password" required placeholder="New Password"
                            className="w-full bg-gray-50 border border-gray-300 p-3 pl-10 rounded-xl outline-none focus:border-blue-500 transition"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transition">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;