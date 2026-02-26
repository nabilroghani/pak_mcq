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

          {/* --- 2. WhatsApp Section (Ab ye 35% jaga le ga) --- */}
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
                <FaWhatsapp size={20} />
                WHATSAPP GROUP
              </a>
            </div>
          </div>
        </div>

        {/* --- Quiz Mode Toggle --- */}
        <div className="flex justify-start mb-10">
          <button
            onClick={handleQuizSwitch}
            className="flex items-center gap-2 bg-[#1565C0] text-white px-6 py-2 rounded-xl text-sm font-black shadow-md transition-all active:scale-95 hover:bg-[#1254a1]"
          >
            <span>Switch to Quiz Mode</span>
          </button>
        </div>

        <div class="bg-gray-50/50 mb-5 p-2 px-8 rounded shadow-md  text-end mx-auto text-gray-700 text-base md:text-xl leading-relaxed">
          یہ وہ ایم سی کیوز ہیں جو پاسٹ پیپرز (گزشتہ پرچوں) سے لیے گئے ہیں اور
          ہر پیپر میں بار بار آنے والے اہم ترین ایم سی کیوز ہیں۔
        </div>

        {/* --- Table / Links Section --- */}
        <div className="mb-10 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <table className="w-full text-left   border-collapse">
            <thead>
              <tr className="bg-emerald-50">
                <th
                  colSpan="2"
                  className="p-4 text-emerald-900 font-black text-sm md:text-base uppercase tracking-tight"
                >
                  🔥 Past Papers & Most Important Repeated MCQs
                </th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base">
              <tr className="border-b border-emerald-50">
                <td className="p-4 hover:bg-emerald-50 transition-colors">
                  <Link
                    to="#"
                    className="text-slate-700 font-bold hover:text-emerald-600 flex items-center gap-2"
                  >
                    <span className="text-emerald-500">▶</span> Pak Study (1000)
                    MCQs
                  </Link>
                </td>
                <td className="p-4 hover:bg-emerald-50 transition-colors border-l border-emerald-50">
                  <Link
                    to="#"
                    className="text-slate-700 font-bold hover:text-emerald-600 flex items-center gap-2"
                  >
                    <span className="text-emerald-500">▶</span> Islamic Study
                    (1000) MCQs
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="p-4 hover:bg-emerald-50 transition-colors">
                  <Link
                    to="#"
                    className="text-slate-700 font-bold hover:text-emerald-600 flex items-center gap-2"
                  >
                    <span className="text-emerald-500">▶</span> General
                    Knowledge (1000) MCQs
                  </Link>
                </td>
                <td className="p-4 hover:bg-emerald-50 transition-colors border-l border-emerald-50">
                  <Link
                    to="#"
                    className="text-slate-700 font-bold hover:text-emerald-600 flex items-center gap-2"
                  >
                    <span className="text-emerald-500">▶</span> World Affairs
                    (1000) MCQs
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="p-4 hover:bg-emerald-50 transition-colors">
                  <Link
                    to="#"
                    className="text-slate-700 font-bold hover:text-emerald-600 flex items-center gap-2"
                  >
                    <span className="text-emerald-500">▶</span> General
                    Knowledge (MCQs)
                  </Link>
                </td>
                <td className="p-4 hover:bg-emerald-50 transition-colors border-l border-emerald-50">
                  <Link
                    to="#"
                    className="text-slate-700 font-bold hover:text-emerald-600 flex items-center gap-2"
                  >
                    <span className="text-emerald-500">▶</span> World Affairs
                    (MCQs)
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* --- Category Header --- */}
        <div className="flex items-center justify-end gap-4 mb-6 ">
          <div className="h-[2px] w-[90%] bg-emerald-100"></div>
          <span className=" w-70 font-black uppercase tracking-widest text-sm px-4 py-1 rounded-full border border-emerald-200 bg-[#1565C0] text-white">
            Explore Categories
          </span>
          <div className="h-[2px] w-[10%] bg-emerald-100"></div>
        </div>

        {/* --- MCQs List --- */}
        <MCQS_cart />
      </div>
    </div>
  );
}
