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
import { kppscPastPapersMcqs } from "@/data/kppscPastPapersMcqs";
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
  ["English", "Most KPPSC written tests, PMS"],
  ["English Essay", "PMS and select competitive exams"],
  ["English Precis & Composition", "PMS and select competitive exams"],
  ["Pakistan Affairs", "General recruitment tests, PMS"],
  ["Current Affairs", "General recruitment tests, PMS"],
  ["General Knowledge", "Most KPPSC written tests"],
  ["Everyday Science", "General recruitment tests"],
  ["Islamic Studies", "General recruitment tests, PMS"],
  ["General Science", "General recruitment tests"],
  ["Mathematics", "General recruitment tests, technical posts"],
  ["Computer Science / IT", "IT and computer-related posts"],
  ["Geography", "General recruitment tests, PMS"],
  ["History", "General recruitment tests, PMS"],
  ["Economics", "PMS, Provincial Planning Service"],
  ["Political Science", "PMS"],
  ["International Relations", "PMS"],
  ["Law", "Judicial branch posts, legal posts"],
  ["Urdu", "Select posts"],
  ["Subject-specific professional knowledge", "Lecturer, Subject Specialist, and other specialized posts"],
];

const postExamples = [
  "PMS — KPPSC's flagship provincial competitive examination",
  "AETO — Assistant Educational Training Officer, involving education-department knowledge",
  "Assistant — general administrative and clerical knowledge",
  "Lecturer — heavily weighted toward subject-specific academic knowledge",
  "Subject Specialist — similar to Lecturer, with deep subject-matter focus",
  "ASI / SI / DSP — police department posts with a mix of general and post-specific content",
  "Tehsildar / Naib Tehsildar — administrative and revenue-related knowledge",
  "Civil Judge — judicial branch posts with dedicated legal subject matter",
  "Provincial Planning Service — planning, economics, and administration-related knowledge",
  "Other technical/professional posts — subject matter specific to the relevant department or field",
];

const whyPoints = [
  {
    title: "Understand the Question Pattern",
    text: "Past papers show you how KPPSC phrases questions for a given subject or post, which can differ noticeably from what's found in generic guidebooks.",
  },
  {
    title: "Identify Important Topics",
    text: "Reviewing multiple papers for the same post or exam often reveals which topics recur, helping you prioritize your study time more effectively.",
  },
  {
    title: "Improve Time Management",
    text: "Attempting a full past paper under timed conditions builds a realistic sense of pace — something that's difficult to gauge from studying topic-by-topic.",
  },
  {
    title: "Test Your Preparation",
    text: "A past paper works as an honest checkpoint, telling you where you actually stand rather than how prepared you feel.",
  },
  {
    title: "Find Weak Areas",
    text: "Mistakes on past papers point directly to the subjects or topics that need more attention before your exam.",
  },
  {
    title: "Improve MCQ Accuracy",
    text: "Regular practice with real question formats sharpens your ability to eliminate distractors and work within time and marking constraints.",
  },
  {
    title: "Build Exam Confidence",
    text: "Familiarity with the real format — built through repeated practice — reduces exam-day anxiety and helps you perform closer to your actual preparation level.",
  },
];

const examCategories = [
  {
    title: "PMS Past Papers",
    content: (
      <>
        The Provincial Management Service (PMS) exam is KPPSC&apos;s flagship competitive examination, recruiting officers for administrative positions within the province — broadly comparable in prestige to CSS at the federal level, but structured provincially. Reviewing previous PMS papers can help candidates understand subject requirements, typical question style, and recurring themes across compulsory and, where applicable, subject-specific papers. See the dedicated{" "}
        <Link href="#kppsc-pms-past-papers" className="font-bold text-[#1565C0] hover:underline">
          KPPSC PMS Past Papers
        </Link>{" "}
        section below for a fuller breakdown.
      </>
    ),
  },
  {
    title: "PMS & AETO Past Papers",
    content:
      "Some KPPSC competitive processes, such as PMS and AETO (Assistant Educational Training Officer)-related recruitment, may involve a screening stage ahead of the main examination. Where a screening test applies, it typically uses an objective, MCQ-based format to shortlist candidates before the main written exam. The exact structure, qualifying criteria, and current status of any screening stage should always be confirmed from the official KPPSC syllabus and the relevant advertisement, since these details are reviewed periodically.",
  },
  {
    title: "Civil Judge / Judicial Branch Past Papers",
    content:
      "KPPSC also conducts examinations for judicial branch posts, such as Civil Judge. These examinations have their own dedicated syllabus and subject requirements, distinct from general KPPSC recruitment tests, and typically involve legal knowledge and subject areas specific to the judiciary. Candidates preparing for judicial posts should treat this as a separate preparation track rather than assuming overlap with general or PMS-style papers.",
  },
  {
    title: "ASI / Police-Related Past Papers",
    content:
      "KPPSC conducts recruitment examinations for various police department posts, including Assistant Sub Inspector (ASI), Sub Inspector (SI), and Deputy Superintendent of Police (DSP). Previous papers for these posts can be useful for understanding the general knowledge and post-specific content typically tested, though patterns are not identical across ranks — an ASI paper and a DSP paper, for instance, are unlikely to share the same weightage or depth. Always match your practice material to your specific post and advertisement.",
  },
  {
    title: "Tehsildar / Naib Tehsildar Past Papers",
    content:
      "Tehsildar and Naib Tehsildar are administrative posts commonly recruited through KPPSC, generally involving a mix of general knowledge, administrative, and revenue-related subject matter. Previous papers for these posts can help candidates understand the balance between general and administrative content typically tested.",
  },
  {
    title: "Provincial Planning Service (PPS) Past Papers",
    content:
      "The Provincial Planning Service is another competitive stream under KPPSC, generally involving subject matter related to planning, economics, and administration. As with other specialized services, candidates should review the current official syllabus for PPS separately rather than assuming it mirrors PMS or general recruitment patterns.",
  },
  {
    title: "Other KPPSC Competitive / Recruitment Papers",
    content:
      "Beyond the categories above, KPPSC advertises a wide variety of additional posts across departments, each with its own syllabus and paper requirements as defined in that post's official advertisement. Paper requirements vary by advertisement, post, and syllabus — always check the latest official KPPSC notification for your specific exam rather than relying on a paper written for a different post. KPPSC also maintains its own past-paper archive, organized across multiple years and exam categories, including PMS, Civil Judge, ASI, Tehsildar/Naib Tehsildar, PPS, and police-related papers. That archive is a useful reference point for confirming which categories and years of papers exist for your target exam.",
  },
];

const pmsPrepPoints = [
  "Understand the process structure. PMS preparation often involves more than one stage — commonly a screening stage ahead of a main written examination — so it helps to know which stage a given past paper belongs to before studying it.",
  "Analyze previous papers by section. Reviewing past papers for compulsory subjects (where applicable) alongside any subject-specific or optional components helps you see how each is typically weighted and worded.",
  "Identify recurring themes. Subjects like Current Affairs and Pakistan/KP Affairs tend to evolve with real-world events, so past papers combined with recent news coverage give a more complete picture than papers alone.",
  "Practice compulsory subjects methodically. Where compulsory subjects apply, work through past questions subject by subject rather than jumping between topics randomly.",
  "Prepare optional or subject-specific components carefully, since these often carry meaningful weight and reward deeper subject knowledge.",
  "Combine past papers with current affairs and personal notes. Static portions of the syllabus stay relatively stable, but current affairs content needs continuous updating alongside past-paper review.",
  "Use past papers for answer-writing practice, particularly for any descriptive or essay-type components, where structure and clarity matter as much as content.",
];

const prepareSteps = [
  "Identify the exact KPPSC exam/post you're preparing for — PMS, a general recruitment test, and a judicial or police post all require different preparation",
  "Check the latest official syllabus for that specific exam before you begin",
  "Collect relevant past papers matching that exam or post as closely as possible",
  "Start with recent papers, since they best reflect the current pattern",
  "Attempt papers without checking answers first, to get an honest sense of where you stand",
  "Use a timer that matches the real exam's duration",
  "Check your answers carefully once you've finished",
  "Record your mistakes in a dedicated notebook or tracker",
  "Identify weak topics based on where errors cluster",
  "Revise those topics before moving on to new material",
  {
    text: "Practice related MCQs regularly to reinforce recall — PakLearners'",
    link: { href: "/mcqs/kppsc", label: "KPPSC MCQs" },
    suffix: " section is built for exactly this kind of ongoing practice",
  },
  {
    text: "Take mock/online tests closer to your exam date — try PakLearners'",
    link: { href: "/government-exams/kppsc/online-tests", label: "KPPSC online tests" },
    suffix: ", or the dedicated",
    link2: { href: "/government-exams/kppsc/online-tests/pms", label: "PMS online tests" },
    suffix2: " if you're preparing for PMS specifically",
  },
  "Re-attempt difficult papers once you've addressed the gaps they revealed",
  "Track improvement over time so you can see which areas are genuinely strengthening",
];

export default function KppscPastPapersPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Past Papers", path: "/past-papers" },
    { name: "KPPSC Past Papers" },
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
            KPPSC Past Papers
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            Browse KPPSC past papers by exam, post, and subject — including PMS — practice solved MCQs, and build a
            smart KPPSC preparation plan with PakLearners.
          </p>
          <Link
            href="#kppsc-practice-mcqs"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Practice KPPSC MCQs <FaArrowRight size={11} />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <Section id="introduction" title="Introduction">
          <Prose>
            <p>
              If you&apos;re preparing for an exam conducted by the{" "}
              <strong className="text-slate-900">Khyber Pakhtunkhwa Public Service Commission (KPPSC)</strong>, working through{" "}
              <strong className="text-slate-900">KPPSC past papers</strong> is one of the most reliable ways to understand what your specific test actually looks like. Past papers show real question patterns, recurring subject areas, and the general difficulty of previous exams — details that a syllabus notification alone often can&apos;t fully convey.
            </p>
            <p>
              This page is your starting point for <strong className="text-slate-900">KPPSC previous papers</strong>, covering the range of examinations KPPSC conducts — from the Provincial Management Service (PMS) competitive exam to police-related recruitment tests, judicial branch exams, and general administrative posts like Tehsildar and Naib Tehsildar. Because KPPSC&apos;s paper structure can vary considerably depending on the exam and post, understanding which category you fall into is the first step toward focused preparation.
            </p>
            <p>
              It&apos;s worth being upfront about one thing: solving old papers doesn&apos;t mean the same questions will reappear. What past papers reliably show you is the <em>pattern</em> — which subjects tend to be tested, how questions are typically worded, where time pressure usually shows up, and where candidates commonly lose marks. Used that way, past papers become a genuine diagnostic tool rather than a shortcut to predicting the next exam.
            </p>
            <p>
              Alongside this guide, you&apos;ll find 15 <strong className="text-slate-900">KPPSC past paper preparation MCQs</strong>, a dedicated section on PMS preparation, a practical study strategy, and links to related PakLearners resources — including{" "}
              <Link href="/mcqs/kppsc" className="font-bold text-[#1565C0] hover:underline">KPPSC MCQs</Link>,{" "}
              <Link href="/government-exams/kppsc/online-tests" className="font-bold text-[#1565C0] hover:underline">KPPSC online tests</Link>, and{" "}
              <Link href="/government-exams/kppsc/online-tests/pms" className="font-bold text-[#1565C0] hover:underline">PMS online tests</Link>{" "}
              — so you can build your entire preparation routine in one place.
            </p>
          </Prose>
        </Section>

        <Section id="what-are-kppsc-past-papers" title="What Are KPPSC Past Papers?">
          <Prose>
            <p>
              <strong className="text-slate-900">KPPSC past papers</strong> are the written-test question papers used in previous examinations conducted by the Khyber Pakhtunkhwa Public Service Commission — the provincial body responsible for recruiting candidates into KP government departments through both competitive examinations, such as PMS, and general recruitment tests for a wide range of posts.
            </p>
            <p>These papers carry real preparation value because they come from actual exams, not simulated or estimated content. A genuine past paper tells you:</p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "How KPPSC typically phrases and structures questions for a given post or exam category",
                "Which topics within a subject have historically received more emphasis",
                "The approximate difficulty level and time pressure of the real test",
                "How the compulsory and post-specific portions of a paper are usually balanced",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Practice MCQs, by contrast, are useful for building and testing subject knowledge continuously, but they are not the same as an authentic past paper. A well-rounded preparation plan uses both: past papers to understand the real exam, and MCQs to reinforce knowledge in between. Throughout this page, we keep the distinction clear — anything called a &quot;past paper&quot; reflects a genuine previous KPPSC exam, while anything written by PakLearners for practice is labeled accordingly.
          </p>
        </Section>

        <Section id="why-solve-kppsc-past-papers" title="Why Should You Solve KPPSC Past Papers?">
          <Prose>
            <p>
              Solving past papers gives your preparation direction instead of leaving you to study everything with equal weight. Here&apos;s specifically how they help:
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

        <Section id="kppsc-past-papers-by-exam" title="KPPSC Past Papers by Exam">
          <Prose>
            <p>
              KPPSC doesn&apos;t run one uniform test — it conducts a wide range of examinations across different services and posts within Khyber Pakhtunkhwa. Treating all KPPSC papers as interchangeable is a common preparation mistake, so it&apos;s worth understanding the main categories.
            </p>
          </Prose>
          <div className="mt-5 space-y-6">
            {examCategories.map((cat) => (
              <article key={cat.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
                <h3 className="text-base font-black text-[#1565C0] mb-2">{cat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{cat.content}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="kppsc-past-papers-by-subject" title="KPPSC Past Papers by Subject">
          <Prose>
            <p>
              KPPSC examinations draw from a range of subjects, and which ones matter to you depends entirely on the specific exam and post you&apos;re targeting. Commonly tested subject areas across KPPSC exams include:
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
            <strong className="text-slate-900">Not every subject applies to every KPPSC examination.</strong> Subjects depend on the specific examination, post, advertisement, and official syllabus — a general recruitment test for an administrative post typically draws on a compulsory core of general subjects, while specialized posts like Lecturer or judicial roles weigh subject-specific knowledge much more heavily. Always confirm the exact subject mix for your post from the official KPPSC advertisement and syllabus before building your study plan.
          </p>
        </Section>

        <Section id="kppsc-pms-past-papers" title="KPPSC PMS Past Papers">
          <Prose>
            <p>
              The Provincial Management Service (PMS) exam deserves its own detailed look, since it&apos;s the most competitive and widely pursued examination conducted by KPPSC. PMS recruits officers into administrative positions in Khyber Pakhtunkhwa, and many candidates treat it as the provincial counterpart to CSS.
            </p>
            <p>Here&apos;s how PMS past papers fit into a focused preparation strategy:</p>
          </Prose>
          <div className="mt-4">
            <BulletList items={pmsPrepPoints} />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            <strong className="text-slate-900">We won&apos;t invent specific PMS subjects, marks distribution, or current stage-by-stage rules on this page</strong>, since PMS structure is reviewed periodically by KPPSC. Candidates should treat the <strong className="text-slate-900">latest official KPPSC syllabus and advertisement</strong> as the authoritative source for current PMS eligibility, stages, subjects, and marks before finalizing a study plan.
          </p>
        </Section>

        <Section id="kppsc-past-papers-by-post" title="KPPSC Past Papers for Different Posts">
          <Prose>
            <p>
              One of the most important things to understand about KPPSC exams is that they are frequently <strong className="text-slate-900">post-specific</strong>. The commission recruits for a very wide range of roles, and paper content can differ substantially between them. Examples of posts commonly recruited through KPPSC include:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList items={postExamples} />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            These examples illustrate <em>why</em> post-specific preparation matters — they are not a claim that any of these posts share an identical, fixed paper pattern. The goal is simply to help you find and study the paper genuinely relevant to your exact post, rather than assuming any single &quot;KPPSC pattern&quot; applies universally. Always confirm current requirements from your post&apos;s official advertisement.
          </p>
        </Section>

        <Section id="kppsc-past-papers-pdf" title="KPPSC Past Papers PDF">
          <Prose>
            <p>
              Many candidates prefer studying past papers in <strong className="text-slate-900">PDF format</strong>, since it supports focused, offline preparation. PDFs are useful for:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Offline study — preparing without relying on a constant internet connection",
                "Printing — working through a physical copy that feels closer to the real exam",
                "Annotation — marking up questions and highlighting recurring themes",
                "Revision — quickly reviewing key questions before exam day",
                "Timed practice — running a full paper attempt under real time constraints",
                "Building a personal paper collection — compiling notes and frequently missed questions in one place",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            As PakLearners&apos; past papers library for KPPSC continues to grow, this page will be updated with available papers and formats as they&apos;re published. Where a downloadable resource isn&apos;t yet available for a specific post or exam, treat this page as a guide to what&apos;s coming rather than assuming a file exists that hasn&apos;t been uploaded yet.
          </p>
        </Section>

        <Section id="solved-vs-unsolved" title="Solved and Unsolved KPPSC Past Papers">
          <Prose>
            <p>KPPSC past papers are generally available in two forms, and each plays a different role in preparation.</p>
            <p className="font-bold text-slate-900">Solved papers are useful for:</p>
          </Prose>
          <div className="mt-3">
            <BulletList
              items={[
                "Checking your answers against a reference",
                "Understanding the concepts behind questions you got wrong",
                "Reviewing recurring mistakes",
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
                "Honest self-testing",
                "Timed practice under real conditions",
                "Full exam simulation",
                "Measuring how your preparation is actually progressing",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            A practical approach is to attempt unsolved papers first, under timed conditions, and refer to solved versions only afterward for review. This keeps your practice close to real exam pressure. One important note: unless an answer key is explicitly sourced from or verified against KPPSC, treat it as a helpful study aid rather than an official reference — third-party solutions can occasionally contain errors, particularly for subjective or interpretation-heavy questions.
          </p>
        </Section>

        <Section id="how-to-prepare" title="How to Prepare with KPPSC Past Papers">
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
                ) : step.link2 ? (
                  <>
                    {step.text}{" "}
                    <Link href={step.link.href} className="font-bold text-[#1565C0] hover:underline">
                      {step.link.label}
                    </Link>{" "}
                    {step.suffix}{" "}
                    <Link href={step.link2.href} className="font-bold text-[#1565C0] hover:underline">
                      {step.link2.label}
                    </Link>{" "}
                    {step.suffix2}
                  </>
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

        <Section id="how-many-papers" title="How Many KPPSC Past Papers Should You Practice?">
          <Prose>
            <p>
              There&apos;s no official, fixed number here — and any resource claiming otherwise is oversimplifying. The right amount depends on:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Exam type — PMS preparation generally benefits from a broader range of papers than a single-post general recruitment test",
                "Post — some posts, especially specialized or newer ones, have limited past-paper availability",
                "Syllabus — if the subject requirements for your post have changed recently, older papers may be less representative for those areas",
                "Availability of authentic papers — practice is naturally limited by what genuine papers actually exist for your exam",
                "Time available — a longer preparation timeline allows for more thorough, iterative practice",
                "Your current preparation level — candidates just starting out may benefit more from fewer, closely reviewed papers than from rushing through many",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            As a general preparation strategy — not an official KPPSC requirement — most candidates find it useful to prioritize <strong className="text-slate-900">recent and relevant papers first</strong>, since these best reflect the current pattern for their specific exam, and then expand to older papers for additional pattern analysis and practice once the recent pattern feels familiar.
          </p>
        </Section>

        <Section id="kppsc-practice-mcqs" title="15 KPPSC Past Paper Preparation MCQs">
          <Prose>
            <p className="text-xs text-slate-500 border-l-4 border-blue-200 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
              The following 15 questions are <strong>original practice MCQs written by PakLearners</strong> for KPPSC exam preparation. They are designed to reflect the subject range commonly tested in KPPSC exams, but they are <strong>not</strong> official KPPSC past-paper questions.
            </p>
            <p>
              Attempt these 15 practice MCQs covering subjects commonly tested in KPPSC exams. Try answering each one before checking the correct answer and explanation.
            </p>
          </Prose>
          <div className="mt-6 space-y-5">
            {kppscPastPapersMcqs.map((mcq) => (
              <PracticeMcqCard key={mcq.id} mcq={mcq} />
            ))}
          </div>
        </Section>

        <Section id="online-preparation-resources" title="KPPSC Past Papers and Online Preparation Resources">
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
                <Link href="/mcqs/kppsc" className="font-bold text-[#1565C0] hover:underline">KPPSC MCQs</Link>{" "}
                to reinforce what past papers reveal about frequently tested topics
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                Use{" "}
                <Link href="/government-exams/kppsc/online-tests" className="font-bold text-[#1565C0] hover:underline">KPPSC online tests</Link>{" "}
                to simulate real exam timing and pressure ahead of your test date, or the dedicated{" "}
                <Link href="/government-exams/kppsc/online-tests/pms" className="font-bold text-[#1565C0] hover:underline">PMS online tests</Link>{" "}
                if PMS is your target exam
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                Read the{" "}
                <Link href="/government-exams/kppsc" className="font-bold text-[#1565C0] hover:underline">KPPSC exam guide</Link>{" "}
                for a broader understanding of eligibility, application steps, and the exam process
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                Explore{" "}
                <Link href="/past-papers" className="font-bold text-[#1565C0] hover:underline">all government exam past papers</Link>{" "}
                if you&apos;re also considering opportunities through FPSC, PPSC, BPSC, SPSC, or AJKPSC
              </span>
            </div>
            <div className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                Browse general{" "}
                <Link href="/study-resources" className="font-bold text-[#1565C0] hover:underline">competitive exam study resources</Link>{" "}
                for topics that span multiple provincial and federal exams
              </span>
            </div>
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Combining authentic past papers with consistent subject-wise MCQ practice and timed mock tests is, by most accounts, the most reliable way to prepare for a KPPSC exam — not because any single resource is a shortcut, but because together they build recall, understanding, and exam-day readiness.
          </p>
        </Section>

        <Section id="kppsc-vs-other-commissions" title="KPPSC vs Other Public Service Commissions">
          <Prose>
            <p>
              Pakistan has several public service commissions, each responsible for recruitment within its own jurisdiction — including <strong className="text-slate-900">KPPSC</strong> (Khyber Pakhtunkhwa), <strong className="text-slate-900">FPSC</strong> (federal), <strong className="text-slate-900">PPSC</strong> (Punjab), <strong className="text-slate-900">BPSC</strong> (Balochistan), <strong className="text-slate-900">SPSC</strong> (Sindh), and <strong className="text-slate-900">AJKPSC</strong> (Azad Jammu &amp; Kashmir). KPPSC specifically focuses on recruitment and competitive examinations for posts within the Government of Khyber Pakhtunkhwa, while the other commissions serve their respective provinces or federal departments.
            </p>
            <p>
              If you&apos;re preparing for opportunities across more than one commission, it&apos;s worth treating each one&apos;s syllabus and pattern separately rather than assuming overlap, since subject weightage and exam structure can differ meaningfully between them. You can browse{" "}
              <Link href="/past-papers" className="font-bold text-[#1565C0] hover:underline">all past papers</Link>{" "}
              on PakLearners to explore preparation resources across all of Pakistan&apos;s major public service commissions in one place.
            </p>
          </Prose>
        </Section>

        <Section id="faq" title="Frequently Asked Questions">
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

        <section className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl">
          <h2 className="text-xl md:text-2xl font-black mb-4">Start Your KPPSC Preparation</h2>
          <p className="text-sm md:text-[15px] text-blue-100/90 leading-relaxed mb-6">
            Working through <strong className="text-white">KPPSC past papers</strong> gives your preparation clear, evidence-based direction — showing you how a specific exam is actually structured rather than leaving you to guess. Combine that understanding with regular subject-wise MCQ practice, timed mock tests, and a syllabus you&apos;ve checked against KPPSC&apos;s latest official advertisement, and you have a preparation routine built on substance instead of shortcuts.
          </p>
          <p className="text-sm md:text-[15px] text-blue-100/90 leading-relaxed mb-6">
            Continue building your study plan with PakLearners: practice with{" "}
            <Link href="/mcqs/kppsc" className="font-bold text-sky-200 hover:text-white underline">KPPSC MCQs</Link>, simulate real exam conditions using{" "}
            <Link href="/government-exams/kppsc/online-tests" className="font-bold text-sky-200 hover:text-white underline">KPPSC online tests</Link>, and review the full{" "}
            <Link href="/government-exams/kppsc" className="font-bold text-sky-200 hover:text-white underline">KPPSC exam guide</Link> for eligibility and application details.
          </p>
          <Link
            href="#kppsc-practice-mcqs"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Practice KPPSC MCQs Now <FaArrowRight size={11} />
          </Link>
        </section>
      </div>
    </div>
  );
}
