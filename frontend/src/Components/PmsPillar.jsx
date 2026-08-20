"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaCheck, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { pmsFaqs } from "@/data/pmsFaqs";

const prepLinks = [
  { name: "CSS exam guide", path: "/government-exams/css" },
  { name: "PPSC exams", path: "/government-exams/ppsc" },
  { name: "KPPSC exams", path: "/government-exams/kppsc" },
  { name: "PPSC MCQs", path: "/mcqs/ppsc" },
  { name: "Past papers", path: "/past-papers" },
  { name: "Current affairs", path: "/current-affairs" },
];

export default function PmsPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "PMS" },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href="/government-exams"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All Government Exams
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Provincial Management Service
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            PMS Exam in Pakistan – Syllabus, Eligibility &amp; Preparation
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            PMS is the provincial competitive exam for administrative cadre posts, conducted by public
            service commissions such as PPSC and KPPSC. Learn about eligibility, exam pattern, compulsory
            subjects and how PMS compares to CSS.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/government-exams/ppsc"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              PPSC Guide <FaArrowRight size={11} />
            </Link>
            <Link
              href="/government-exams/kppsc"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              KPPSC Guide
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            PMS Preparation Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {prepLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 bg-slate-50 border border-slate-100 text-slate-800 hover:border-blue-200 hover:bg-blue-50/60 transition-all"
              >
                <span className="text-sm font-bold">{link.name}</span>
                <FaArrowRight size={11} className="text-slate-300 group-hover:text-[#1565C0] transition-all" />
              </Link>
            ))}
          </div>
        </div>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">What is PMS?</h2>
          <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            <p>
              PMS (Provincial Management Service) recruits officers into provincial administrative cadres
              through competitive written examinations and interviews. It is often described as the
              provincial counterpart to{" "}
              <Link href="/government-exams/css" className="font-bold text-[#1565C0] hover:underline">
                CSS
              </Link>
              , which serves federal civil service through FPSC.
            </p>
            <p>
              PMS is conducted by the relevant provincial commission — for example{" "}
              <Link href="/government-exams/ppsc" className="font-bold text-[#1565C0] hover:underline">
                PPSC
              </Link>{" "}
              in Punjab and{" "}
              <Link href="/government-exams/kppsc" className="font-bold text-[#1565C0] hover:underline">
                KPPSC
              </Link>{" "}
              in Khyber Pakhtunkhwa — with domicile and eligibility rules tied to the province.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">PMS Exam Pattern</h2>
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            {[
              "Written papers in compulsory subjects — typically English, Urdu, Islamic Studies, Pakistan Affairs and General Knowledge",
              "Optional subject papers chosen from the commission's approved list",
              "Interview stage for candidates who qualify the written examination",
              "Merit list and service allocation based on combined performance",
            ].map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">PMS Preparation Strategy</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            PMS requires sustained written preparation over several months. Build a schedule that covers
            compulsory subjects first, then optional papers, with regular essay and precis practice.
            Stay updated on provincial and national current affairs, and review past papers for your
            province&apos;s PMS cycle to understand topic trends.
          </p>
          <Link
            href="/study-resources/preparation-guides"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1565C0] hover:underline"
          >
            Preparation guides <FaArrowRight size={10} />
          </Link>
        </section>

        <section id="faq" className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">PMS Exam FAQs</h2>
          <div className="space-y-2">
            {pmsFaqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-slate-50 hover:bg-slate-100/80 transition-colors"
                    aria-expanded={open}
                  >
                    <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                    <FaChevronDown size={12} className={`text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="px-4 py-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
