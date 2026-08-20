"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaCheck, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { otsFaqs } from "@/data/otsFaqs";

const prepLinks = [
  { name: "NTS exam guide", path: "/government-exams/nts" },
  { name: "All MCQs", path: "/mcqs" },
  { name: "Past papers", path: "/past-papers" },
  { name: "Online tests", path: "/online-tests" },
  { name: "Current affairs", path: "/current-affairs" },
  { name: "Latest jobs", path: "/jobs" },
];

export default function OtsPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "OTS" },
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
            Open Testing Service
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            OTS Tests in Pakistan – Jobs, Syllabus &amp; MCQs Preparation
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            OTS (Open Testing Service) conducts recruitment and admission tests for government departments,
            universities and organizations across Pakistan. Most OTS tests use objective MCQs — this guide
            explains how they work and how to prepare effectively.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mcqs"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Practice MCQs <FaArrowRight size={11} />
            </Link>
            <Link
              href="/government-exams/nts"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              Compare with NTS
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            OTS Preparation Resources
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
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">What is OTS?</h2>
          <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            <p>
              OTS is a private testing organization that administers written tests on behalf of hiring
              bodies — similar in role to{" "}
              <Link href="/government-exams/nts" className="font-bold text-[#1565C0] hover:underline">
                NTS
              </Link>
              . Departments and institutions choose a testing service; the syllabus and eligibility always
              come from the specific job or admission advertisement, not from the testing service alone.
            </p>
            <p>
              Most OTS recruitment tests are objective MCQ papers covering general knowledge, Pakistan
              Affairs, current affairs, English and analytical reasoning, with additional content depending
              on the post.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Common OTS Test Types</h2>
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            {[
              "Government department recruitment tests",
              "University and college admission screening",
              "Teacher recruitment tests",
              "Health and technical department screening",
              "Banking and corporate recruitment (where OTS is engaged)",
            ].map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">How to Prepare for OTS Tests</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Read the full test advertisement first — syllabus, eligibility and pattern vary by hiring body.
            Build daily MCQs practice for general knowledge, English and current affairs, use timed mock
            tests in the final weeks, and cross-check registration details on OTS&apos;s official portal
            before paying any fee.
          </p>
        </section>

        <section id="faq" className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">OTS FAQs</h2>
          <div className="space-y-2">
            {otsFaqs.map((faq, i) => {
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
