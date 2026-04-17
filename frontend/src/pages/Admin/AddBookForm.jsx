import React, { useState, useEffect } from 'react';
import api from '../../utils/api'; // Custom axios instance
import Swal from 'sweetalert2';
import { 
  FaPlusCircle, FaCloudUploadAlt, FaTrashAlt, 
  FaEdit, FaCheck, FaBookOpen, FaTimes 
} from 'react-icons/fa';

const EBookManager = () => {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', author: '', category: '', driveId: '', color: 'bg-emerald-500'
  });

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books/all');
      if (res.data.success) setBooks(res.data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = editingId ? `/books/update/${editingId}` : '/books/add';
    const method = editingId ? 'put' : 'post';

    try {
      const res = await api[method](endpoint, formData);

      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: editingId ? 'Book Updated!' : 'Book Added!',
          timer: 1500,
          showConfirmButton: false,
          borderRadius: '20px'
        });
        setFormData({ title: '', author: '', category: '', driveId: '', color: 'bg-emerald-500' });
        setEditingId(null);
        fetchBooks();
      }
    } catch (err) {
      Swal.fire('Error', 'Operation failed!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
      borderRadius: '20px'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/books/delete/${id}`);
        Swal.fire({ title: 'Deleted!', icon: 'success', timer: 1000, showConfirmButton: false });
        fetchBooks();
      } catch (err) {
        Swal.fire('Error', 'Delete failed!', 'error');
      }
    }
  };

  const startEdit = (book) => {
    setEditingId(book._id);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      driveId: book.driveId,
      color: book.color || 'bg-emerald-500'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen pb-24 font-sans antialiased">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 mb-10 border border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          {editingId ? <FaEdit className="text-orange-500"/> : <FaCloudUploadAlt className="text-blue-600"/>}
          {editingId ? "Update E-Book" : "Upload New E-Book"}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Book Title</label>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="The Great Gatsby" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 border border-transparent transition-all font-bold" required />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Author</label>
            <input name="author" value={formData.author} onChange={handleChange} placeholder="F. Scott Fitzgerald" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 border border-transparent transition-all font-bold" required />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Category (Tag)</label>
            <input name="category" value={formData.category} onChange={handleChange} placeholder="PPSC, CSS, Fiction..." className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 border border-transparent transition-all font-bold" required />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Google Drive File ID</label>
            <input name="driveId" value={formData.driveId} onChange={handleChange} placeholder="1A2b3C4d..." className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 border border-transparent transition-all font-bold text-blue-600" required />
          </div>
          
          <div className="md:col-span-2 flex flex-col gap-3 pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 ${editingId ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-200' : 'bg-slate-900 hover:bg-blue-600 shadow-slate-200'}`}
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (editingId ? <><FaCheck/> SAVE CHANGES</> : <><FaPlusCircle/> ADD TO LIBRARY</>)}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                onClick={() => {setEditingId(null); setFormData({title:'', author:'', category:'', driveId:'', color:'bg-emerald-500'})}} 
                className="flex items-center justify-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors py-2"
              >
                <FaTimes /> Discard Changes
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Library Inventory</h3>
            <p className="text-slate-400 text-sm font-medium">Total Books: {books.length}</p>
          </div>
          <FaBookOpen className="text-slate-200" size={40} />
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                  <th className="p-6">Book Details</th>
                  <th className="p-6">Classification</th>
                  <th className="p-6 text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {books.map((book) => (
                  <tr key={book._id} className="hover:bg-blue-50/30 transition-all group">
                    <td className="p-6">
                      <div className="font-black text-slate-800 group-hover:text-blue-600 transition-colors">{book.title}</div>
                      <div className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">{book.author}</div>
                    </td>
                    <td className="p-6">
                      <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100">
                        {book.category}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => startEdit(book)} 
                          className="p-3 bg-white text-slate-400 rounded-xl hover:bg-orange-50 hover:text-orange-500 border border-slate-100 hover:border-orange-100 transition-all shadow-sm"
                          title="Edit Book"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(book._id)} 
                          className="p-3 bg-white text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-500 border border-slate-100 hover:border-rose-100 transition-all shadow-sm"
                          title="Delete Book"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {books.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center opacity-20">
              <FaBookOpen size={60} className="mb-4" />
              <p className="font-black text-xl uppercase tracking-widest">Library Empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EBookManager;