import React from "react";
import MCQS_cart from "../Components/MCQS_cart";
import home from "../assets/home.png";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50/30 pb-10">
      <div className="max-w-7xl mx-auto px-4 pt-6 ">

        {/* --- 1. Hero & Banner Section --- */}
        <div className="w-full mb-8 px-2 md:px-0">
          <div className="relative overflow-hidden shadow-lg border-b-4 border-emerald-600 rounded-2xl md:rounded-[2rem] bg-white group">
            <img
              src={home}
              alt="Home Banner"
              className="w-full h-[120px] sm:h-[200px] md:h-[280px] lg:h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            <div className="absolute top-3 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-100 shadow-sm hidden md:block">
              <span className="text-emerald-700 font-black text-[9px] uppercase tracking-widest">
                Active Session 2026
              </span>
            </div>
          </div>
        </div>

        {/* --- 2. Premium Horizontal WhatsApp Banner --- */}
        <div className="max-w-5xl mx-auto mb-12">
          <a
            href="https://wa.me/03202786646"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center group"
          >
            <div className="absolute left-0 z-10 bg-white p-1 rounded-full shadow-lg transition-transform group-hover:scale-110 duration-300">
              <div className="bg-[#25D366] p-3 md:p-4 rounded-full flex items-center justify-center border-4 border-white">
                <FaWhatsapp className="text-white text-3xl md:text-5xl" />
              </div>
            </div>

            <div className="ml-8 md:ml-12 w-full bg-white border-2 border-emerald-500 rounded-r-[5rem] rounded-l-[3rem] shadow-xl overflow-hidden flex flex-col">
              <div className="pl-12 md:pl-20 pr-8 py-3 md:py-4 flex flex-wrap items-center gap-2">
                <span className="text-red-600 font-black italic text-lg md:text-2xl tracking-tighter uppercase">
                  Click Here To
                </span>
                <span className="text-slate-900 font-black text-lg md:text-2xl uppercase tracking-tighter">
                  Join Sir Sharey WhatsApp Group
                </span>
              </div>

              <div className="bg-black text-white pl-12 md:pl-20 pr-8 py-2 flex flex-wrap items-center gap-3">
                <div className="bg-white/10 px-3 py-0.5 rounded-full border border-white/20 flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-emerald-400">Whatsapp</span>
                  <FaWhatsapp className="text-emerald-400" size={14} />
                  <span className="font-mono font-bold text-sm md:text-lg">03119393978</span>
                </div>
                <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase italic">
                   Sir Sharey for preparation classes and jobs updates
                </span>
              </div>
            </div>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine pointer-events-none" />
          </a>
        </div>

        {/* --- 3. Urdu Info Section --- */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white border border-emerald-100 px-6 py-6 rounded-[2.5rem] shadow-xl flex flex-col md:flex-row-reverse items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                <span className="text-2xl font-bold animate-pulse">!</span>
              </div>
              <div className="flex-1 text-center md:text-right">
                <p dir="rtl" className="text-gray-800 text-lg md:text-2xl leading-[1.8] md:leading-[2] font-medium" style={{ fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" }}>
                  یہ وہ <span className="text-emerald-600 font-black underline decoration-emerald-200 decoration-4 underline-offset-8">ایم سی کیوز</span> ہیں جو پاسٹ پیپرز (گزشتہ پرچوں) سے لیے گئے ہیں اور ہر پیپر میں بار بار آنے والے <span className="text-blue-600 font-black">اہم ترین</span> ایم سی کیوز ہیں۔
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. Table / Links Section (3 Columns on Desktop) --- */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 text-center">
            <h2 className="text-white font-black text-xl md:text-2xl uppercase tracking-wide">
              Most Important and Repeated MCQS From Past Papers
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Pak Study (1000) MCQs", path: "/category/pak-study", color: "bg-green-500" },
                { name: "General Knowledge (1000) MCQs", path: "/category/General-Knowledge", color: "bg-yellow-500" },
                { name: "Everyday Science Important MCQs", path: "/category/Everyday-Science", icon: "▲" },
                { name: "Islamic Study (1000) MCQs", path: "/category/Islamic-Studies", icon: "◆", iconColor: "text-blue-600" },
                { name: "World Affairs (MCQs)", path: "/category/World-Current-Affairs", icon: "▲" },
                { name: "Computer Science Important (1000) MCQs", path: "/category/Computer-science", icon: "◆", iconColor: "text-blue-600" }
              ].map((item, index) => (
                <Link key={index} to={item.path} className="flex items-center justify-between p-3 border border-blue-100 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all group">
                  <div className="flex items-center gap-3">
                    {item.color ? (
                      <span className={`h-3 w-3 rounded-full flex-shrink-0 ${item.color}`}></span>
                    ) : (
                      <span className={`${item.iconColor || 'text-black'} ${item.icon === '◆' ? 'rotate-45 text-lg' : 'text-xs'}`}>{item.icon}</span>
                    )}
                    <span className="text-slate-700 font-bold text-sm md:text-[15px]">{item.name}</span>
                  </div>
                  <span className="text-blue-400 group-hover:translate-x-1 transition-transform">❯</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* --- 5. Category Header & Cart --- */}
        <div className="flex items-center justify-end gap-4 mb-8">
          <div className="h-[2px] flex-1 bg-emerald-100"></div>
          <span className="font-black uppercase tracking-widest text-xs px-6 py-2 rounded-full border border-emerald-200 bg-[#1565C0] text-white shadow-md">
            Explore Categories
          </span>
          <div className="h-[2px] w-[10%] bg-emerald-100"></div>
        </div>

        {/* Main MCQS Cart Section */}
        <MCQS_cart defaultSlug="pak-current-affairs" />
      </div>
    </div>
  );
}