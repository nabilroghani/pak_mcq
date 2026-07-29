"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaCheck,
  FaBookOpen,
  FaClipboardList,
  FaLaptop,
  FaFileAlt,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

const exams = [
  {
    name: "FPSC",
    path: "/government-exams/fpsc",
    text: "Federal posts, CSS-related screening focus, GK, current affairs, Pakistan Studies and English.",
  },
  {
    name: "PPSC",
    path: "/government-exams/ppsc",
    text: "Punjab provincial jobs — GK, Pakistan Studies, Islamiat, current affairs and basic English.",
  },
  {
    name: "KPPSC",
    path: "/government-exams/kppsc",
    text: "KP provincial exams with general subjects plus region-focused general knowledge.",
  },
  {
    name: "ETEA",
    path: "/government-exams/etea",
    text: "Time-pressured KP tests — timed online MCQ practice builds speed and accuracy.",
  },
  {
    name: "NTS",
    path: "/government-exams/nts",
    text: "Departmental tests nationwide — GK, analytical ability and English across most formats.",
  },
];

const mcqSubjects = [
  { name: "General Knowledge", path: "/category/general-knowledge", note: "Geography, world affairs, dates & orgs" },
  { name: "Pakistan Studies", path: "/category/pak-study", note: "History, constitution, geography" },
  { name: "Current Affairs", path: "/category/Pak-Current-Affairs", note: "National & international updates" },
  { name: "Islamic Studies", path: "/category/islamic-studies", note: "Seerah, basics & history" },
  { name: "Computer", path: "/category/computer", note: "Digital literacy for offices" },
  { name: "English", path: "/category/english", note: "Grammar, vocab & comprehension" },
];

const features = [
  { title: "Topic-Wise MCQs", desc: "Practice by subject instead of unsorted dumps." },
  { title: "Exam-Wise Prep", desc: "Content mapped to FPSC, PPSC, KPPSC, ETEA & NTS." },
  { title: "Solved Past Papers", desc: "Papers with answers by exam body." },
  { title: "Online Mock Tests", desc: "Timed tests that mirror real exam pressure." },
  { title: "Current Affairs", desc: "Refreshed content — not months-old material." },
  { title: "Mobile Friendly", desc: "Practice MCQs and tests from your phone." },
];

const roadmap = [
  { step: "1", title: "Choose Your Exam", text: "FPSC, PPSC, KPPSC, ETEA or NTS — prepare for one clear pattern." },
  { step: "2", title: "Study Core Subjects", text: "GK, Pakistan Studies, current affairs, Islamiat, computer & English." },
  { step: "3", title: "Practice MCQs", text: "Move from reading to daily topic-wise MCQ practice." },
  { step: "4", title: "Attempt Online Tests", text: "Timed tests for speed, pressure and weak-area spotting." },
  { step: "5", title: "Analyze Mistakes", text: "Review wrong answers — patterns matter more than the score." },
  { step: "6", title: "Revise Past Papers", text: "Final days: past papers reinforce what is most likely to reappear." },
];

const faqs = [
  {
    q: "How can I prepare for government jobs in Pakistan?",
    a: "Start by identifying your exam body — FPSC, PPSC, KPPSC, ETEA or NTS. Build a foundation in general knowledge, Pakistan Studies, current affairs, Islamic Studies and English. Combine regular MCQs with solved past papers, and use timed online tests before exam day. Consistency beats last-minute cramming.",
  },
  {
    q: "How can I prepare for FPSC exams?",
    a: "First understand the syllabus for your post. Then practice MCQs in GK, current affairs, Pakistan Studies and English, and review solved past papers for FPSC-style phrasing. Timed tests in the final weeks convert knowledge into exam-day speed.",
  },
  {
    q: "What subjects are covered in PPSC MCQs?",
    a: "PPSC MCQs generally cover GK, Pakistan Studies, Islamic Studies, current affairs and basic English, plus post-specific technical topics. Exact mix varies by post — past papers show how PPSC typically frames questions.",
  },
  {
    q: "How should I prepare for KPPSC exams?",
    a: "Combine GK and current affairs with KP-focused general knowledge. Also practice Pakistan Studies and Islamic Studies. Solved past papers help you learn KPPSC’s style compared with other provincial commissions.",
  },
  {
    q: "What is the best way to prepare for ETEA tests?",
    a: "ETEA is often time-pressured. Pair topic-wise MCQs with timed online tests that simulate the format, and review past papers for difficulty and question style.",
  },
  {
    q: "Are NTS MCQs the same for every department?",
    a: "No — content varies by hiring body. Most NTS tests still share GK, analytical ability and English, with technical questions added per post. Confirm your pattern, then strengthen the common core.",
  },
  {
    q: "Are online MCQ tests helpful for exam preparation?",
    a: "Yes. Timed tests simulate real conditions, build pacing, and show weak subjects early so revision becomes targeted instead of random.",
  },
  {
    q: "Why are past papers important for competitive exams?",
    a: "They reveal phrasing, repeated topics and realistic difficulty that a syllabus alone cannot show. Reviewing several years of papers helps you calibrate preparation for FPSC, PPSC, KPPSC, ETEA or NTS.",
  },
  {
    q: "How can I improve my general knowledge for competitive exams?",
    a: "Use structured MCQs on geography, organizations, sports and awareness topics that appear across major commissions. Past papers show which GK themes each body repeats.",
  },
  {
    q: "How should I prepare for current affairs MCQs?",
    a: "Treat current affairs as ongoing practice with recently updated MCQs — not a one-time review of outdated material. Pair MCQs with a light review of major recent news.",
  },
  {
    q: "What is the best website for MCQs preparation in Pakistan?",
    a: "It depends on your goal. For FPSC, PPSC, KPPSC, ETEA or NTS, a platform organized by exam body — with subject MCQs, updated current affairs and past papers — is more efficient than general education sites.",
  },
  {
    q: "How many hours should I study for government exams?",
    a: "It depends on your level and timeline. Consistent daily study — even two to three focused hours — usually beats irregular long sessions. Add more timed tests in the final weeks.",
  },
  {
    q: "Which subjects are most important for government job tests?",
    a: "Across FPSC, PPSC, KPPSC and NTS, six subjects appear often: General Knowledge, Pakistan Studies, Current Affairs, Islamic Studies, Computer basics and English. Technical posts add specialized content on top of this core.",
  },
  {
    q: "Where can I find solved past papers with answers?",
    a: "Use organized government-exam platforms that keep papers by body, year and post category. Prefer updated, clearly labeled collections over incomplete dumps.",
  },
  {
    q: "How can PakLearners help in my exam preparation?",
    a: "PakLearners focuses on subject-wise MCQs, past papers and online tests for FPSC, PPSC, KPPSC, ETEA and NTS — not Matric/Intermediate clutter. You get exam-pattern resources and timed practice in one place.",
  },
];

const CtaButtons = ({ primary, secondary }) => (
  <div className="flex flex-wrap gap-3">
    {primary && (
      <Link
        href={primary.to}
        className="inline-flex items-center gap-2 bg-[#1565C0] hover:bg-[#0d47a1] text-white text-sm font-bold px-5 py-3 rounded-xl shadow-md transition-all"
      >
        {primary.label} <FaArrowRight size={11} />
      </Link>
    )}
    {secondary && (
      <Link
        href={secondary.to}
        className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-[#1565C0] text-slate-800 text-sm font-bold px-5 py-3 rounded-xl transition-all"
      >
        {secondary.label}
      </Link>
    )}
  </div>
);

const Section = ({ children, className = "", id }) => (
  <section id={id} className={`py-12 md:py-16 ${className}`}>
    <div className="max-w-6xl mx-auto px-4 md:px-6">{children}</div>
  </section>
);

const HomeSeoContent = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-white text-slate-800">
      {/* SEO Hero copy under banner */}
      <Section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 !pt-8 !pb-10">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1565C0] mb-3">
          PakLearners · Government Jobs Preparation
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 max-w-4xl leading-tight mb-4">
          Government Jobs Preparation Pakistan — MCQs, Past Papers & Online Tests in One Place
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl mb-6">
          Preparing for FPSC, PPSC, KPPSC, ETEA or NTS shouldn&apos;t mean juggling ten websites and outdated PDFs.
          PakLearners brings organized, subject-wise MCQs, solved past papers and free online tests together for
          Pakistan&apos;s government job aspirants.
        </p>
        <CtaButtons
          primary={{ to: "/mcqs", label: "Start Practicing MCQs" }}
          secondary={{ to: "/online-tests", label: "Attempt Free Online Test" }}
        />
        <div className="mt-3">
          <Link href="/past-papers" className="text-sm font-bold text-[#1565C0] hover:underline">
            Explore Past Papers →
          </Link>
        </div>
      </Section>

      {/* CTA strip */}
      <Section className="bg-[#1565C0] text-white !py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black mb-2">Start Your Government Exam Preparation Today</h2>
            <p className="text-blue-100 text-sm max-w-xl leading-relaxed">
              Pick your exam body, review core subjects, and start practicing — everything is organized in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/government-exams"
              className="bg-white text-[#1565C0] font-bold text-sm px-5 py-3 rounded-xl hover:bg-blue-50 transition-all"
            >
              Begin Preparation
            </Link>
            <Link
              href="/mcqs"
              className="bg-white/10 border border-white/30 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20 transition-all"
            >
              Browse MCQs
            </Link>
          </div>
        </div>
      </Section>

      {/* What is PakLearners */}
      <Section>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">What is PakLearners?</h2>
        <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-3xl">
          <p>
            Most students preparing for government jobs in Pakistan face the same problem: preparation material is
            scattered. One site has MCQs but no past papers. Another has papers but nothing organized by exam body.
            Current affairs go stale. Many platforms mix competitive content with Matric or Intermediate material.
          </p>
          <p>
            PakLearners exists to fix that. We focus on one purpose: helping candidates for FPSC, PPSC, KPPSC, ETEA,
            NTS and departmental tests find exam-focused, organized and updated preparation — without unrelated
            clutter.
          </p>
        </div>
        <ul className="mt-6 grid sm:grid-cols-3 gap-3">
          {[
            "Exam-focused content by FPSC, PPSC, KPPSC, ETEA & NTS",
            "Updated current affairs & GK practice",
            "Clear path: subjects → MCQs → tests → past papers",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-3 items-start bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-semibold text-slate-700"
            >
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={14} />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-slate-600 max-w-3xl leading-relaxed">
          Whether you&apos;re attempting your first FPSC test, applying for a{" "}
          <Link href="/government-exams/ppsc" className="font-bold text-[#1565C0] hover:underline">
            PPSC-advertised post
          </Link>{" "}
          in Punjab, or preparing for an NTS departmental test — PakLearners supports you from day one to the exam hall.
        </p>
      </Section>

      {/* Government exams */}
      <Section className="bg-slate-50 border-y border-slate-100">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
          Government Exam Preparation Pakistan
        </h2>
        <p className="text-sm text-slate-600 max-w-3xl mb-8 leading-relaxed">
          Each exam body has its own pattern and weightage. Preparing generically is a common mistake. Here&apos;s
          what matters for the major commissions.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <Link
              key={exam.name}
              href={exam.path}
              className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-[#1565C0]/40 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-black text-[#1565C0]">{exam.name}</span>
                <FaArrowRight
                  size={12}
                  className="text-slate-300 group-hover:text-[#1565C0] group-hover:translate-x-0.5 transition-all"
                />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{exam.text}</p>
            </Link>
          ))}
          <Link
            href="/government-exams"
            className="flex items-center justify-center bg-[#1565C0] text-white rounded-2xl p-5 font-black text-sm hover:bg-[#0d47a1] transition-all"
          >
            View All Government Exams →
          </Link>
        </div>
        <p className="mt-6 text-sm text-slate-600 max-w-3xl leading-relaxed">
          The approach that works best: know the syllabus, practice topic-wise MCQs, attempt timed online tests, and
          review past papers for recurring patterns. Our{" "}
          <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">
            FPSC Preparation
          </Link>{" "}
          hub is built around that method.
        </p>
      </Section>

      {/* MCQ categories */}
      <Section>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2">MCQs Categories</h2>
        <p className="text-sm text-slate-600 max-w-3xl mb-8 leading-relaxed">
          Core subjects appear across almost every government job test. Strengthening them improves performance across
          multiple exams at once.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mcqSubjects.map((s) => (
            <Link
              key={s.name}
              href={s.path}
              className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4 hover:bg-blue-50 hover:border-blue-200 transition-all"
            >
              <FaBookOpen className="text-[#1565C0] mt-1 shrink-0" size={16} />
              <div>
                <p className="font-bold text-sm text-slate-900">{s.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.note}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate-600">
          Start with{" "}
          <Link href="/category/general-knowledge" className="font-bold text-[#1565C0] hover:underline">
            General Knowledge MCQs
          </Link>{" "}
          and{" "}
          <Link href="/category/pak-study" className="font-bold text-[#1565C0] hover:underline">
            Pakistan Studies MCQs
          </Link>
          .
        </p>
        <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-black text-lg mb-1">Practice Thousands of Exam-Based MCQs</h3>
            <p className="text-sm text-slate-300">Organized by subject — no sign-up walls, no clutter.</p>
          </div>
          <CtaButtons
            primary={{ to: "/mcqs", label: "Practice MCQs Now" }}
            secondary={{ to: "/category/general-knowledge", label: "View Subjects" }}
          />
        </div>
      </Section>

      {/* Online tests + Past papers */}
      <Section className="bg-slate-50 border-y border-slate-100">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 text-[#1565C0] mb-3">
              <FaLaptop size={18} />
              <h2 className="text-xl font-black text-slate-900">Online MCQ Tests</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Reading builds recognition — timed{" "}
              <Link href="/online-tests" className="font-bold text-[#1565C0] hover:underline">
                Online MCQ Tests
              </Link>{" "}
              prepare you for test day: pacing, exam simulation, performance tracking and confidence under pressure.
            </p>
            <Link
              href="/online-tests/start"
              className="inline-flex items-center gap-2 bg-[#1565C0] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#0d47a1] transition-all"
            >
              Attempt a Free Online Test <FaArrowRight size={11} />
            </Link>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[#1565C0] mb-3">
              <FaFileAlt size={18} />
              <h2 className="text-xl font-black text-slate-900">Government Jobs Past Papers</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Solved{" "}
              <Link href="/past-papers" className="font-bold text-[#1565C0] hover:underline">
                past papers
              </Link>{" "}
              show phrasing, repeated topics and realistic difficulty. Use them for pattern recognition and final-week
              revision across FPSC, PPSC, KPPSC, ETEA and NTS.
            </p>
            <Link
              href="/past-papers"
              className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 text-slate-800 text-sm font-bold px-5 py-3 rounded-xl hover:border-[#1565C0] transition-all"
            >
              Browse Past Papers <FaArrowRight size={11} />
            </Link>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6">
          Everything You Need for Government Exam Preparation
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => (
            <div key={f.title} className="border border-slate-100 rounded-xl p-4 bg-white shadow-sm">
              <p className="font-black text-sm text-[#1565C0] mb-1">{f.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why different */}
      <Section className="bg-slate-50 border-y border-slate-100">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6">Why PakLearners Is Different</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Older-style sites</p>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                "Random MCQs, little organization",
                "Competitive exams mixed with general education",
                "Current affairs left stale for months",
                "No clear path from beginner to exam-ready",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-rose-400">×</span> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#1565C0] text-white rounded-2xl p-6">
            <p className="text-xs font-black uppercase tracking-widest text-blue-200 mb-3">PakLearners</p>
            <ul className="space-y-2 text-sm text-blue-50">
              {[
                "Exam-wise prep for FPSC, PPSC, KPPSC, ETEA & NTS",
                "Updated current affairs practice",
                "Clear subject categories",
                "MCQs + timed tests + past papers together",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <FaCheck className="text-emerald-300 mt-0.5 shrink-0" size={12} /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Trust + Editorial */}
      <Section>
        <div className="flex items-center gap-2 mb-4">
          <FaShieldAlt className="text-[#1565C0]" size={20} />
          <h2 className="text-xl md:text-2xl font-black text-slate-900">Why Trust PakLearners?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <p>
              <strong className="text-slate-900">Who manages PakLearners:</strong> a team focused on Pakistan&apos;s
              government job and competitive exam space — organizing and updating MCQs, past papers and tests for FPSC,
              PPSC, KPPSC, ETEA and NTS.
            </p>
            <p>
              <strong className="text-slate-900">Mission:</strong> make preparation less scattered and more structured —
              accuracy and clarity over volume. We are a study aid, not an official commission website.
            </p>
            <p>
              <strong className="text-slate-900">Research & verification:</strong> topics are checked against syllabi and
              past patterns; sensitive subjects like Islamic Studies and current affairs are reviewed carefully before
              publish.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
            <h3 className="font-black text-slate-900 mb-3">Our Editorial Policy</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• MCQs built around topics that appear in real commission tests</li>
              <li>• Past papers from publicly available sources; gaps noted honestly</li>
              <li>• Current affairs cross-checked before publishing</li>
              <li>• Errors corrected as part of regular maintenance</li>
              <li>
                • Report issues via{" "}
                <Link href="/contact" className="font-bold text-[#1565C0] hover:underline">
                  Contact
                </Link>{" "}
                or read our{" "}
                <Link href="/editorial-policy" className="font-bold text-[#1565C0] hover:underline">
                  Editorial Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Roadmap */}
      <Section className="bg-slate-50 border-y border-slate-100">
        <div className="flex items-center gap-2 mb-2">
          <FaClipboardList className="text-[#1565C0]" size={18} />
          <h2 className="text-xl md:text-2xl font-black text-slate-900">
            Complete Government Jobs Preparation Roadmap
          </h2>
        </div>
        <p className="text-sm text-slate-600 mb-8 max-w-2xl">
          A simple path that works for most candidates — from choosing an exam to final past-paper revision.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadmap.map((r) => (
            <div key={r.step} className="bg-white rounded-2xl border border-slate-100 p-5 relative">
              <span className="absolute -top-3 left-4 bg-[#1565C0] text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center">
                {r.step}
              </span>
              <h3 className="font-black text-sm text-slate-900 mt-2 mb-1">{r.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pre-FAQ CTA */}
      <Section className="!py-10">
        <div className="rounded-2xl bg-gradient-to-r from-[#0d47a1] to-[#1565C0] text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black mb-2">Ready to Improve Your Test Score?</h2>
            <p className="text-sm text-blue-100">
              Structured preparation beats random studying. Start with a subject, a timed test, or past papers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/mcqs"
              className="bg-white text-[#1565C0] font-bold text-sm px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Start Practicing MCQs
            </Link>
            <Link
              href="/online-tests/start"
              className="bg-white/10 border border-white/30 font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20"
            >
              Take a Free Test
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Section className="!pt-0">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
        <div className="max-w-3xl space-y-2">
          {faqs.map((faq, i) => {
            const open = openFaq === i;
            return (
              <div
                key={faq.q}
                className={`border rounded-xl overflow-hidden transition-colors ${
                  open ? "border-[#1565C0] bg-blue-50/40" : "border-slate-100 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-4 py-4"
                >
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  <FaChevronDown
                    size={12}
                    className={`text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

export default HomeSeoContent;
