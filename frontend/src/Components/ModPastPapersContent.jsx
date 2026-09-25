"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaCheck, FaArrowLeft } from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { modSampleQuestions } from "@/data/modSampleQuestions";
import { modPastPapersFaqs } from "@/data/modPastPapersFaqs";

const whyHarder = [
  {
    title: "Recruitment frequency",
    text: "MOD does not run a regular annual exam calendar the way CSS or many provincial general recruitment cycles do. Advertisements appear as vacancies arise, sometimes with long gaps between large drives.",
  },
  {
    title: "Scope variation",
    text: "One advertisement might cover a handful of specialized technical posts, and the next a large multi-department, multi-pay-scale drive. Format and content vary more between cycles than with a standardized commission exam.",
  },
  {
    title: "Testing body variation",
    text: "Some drives have used a designated or approved testing organization. That can mean less centralized, less publicly archived paper material than a single commission running its own exams.",
  },
];

const prepSteps = [
  {
    lead: "Use general federal-recruitment past papers as a substitute for style and pacing.",
    rest: "share a lot of general knowledge, current affairs, and English with what MOD's general screening tests appear to cover.",
    href: "/past-papers/fpsc",
    label: "FPSC past papers",
  },
  {
    lead: "Prioritize subject-wise MCQ practice over searching for repeated MOD questions.",
    rest: "are the better use of time while MOD's exact question bank is not well documented.",
    href: "/mcqs/mod",
    label: "MOD MCQs",
  },
  {
    lead: "Practice under negative-marking conditions.",
    rest: "At least one recent large-scale MOD test used a penalty for wrong answers. That changes how selectively you should answer versus guess.",
  },
  {
    lead: "Watch for a sample paper or test instructions with your admission notice.",
    rest: "When MOD issues those, they are a more reliable source of format than general past-paper practice.",
  },
  {
    lead: "Add post-specific technical content for engineering, IT, or medical roles.",
    rest: "General practice alone will not cover that component.",
  },
];

const mistakes = [
  "Treating unverified past papers found online as guaranteed accurate. Some circulating MOD material may not be reliable.",
  "Skipping subject-wise practice while searching for past papers. Because genuine papers are scarce, MCQ practice deserves more of your time.",
  "Assuming one post's test matches another's. A technical post's paper can differ sharply from a general administrative paper, and drives differ from each other.",
  "Ignoring application details — portal, documents, and deadlines — while focusing only on subject content. Conflicting information about MOD's process circulates widely online.",
];

function SampleCard({ mcq }) {
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
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm border ${
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
            Answer: {mcq.correct}
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">{mcq.explanation}</p>
        </div>
      )}
    </article>
  );
}

export default function ModPastPapersContent() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Past Papers", path: "/past-papers" },
              { name: "MOD" },
            ]}
            variant="light"
          />
          <Link
            href="/past-papers"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All Past Papers
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Ministry of Defence · Sample practice, not real past papers
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            MOD Past Papers – Preparation Guide &amp; Sample Practice Questions
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed">
            Verified MOD past papers are not widely available. This page explains how to prepare with what is
            genuinely available, and includes 10 original sample questions written in the style of MOD&apos;s
            general screening test — not claimed as real exam questions.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            <p>
              Solved past papers for the Ministry of Defence are much harder to find than for FPSC, PPSC, or
              KPPSC. MOD&apos;s recruitment drives happen less regularly, and there is no well-established public
              bank of past papers the way there is for more frequent exam bodies.
            </p>
            <p>
              This page does not present unverified or recycled material as genuine past papers. It describes
              what general screening tests have looked like in publicly reported drives, how to prepare when
              past material is thin, and sample questions labeled as practice.
            </p>
            <p>
              For eligibility, process, and syllabus, see the{" "}
              <Link href="/government-exams/mod" className="font-bold text-[#1565C0] hover:underline">
                MOD Exam Guide
              </Link>
              . For subject-wise practice, see{" "}
              <Link href="/mcqs/mod" className="font-bold text-[#1565C0] hover:underline">
                MOD MCQs
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Why MOD Past Papers Are Harder to Find</h2>
          <div className="space-y-4">
            {whyHarder.map((item) => (
              <p key={item.title} className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-900">{item.title}.</strong> {item.text}
              </p>
            ))}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            Preparation is still possible. It needs more subject-wise practice and general federal-recruitment
            material than an FPSC plan built mostly on past papers.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">What MOD&apos;s Screening Test Has Generally Looked Like</h2>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Publicly reported recent drives have used an <strong className="text-slate-900">objective, MCQ-based screening test</strong> for
              general posts, with <strong className="text-slate-900">negative marking</strong> (a fraction of a mark deducted per wrong answer)
              reported in at least one large advertisement. Technical and specialist posts in engineering, IT, and
              medicine likely add subject-specific content, consistent with other federal technical tests.
            </p>
            <p>
              That is a general pattern, not a guarantee for every advertisement. Follow the instructions and any
              sample or admission notice issued for your own test.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">How to Prepare Without Extensive Past Papers</h2>
          <ol className="space-y-4">
            {prepSteps.map((step, i) => (
              <li key={step.lead} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                <span className="font-black text-[#1565C0] shrink-0">{i + 1}.</span>
                <span>
                  <strong className="text-slate-900">{step.lead}</strong>{" "}
                  {step.href ? (
                    <>
                      <Link href={step.href} className="font-bold text-[#1565C0] hover:underline">
                        {step.label}
                      </Link>{" "}
                      {step.rest}
                    </>
                  ) : (
                    step.rest
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2">Sample Practice Questions (MOD Test Style)</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            These are <strong className="text-slate-900">original practice questions</strong> written to match the
            general style, subject range, and difficulty reported for MOD&apos;s screening test. They are not real,
            previously used MOD exam questions. Use them for pacing and format, not as a prediction of your paper.
            Click a question to reveal the answer.
          </p>
          <div className="space-y-3">
            {modSampleQuestions.map((mcq) => (
              <SampleCard key={mcq.id} mcq={mcq} />
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">A Note on These Sample Questions</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            These 10 questions build familiarity with MOD&apos;s general test structure, including some questions
            about the recruitment process itself. For broader subject practice — general knowledge, Pakistan
            Studies, English, basic math, and more — use the{" "}
            <Link href="/mcqs/mod" className="font-bold text-[#1565C0] hover:underline">
              MOD MCQs
            </Link>{" "}
            collection.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">As Genuine Past Papers Become Available</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Verified, solved MOD past papers will be added here as they become available from confirmed
            recruitment cycles, organized by post and year, in the same way as{" "}
            <Link href="/past-papers/fpsc" className="font-bold text-[#1565C0] hover:underline">
              FPSC past papers
            </Link>
            . A genuine paper from a completed cycle is the kind of material that would strengthen this
            collection. You can share it through the{" "}
            <Link href="/contact" className="font-bold text-[#1565C0] hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Common Mistakes to Avoid</h2>
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            {mistakes.map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {modPastPapersFaqs.map((faq, i) => {
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
            Genuine MOD past papers are limited. The sample questions on this page are original practice
            material written to reflect MOD&apos;s general test style — not real past exam content. Always verify
            your test format, syllabus, and instructions from MOD&apos;s official advertisement and any admission
            notice issued to you.
          </p>
        </section>
      </div>
    </div>
  );
}
