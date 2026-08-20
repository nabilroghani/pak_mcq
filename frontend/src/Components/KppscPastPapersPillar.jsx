"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { kppscPastPapersFaqs } from "@/data/kppscPastPapersFaqs";

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
    <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
      {children}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-2 items-start">
          <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 mt-4">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-900">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-black text-xs uppercase tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-600">
          {rows.map((row) => (
            <tr key={row[0]} className="align-top">
              {row.map((cell, i) => (
                <td key={`${row[0]}-${i}`} className={`px-4 py-3 leading-relaxed ${i === 0 ? "font-bold text-slate-900" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const yearRows = [
  ["KPPSC Past Papers 2026", "Added as papers become available"],
  ["KPPSC Past Papers 2025", "Added as papers become available"],
  ["KPPSC Past Papers 2024", "Added as papers become available"],
  ["KPPSC Past Papers 2023", "Added as papers become available"],
  ["KPPSC Past Papers 2022", "Added as papers become available"],
  ["KPPSC Past Papers 2021", "Added as papers become available"],
  ["KPPSC Past Papers 2020", "Added as papers become available"],
  ["Older KPPSC Past Papers", "Added as papers become available"],
];

const postCategories = [
  "PMS Past Papers — Provincial Management Service written examination papers.",
  "PMS & AETO Past Papers — combined resources for allied administrative posts.",
  "Civil Judge Past Papers — legal and judicial service examination papers.",
  "DSP Past Papers — Deputy Superintendent of Police recruitment papers.",
  "SI Past Papers — Sub-Inspector recruitment test papers.",
  "ASI Past Papers — Assistant Sub-Inspector recruitment test papers.",
  "Tehsildar / Naib Tehsildar Past Papers — revenue department recruitment papers.",
  "Provincial Planning Service (PPS) Past Papers — planning and development cadre papers.",
  "SST Past Papers — Secondary School Teacher recruitment papers.",
  "Lecturer / Subject Specialist Papers — subject-specific papers for academic posts.",
  "Other KPPSC Recruitment Tests — additional administrative, technical and professional posts advertised by KPPSC from time to time.",
];

const downloadSteps = [
  "Select your KPPSC examination or post from the categories listed on this page.",
  "Select the required year from the available year-wise listings.",
  "Open the available paper to review its format and content.",
  "View or download the PDF if it has been made available for that paper.",
  "Save papers according to subject and year so they're easy to revisit during revision.",
  "Practice them under timed conditions, ideally simulating the actual exam duration.",
];

const preparationSteps = [
  {
    title: "Step 1: Start with the Syllabus",
    text: "Before touching a single past paper, understand which topics are actually relevant to your post. This prevents you from over-focusing on questions that may no longer be part of the current syllabus.",
  },
  {
    title: "Step 2: Solve the Oldest Papers First",
    text: "Starting with older papers and working forward helps you notice which concepts have stayed consistent over time versus which ones were specific to a particular year.",
  },
  {
    title: "Step 3: Analyze Repeated Topics",
    text: "As you go through multiple papers, keep a running list of topics or question types that show up more than once. These deserve extra attention during revision.",
  },
  {
    title: "Step 4: Practice Without Looking at Answers",
    text: "Attempt each paper as if it were the real exam — resist checking answers midway. This builds the actual recall and reasoning skill you'll need on test day.",
  },
  {
    title: "Step 5: Check Mistakes and Build a Notebook",
    text: "After each attempt, go through every wrong answer and note why you got it wrong — whether it was a knowledge gap, a careless mistake, or a misread question.",
  },
  {
    title: "Step 6: Repeat Difficult Questions",
    text: "Revisit questions you got wrong after a few days rather than immediately, using spaced repetition to lock in the correct answer.",
  },
  {
    title: "Step 7: Take Timed Tests",
    text: "As your exam date approaches, shift to full-length, strictly timed attempts to build both speed and composure under pressure.",
  },
];

const benefits = [
  "Understand the real exam pattern instead of guessing.",
  "Identify which topics are tested more frequently for your post.",
  "Improve time management across sections.",
  "Increase question-solving speed through repetition.",
  "Pinpoint weak subjects that need more attention.",
  "Get a realistic sense of question difficulty.",
  "Build genuine confidence going into the test.",
  "Strengthen revision by highlighting recurring concepts.",
  "Practice under conditions close to the actual exam environment.",
];

const commonMistakes = [
  "Memorizing answers without understanding — this fails the moment a question is rephrased even slightly.",
  "Ignoring the syllabus — solving papers without checking whether the topics are still relevant wastes time.",
  "Practicing only one year's paper — a single paper doesn't give a reliable picture of patterns; solve multiple years.",
  "Not timing yourself — untimed practice doesn't prepare you for real exam pressure.",
  "Not reviewing mistakes — skipping the review step means you repeat the same errors later.",
  "Ignoring difficult questions — skipping hard questions instead of understanding them leaves gaps in your preparation.",
  "Using outdated or unverified papers — always confirm that a paper is genuinely relevant to your current post and exam cycle.",
  "Assuming repeated questions are guaranteed — while some concepts recur, KPPSC does not guarantee that exact questions will repeat, so understanding is more valuable than memorization.",
  "Preparing only from past papers — without syllabus coverage, your preparation may be incomplete even if you've solved several papers.",
];

const relatedLinks = [
  { name: "KPPSC exam guide", path: "/government-exams/kppsc" },
  { name: "KPPSC syllabus", path: "/government-exams/kppsc/syllabus" },
  { name: "KPPSC MCQs", path: "/government-exams/kppsc/mcqs" },
  { name: "KPPSC online tests", path: "/government-exams/kppsc/online-test" },
  { name: "Browse KPPSC papers hub", path: "/past-papers/kppsc" },
  { name: "All government exams", path: "/government-exams" },
];

export default function KppscPastPapersPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC", path: "/government-exams/kppsc" },
    { name: "Past Papers" },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href="/government-exams/kppsc"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> KPPSC Exam Guide
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            KPPSC Past Papers 2026 – Previous Papers &amp; PDF Downloads
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            <strong className="text-white">KPPSC past papers</strong> are one of the most valuable
            resources for Khyber Pakhtunkhwa Public Service Commission exam preparation. Solving
            previous papers shows you how questions are phrased, which concepts repeat, and how much
            time you have per question — this page is your resource hub for finding, organizing and
            practicing with papers for your specific post.
          </p>
          <Link
            href="/past-papers/kppsc"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Browse KPPSC Papers Hub <FaArrowRight size={11} />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <Section id="what-are-kppsc-past-papers" title="KPPSC Past Papers">
          <Prose>
            <p>
              KPPSC past papers are the actual (or closely representative) question papers used in
              previous KPPSC written and screening tests. Candidates use them to:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Get familiar with the real question format used by KPPSC, rather than relying on assumptions.",
                "Identify subjects and topics that are tested more frequently for a given post.",
                "Practice under conditions that resemble the real exam.",
                "Build a realistic sense of timing before attempting the actual test.",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Because KPPSC posts vary widely — from general administrative roles to specialized
            technical and subject-specialist positions — past papers should always be selected based
            on the specific post and exam you are appearing for, not just the &quot;KPPSC&quot; label
            in general. A paper from a PMS exam, for example, will look very different from a paper
            for a computer operator or lecturer post.
          </p>
        </Section>

        <Section id="past-papers-by-year" title="KPPSC Past Papers by Year">
          <Prose>
            <p>
              Organizing past papers by year helps candidates track how question patterns have evolved
              and spot topics that appear consistently across multiple years. As papers become
              available on PakLearners, they will be organized under the following structure:
            </p>
          </Prose>
          <DataTable headers={["Year", "Status"]} rows={yearRows} />
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            If you&apos;re checking this page for a specific year&apos;s paper and don&apos;t see it
            listed above yet, it means that particular resource hasn&apos;t been published on
            PakLearners at this time. Rather than searching randomly, focus your preparation on the
            years and posts that are confirmed available, and revisit this page periodically as more
            resources are added.
          </p>
        </Section>

        <Section id="past-papers-by-post" title="KPPSC Past Papers by Post and Exam">
          <Prose>
            <p>
              KPPSC conducts tests for a wide range of posts, and past papers are most useful when
              matched to the exact post you&apos;re applying for. Common categories candidates search
              for include:
            </p>
          </Prose>
          <div className="mt-5 space-y-3">
            {postCategories.map((item) => {
              const [label, ...rest] = item.split(" — ");
              return (
                <div
                  key={item}
                  className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/60 to-white px-4 py-3.5 text-sm text-slate-600 leading-relaxed"
                >
                  <strong className="text-[#1565C0]">{label}</strong>
                  {rest.length > 0 && ` — ${rest.join(" — ")}`}
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Browse available papers for your specific examination rather than assuming every category
            above currently has published resources — this section will expand as more post-wise papers
            are added to PakLearners. If you can&apos;t find your exact post listed, start your
            preparation using the general{" "}
            <Link href="/past-papers/kppsc" className="font-bold text-[#1565C0] hover:underline">
              KPPSC past papers
            </Link>{" "}
            and{" "}
            <Link href="/government-exams/kppsc/mcqs" className="font-bold text-[#1565C0] hover:underline">
              MCQs
            </Link>{" "}
            available, since many general sections (English, General Knowledge, Pakistan Affairs)
            overlap across posts.
          </p>
        </Section>

        <Section id="pms-past-papers" title="KPPSC PMS Past Papers">
          <Prose>
            <p>
              The PMS (Provincial Management Service) exam draws particularly high search interest,
              and for good reason — it&apos;s one of the most competitive and structurally demanding
              KPPSC examinations, typically involving compulsory subjects along with optional subject
              papers chosen by the candidate.
            </p>
            <p>Here&apos;s how PMS candidates should approach past papers specifically:</p>
          </Prose>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed">
            {[
              <>Analyze the <strong className="text-slate-900">compulsory papers first</strong>, since these apply to every PMS candidate and often carry significant weightage.</>,
              <>Use <strong className="text-slate-900">optional-subject papers strategically</strong> — solve past papers only for the optional subjects you&apos;ve actually chosen.</>,
              <>Identify <strong className="text-slate-900">recurring themes</strong> in essay topics, general knowledge questions and subject-specific questions.</>,
              <>Work on <strong className="text-slate-900">answer writing, not just recall</strong> — PMS papers frequently require descriptive answers.</>,
              <>Combine past paper practice with the syllabus — past papers show question style, but the{" "}<Link href="/government-exams/kppsc/syllabus" className="font-bold text-[#1565C0] hover:underline">KPPSC syllabus</Link>{" "}tells you the full range of topics you&apos;re responsible for.</>,
            ].map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Treating PMS preparation as a combination of syllabus coverage, past paper analysis and
            consistent answer-writing practice gives a far more realistic preparation path than relying
            on any one resource alone.
          </p>
        </Section>

        <Section id="download-pdf" title="How to Download KPPSC Past Papers PDF">
          <Prose>
            <p>
              If you&apos;re looking to download and organize KPPSC past papers PDF, follow this
              process:
            </p>
          </Prose>
          <div className="mt-4">
            <ol className="space-y-3 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
              {downloadSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <p className="mt-5 text-sm text-slate-600 leading-relaxed bg-amber-50 border border-amber-100 rounded-xl p-4">
            Not every KPPSC paper is currently available as a downloadable PDF on PakLearners or
            elsewhere — availability depends on which papers have been published and verified. Where a
            PDF isn&apos;t available, use the paper details provided on the page as a study reference
            instead.
          </p>
        </Section>

        <Section id="how-to-use" title="How to Use KPPSC Past Papers for Preparation">
          <Prose>
            <p>
              Solving past papers is only useful if it&apos;s done with a clear method. Here&apos;s a
              step-by-step approach:
            </p>
          </Prose>
          <div className="mt-5 space-y-4">
            {preparationSteps.map((step) => (
              <article key={step.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
                <h3 className="text-base font-black text-[#1565C0] mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="benefits" title="Benefits of Solving KPPSC Past Papers">
          <Prose>
            <p>Consistent past paper practice offers several concrete advantages:</p>
          </Prose>
          <div className="mt-4">
            <BulletList items={benefits} />
          </div>
        </Section>

        <Section id="past-papers-vs-mcqs" title="KPPSC Past Papers vs KPPSC MCQs">
          <Prose>
            <p>Both past papers and MCQs are useful, but they serve different purposes in your preparation:</p>
          </Prose>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5">
              <h3 className="text-base font-black text-emerald-800 mb-3">KPPSC Past Papers</h3>
              <ul className="space-y-2 text-sm text-slate-600 leading-relaxed">
                <li>• Contain actual previous exam questions.</li>
                <li>• Best for understanding real exam style and structure.</li>
                <li>• Help identify recurring concepts and question patterns specific to your post.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
              <h3 className="text-base font-black text-[#1565C0] mb-3">KPPSC MCQs</h3>
              <ul className="space-y-2 text-sm text-slate-600 leading-relaxed">
                <li>• Offer broader, topic-wise practice beyond what past papers alone can cover.</li>
                <li>• Useful for consistent daily preparation and building subject strength.</li>
                <li>• Allow focused revision on individual topics rather than full papers.</li>
              </ul>
            </div>
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            The most effective candidates use both together: past papers to understand exam style and
            recurring themes, and{" "}
            <Link href="/government-exams/kppsc/mcqs" className="font-bold text-[#1565C0] hover:underline">
              KPPSC MCQs
            </Link>{" "}
            for daily, topic-wise practice that keeps every subject fresh. Relying on only one of the
            two usually leaves a gap — either in exam familiarity or in overall subject coverage.
          </p>
        </Section>

        <Section id="past-papers-vs-syllabus" title="KPPSC Past Papers vs KPPSC Syllabus">
          <Prose>
            <p>It&apos;s easy to confuse these two resources, but they answer different questions:</p>
          </Prose>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed">
            {[
              <>Syllabus = <strong className="text-slate-900">what to study.</strong> It defines the full range of subjects and topics relevant to your post.</>,
              <>Past papers = <strong className="text-slate-900">how questions are asked.</strong> They show you the real format, phrasing and difficulty level used in previous exams.</>,
            ].map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Neither resource replaces the other. If you prepare only from past papers, you risk missing
            topics that are part of the syllabus but haven&apos;t appeared in recent papers yet. If you
            prepare only from the syllabus without ever practicing past papers, you may know the content
            but struggle with the actual exam format and timing. Check the{" "}
            <Link href="/government-exams/kppsc/syllabus" className="font-bold text-[#1565C0] hover:underline">
              KPPSC syllabus
            </Link>{" "}
            page first to confirm your subject coverage, then use past papers to sharpen how you apply
            that knowledge under real exam conditions.
          </p>
        </Section>

        <Section id="common-mistakes" title="Common Mistakes When Solving KPPSC Past Papers">
          <Prose>
            <p>Avoid these frequent errors, which reduce the real value of past paper practice:</p>
          </Prose>
          <ol className="mt-4 space-y-2.5 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
            {commonMistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
        </Section>

        <Section id="faq" title="Frequently Asked Questions About KPPSC Past Papers">
          <div className="space-y-2">
            {kppscPastPapersFaqs.map((faq, i) => {
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

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Final Thoughts</h2>
          <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed mb-5">
            KPPSC past papers are one of the most practical tools available for exam preparation, but
            they work best as part of a complete strategy — not as a replacement for understanding the
            syllabus or practicing broader MCQs. Begin by reviewing the{" "}
            <Link href="/government-exams/kppsc/syllabus" className="font-bold text-[#1565C0] hover:underline">
              KPPSC syllabus
            </Link>{" "}
            for your post, work through the relevant past papers by year and exam type, reinforce your
            preparation with{" "}
            <Link href="/government-exams/kppsc/mcqs" className="font-bold text-[#1565C0] hover:underline">
              KPPSC MCQs
            </Link>
            , and test your readiness with{" "}
            <Link href="/government-exams/kppsc/online-test" className="font-bold text-[#1565C0] hover:underline">
              KPPSC online tests
            </Link>
            . For broader guidance on posts, eligibility and test schedules, visit the main{" "}
            <Link href="/government-exams/kppsc" className="font-bold text-[#1565C0] hover:underline">
              KPPSC exam preparation
            </Link>{" "}
            page, or explore PakLearners&apos; wider{" "}
            <Link href="/government-exams" className="font-bold text-[#1565C0] hover:underline">
              government exam preparation
            </Link>{" "}
            resources as you continue building toward your test.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {relatedLinks.map((link) => (
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
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 mb-3">
            <span>
              <strong className="text-slate-900">Written By:</strong> PakLearners Editorial Team
            </span>
            <span>
              <strong className="text-slate-900">Last Updated:</strong> August 2026
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            This page is maintained as an educational resource hub. Paper availability, formats and
            post-specific details should always be verified against official KPPSC advertisements and
            published materials.
          </p>
        </section>
      </div>
    </div>
  );
}
