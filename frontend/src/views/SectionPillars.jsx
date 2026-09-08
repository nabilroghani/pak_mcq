"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ClientRedirect from "@/Components/ClientRedirect";
import { FaChevronRight, FaArrowLeft, FaChevronDown, FaCheck } from "react-icons/fa";
import TopicPillar from "./TopicPillar";
import {
  pastPaperPillars,
  onlineTestPillars,
  currentAffairsPillars,
  studyResourcePillars,
} from "../data/siteStructure";
import {
  ajkpscPastPapersFaqs,
  ajkpscPaperFormats,
  ajkpscAnalysisTips,
  ajkpscInterimPrepLinks,
} from "../data/ajkpscPastPapersContent";

// ─── Shared sub-components ────────────────────────────────────────────────────

function Section({ id, title, children }) {
  return (
    <section
      id={id}
      className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm scroll-mt-24"
    >
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">{title}</h2>
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

// ─── AJKPSC Past Papers Full Content ─────────────────────────────────────────

function AjkpscPastPapersContent() {
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href="/past-papers"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All Past Papers
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Azad Jammu &amp; Kashmir Public Service Commission
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            AJKPSC Past Papers – Preparation Guide
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed">
            We&apos;re actively organizing AJKPSC past papers by post and year for this
            page. In the meantime, here&apos;s a genuinely useful guide to how AJKPSC
            past papers are typically structured, why they matter for your preparation,
            and how to make the most of your study time using the resources already
            available on PakLearners.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        {/* ── Interim notice ── */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 md:p-6 shadow-sm">
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>Looking for papers to download right now?</strong> Check back
            soon — this page will be updated as solved sets are added. For immediate
            practice, the{" "}
            <Link href="/mcqs/ajkpsc" className="font-bold text-[#1565C0] hover:underline">
              AJKPSC MCQs
            </Link>{" "}
            page and{" "}
            <Link href="/online-tests/ajkpsc" className="font-bold text-[#1565C0] hover:underline">
              AJKPSC Online Tests
            </Link>{" "}
            are ready to use today.
          </p>
        </section>

        {/* ── Why Past Papers Matter ── */}
        <Section id="why-past-papers" title="Why AJKPSC Past Papers Matter">
          <Prose>
            <p>
              Past papers show you something a syllabus list can&apos;t: the actual
              phrasing, structure, and difficulty level AJKPSC has used in real exams.
              For a commission like AJKPSC, which recruits across a range of posts with
              differing content and format, this is especially useful — it helps you
              calibrate exactly how detailed or broad your preparation for a specific
              post needs to be, rather than guessing from general study material.
            </p>
            <p>
              Reviewing past papers also helps you notice which topics tend to
              reappear — certain general knowledge, Pakistan Studies, and AJK-specific
              questions do show up across different recruitment cycles, though exact
              repetition varies by post and year. This is one of the most reliable ways
              to prioritize your study time when you&apos;re short on it.
            </p>
          </Prose>
        </Section>

        {/* ── What to Expect ── */}
        <Section id="paper-formats" title="What to Expect from AJKPSC Exam Papers">
          <Prose>
            <p>
              AJKPSC doesn&apos;t use one fixed format across every post — pattern and
              subject weightage depend on the specific advertisement. Broadly, most
              AJKPSC written tests fall into a few recognizable formats:
            </p>
          </Prose>
          <div className="mt-5 space-y-4">
            {ajkpscPaperFormats.map((fmt) => (
              <article
                key={fmt.title}
                className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5"
              >
                <h3 className="text-sm font-black text-[#1565C0] mb-1">{fmt.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{fmt.desc}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-slate-500 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-4">
            Always confirm the exact paper format, number of questions, and marking
            scheme for your specific post from the official AJKPSC advertisement — this
            guide describes general patterns, not a guaranteed format for every exam.
          </p>
        </Section>

        {/* ── How to Analyze ── */}
        <Section id="analysis-tips" title="How to Analyze a Past Paper Properly">
          <Prose>
            <p>
              Solving a past paper once and moving on gets you far less value than
              actually analyzing it. A more effective approach:
            </p>
          </Prose>
          <ul className="mt-5 space-y-3">
            {ajkpscAnalysisTips.map((tip) => (
              <li key={tip.title} className="flex gap-3 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">{tip.title}</strong> — {tip.desc}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Preparing While Papers Are Being Added ── */}
        <Section id="interim-prep" title="Preparing for AJKPSC While Papers Are Being Added">
          <Prose>
            <p>
              While the organized paper collection for this page is being put together,
              here&apos;s how to keep your preparation moving:
            </p>
          </Prose>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
            {ajkpscInterimPrepLinks.map((link) => (
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
            {ajkpscPastPapersFaqs.map((faq, i) => {
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
        <section className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm">
          <p className="text-sm text-slate-500 leading-relaxed">
            This page is a preparation guide. AJKPSC past papers will be added here as
            organized, solved sets are assembled. Always verify exam-specific details —
            paper format, subject weightage, marking scheme — from the{" "}
            <strong className="text-slate-700">official AJKPSC advertisement</strong>{" "}
            for your target post.
          </p>
        </section>
      </div>
    </div>
  );
}

// ─── Pillar exports ───────────────────────────────────────────────────────────

export const PastPaperPillar = () => {
  const params = useParams();
  const slug = params["examSlug"]?.toLowerCase();

  if (slug === "ajkpsc") {
    return <AjkpscPastPapersContent />;
  }

  return (
    <TopicPillar
      pillars={pastPaperPillars}
      parentPath="/past-papers"
      parentLabel="All Past Papers"
      paramKey="examSlug"
      relatedLinks={(item) => [
        { name: `${item.name} MCQs`, path: `/mcqs/${item.slug}` },
        { name: `${item.name} Exam Guide`, path: `/government-exams/${item.slug}` },
        { name: `${item.name} Online Test`, path: `/online-tests/${item.slug}` },
        { name: "All Past Papers", path: "/past-papers" },
        { name: "Online Tests", path: "/online-tests" },
        { name: "Study Resources", path: "/study-resources" },
      ]}
    />
  );
};


export const OnlineTestPillar = () => (
  <TopicPillar
    pillars={onlineTestPillars}
    parentPath="/online-tests"
    parentLabel="All Online Tests"
    paramKey="examSlug"
    relatedLinks={(item) => [
      { name: `Start ${item.name} Test`, path: "/online-tests/start" },
      { name: `${item.name} MCQs`, path: `/mcqs/${item.slug}` },
      { name: `${item.name} Past Papers`, path: `/past-papers/${item.slug}` },
      { name: `${item.name} Exam Guide`, path: `/government-exams/${item.slug}` },
      { name: "All Online Tests", path: "/online-tests" },
      { name: "Browse MCQs", path: "/mcqs" },
    ]}
  />
);

export const CurrentAffairsPillar = () => (
  <TopicPillar
    pillars={currentAffairsPillars}
    parentPath="/current-affairs"
    parentLabel="All Current Affairs"
    paramKey="topicSlug"
    relatedLinks={() => [
      { name: "Pakistan Affairs MCQs", path: "/category/Pak-Current-Affairs" },
      { name: "World Affairs MCQs", path: "/category/World-Current-Affairs" },
      { name: "All Current Affairs", path: "/current-affairs" },
      { name: "Browse MCQs", path: "/mcqs" },
      { name: "Online Tests", path: "/online-tests" },
      { name: "Blog", path: "/blog" },
    ]}
  />
);

export const StudyResourcePillar = () => (
  <TopicPillar
    pillars={studyResourcePillars}
    parentPath="/study-resources"
    parentLabel="All Study Resources"
    paramKey="topicSlug"
    relatedLinks={() => [
      { name: "Books & PDFs", path: "/study-resources/books" },
      { name: "Browse MCQs", path: "/mcqs" },
      { name: "Past Papers", path: "/past-papers" },
      { name: "Government Exams", path: "/government-exams" },
      { name: "Online Tests", path: "/online-tests" },
      { name: "All Study Resources", path: "/study-resources" },
    ]}
  />
);
