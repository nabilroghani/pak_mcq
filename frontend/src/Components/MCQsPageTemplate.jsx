import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit, FaPlayCircle } from "react-icons/fa";
import MCQs_cart_RightSide from "../Components/MCQs_cart_RightSide";
 
const MCQsPageTemplate = ({
  title,
  titleHighlighted,
  bannerImg,
  description,
  categories = [],
  mcqsData = [],
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50/50">
      {/* Grid: left + right */}
      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.2fr] gap-8 items-start">
        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-8">
          {/* Banner Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative h-64 md:h-80 group">
              <img
                src={bannerImg}
                alt={title}
                className="w-full h-full object-contain bg-slate-900 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex items-end p-8">
                <h1 className="text-white text-3xl md:text-4xl font-black italic tracking-tighter uppercase">
                  {title}{" "}
                  <span className="text-cyan-400 underline decoration-2 underline-offset-8">
                    {titleHighlighted}
                  </span>{" "}
                  MCQS
                </h1>
              </div>
            </div>

            {/* Intro & Categories */}
            <div className="p-6 md:p-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-cyan-500 pl-4 bg-cyan-50/30 py-4 rounded-r-xl">
                {description}
              </p>

              {/* Categories */}
              {categories.length > 0 && (
                <div className="overflow-hidden rounded-2xl border border-gray-100 mb-10">
                  <div className="bg-blue-950 text-white px-6 py-4 font-black text-sm uppercase tracking-widest">
                    Quick Category Links
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
                    {categories.map((cat, i) => (
                      <Link
                        key={i}
                        to="#"
                        className="p-4 border-b border-r border-gray-50 hover:bg-cyan-50 hover:text-cyan-600 transition-colors flex items-center gap-2 font-semibold text-gray-700"
                      >
                        <span className="text-cyan-500 text-xs">❇️</span> {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 p-6 rounded-2xl shadow-lg border-b-4 border-cyan-500">
                <div className="text-center md:text-left">
                  <h3 className="text-white font-black text-xl mb-1 uppercase">
                    Practice Mode
                  </h3>
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
                    Start Quiz to simulate real exam
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    className="bg-white hover:bg-gray-100 text-blue-950 px-6 py-3 rounded-xl font-black text-xs uppercase flex items-center gap-2 transition-all active:scale-95 shadow-md"
                    onClick={() => navigate("/submit")}
                  >
                    <FaRegEdit /> Submit MCQS
                  </button>
                  <button className="bg-cyan-500 hover:bg-cyan-400 text-blue-950 px-8 py-3 rounded-xl font-black text-xs uppercase flex items-center gap-2 transition-all active:scale-95 shadow-md">
                    <FaPlayCircle size={18} /> Start Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MCQs List */}
          <div className="space-y-6">
            {mcqsData.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden hover:border-cyan-200 transition-all"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-blue-950 text-white px-4 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase">
                      MCQ #{index + 1}
                    </span>
                    <span className="text-cyan-600 text-[10px] font-black uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-lg">
                      {item.category}
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-blue-950 leading-snug mb-8">
                    {item.question}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className="group flex items-center p-4 bg-gray-50 border-2 border-transparent hover:border-cyan-500 hover:bg-cyan-50 rounded-xl transition-all cursor-pointer"
                      >
                        <span className="w-8 h-8 flex items-center justify-center bg-white text-blue-950 border border-gray-200 rounded-lg font-black text-xs mr-4 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <p className="text-gray-700 font-bold text-sm">
                          {option}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-gray-50/80 py-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] hover:text-cyan-600 transition-all border-t">
                  Reveal Correct Answer
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <MCQs_cart_RightSide />
      </div>
    </div>
  );
};

export default MCQsPageTemplate;
