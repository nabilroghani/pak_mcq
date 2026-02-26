import React from 'react';
import { FaDownload, FaBookOpen, FaSearch, FaFilePdf, FaGraduationCap, FaBookmark } from 'react-icons/fa';

const EBooks = () => {
  const books = [
    {
      id: 1,
      title: "Pakistan Affairs 2026",
      author: "Pak Learners Team",
      category: "CSS/PMS",
      size: "4.5 MB",
      color: "bg-emerald-500"
    },
    {
      id: 2,
      title: "Islamic Studies Guide",
      author: "Prof. Ahmed",
      category: "General Prep",
      size: "3.2 MB",
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "10,000 Repeated MCQs",
      author: "Exam Expert",
      category: "PPSC/FPSC",
      size: "12.8 MB",
      color: "bg-cyan-500"
    },
    {
      id: 4,
      title: "Daily Current Affairs",
      author: "News Desk",
      category: "Monthly Digest",
      size: "1.5 MB",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* --- Header Section --- */}
      <div className="bg-gradient-to-r from-blue-900 rounded-2xl to-blue-950 py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
            <FaGraduationCap className="text-cyan-400" />
            <span className="text-white text-xs font-black uppercase tracking-widest">Digital Library</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Download <span className="text-cyan-400">E-Books</span>
          </h1>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-sm md:text-lg">
            High-quality PDF books aur notes download karein jo aapki preparation ko mazeed behtar banayenge.
          </p>

          {/* Search Bar inside Header */}
          <div className="max-w-2xl mx-auto mt-10 relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for books, notes or authors..." 
              className="w-full bg-white rounded-2xl py-4 pl-14 pr-6 text-slate-900 shadow-2xl outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        
        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-4 pb-6 no-scrollbar">
          {['All Books', 'CSS Notes', 'PPSC Guides', 'Islamic', 'Current Affairs'].map((cat, i) => (
            <button key={i} className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-cyan-500 hover:text-cyan-500 transition-all shadow-sm">
              {cat}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {books.map((book) => (
            <div key={book.id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              
              {/* Book Cover Placeholder */}
              <div className={`${book.color} h-48 flex items-center justify-center relative overflow-hidden`}>
                <FaFilePdf className="text-white/30 text-8xl absolute -bottom-4 -right-4 rotate-12" />
                <div className="relative z-10 flex flex-col items-center">
                   <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 mb-2">
                      <FaBookOpen className="text-white text-3xl" />
                   </div>
                   <span className="text-white/80 text-[10px] font-black uppercase tracking-widest">PDF Document</span>
                </div>
              </div>

              {/* Book Details */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-cyan-600 bg-cyan-50 px-2 py-1 rounded uppercase">
                    {book.category}
                  </span>
                  <FaBookmark className="text-slate-200 hover:text-cyan-500 cursor-pointer transition-colors" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1 group-hover:text-blue-900 transition-colors">
                  {book.title}
                </h3>
                <p className="text-slate-500 text-xs font-bold mb-4">By {book.author}</p>
                
                <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-slate-400 text-xs font-bold">{book.size}</span>
                  <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-cyan-500 transition-all active:scale-95 shadow-lg shadow-slate-200">
                    <FaDownload /> DOWNLOAD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Empty State / Note --- */}
        <div className="mt-20 bg-cyan-50 rounded-[2.5rem] p-8 md:p-12 text-center border-2 border-dashed border-cyan-200">
          <h2 className="text-2xl font-black text-cyan-900 mb-4">Request a Book</h2>
          <p className="text-cyan-700 max-w-xl mx-auto font-medium mb-8">
            Agar aapko koi khas book ya notes chahiye jo yahan maujood nahi, toh humein batayein. Hum jald az jald usay upload kar denge.
          </p>
          <button className="bg-cyan-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-cyan-700 transition-all shadow-xl shadow-cyan-200">
            WHATSAPP REQUEST
          </button>
        </div>
      </div>
    </div>
  );
};

export default EBooks;