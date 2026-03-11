import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Plus, LayoutGrid, Trash2, Loader2, Edit3, Save } from 'lucide-react';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');
    const [editingId, setEditingId] = useState(null); 
    const token = localStorage.getItem('token');

    // Sorting Helper Function (Oldest First)
    const sortOldest = (list) => {
        return [...list].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/categories/all");
            setCategories(res.data); 
            setLoading(false);
        } catch (err) { 
            console.error(err); 
            setLoading(false); 
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({ title: editingId ? 'Updating...' : 'Adding...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

            const payload = { name, parent: parentId || null };

            if (editingId) {
                await axios.put(`http://localhost:5000/api/categories/${editingId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post("http://localhost:5000/api/categories/add", payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            
            resetForm();
            fetchCategories();
            Swal.fire({ icon: 'success', title: editingId ? 'Updated!' : 'Added!', timer: 1000, showConfirmButton: false });
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Operation failed', 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Is category ke saare MCQs aur sub-categories bhi delete ho jayenge!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Delete Everything'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/categories/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchCategories(); 
                Swal.fire('Deleted!', 'Everything removed from DB.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Deletion failed', 'error');
            }
        }
    };

    const startEdit = (cat) => {
        setEditingId(cat._id);
        setName(cat.name);
        setParentId(cat.parent || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setName('');
        setParentId('');
        setEditingId(null);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen w-full font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                        <LayoutGrid className="text-emerald-600" /> Category Manager
                    </h1>
                </header>

                {/* Form Section */}
                <div className={`p-6 rounded-2xl shadow-sm border mb-8 transition-all ${editingId ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'}`}>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Category Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Punjab" required />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Parent (Restriction Applied)</label>
                            <select value={parentId} onChange={(e) => setParentId(e.target.value)} className="w-full mt-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none">
                                <option value="">None (Level 1)</option>
                                {sortOldest(categories.filter(c => !c.parent && c._id !== editingId)).map(c => (
                                    <React.Fragment key={c._id}>
                                        <option value={c._id} className="font-bold text-slate-900">{c.name}</option>
                                        {sortOldest(categories.filter(sub => sub.parent === c._id)).map(sub => (
                                            <option key={sub._id} value={sub._id}>&nbsp;&nbsp;↳ {sub.name} (Level 2)</option>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </select>
                        </div>
                        <button className={`font-bold py-2.5 rounded-xl text-white flex justify-center items-center gap-2 shadow-md transition-all ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                            {editingId ? <><Save size={18} /> UPDATE</> : <><Plus size={18} /> ADD CATEGORY</>}
                        </button>
                    </form>
                </div>

                {/* Visual List Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {loading ? (
                        <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-emerald-500" /></div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {/* LEVEL 1: Main Parents */}
                            {sortOldest(categories.filter(c => !c.parent)).map(main => (
                                <div key={main._id} className="p-4 hover:bg-slate-50/50 transition-all">
                                    <div className="flex justify-between items-center bg-slate-100/50 p-3 rounded-xl border border-slate-200">
                                        <span className="font-bold text-slate-700 uppercase">{main.name}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => startEdit(main)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit3 size={16}/></button>
                                            <button onClick={() => handleDelete(main._id)} className="p-1.5 text-red-400 hover:text-red-600 rounded-lg"><Trash2 size={16}/></button>
                                        </div>
                                    </div>

                                    {/* LEVEL 2: Sub-categories */}
                                    <div className="ml-8 mt-2 space-y-2">
                                        {sortOldest(categories.filter(sub => sub.parent === main._id)).map(sub => (
                                            <div key={sub._id} className="p-2 border-l-2 border-emerald-100 pl-4">
                                                <div className="flex justify-between items-center group">
                                                    <span className="font-semibold text-slate-600 italic">📂 {sub.name}</span>
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                        <Edit3 size={14} className="cursor-pointer text-blue-400" onClick={() => startEdit(sub)}/>
                                                        <Trash2 size={14} className="cursor-pointer text-red-300" onClick={() => handleDelete(sub._id)}/>
                                                    </div>
                                                </div>

                                                {/* LEVEL 3: Child Categories */}
                                                <div className="ml-6 mt-2 space-y-1">
                                                    {sortOldest(categories.filter(child => child.parent === sub._id)).map(child => (
                                                        <div key={child._id} className="flex justify-between items-center bg-white p-2 rounded border border-dotted border-slate-200 text-xs group/child">
                                                            <span className="text-slate-500 font-medium">• {child.name}</span>
                                                            <div className="flex gap-2 opacity-0 group-hover/child:opacity-100 transition-all">
                                                                <Edit3 size={12} className="cursor-pointer text-blue-300" onClick={() => startEdit(child)}/>
                                                                <Trash2 size={12} className="cursor-pointer text-red-200" onClick={() => handleDelete(child._id)}/>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
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