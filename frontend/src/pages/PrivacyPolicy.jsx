import React from 'react';
import { FaShieldAlt, FaLock, FaUserSecret, FaCookieBite, FaFileContract, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 ">
      {/* --- Header Section --- */}
      <div className="bg-blue-950 py-20 px-6 text-center relative overflow-hidden rounded-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 border border-cyan-500/30">
            <FaShieldAlt /> Trusted & Secure
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            Privacy <span className="text-cyan-500">Policy</span>
          </h1>
          <p className="text-blue-200/70 max-w-2xl mx-auto font-medium">
            Last Updated: February 18, 2026. Hum aapki privacy ki hifazat ke liye committed hain.
          </p>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 pb-24">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 p-8 md:p-12 border border-slate-100">
          
          <div className="space-y-12">
            {/* 1. Introduction */}
            <section className="flex gap-6 flex-col md:flex-row">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <FaFileContract size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-blue-950 mb-4 uppercase tracking-tight">Introduction</h2>
                <p className="text-slate-600 leading-relaxed">
                  Pak Learners par aapka khush-amdeed. Hum aapki personal information ko kaise collect aur use karte hain, ye page uski mukammal tafseel faraham karta hai. Hamari website use karne ka matlab hai ke aap hamari policy se ittefaq karte hain.
                </p>
              </div>
            </section>

            {/* 2. Information Collection */}
            <section className="flex gap-6 flex-col md:flex-row">
              <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center shrink-0">
                <FaUserSecret size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-blue-950 mb-4 uppercase tracking-tight">Information We Collect</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Jab aap hamari site visit karte hain ya quiz attempt karte hain, toh hum darj-zail malomat le sakte hain:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Name & Email Address', 'Device Information', 'IP Address', 'Browser Type', 'Quiz Scores', 'Usage Patterns'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 font-bold text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-cyan-500">✔</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 3. Security */}
            <section className="flex gap-6 flex-col md:flex-row">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                <FaLock size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-blue-950 mb-4 uppercase tracking-tight">Data Security</h2>
                <p className="text-slate-600 leading-relaxed">
                  Hum aapke data ko mehfooz rakhne ke liye modern encryption aur SSL certificates ka istemal karte hain. Aapka data kisi bhi teesre fariq (third party) ko becha nahi jata.
                </p>
              </div>
            </section>

            {/* 4. Cookies */}
            <section className="flex gap-6 flex-col md:flex-row">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                <FaCookieBite size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-blue-950 mb-4 uppercase tracking-tight">Cookies Policy</h2>
                <p className="text-slate-600 leading-relaxed">
                  Behtar experience ke liye hum cookies use karte hain taake aapki preferences ko yaad rakha ja sake. Aap apne browser ki settings se cookies ko disable bhi kar sakte hain.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* Contact Footer */}
            <div className="bg-blue-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-100">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-black text-blue-900">Koi Sawal Hai?</h3>
                <p className="text-blue-700 font-medium">Agar aapko koi confusion hai toh rabta karein.</p>
              </div>
              <a href="mailto:support@paklearners.com" className="flex items-center gap-3 bg-blue-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-cyan-600 transition-all shadow-lg shadow-blue-200 active:scale-95">
                <FaEnvelope /> CONTACT US
              </a>
            </div>
          </div>
        </div>

        {/* --- Small Print --- */}
        <p className="text-center text-slate-400 text-xs mt-12 font-bold uppercase tracking-widest">
          © 2026 Pak Learners MCQs Portal. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;