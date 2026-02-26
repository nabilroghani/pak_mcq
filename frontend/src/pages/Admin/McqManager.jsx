import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Search, Edit3, Trash2, Plus, Filter, CheckCircle, Clock, AlertCircle, Eye, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MCQManager = () => {
    const [mcqs, setMcqs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('table'); 
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // 1. Fetch MCQs
    const fetchMCQs = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/mcqs/all", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data && Array.isArray(res.data.data)) {
                setMcqs(res.data.data);
            }
            setLoading(false);
        } catch (err) {
            console.error("Fetch error", err);
            setMcqs([]);
            setLoading(false);
        }
    };

    useEffect(() => { fetchMCQs(); }, []);

    // 2. Delete Functionality
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This MCQ will be permanently removed!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            background: '#0f172a',
            color: '#fff',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/mcqs/delete/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setMcqs(mcqs.filter(m => m._id !== id));
                    Swal.fire({ title: 'Deleted!', icon: 'success', background: '#0f172a', color: '#fff' });
                } catch (err) {
                    Swal.fire('Error', 'Could not delete', 'error');
                }
            }
        });
    };

    // 3. Simple Edit Functionality (Popup)
const handleEdit = (mcq) => {
    Swal.fire({
        title: 'Edit Full MCQ',
        background: '#0f172a',
        color: '#fff',
        width: '650px',
        html: `
            <div style="text-align: left; display: flex; flex-direction: column; gap: 12px; padding: 10px;">
                <div>
                    <label style="font-size: 12px; color: #94a3b8;">Question</label>
                    <textarea id="edit-q" class="swal2-input" style="width: 100%; height: 70px; margin:5px 0; background:#1e293b; color:white; border:1px solid #334155; border-radius: 8px;">${mcq.question}</textarea>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <label style="font-size: 12px; color: #94a3b8;">Option 1</label>
                        <input id="edit-o1" class="swal2-input" style="width: 100%; margin:5px 0; background:#1e293b; color:white; border:1px solid #334155;" value="${mcq.options[0]}">
                    </div>
                    <div>
                        <label style="font-size: 12px; color: #94a3b8;">Option 2</label>
                        <input id="edit-o2" class="swal2-input" style="width: 100%; margin:5px 0; background:#1e293b; color:white; border:1px solid #334155;" value="${mcq.options[1]}">
                    </div>
                    <div>
                        <label style="font-size: 12px; color: #94a3b8;">Option 3</label>
                        <input id="edit-o3" class="swal2-input" style="width: 100%; margin:5px 0; background:#1e293b; color:white; border:1px solid #334155;" value="${mcq.options[2]}">
                    </div>
                    <div>
                        <label style="font-size: 12px; color: #94a3b8;">Option 4</label>
                        <input id="edit-o4" class="swal2-input" style="width: 100%; margin:5px 0; background:#1e293b; color:white; border:1px solid #334155;" value="${mcq.options[3]}">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
                    <div>
                        <label style="font-size: 12px; color: #94a3b8;">Correct Option Number</label>
                        <select id="edit-correct-idx" class="swal2-input" style="width: 100%; margin:5px 0; background:#1e293b; color:white; border:1px solid #334155;">
                            <option value="0" ${mcq.correctAnswer === mcq.options[0] ? 'selected' : ''}>Option 1</option>
                            <option value="1" ${mcq.correctAnswer === mcq.options[1] ? 'selected' : ''}>Option 2</option>
                            <option value="2" ${mcq.correctAnswer === mcq.options[2] ? 'selected' : ''}>Option 3</option>
                            <option value="3" ${mcq.correctAnswer === mcq.options[3] ? 'selected' : ''}>Option 4</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size: 12px; color: #94a3b8;">Category</label>
                        <input id="edit-cat" class="swal2-input" style="width: 100%; margin:5px 0; background:#1e293b; color:white; border:1px solid #334155;" value="${mcq.category}">
                    </div>
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Save All Changes',
        confirmButtonColor: '#2563eb',
        preConfirm: () => {
            const opts = [
                document.getElementById('edit-o1').value,
                document.getElementById('edit-o2').value,
                document.getElementById('edit-o3').value,
                document.getElementById('edit-o4').value
            ];
            const correctIdx = document.getElementById('edit-correct-idx').value;

            return {
                question: document.getElementById('edit-q').value,
                options: opts,
                correctAnswer: opts[correctIdx], // Index ke mutabiq value pick karega
                category: document.getElementById('edit-cat').value
            };
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.put(`http://localhost:5000/api/mcqs/update/${mcq._id}`, result.value, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire({ title: 'Success!', text: 'Updated Successfully', icon: 'success', background: '#0f172a', color: '#fff' });
                fetchMCQs(); 
            } catch (err) {
                Swal.fire('Error', 'Update failed', 'error');
            }
        }
    });
};

    const filteredMCQs = mcqs.filter(m => 
        m.question?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 bg-gray-50 min-h-screen text-gray-900 w-full">
            {/* Header Area */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">MCQ Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Total: {mcqs.length} | Approved: {mcqs.length} | Pending: 0</p>
                </div>
                <button 
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    <Plus size={18} /> Create New MCQ
                </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white border border-gray-800 p-4 rounded-t-xl flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input 
                        className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none focus:border-blue-500 text-gray-900" 
                        placeholder="Search questions..." 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                        className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-700 transition"
                    >
                        Switch to {viewMode === 'table' ? 'Card View' : 'Table View'}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white border-x border-b border-gray-800 rounded-b-xl overflow-hidden shadow-2xl p-6">
                {loading ? (
                    <div className="text-center py-20 text-gray-500 italic">Fetching question bank...</div>
                ) : viewMode === 'table' ? (
                    /* --- TABLE VIEW (admin.png style) --- */
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-800">
                                <th className="px-4 py-4">Subject</th>
                                <th className="px-4 py-4">Question Preview</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-4 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredMCQs.map((mcq) => (
                                <tr key={mcq._id} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-4 py-4">
                                        <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-1 rounded font-bold uppercase">{mcq.category}</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <p className="text-sm font-medium line-clamp-1">{mcq.question}</p>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Published
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => setViewMode('cards')} className="text-gray-500 hover:text-blue-400"><Eye size={18} /></button>
                                            <button onClick={() => handleEdit(mcq)} className="text-gray-500 hover:text-orange-400"><Edit3 size={18} /></button>
                                            <button onClick={() => handleDelete(mcq._id)} className="text-gray-500 hover:text-red-500"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    /* --- CARD VIEW (edit mcqs.png style) --- */
                    <div className="space-y-6">
                        {filteredMCQs.map((mcq) => (
                            <div key={mcq._id} className="bg-gray-50/20 border border-gray-800 rounded-xl p-6 relative">
                                <div className="flex gap-2 mb-3">
                                    <span className="bg-gray-700 px-2 py-1 rounded text-[10px]">{mcq.category}</span>
                                    <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-[10px] font-bold">Approved</span>
                                </div>
                                <h3 className="text-md font-semibold mb-4">{mcq.question}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                    {mcq.options?.map((opt, i) => (
                                        <div key={i} className={`p-3 rounded-lg border text-sm flex justify-between ${opt === mcq.correctAnswer ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400' : 'border-gray-800 bg-gray-900/50'}`}>
                                            {i + 1}. {opt}
                                            {opt === mcq.correctAnswer && <CheckCircle size={16} />}
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-gray-900/80 p-3 rounded-lg text-xs text-gray-500 border border-gray-800">
                                    <strong>Explanation:</strong> {mcq.explanation || 'N/A'}
                                </div>
                                <div className="absolute top-6 right-6 flex flex-col gap-2">
                                    <button onClick={() => handleEdit(mcq)} className="bg-gray-50 border border-gray-200 p-2 rounded hover:bg-gray-700 flex items-center gap-2 text-xs font-bold transition"><Edit3 size={14} /> Edit</button>
                                    <button onClick={() => handleDelete(mcq._id)} className="bg-red-500/10 text-red-500 border border-red-500/20 p-2 rounded hover:bg-red-500/20 flex items-center gap-2 text-xs font-bold transition"><Trash2 size={14} /> Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MCQManager;