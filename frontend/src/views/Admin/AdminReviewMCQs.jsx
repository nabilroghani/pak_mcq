"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LuCheck, LuTrash2, LuEye } from "react-icons/lu";
import api from '../../utils/api';

const AdminReviewMCQs = () => {
    const [pendingMcqs, setPendingMcqs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPending = async () => {
        try {
            setLoading(true);
            const res = await api.get('/mcqs/all?status=pending');
            if (res.data.success) {
                setPendingMcqs(res.data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPending(); }, []);

const handleAction = async (id, action) => {
    const confirmMsg = action === 'approved' ? "Approve this MCQ?" : "Delete this MCQ?";
    
    // 1. Token nikaalein localStorage se
    const token = (typeof window !== 'undefined' ? localStorage.getItem('token') : null); 

    const result = await Swal.fire({
        title: 'Are you sure?',
        text: confirmMsg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: action === 'approved' ? '#10b981' : '#ef4444',
        confirmButtonText: 'Yes, do it!'
    });

    if (result.isConfirmed) {
        try {
            // 2. Headers mein Authorization token lazmi bhejein
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (action === 'approved') {
                // Yahan config (headers) teesre argument mein jayega
                await api.put(`/mcqs/update/${id}`, { status: 'approved' }, config);
            } else {
                // Delete mein config (headers) doosre argument mein jayega
                await api.delete(`/mcqs/delete/${id}`, config);
            }

            Swal.fire('Updated!', `MCQ has been ${action}.`, 'success');
            fetchPending(); 
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Action failed: ' + (err.response?.data?.message || 'Unauthorized'), 'error');
        }
    }
};

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-black text-blue-950">Review Submissions</h1>
                    <p className="text-gray-500 text-sm">Manage MCQs submitted by users.</p>
                </div>
                <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold text-sm">
                    {pendingMcqs.length} Pending
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : pendingMcqs.length === 0 ? (
                <div className="bg-white p-10 rounded-2xl text-center shadow-sm border border-dashed border-gray-300">
                    <p className="text-gray-400 font-medium text-lg">No pending submissions found.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {pendingMcqs.map((item) => (
                        <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-1 rounded mb-2 inline-block">
                                    {item.category}
                                </span>
                                <h3 className="text-lg font-bold text-slate-800 mb-4">{item.question}</h3>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {item.options.map((opt, i) => (
                                        <div key={i} className={`text-sm p-2 rounded border ${item.correctAnswer === String.fromCharCode(65 + i) ? 'bg-green-50 border-green-200 font-bold' : 'bg-gray-50 border-gray-100'}`}>
                                            {String.fromCharCode(65 + i)}. {opt}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 italic">Submitted by: {item.submittedBy || 'Guest'}</p>
                            </div>

                            <div className="flex md:flex-col gap-2 justify-center">
                                <button 
                                    onClick={() => handleAction(item._id, 'approved')}
                                    className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition shadow-lg shadow-green-500/20"
                                    title="Approve"
                                >
                                    <LuCheck size={20} />
                                </button>
                                <button 
                                    onClick={() => handleAction(item._id, 'deleted')}
                                    className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition shadow-lg shadow-red-500/20"
                                    title="Delete"
                                >
                                    <LuTrash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminReviewMCQs;