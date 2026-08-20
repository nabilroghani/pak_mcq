"use client";

import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { kppscSubPageList } from "@/data/kppscSubPages";

export default function KppscSubPillar({ page }) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC", path: "/government-exams/kppsc" },
    { name: page.title },
  ];

  const otherTopics = kppscSubPageList.filter((p) => p.slug !== page.slug);

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-10 md:py-14 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href="/government-exams/kppsc"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-3"
          >
            <FaArrowLeft size={10} /> KPPSC Exam Guide
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            {page.headline}
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed">
            {page.intro}
          </p>
          {page.primaryCta && (
            <Link
              href={page.primaryCta.path}
              className="inline-flex items-center gap-2 mt-6 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              {page.primaryCta.label} <FaArrowRight size={11} />
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-6 pb-16 space-y-8">
        {page.sections.map((section) => (
          <section
            key={section.title}
            className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm"
          >
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-3">{section.title}</h2>
            <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed">{section.body}</p>
          </section>
        ))}

        {page.anchorOnMain && (
          <p className="text-sm text-slate-600 leading-relaxed bg-blue-50 border border-blue-100 rounded-xl p-4">
            For the complete section with tables and detailed breakdown, see the{" "}
            <Link
              href={`/government-exams/kppsc${page.anchorOnMain}`}
              className="font-bold text-[#1565C0] hover:underline"
            >
              full KPPSC guide
            </Link>
            .
          </p>
        )}

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            Related KPPSC Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {page.relatedLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 bg-slate-50 border border-slate-100 text-slate-800 hover:border-blue-200 hover:bg-blue-50/60 transition-all"
              >
                <span className="text-sm font-bold">{link.name}</span>
                <FaArrowRight
                  size={11}
                  className="text-slate-300 group-hover:text-[#1565C0] group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            More KPPSC Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/government-exams/kppsc/${topic.slug}`}
                className="text-xs font-bold px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 hover:border-blue-200 hover:text-[#1565C0] transition-all"
              >
                {topic.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
