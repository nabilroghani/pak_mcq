import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LuMail, LuTrash2, LuUser, LuPhone, LuCalendar } from "react-icons/lu";
import api from '../../utils/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Backend se messages fetch karna
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contacts/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Message Delete karne ka function
  const deleteMessage = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Ye message hamesha ke liye delete ho jayega!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/contacts/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Deleted!', 'Message delete ho gaya.', 'success');
        fetchMessages(); // List refresh karein
      } catch (err) {
        Swal.fire('Error', 'Delete nahi ho saka.', 'error');
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-blue-950 uppercase tracking-tight">User Messages</h1>
          <p className="text-gray-500">Contact form se aaye huay tamam inquiries yahan hain.</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64 italic text-gray-400">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-gray-100">
            <LuMail size={48} className="mx-auto mb-4 text-gray-200" />
            <p className="text-gray-500 font-bold">Koi naya message nahi mila.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-950 text-white uppercase text-[10px] tracking-widest">
                  <th className="p-5 font-black">User Info</th>
                  <th className="p-5 font-black">Subject & Message</th>
                  <th className="p-5 font-black">Date</th>
                  <th className="p-5 font-black text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {messages.map((msg) => (
                  <tr key={msg._id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-blue-950 flex items-center gap-2"><LuUser size={14} className="text-cyan-500"/> {msg.name}</span>
                        <span className="text-xs text-gray-500">{msg.email}</span>
                        <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 mt-1"><LuPhone size={10}/> {msg.phone || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="p-5 max-w-md">
                      <p className="font-black text-xs uppercase text-cyan-600 mb-1">{msg.subject || 'General Inquiry'}</p>
                      <p className="text-sm text-gray-600 leading-relaxed italic">"{msg.message}"</p>
                    </td>
                    <td className="p-5">
                      <span className="text-xs font-bold text-gray-400 flex items-center gap-2">
                        <LuCalendar size={14}/> {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <button 
                        onClick={() => deleteMessage(msg._id)}
                        className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <LuTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;