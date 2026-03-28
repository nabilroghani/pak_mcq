import React from "react";
import MCQS_cart from "../Components/MCQS_cart";
import home from "../assets/home.png";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Home() {
  const navigate = useNavigate();

  const handleQuizSwitch = () => {
    navigate('/quiz/general');
  };

  return (
    <div className="min-h-screen bg-gray-50/30 pb-10">
      {/* Container to align everything with MCQs width */}
      <div className="max-w-7xl mx-auto px-4 pt-6 ">
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-stretch">
          <div className="w-full lg:w-[70%] overflow-hidden shadow-lg border-b-4 border-emerald-600 rounded-xl bg-white flex">
            <img
              src={home}
              alt="Home Banner"
              className="w-full h-[250px] lg:h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* --- 2. WhatsApp Section --- */}
          <div className="w-full lg:w-[35%] bg-white border-b-4 border-emerald-800 p-6 md:p-8 rounded-xl shadow-xl flex flex-col justify-center">
            <div className="text-center lg:text-left mb-6">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-tight uppercase">
                Join Our <br />
                <span className="text-emerald-600">Study Group</span>
              </h2>
              <p className="text-slate-500 font-bold text-xs mt-2">
                Get daily updates, PDFs, and new MCQs.
              </p>
            </div>

            {/* WhatsApp Button */}
            <div className="flex justify-center lg:justify-start">
              <a
                href="https://wa.me/YOUR_NUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#10b981] text-white px-4 py-4 rounded-2xl font-black text-xs md:text-sm shadow-lg transition-all active:scale-95 border-b-4 border-[#064e3b]"
              >
                < FaWhatsapp size={20} />
                WHATSAPP GROUP
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-50/50 mb-5 p-2 px-8 rounded shadow-md  text-end mx-auto text-gray-700 text-base md:text-xl leading-relaxed">
          یہ وہ ایم سی کیوز ہیں جو پاسٹ پیپرز (گزشتہ پرچوں) سے لیے گئے ہیں اور
          ہر پیپر میں بار بار آنے والے اہم ترین ایم سی کیوز ہیں۔
        </div>

        {/* --- Table / Links Section --- */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-md">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-5 text-center">
            <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-wide">
              Most Important and Repeated MCQS From Past Papers
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Pak Study Link */}
              <Link
                to="/category/pak-study"
                className="flex items-center justify-between p-4 border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full bg-green-500"></span>
                  <span className="text-slate-700 font-bold text-lg">Pak Study (1000) MCQs</span>
                </div>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">❯</span>
              </Link>

              {/* general knowledge */}
              <Link
                to="/category/General-Knowledge"
                className="flex items-center justify-between p-4 border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 bg-yellow-500"></span>
                  <span className="text-slate-700 font-bold text-lg">General Knowledge (1000) MCQs</span>
                </div>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">❯</span>
              </Link>

              {/* everyday science Link */}
              <Link
                to="/category/Everyday-Science"
                className="flex items-center justify-between p-4 border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-black text-xs">▲</span>
                  <span className="text-slate-700 font-bold text-lg">Everyday Science Important MCQs</span>
                </div>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">❯</span>
              </Link>

              {/* Islamic Study Link */}
              <Link
                to="/category/Islamic-Studies"
                className="flex items-center justify-between p-4 border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-600 rotate-45 text-lg">◆</span>
                  <span className="text-slate-700 font-bold text-lg">Islamic Study (1000) MCQs</span>
                </div>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">❯</span>
              </Link>

              {/* World Affairs mcqs */}
              <Link
                to="/category/World-Current-Affairs"
                className="flex items-center justify-between p-4 border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-black text-xs">▲</span>
                  <span className="text-slate-700 font-bold text-lg">World Affairs (MCQs)</span>
                </div>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">❯</span>
              </Link>

              {/* computer science */}
              <Link
                to="/category/Computer-science"
                className="flex items-center justify-between p-4 border-2 border-blue-300 rounded-full hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-600 rotate-45 text-lg">◆</span>
                  <span className="text-slate-700 font-bold text-lg">Computer Science Important (1000) MCQs</span>
                </div>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">❯</span>
              </Link>

            </div>
          </div>
        </div>

        {/* --- Category Header --- */}
        <div className="flex items-center justify-end gap-4 mb-6 ">
          <div className="h-[2px] w-[90%] bg-emerald-100"></div>
          <span className=" w-70 font-black uppercase tracking-widest text-sm px-4 py-1 rounded-full border border-emerald-200 bg-[#1565C0] text-white">
            Explore Categories
          </span>
          <div className="h-[2px] w-[10%] bg-emerald-100"></div>
        </div>

        {/* --- MCQs List: Added defaultSlug here --- */}
        <MCQS_cart defaultSlug="pak-current-affairs" />
      </div>
    </div>
  );
}