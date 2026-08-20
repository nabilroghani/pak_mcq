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
import { kppscMcqsFaqs } from "@/data/kppscMcqsFaqs";

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
        <li key={typeof item === "string" ? item : item.key} className="flex gap-2 items-start">
          <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
          <span>{typeof item === "string" ? item : item.content}</span>
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

const subjectSections = [
  {
    title: "English MCQs",
    topics: ["Grammar", "Vocabulary", "Synonyms and antonyms", "Sentence correction", "Comprehension-related concepts"],
  },
  {
    title: "General Knowledge MCQs",
    topics: ["World knowledge", "Geography", "Important organizations", "History", "General facts"],
  },
  {
    title: "Current Affairs MCQs",
    topics: ["Pakistan-related developments", "International affairs", "Major recent events", "Important ongoing developments"],
  },
  {
    title: "Pakistan Affairs MCQs",
    topics: ["Pakistan's history", "Constitutional development", "Geography", "Important national events"],
  },
  {
    title: "Islamiat MCQs",
    topics: ["Islamic history", "Seerah", "Quranic knowledge", "Hadith", "General Islamic studies"],
  },
  {
    title: "Everyday Science MCQs",
    topics: ["Basic physics concepts", "Chemistry basics", "Biology basics", "General science awareness"],
  },
  {
    title: "Computer Science MCQs",
    topics: ["Computer fundamentals", "Hardware and software basics", "Networking concepts", "Database basics", "Programming fundamentals"],
  },
];

const preparationSteps = [
  { title: "Step 1 — Read the Syllabus", text: "Start with the official or relevant syllabus for your post so your MCQ practice stays focused on topics that actually matter." },
  { title: "Step 2 — Divide Subjects", text: "Break your preparation into manageable categories instead of trying to cover everything at once." },
  { title: "Step 3 — Practice Topic-Wise MCQs", text: "Build strong concepts in one subject before mixing it with others — this creates a stronger foundation." },
  { title: "Step 4 — Practice Mixed MCQs", text: "Once individual subjects feel solid, test yourself with mixed sets to simulate the actual exam experience." },
  { title: "Step 5 — Solve Past Papers", text: "Move on to full past papers to understand real question patterns and timing." },
  { title: "Step 6 — Track Mistakes", text: "Keep a running list of questions you got wrong and why, so you can revisit them systematically." },
  { title: "Step 7 — Take Timed Tests", text: "As your exam approaches, shift to strictly timed practice to build speed and composure." },
  { title: "Step 8 — Revise Repeatedly", text: "Use spaced revision — revisiting topics after a few days rather than only once — to make sure concepts actually stick." },
];

const preparationTips = [
  "Don't memorize blindly — focus on understanding the underlying concept, not just the answer.",
  "Understand the concept behind each question, not just the correct option.",
  "Read every option carefully before choosing — close options are often designed to test attention to detail.",
  "Use elimination to rule out clearly incorrect answers when you're unsure.",
  "Avoid spending too much time on one question — mark it and move on if you're stuck.",
  "Review wrong answers thoroughly rather than just noting the correct one and moving on.",
  "Practice regularly rather than cramming large volumes right before the exam.",
  "Follow relevant current affairs consistently, since this section changes often and can't be revised in bulk at the last minute.",
  "Combine MCQs with syllabus review so your practice stays aligned with what's actually required.",
  "Use past papers to understand real exam style alongside your MCQ practice.",
  "Take mock tests periodically to measure real progress under timed conditions.",
  "Revise weak areas identified during practice instead of only reviewing subjects you're already comfortable with.",
];

const categoryTree = `KPPSC MCQs
├── English MCQs
├── General Knowledge MCQs
├── Current Affairs MCQs
├── Pakistan Affairs MCQs
├── Islamiat MCQs
├── Everyday Science MCQs
├── Computer Science MCQs
├── Subject-Specific MCQs
├── Screening Test MCQs
└── Past Paper MCQs`;

const relatedLinks = [
  { name: "Browse KPPSC category MCQs", path: "/category/kppsc-exams" },
  { name: "KPPSC MCQs hub", path: "/mcqs/kppsc" },
  { name: "KPPSC syllabus", path: "/government-exams/kppsc/syllabus" },
  { name: "KPPSC past papers", path: "/government-exams/kppsc/past-papers" },
  { name: "KPPSC online tests", path: "/government-exams/kppsc/online-test" },
  { name: "KPPSC exam guide", path: "/government-exams/kppsc" },
];

export default function KppscMcqsPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC", path: "/government-exams/kppsc" },
    { name: "MCQs" },
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
            KPPSC MCQs 2026 – Online Practice &amp; Subject-Wise Questions
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            <strong className="text-white">KPPSC MCQs</strong> are multiple-choice practice questions
            for Khyber Pakhtunkhwa Public Service Commission written and screening tests. Regular MCQ
            practice builds accuracy, speed and recall — this page explains how to use subject-wise
            and mixed practice alongside your syllabus and past paper preparation.
          </p>
          <Link
            href="/category/kppsc-exams"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Start Practicing KPPSC MCQs <FaArrowRight size={11} />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <Section id="what-are-kppsc-mcqs" title="KPPSC MCQs">
          <Prose>
            <p>
              KPPSC MCQs are multiple-choice practice questions built around the subjects commonly
              tested in KPPSC recruitment exams. Instead of passively reading notes, solving MCQs
              forces active recall, which is a more effective way to retain information and prepare
              for an objective-type test.
            </p>
            <p>Regular MCQ practice helps candidates improve in several specific ways:</p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                { key: "accuracy", content: <><strong className="text-slate-900">Accuracy</strong> — repeated exposure to question formats reduces careless mistakes.</> },
                { key: "speed", content: <><strong className="text-slate-900">Speed</strong> — practicing under time pressure trains you to answer efficiently.</> },
                { key: "recall", content: <><strong className="text-slate-900">Recall</strong> — active questioning strengthens memory far more than passive reading.</> },
                { key: "concept", content: <><strong className="text-slate-900">Concept understanding</strong> — well-explained MCQs reinforce the &quot;why&quot; behind an answer, not just the &quot;what.&quot;</> },
                { key: "confidence", content: <><strong className="text-slate-900">Exam confidence</strong> — familiarity with question style reduces anxiety on test day.</> },
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            MCQ practice is most effective when it&apos;s treated as one part of a complete preparation
            plan — alongside syllabus coverage and past paper analysis — rather than the sole method of
            preparation.
          </p>
        </Section>

        <Section id="mcqs-online" title="KPPSC MCQs Online">
          <Prose>
            <p>Practicing KPPSC MCQs online offers clear advantages over relying only on printed material:</p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Instant practice — no need to wait for physical books; start practicing immediately.",
                "Fast revision — quickly cycle through topics you need to review before an exam.",
                "Easy access — practice from a phone or laptop wherever you are.",
                "Subject-wise learning — focus on one subject at a time instead of jumping between unrelated topics.",
                "Repeated practice — revisit the same topic multiple times until it's fully retained.",
                "Performance improvement — consistent practice sessions build measurable progress over time.",
                "Identification of weak areas — online practice makes it easier to notice which subjects consistently need more work.",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            As PakLearners&apos; KPPSC MCQ collection grows, candidates will be able to select subjects,
            attempt questions, and review explanations directly on the platform. Where a feature isn&apos;t
            yet live, treat the guidance on this page as the recommended approach to follow once it
            becomes available.
          </p>
        </Section>

        <Section id="subject-wise-mcqs" title="KPPSC Subject-Wise MCQs">
          <Prose>
            <p>
              Subject-wise practice is one of the most efficient ways to prepare, since it lets you build
              depth in one area before moving to the next. Common subject categories relevant to KPPSC
              exams include:
            </p>
          </Prose>
          <div className="mt-5 space-y-4">
            {subjectSections.map((section) => (
              <article key={section.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
                <h3 className="text-base font-black text-[#1565C0] mb-3">{section.title}</h3>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-600">
                  {section.topics.map((topic) => (
                    <li key={topic} className="flex gap-2 items-start">
                      <span className="text-slate-400 shrink-0">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            The exact subjects tested depend heavily on the specific KPPSC post and examination. A general
            administrative post is unlikely to test Computer Science or subject-specialist content in
            depth, while a computer-related or technical post will weigh those subjects more heavily.
            Always match your MCQ practice to the subject areas relevant to your specific post rather than
            assuming every category above applies to your exam.
          </p>
        </Section>

        <Section id="screening-test-mcqs" title="KPPSC Screening Test MCQs">
          <Prose>
            <p>
              Screening tests are typically the first hurdle in the KPPSC recruitment process, and they
              reward speed and accuracy just as much as knowledge. MCQ practice helps in several concrete
              ways:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Speed — repeated timed practice trains you to answer faster without sacrificing accuracy.",
                "Accuracy — familiarity with question formats reduces silly mistakes caused by misreading.",
                "Time management — practicing full sets of MCQs helps you learn how to pace yourself across a paper.",
                "Elimination techniques — MCQ practice builds the skill of ruling out clearly wrong options to narrow down the correct answer.",
                "Avoiding careless mistakes — consistent practice reduces errors caused by rushing or overlooking details in the question.",
                "Revising incorrect answers — reviewing what you got wrong after each practice session closes knowledge gaps before the real test.",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Exact details such as the number of questions, total marks, test duration or passing percentage
            vary by post and examination, so these specifics should always be confirmed from your official
            KPPSC advertisement rather than assumed from general information.
          </p>
        </Section>

        <Section id="mcqs-with-answers" title="KPPSC MCQs With Answers">
          <Prose>
            <p>
              Answers alone aren&apos;t enough to build real understanding — a candidate who only memorizes
              that &quot;the answer is C&quot; without knowing why will struggle the moment a similar question
              is phrased differently. That&apos;s why useful MCQ practice follows this structure:
            </p>
            <p className="font-bold text-slate-900 text-center py-3 bg-slate-50 rounded-xl border border-slate-100">
              Question → Options → Correct Answer → Explanation
            </p>
            <p>
              The explanation is the most valuable part of this structure. It clarifies why the correct
              option is right and, often, why the other options are wrong — which builds actual conceptual
              understanding rather than rote memorization. When practicing with MCQs that include answers,
              take the time to read the explanation even when you get the question right, since it often
              reinforces or adds to what you already know.
            </p>
          </Prose>
        </Section>

        <Section id="important-mcqs" title="Important KPPSC MCQs">
          <Prose>
            <p>
              Candidates frequently search for &quot;important&quot; KPPSC MCQs, hoping to focus their limited
              preparation time on the highest-value questions. It&apos;s important to be clear about what
              &quot;important&quot; actually means here: no MCQ can be guaranteed to appear in the actual KPPSC
              exam. Instead, &quot;important&quot; should be understood as{" "}
              <strong className="text-slate-900">high-priority practice</strong> — questions worth
              prioritizing based on:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Syllabus relevance — topics explicitly listed in your post's syllabus.",
                "Frequently tested concepts — areas that appear repeatedly across different practice sets and past papers.",
                "Past-paper patterns — question types and themes that have shown up in previous KPPSC exams.",
                "Core subject knowledge — foundational concepts that other, more specific questions tend to build on.",
                "Current affairs relevance — recent developments that are likely to stay relevant through your exam window.",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Treat any &quot;important MCQs&quot; list as a way to prioritize your study time, not as a guaranteed
            set of exam questions.
          </p>
        </Section>

        <Section id="past-paper-mcqs" title="KPPSC Past Paper MCQs">
          <Prose>
            <p>
              MCQs based on previous KPPSC papers carry particular value because they reflect the actual
              style and difficulty level used in real exams. While{" "}
              <Link href="/government-exams/kppsc/past-papers" className="font-bold text-[#1565C0] hover:underline">
                KPPSC past papers
              </Link>{" "}
              show you exactly how questions were framed in a specific year&apos;s exam, past-paper-based
              MCQs let you practice those same concepts in a more repeatable, topic-wise format — useful
              for reinforcing recurring themes without needing to redo an entire paper each time.
            </p>
            <p>
              Used together, past papers give you the full exam context while past-paper MCQs give you
              focused, repeatable practice on the concepts that matter most.
            </p>
          </Prose>
        </Section>

        <Section id="how-to-prepare" title="How to Prepare for KPPSC Using MCQs">
          <Prose>
            <p>
              A structured approach makes MCQ practice far more effective than random, unplanned solving.
              Here&apos;s a step-by-step method:
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

        <Section id="preparation-tips" title="KPPSC MCQs Preparation Tips">
          <div className="mt-1">
            <BulletList items={preparationTips} />
          </div>
        </Section>

        <Section id="mcqs-vs-past-papers-vs-syllabus" title="KPPSC MCQs vs Past Papers vs Syllabus">
          <Prose>
            <p>Each of these three resources plays a distinct role in your preparation:</p>
          </Prose>
          <DataTable
            headers={["Resource", "Main Purpose"]}
            rows={[
              ["KPPSC Syllabus", "Defines what to study"],
              ["KPPSC Past Papers", "Shows how previous questions were asked"],
              ["KPPSC MCQs", "Provides repeated practice to improve speed and accuracy"],
            ]}
          />
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            None of these resources fully replaces the others. The{" "}
            <Link href="/government-exams/kppsc/syllabus" className="font-bold text-[#1565C0] hover:underline">
              KPPSC syllabus
            </Link>{" "}
            tells you the full scope of what&apos;s relevant to your post,{" "}
            <Link href="/government-exams/kppsc/past-papers" className="font-bold text-[#1565C0] hover:underline">
              KPPSC past papers
            </Link>{" "}
            show you the real exam format and difficulty level, and MCQ practice builds the repetition
            needed to actually perform well under timed conditions. Candidates who use all three together
            generally prepare more efficiently than those who rely on just one.
          </p>
        </Section>

        <Section id="category-structure" title="Recommended KPPSC MCQ Category Structure">
          <Prose>
            <p>
              As PakLearners&apos; KPPSC MCQ resources expand, they are intended to be organized under a
              clear, scalable structure such as:
            </p>
          </Prose>
          <pre className="mt-4 p-4 md:p-6 bg-slate-900 text-emerald-300 text-xs md:text-sm rounded-xl overflow-x-auto font-mono leading-relaxed">
            {categoryTree}
          </pre>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            This structure is designed to make it easy for candidates to find relevant practice material
            by subject or exam type as more MCQs are added over time.
          </p>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed bg-blue-50 border border-blue-100 rounded-xl p-4">
            To make online MCQ practice genuinely useful, an effective interface would ideally support
            features such as subject filters, a search function, difficulty filters, a visible question
            count, correct/incorrect tracking, next/previous navigation, an explanation shown after each
            answer, a score summary at the end of a set, the option to retake a quiz, and topic-based
            practice sessions. These are recommended functionality to guide how the practice experience
            should work as it develops — not a claim that every feature is already live.
          </p>
        </Section>

        <Section id="faq" title="Frequently Asked Questions About KPPSC MCQs">
          <div className="space-y-2">
            {kppscMcqsFaqs.map((faq, i) => {
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
            KPPSC MCQs are one of the most practical tools for building exam readiness, but they work
            best as part of a complete preparation strategy. Begin with the{" "}
            <Link href="/government-exams/kppsc/syllabus" className="font-bold text-[#1565C0] hover:underline">
              KPPSC syllabus
            </Link>{" "}
            to understand what&apos;s relevant to your post, reinforce your understanding with subject-wise
            MCQ practice, work through{" "}
            <Link href="/government-exams/kppsc/past-papers" className="font-bold text-[#1565C0] hover:underline">
              KPPSC past papers
            </Link>{" "}
            to see how questions are actually framed, and test your overall readiness with{" "}
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
            resources as you continue your preparation.
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
            This guide is maintained as educational preparation material. Subject coverage and MCQ
            availability may expand over time — always confirm relevant subjects against your official
            KPPSC syllabus and advertisement.
          </p>
        </section>
      </div>
    </div>
  );
}
