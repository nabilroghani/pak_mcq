"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaCheck,
  FaArrowRight,
  FaChevronDown,
  FaExclamationTriangle,
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
  FaChalkboardTeacher,
  FaFileAlt,
  FaBookOpen,
  FaChartLine,
} from "react-icons/fa";
import { kppscFaqs } from "@/data/kppscFaqs";

function Section({ id, title, children }) {
  return (
    <section
      id={id}
      className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 p-6 md:p-10 shadow-sm scroll-mt-24"
    >
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
  { id: "kppsc-exam-prep-hub", label: "Overview" },
  { id: "resources-at-paklearners", label: "How to Use This Hub" },
  { id: "what-is-kppsc", label: "What Is KPPSC?" },
  { id: "kppsc-exams-and-posts", label: "Exams & Posts" },
  { id: "kppsc-syllabus-pattern", label: "Syllabus & Pattern" },
  { id: "kppsc-past-papers", label: "Past Papers" },
  { id: "kppsc-subject-mcqs", label: "MCQs" },
  { id: "kppsc-online-tests", label: "Online Tests" },
  { id: "post-wise-preparation", label: "Post-Wise Prep" },
  { id: "how-to-prepare-written-exam", label: "Study Roadmap" },
  { id: "common-preparation-mistakes", label: "Mistakes" },
  { id: "kppsc-faqs", label: "FAQs" },
];

const postCategories = [
  {
    icon: FaBuilding,
    title: "Administrative / competitive",
    examples: "PMS and related management-cadre roles",
    desc: "Competitive provincial service and administrative tracks. Paper structure and stages are defined in the relevant advertisement and rules — not a single shared KPPSC paper.",
  },
  {
    icon: FaLandmark,
    title: "Revenue / field",
    examples: "Tehsildar, Naib Tehsildar, Patwari and similar field roles",
    desc: "Posts tied to land revenue, local administration, and field work. Syllabus often mixes general sections with role-related content where the advertisement lists it.",
  },
  {
    icon: FaBriefcase,
    title: "Clerical / support",
    examples: "Junior Clerk, Computer Operator and office support posts",
    desc: "High-volume office and support recruitment. Tests usually follow the advertisement’s general and skill-related subjects rather than a long competitive-service scheme.",
  },
  {
    icon: FaShieldAlt,
    title: "Law enforcement",
    examples: "Inspector, Sub Inspector and related advertised posts",
    desc: "Written requirements sit alongside any physical or other non-written conditions named in the advertisement. Always read the full notice, not only the subject list.",
  },
  {
    icon: FaLaptopCode,
    title: "Technical / professional",
    examples: "Medical, engineering, IT and other professional posts",
    desc: "Recruitment built around a recognised professional qualification. Subject depth typically follows the advertised professional syllabus rather than a general paper alone.",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Teaching / academic",
    examples: "Lecturer, Subject Specialist and related education posts",
    desc: "Subject-focused recruitment for colleges and related academic roles. The advertised teaching subject usually drives preparation more than generic competitive-exam material.",
  },
];

const subjectsList = [
  {
    name: "Pakistan Studies",
    desc: "History, geography, and constitutional development — where your syllabus includes this area.",
    link: "/mcqs/pakistan-studies",
    linkLabel: "Pakistan Studies MCQs",
  },
  {
    name: "Khyber Pakhtunkhwa Affairs",
    desc: "Province-specific history, geography, and administration. Worth dedicated attention when your advertisement lists KP Affairs or similar content.",
    link: null,
  },
  {
    name: "General Knowledge",
    desc: "Broad national and international awareness, when listed for your post.",
    link: "/mcqs/general-knowledge",
    linkLabel: "General Knowledge MCQs",
  },
  {
    name: "Current Affairs",
    desc: "Recent national and international developments. Needs fresh revision close to your exam date if your syllabus includes it.",
    link: "/mcqs/current-affairs",
    linkLabel: "Current Affairs MCQs",
  },
  {
    name: "Islamic Studies",
    desc: "Included for many general posts when named in the syllabus; confirm scope from your advertisement.",
    link: null,
  },
  {
    name: "English",
    desc: "Grammar, vocabulary, and comprehension — prepare this area when it appears in your syllabus.",
    link: null,
  },
  {
    name: "Urdu",
    desc: "Language and comprehension, where the advertisement includes Urdu.",
    link: null,
  },
  {
    name: "Everyday Science",
    desc: "Applied science topics sometimes listed in general-category papers.",
    link: null,
  },
  {
    name: "Computer / IT",
    desc: "Especially relevant for Computer Operator and IT-related posts when specified.",
    link: null,
  },
  {
    name: "Mathematics / quantitative",
    desc: "Appears in some clerical, technical, or ability sections depending on the post.",
    link: null,
  },
  {
    name: "Professional / subject paper",
    desc: "Degree-level or professional content for teaching, medical, engineering, and similar posts — follow the advertised subject outline.",
    link: null,
  },
];

const prepSteps = [
  {
    step: "01",
    title: "Lock onto one advertisement",
    desc: "Choose the exact post and advertisement you are preparing for. KPPSC preparation only becomes efficient once your plan is tied to that notice — not to a vague idea of “any KPPSC exam.”",
  },
  {
    step: "02",
    title: "Extract syllabus and paper type",
    desc: "From the official advertisement (and linked syllabus, if any), list subjects, weightage if given, and whether the paper is MCQ, descriptive, or mixed.",
  },
  {
    step: "03",
    title: "Build a week-by-week map",
    desc: "Assign subjects to weekly blocks based on weightage and your weak areas. Leave buffer weeks for past papers and timed mocks.",
  },
  {
    step: "04",
    title: "Study for understanding first",
    desc: "Learn concepts and frameworks before drilling isolated facts. That approach holds up better when KPPSC questions are rephrased.",
  },
  {
    step: "05",
    title: "Add subject-wise MCQ drills",
    desc: "Once a topic is covered, practise MCQs for that subject only. Use this stage to find gaps, not to race the clock yet.",
  },
  {
    step: "06",
    title: "Analyse past papers early",
    desc: "Work through relevant KPPSC past papers to learn phrasing, difficulty, and recurring themes for posts similar to yours.",
  },
  {
    step: "07",
    title: "Shift into timed mocks",
    desc: "After you have a base, take timed online tests to practise pacing and section strategy under pressure.",
  },
  {
    step: "08",
    title: "Run a mistake log",
    desc: "After every paper or mock, write down why each wrong answer failed — concept gap, careless reading, or time pressure — and revise that cause.",
  },
  {
    step: "09",
    title: "Re-check official details before the exam",
    desc: "Close to the test date, re-verify syllabus notes, roll number slip timing, centre details, and any current-affairs cut-off from KPPSC’s official channels.",
  },
];

const commonMistakes = [
  "Starting books and MCQs before reading the advertisement’s syllabus, then discovering half the material was never required.",
  "Preparing as if every KPPSC post shares one paper — PMS, clerical, lecturer, and medical tracks are not interchangeable.",
  "Skipping past papers until the last week, so question style and pacing feel new on exam day.",
  "Treating MCQ drilling and timed mocks as the same activity; drills build knowledge, mocks test exam behaviour.",
  "Ignoring Khyber Pakhtunkhwa Affairs when the syllabus includes it, and relying only on generic Pakistan Studies notes.",
  "Using outdated current-affairs packs without a final refresh against recent developments (when that subject is in scope).",
  "Never reviewing wrong answers, so the same weak topics keep costing marks across practice sessions.",
  "Relying on unofficial WhatsApp forwards for dates, fees, or eligibility instead of the official advertisement and KPPSC portal.",
];

export default function KppscExamPrepContent() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-slate-50 border-t border-slate-100 text-slate-800">
      <div className="sticky top-[64px] z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto py-2.5 flex items-center gap-2 text-xs font-bold scrollbar-none">
          <span className="text-slate-400 uppercase tracking-widest text-[10px] shrink-0 mr-1 flex items-center gap-1">
            <FaListOl size={11} className="text-[#1565C0]" /> On this page:
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
        <section
          id="kppsc-exam-prep-hub"
          className="bg-gradient-to-br from-white via-slate-50 to-blue-50/40 rounded-2xl md:rounded-3xl border border-slate-200/80 p-6 md:p-12 shadow-sm relative overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1565C0] text-xs font-extrabold uppercase tracking-wider">
              <FaGraduationCap size={14} /> Khyber Pakhtunkhwa PSC
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              KPPSC Exam Preparation – Past Papers, MCQs, Syllabus &amp; Online Tests
            </h1>

            <Prose>
              <p>
                The Khyber Pakhtunkhwa Public Service Commission (KPPSC) recruits for provincial
                government posts across administration, revenue, education, health, and many other
                departments. Because each advertisement can carry its own eligibility rules, syllabus,
                and paper format, useful preparation always starts from{" "}
                <strong className="text-slate-900">your specific post</strong> — not from a single
                generic “KPPSC syllabus.”
              </p>
              <p>
                This page is PakLearners’ KPPSC preparation hub. It explains how to combine the
                official advertisement with{" "}
                <Link href="/past-papers/kppsc" className="font-bold text-[#1565C0] hover:underline">
                  past papers
                </Link>
                , subject-wise MCQs, and{" "}
                <Link
                  href="/government-exams/kppsc/online-tests"
                  className="font-bold text-[#1565C0] hover:underline"
                >
                  timed online tests
                </Link>
                . It is study guidance only. Eligibility, dates, fees, and syllabus details must be
                confirmed from KPPSC’s official notices.
              </p>
            </Prose>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/past-papers/kppsc"
                className="inline-flex items-center gap-2 bg-[#1565C0] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                <FaFileAlt size={13} /> KPPSC Past Papers <FaArrowRight size={11} />
              </Link>
              <Link
                href="/government-exams/kppsc/online-tests"
                className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
              >
                <FaClock size={13} /> Timed Online Tests
              </Link>
              <Link
                href="/government-exams/kppsc/syllabus"
                className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold px-5 py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              >
                <FaBookOpen size={13} /> Syllabus Guidance
              </Link>
            </div>
          </div>
        </section>

        <Section id="resources-at-paklearners" title="KPPSC Exam Preparation at PakLearners">
          <Prose>
            <p>
              Strong KPPSC prep usually layers four things: the official syllabus for your post, past
              papers for realism, MCQs for subject depth, and timed mocks for exam behaviour. Use them
              in that order rather than jumping straight to mock tests.
            </p>
          </Prose>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                n: "1",
                title: "Official advertisement & syllabus",
                body: "Download the current notice for your post from KPPSC. Note subjects, paper type, and any weightage before you open study material.",
              },
              {
                n: "2",
                title: "Past papers",
                body: "Use past papers to learn real question style, difficulty, and recurring themes for posts close to yours.",
              },
              {
                n: "3",
                title: "Subject-wise MCQs",
                body: "Drill the subjects your syllabus actually lists. MCQs are for learning and revision, not for guessing the next paper.",
              },
              {
                n: "4",
                title: "Timed online tests",
                body: "After you have a study base, sit timed mocks to practise pacing, accuracy under pressure, and weak-area diagnosis.",
              },
            ].map((item) => (
              <div
                key={item.n}
                className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/70"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                  {item.n}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium flex items-start gap-3">
            <FaLightbulb className="text-amber-600 shrink-0 mt-0.5" size={18} />
            <span>
              PakLearners resources support practice. They do not replace the official advertisement,
              syllabus PDF, or KPPSC portal updates for your recruitment cycle.
            </span>
          </div>
        </Section>

        <Section id="what-is-kppsc" title="What Is KPPSC?">
          <Prose>
            <p>
              KPPSC (Khyber Pakhtunkhwa Public Service Commission) is the provincial body that
              conducts competitive recruitment for a wide range of Khyber Pakhtunkhwa government
              posts. In practice, that means publishing advertisements, setting eligibility for each
              post, conducting written tests (and interviews where required), and recommending
              candidates on merit to the concerned departments.
            </p>
            <p>
              KPPSC’s work is provincial in scope. It is not the same as federal recruitment through
              FPSC, or Punjab recruitment through PPSC. Domicile, quota, and post rules for KP
              government service are defined in KPPSC advertisements and provincial policy — always
              verify those details from official sources for the post you want.
            </p>
          </Prose>
        </Section>

        <Section id="kppsc-exams-and-posts" title="KPPSC Exams and Posts">
          <Prose>
            <p>
              KPPSC does not run one standard exam for everyone. It advertises posts — sometimes one
              at a time, sometimes in batches — and each notice typically defines eligibility, syllabus
              (or subject weightage), and test format for that role. Broadly, advertised posts fall into
              landscapes like these:
            </p>
          </Prose>

          <div className="mt-6 space-y-3">
            {postCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
                        <Icon size={18} />
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base">{cat.title}</h3>
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                      e.g. {cat.examples}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed sm:pl-[52px]">{cat.desc}</p>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mt-6 font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
            This section is a map of the landscape only. How you should study for each type is covered
            under{" "}
            <a href="#post-wise-preparation" className="font-bold text-[#1565C0] hover:underline">
              Post-Wise KPPSC Preparation
            </a>
            . Always start from the advertisement for your target post.
          </p>
        </Section>

        <Section id="kppsc-syllabus-pattern" title="KPPSC Syllabus and Exam Pattern">
          <Prose>
            <p>
              There is no single KPPSC syllabus that covers every post. Syllabus content, marks
              distribution (when published), and paper format are defined for the advertisement you
              are applying under. Treat anything on this page as{" "}
              <strong className="text-slate-900">preparation guidance</strong>, not as an official
              substitute for that notice.
            </p>
            <p className="font-bold text-slate-900 text-base pt-2">
              A practical method candidates can follow:
            </p>
          </Prose>

          <ol className="mt-4 space-y-3">
            {[
              "Find the current advertisement for your post on KPPSC’s official website.",
              "Identify the syllabus (or subject list) attached or linked to that advertisement.",
              "Note subjects and any weightage, paper parts, or compulsory sections.",
              "Check paper type: objective MCQ, descriptive/written, practical/skill test, or a mix.",
              "Build your study plan, MCQ drills, past-paper practice, and mocks around that outline only.",
            ].map((step, i) => (
              <li
                key={step}
                className="flex gap-3 items-start p-4 rounded-2xl bg-slate-50 border border-slate-200/80"
              >
                <span className="shrink-0 w-8 h-8 rounded-lg bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-700 font-semibold leading-snug pt-1.5">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6 p-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-950 text-sm flex items-start gap-3">
            <FaExclamationTriangle className="text-orange-500 shrink-0 mt-0.5" size={16} />
            <p>
              If a syllabus detail is unclear or you are using notes from an older cycle, treat it as
              unconfirmed until you match it against the current advertisement. For structured
              guidance on reading syllabi, see our{" "}
              <Link
                href="/government-exams/kppsc/syllabus"
                className="font-bold text-[#1565C0] hover:underline"
              >
                KPPSC syllabus guide
              </Link>
              .
            </p>
          </div>
        </Section>

        <Section id="kppsc-past-papers" title="KPPSC Past Papers">
          <Prose>
            <p>
              Past papers show how KPPSC has actually framed questions in previous cycles — style,
              difficulty, and topic emphasis that a syllabus bullet list cannot fully convey. They are
              especially useful when you compare papers from posts similar to the one you are targeting.
            </p>
            <p className="font-bold text-slate-900 text-base pt-2">How to use past papers well:</p>
          </Prose>

          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {[
              "Analyse before you memorise: mark subjects and topics that appear often across years or similar posts.",
              "Identify recurring themes (for example, constitutional facts, KP geography, or role-related rules) without assuming the next paper will copy old questions.",
              "Practise under time limits once you know the material, so pacing becomes part of preparation.",
              "Review every mistake: decide whether you lacked the concept, misread the stem, or ran out of time — then fix that cause.",
              "If papers for your exact post are limited, use papers from closely related posts as style practice, then re-check your own syllabus for coverage gaps.",
            ].map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60"
              >
                <FaCheck className="text-emerald-500 mt-1 shrink-0" size={13} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">Browse KPPSC past papers</h3>
              <p className="text-xs md:text-sm text-slate-600">
                Use organised{" "}
                <Link href="/past-papers/kppsc" className="font-bold text-[#1565C0] underline">
                  KPPSC past papers
                </Link>{" "}
                for practice. Patterns can change between recruitment cycles, so treat papers as a guide
                to style and themes — not a guaranteed preview of the next exam.
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

        <Section id="kppsc-subject-mcqs" title="KPPSC MCQs and Subject-Wise Preparation">
          <Prose>
            <p>
              Subject lists differ by post. The areas below are{" "}
              <strong className="text-slate-900">examples</strong> that appear in many KPPSC
              advertisements — not a claim that every exam tests all of them. Follow your official
              syllabus first, then practise the matching subjects.
            </p>
          </Prose>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subjectsList.map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col justify-between"
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
                    Confirm in your syllabus
                  </span>
                )}
              </div>
            ))}
          </div>

          <Prose>
            <p className="mt-6 text-sm text-slate-600 leading-relaxed bg-blue-50/60 p-4 rounded-xl border border-blue-100">
              For focused drilling, use subject pages such as{" "}
              <Link href="/mcqs/pakistan-studies" className="font-bold text-[#1565C0] hover:underline">
                Pakistan Studies MCQs
              </Link>
              ,{" "}
              <Link
                href="/mcqs/general-knowledge"
                className="font-bold text-[#1565C0] hover:underline"
              >
                General Knowledge MCQs
              </Link>
              , and{" "}
              <Link href="/mcqs/current-affairs" className="font-bold text-[#1565C0] hover:underline">
                Current Affairs MCQs
              </Link>
              , or browse the wider{" "}
              <Link href="/mcqs" className="font-bold text-[#1565C0] hover:underline">
                MCQs section
              </Link>
              . Cover what your advertisement lists; do not try to finish every subject on this page by
              default. You can also follow{" "}
              <Link href="/current-affairs" className="font-bold text-[#1565C0] hover:underline">
                current affairs updates
              </Link>{" "}
              when that area is in your syllabus.
            </p>
          </Prose>
        </Section>

        <Section id="kppsc-online-tests" title="KPPSC Online Tests and Mock Practice">
          <Prose>
            <p>
              Candidates often mix three different tools. They work best when you keep their jobs
              separate:
            </p>
          </Prose>

          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  <th className="px-3 py-3 font-black text-xs uppercase tracking-wide">Tool</th>
                  <th className="px-3 py-3 font-black text-xs uppercase tracking-wide">Best used for</th>
                  <th className="px-3 py-3 font-black text-xs uppercase tracking-wide">Not ideal for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="align-top">
                  <td className="px-3 py-3 font-bold text-slate-900">Subject MCQs</td>
                  <td className="px-3 py-3 leading-relaxed">
                    Learning topics, fixing weak chapters, daily revision
                  </td>
                  <td className="px-3 py-3 leading-relaxed">Simulating full exam pressure</td>
                </tr>
                <tr className="align-top">
                  <td className="px-3 py-3 font-bold text-slate-900">Past papers</td>
                  <td className="px-3 py-3 leading-relaxed">
                    Real phrasing, difficulty, and theme analysis
                  </td>
                  <td className="px-3 py-3 leading-relaxed">
                    Replacing your official syllabus checklist
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="px-3 py-3 font-bold text-slate-900">Timed online tests</td>
                  <td className="px-3 py-3 leading-relaxed">
                    Pacing, accuracy under time, full-paper diagnosis
                  </td>
                  <td className="px-3 py-3 leading-relaxed">
                    Learning brand-new subjects from scratch
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Spot subjects that consistently slow you down.",
              "Practise how you allocate time across sections.",
              "Make the exam format feel familiar before test day.",
              "Track whether accuracy improves across attempts.",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <FaChartLine className="text-[#1565C0] mt-1 shrink-0" size={14} />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div>
              <h3 className="font-black text-lg text-white mb-1">Timed KPPSC mock practice</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Use{" "}
                <Link
                  href="/government-exams/kppsc/online-tests"
                  className="text-sky-300 font-bold underline hover:text-white"
                >
                  KPPSC online tests
                </Link>{" "}
                after you have covered core syllabus topics. Mocks diagnose preparation; they should
                not be your first study step.
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

        <Section id="post-wise-preparation" title="Post-Wise KPPSC Preparation">
          <Prose>
            <p>
              The categories above describe <em>what</em> KPPSC recruits for. This section focuses on{" "}
              <em>how</em> to organise study once you know your post type. Exact subjects and marks
              still come only from your advertisement.
            </p>
          </Prose>

          <div className="mt-6 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
                <FaBuilding className="text-[#1565C0]" /> PMS / competitive administrative tracks
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Build your plan around the official PMS (or related) scheme published for that cycle:
                compulsory papers first, then optional or additional components if listed. Separate
                objective practice from any descriptive/essay work the rules require. Past papers help
                you see how broad “general” papers are framed; do not invent a personal syllabus that
                skips advertised parts. Related context:{" "}
                <Link href="/government-exams/pms" className="font-bold text-[#1565C0] hover:underline">
                  PMS exam guide
                </Link>
                .
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
                <FaBriefcase className="text-[#1565C0]" /> Clerical and support posts
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Prioritise the general and skill areas named in the advertisement — often language,
                general awareness, and any computer or typing/practical component if stated. Keep
                study shorter and more drill-focused than a multi-paper competitive scheme. Confirm
                whether negative marking or a skill test applies before you set your practice timing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
                <FaLaptopCode className="text-[#1565C0]" /> Technical and professional posts
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Put the professional subject first. Align notes with your degree/professional
                curriculum and the advertised outline (for example medical, engineering, or IT
                content). Add general sections only to the extent your notice includes them. Past
                papers for the same professional category are more useful than generic clerical papers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
                <FaChalkboardTeacher className="text-[#1565C0]" /> Teaching and academic posts
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Weight preparation toward your advertised teaching subject. Use your academic
                background as the core, then add any general or pedagogy components only if the
                syllabus lists them. Lecturer and subject-specialist notices can differ — match the
                depth expected for your exact post rather than recycling a junior-level outline.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
                <FaLandmark className="text-[#1565C0]" /> Revenue / field and law-enforcement posts
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Split preparation into (1) general sections named in the notice and (2) role-related
                content such as revenue procedure or other post-specific requirements when listed.
                For law-enforcement advertisements, also diary any physical or non-written conditions
                early so written prep does not crowd out those requirements.
              </p>
            </div>
          </div>
        </Section>

        <Section id="how-to-prepare-written-exam" title="How to Prepare for a KPPSC Written Exam">
          <Prose>
            <p>
              Use this as a flexible roadmap. Adjust week counts to your exam date, but keep the
              sequence: advertisement → syllabus → learning → past papers → timed mocks → error review.
            </p>
          </Prose>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prepSteps.map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex gap-4"
              >
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

        <Section id="common-preparation-mistakes" title="Common KPPSC Preparation Mistakes">
          <Prose>
            <p>
              These mistakes waste more time than “not studying hard enough” — especially for
              candidates juggling several KPPSC advertisements:
            </p>
          </Prose>

          <div className="mt-6 space-y-3">
            {commonMistakes.map((mistake) => (
              <div
                key={mistake}
                className="p-4 rounded-xl bg-red-50/60 border border-red-200/80 text-red-950 flex items-start gap-3"
              >
                <FaTimesCircle className="text-red-500 mt-0.5 shrink-0" size={16} />
                <p className="text-xs sm:text-sm font-medium leading-relaxed">{mistake}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="kppsc-faqs" title="KPPSC Preparation FAQs">
          <div className="space-y-3">
            {kppscFaqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-xs"
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

        <section
          id="start-kppsc-preparation"
          className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-10 text-white shadow-xl"
        >
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-3">
              Start Your KPPSC Preparation
            </h2>
            <p className="text-blue-100/90 text-xs sm:text-sm md:text-base leading-relaxed mb-6">
              Pick your advertisement, confirm the syllabus from KPPSC, then practise with past papers,
              subject MCQs, and timed mocks. Track openings via{" "}
              <Link href="/jobs" className="text-sky-200 font-bold underline hover:text-white">
                jobs
              </Link>{" "}
              and KPPSC-specific{" "}
              <Link
                href="/government-exams/kppsc/jobs"
                className="text-sky-200 font-bold underline hover:text-white"
              >
                KPPSC jobs
              </Link>
              , and always verify details on the official commission site before you apply.
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
              <Link
                href="/past-papers"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                All Past Papers
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
