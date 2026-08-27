"use client";

import Link from "next/link";
import { FaCheck, FaArrowRight } from "react-icons/fa";

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

const focusSubjects = [
  "Pakistan Studies",
  "Islamic Studies",
  "General Knowledge",
  "Pakistan Current Affairs",
  "World Current Affairs",
  "Everyday Science",
  "Computer Science",
  "English",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Urdu",
  "Pedagogy (for teaching-related posts)",
];

const relatedLinks = [
  { name: "PPSC & FPSC Exam Preparation", path: "/government-exams/ppsc" },
  { name: "Pakistan Studies MCQs", path: "/mcqs/pakistan-studies" },
  { name: "General Knowledge MCQs", path: "/mcqs/general-knowledge" },
  { name: "Current Affairs MCQs", path: "/mcqs/current-affairs" },
];

export default function KppscExamPrepContent() {
  return (
    <div className="bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-4 py-10 md:py-14 space-y-6 md:space-y-8">
        <Section id="kppsc-exam-preparation-guide" title="KPPSC Exam Preparation – Your Complete Guide to KPPSC Jobs 2026">
          <Prose>
            <p>
              Khyber Pakhtunkhwa Public Service Commission (KPPSC) conducts competitive and recruitment
              examinations every year for hundreds of government positions across the province. If you are
              preparing for <strong className="text-slate-900">KPPSC jobs 2026</strong>, PakLearners brings
              you a complete, free collection of KPPSC exam categories, subject-wise MCQs, past papers,
              syllabus outlines, and online mock tests — all in one place.
            </p>
            <p>
              Whether your target post is{" "}
              <strong className="text-slate-900">
                PMS, Assistant, Assistant Director, Section Officer, Tehsildar, Naib Tehsildar, Patwari,
                Junior Clerk, Computer Operator, Inspector, Sub Inspector, or Medical Officer
              </strong>
              , this page is your starting point for structured, exam-focused preparation.
            </p>
          </Prose>
        </Section>

        <Section id="why-kppsc-preparation-matters" title="Why KPPSC Exam Preparation Matters">
          <Prose>
            <p>
              KPPSC exams are highly competitive, with thousands of candidates applying for a limited number
              of seats every year. A smart preparation strategy — built around{" "}
              <strong className="text-slate-900">past papers, subject-wise MCQs, and timed online tests</strong>{" "}
              — can be the difference between clearing the written test and missing out. PakLearners is
              designed to give you exactly that structure, free of cost.
            </p>
          </Prose>
        </Section>

        <Section id="kppsc-jobs-test-preparation" title="KPPSC Jobs and Test Preparation">
          <Prose>
            <p>
              KPPSC conducts both <strong className="text-slate-900">competitive exams (like PMS)</strong> and{" "}
              <strong className="text-slate-900">recruitment exams</strong> for various BPS government posts in
              Khyber Pakhtunkhwa. Our subject-wise MCQs, previous papers, and online tests help candidates:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Understand the exact pattern and difficulty level of KPPSC papers",
                "Identify repeated and high-weightage topics",
                "Improve time management during the actual exam",
                "Build confidence through realistic mock testing",
              ]}
            />
          </div>
          <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed mt-5">
            If you&apos;re also considering federal-level opportunities alongside KPPSC, you can check our{" "}
            <Link href="/government-exams/ppsc" className="font-bold text-[#1565C0] hover:underline">
              PPSC and FPSC exam preparation guide
            </Link>{" "}
            to compare syllabi and prepare for multiple commissions simultaneously.
          </p>
        </Section>

        <Section id="kppsc-past-papers-mcqs" title="KPPSC Past Papers and MCQs">
          <Prose>
            <p>
              Practicing <strong className="text-slate-900">KPPSC past papers</strong> is one of the most
              effective ways to prepare, as KPPSC often repeats question patterns and important topics across
              different posts. Our past papers and MCQ banks are organized so you can:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Practice post-wise (Patwari, Tehsildar, Assistant, etc.)",
                "Practice subject-wise (Pakistan Studies, English, General Knowledge, etc.)",
                "Track weak areas and revise accordingly",
              ]}
            />
          </div>
          <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed mt-5">
            For focused subject practice, explore our{" "}
            <Link href="/mcqs/pakistan-studies" className="font-bold text-[#1565C0] hover:underline">
              Pakistan Studies MCQs
            </Link>{" "}
            and{" "}
            <Link href="/mcqs/general-knowledge" className="font-bold text-[#1565C0] hover:underline">
              General Knowledge MCQs
            </Link>{" "}
            — both are core, high-weightage subjects in almost every KPPSC written test.
          </p>
        </Section>

        <Section id="kppsc-online-test-preparation" title="KPPSC Online Test Preparation">
          <Prose>
            <p>
              Beyond static MCQs, PakLearners also offers{" "}
              <strong className="text-slate-900">online mock tests</strong> that simulate the real KPPSC exam
              environment. Regular practice through timed tests helps you:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Improve speed and accuracy under exam conditions",
                "Reduce exam-day anxiety through familiarity",
                "Benchmark your preparation against the actual KPPSC pattern",
              ]}
            />
          </div>
          <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed mt-5">
            Stay updated with the latest developments relevant to your test by regularly reviewing our{" "}
            <Link href="/mcqs/current-affairs" className="font-bold text-[#1565C0] hover:underline">
              Current Affairs MCQs
            </Link>
            , since Pakistan and World Current Affairs carry significant weight in most KPPSC papers.
          </p>
        </Section>

        <Section id="important-kppsc-subjects" title="Important KPPSC Subjects to Focus On">
          <Prose>
            <p>
              KPPSC written exams typically draw questions from the following subjects. Prioritize your
              revision time based on the weightage of your target post&apos;s syllabus:
            </p>
          </Prose>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {focusSubjects.map((subject) => (
              <div
                key={subject}
                className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                <FaCheck className="text-emerald-500 shrink-0" size={11} />
                {subject}
              </div>
            ))}
          </div>
        </Section>

        <section className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-lg">
          <h2 className="text-xl md:text-2xl font-black mb-3">Start Your KPPSC Exam Preparation Today</h2>
          <p className="text-blue-100/90 text-sm md:text-[15px] leading-relaxed max-w-3xl mb-6">
            Select your target KPPSC post above to access relevant MCQs, past papers, and mock tests — all
            curated to match the actual KPPSC exam pattern. Practice consistently, track your progress, and
            walk into your exam with confidence.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/category/kppsc-exams"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Browse KPPSC Categories <FaArrowRight size={11} />
            </Link>
            <Link
              href="/government-exams/kppsc/past-papers"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              KPPSC Past Papers
            </Link>
          </div>
        </section>

        <Section id="related-resources" title="Related Resources">
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
        </Section>
      </div>
    </div>
  );
}
