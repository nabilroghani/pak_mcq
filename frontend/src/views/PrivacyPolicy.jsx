"use client";

import React from 'react';
import { FaShieldAlt, FaLock, FaUserSecret, FaCookieBite, FaFileContract, FaEnvelope } from 'react-icons/fa';
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- Optimized Header Section: Reduced Height & Better Branding --- */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-black py-12 px-6 text-center relative overflow-hidden rounded-b-[3rem] shadow-xl">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-cyan-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-white/10">
            <FaShieldAlt className="text-cyan-400" /> Trusted Educational Resource
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
            Privacy <span className="text-cyan-500">Policy</span>
          </h1>
          <p className="text-blue-200/60 max-w-xl mx-auto font-medium text-sm">
            Last Updated: April 09, 2026. Hum aapki privacy aur data security ko hamesha pehli tarjih dete hain.
          </p>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 pb-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-8 md:p-14 border border-white">
          
          <div className="space-y-12">
            {/* 1. Introduction */}
            <section className="flex gap-6 flex-col md:flex-row items-start">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                <FaFileContract size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-blue-950 mb-3 uppercase tracking-tight">Introduction</h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Pak Learners (MCQs Portal) par aapka khush-amdeed. Hamari koshish hai ke hum aapko aik mehfooz educational platform faraham karein. Hamari website use karne ka matlab hai ke aap hamari policy aur data handling methods se poori tarah ittefaq karte hain.
                </p>
              </div>
            </section>

            {/* 2. Information Collection */}
            <section className="flex gap-6 flex-col md:flex-row items-start">
              <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center shrink-0 border border-cyan-100 shadow-sm">
                <FaUserSecret size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-blue-950 mb-3 uppercase tracking-tight">Data We Collect</h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">
                  Website experience behtar banane ke liye hum darj-zail malomat collect kar sakte hain:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Account Information', 'Quiz Performance Data', 'Device & IP Logs', 'Usage Statistics'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700 font-bold text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                      <div className="w-5 h-5 bg-cyan-500 text-white rounded-full flex items-center justify-center text-[10px]">✓</div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Security Check */}
            <section className="flex gap-6 flex-col md:flex-row items-start">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
                <FaLock size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-blue-950 mb-3 uppercase tracking-tight">Secure Handling</h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Hum aapke passwords aur personal records ko encrypt karke store karte hain. Hamara system latest security standards ko follow karta hai taake aapka educational record aur personal info leak na ho.
                </p>
              </div>
            </section>

            {/* 4. Cookies */}
            <section className="flex gap-6 flex-col md:flex-row items-start">
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
                <FaCookieBite size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-blue-950 mb-3 uppercase tracking-tight">Cookies Policy</h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Session management ke liye hum cookies use karte hain taake aapko baar baar login na karna paray. Isey aap browser settings se kisi bhi waqt control kar sakte hain.
                </p>
              </div>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Call to Action Footer */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-950 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black text-white mb-2">Koi Sawal Ya Masla?</h3>
                <p className="text-blue-300 font-medium text-sm">Hamari team privacy ke hawalay se aapki madad ke liye hazir hai.</p>
              </div>
              <Link 
                href="/contact" 
                className="flex items-center gap-3 bg-cyan-500 text-blue-950 px-10 py-4 rounded-2xl font-black hover:bg-white hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap"
              >
                <FaEnvelope /> CONTACT SUPPORT
              </Link>
            </div>
          </div>
        </div>

        {/* --- Footer Signature --- */}
        <p className="text-center text-slate-400 text-[10px] mt-12 font-black uppercase tracking-[0.4em]">
          © 2026 Pak Learners • Precision & Privacy in Learning
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;