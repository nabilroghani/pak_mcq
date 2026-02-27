import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Plus, LayoutGrid, Trash2, Loader2 } from 'lucide-react';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');
    const token = localStorage.getItem('token');

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/categories/all");
            setCategories(res.data);
            setLoading(false);
        } catch (err) { console.error(err); setLoading(false); }
    };

    useEffect(() => { fetchCategories(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Backend URL: /api/categories/add
            await axios.post("http://localhost:5000/api/categories/add", 
                { name, parent: parentId || null },
                { headers: { Authorization: `Bearer ${token}` } });
            
            setName(''); setParentId(''); fetchCategories();
            Swal.fire({ icon: 'success', title: 'Added!', timer: 800, showConfirmButton: false });
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Failed', 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Category?',
            text: "Are you sure?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete'
        });

        if (result.isConfirmed) {
            try {
                // Ensure the URL is correct: /api/categories/ID
                await axios.delete(`http://localhost:5000/api/categories/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchCategories();
                Swal.fire('Deleted!', '', 'success');
            } catch (err) { 
                console.error("Delete error:", err);
                Swal.fire('Error', 'Route not found (404) or Server error', 'error'); 
            }
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen w-full font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <LayoutGrid className="text-emerald-600" /> Subject Manager
                </h1>

                {/* FORM SECTION */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Name</label>
                            <input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="w-full mt-1 px-4 py-2.5 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Parent Category</label>
                            <select 
                                value={parentId} 
                                onChange={(e) => setParentId(e.target.value)} 
                                className="w-full mt-1 px-4 py-2.5 bg-slate-50 border rounded-xl outline-none"
                            >
                                <option value="">None (Main Heading)</option>
                                {categories.filter(c => !c.parent).map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl flex justify-center items-center gap-2 shadow-md transition-all">
                            <Plus size={18} /> ADD
                        </button>
                    </form>
                </div>

                {/* LIST SECTION */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {loading ? (
                        <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-emerald-500" /></div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {categories.filter(c => !c.parent).map(main => (
                                <div key={main._id} className="p-4">
                                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                                        <span className="font-bold text-slate-700">{main.name}</span>
                                        <button onClick={() => handleDelete(main._id)} className="p-1.5 bg-white text-red-400 hover:text-red-600 rounded-lg shadow-sm border border-red-50 hover:bg-red-50 transition-all">
                                            <Trash2 size={16}/>
                                        </button>
                                    </div>
                                    <div className="ml-8 mt-2 space-y-2">
                                        {categories.filter(sub => sub.parent === main._id).map(sub => (
                                            <div key={sub._id} className="flex justify-between items-center p-2 border-l-2 border-emerald-100 pl-4 text-sm font-medium text-slate-500 hover:bg-slate-50 rounded-r-lg transition-all group">
                                                {sub.name}
                                                <button onClick={() => handleDelete(sub._id)} className="opacity-0 group-hover:opacity-100 p-1 text-red-300 hover:text-red-500 transition-all">
                                                    <Trash2 size={14}/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;