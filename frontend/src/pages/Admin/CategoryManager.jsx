import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Plus, LayoutGrid, Trash2, Loader2, Edit3, X, Save } from 'lucide-react';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');
    const [editingId, setEditingId] = useState(null); 
    const token = localStorage.getItem('token');

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

    // --- ADD OR UPDATE CATEGORY ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({ title: editingId ? 'Updating...' : 'Adding...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

            if (editingId) {
                // Edit Logic
                await axios.put(`http://localhost:5000/api/categories/${editingId}`, 
                    { name, parent: parentId || null },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                // Add Logic
                await axios.post("http://localhost:5000/api/categories/add", 
                    { name, parent: parentId || null },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            
            resetForm();
            fetchCategories();
            Swal.fire({ icon: 'success', title: editingId ? 'Updated!' : 'Added!', timer: 1000, showConfirmButton: false });
        } catch (err) {
            Swal.fire('Error', err.response?.data?.message || 'Operation failed', 'error');
        }
    };

    // --- DELETE CATEGORY ---
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Category?',
            text: "Is heading ke andar tamam sub-categories bhi delete ho sakti hain!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Delete'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/categories/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchCategories();
                Swal.fire('Deleted!', '', 'success');
            } catch (err) { 
                Swal.fire('Error', 'Could not delete category', 'error'); 
            }
        }
    };

    // --- EDIT TRIGGER ---
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
                        <LayoutGrid className="text-emerald-600" /> Subject Manager
                    </h1>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                        Total: {categories.length}
                    </span>
                </header>

                {/* FORM SECTION (DYNAMIC FOR ADD/EDIT) */}
                <div className={`p-6 rounded-2xl shadow-sm border mb-8 transition-all ${editingId ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-xs font-bold uppercase text-slate-500">
                            {editingId ? "Edit Category Mode" : "Add New Category"}
                        </p>
                        {editingId && (
                            <button onClick={resetForm} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs font-bold">
                                <X size={14} /> Cancel Edit
                            </button>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Category Name</label>
                            <input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="w-full mt-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" 
                                placeholder="e.g. Pakistan Studies"
                                required 
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Parent (Optional)</label>
                            <select 
                                value={parentId} 
                                onChange={(e) => setParentId(e.target.value)} 
                                className="w-full mt-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none"
                                disabled={editingId} // Parent change is safer to keep locked during simple edit
                            >
                                <option value="">None (Main Heading)</option>
                                {categories.filter(c => !c.parent && c._id !== editingId).map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className={`font-bold py-2.5 rounded-xl flex justify-center items-center gap-2 shadow-md transition-all ${editingId ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}>
                            {editingId ? <><Save size={18} /> UPDATE</> : <><Plus size={18} /> ADD</>}
                        </button>
                    </form>
                </div>

                {/* LIST SECTION */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {loading ? (
                        <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-emerald-500" /></div>
                    ) : categories.length === 0 ? (
                        <div className="p-10 text-center text-slate-400 font-medium italic">No categories found. Start by adding one!</div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {categories.filter(c => !c.parent).map(main => (
                                <div key={main._id} className="p-4 hover:bg-slate-50/50 transition-all">
                                    <div className="flex justify-between items-center bg-slate-100/50 p-3 rounded-xl border border-slate-200">
                                        <span className="font-bold text-slate-700">{main.name}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => startEdit(main)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit3 size={16}/>
                                            </button>
                                            <button onClick={() => handleDelete(main._id)} className="p-1.5 text-red-400 hover:text-red-600 rounded-lg transition-colors">
                                                <Trash2 size={16}/>
                                            </button>
                                        </div>
                                    </div>

                                    {/* SUB-CATEGORIES */}
                                    <div className="ml-8 mt-2 space-y-2">
                                        {categories.filter(sub => sub.parent === main._id).map(sub => (
                                            <div key={sub._id} className="flex justify-between items-center p-2 border-l-2 border-emerald-100 pl-4 text-sm font-medium text-slate-500 hover:bg-white rounded-r-lg transition-all group">
                                                <span>{sub.name}</span>
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button onClick={() => startEdit(sub)} className="p-1 text-blue-400 hover:text-blue-600">
                                                        <Edit3 size={14}/>
                                                    </button>
                                                    <button onClick={() => handleDelete(sub._id)} className="p-1 text-red-300 hover:text-red-500">
                                                        <Trash2 size={14}/>
                                                    </button>
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