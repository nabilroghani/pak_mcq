"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ClientRedirect from "@/Components/ClientRedirect";
import {
  FaChevronRight,
  FaArrowLeft,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";
import { mcqExamPillars } from "../data/siteStructure";
import { kppscMcqs } from "../data/kppscMcqs";
import { kppscMcqsFaqs } from "../data/kppscMcqsFaqs";
import { ajkpscMcqs } from "../data/ajkpscMcqs";
import { ajkpscMcqsFaqs } from "../data/ajkpscMcqsFaqs";

/**
 * Pillar page for each exam's MCQs.
 * Route: /mcqs/:examSlug
 * KPPSC and AJKPSC render full content; other exams show a placeholder.
 */

// ─── Shared sub-components ───────────────────────────────────────────────────

function Section({ id, title, children }) {
  return (
    <section
      id={id}
      className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm scroll-mt-24"
    >
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Prose({ children }) {
  return (
    <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
      {children}
    </div>
  );
}

// ─── KPPSC-specific MCQ Card ─────────────────────────────────────────────────

function McqCard({ mcq }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <article className="rounded-xl border border-slate-100 bg-slate-50/60 overflow-hidden">
      {/* Question header */}
      <button
        type="button"
        onClick={() => setRevealed((prev) => !prev)}
        className="w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-slate-100/70 transition-colors"
        aria-expanded={revealed}
      >
        <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
          {mcq.id}
        </span>
        <span className="text-sm font-bold text-slate-900 leading-snug flex-1">
          {mcq.question}
        </span>
        <FaChevronDown
          size={12}
          className={`shrink-0 mt-1 text-slate-400 transition-transform ${
            revealed ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Options — always visible */}
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
                  isCorrect
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isCorrect ? <FaCheck size={8} /> : opt.key}
              </span>
              {opt.text}
            </li>
          );
        })}
      </ul>

      {/* Answer + Explanation — revealed on click */}
      {revealed && (
        <div className="mx-5 mb-5 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-1">
            Answer: {mcq.correct}) — Explanation
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {mcq.explanation}
          </p>
        </div>
      )}
    </article>
  );
}

// ─── KPPSC Full Content ───────────────────────────────────────────────────────

// Derive unique category order from the MCQ data
const CATEGORY_ORDER = [
  "Pakistan Studies",
  "General Knowledge",
  "Islamic Studies",
  "Everyday Science",
  "English",
  "Computer",
  "General Awareness",
];

const howToUseTips = [
  "Attempt each question before checking the explanation — guessing and then verifying builds recall better than reading the answer first.",
  "If you get a question wrong, don't just note the correct option — read the explanation and make sure you understand why.",
  "Come back to sections you struggled with after a day or two, rather than moving on and not revisiting them.",
  "Once you're comfortable with these basics, move to timed practice — KPPSC Online Tests simulate real exam pacing, which static MCQs can't.",
];

const exploreMoreLinks = [
  {
    name: "KPPSC Exam Guide",
    path: "/government-exams/kppsc",
    desc: "Full breakdown of posts, syllabus guidance, and how preparation differs by post.",
  },
  {
    name: "KPPSC Past Papers",
    path: "/past-papers/kppsc",
    desc: "See how these subjects have actually been tested before.",
  },
  {
    name: "KPPSC Online Tests",
    path: "/government-exams/kppsc/online-tests",
    desc: "Practice under real exam time pressure once you're comfortable with the basics.",
  },
];

function KppscMcqsContent() {
  const [openFaq, setOpenFaq] = useState(-1);

  // Group MCQs by category preserving CATEGORY_ORDER
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    mcqs: kppscMcqs.filter((m) => m.category === cat),
  })).filter((g) => g.mcqs.length > 0);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href="/mcqs"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All MCQs
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Khyber Pakhtunkhwa Public Service Commission
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            KPPSC MCQs – Practice Questions with Answers
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed">
            KPPSC written tests are objective-type in most general recruitment
            posts, drawing questions from a mix of subjects — commonly Pakistan
            Studies, General Knowledge, Islamic Studies, Everyday Science,
            English, and, for relevant posts, Computer Science. The exact
            subject mix and weightage depend on the specific post and
            advertisement, so treat this page as practice material to sharpen
            your basics, not a substitute for your official syllabus.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        {/* ── Intro note ── */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <Prose>
            <p>
              Below are 50 MCQs organized by subject, each with the correct
              answer and a short explanation. Work through them subject by
              subject rather than all at once — it&apos;s easier to spot which
              areas need more review that way.
            </p>
            <p>
              Before you start, it&apos;s worth reading the{" "}
              <Link
                href="/government-exams/kppsc"
                className="font-bold text-[#1565C0] hover:underline"
              >
                KPPSC Exam Guide
              </Link>{" "}
              if you haven&apos;t already, since it explains how subject
              weightage actually varies by post — that context makes these MCQs
              more useful.
            </p>
          </Prose>
        </section>

        {/* ── How to Use ── */}
        <Section id="how-to-use" title="How to Use These MCQs Effectively">
          <ul className="space-y-3 mt-2">
            {howToUseTips.map((tip, i) => (
              <li key={i} className="flex gap-3 items-start text-sm text-slate-600 leading-relaxed">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── MCQs by subject ── */}
        {grouped.map(({ category, mcqs }) => (
          <Section key={category} id={category.toLowerCase().replace(/\s+/g, "-")} title={`${category} MCQs`}>
            <div className="space-y-3 mt-2">
              {mcqs.map((mcq) => (
                <McqCard key={mcq.id} mcq={mcq} />
              ))}
            </div>
          </Section>
        ))}

        {/* ── Explore More ── */}
        <Section id="explore-more" title="Explore More KPPSC Preparation">
          <Prose>
            <p>
              Practicing standalone MCQs helps build basics, but real KPPSC
              exams also test past-question patterns and timed accuracy. To
              build on what you&apos;ve practiced above:
            </p>
          </Prose>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
            {exploreMoreLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="group flex flex-col gap-2 rounded-xl px-4 py-4 bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/60 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900 group-hover:text-[#1565C0]">
                    {link.name}
                  </span>
                  <FaChevronRight
                    size={11}
                    className="text-slate-300 group-hover:text-[#1565C0] group-hover:translate-x-0.5 transition-all"
                  />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </Section>

        {/* ── FAQs ── */}
        <Section id="faq" title="KPPSC MCQs – Frequently Asked Questions">
          <div className="space-y-2 mt-2">
            {kppscMcqsFaqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="border border-slate-100 rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-slate-50 hover:bg-slate-100/80 transition-colors"
                    aria-expanded={open}
                  >
                    <span className="text-sm font-bold text-slate-900">
                      {i + 1}. {faq.q}
                    </span>
                    <FaChevronDown
                      size={12}
                      className={`text-slate-400 shrink-0 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
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
        </Section>

        {/* ── Disclaimer ── */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <p className="text-sm text-slate-500 leading-relaxed">
            MCQs on this page cover general preparation topics and are{" "}
            <strong className="text-slate-700">not official KPPSC content</strong>. Always
            verify your specific post&apos;s syllabus, paper pattern, and marking
            scheme from the official KPPSC advertisement.
          </p>
        </section>
      </div>
    </div>
  );
}

// ─── Generic Placeholder for other exams ─────────────────────────────────────

function GenericMcqPillar({ exam }) {
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
}

// ─── AJKPSC Full Content ──────────────────────────────────────────────────────

const AJKPSC_CATEGORY_ORDER = [
  "AJK General Knowledge",
  "Pakistan Studies",
  "General Knowledge",
  "Islamic Studies",
  "Everyday Science",
  "English",
];

const ajkpscBuildOnLinks = [
  {
    name: "AJKPSC Exam Guide",
    path: "/government-exams/ajkpsc",
    desc: "Full breakdown of posts, eligibility, and how preparation differs across AJKPSC exams.",
  },
  {
    name: "AJKPSC Past Papers",
    path: "/past-papers/ajkpsc",
    desc: "See how these subjects have actually been tested in previous recruitment cycles.",
  },
  {
    name: "AJKPSC Online Test",
    path: "/online-tests/ajkpsc",
    desc: "Practice under real time pressure once you're comfortable with the basics.",
  },
];

function AjkpscMcqsContent() {
  const [openFaq, setOpenFaq] = useState(-1);

  const grouped = AJKPSC_CATEGORY_ORDER.map((cat) => ({
    category: cat,
    mcqs: ajkpscMcqs.filter((m) => m.category === cat),
  })).filter((g) => g.mcqs.length > 0);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href="/mcqs"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All MCQs
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Azad Jammu &amp; Kashmir Public Service Commission
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            AJKPSC MCQs – Practice Questions with Answers
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed">
            The Azad Jammu &amp; Kashmir Public Service Commission (AJKPSC) conducts
            recruitment exams for various government posts in Azad Kashmir. Written
            tests are largely objective-type, drawing on general knowledge, Pakistan
            Studies, Islamic Studies, Everyday Science, and English — plus, for many
            AJKPSC posts, region-specific knowledge about Azad Jammu &amp; Kashmir itself.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        {/* ── Intro note ── */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <Prose>
            <p>
              Below are 20 practice MCQs — a mix of AJK-specific general knowledge
              and the broader subjects commonly tested — each with the correct answer
              and a short explanation. These are practice questions to build your
              basics, not official AJKPSC past paper content. Subject weightage and
              exact syllabus always depend on your specific post and advertisement, so
              use these alongside your official syllabus rather than in place of it.
            </p>
            <p>
              If you haven&apos;t already, it&apos;s worth starting with the{" "}
              <Link
                href="/government-exams/ajkpsc"
                className="font-bold text-[#1565C0] hover:underline"
              >
                AJKPSC Exam Guide
              </Link>{" "}
              to understand how posts, syllabus, and preparation differ across AJKPSC
              exams before diving into MCQ practice.
            </p>
          </Prose>
        </section>

        {/* ── MCQs by subject ── */}
        {grouped.map(({ category, mcqs: groupMcqs }) => (
          <Section
            key={category}
            id={category.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "")}
            title={`${category} MCQs`}
          >
            <div className="space-y-3 mt-2">
              {groupMcqs.map((mcq) => (
                <McqCard key={mcq.id} mcq={mcq} />
              ))}
            </div>
          </Section>
        ))}

        {/* ── Build on This Practice ── */}
        <Section id="build-on" title="Build on This Practice">
          <Prose>
            <p>
              Static MCQs are a good starting point, but real exam preparation needs
              more context and timed practice too:
            </p>
          </Prose>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
            {ajkpscBuildOnLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="group flex flex-col gap-2 rounded-xl px-4 py-4 bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/60 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900 group-hover:text-[#1565C0]">
                    {link.name}
                  </span>
                  <FaChevronRight
                    size={11}
                    className="text-slate-300 group-hover:text-[#1565C0] group-hover:translate-x-0.5 transition-all"
                  />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </Section>

        {/* ── FAQs ── */}
        <Section id="faq" title="Frequently Asked Questions">
          <div className="space-y-2 mt-2">
            {ajkpscMcqsFaqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-slate-50 hover:bg-slate-100/80 transition-colors"
                    aria-expanded={open}
                  >
                    <span className="text-sm font-bold text-slate-900">
                      {i + 1}. {faq.q}
                    </span>
                    <FaChevronDown
                      size={12}
                      className={`text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                    />
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
        </Section>

        {/* ── Disclaimer ── */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <p className="text-sm text-slate-500 leading-relaxed">
            MCQs on this page cover general preparation topics and are{" "}
            <strong className="text-slate-700">not official AJKPSC content</strong>.
            Always verify your specific post&apos;s syllabus, paper pattern, and marking
            scheme from the official AJKPSC advertisement.
          </p>
        </section>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

const McqPillar = () => {
  const { examSlug } = useParams();
  const exam = mcqExamPillars[examSlug?.toLowerCase()];

  if (!exam) {
    return <ClientRedirect to="/mcqs" />;
  }

  if (exam.slug === "kppsc") {
    return <KppscMcqsContent />;
  }

  if (exam.slug === "ajkpsc") {
    return <AjkpscMcqsContent />;
  }

  return <GenericMcqPillar exam={exam} />;
};

export default McqPillar;
