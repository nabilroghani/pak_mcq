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
import { kppscPmsOnlineTestMcqs } from "@/data/kppscPmsOnlineTestMcqs";
import { kppscPmsOnlineTestFaqs } from "@/data/kppscPmsOnlineTestFaqs";

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

const pmsSubjects = [
  "English – grammar, vocabulary, comprehension",
  "Pakistan Affairs – political history, key events, national institutions",
  "Current Affairs – recent national and international developments",
  "General Knowledge – broad awareness questions",
  "Everyday Science – general science concepts relevant to daily life",
  "Islamiat – general Islamic studies",
  "Urdu – grammar and language basics",
  "General Ability – logical and analytical reasoning",
  "Geography – Pakistan and world geography",
  "History – Pakistan and subcontinental history",
  "Computer / IT – basic computer literacy and concepts",
  "World Affairs – international relations and global events",
  "Pakistan Studies / Constitution – constitutional basics and national framework, where relevant to the post",
];

const prepareSteps = [
  "Understand the syllabus first. Before opening any book, know exactly which subjects and topics KPPSC expects for the PMS exam.",
  "Study subject-wise. Break your preparation into manageable subject blocks instead of jumping between topics randomly.",
  "Practice MCQs regularly. Use tools like this PMS online test to actively test what you've studied, not just review it.",
  {
    text: "Solve past papers. Reviewing previous KPPSC question patterns helps you understand how topics are typically framed.",
    link: { href: "/blog/kppsc-past-papers-mcqs-preparation", label: "KPPSC past papers and MCQs" },
    linkSuffix: " resource for guided practice.",
  },
  "Follow current affairs consistently. Set aside 15–20 minutes daily for national and international news rather than cramming it before the exam.",
  "Improve your English. Since English carries real weight in the PMS exam, regular grammar and vocabulary practice pays off over time.",
  "Take timed mock tests. Practicing under time pressure builds the pace you'll need on exam day.",
  "Analyze your mistakes. Don't just note wrong answers — understand why you got them wrong.",
  "Revise weak topics repeatedly. Weak areas need more frequent revision cycles than subjects you're already confident in.",
  "Maintain a consistent study schedule. Steady daily progress beats irregular, high-intensity study bursts before the exam.",
];

const mockBenefits = [
  "Builds exam stamina. Sitting through a full set of MCQs trains your focus for the length of the actual test.",
  "Highlights recurring weak spots. If you keep missing questions from the same subject, that's a clear signal for where to focus your next study session.",
  "Reduces exam-day surprises. Familiarity with the MCQ format reduces the anxiety that comes from facing an unfamiliar test structure.",
  "Tracks real progress. Retaking tests periodically shows whether your studying is actually translating into better performance — not just more hours logged.",
];

export default function KppscPmsOnlineTestPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC", path: "/government-exams/kppsc" },
    { name: "Online Tests", path: "/government-exams/kppsc/online-tests" },
    { name: "PMS Online Test" },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href="/government-exams/kppsc/online-tests"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All KPPSC Online Tests
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            KPPSC PMS Online Test – Free PMS MCQs &amp; Practice Tests
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            Practice 15 expert-level PMS MCQs covering Pakistan Affairs, Current Affairs, General
            Knowledge, English, and more — with instant answers and explanations.
          </p>
          <Link
            href="#pms-mcqs"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Start PMS Practice MCQs <FaArrowRight size={11} />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <Section id="introduction" title="Introduction">
          <Prose>
            <p>
              If you&apos;re preparing for the Provincial Management Service exam, this page is built
              for you. Here you can practice a{" "}
              <strong className="text-slate-900">KPPSC PMS online test</strong> designed to reflect
              the type of MCQs commonly expected from serious PMS aspirants — covering Pakistan
              Affairs, Current Affairs, General Knowledge, Everyday Science, English, and more.
            </p>
            <p>
              This isn&apos;t a random collection of easy questions. The MCQs on this page are written
              to challenge candidates the way a genuine PMS screening test would, so you can practice
              with purpose rather than just scrolling through generic quizzes. Each question comes with
              the correct answer and a short explanation, so you understand <em>why</em> an answer is
              right — not just what it is.
            </p>
            <p>
              Whether you&apos;re just starting your <strong className="text-slate-900">PMS preparation online</strong>{" "}
              or fine-tuning your knowledge before the exam, repeated MCQ practice helps you retain
              facts longer, spot your weak subjects early, and get comfortable with the pace of a real
              competitive exam. Combine this test with the{" "}
              <Link href="/government-exams/kppsc/online-tests" className="font-bold text-[#1565C0] hover:underline">
                KPPSC Online Tests
              </Link>{" "}
              hub and our{" "}
              <Link href="/blog/how-to-prepare-for-kppsc-exams-2026" className="font-bold text-[#1565C0] hover:underline">
                KPPSC exam preparation guide
              </Link>{" "}
              for a complete study routine.
            </p>
            <p>
              Ready? Scroll down to attempt the practice MCQs, review the subject breakdown, and pick
              up a preparation strategy you can actually stick to.
            </p>
          </Prose>
        </Section>

        <Section id="what-is-pms-online-test" title="What is the KPPSC PMS Online Test?">
          <Prose>
            <p>
              The <strong className="text-slate-900">Provincial Management Service (PMS)</strong> is
              one of the most competitive posts advertised by the Khyber Pakhtunkhwa Public Service
              Commission, recruiting officers for administrative roles across the province. Because the
              written exam covers a broad mix of subjects,{" "}
              <strong className="text-slate-900">KPPSC PMS preparation</strong> typically requires
              candidates to build both depth (in Pakistan Affairs, Current Affairs, and General
              Knowledge) and breadth (across English, Everyday Science, and General Ability).
            </p>
            <p>
              A KPPSC PMS online test is a self-practice tool — a set of multiple-choice questions
              designed to mirror the subject areas and question style expected in the PMS screening
              test. It&apos;s not a substitute for studying the full syllabus, but it is one of the most
              efficient ways to actively test your knowledge instead of passively re-reading notes.
            </p>
            <p className="font-bold text-slate-900">Why online MCQ practice works:</p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "It forces active recall, which strengthens memory far better than re-reading.",
                "Timed practice builds the speed you'll need in the actual exam hall.",
                "Reviewing wrong answers immediately shows you exactly what to revise next.",
                "Repeating tests over time confirms whether your preparation is actually improving.",
              ]}
            />
          </div>
          <p className="mt-5 text-xs text-slate-500 border-l-4 border-amber-400 pl-4 py-2 bg-amber-50/50 rounded-r-lg">
            This page is a <strong>practice and preparation resource</strong> — it is not an official
            KPPSC test, and it does not guarantee that any specific question will appear in the actual
            PMS exam.
          </p>
        </Section>

        <Section id="why-practice-pms-mcqs" title="Why Practice PMS MCQs Online?">
          <Prose>
            <p>
              Reading is passive. Answering is active. Many PMS candidates spend weeks reading Pakistan
              Affairs and Current Affairs material, only to freeze when the same information is presented
              as a timed multiple-choice question. Practicing{" "}
              <strong className="text-slate-900">PMS MCQs online</strong> closes that gap.
            </p>
            <p>On this page, you can:</p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Attempt the practice MCQs below at your own pace",
                "Read the explanation for each question to reinforce the underlying concept",
                "Note down which subject areas you're consistently getting wrong",
                "Come back and retake the test after a revision cycle to measure improvement",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            This approach turns MCQ practice into a feedback loop rather than a one-time activity —
            which is exactly how most successful PMS candidates study.
          </p>
        </Section>

        <Section id="pms-subjects" title="PMS Online Test Subjects">
          <Prose>
            <p>
              The subjects below reflect common <strong className="text-slate-900">PMS practice test</strong>{" "}
              categories used for MCQ preparation. These are practice categories built around widely
              known PMS exam patterns — always cross-check the{" "}
              <strong className="text-slate-900">official PMS syllabus</strong> published by KPPSC in
              your specific job advertisement, since exact subjects and weightage can vary between
              announcements.
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList items={pmsSubjects} />
          </div>
        </Section>

        <Section id="pms-mcqs" title="15 Best PMS MCQs">
          <Prose>
            <p>
              Attempt these 15 practice MCQs, covering a mix of subjects relevant to PMS preparation.
              Try answering each one before checking the correct answer and explanation.
            </p>
          </Prose>
          <div className="mt-6 space-y-5">
            {kppscPmsOnlineTestMcqs.map((mcq) => (
              <PracticeMcqCard key={mcq.id} mcq={mcq} />
            ))}
          </div>
        </Section>

        <Section id="how-to-prepare-pms" title="How to Prepare for KPPSC PMS">
          <Prose>
            <p>
              A structured plan makes <strong className="text-slate-900">PMS test preparation</strong>{" "}
              far more manageable than trying to study everything at once. Here&apos;s a practical
              approach:
            </p>
          </Prose>
          <ol className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
            {prepareSteps.map((step, i) => (
              <li key={i}>
                {typeof step === "string" ? (
                  step
                ) : (
                  <>
                    {step.text} See our{" "}
                    <Link href={step.link.href} className="font-bold text-[#1565C0] hover:underline">
                      {step.link.label}
                    </Link>
                    {step.linkSuffix}
                  </>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            For a more detailed roadmap, check our full{" "}
            <Link href="/blog/how-to-prepare-for-kppsc-exams-2026" className="font-bold text-[#1565C0] hover:underline">
              KPPSC exam preparation guide
            </Link>
            .
          </p>
        </Section>

        <Section id="mock-tests-benefits" title="How Online Mock Tests Can Improve Your PMS Preparation">
          <Prose>
            <p>
              Mock tests do more than just check what you know — they train how you think under exam
              conditions. Here&apos;s how a <strong className="text-slate-900">PMS mock test</strong>{" "}
              habit helps:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList items={mockBenefits} />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Pair this PMS practice test with subject-wise tests on the{" "}
            <Link href="/government-exams/kppsc/online-tests" className="font-bold text-[#1565C0] hover:underline">
              KPPSC Online Tests
            </Link>{" "}
            hub for a more complete preparation routine covering all the areas relevant to your exam.
          </p>
        </Section>

        <Section id="past-papers-mcqs" title="KPPSC PMS Past Papers and MCQ Preparation">
          <Prose>
            <p>
              Past papers remain one of the most reliable ways to understand how KPPSC structures its
              PMS exam questions — the type of language used, common topic areas, and recurring themes
              across years. While no two years are identical, reviewing{" "}
              <strong className="text-slate-900">PMS past papers MCQs</strong> alongside fresh practice
              tests gives you a more complete picture of what to expect.
            </p>
            <p>
              We recommend using past papers and this online test together: use past papers to
              understand <em>patterns</em>, and use MCQ practice tests like this one to{" "}
              <em>actively test</em> your recall of the underlying concepts. For guided past-paper
              practice, visit our{" "}
              <Link href="/blog/kppsc-past-papers-mcqs-preparation" className="font-bold text-[#1565C0] hover:underline">
                KPPSC past papers and MCQs
              </Link>{" "}
              resource.
            </p>
          </Prose>
        </Section>

        <Section id="faq" title="Frequently Asked Questions">
          <div className="space-y-2">
            {kppscPmsOnlineTestFaqs.map((faq, i) => {
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
                      {i === 7 ? (
                        <>
                          You can explore our dedicated{" "}
                          <Link href="/blog/kppsc-past-papers-mcqs-preparation" className="font-bold text-[#1565C0] hover:underline">
                            KPPSC past papers and MCQs
                          </Link>{" "}
                          page for guided past-paper based practice.
                        </>
                      ) : (
                        faq.a
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        <section className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl">
          <h2 className="text-xl md:text-2xl font-black mb-4">Start Practicing Today</h2>
          <p className="text-sm md:text-[15px] text-blue-100/90 leading-relaxed mb-5">
            MCQ practice is one of the most effective ways to prepare for the PMS exam, but it works
            best as part of a consistent routine. Attempt the 15 practice MCQs above, note down your
            weak subjects, and revisit this page regularly as you progress through your preparation.
          </p>
          <p className="text-sm md:text-[15px] text-blue-100/90 leading-relaxed mb-6">
            For broader KPPSC preparation, explore the{" "}
            <Link href="/government-exams/kppsc/online-tests" className="font-bold text-sky-200 hover:text-white underline">
              KPPSC Online Tests
            </Link>{" "}
            hub, follow our{" "}
            <Link href="/blog/how-to-prepare-for-kppsc-exams-2026" className="font-bold text-sky-200 hover:text-white underline">
              KPPSC exam preparation guide
            </Link>
            , and strengthen your recall with{" "}
            <Link href="/blog/kppsc-past-papers-mcqs-preparation" className="font-bold text-sky-200 hover:text-white underline">
              KPPSC past papers and MCQs
            </Link>
            .
          </p>
          <Link
            href="#pms-mcqs"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Attempt PMS MCQs Now <FaArrowRight size={11} />
          </Link>
        </section>
      </div>
    </div>
  );
}
