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
import { kppscOnlineTestsFaqs } from "@/data/kppscOnlineTestsFaqs";
import {
  kppscPostOnlineTests,
  kppscSubjectOnlineTests,
  kppscOnlineTestsHubPath,
} from "@/data/kppscOnlineTestsData";

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

const tocLinks = [
  { id: "kppsc-online-tests-2026", label: "KPPSC Online Tests 2026" },
  { id: "practice-kppsc-tests-by-post", label: "Practice KPPSC Tests by Post" },
  { id: "how-to-prepare", label: "How to Prepare Using Online Tests" },
  { id: "what-do-kppsc-online-tests-cover", label: "What Do KPPSC Online Tests Cover?" },
  { id: "kppsc-subject-wise-online-tests", label: "KPPSC Subject-Wise Online Tests" },
  { id: "how-our-kppsc-mock-tests-work", label: "How Our KPPSC Mock Tests Work" },
  { id: "benefits", label: "Benefits of Practicing KPPSC MCQs Online" },
  { id: "preparation-strategy", label: "KPPSC Online Test Preparation Strategy" },
  { id: "faqs", label: "Frequently Asked Questions" },
];

const prepareSteps = [
  <>Start with the syllabus. Review the <Link href="/government-exams/kppsc/syllabus" className="font-bold text-[#1565C0] hover:underline">KPPSC syllabus</Link> for your post so you know which subjects to focus on before jumping into MCQs.</>,
  "Take a baseline test. Attempt a post-wise or subject-wise test early on to see where you currently stand.",
  "Identify weak subjects. Use your results to figure out which subjects need more attention — this is often more efficient than re-reading everything equally.",
  "Practice subject-wise before post-wise. If General Knowledge or Pakistan Studies is weak, drill that subject specifically before moving to combined post-wise tests.",
  <>Revisit past papers. Pair your MCQ practice with <Link href="/government-exams/kppsc/past-papers" className="font-bold text-[#1565C0] hover:underline">KPPSC past papers</Link> to understand how KPPSC has structured questions historically.</>,
  "Repeat tests periodically. Retaking tests after a study cycle helps confirm whether weak areas have actually improved.",
  "Simulate exam conditions occasionally. As your exam date nears, attempt tests without pausing or looking up answers, to build the discipline needed for the real test.",
];

const coverageSubjects = [
  "General Knowledge – covering general awareness topics frequently tested by KPPSC",
  "Pakistan Studies – history, constitution, and general Pakistan-related topics",
  "Current Affairs – recent national and international developments",
  "Everyday Science – basic scientific concepts and general science awareness",
  "English – grammar, vocabulary, and comprehension-style MCQs",
  "Urdu – grammar and language-based MCQs where relevant to the post",
  "Islamiat – general Islamic studies MCQs",
  "Khyber Pakhtunkhwa Affairs – province-specific general knowledge",
  "Post-specific subjects – for technical, medical, legal, or administrative posts, additional subject-specific MCQs are included where relevant",
];

const mockTestSteps = [
  "Choose a test — select a post-wise or subject-wise KPPSC online test based on what you're preparing for.",
  "Attempt the MCQs — work through the questions at your own pace, in a format designed to resemble the multiple-choice style used in KPPSC exams.",
  "Review your answers — go through the results to see which questions you got right or wrong.",
  "Focus your revision — use the outcome to guide further study before retaking the test or moving to another subject/post.",
];

const benefits = [
  "Free and accessible — practice KPPSC MCQs online without needing to purchase printed test series.",
  "Organized by post and subject — quickly find relevant practice material instead of sifting through generic question banks.",
  "Repeatable practice — attempt tests multiple times to reinforce learning and track improvement.",
  "Identify weak areas early — spot gaps in knowledge while there's still time to address them before the exam.",
  "Builds exam familiarity — regular MCQ practice helps reduce unfamiliarity with the multiple-choice format on exam day.",
  "Complements traditional study — works alongside books, past papers, and syllabus review rather than replacing them.",
];

const strategyPhases = [
  {
    title: "8–10 weeks before the exam",
    items: [
      "Review the full syllabus for your post and note subject weightage",
      "Begin subject-wise MCQ practice, starting with your weakest areas",
    ],
  },
  {
    title: "4–6 weeks before the exam",
    items: [
      "Move to post-wise mock tests to combine subjects the way they'll appear in the real exam",
      "Go through KPPSC past papers to understand recurring question patterns",
    ],
  },
  {
    title: "1–3 weeks before the exam",
    items: [
      "Retake post-wise tests to measure improvement",
      "Focus revision time on subjects where scores are still inconsistent",
    ],
  },
  {
    title: "Final week",
    items: [
      "Do light revision rather than learning new material",
      "Attempt one or two full post-wise tests under quiet, timed conditions to build confidence",
    ],
  },
];

const relatedLinks = [
  { name: "KPPSC Main Page", path: "/government-exams/kppsc" },
  { name: "KPPSC Past Papers", path: "/government-exams/kppsc/past-papers" },
  { name: "KPPSC Syllabus", path: "/government-exams/kppsc/syllabus" },
  { name: "KPPSC Preparation Guide", path: "/government-exams/kppsc/preparation" },
  { name: "KPPSC MCQs", path: "/government-exams/kppsc/mcqs" },
];

export default function KppscOnlineTestsPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC", path: "/government-exams/kppsc" },
    { name: "Online Tests" },
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
            KPPSC Online Tests 2026 – Free Mock Tests, MCQs &amp; Practice Tests
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            Prepare for KPPSC recruitment exams with free post-wise and subject-wise online tests.
            Practice MCQs under exam-like conditions, track weak areas, and build confidence before
            your written test.
          </p>
          <Link
            href="#practice-kppsc-tests-by-post"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Browse KPPSC Online Tests <FaArrowRight size={11} />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <Section id="introduction" title="Introduction">
          <Prose>
            <p>
              Preparing for a Khyber Pakhtunkhwa Public Service Commission (KPPSC) recruitment exam
              requires more than reading books — it requires practice under exam-like conditions. This
              is where a <strong className="text-slate-900">KPPSC online test</strong> becomes an
              essential part of preparation.
            </p>
            <p>
              A KPPSC online test is a self-assessment tool designed to help candidates practice
              multiple-choice questions (MCQs) similar in style and difficulty to what appears in
              actual KPPSC written exams. These tests are not official KPPSC material, but they are
              built to reflect the general subject areas, question formats, and topics commonly seen
              in KPPSC recruitment tests for various posts across Khyber Pakhtunkhwa.
            </p>
            <p className="font-bold text-slate-900">Who should use KPPSC online tests?</p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Candidates who have applied for a KPPSC advertised post and are preparing for the written test",
                "Students revising General Knowledge, Pakistan Studies, Current Affairs, and post-specific subjects",
                "Job seekers who want to identify weak areas before the actual exam",
                "Anyone looking for structured, topic-wise KPPSC MCQs practice instead of scattered notes",
              ]}
            />
          </div>
          <Prose>
            <p className="font-bold text-slate-900">Why does practicing MCQs matter?</p>
            <p>
              KPPSC written exams are largely MCQ-based. Reading a topic and being able to answer a
              timed multiple-choice question on it are two different skills. Regular practice through
              mock tests helps candidates get comfortable with the MCQ format, improve recall speed
              under time pressure, reduce exam-day anxiety, and track progress over time.
            </p>
            <p>
              <strong className="text-slate-900">How PakLearners fits into your KPPSC preparation:</strong>{" "}
              PakLearners.com is building a dedicated KPPSC preparation hub that brings together
              post-wise practice tests, subject-wise MCQs, past papers, and syllabus guidance in one
              place. This page serves as the central directory for all KPPSC online tests available
              on PakLearners, organized by post and by subject so you can find relevant practice
              material quickly.
            </p>
            <p className="text-xs text-slate-500 border-l-4 border-amber-400 pl-4 py-2 bg-amber-50/50 rounded-r-lg">
              All tests on this page are intended strictly for <strong>practice and self-assessment
              purposes</strong>. They are created independently by PakLearners and are not issued,
              endorsed, or affiliated with the Khyber Pakhtunkhwa Public Service Commission.
            </p>
          </Prose>
        </Section>

        <nav className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm" aria-label="On this page">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-3">On This Page</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {tocLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-[#1565C0] font-semibold hover:underline leading-snug"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Section id="kppsc-online-tests-2026" title="KPPSC Online Tests 2026">
          <Prose>
            <p>
              KPPSC conducts recruitment tests throughout the year for a wide range of positions in
              Khyber Pakhtunkhwa&apos;s provincial departments — from administrative posts like PMS and
              Section Officer to technical and medical roles like Medical Officer and Staff Nurse. As
              KPPSC continues to announce new job advertisements through 2026, candidates need updated,
              organized, and easily accessible practice material.
            </p>
            <p>
              This page is regularly maintained to reflect current KPPSC recruitment trends, meaning
              the <strong className="text-slate-900">KPPSC online test 2026</strong> collection here
              is structured around the posts KPPSC most commonly advertises. Whether you&apos;re looking
              for a KPPSC mock test for a specific post or general MCQs practice, you&apos;ll find it
              organized below.
            </p>
            <p>
              Instead of searching multiple sources for KPPSC test preparation, PakLearners brings
              post-wise tests, subject-wise tests, past paper practice, and preparation guidance into
              a single, easy-to-navigate hub.
            </p>
          </Prose>
        </Section>

        <Section id="practice-kppsc-tests-by-post" title="Practice KPPSC Tests by Post">
          <Prose>
            <p>
              Select your target post below to access the relevant KPPSC online test. Each test is
              being developed to focus on the subject areas and MCQ patterns typically relevant to
              that post. Test pages are being rolled out progressively — posts marked as{" "}
              <strong className="text-slate-900">Coming Soon</strong> will be activated shortly, so
              check back or bookmark this page.
            </p>
            <p className="text-xs text-slate-500 border-l-4 border-blue-200 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
              <strong>Note:</strong> These practice tests are prepared by PakLearners for
              exam-preparation purposes only. They are not official KPPSC tests and do not guarantee
              questions will match the actual exam.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-xl border border-slate-200 mt-4">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  {["#", "Post", "Practice Focus", "Link"].map((h) => (
                    <th key={h} className="px-4 py-3 font-black text-xs uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {kppscPostOnlineTests.map((row) => (
                  <tr key={row.slug} className="align-top">
                    <td className="px-4 py-3 font-bold text-slate-900">{row.num}</td>
                    <td className="px-4 py-3 font-bold text-slate-900 whitespace-nowrap">{row.post}</td>
                    <td className="px-4 py-3 leading-relaxed min-w-[200px]">{row.focus}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`${kppscOnlineTestsHubPath}/${row.slug}`}
                        className="inline-flex items-center gap-1.5 font-bold text-[#1565C0] hover:underline"
                      >
                        Start Test <FaArrowRight size={10} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Can&apos;t find your exact post listed above? Check the{" "}
            <Link href="/government-exams/kppsc" className="font-bold text-[#1565C0] hover:underline">
              KPPSC main preparation page
            </Link>{" "}
            for the latest updates on newly advertised posts, or explore{" "}
            <a href="#kppsc-subject-wise-online-tests" className="font-bold text-[#1565C0] hover:underline">
              KPPSC subject-wise tests
            </a>{" "}
            below to practice by topic instead.
          </p>
        </Section>

        <Section id="how-to-prepare" title="How to Prepare for KPPSC Exams Using Online Tests">
          <Prose>
            <p>
              Online tests work best when they&apos;re part of a structured preparation routine rather
              than random practice. Here&apos;s a practical approach:
            </p>
          </Prose>
          <ol className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
            {prepareSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            For a more detailed, structured study plan, see our{" "}
            <Link href="/government-exams/kppsc/preparation" className="font-bold text-[#1565C0] hover:underline">
              KPPSC preparation guide
            </Link>
            .
          </p>
        </Section>

        <Section id="what-do-kppsc-online-tests-cover" title="What Do KPPSC Online Tests Cover?">
          <Prose>
            <p>
              KPPSC written exams generally combine a mix of general and post-specific subjects. Our
              KPPSC online tests are structured around the following broad areas, adjusted based on
              the requirements of each post:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList items={coverageSubjects} />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Exact subject weightage can vary by post and by KPPSC&apos;s own test structure for a given
            advertisement, so candidates should always cross-check the specific syllabus and test
            pattern shared in their KPPSC job advertisement or roll number slip.
          </p>
        </Section>

        <Section id="kppsc-subject-wise-online-tests" title="KPPSC Subject-Wise Online Tests">
          <Prose>
            <p>
              In addition to post-wise tests, PakLearners offers subject-wise KPPSC MCQs practice.
              This is useful if you already know which subjects need the most work, or if you&apos;re
              preparing for multiple KPPSC posts and want to strengthen your fundamentals across the
              board.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-xl border border-slate-200 mt-4">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  {["Subject", "Focus Area", "Link"].map((h) => (
                    <th key={h} className="px-4 py-3 font-black text-xs uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {kppscSubjectOnlineTests.map((row) => (
                  <tr key={row.slug} className="align-top">
                    <td className="px-4 py-3 font-bold text-slate-900 whitespace-nowrap">{row.subject}</td>
                    <td className="px-4 py-3 leading-relaxed">{row.focus}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`${kppscOnlineTestsHubPath}/subject/${row.slug}`}
                        className="inline-flex items-center gap-1.5 font-bold text-[#1565C0] hover:underline"
                      >
                        Practice Now <FaArrowRight size={10} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Subject-wise practice is particularly useful for identifying which specific topics are
            pulling your overall score down, rather than guessing based on how a full-length test
            &quot;felt.&quot; We recommend combining subject-wise and post-wise tests for the most
            complete KPPSC test preparation experience.
          </p>
        </Section>

        <Section id="how-our-kppsc-mock-tests-work" title="How Our KPPSC Mock Tests Work">
          <div className="mt-1">
            <BulletList items={mockTestSteps} />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            These tests are built for <strong className="text-slate-900">practice and learning
            purposes</strong>. They are not timed simulations of an official KPPSC exam center
            environment, and results should be treated as a self-assessment tool rather than a
            prediction of actual exam performance.
          </p>
        </Section>

        <Section id="benefits" title="Benefits of Practicing KPPSC MCQs Online">
          <div className="mt-1">
            <BulletList items={benefits} />
          </div>
        </Section>

        <Section id="preparation-strategy" title="KPPSC Online Test Preparation Strategy">
          <Prose>
            <p>
              A focused preparation strategy tends to work better than trying to cover everything at
              once. Consider this general approach:
            </p>
          </Prose>
          <div className="mt-5 space-y-4">
            {strategyPhases.map((phase) => (
              <article key={phase.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
                <h3 className="text-base font-black text-[#1565C0] mb-2">{phase.title}</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2 items-start">
                      <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                      <span>
                        {item.includes("past papers") ? (
                          <>
                            Go through{" "}
                            <Link href="/government-exams/kppsc/past-papers" className="font-bold text-[#1565C0] hover:underline">
                              KPPSC past papers
                            </Link>{" "}
                            to understand recurring question patterns
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            This structure is a general guideline — adjust the timeline based on how much preparation
            time you actually have before your KPPSC exam.
          </p>
        </Section>

        <Section id="faqs" title="Frequently Asked Questions About KPPSC Online Tests">
          <div className="space-y-2">
            {kppscOnlineTestsFaqs.map((faq, i) => {
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
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Related KPPSC Resources</h2>
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
      </div>
    </div>
  );
}
