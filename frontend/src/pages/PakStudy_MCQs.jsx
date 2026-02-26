import React from "react";
import MCQs_cart_RightSide from "../Components/MCQs_cart_RightSide";
import MCQs_Cart_leftSide from "../Components/MCQs_Cart_leftSide";

export default function PakStudy_MCQs() {
  const menuItems = [
    "1. Pakistan Current Affairs",
    "2. Pakistan History",
    "3. Pakistan General Knowledge",
    "4. Defence & Armed Forces",
    "5. IMP Days of Pakistan",
    "6. Mountains and Glaciers",
    "7. Natural Resources",
    "8. Culture of Pakistan",
    "9. Industrial Development",
    "10. Punjab",
    "11. Khyber Pakhtoon Khawah",
    "12. Sindh",
    "13. Balochistan",
    "14. ICT FATA AND AJK",
    "15. Gilgit Baltistan",
    "16. Land & Climate",
    "17. Education in Pakistan",
    "18. Miscellaneous",
  ];

  return (
    <div className="min-h-screen pb-12">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2.5fr_1.25fr] gap-5 items-start px-4 pt-8">
        {/* ================= LEFT SIDE ================= */}
        <div className="rounded-3xl p-4 md:p-8  ">
          <h1 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-6 tracking-tight">
            Pak Study <span className="text-cyan-600">MCQs</span>
          </h1>

          {/* Hero Image with Border styling */}
          <div className="overflow-hidden rounded-2xl mb-8 border-b-4 border-cyan-500 shadow-xl">
            <img
              src="https://pakmcqs.com/wp-content/uploads/2017/10/PAKISTAN-STUDIES-MCQS-PakMcqs.com_.jpg.webp"
              alt="Pak study MCQs"
              className="w-full h-64 md:h-[400px] object-cover hover:scale-105 transition duration-700"
            />
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-10 text-lg">
            Pak Study MCQs, Get complete MCQs of Pakistan Studies for{" "}
            <span className="font-bold text-gray-800">
              NTS, FPSC, PPSC, SPSC, CSS, PMS
            </span>{" "}
            Test Preparation. Find basic information about Pakistan and
            different categories related to PakStudy MCQs for 2026.
          </p>

          {/* Menu Section - Refined Design */}
          <div className="bg-[#f8fafc] p-6 md:p-10 rounded-3xl border border-gray-200 mb-10">
            <h2 className="text-2xl font-black text-gray-800 mb-8 text-center uppercase tracking-tighter">
              Pakistan Studies <span className="text-cyan-600">Menu</span>
            </h2>

            {/* Featured Highlight Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button className="bg-white border-2 border-cyan-100 p-4 rounded-xl text-cyan-700 font-bold hover:bg-cyan-600 hover:text-white transition-all shadow-sm">
                🔥 1000 Most Repeated Pak-Study MCQS
              </button>
              <button className="bg-white border-2 border-emerald-100 p-4 rounded-xl text-emerald-700 font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                ⭐ 2000 Import Pak Study MCQS 2026
              </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-white border border-gray-100 rounded-xl hover:border-cyan-400 hover:shadow-md cursor-pointer transition-all group"
                >
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-cyan-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Badge */}
          <div className="bg-cyan-600 p-4 inline-flex items-center rounded-xl mb-8 shadow-lg shadow-cyan-200">
            <p className="text-white font-black text-sm tracking-widest uppercase">
              🚀 Online Quiz Test Mode Available
            </p>
          </div>

          {/* Submit Link */}
          <div className="flex flex-wrap items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 mb-10">
            <p className="text-emerald-900 font-medium">Have new MCQs?</p>
            <button className="font-black text-emerald-700 underline hover:text-emerald-900 transition">
              SUBMIT HERE
            </button>
          </div>

          {/* MCQs List Section */}
          <div className="mt-10 pt-10 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Latest Pak Study Questions:
            </h3>
            <MCQs_Cart_leftSide className="w-full" />
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="sticky top-24">
          <MCQs_cart_RightSide className="mt-23" />
        </div>
      </div>
    </div>
  );
}
