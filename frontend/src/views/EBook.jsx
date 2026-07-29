"use client";

import React, { useState, useEffect } from 'react';
import { FaDownload, FaBookOpen, FaSearch, FaFilePdf, FaGraduationCap, FaBookmark } from 'react-icons/fa';
import api from '../utils/api';

const EBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get('/books/all');
        if (res.data.success) {
          setBooks(res.data.data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Google Drive Direct Download Link Logic
  const handleDownload = (driveId) => {
    if (!driveId) return alert("Download link not found!");
    const directLink = `https://drive.google.com/uc?export=download&id=${driveId}`;
    window.open(directLink, '_blank');
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* --- Header Section --- */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 py-16 px-6 relative overflow-hidden rounded-b-[3rem]">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Digital <span className="text-cyan-400">Library</span>
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-10 relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for books or categories..." 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white rounded-2xl py-4 pl-14 pr-6 text-slate-900 shadow-2xl outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* --- Books Grid --- */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <div key={book._id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              
              <div className={`${book.color || 'bg-cyan-500'} h-48 flex items-center justify-center relative overflow-hidden`}>
                <FaFilePdf className="text-white/30 text-8xl absolute -bottom-4 -right-4 rotate-12" />
                <FaBookOpen className="text-white text-4xl relative z-10" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <span className="text-[10px] font-black text-cyan-600 bg-cyan-50 px-2 py-1 rounded uppercase w-fit mb-2">
                  {book.category}
                </span>
                <h3 className="text-lg font-black text-slate-900 mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-slate-500 text-xs font-bold mb-4 italic">By {book.author}</p>
                
                <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-slate-400 text-xs font-bold">{book.size || "PDF"}</span>
                  <button 
                    onClick={() => handleDownload(book.driveId)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-cyan-500 transition-all shadow-lg shadow-slate-200"
                  >
                    <FaDownload /> DOWNLOAD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-bold">No books found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default EBooks;