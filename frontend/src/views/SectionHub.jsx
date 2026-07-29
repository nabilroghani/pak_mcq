"use client";

import Link from "next/link";
import { FaChevronRight, FaArrowRight } from "react-icons/fa";

/**
 * Reusable topical-authority hub page.
 * Pass a section object from siteStructure.js
 */
const SectionHub = ({ section }) => {
  if (!section) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem] md:rounded-b-[2.5rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-orange-400/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-300 mb-3">
            Pak Learners · {section.title}
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            {section.headline}
          </h1>
          <p className="text-blue-100/80 max-w-2xl text-sm md:text-base leading-relaxed">
            {section.description}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            Explore {section.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {section.links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 transition-all border ${
                  link.highlight
                    ? "bg-[#1565C0] border-[#1565C0] text-white hover:bg-[#0d47a1]"
                    : "bg-slate-50 border-slate-100 text-slate-800 hover:border-blue-200 hover:bg-blue-50/60"
                }`}
              >
                <div>
                  <span className="block text-sm font-bold">{link.name}</span>
                  {link.note && (
                    <span
                      className={`block text-[11px] mt-0.5 ${
                        link.highlight ? "text-blue-100" : "text-slate-400"
                      }`}
                    >
                      {link.note}
                    </span>
                  )}
                </div>
                <FaChevronRight
                  size={12}
                  className={
                    link.highlight
                      ? "opacity-80"
                      : "text-slate-300 group-hover:text-[#1565C0] group-hover:translate-x-0.5 transition-all"
                  }
                />
              </Link>
            ))}
          </div>
        </div>

        {section.related?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-3 px-1">
              Related Resources
            </h2>
            <div className="flex flex-wrap gap-2">
              {section.related.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:border-[#1565C0] hover:text-[#1565C0] transition-all"
                >
                  {item.name}
                  <FaArrowRight size={9} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHub;
