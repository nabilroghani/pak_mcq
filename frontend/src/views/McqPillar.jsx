"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import ClientRedirect from "@/Components/ClientRedirect";
import { FaChevronRight, FaArrowLeft } from "react-icons/fa";
import { mcqExamPillars } from "../data/siteStructure";

/**
 * Pillar page for each exam's MCQs.
 * Route: /mcqs/:examSlug
 * Same pattern as /government-exams/:examSlug
 */
const McqPillar = () => {
  const { examSlug } = useParams();
  const exam = mcqExamPillars[examSlug?.toLowerCase()];

  if (!exam) {
    return <ClientRedirect to="/mcqs" />;
  }

  const prepLinks = [
    { name: `${exam.name} Exam Guide`, path: `/government-exams/${exam.slug}` },
    { name: "All MCQs", path: "/mcqs" },
    { name: "Past Papers", path: "/past-papers" },
    { name: "Online Tests", path: "/online-tests" },
    { name: "Current Affairs", path: "/current-affairs" },
    { name: "Study Resources", path: "/study-resources" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href="/mcqs"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All MCQs
          </Link>

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            {exam.fullName}
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            {exam.headline}
          </h1>
          <p className="text-blue-100/80 max-w-2xl text-sm md:text-base leading-relaxed">
            {exam.description}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 pb-16 space-y-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            {exam.name} MCQs Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {prepLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 bg-slate-50 border border-slate-100 text-slate-800 hover:border-blue-200 hover:bg-blue-50/60 transition-all"
              >
                <span className="text-sm font-bold">{link.name}</span>
                <FaChevronRight
                  size={12}
                  className="text-slate-300 group-hover:text-[#1565C0] group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Content slot — fill later */}
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-6 sm:p-8">
          <h2 className="text-lg font-black text-slate-900 mb-2">
            {exam.name} MCQs
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            {exam.name} question banks and subject-wise MCQs will be added here.
            This pillar page is ready — share your content for:{" "}
            <span className="font-bold text-[#1565C0]">/mcqs/{exam.slug}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default McqPillar;
