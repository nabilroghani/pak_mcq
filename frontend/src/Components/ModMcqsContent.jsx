"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronRight, FaArrowLeft, FaChevronDown, FaCheck } from "react-icons/fa";
import { modMcqs } from "@/data/modMcqs";
import { modMcqsFaqs } from "@/data/modMcqsFaqs";

const CATEGORY_ORDER = [
  "General Knowledge",
  "Pakistan Studies",
  "Current Affairs & Organizations",
  "English",
  "Basic Mathematics & Reasoning",
  "Islamic Studies",
];

const howToUse = [
  "Attempt each question before checking the answer. That builds recall better than reading the explanation first.",
  "Note which subjects you consistently get wrong, and revise those before moving to new material.",
  "Come back to weaker sections after a day or two rather than reviewing them only once.",
  "Past MOD advertisements have reportedly used negative marking. Practice being selective about which questions you attempt confidently, and check whether negative marking applies to your specific test before guessing.",
  "Once these basics feel comfortable, combine them with MOD past papers to see how questions were phrased in previous recruitment cycles.",
];

const mistakes = [
  "Treating all subjects as equally weighted without checking whether your post leans more on technical content than on general sections.",
  "Ignoring negative-marking strategy if your test applies it. Random guessing can cost more than it gains.",
  "Relying only on general MCQs for engineering, IT, or medical posts, where subject-specific content likely carries significant weight.",
  "Studying general knowledge passively. Working through MCQs repeatedly builds retention better than re-reading notes.",
  "Skipping past papers because MOD-specific material is less common. Even limited past material is worth reviewing for pacing and question style.",
];

const buildOn = [
  {
    name: "MOD Exam Guide",
    path: "/government-exams/mod",
    desc: "Eligibility, recruitment process, and how requirements differ across administrative, technical, medical, and clerical posts.",
  },
  {
    name: "MOD Past Papers",
    path: "/past-papers/mod",
    desc: "See how these subjects have been tested in previous MOD recruitment cycles.",
  },
  {
    name: "Latest Jobs",
    path: "/jobs",
    desc: "Track currently advertised MOD openings alongside other federal and provincial recruitment.",
  },
];

function McqCard({ mcq }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <article className="rounded-xl border border-slate-100 bg-slate-50/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setRevealed((prev) => !prev)}
        className="w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-slate-100/70 transition-colors"
        aria-expanded={revealed}
      >
        <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
          {mcq.id}
        </span>
        <span className="text-sm font-bold text-slate-900 leading-snug flex-1">{mcq.question}</span>
        <FaChevronDown size={12} className={`shrink-0 mt-1 text-slate-400 transition-transform ${revealed ? "rotate-180" : ""}`} />
      </button>
      <ul className="px-5 pb-4 grid sm:grid-cols-2 gap-2">
        {mcq.options.map((opt) => {
          const isCorrect = revealed && opt.key === mcq.correct;
          return (
            <li
              key={opt.key}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm border transition-colors ${
                isCorrect
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold"
                  : "bg-white border-slate-100 text-slate-700"
              }`}
            >
              <span
                className={`shrink-0 w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${
                  isCorrect ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {isCorrect ? <FaCheck size={8} /> : opt.key}
              </span>
              {opt.text}
            </li>
          );
        })}
      </ul>
      {revealed && (
        <div className="mx-5 mb-5 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-1">
            Answer: {mcq.correct}) — Explanation
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">{mcq.explanation}</p>
        </div>
      )}
    </article>
  );
}

export default function ModMcqsContent() {
  const [openFaq, setOpenFaq] = useState(0);

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    mcqs: modMcqs.filter((m) => m.category === category),
  })).filter((group) => group.mcqs.length > 0);

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href="/mcqs"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All MCQs
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Ministry of Defence · Screening test practice
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            MOD MCQs – Practice Questions with Answers
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed">
            30 practice MCQs for Ministry of Defence general recruitment tests — General Knowledge, Pakistan
            Studies, current affairs, English, basic mathematics and reasoning, and Islamic Studies. Click a
            question to reveal the answer and a short explanation.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            <p>
              Ministry of Defence screening tests for general recruitment posts are typically objective and
              MCQ-based, drawing on General Knowledge, Pakistan Studies, current affairs, English, and basic
              mathematics or reasoning. Technical and specialist posts add subject-specific content on top of
              that foundation. MOD does not publish one fixed syllabus for every post, so treat these as
              practice to strengthen fundamentals, not a replacement for your advertisement.
            </p>
            <p>
              Work through them section by section. If you miss more than one or two questions in a subject,
              revise that subject before moving on. For eligibility and how preparation should differ by post,
              read the{" "}
              <Link href="/government-exams/mod" className="font-bold text-[#1565C0] hover:underline">
                MOD Exam Guide
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">How to Use These MCQs Effectively</h2>
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            {howToUse.map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>
                  {item.includes("MOD past papers") ? (
                    <>
                      Once these basics feel comfortable, combine them with{" "}
                      <Link href="/past-papers/mod" className="font-bold text-[#1565C0] hover:underline">
                        MOD past papers
                      </Link>{" "}
                      to see how questions were phrased in previous recruitment cycles.
                    </>
                  ) : (
                    item
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {grouped.map(({ category, mcqs }) => (
          <section
            key={category}
            id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm scroll-mt-24"
          >
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">{category} MCQs</h2>
            <div className="space-y-3">
              {mcqs.map((mcq) => (
                <McqCard key={mcq.id} mcq={mcq} />
              ))}
            </div>
          </section>
        ))}

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Build on This Practice</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            These 30 MCQs cover common foundations. A fuller MOD plan also uses the exam guide, past papers,
            and current job notices.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {buildOn.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="group flex flex-col gap-2 rounded-xl px-4 py-4 bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/60 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-black text-slate-900 group-hover:text-[#1565C0]">{link.name}</span>
                  <FaChevronRight size={11} className="text-slate-300 group-hover:text-[#1565C0] shrink-0" />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Common Mistakes When Preparing MOD MCQs</h2>
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            {mistakes.map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {modMcqsFaqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-slate-50 hover:bg-slate-100/80 transition-colors"
                    aria-expanded={open}
                  >
                    <span className="text-sm font-bold text-slate-900">{i + 1}. {faq.q}</span>
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

        <section className="bg-amber-50 rounded-2xl border border-amber-100 p-6 md:p-8">
          <p className="text-sm text-slate-600 leading-relaxed">
            MCQs on this page cover general preparation topics and are not official MOD past paper content.
            Always verify your specific post&apos;s syllabus, test pattern, and marking scheme from the official
            MOD advertisement.
          </p>
        </section>
      </div>
    </div>
  );
}
