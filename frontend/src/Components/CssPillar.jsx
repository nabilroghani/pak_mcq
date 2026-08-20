"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaCheck, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { cssFaqs } from "@/data/cssFaqs";

const prepLinks = [
  { name: "FPSC exam guide", path: "/government-exams/fpsc" },
  { name: "PMS preparation", path: "/government-exams/pms" },
  { name: "FPSC MCQs", path: "/mcqs/fpsc" },
  { name: "Past papers", path: "/past-papers/fpsc" },
  { name: "Current affairs", path: "/current-affairs" },
  { name: "Study resources", path: "/study-resources" },
];

export default function CssPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "CSS" },
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
            Central Superior Services · FPSC
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            CSS Exam in Pakistan – Syllabus, Eligibility &amp; Preparation Guide
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            CSS is Pakistan&apos;s premier federal competitive exam, recruiting officers into senior civil
            service groups through FPSC. This guide covers eligibility, compulsory and optional subjects,
            exam stages and how to build a long-term preparation plan.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/government-exams/fpsc"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              FPSC Complete Guide <FaArrowRight size={11} />
            </Link>
            <Link
              href="/past-papers/fpsc"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              FPSC Past Papers
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            CSS Preparation Resources
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
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">What is the CSS Exam?</h2>
          <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            <p>
              CSS (Central Superior Services) is conducted by{" "}
              <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">
                FPSC
              </Link>{" "}
              to recruit officers into Pakistan&apos;s senior federal civil service groups. Successful
              candidates may join services such as the Foreign Service, Police Service, and Administrative
              Service, among others defined in each year&apos;s advertisement.
            </p>
            <p>
              Unlike MCQ-heavy provincial tests, CSS is primarily a written examination covering
              compulsory and optional subjects, followed by a psychological assessment and interview for
              candidates who qualify the written stage.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">CSS Exam Stages</h2>
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            {[
              "Written examination — compulsory papers plus chosen optional subjects",
              "Medical examination — for candidates who qualify written stage",
              "Psychological assessment — evaluates aptitude and personality traits",
              "Viva voce (interview) — panel assessment of subject knowledge and suitability",
              "Final merit — combined written and interview marks determine allocation to service groups",
            ].map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">CSS Compulsory Subjects</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Every CSS candidate sits compulsory papers regardless of optional subject choices:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "English Essay",
              "English (Precis & Composition)",
              "General Science & Ability",
              "Current Affairs",
              "Pakistan Affairs",
              "Islamic Studies or Comparative Religion",
            ].map((subject) => (
              <div key={subject} className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-sm font-bold text-slate-800">
                {subject}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">CSS vs PMS</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            CSS recruits for federal civil service through FPSC, while{" "}
            <Link href="/government-exams/pms" className="font-bold text-[#1565C0] hover:underline">
              PMS
            </Link>{" "}
            is the provincial equivalent through commissions like PPSC and KPPSC. Both require long-term
            written preparation, but serve different jurisdictions and career paths. Choose based on your
            domicile, career goals and the service structure you want to enter.
          </p>
        </section>

        <section id="faq" className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">CSS Exam FAQs</h2>
          <div className="space-y-2">
            {cssFaqs.map((faq, i) => {
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
