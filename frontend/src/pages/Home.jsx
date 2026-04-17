import React from "react";
import MCQS_cart from "../Components/MCQS_cart";
import home from "../assets/home1.png";
import fonts from "../assets/fonts.png"
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import whatsapp from "../assets/whatsapp.webp"
import WhatsappBtn from "../Components/WhatsappBtn";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50/30 pb-10">
      <div className="max-w-7xl mx-auto px-0 pt-0">

        {/* --- 1. Hero & Banner Section --- */}
        <div className="w-full mb-8 px-0 md:px-0"> {/* Mobile par padding khatam kar di */}
          <div className="relative overflow-hidden shadow-lg border-b-4 border-emerald-600 rounded-none md:rounded-[2rem] bg-white group">
            {/* rounded-none mobile par edge-to-edge look dega, md par rounded wapis aa jayega */}
            <img
              src={home}
              alt="Home Banner"
              className="w-full h-auto min-h-[140px] aspect-[16/7] sm:h-[200px] md:h-[280px] lg:h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
            // aspect-ratio mobile par image ko dabne nahi dega
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

            <div className="absolute top-3 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-100 shadow-sm hidden md:block">
              <span className="text-emerald-700 font-black text-[9px] uppercase tracking-widest">
                Active Session 2026
              </span>
            </div>
          </div>
        </div>

      {<WhatsappBtn/>}
      </div>
      <div className="max-w-6xl mx-auto mb-12 px-2 md:px-6">
        {/* --- 2. PROFESSIONAL URDU INFO BANNER (Using Image Instead of Text) --- */}
        {/* hidden lagane se mobile par gayab ho jayega, md:block se desktop par wapis aa jayega */}
        <div className="hidden md:block max-w-6xl mx-auto mb-12 px-2 md:px-0">
          <div className="bg-white border-y-4 border-emerald-500 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl md:rounded-[2.5rem] overflow-hidden relative">

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-full bg-emerald-500/5 -skew-x-12"></div>
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>

            <div className="relative px-4 py-4 md:px-10 md:py-6 flex flex-col md:flex-row-reverse items-center justify-between gap-6">

              {/* URDU IMAGE SECTION */}
              <div className="flex-1 flex justify-center md:justify-end">
                <img
                  src={fonts}
                  alt="Urdu Information"
                  className="w-full max-w-[800px] h-auto object-contain transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>

              {/* SIDE BADGES */}
              <div className="flex flex-row md:flex-col gap-2 shrink-0">
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-xl text-[10px] md:text-xs font-black uppercase shadow-sm border border-yellow-500/20 text-center">
                  Most Repeated
                </div>
                <div className="bg-blue-950 text-white px-4 py-2 rounded-xl text-[10px] md:text-xs font-black uppercase shadow-sm text-center">
                  Pak Learners
                </div>
              </div>

            </div>

            {/* Bottom Multi-Color Border */}
            <div className="h-1.5 w-full bg-gray-100 flex">
              <div className="h-full w-1/4 bg-red-500"></div>
              <div className="h-full w-1/4 bg-emerald-500"></div>
              <div className="h-full w-1/4 bg-yellow-400"></div>
              <div className="h-full w-1/4 bg-blue-600"></div>
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
                { name: "Pak Study (1000) MCQs", path: "/category/pak-study" },
                { name: "General Knowledge (1000) MCQs", path: "/category/General-Knowledge" },
                { name: "Everyday Science Important MCQs", path: "/category/Everyday-Science" },
                { name: "Islamic Study (1000) MCQs", path: "/category/Islamic-Studies" },
                { name: "Pak & World Affairs (1000) MCQs", path: "/category/World-Current-Affairs" },
                { name: "Computer Science Important (1000) MCQs", path: "/category/Computer-science" }
              ].map((item, index) => {

                // Pattern Logic: 
                // index 0, 3 (1st & 4th) -> Green
                // index 1, 4 (2nd & 5th) -> Orange
                // index 2, 5 (3rd & 6th) -> Blue
                const colors = ["bg-emerald-500", "bg-orange-500", "bg-blue-600"];
                const dotColor = colors[index % 3];

                return (
                  <Link
                    key={index}
                    to={item.path}
                    className="flex items-center justify-between p-3 border-2 border-slate-50 rounded-full hover:bg-blue-50 hover:border-blue-400 hover:shadow-md transition-all group bg-white"
                  >
                    <div className="flex items-center gap-3">
                      {/* Dynamic Dot based on your 1-4, 2-5, 3-6 rule */}
                      <span className={`h-3 w-3 rounded-full flex-shrink-0 ${dotColor} shadow-sm`}></span>

                      <span className="text-slate-700 font-bold text-sm md:text-[15px] group-hover:text-blue-700 transition-colors">
                        {item.name}
                      </span>
                    </div>

                    <div className="bg-slate-50 group-hover:bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center transition-all">
                      <span className="text-blue-400 group-hover:text-white text-[10px] transition-transform group-hover:translate-x-0.5">❯</span>
                    </div>
                  </Link>
                );
              })}
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