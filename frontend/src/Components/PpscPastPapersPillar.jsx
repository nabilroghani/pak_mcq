"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaTimes,
} from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { ppscPastPapersMcqs } from "@/data/ppscPastPapersMcqs";
import { ppscPastPapersFaqs } from "@/data/ppscPastPapersFaqs";

function Section({ id, title, children }) {
  return (
    <section id={id} className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Prose({ children }) {
  return (
    <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">{children}</div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 items-start">
          <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PracticeMcqCard({ mcq }) {
  const [selected, setSelected] = useState(null);

  const optionClass = (key) => {
    if (!selected) {
      return "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40 cursor-pointer";
    }
    if (key === mcq.correct) {
      return "border-emerald-300 bg-emerald-50 text-emerald-900";
    }
    if (key === selected) {
      return "border-red-300 bg-red-50 text-red-900";
    }
    return "border-slate-100 bg-slate-50/60 text-slate-400";
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#1565C0] bg-blue-50 px-2.5 py-1 rounded-full">
          {mcq.category}
        </span>
        <span className="text-[10px] font-bold text-slate-400">Question {mcq.id}</span>
      </div>
      <p className="text-sm md:text-base font-bold text-slate-900 leading-relaxed mb-4">{mcq.question}</p>
      <div className="space-y-2">
        {mcq.options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            disabled={Boolean(selected)}
            onClick={() => setSelected(opt.key)}
            className={`w-full text-left flex items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-all ${optionClass(opt.key)}`}
          >
            <span className="font-black shrink-0">{opt.key}.</span>
            <span className="leading-relaxed">{opt.text}</span>
            {selected && opt.key === mcq.correct && (
              <FaCheck className="ml-auto shrink-0 text-emerald-600 mt-0.5" size={14} />
            )}
            {selected && opt.key === selected && opt.key !== mcq.correct && (
              <FaTimes className="ml-auto shrink-0 text-red-500 mt-0.5" size={14} />
            )}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm text-slate-700 leading-relaxed">
          <p className="font-black text-emerald-800 mb-1">Correct Answer: {mcq.correct}</p>
          <p>{mcq.explanation}</p>
        </div>
      )}
    </article>
  );
}

const subjectTableRows = [
  ["General Knowledge", "Most general recruitment tests"],
  ["Pakistan Studies", "General recruitment tests, PMS"],
  ["Current Affairs", "General recruitment tests, PMS"],
  ["Everyday Science", "General recruitment tests"],
  ["English", "Nearly all PPSC written tests, PMS compulsory paper"],
  ["Urdu", "Select posts, PMS-related papers"],
  ["Islamiat", "General recruitment tests"],
  ["Computer Science", "IT and computer-related posts"],
  ["Mathematics", "Technical and select administrative posts"],
  ["Geography", "General recruitment tests, PMS"],
  ["History", "General recruitment tests, PMS"],
  ["Economics", "PMS, administrative posts"],
  ["Political Science", "PMS, administrative posts"],
  ["International Relations", "PMS"],
  ["Law", "Legal and judicial posts"],
  ["Education / Pedagogy", "Teaching and education-department posts"],
  ["Subject-specific professional knowledge", "Lecturer, Subject Specialist, and other specialized posts"],
];

const postExamples = [
  "Assistant — typically general administrative and clerical knowledge",
  "Lecturer — heavily weighted toward subject-specific professional knowledge",
  "Subject Specialist — similar to Lecturer, with deep subject-matter focus",
  "Assistant Professor — subject-specific knowledge at a higher academic level",
  "Tehsildar and related administrative posts — a mix of general knowledge and administrative/legal subjects",
  "Sub Engineer and other technical posts — core engineering/technical knowledge plus general subjects",
  "Computer-related posts — IT and computer science-focused papers",
  "Health and medical posts — subject-specific medical or paramedical knowledge",
  "Agriculture posts — agriculture-specific technical knowledge",
  "Law-related posts — legal knowledge and relevant statutes",
];

const whyPoints = [
  {
    title: "Understand the Question Pattern",
    text: "Past papers show you how PPSC phrases questions for a given subject or post — helpful because question style can differ noticeably from what's found in generic guidebooks.",
  },
  {
    title: "Identify Important Topics",
    text: "Reviewing several papers for the same post or subject often reveals which topics come up repeatedly, helping you prioritize your study time more effectively.",
  },
  {
    title: "Improve Time Management",
    text: "Attempting a full past paper under timed conditions builds a realistic sense of your pace — something that's hard to gauge from studying topic-by-topic.",
  },
  {
    title: "Test Your Preparation",
    text: "A past paper works as an honest checkpoint. It tells you where you actually stand, rather than how prepared you feel.",
  },
  {
    title: "Identify Weak Areas",
    text: "Mistakes on past papers point directly to the subjects or topics that need more attention before your exam.",
  },
  {
    title: "Improve MCQ Accuracy",
    text: "Regular practice with real question formats sharpens your ability to eliminate distractors and manage negative marking, where applicable.",
  },
  {
    title: "Build Exam Confidence",
    text: "Familiarity with the real format — gained through repeated practice — reduces exam-day anxiety and helps you perform closer to your actual preparation level.",
  },
];

const subjectMcqLinks = [
  { label: "General Knowledge MCQs", href: "/category/general-knowledge" },
  { label: "Pakistan Studies MCQs", href: "/category/pak-study" },
  { label: "Islamic Studies MCQs", href: "/category/islamic-studies" },
  { label: "Current Affairs MCQs", href: "/category/pak-current-affairs" },
  { label: "Everyday Science MCQs", href: "/category/everyday-science" },
  { label: "Computer MCQs", href: "/category/computer" },
  { label: "English MCQs", href: "/category/english" },
  { label: "Mathematics MCQs", href: "/category/math" },
];

const prepareSteps = [
  "Check the latest PPSC syllabus for your specific post or exam before you begin",
  "Identify the exact post/exam you're preparing for — PPSC tests vary considerably by post",
  "Collect relevant previous papers matching that post or exam category as closely as possible",
  "Start with recent papers, since they best reflect the current pattern",
  "Attempt papers without checking answers first, to get an honest sense of where you stand",
  "Set a realistic time limit that matches the real exam's duration",
  "Check your answers carefully once you've finished",
  "Record your mistakes in a dedicated notebook or tracker",
  "Identify weak topics based on where errors cluster",
  "Revise those topics before moving on to new material",
  {
    text: "Practice related MCQs regularly to reinforce recall — PakLearners'",
    link: { href: "/mcqs/ppsc", label: "PPSC MCQs" },
    suffix: " section is built for exactly this kind of ongoing practice",
  },
  {
    text: "Take online mock tests closer to your exam date — try PakLearners'",
    link: { href: "/government-exams/ppsc/online-tests", label: "PPSC online tests" },
    suffix: " for a timed, exam-like environment",
  },
  "Repeat the process with additional papers as your preparation progresses",
];

export default function PpscPastPapersPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Past Papers", path: "/past-papers" },
    { name: "PPSC Past Papers" },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href="/government-exams/ppsc"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> PPSC Exam Guide
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            PPSC Past Papers
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            Browse PPSC past papers by exam, post, and subject, practice solved MCQs, and build a
            smart PPSC preparation plan with PakLearners&apos; exam resource hub.
          </p>
          <Link
            href="#ppsc-practice-mcqs"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Practice PPSC MCQs <FaArrowRight size={11} />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <Section id="introduction" title="Introduction">
          <Prose>
            <p>
              If you&apos;re preparing for a <strong className="text-slate-900">Punjab Public Service Commission (PPSC)</strong> examination, working through{" "}
              <strong className="text-slate-900">PPSC past papers</strong> is one of the most reliable ways to understand what a specific test actually expects from you. Past papers show real question patterns, recurring subject areas, and the general difficulty level of previous exams — details that a syllabus notice alone often can&apos;t convey.
            </p>
            <p>
              This page is your starting point for <strong className="text-slate-900">PPSC previous papers</strong>, organized by exam type, post, and subject, so you can move from general searching to a structured preparation plan. PPSC conducts examinations for a very wide range of Punjab government posts — from general recruitment tests to the Provincial Management Service (PMS) / Combined Competitive Examination — and each of these can differ meaningfully in structure. Understanding those differences early saves you from studying the wrong material.
            </p>
            <p>
              It&apos;s worth being clear about one thing upfront: solving old papers doesn&apos;t mean the same questions will reappear. What past papers reliably show you is the <em>pattern</em> — which subjects tend to be tested, how questions are typically phrased, where time pressure usually shows up, and where most candidates lose marks. Used that way, past papers become a genuine diagnostic tool rather than a shortcut to guessing the next exam.
            </p>
            <p>
              Alongside this guide, you&apos;ll find 15 <strong className="text-slate-900">PPSC past paper preparation MCQs</strong>, a practical step-by-step study strategy, and links to related PakLearners resources — including{" "}
              <Link href="/mcqs/ppsc" className="font-bold text-[#1565C0] hover:underline">PPSC MCQs</Link>{" "}
              and{" "}
              <Link href="/government-exams/ppsc/online-tests" className="font-bold text-[#1565C0] hover:underline">PPSC online tests</Link>{" "}
              — so you can build your entire preparation routine in one place.
            </p>
          </Prose>
        </Section>

        <Section id="what-are-ppsc-past-papers" title="What Are PPSC Past Papers?">
          <Prose>
            <p>
              <strong className="text-slate-900">PPSC past papers</strong> are the written-test question papers used in previous examinations conducted by the Punjab Public Service Commission — the provincial body responsible for recruiting candidates into Punjab government departments through both general recruitment tests and structured competitive examinations like PMS.
            </p>
            <p>These papers carry real preparation value because they come from actual exams, not simulated or estimated content. A genuine past paper tells you:</p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "How PPSC typically phrases and structures questions for a given post or exam category",
                "Which topics within a subject have historically received more weight",
                "The approximate difficulty level and time pressure of the real test",
                "How MCQ-based sections are usually organized, given that most PPSC written tests are objective in format",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Practice MCQs, by contrast, are useful for building and testing subject knowledge continuously, but they aren&apos;t the same as an authentic past paper. A well-rounded preparation plan uses both: past papers to understand what the actual exam looks like, and MCQs to reinforce knowledge in between. Throughout this page, we keep this distinction clear — anything called a &quot;past paper&quot; reflects a genuine previous PPSC exam, while anything we&apos;ve written ourselves for practice is labeled accordingly.
          </p>
        </Section>

        <Section id="why-solve-ppsc-past-papers" title="Why Should You Solve PPSC Past Papers?">
          <Prose>
            <p>
              Solving past papers gives your preparation direction instead of leaving you to study everything equally. Here&apos;s specifically how they help:
            </p>
          </Prose>
          <div className="mt-5 space-y-4">
            {whyPoints.map((point) => (
              <article key={point.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
                <h3 className="text-base font-black text-[#1565C0] mb-2">{point.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{point.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="ppsc-past-papers-by-exam" title="PPSC Past Papers by Exam">
          <Prose>
            <p>
              PPSC doesn&apos;t run one uniform exam — it conducts different types of tests depending on the post and department involved. Treating all PPSC papers as interchangeable is a common preparation mistake.
            </p>
          </Prose>
          <div className="mt-5 space-y-6">
            <article className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
              <h3 className="text-base font-black text-[#1565C0] mb-2">PPSC General Recruitment Tests</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                PPSC conducts recruitment examinations for a wide variety of Punjab government posts, and test content varies significantly by post, department, and the syllabus published with each advertisement. Most general recruitment tests are objective, MCQ-based papers, but the exact subject mix — how much weight goes to core/professional knowledge versus general subjects like Pakistan Studies, General Knowledge, and Everyday Science — depends entirely on the post being advertised.{" "}
                <strong className="text-slate-900">Always check the latest official PPSC advertisement and job description</strong>, since PPSC typically defines the exact syllabus and subject weightage for each post individually.
              </p>
            </article>
            <article className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
              <h3 className="text-base font-black text-[#1565C0] mb-2">PMS / Combined Competitive Examination</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The Provincial Management Service (PMS) exam, run through PPSC&apos;s Combined Competitive Examination process, is Punjab&apos;s provincial-level equivalent to a competitive civil-service exam, generally involving multiple stages — a written examination (covering compulsory and, depending on the current structure, optional or general studies-style papers), followed by an interview. Because PMS is a multi-stage, high-competition process, working through previous PMS papers can help candidates understand how compulsory papers like English, Punjabi, Essay, and General Studies have historically been structured.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-3">
                As with general recruitment tests, <strong className="text-slate-900">PMS paper structure, sections, and marks distribution should always be confirmed against the current official PPSC notification and syllabus</strong>, since these details are reviewed periodically. Once you understand your exam&apos;s current structure, you can move on to targeted practice using{" "}
                <Link href="/mcqs/ppsc" className="font-bold text-[#1565C0] hover:underline">PPSC MCQs</Link>{" "}
                and{" "}
                <Link href="/government-exams/ppsc/online-tests" className="font-bold text-[#1565C0] hover:underline">PPSC online tests</Link>{" "}
                on PakLearners.
              </p>
            </article>
          </div>
        </Section>

        <Section id="ppsc-past-papers-by-subject" title="PPSC Past Papers by Subject">
          <Prose>
            <p>
              PPSC examinations draw from a wide pool of subjects, and which ones are relevant to you depends entirely on the specific post and exam you&apos;re targeting. Commonly tested subject areas across PPSC exams include:
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-xl border border-slate-200 mt-4">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  <th className="px-4 py-3 font-black text-xs uppercase tracking-wide">Subject Area</th>
                  <th className="px-4 py-3 font-black text-xs uppercase tracking-wide">Typically Relevant For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {subjectTableRows.map(([subject, relevance]) => (
                  <tr key={subject} className="align-top">
                    <td className="px-4 py-3 font-bold text-slate-900 leading-relaxed">{subject}</td>
                    <td className="px-4 py-3 leading-relaxed">{relevance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            <strong className="text-slate-900">Not every subject applies to every PPSC exam.</strong> For many specialized posts, the bulk of the paper focuses on core professional knowledge related to that post, with a smaller portion covering general subjects. For general administrative posts, the balance often shifts the other way. Treat this table as a map of subject areas across the PPSC ecosystem — always confirm the exact subject weightage for your specific post from the official PPSC job advertisement and syllabus before finalizing your study plan.
          </p>
        </Section>

        <Section id="ppsc-past-papers-by-post" title="PPSC Past Papers for Different Posts">
          <Prose>
            <p>
              One of the most important things to understand about PPSC exams is that they are frequently <strong className="text-slate-900">post-specific</strong>. The same commission conducts tests for a huge range of roles, and each can have a very different paper structure. Examples of posts commonly advertised through PPSC include:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList items={postExamples} />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            These examples illustrate <em>why</em> post-specific preparation matters — they are not a claim that any of these posts follow an identical, fixed pattern. The actual subjects, weightage, and paper format for any post should always be confirmed from that post&apos;s official PPSC advertisement, since patterns can and do vary between advertisements, even for similar-sounding roles.
          </p>
        </Section>

        <Section id="ppsc-past-papers-pdf" title="PPSC Past Papers PDF">
          <Prose>
            <p>
              Many candidates prefer studying past papers in <strong className="text-slate-900">PDF format</strong>, since it supports the kind of focused, offline preparation that competitive-exam study often needs. PDFs are useful for:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Offline preparation — studying without relying on a constant internet connection",
                "Printing — working through a physical copy that feels closer to the real exam",
                "Annotation — marking up questions and highlighting recurring themes",
                "Revision — quickly reviewing key questions before exam day",
                "Timed practice — running a full paper attempt under real time constraints",
                "Building a personal question bank — compiling notes and frequently missed questions in one place",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            As PakLearners&apos; past papers library for PPSC continues to grow, this page will be updated with available papers and formats as they&apos;re published. Where a downloadable resource isn&apos;t yet available for a specific post or exam, treat this page as a guide to what&apos;s coming, rather than assuming a file exists that hasn&apos;t been uploaded yet.
          </p>
        </Section>

        <Section id="solved-vs-unsolved" title="Solved vs Unsolved PPSC Past Papers">
          <Prose>
            <p>PPSC past papers are generally available in two forms, and each plays a different role in preparation.</p>
            <p className="font-bold text-slate-900">Solved papers are useful for:</p>
          </Prose>
          <div className="mt-3">
            <BulletList
              items={[
                "Checking your answers against a reference",
                "Understanding concepts behind questions you got wrong",
                "Identifying recurring mistakes",
                "Focused revision closer to exam day",
              ]}
            />
          </div>
          <Prose>
            <p className="font-bold text-slate-900 mt-4">Unsolved papers are useful for:</p>
          </Prose>
          <div className="mt-3">
            <BulletList
              items={[
                "Honest self-assessment",
                "Timed practice under real conditions",
                "Full exam simulation",
                "Measuring how your preparation is actually progressing",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            A practical approach is to attempt unsolved papers first, under timed conditions, and refer to solved versions only afterward for review. This keeps your practice close to real exam pressure. One important note: unless an answer key is explicitly sourced from or verified against PPSC, treat it as a helpful study aid rather than an official reference — third-party solutions can occasionally contain errors, particularly for subjective or interpretation-heavy questions.
          </p>
        </Section>

        <Section id="how-to-prepare" title="How to Prepare with PPSC Past Papers">
          <Prose>
            <p>
              A structured routine gets significantly more value out of past papers than solving them at random. Here&apos;s a practical sequence to follow:
            </p>
          </Prose>
          <ol className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
            {prepareSteps.map((step, i) => (
              <li key={i}>
                {typeof step === "string" ? (
                  step
                ) : (
                  <>
                    {step.text}{" "}
                    <Link href={step.link.href} className="font-bold text-[#1565C0] hover:underline">
                      {step.link.label}
                    </Link>{" "}
                    {step.suffix}
                  </>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Following this sequence turns past-paper practice from passive reading into an active, diagnostic part of your preparation.
          </p>
        </Section>

        <Section id="how-many-papers" title="How Many PPSC Past Papers Should You Practice?">
          <Prose>
            <p>
              There&apos;s no official, fixed number here — and any resource claiming otherwise is oversimplifying. The right amount depends on:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Exam type — PMS preparation generally benefits from a broader range of papers than a single-post general recruitment test",
                "Post — some posts have very limited past-paper availability, especially newer or highly specialized roles",
                "Syllabus — if the subject weightage for your post has changed recently, older papers may be less representative for those areas",
                "Availability of authentic papers — practice is naturally limited by what genuine papers actually exist for your exam",
                "Time available — a longer preparation timeline allows for more thorough, iterative practice",
                "Your current preparation level — a candidate just starting out may benefit more from fewer, closely reviewed papers than from rushing through many",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            As a general preparation strategy — not an official PPSC requirement — most candidates find it useful to prioritize the <strong className="text-slate-900">most recent and most relevant papers first</strong>, since these best reflect the current pattern for their specific post, and then expand to older papers for broader exposure once the recent pattern feels familiar.
          </p>
        </Section>

        <Section id="ppsc-practice-mcqs" title="15 PPSC Past Paper Preparation MCQs">
          <Prose>
            <p className="text-xs text-slate-500 border-l-4 border-blue-200 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
              The following 15 questions are <strong>original practice MCQs written by PakLearners</strong> for PPSC exam preparation. They are designed to reflect the subject range commonly tested in PPSC exams, but they are <strong>not</strong> official PPSC past-paper questions.
            </p>
            <p>
              Attempt these 15 practice MCQs covering subjects commonly tested in PPSC exams. Try answering each one before checking the correct answer and explanation.
            </p>
          </Prose>
          <div className="mt-6 space-y-5">
            {ppscPastPapersMcqs.map((mcq) => (
              <PracticeMcqCard key={mcq.id} mcq={mcq} />
            ))}
          </div>
        </Section>

        <Section id="online-preparation-resources" title="PPSC Past Papers and Online Preparation Resources">
          <Prose>
            <p>
              Past papers work best as part of a broader, connected preparation routine rather than as a standalone resource. Once you&apos;ve reviewed papers relevant to your specific post or exam, build these habits into your study plan:
            </p>
          </Prose>
          <div className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed">
            <div className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                Practice regularly with subject-organized{" "}
                <Link href="/mcqs/ppsc" className="font-bold text-[#1565C0] hover:underline">PPSC MCQs</Link>{" "}
                to reinforce what past papers reveal about frequently tested topics
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                Use{" "}
                <Link href="/government-exams/ppsc/online-tests" className="font-bold text-[#1565C0] hover:underline">PPSC online tests</Link>{" "}
                to simulate real exam timing and pressure ahead of your test date
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                Read the{" "}
                <Link href="/government-exams/ppsc" className="font-bold text-[#1565C0] hover:underline">PPSC exam guide</Link>{" "}
                for a broader understanding of eligibility, application steps, and the exam process
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                Strengthen individual subjects with dedicated practice —{" "}
                {subjectMcqLinks.map((link, i) => (
                  <span key={link.href}>
                    <Link href={link.href} className="font-bold text-[#1565C0] hover:underline">
                      {link.label}
                    </Link>
                    {i < subjectMcqLinks.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                Explore{" "}
                <Link href="/past-papers" className="font-bold text-[#1565C0] hover:underline">all government exam past papers</Link>{" "}
                if you&apos;re also considering opportunities through FPSC, KPPSC, BPSC, SPSC, or AJKPSC
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                Browse general{" "}
                <Link href="/study-resources" className="font-bold text-[#1565C0] hover:underline">competitive exam study resources</Link>{" "}
                for topics that span multiple Punjab and federal exams
              </span>
            </div>
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Combining authentic past papers with consistent subject-wise MCQ practice and timed mock tests is, by most accounts, the most reliable way to prepare for a PPSC exam — not because any single resource is a shortcut, but because together they build recall, understanding, and exam-day readiness.
          </p>
        </Section>

        <Section id="ppsc-vs-other-commissions" title="PPSC vs Other Public Service Commissions">
          <Prose>
            <p>
              Pakistan has several public service commissions, each responsible for recruitment within its own jurisdiction — including <strong className="text-slate-900">PPSC</strong> (Punjab), <strong className="text-slate-900">FPSC</strong> (federal), <strong className="text-slate-900">KPPSC</strong> (Khyber Pakhtunkhwa), <strong className="text-slate-900">SPSC</strong> (Sindh), <strong className="text-slate-900">BPSC</strong> (Balochistan), and <strong className="text-slate-900">AJKPSC</strong> (Azad Jammu &amp; Kashmir). PPSC specifically focuses on recruitment and competitive examinations for posts within the Government of Punjab, while the other commissions serve their respective provinces or federal departments.
            </p>
            <p>
              If you&apos;re preparing for opportunities across more than one commission, it&apos;s worth treating each one&apos;s syllabus and pattern separately rather than assuming overlap, since subject weightage and exam structure can differ meaningfully between them. You can browse{" "}
              <Link href="/past-papers" className="font-bold text-[#1565C0] hover:underline">past papers for other government exams</Link>{" "}
              on PakLearners to explore preparation resources across all of Pakistan&apos;s major public service commissions in one place.
            </p>
          </Prose>
        </Section>

        <Section id="faq" title="Frequently Asked Questions">
          <div className="space-y-2">
            {ppscPastPapersFaqs.map((faq, i) => {
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

        <section className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl">
          <h2 className="text-xl md:text-2xl font-black mb-4">Start Your PPSC Preparation</h2>
          <p className="text-sm md:text-[15px] text-blue-100/90 leading-relaxed mb-6">
            Working through <strong className="text-white">PPSC past papers</strong> gives your preparation clear, evidence-based direction — showing you how a specific post&apos;s exam is actually structured rather than leaving you to guess. Combine that understanding with regular subject-wise MCQ practice, timed mock tests, and a syllabus you&apos;ve checked against PPSC&apos;s latest official advertisement, and you have a preparation routine built on substance instead of shortcuts.
          </p>
          <p className="text-sm md:text-[15px] text-blue-100/90 leading-relaxed mb-6">
            Continue building your study plan with PakLearners: practice with{" "}
            <Link href="/mcqs/ppsc" className="font-bold text-sky-200 hover:text-white underline">PPSC MCQs</Link>, simulate real exam conditions using{" "}
            <Link href="/government-exams/ppsc/online-tests" className="font-bold text-sky-200 hover:text-white underline">PPSC online tests</Link>, review the full{" "}
            <Link href="/government-exams/ppsc" className="font-bold text-sky-200 hover:text-white underline">PPSC exam guide</Link>, or explore{" "}
            <Link href="/past-papers" className="font-bold text-sky-200 hover:text-white underline">past papers for other government exams</Link> if you&apos;re preparing for more than one commission.
          </p>
          <Link
            href="#ppsc-practice-mcqs"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Practice PPSC MCQs Now <FaArrowRight size={11} />
          </Link>
        </section>
      </div>
    </div>
  );
}
