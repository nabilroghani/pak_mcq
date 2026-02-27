import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
    Search, Edit3, Trash2, Plus, CheckCircle, 
    LayoutGrid, List, BookOpen, Database 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MCQManager = () => {
    const [mcqs, setMcqs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('table'); 
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // URL CONFIGURATION
    // const API_BASE_URL = "https://pakmcqbackend-carekxyxo-nabil-ahmads-projects-394a5d0b.vercel.app";
    const API_BASE_URL = "http://localhost:5000";

    const fetchMCQs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/api/mcqs/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data && Array.isArray(res.data.data)) {
                setMcqs(res.data.data);
            }
        } catch (err) {
            console.error("Fetch error", err);
            // Agar CORS ya Network error aaye toh empty array set karein
            setMcqs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMCQs();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Haqeeqat mein delete karna hai?',
            text: "Yeh question wapas nahi aayega!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Haan, ura do!',
            cancelButtonText: 'Nahi, rehne do',
            background: '#ffffff',
            borderRadius: '20px'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_BASE_URL}/api/mcqs/delete/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setMcqs(mcqs.filter(m => m._id !== id));
                    Swal.fire({ title: 'Deleted!', icon: 'success', timer: 1000, showConfirmButton: false });
                } catch (err) {
                    Swal.fire('Error', 'Delete nahi ho saka!', 'error');
                }
            }
        });
    };

    const handleEdit = (mcq) => {
        Swal.fire({
            title: '<span style="color:#2563eb">Edit Question</span>',
            width: '650px',
            html: `
                <div style="text-align: left; font-family: sans-serif; padding: 10px;">
                    <label style="font-weight:bold; font-size:12px; color:#64748b;">QUESTION</label>
                    <textarea id="edit-q" class="swal2-textarea" style="width:100%; border-radius:12px; margin: 8px 0;">${mcq.question}</textarea>
                    
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                        ${mcq.options.map((opt, i) => `
                            <div>
                                <label style="font-size:11px; color:#94a3b8;">OPTION ${i+1}</label>
                                <input id="edit-o${i+1}" class="swal2-input" style="width:100%; margin:5px 0; border-radius:8px;" value="${opt}">
                            </div>
                        `).join('')}
                    </div>

                    <div style="margin-top:15px;">
                         <label style="font-weight:bold; font-size:12px; color:#64748b;">CORRECT ANSWER</label>
                         <select id="edit-correct" class="swal2-select" style="width:100%; border-radius:8px;">
                            ${mcq.options.map((opt, i) => `
                                <option value="${i}" ${mcq.correctAnswer === opt ? 'selected' : ''}>Option ${i+1}</option>
                            `).join('')}
                         </select>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Update Now',
            confirmButtonColor: '#2563eb',
            preConfirm: () => {
                const opts = [
                    document.getElementById('edit-o1').value,
                    document.getElementById('edit-o2').value,
                    document.getElementById('edit-o3').value,
                    document.getElementById('edit-o4').value
                ];
                return {
                    question: document.getElementById('edit-q').value,
                    options: opts,
                    correctAnswer: opts[document.getElementById('edit-correct').value],
                    category: mcq.category
                };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(`${API_BASE_URL}/api/mcqs/update/${mcq._id}`, result.value, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    fetchMCQs();
                    Swal.fire({ icon: 'success', title: 'Updated!', timer: 1000, showConfirmButton: false });
                } catch (err) {
                    Swal.fire('Error', 'Update fail ho gaya', 'error');
                }
            }
        });
    };

    const filteredMCQs = mcqs.filter(m => 
        m.question?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen w-full font-sans antialiased">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">
                            MCQ <span className="text-blue-600">MASTER</span>
                        </h1>
                        <div className="flex gap-3 mt-3">
                            <span className="bg-white border border-slate-200 text-slate-600 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                                <Database size={14} className="text-blue-500" /> {mcqs.length} Total
                            </span>
                            <span className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                                <CheckCircle size={14} /> System Online
                            </span>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate("/admin/dashboard")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black transition-all shadow-xl shadow-blue-200 active:scale-95"
                    >
                        <Plus size={22} strokeWidth={3} /> CREATE NEW
                    </button>
                </div>

                {/* Search & Toggle Bar */}
                <div className="bg-white p-5 rounded-t-3xl border-t border-x border-slate-200 flex flex-col md:flex-row justify-between items-center gap-5 shadow-sm">
                    <div className="relative w-full md:max-w-lg">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                            placeholder="Search by question keyword or subject..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                        <button onClick={() => setViewMode('table')} className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}>
                            <List size={16}/> TABLE
                        </button>
                        <button onClick={() => setViewMode('cards')} className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${viewMode === 'cards' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}>
                            <LayoutGrid size={16}/> GRID
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white border-x border-b border-slate-200 rounded-b-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
                    {loading ? (
                        <div className="py-40 flex flex-col items-center">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-slate-400 font-bold tracking-widest text-xs uppercase">Synchronizing Data...</p>
                        </div>
                    ) : viewMode === 'table' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">
                                        <th className="px-8 py-5 text-center">Cat</th>
                                        <th className="px-4 py-5">Question Details</th>
                                        <th className="px-8 py-5 text-center">Manage</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredMCQs.map((mcq) => (
                                        <tr key={mcq._id} className="hover:bg-blue-50/40 transition-colors group">
                                            <td className="px-8 py-5 text-center">
                                                <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded font-black uppercase border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                                                    {mcq.category?.substring(0,3)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-5">
                                                <p className="text-sm font-bold text-slate-700 line-clamp-1 group-hover:text-blue-700 transition-colors">{mcq.question}</p>
                                                <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">{mcq.category}</p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex justify-center gap-4">
                                                    <button onClick={() => handleEdit(mcq)} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={18}/></button>
                                                    <button onClick={() => handleDelete(mcq._id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18}/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredMCQs.map((mcq) => (
                                <div key={mcq._id} className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:bg-white hover:border-blue-200 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-tighter italic">LIVE DATABASE</span>
                                        <BookOpen size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-sm mb-6 leading-relaxed line-clamp-3">{mcq.question}</h3>
                                    <div className="space-y-2 mb-6">
                                        {mcq.options.map((opt, i) => (
                                            <div key={i} className={`text-[11px] p-2.5 rounded-xl border flex items-center gap-3 ${opt === mcq.correctAnswer ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold' : 'bg-white border-slate-100 text-slate-500'}`}>
                                                <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-[9px]">{i+1}</span>
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mcq.category}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(mcq)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit3 size={16}/></button>
                                            <button onClick={() => handleDelete(mcq._id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredMCQs.length === 0 && (
                        <div className="py-40 text-center flex flex-col items-center">
                             <Search size={48} className="text-slate-200 mb-4" />
                             <p className="text-slate-400 font-bold">No Questions Match Your Search</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MCQManager;