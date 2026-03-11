import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlusCircle, FaCloudUploadAlt, FaTrashAlt, FaEdit, FaCheck } from 'react-icons/fa';

const EBookManager = () => {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', author: '', category: '', size: '', driveId: '', color: 'bg-emerald-500'
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books/all');
      if (res.data.success) setBooks(res.data.data);
    } catch (err) { console.error("Fetch Error:", err); }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingId 
      ? `http://localhost:5000/api/books/update/${editingId}` 
      : 'http://localhost:5000/api/books/add';

    try {
      const res = await axios({
        method: editingId ? 'put' : 'post',
        url: url,
        data: formData,
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setMessage({ type: 'success', text: editingId ? 'Book updated!' : 'Book added!' });
        setFormData({ title: '', author: '', category: '', size: '', driveId: '', color: 'bg-emerald-500' });
        setEditingId(null);
        fetchBooks();
      }
    } catch (err) { setMessage({ type: 'error', text: 'Operation failed!' }); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book permanently?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/books/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBooks();
      } catch (err) { alert("Delete failed!"); }
    }
  };

  const startEdit = (book) => {
    setEditingId(book._id);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      size: book.size,
      driveId: book.driveId,
      color: book.color
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen pb-24">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-[2.5rem] shadow-xl mb-10 border border-slate-100">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
          {editingId ? <FaEdit className="text-orange-500"/> : <FaCloudUploadAlt className="text-cyan-500"/>}
          {editingId ? "Update Book Details" : "Add New E-Book"}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Book Title" className="bg-slate-50 p-4 rounded-2xl outline-none font-bold" required />
          <input name="author" value={formData.author} onChange={handleChange} placeholder="Author Name" className="bg-slate-50 p-4 rounded-2xl outline-none font-bold" required />
          
          {/* Simple String Category Input */}
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category (e.g. CSS, PPSC)" className="bg-slate-50 p-4 rounded-2xl outline-none font-bold" required />
          
          <input name="driveId" value={formData.driveId} onChange={handleChange} placeholder="Google Drive ID" className="bg-slate-50 p-4 rounded-2xl outline-none font-bold text-cyan-600" required />
          
          <button type="submit" className={`md:col-span-2 py-4 rounded-2xl font-black text-white transition-all flex items-center justify-center gap-2 ${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-slate-900 hover:bg-cyan-600'}`}>
            {editingId ? <><FaCheck/> UPDATE BOOK</> : <><FaPlusCircle/> ADD TO LIBRARY</>}
          </button>
          
          {editingId && (
            <button type="button" onClick={() => {setEditingId(null); setFormData({title:'', author:'', category:'', size:'', driveId:'', color:'bg-emerald-500'})}} className="md:col-span-2 text-slate-400 font-bold hover:underline">
              Cancel Editing
            </button>
          )}
        </form>
      </div>

      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl font-black text-slate-800 mb-6">Inventory Management</h3>
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider">
              <tr>
                <th className="p-5">Book Info</th>
                <th className="p-5">Category</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-slate-50 transition-all">
                  <td className="p-5">
                    <div className="font-bold text-slate-900">{book.title}</div>
                    <div className="text-xs text-slate-400 font-medium">{book.author}</div>
                  </td>
                  <td className="p-5">
                    <span className="bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{book.category}</span>
                  </td>
                  <td className="p-5 flex justify-center gap-3">
                    <button onClick={() => startEdit(book)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><FaEdit/></button>
                    <button onClick={() => handleDelete(book._id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><FaTrashAlt/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EBookManager;