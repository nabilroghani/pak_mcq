"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaCheck,
  FaArrowRight,
  FaChevronDown,
  FaExclamationTriangle,
  FaBookOpen,
  FaGraduationCap,
  FaClock,
  FaListOl,
  FaLightbulb,
  FaTimesCircle,
  FaQuestionCircle,
  FaBuilding,
  FaBriefcase,
  FaLandmark,
  FaShieldAlt,
  FaLaptopCode,
  FaUserNurse,
  FaLayerGroup,
  FaFileAlt,
  FaChartLine,
} from "react-icons/fa";
import { kppscFaqs } from "@/data/kppscFaqs";

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 p-6 md:p-10 shadow-sm scroll-mt-24">
      {subtitle && (
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1565C0] block mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight leading-snug">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Prose({ children }) {
  return (
    <div className="space-y-4 text-sm md:text-[15.5px] text-slate-600 leading-relaxed font-normal">
      {children}
    </div>
  );
}

const tableOfContents = [
  { id: "kppsc-exam-prep-hub", label: "KPPSC Prep Hub" },
  { id: "resources-at-paklearners", label: "Preparation Workflow" },
  { id: "what-is-kppsc", label: "What Is KPPSC?" },
  { id: "kppsc-exams-and-posts", label: "Exams & Posts" },
  { id: "kppsc-syllabus-pattern", label: "Syllabus & Pattern" },
  { id: "kppsc-past-papers", label: "Past Papers" },
  { id: "kppsc-subject-mcqs", label: "Subject-Wise MCQs" },
  { id: "kppsc-online-tests", label: "Timed Online Tests" },
  { id: "post-wise-preparation", label: "Post-Wise Strategy" },
  { id: "how-to-prepare-written-exam", label: "10-Step Study Plan" },
  { id: "common-preparation-mistakes", label: "Common Mistakes" },
  { id: "kppsc-faqs", label: "KPPSC FAQs" },
];

const postCategories = [
  {
    icon: FaBuilding,
    title: "Administrative & Management Posts",
    examples: "PMS, Assistant Director, Section Officer",
    desc: "Typically lean toward General Knowledge, Current Affairs, Pakistan Studies, and English, often with a written/essay component in addition to MCQs. If you're targeting PMS, verify whether your attempt requires an essay or descriptive paper alongside objective sections.",
    color: "from-blue-500/10 to-indigo-500/10 border-blue-200 text-blue-700",
  },
  {
    icon: FaLandmark,
    title: "Revenue & Field Posts",
    examples: "Tehsildar, Naib Tehsildar, Patwari",
    desc: "Often include a mix of general subjects plus content related to revenue law and local administration — confirm the exact breakdown from your advertisement.",
    color: "from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-700",
  },
  {
    icon: FaBriefcase,
    title: "Clerical & Support Posts",
    examples: "Junior Clerk, Computer Operator",
    desc: "Usually emphasize English, general knowledge, and — for Computer Operator specifically — computer-related knowledge and sometimes a typing or practical test.",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-700",
  },
  {
    icon: FaShieldAlt,
    title: "Law Enforcement Posts",
    examples: "Inspector, Sub Inspector",
    desc: "Commonly combine general knowledge and current affairs with post-specific requirements; physical or other non-written criteria may also apply, so check the advertisement in full.",
    color: "from-slate-600/10 to-gray-700/10 border-slate-300 text-slate-800",
  },
  {
    icon: FaUserNurse,
    title: "Technical & Academic Posts",
    examples: "Medical Officer, Lecturer, Subject Specialist",
    desc: "Usually weighted heavily toward the relevant professional or subject knowledge rather than general papers, since these posts require specific qualifications.",
    color: "from-purple-500/10 to-violet-500/10 border-purple-200 text-purple-700",
  },
];

const subjectsList = [
  {
    name: "Pakistan Studies",
    desc: "History, geography, and constitutional development of Pakistan.",
    link: "/mcqs/pakistan-studies",
    linkLabel: "Pakistan Studies MCQs",
  },
  {
    name: "Islamic Studies",
    desc: "Commonly included for general posts; check your syllabus for exact scope.",
    link: null,
  },
  {
    name: "General Knowledge",
    desc: "A broad mix of national and international facts frequently tested in general recruitment posts.",
    link: "/mcqs/general-knowledge",
    linkLabel: "General Knowledge MCQs",
  },
  {
    name: "Current Affairs",
    desc: "National and international developments; this content needs regular updating closer to your exam date.",
    link: "/mcqs/current-affairs",
    linkLabel: "Current Affairs MCQs",
  },
  {
    name: "Everyday Science",
    desc: "General scientific concepts relevant to daily life, common in general-category papers.",
    link: null,
  },
  {
    name: "English",
    desc: "Grammar, vocabulary, and comprehension, tested in most written exams regardless of post.",
    link: null,
  },
  {
    name: "Mathematics",
    desc: "Basic to intermediate quantitative reasoning, more heavily weighted in certain technical or clerical posts.",
    link: null,
  },
  {
    name: "Computer Science",
    desc: "Relevant mainly for Computer Operator and similar technical posts.",
    link: null,
  },
  {
    name: "Urdu",
    desc: "Language and comprehension, included in several posts' syllabi.",
    link: null,
  },
  {
    name: "Physics, Chemistry, Biology",
    desc: "Relevant primarily for science-based technical or teaching posts.",
    link: null,
  },
  {
    name: "Pedagogy",
    desc: "Relevant for teaching and lecturer-track posts.",
    link: null,
  },
];

const prepSteps = [
  {
    step: "01",
    title: "Identify exact post & advertisement",
    desc: "Identify the exact post and advertisement you're applying for — preparation should be built around this, not a generic idea of 'KPPSC prep.'",
  },
  {
    step: "02",
    title: "Read official syllabus in full",
    desc: "Read the official syllabus in full before starting to study, so you know exactly what's in scope.",
  },
  {
    step: "03",
    title: "Build realistic weekly study targets",
    desc: "Divide subjects into a study plan with realistic weekly targets based on how much time you have before the exam.",
  },
  {
    step: "04",
    title: "Study concepts before memorizing",
    desc: "Study concepts before memorizing facts — understanding why an answer is correct helps you handle unfamiliar questions on the same topic.",
  },
  {
    step: "05",
    title: "Practice past papers for style",
    desc: "Practice past papers to get a feel for question style and recurring themes.",
  },
  {
    step: "06",
    title: "Use MCQs for final revision",
    desc: "Use MCQs for revision, especially in the final weeks, to reinforce what you've already studied.",
  },
  {
    step: "07",
    title: "Take timed mock tests",
    desc: "Take timed mock tests to build speed and simulate real exam pressure.",
  },
  {
    step: "08",
    title: "Review mistakes after every session",
    desc: "Review your mistakes after every practice session rather than moving straight to the next set of questions.",
  },
  {
    step: "09",
    title: "Revise weak topics repeatedly",
    desc: "Revise weak topics repeatedly rather than spending equal time on everything.",
  },
  {
    step: "10",
    title: "Verify changing information before exam",
    desc: "Verify any changing information — current affairs, recent policy changes, updated syllabus details — close to your exam date, since these can shift between when you start preparing and when you sit the exam.",
  },
];

const commonMistakes = [
  "Studying without checking the actual syllabus first, which leads to wasted effort on topics that aren't even tested for a given post.",
  "Relying only on rote memorization for subjects like General Knowledge or Current Affairs, without understanding context — this falls apart when questions are phrased differently than expected.",
  "Ignoring past papers entirely, which means missing a realistic sense of difficulty and question style until exam day.",
  "Skipping timed practice, so time management becomes a problem during the actual exam even when the candidate knows the material.",
  "Treating all subjects equally instead of weighting study time according to the syllabus and the post's requirements.",
  "Not revisiting mistakes, which means the same errors repeat across multiple practice attempts.",
  "Using outdated current affairs content without checking for more recent developments before the exam.",
];

export default function KppscExamPrepContent() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-slate-50 border-t border-slate-100 text-slate-800">
      {/* Quick Jump Bar */}
      <div className="sticky top-[64px] z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto py-2.5 flex items-center gap-2 text-xs font-bold scrollbar-none">
          <span className="text-slate-400 uppercase tracking-widest text-[10px] shrink-0 mr-1 flex items-center gap-1">
            <FaListOl size={11} className="text-[#1565C0]" /> Table of Contents:
          </span>
          {tableOfContents.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#1565C0] hover:text-white text-slate-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16 space-y-8 md:space-y-12">
        {/* Main H1 Header & Hero Intro */}
        <section id="kppsc-exam-prep-hub" className="bg-gradient-to-br from-white via-slate-50 to-blue-50/40 rounded-2xl md:rounded-3xl border border-slate-200/80 p-6 md:p-12 shadow-sm relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1565C0] text-xs font-extrabold uppercase tracking-wider">
              <FaGraduationCap size={14} /> Official 2026 Preparation Guide
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              KPPSC Exam Preparation – Past Papers, MCQs, Syllabus &amp; Online Tests
            </h1>

            <Prose>
              <p>
                Khyber Pakhtunkhwa Public Service Commission (KPPSC) conducts recruitment and competitive
                examinations for a wide range of provincial government posts, from administrative roles like
                PMS to technical and subject-specific positions such as Lecturer or Medical Officer. Because
                the posts vary so much, &quot;KPPSC preparation&quot; isn&apos;t one fixed syllabus — it
                changes based on the post you&apos;re applying for and the advertisement you&apos;re
                responding to.
              </p>
              <p>
                This page is a preparation hub. It brings together past papers, subject-wise MCQs, a realistic
                study strategy, and timed online tests, organized so you can find what applies to your
                specific exam rather than wading through generic content. It does not replace the official
                KPPSC advertisement or syllabus — think of it as the practice layer that sits alongside them.
              </p>
            </Prose>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/past-papers/kppsc"
                className="inline-flex items-center gap-2 bg-[#1565C0] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                <FaFileAlt size={13} /> Browse KPPSC Past Papers <FaArrowRight size={11} />
              </Link>
              <Link
                href="/government-exams/kppsc/online-tests"
                className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
              >
                <FaClock size={13} /> Take Timed Online Tests
              </Link>
            </div>
          </div>
        </section>

        {/* Section 1: KPPSC Exam Preparation at PakLearners */}
        <Section id="resources-at-paklearners" subtitle="How Resources Fit Together" title="KPPSC Exam Preparation at PakLearners">
          <Prose>
            <p>
              Here&apos;s how the resources on this page fit together, and how we&apos;d suggest using them:
            </p>
          </Prose>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-all">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                1
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">Official Syllabus &amp; Advertisement</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Start with the <strong>official advertisement and syllabus</strong> for your post (KPPSC publishes these directly — details below).
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-all">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                2
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">Past Papers Analysis</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Use <strong>past papers</strong> to understand question style, difficulty, and recurring topics for similar posts.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-all">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                3
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">Subject-Wise MCQs Practice</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Work through <strong>subject-wise MCQs</strong> to build and test your knowledge in each syllabus area.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 transition-all">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                4
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">Timed Online Tests</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Take <strong>timed online tests</strong> once you have some preparation under your belt, to simulate exam conditions and spot weak spots before the real exam.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium flex items-center gap-3">
            <FaLightbulb className="text-amber-600 shrink-0" size={18} />
            <span>
              None of this replaces reading the actual syllabus for your post — it&apos;s meant to make studying it more effective.
            </span>
          </div>
        </Section>

        {/* Section 2: What Is KPPSC? */}
        <Section id="what-is-kppsc" subtitle="Constitutional Role & Mandate" title="What Is KPPSC?">
          <Prose>
            <p>
              The Khyber Pakhtunkhwa Public Service Commission is the constitutional body responsible for
              recruiting candidates to various posts in the Khyber Pakhtunkhwa provincial government, and for
              conducting the associated competitive examinations and interviews. It functions similarly to
              other provincial and federal public service commissions in Pakistan, publishing advertisements for
              vacant posts, setting eligibility criteria, and administering written tests and interviews as
              part of the selection process.
            </p>
            <p>
              For exact details on KPPSC&apos;s mandate, current advertisements, eligibility rules, and
              procedures, always refer to the official KPPSC website, since these are set and updated by the
              Commission itself.
            </p>
          </Prose>
        </Section>

        {/* Section 3: KPPSC Exams and Posts */}
        <Section id="kppsc-exams-and-posts" subtitle="Categorization & Post Types" title="KPPSC Exams and Posts">
          <Prose>
            <p>
              KPPSC doesn&apos;t run a single standardized exam. Instead, it advertises specific posts —
              sometimes individually, sometimes in batches — and each advertisement typically comes with its own
              eligibility criteria, syllabus (or subject weightage), and test format. Broadly, the posts fall into
              a few categories:
            </p>
          </Prose>

          <div className="mt-6 space-y-3">
            {postCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${cat.color}`}>
                        <Icon size={18} />
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base">{cat.title}</h3>
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                      e.g., {cat.examples}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed sm:pl-[52px]">
                    {cat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mt-6 font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
            Because eligibility, test pattern, and subject weightage differ across these categories, preparation should always start from the specific advertisement rather than a generic &quot;KPPSC syllabus.&quot;
          </p>
        </Section>

        {/* Section 4: KPPSC Syllabus and Exam Pattern */}
        <Section id="kppsc-syllabus-pattern" subtitle="Exam Pattern & Structure" title="KPPSC Syllabus and Exam Pattern">
          <Prose>
            <p>
              There isn&apos;t one universal KPPSC syllabus that applies to every post. Each advertisement
              typically specifies (or links to) the syllabus and paper structure relevant to that post —
              including subjects covered, and sometimes marks distribution or paper type (MCQ-based,
              subjective, or a mix).
            </p>
            <p className="font-bold text-slate-900 text-base pt-2">A practical approach:</p>
          </Prose>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-black uppercase text-[#1565C0] mb-1">Step 1</div>
              <p className="text-sm text-slate-700 font-semibold leading-snug">
                Download the advertisement and syllabus for your specific post directly from KPPSC&apos;s official website.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-black uppercase text-[#1565C0] mb-1">Step 2</div>
              <p className="text-sm text-slate-700 font-semibold leading-snug">
                Note the subjects listed and any weightage given to each.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-black uppercase text-[#1565C0] mb-1">Step 3</div>
              <p className="text-sm text-slate-700 font-semibold leading-snug">
                Check whether the paper is MCQ-based, descriptive, or both — this affects how you should practice.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-black uppercase text-[#1565C0] mb-1">Step 4</div>
              <p className="text-sm text-slate-700 font-semibold leading-snug">
                Re-check the syllabus periodically, since advertisements and requirements can be revised between recruitment cycles.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-950 text-sm flex items-start gap-3">
            <FaExclamationTriangle className="text-orange-500 shrink-0 mt-0.5" size={16} />
            <p>
              If you&apos;re unsure whether a syllabus detail still applies to your exam, treat it as unconfirmed until you&apos;ve verified it against the current advertisement.
            </p>
          </div>
        </Section>

        {/* Section 5: KPPSC Past Papers */}
        <Section id="kppsc-past-papers" subtitle="Previous Question Papers" title="KPPSC Past Papers">
          <Prose>
            <p>
              Past papers are one of the most useful preparation tools available, mainly because they show you
              the actual style and difficulty level of questions the Commission has used before — something a
              syllabus list alone can&apos;t convey.
            </p>
            <p className="font-bold text-slate-900 text-base pt-2">When working through past papers, it helps to:</p>
          </Prose>

          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {[
              "Note which topics come up repeatedly across different years or similar posts.",
              "Time yourself, even in early practice, so you get a realistic sense of pacing.",
              "Review wrong answers carefully rather than just checking the correct option — understanding why an answer is wrong often reveals a knowledge gap worth fixing.",
              "Compare papers from posts similar to yours if past papers for your exact post are limited.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <FaCheck className="text-emerald-500 mt-1 shrink-0" size={13} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-extrabold text-slate-900 text-base mb-1">Access KPPSC Past Papers</h4>
              <p className="text-xs md:text-sm text-slate-600">
                You can browse organized{" "}
                <Link href="/past-papers/kppsc" className="font-bold text-[#1565C0] underline">
                  KPPSC Past Papers
                </Link>{" "}
                to start this practice. Keep in mind that exam patterns can change between recruitment cycles, so past papers are best used to understand question style and recurring themes, not as a guaranteed preview of the next paper.
              </p>
            </div>
            <Link
              href="/past-papers/kppsc"
              className="shrink-0 bg-[#1565C0] text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
            >
              Open Past Papers
            </Link>
          </div>
        </Section>

        {/* Section 6: KPPSC MCQs and Subject-Wise Preparation */}
        <Section id="kppsc-subject-mcqs" subtitle="Subject Breakdown & Practice" title="KPPSC MCQs and Subject-Wise Preparation">
          <Prose>
            <p>
              Subject requirements vary by post — not every KPPSC exam tests every subject below. Check your
              specific syllabus to confirm which of these apply to you, then use subject-wise practice to reinforce
              weak areas:
            </p>
          </Prose>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subjectsList.map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between hover:border-blue-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#1565C0]" />
                    <h3 className="font-extrabold text-slate-900 text-sm">{item.name}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.desc}</p>
                </div>
                {item.link ? (
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1565C0] hover:underline mt-auto pt-2 border-t border-slate-200/60"
                  >
                    {item.linkLabel} <FaArrowRight size={9} />
                  </Link>
                ) : (
                  <span className="text-[11px] text-slate-400 font-semibold mt-auto pt-2 border-t border-slate-200/60">
                    Syllabus Subject
                  </span>
                )}
              </div>
            ))}
          </div>

          <Prose>
            <p className="mt-6 text-sm text-slate-600 leading-relaxed bg-blue-50/60 p-4 rounded-xl border border-blue-100">
              For focused practice, you can use subject pages such as{" "}
              <Link href="/mcqs/pakistan-studies" className="font-bold text-[#1565C0] hover:underline">
                Pakistan Studies MCQs
              </Link>
              ,{" "}
              <Link href="/mcqs/general-knowledge" className="font-bold text-[#1565C0] hover:underline">
                General Knowledge MCQs
              </Link>
              , and{" "}
              <Link href="/mcqs/current-affairs" className="font-bold text-[#1565C0] hover:underline">
                Current Affairs MCQs
              </Link>
              . Work through the subjects your specific syllabus actually lists, rather than trying to cover everything on this list.
            </p>
          </Prose>
        </Section>

        {/* Section 7: KPPSC Online Tests and Mock Practice */}
        <Section id="kppsc-online-tests" subtitle="Mock Exams & Exam Pressure" title="KPPSC Online Tests and Mock Practice">
          <Prose>
            <p>
              Once you&apos;ve covered the core material for your subjects, timed practice tests are useful
              for a different reason than MCQ drills: they show you how you perform under exam-like time
              pressure, not just whether you know the answer.
            </p>
            <p className="font-bold text-slate-900 text-base pt-2">Mock tests are particularly good for:</p>
          </Prose>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Identifying which subjects or topics consistently slow you down.",
              "Practicing time allocation across sections.",
              "Reducing exam-day anxiety by making the format familiar beforehand.",
              "Tracking whether your accuracy is improving over successive attempts.",
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <FaChartLine className="text-[#1565C0] mt-1 shrink-0" size={14} />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div>
              <h4 className="font-black text-lg text-white mb-1">Ready for Timed Mock Practice?</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Try the{" "}
                <Link href="/government-exams/kppsc/online-tests" className="text-sky-300 font-bold underline hover:text-white">
                  KPPSC Online Tests
                </Link>{" "}
                once you have a study base — mock tests are more useful for revision and diagnosis than as a first step in learning new material.
              </p>
            </div>
            <Link
              href="/government-exams/kppsc/online-tests"
              className="shrink-0 bg-[#1565C0] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl hover:bg-blue-600 transition-colors"
            >
              Start Online Test
            </Link>
          </div>
        </Section>

        {/* Section 8: Post-Wise KPPSC Preparation */}
        <Section id="post-wise-preparation" subtitle="Targeted Exam Strategy" title="Post-Wise KPPSC Preparation">
          <Prose>
            <p>
              Preparation strategy shifts depending on the post you&apos;re targeting, mainly because subject weightage and paper format differ:
            </p>
          </Prose>

          <div className="mt-6 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
                <FaBuilding className="text-[#1565C0]" /> PMS and Administrative Posts (PMS, Assistant Director, Section Officer)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Typically lean toward General Knowledge, Current Affairs, Pakistan Studies, and English, often with a written/essay component in addition to MCQs. If you&apos;re targeting PMS, verify whether your attempt requires an essay or descriptive paper alongside objective sections.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
                <FaLandmark className="text-[#1565C0]" /> Revenue Posts (Tehsildar, Naib Tehsildar, Patwari)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Often include a mix of general subjects plus content related to revenue law and local administration — confirm the exact breakdown from your advertisement.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
                <FaBriefcase className="text-[#1565C0]" /> Clerical and Support Posts (Junior Clerk, Computer Operator)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Usually emphasize English, general knowledge, and — for Computer Operator specifically — computer-related knowledge and sometimes a typing or practical test.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
                <FaShieldAlt className="text-[#1565C0]" /> Law Enforcement Posts (Inspector, Sub Inspector)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Commonly combine general knowledge and current affairs with post-specific requirements; physical or other non-written criteria may also apply, so check the advertisement in full.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
                <FaUserNurse className="text-[#1565C0]" /> Technical and Academic Posts (Medical Officer, Lecturer, Subject Specialist)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Usually weighted heavily toward the relevant professional or subject knowledge rather than general papers, since these posts require specific qualifications.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200 font-medium">
            Rather than preparing generically, identify which category your target post falls into, then prioritize the subjects and resource pages relevant to that category.
          </p>
        </Section>

        {/* Section 9: How to Prepare for a KPPSC Written Exam */}
        <Section id="how-to-prepare-written-exam" subtitle="10-Step Roadmap" title="How to Prepare for a KPPSC Written Exam">
          <Prose>
            <p>
              A structured approach tends to work better than open-ended studying:
            </p>
          </Prose>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prepSteps.map((item) => (
              <div key={item.step} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 10: Common KPPSC Preparation Mistakes */}
        <Section id="common-preparation-mistakes" subtitle="Avoid Traps & Pitfalls" title="Common KPPSC Preparation Mistakes">
          <Prose>
            <p>
              A few patterns show up repeatedly among candidates who struggle despite putting in study time:
            </p>
          </Prose>

          <div className="mt-6 space-y-3">
            {commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-red-50/60 border border-red-200/80 text-red-950 flex items-start gap-3"
              >
                <FaTimesCircle className="text-red-500 mt-0.5 shrink-0" size={16} />
                <p className="text-xs sm:text-sm font-medium leading-relaxed">{mistake}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 11: KPPSC Preparation FAQs */}
        <Section id="kppsc-faqs" subtitle="Questions & Answers" title="KPPSC Preparation FAQs">
          <div className="space-y-3">
            {kppscFaqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-slate-50/80 hover:bg-slate-100/80 transition-colors"
                    aria-expanded={open}
                  >
                    <span className="text-sm font-extrabold text-slate-900 flex items-center gap-2.5">
                      <FaQuestionCircle className="text-[#1565C0] shrink-0" size={15} />
                      {faq.q}
                    </span>
                    <FaChevronDown
                      size={13}
                      className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                        open ? "rotate-180 text-[#1565C0]" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* Banner CTA Footer */}
        <section className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-10 text-white shadow-xl">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-3">
              Start Your Tailored KPPSC Preparation Today
            </h2>
            <p className="text-blue-100/90 text-xs sm:text-sm md:text-base leading-relaxed mb-6">
              Access organized KPPSC past papers, subject-wise MCQs, and timed mock tests designed for your specific recruitment advertisement.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/past-papers/kppsc"
                className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
              >
                KPPSC Past Papers <FaArrowRight size={11} />
              </Link>
              <Link
                href="/government-exams/kppsc/online-tests"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                Timed Mock Practice
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
