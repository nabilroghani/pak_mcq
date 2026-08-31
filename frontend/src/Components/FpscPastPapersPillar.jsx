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
import { fpscPastPapersMcqs } from "@/data/fpscPastPapersMcqs";
import { fpscPastPapersFaqs } from "@/data/fpscPastPapersFaqs";

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
  ["English (Essay, Precis & Composition)", "CSS compulsory papers"],
  ["General Science & Ability", "CSS compulsory paper"],
  ["Current Affairs", "CSS compulsory paper, many recruitment tests"],
  ["Pakistan Affairs", "CSS compulsory paper, many recruitment tests"],
  ["Islamic Studies / Comparative Religions", "CSS compulsory paper"],
  ["General Knowledge", "Recruitment tests, general ability sections"],
  ["International Affairs & Relations", "CSS optional, some recruitment tests"],
  ["Everyday Science", "Recruitment tests, general knowledge sections"],
  ["Computer Science / IT", "Post-specific recruitment tests"],
  ["Mathematics & Statistics", "CSS optional group, technical posts"],
  ["Economics", "CSS optional group"],
  ["Political Science", "CSS optional group"],
  ["History", "CSS optional group"],
  ["Geography", "CSS optional group"],
  ["Law", "CSS optional group, legal posts"],
];

const prepareSteps = [
  "Understand the latest syllabus for your specific exam before you start solving anything",
  "Collect relevant papers for your exact exam and, where applicable, your chosen optional subjects",
  "Start with recent papers — they best reflect the current pattern",
  "Attempt papers without looking at answers, to get an honest read on where you stand",
  "Use a timer to build real exam-pace habits",
  "Check your answers carefully once you've finished",
  "Record your mistakes in a dedicated notebook or tracker",
  "Identify weak subjects based on where mistakes cluster",
  "Revise weak areas before moving to new material",
  {
    text: "Practice MCQs regularly to reinforce recall between full paper attempts — PakLearners'",
    link: { href: "/mcqs/fpsc", label: "FPSC MCQs" },
    suffix: " section is built for exactly this",
  },
  "Repeat older papers once you've covered the syllabus, to test retention",
  {
    text: "Take mock tests closer to your exam date to simulate real conditions — try PakLearners'",
    link: { href: "/government-exams/fpsc/online-tests", label: "FPSC online tests" },
    suffix: " for a timed, exam-like environment",
  },
];

export default function FpscPastPapersPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Past Papers", path: "/past-papers" },
    { name: "FPSC Past Papers" },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href="/government-exams/fpsc"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> FPSC Exam Guide
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            FPSC Past Papers
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            Browse FPSC past papers by exam and subject, practice solved MCQs, and build a smart
            CSS/FPSC preparation plan with PakLearners&apos; exam resource hub.
          </p>
          <Link
            href="#fpsc-practice-mcqs"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Practice FPSC MCQs <FaArrowRight size={11} />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <Section id="introduction" title="Introduction">
          <Prose>
            <p>
              If you&apos;re preparing for a <strong className="text-slate-900">Federal Public Service Commission (FPSC)</strong> examination, working through{" "}
              <strong className="text-slate-900">FPSC past papers</strong> is one of the most effective ways to understand what an exam actually expects from you. Past papers show you real question styles, recurring topics, and the general difficulty level of previous tests — insight you simply can&apos;t get from a syllabus document alone.
            </p>
            <p>
              This page is your starting point for <strong className="text-slate-900">FPSC previous papers</strong>, organized by exam and by subject, so you can move from &quot;I don&apos;t know where to start&quot; to a structured preparation plan. Whether you&apos;re targeting the <strong className="text-slate-900">CSS Competitive Examination</strong> or a general FPSC recruitment test, you&apos;ll find guidance here on how to source relevant papers, how to tell solved and unsolved papers apart, and how to use them alongside practice MCQs and mock tests.
            </p>
            <p>
              It&apos;s worth being upfront about one thing: solving old papers does not mean the same questions will repeat. What past papers <em>do</em> reliably show you is the pattern — which subjects get tested, how questions are typically phrased, and where most candidates tend to lose marks. Used that way, they become a diagnostic tool rather than a shortcut.
            </p>
            <p>
              As you go through this page, you&apos;ll also find a set of <strong className="text-slate-900">FPSC past paper preparation MCQs</strong>, a practical step-by-step study strategy, and links to related PakLearners resources — including{" "}
              <Link href="/mcqs/fpsc" className="font-bold text-[#1565C0] hover:underline">FPSC MCQs</Link>{" "}
              and{" "}
              <Link href="/government-exams/fpsc/online-tests" className="font-bold text-[#1565C0] hover:underline">FPSC online tests</Link>{" "}
              — so you can keep building your preparation in one place.
            </p>
          </Prose>
        </Section>

        <Section id="what-are-fpsc-past-papers" title="What Are FPSC Past Papers?">
          <Prose>
            <p>
              <strong className="text-slate-900">FPSC past papers</strong> are the question papers used in previous examinations conducted by the Federal Public Service Commission, Pakistan&apos;s central recruiting body for federal government positions, including the CSS Competitive Examination and various general recruitment tests.
            </p>
            <p>
              These papers matter for a simple reason: they are drawn from actual exams, not estimated or generated content. That authenticity is what separates a genuine past paper from a random practice question bank. A past paper tells you:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "How FPSC actually phrases and structures its questions",
                "Which topics within a subject have historically been emphasized",
                "The approximate difficulty and depth expected at the exam level",
                "How much time candidates typically need per section",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Practice MCQs, by comparison, are useful for building subject knowledge and testing recall, but they are not a substitute for the real thing. A strong preparation plan uses both: past papers to understand the exam itself, and MCQs to reinforce and test subject knowledge continuously. On this page, we&apos;re careful to separate the two — anything labeled a &quot;past paper&quot; reflects a genuine previous exam, while material we&apos;ve written ourselves for practice is always labeled as such.
          </p>
        </Section>

        <Section id="why-fpsc-past-papers-matter" title="Why Are FPSC Past Papers Important?">
          <Prose>
            <p>
              Working through previous papers gives your preparation direction instead of leaving you to guess what to study. Specifically, past papers help you:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Identify recurring themes within subjects like Pakistan Affairs, Current Affairs, or General Science & Ability",
                "Gauge the exam's actual difficulty, rather than relying on assumptions from textbooks",
                "Practice time management by simulating real exam conditions",
                "Spot your weak areas early enough to still fix them before the exam",
                "Understand answer expectations — especially for subjective papers like Essay or Precis, where structure and presentation matter as much as content",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            None of this guarantees repeated questions or predicts the next paper. What it does is make your preparation evidence-based instead of guesswork-based — which, over months of study, adds up to a meaningful advantage.
          </p>
        </Section>

        <Section id="fpsc-past-papers-by-exam" title="FPSC Past Papers by Exam">
          <Prose>
            <p>
              FPSC conducts more than one type of examination, and it&apos;s important not to treat them as interchangeable. Past papers are only useful when they&apos;re relevant to the specific exam and post you&apos;re preparing for.
            </p>
          </Prose>
          <div className="mt-5 space-y-6">
            <article className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
              <h3 className="text-base font-black text-[#1565C0] mb-2">CSS Competitive Examination</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The CSS exam is FPSC&apos;s flagship competitive examination for recruiting officers into Pakistan&apos;s central superior services. Because it tests a fixed set of compulsory subjects plus subject-specific optional papers, CSS past papers are especially useful for understanding how each paper is typically structured — for example, how an Essay paper&apos;s prompts are framed, or the type of passages used in Precis &amp; Composition. See the dedicated{" "}
                <a href="#css-past-papers" className="font-bold text-[#1565C0] hover:underline">CSS Past Papers</a>{" "}
                section below for more detail.
              </p>
            </article>
            <article className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
              <h3 className="text-base font-black text-[#1565C0] mb-2">FPSC General Recruitment Tests</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Beyond CSS, FPSC also conducts recruitment tests for a wide range of federal government posts, from clerical and administrative roles to specialized technical positions. These tests vary considerably from post to post — different posts can have entirely different subjects, question formats, and marking schemes. If you&apos;re preparing for a general recruitment test, don&apos;t assume it follows the same pattern as CSS or as another post&apos;s test.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mt-3">
                Because format and syllabus can differ significantly between advertisements, <strong className="text-slate-900">always check the latest official FPSC advertisement and syllabus for your specific exam</strong> before relying on any single set of past papers. Once you know your test structure, you can browse{" "}
                <Link href="/mcqs/fpsc" className="font-bold text-[#1565C0] hover:underline">FPSC MCQs</Link>{" "}
                and{" "}
                <Link href="/government-exams/fpsc/online-tests" className="font-bold text-[#1565C0] hover:underline">FPSC online tests</Link>{" "}
                on PakLearners to practice in a format close to the real exam.
              </p>
            </article>
          </div>
        </Section>

        <Section id="fpsc-past-papers-by-subject" title="FPSC Past Papers by Subject">
          <Prose>
            <p>
              FPSC examinations draw on a broad range of subjects, and which ones apply to you depends entirely on the exam and post you&apos;re targeting. Common subject areas across FPSC exams include:
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
            <strong className="text-slate-900">Not every subject applies to every exam.</strong> CSS candidates choose optional subjects from defined subject groups, while general recruitment tests are built around the requirements of the specific post being advertised. Treat this table as a map of subject areas across the FPSC ecosystem, not a checklist you need to complete in full. For CSS specifically, the current subject groupings and marks distribution are explained in the section below — but always cross-check against the official FPSC syllabus before finalizing your subject choices.
          </p>
        </Section>

        <Section id="css-past-papers" title="CSS Past Papers">
          <Prose>
            <p>
              The CSS Competitive Examination is conducted annually by FPSC and remains one of Pakistan&apos;s most competitive recruitment processes. Reviewing previous CSS papers is a standard part of preparation because the exam&apos;s compulsory-subject structure has stayed broadly consistent over recent years, which makes pattern analysis genuinely useful.
            </p>
            <p>CSS candidates generally prepare across two categories of papers:</p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Compulsory subjects — including English Essay, English Precis & Composition, General Science & Ability, Current Affairs, Pakistan Affairs, and Islamic Studies (or Comparative Study of Major Religions for non-Muslim candidates). These are required of every CSS candidate regardless of their optional subject choices.",
                "Optional subjects — chosen from defined subject groups such as literature and languages, social sciences, commerce, natural sciences and mathematics, and law, among others. Group rules (such as how many subjects can be picked from a single group) apply and should always be confirmed from the current FPSC syllabus.",
              ]}
            />
          </div>
          <Prose>
            <p className="mt-4">Past papers for each of these subjects can help you understand:</p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "How Essay prompts have historically been framed, and what breadth of topics has come up",
                "The type of passages and comprehension tasks used in Precis & Composition",
                "Which sub-topics within Current Affairs and Pakistan Affairs are asked about most often",
                "How optional-subject papers in your chosen group are typically structured",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed border-l-4 border-amber-400 pl-4 py-2 bg-amber-50/50 rounded-r-lg">
            <strong>We won&apos;t invent specific marks distributions, paper counts, or rule details on this page</strong>, because these details are exactly the kind of thing FPSC periodically reviews. Candidates should check the latest FPSC advertisement and CSS syllabus for the current compulsory and optional subject structure, marks weightage, and group-selection rules before building a final study plan.
          </p>
        </Section>

        <Section id="fpsc-past-papers-pdf" title="FPSC Past Papers PDF">
          <Prose>
            <p>
              Many candidates prefer working through past papers in <strong className="text-slate-900">PDF format</strong> because it supports the kind of focused, offline study that a lot of exam preparation benefits from. PDFs are useful for:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Offline revision — studying without needing an internet connection",
                "Printing — working through a physical copy, closer to real exam conditions",
                "Annotation — marking up questions, noting mistakes, and highlighting recurring themes",
                "Repeated practice — attempting the same paper more than once to track improvement",
                "Building personal notes — extracting key facts and structuring your own revision material",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            As PakLearners&apos; past papers library grows, this page will continue to be updated with available papers and formats for FPSC exams. Where a downloadable resource isn&apos;t yet available for a particular exam or subject, treat this page as a guide to what&apos;s coming and how to structure your search elsewhere in the meantime — rather than assuming a download exists that hasn&apos;t been published.
          </p>
        </Section>

        <Section id="solved-vs-unsolved" title="Solved vs Unsolved FPSC Past Papers">
          <Prose>
            <p>Past papers are generally available in two forms, and each serves a different purpose in your preparation.</p>
            <p className="font-bold text-slate-900">Unsolved papers are best used for:</p>
          </Prose>
          <div className="mt-3">
            <BulletList
              items={[
                "Self-testing under real conditions",
                "Timed practice that mirrors the actual exam",
                "Full exam simulation, ideally closer to your test date",
              ]}
            />
          </div>
          <Prose>
            <p className="font-bold text-slate-900 mt-4">Solved papers are best used for:</p>
          </Prose>
          <div className="mt-3">
            <BulletList
              items={[
                "Checking your answers against a reference",
                "Understanding where and why you went wrong",
                "Reinforcing concepts during revision",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            A sensible approach is to attempt unsolved papers first, under timed conditions, and only refer to solved versions afterward to review your performance. This keeps your practice honest and closer to what the real exam will feel like. One caution: unless a solved paper is explicitly sourced from or verified against FPSC, treat the answer key as a study aid rather than an official reference — third-party answer keys can occasionally contain errors, particularly on subjective or interpretation-based questions.
          </p>
        </Section>

        <Section id="how-to-prepare" title="How to Prepare with FPSC Past Papers">
          <Prose>
            <p>
              A structured approach gets far more value out of past papers than solving them randomly. Here&apos;s a practical sequence to follow:
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
            Following this sequence turns past papers from a passive reading exercise into an active diagnostic tool — which is where most of their real value lies.
          </p>
        </Section>

        <Section id="how-many-years" title="How Many Years of FPSC Past Papers Should You Solve?">
          <Prose>
            <p>
              There&apos;s no single correct number here, and any source that gives you one universal figure without context is oversimplifying. The right range depends on:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "The exam type — CSS preparation typically benefits from a wider historical range than a single-post recruitment test",
                "The specific post — some posts have limited past-paper availability",
                "Syllabus changes — if a subject's syllabus has recently changed, older papers may be less relevant for those changed topics",
                "Time available — a candidate with eight months to prepare can reasonably cover more papers than one with eight weeks",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            As a general preparation strategy — not an official FPSC requirement — most candidates find it useful to prioritize the <strong className="text-slate-900">most recent 3–5 years of papers first</strong>, since these best reflect the current pattern, and then expand into older papers for broader exposure once the recent pattern is well understood. Treat this as a starting framework to adjust based on your own timeline and the papers actually available to you, not a fixed rule.
          </p>
        </Section>

        <Section id="fpsc-practice-mcqs" title="FPSC Past Paper Preparation – 15 Practice MCQs">
          <Prose>
            <p className="text-xs text-slate-500 border-l-4 border-blue-200 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
              The following 15 questions are <strong>original practice MCQs written by PakLearners</strong> for FPSC exam preparation. They are designed to reflect the style and subject range of FPSC-related exams, but they are <strong>not</strong> official FPSC past-paper questions.
            </p>
            <p>
              Attempt these 15 practice MCQs, covering a mix of subjects relevant to FPSC preparation. Try answering each one before checking the correct answer and explanation.
            </p>
          </Prose>
          <div className="mt-6 space-y-5">
            {fpscPastPapersMcqs.map((mcq) => (
              <PracticeMcqCard key={mcq.id} mcq={mcq} />
            ))}
          </div>
        </Section>

        <Section id="online-preparation-resources" title="FPSC Past Papers and Online Preparation Resources">
          <Prose>
            <p>
              Past papers work best as part of a broader preparation routine rather than as a standalone resource. Once you&apos;ve reviewed the papers relevant to your exam, build these habits into your study plan:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                <>Practice regularly with subject-organized <Link href="/mcqs/fpsc" className="font-bold text-[#1565C0] hover:underline">FPSC MCQs</Link> to reinforce what past papers reveal about frequently tested topics</>,
                <>Use <Link href="/government-exams/fpsc/online-tests" className="font-bold text-[#1565C0] hover:underline">FPSC online tests</Link> to simulate real exam timing and pressure before your test date</>,
                <>Read the <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">FPSC exam guide</Link> for a broader understanding of eligibility, application steps, and exam stages</>,
                <>Explore <Link href="/past-papers" className="font-bold text-[#1565C0] hover:underline">government exam past papers</Link> across other commissions if you&apos;re also considering PPSC, KPPSC, BPSC, SPSC, or AJKPSC opportunities</>,
                <>Browse general <Link href="/study-resources" className="font-bold text-[#1565C0] hover:underline">competitive exam study resources</Link> to support subjects that span multiple exams, like Current Affairs or English</>,
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Combining authentic past papers with consistent MCQ practice and timed mock tests is, by most accounts, the most reliable way to prepare for an FPSC exam — not because any one resource is a shortcut, but because together they cover recall, understanding, and exam-day readiness.
          </p>
        </Section>

        <Section id="faq" title="Frequently Asked Questions">
          <div className="space-y-2">
            {fpscPastPapersFaqs.map((faq, i) => {
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
          <h2 className="text-xl md:text-2xl font-black mb-4">Start Your FPSC Preparation</h2>
          <p className="text-sm md:text-[15px] text-blue-100/90 leading-relaxed mb-6">
            Working through <strong className="text-white">FPSC past papers</strong> gives your preparation a clear, evidence-based direction — showing you how exams are actually structured instead of leaving you to guess. Combine that understanding with regular MCQ practice, timed mock tests, and a syllabus you check against FPSC&apos;s latest official advertisement, and you have a preparation routine built on substance rather than shortcuts.
          </p>
          <p className="text-sm md:text-[15px] text-blue-100/90 leading-relaxed mb-6">
            Continue building your study plan with PakLearners: practice with{" "}
            <Link href="/mcqs/fpsc" className="font-bold text-sky-200 hover:text-white underline">FPSC MCQs</Link>, simulate real exam conditions using{" "}
            <Link href="/government-exams/fpsc/online-tests" className="font-bold text-sky-200 hover:text-white underline">FPSC online tests</Link>, review the full{" "}
            <Link href="/government-exams/fpsc" className="font-bold text-sky-200 hover:text-white underline">FPSC exam guide</Link>, or explore{" "}
            <Link href="/past-papers" className="font-bold text-sky-200 hover:text-white underline">past papers for other government exams</Link> if you&apos;re preparing for more than one commission.
          </p>
          <Link
            href="#fpsc-practice-mcqs"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Practice FPSC MCQs Now <FaArrowRight size={11} />
          </Link>
        </section>
      </div>
    </div>
  );
}
