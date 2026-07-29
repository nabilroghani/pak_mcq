"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaCheck,
  FaArrowRight,
  FaBookOpen,
  FaClipboardList,
  FaFileAlt,
  FaShieldAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { siteSections } from "@/data/siteStructure";

const prepSteps = [
  {
    step: "1",
    title: "Understand the Syllabus",
    text: "Read the official syllabus or job advertisement before studying. Weightage and pattern differ by exam body.",
  },
  {
    step: "2",
    title: "Select the Right Resources",
    text: "Use exam-matched material — topic-wise MCQs for PPSC/NTS style tests; deeper books for CSS/PMS.",
  },
  {
    step: "3",
    title: "Make a Study Schedule",
    text: "Break the syllabus into weekly targets. Consistency beats occasional long sessions.",
  },
  {
    step: "4",
    title: "Solve Past Papers",
    text: "Past papers reveal phrasing, difficulty and repeated topics that syllabi alone cannot show.",
  },
  {
    step: "5",
    title: "Practice MCQs Regularly",
    text: "Most provincial and testing-service exams are MCQ-based — daily practice builds speed and recall.",
  },
  {
    step: "6",
    title: "Stay Updated on Current Affairs",
    text: "Current affairs carries high weightage and changes continuously — treat it as ongoing practice.",
  },
  {
    step: "7",
    title: "Attempt Mock Tests",
    text: "In the final weeks, timed mocks build pacing and exam-day composure.",
  },
];

const faqs = [
  {
    q: "What are government exams in Pakistan?",
    a: "Government exams in Pakistan are competitive tests conducted by bodies like FPSC, provincial public service commissions (PPSC, KPPSC, SPSC, BPSC), and testing services such as NTS, OTS, and PTS to recruit candidates into public sector positions. These exams range from entry-level departmental tests to senior civil service exams like CSS and PMS. Each exam has its own eligibility criteria, syllabus, and pattern, so preparation strategies differ significantly depending on which exam and post a candidate is targeting.",
  },
  {
    q: "Which government exam is best in Pakistan?",
    a: "There's no single best government exam — the right one depends on qualifications, career goals, and province of residence. CSS is widely regarded as the most prestigious for senior federal civil service roles, while PMS offers a similar path at the provincial level. For quicker entry into public sector jobs, PPSC, KPPSC, or NTS-administered tests may be more accessible depending on available posts and eligibility.",
  },
  {
    q: "How can I prepare for government exams effectively?",
    a: "Start by understanding the specific exam's syllabus and pattern. Build a study schedule, use exam-relevant books and MCQs, regularly solve past papers, and stay updated on current affairs. In the final weeks, shift toward timed mock tests to build speed and confidence under real exam conditions.",
  },
  {
    q: "What is the FPSC exam?",
    a: "FPSC exams are conducted by the Federal Public Service Commission for recruitment into various federal government positions, including CSS and other BPS-scale posts. They typically include an objective-type MCQ paper covering general knowledge, current affairs, Pakistan Studies, and English, along with subject-specific content depending on the post.",
  },
  {
    q: "What is the CSS exam?",
    a: "CSS, or Central Superior Services exam, is Pakistan's premier competitive exam for recruiting officers into senior civil service positions, including the Foreign Service, Police Service, and Administrative Service groups. It is conducted by FPSC and includes written papers in compulsory and optional subjects, followed by a psychological assessment and interview for those who qualify.",
  },
  {
    q: "What is the difference between CSS and PMS?",
    a: "CSS is a federal-level competitive exam conducted by FPSC for senior federal civil service positions, while PMS is its provincial equivalent, conducted by provincial public service commissions like PPSC for provincial administrative posts. Both share a similar structure — written papers followed by an interview — but differ in service groups and jurisdictions.",
  },
  {
    q: "Which books are best for government exam preparation?",
    a: "The best books depend on the specific exam and syllabus. Prioritize material that matches the actual exam pattern. For MCQ-based exams like PPSC, KPPSC, or NTS, topic-wise practice books and updated current affairs resources tend to be more useful than dense textbooks meant for CSS or PMS.",
  },
  {
    q: "Where can I find government exam past papers?",
    a: "Past papers are available through organized exam preparation platforms that maintain collections by exam body and year. They help you understand how a specific commission phrases questions and which topics repeat across test cycles — especially useful in the final weeks before an exam.",
  },
  {
    q: "What is the eligibility criteria for FPSC exams?",
    a: "FPSC eligibility varies by post but generally requires a relevant Bachelor's or Master's degree, with age limits set per advertisement. CSS typically requires at least a second-division Bachelor's degree or equivalent CGPA, with age limits often between 21 and 30 years, subject to relaxations for certain categories.",
  },
  {
    q: "How is PPSC different from FPSC?",
    a: "FPSC recruits for federal government positions, while PPSC handles provincial government posts within Punjab. Both often use objective-type MCQ tests covering general knowledge, current affairs, and post-specific subjects, but eligibility, domicile requirements, and advertised posts differ.",
  },
  {
    q: "What subjects are important for NTS tests?",
    a: "NTS content varies by hiring department, but most tests share a common core of general knowledge, analytical or verbal ability, and English. Technical questions are added based on the post — confirm the exact pattern while building a strong general foundation.",
  },
  {
    q: "How long does it take to prepare for CSS?",
    a: "Most successful aspirants dedicate several months to a full year of consistent study, given the depth of compulsory and optional subjects. Sustained preparation tends to produce better results than short, intense bursts — especially for essay writing and optional subjects.",
  },
  {
    q: "Are online MCQ tests useful for government exam preparation?",
    a: "Yes. Most government exams in Pakistan, aside from CSS and PMS written stages, are entirely or largely MCQ-based. Timed online tests simulate real pressure, help build speed and accuracy, and highlight weak subjects for focused revision.",
  },
  {
    q: "What is the age limit for government jobs in Pakistan?",
    a: "Age limits vary by exam and post. CSS and PMS often require candidates within a range around 21–30 years, with relaxations for certain categories. Provincial and departmental tests set their own limits per advertisement — always verify current limits before applying.",
  },
  {
    q: "How can PakLearners help with government exam preparation?",
    a: "PakLearners brings together syllabus guidance, organized MCQs, solved past papers, and online tests for government exams in Pakistan — including FPSC, CSS, PPSC, KPPSC, and NTS-administered tests — organized by exam body so you prepare for what is actually relevant.",
  },
];

const ExamCard = ({ title, authority, eligibility, pattern, tips, link, linkLabel }) => (
  <article className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
    <h4 className="text-lg font-black text-[#1565C0] mb-3">{title}</h4>
    <dl className="space-y-2.5 text-sm text-slate-600 leading-relaxed">
      <div>
        <dt className="font-bold text-slate-900 inline">Conducting Authority: </dt>
        <dd className="inline">{authority}</dd>
      </div>
      <div>
        <dt className="font-bold text-slate-900 inline">Eligibility: </dt>
        <dd className="inline">{eligibility}</dd>
      </div>
      <div>
        <dt className="font-bold text-slate-900 inline">Exam Pattern: </dt>
        <dd className="inline">{pattern}</dd>
      </div>
      <div>
        <dt className="font-bold text-slate-900 block mb-1">Preparation Tips:</dt>
        <dd>{tips}</dd>
      </div>
    </dl>
    {link && (
      <Link
        href={link}
        className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-[#1565C0] hover:underline"
      >
        {linkLabel || "Explore page"} <FaArrowRight size={10} />
      </Link>
    )}
  </article>
);

export default function GovernmentExamsPillar() {
  const [openFaq, setOpenFaq] = useState(0);
  const section = siteSections["government-exams"];

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-300 mb-3">
            Pak Learners · Government Exams
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-3 leading-tight max-w-4xl">
            Government Exams in Pakistan – Complete Preparation Guide, Syllabus, Past Papers & Updates
          </h1>
          <p className="text-sky-200/90 text-xs md:text-sm font-semibold mb-2">
            Last Updated: July 2026
          </p>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            This guide is reviewed and updated on an ongoing basis to reflect changes in exam patterns, eligibility
            criteria, and syllabus updates announced by FPSC, provincial public service commissions, and testing
            services like NTS. Where official details change, we aim to update this page accordingly rather than
            leaving outdated information in place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/government-exams/fpsc"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Start with FPSC <FaArrowRight size={11} />
            </Link>
            <Link
              href="/past-papers"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              Browse Past Papers
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-10">
        {/* Quick explore cards */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            Explore Government Exams
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {section.links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 transition-all border bg-slate-50 border-slate-100 text-slate-800 hover:border-blue-200 hover:bg-blue-50/60"
              >
                <div>
                  <span className="block text-sm font-bold">{link.name}</span>
                  {link.note && (
                    <span className="block text-[11px] mt-0.5 text-slate-400">{link.note}</span>
                  )}
                </div>
                <FaArrowRight
                  size={11}
                  className="text-slate-300 group-hover:text-[#1565C0] group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            ))}
          </div>
          <div
            className="mt-6 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="Types of government exams in Pakistan infographic — federal, provincial, and testing services"
          >
            {[
              { title: "Federal", items: "FPSC · CSS · Federal jobs tests" },
              { title: "Provincial", items: "PPSC · KPPSC · SPSC · BPSC · PMS" },
              { title: "Testing Services", items: "NTS · OTS · PTS · CTS" },
            ].map((col) => (
              <div
                key={col.title}
                className="rounded-xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white px-4 py-3 text-center"
              >
                <p className="text-[10px] font-black uppercase tracking-wider text-[#1565C0] mb-1">
                  {col.title}
                </p>
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">{col.items}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Introduction</h2>
          <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            <p>
              <strong className="text-slate-900">Government exams in Pakistan</strong> are the standard route into
              public sector employment — from entry-level departmental posts to top-tier civil service positions like
              CSS and PMS. These exams are conducted by different bodies depending on the level and province of the
              job: federal posts typically go through FPSC, provincial posts through commissions like PPSC or KPPSC,
              and many departmental posts through testing services such as NTS, OTS, or PTS.
            </p>
            <p>
              Government careers remain popular for job security, structured progression, pension benefits, and a
              clear merit-based entry process. That same structure means competition is high — success depends on
              understanding the specific exam&apos;s syllabus, pattern, and preparation requirements.
            </p>
            <p>
              Many capable candidates underperform not from lack of knowledge, but because they prepare generically.
              A CSS paper looks nothing like an NTS test, and PPSC&apos;s approach differs from KPPSC&apos;s regional
              focus. PakLearners exists to make this clearer — so you prepare for the exam that is actually relevant
              to you.
            </p>
          </div>
        </section>

        {/* Latest updates */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
            Latest Government Exams Updates in Pakistan
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Government exam schedules, job advertisements, and result announcements change frequently, and staying on
            top of these updates is part of effective preparation. Here&apos;s what candidates should track regularly:
          </p>
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">New job advertisements</strong> — FPSC, provincial commissions, and
                testing services publish new recruitment advertisements throughout the year, each with its own
                eligibility criteria, deadlines, and exam pattern. Checking our{" "}
                <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
                  jobs
                </Link>{" "}
                section regularly helps you stay aware of openings relevant to your qualification.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">Exam schedules</strong> — Once applications close, exam bodies
                announce test dates, which can sometimes shift. Keeping track of official schedule announcements avoids
                the risk of missing a test date.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">Roll number slips</strong> — These are typically issued closer to the
                exam date and are required for entry into the test center. Candidates should download and verify their
                roll number slip details well before exam day.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">Results</strong> — After a test is conducted, results are usually
                announced through the official exam body&apos;s website, and you can also check our{" "}
                <Link href="/results" className="font-bold text-[#1565C0] hover:underline">
                  results
                </Link>{" "}
                page for updates as they become available.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">Answer keys</strong> — Some testing services release provisional
                answer keys shortly after the exam, allowing candidates to estimate their performance before official
                results are announced.
              </span>
            </li>
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed mt-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
            We do not publish speculative or unconfirmed job listings — all advertisement and result information should
            always be cross-checked against the relevant exam body&apos;s official announcement.
          </p>
        </section>

        {/* Complete list */}
        <section>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
            Complete List of Government Exams in Pakistan
          </h2>
          <p className="text-sm text-slate-600 mb-6 max-w-3xl leading-relaxed">
            Government exams generally fall into four categories: federal exams, provincial exams, competitive civil
            service exams, and departmental testing services. Knowing your category is the first step toward focused
            preparation.
          </p>

          <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
            <FaUserGraduate className="text-[#1565C0]" /> Federal Government Exams
          </h3>
          <div className="grid md:grid-cols-1 gap-4 mb-8">
            <ExamCard
              title="FPSC (Federal Public Service Commission)"
              authority="Federal Public Service Commission, Islamabad."
              eligibility="Varies by post — generally a relevant Bachelor's or Master's degree. Age limits differ by post and appear in each job advertisement."
              pattern="Typically an objective MCQ paper covering general knowledge, current affairs, Pakistan Studies, Islamic Studies, and English, plus subject-specific portions for specialized posts. Some posts include an interview after the written test."
              tips={
                <>
                  Focus on current affairs and general knowledge. Review your post&apos;s syllabus carefully. Explore
                  our{" "}
                  <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">
                    FPSC
                  </Link>{" "}
                  exam page for syllabus breakdowns and topic-wise MCQs.
                </>
              }
              link="/government-exams/fpsc"
              linkLabel="Open FPSC page"
            />
            <ExamCard
              title="CSS Exam (Central Superior Services)"
              authority="Federal Public Service Commission, Islamabad."
              eligibility="Bachelor's degree (minimum 2nd division or equivalent CGPA) from a recognized university; age typically 21–30, with relaxations for certain categories."
              pattern="Written papers covering compulsory subjects (English Essay, General Knowledge, Pakistan Affairs, Islamic Studies/Comparative Religion, Current Affairs) and optional subjects, followed by psychological assessment and interview."
              tips={
                <>
                  CSS needs sustained, long-term preparation. Strong essay writing, wide current affairs reading, and
                  well-chosen optionals matter as much as raw knowledge. See our{" "}
                  <Link href="/government-exams/css" className="font-bold text-[#1565C0] hover:underline">
                    CSS exam
                  </Link>{" "}
                  section for subject-wise guidance and past paper trends.
                </>
              }
              link="/government-exams/css"
              linkLabel="Open CSS page"
            />
            <ExamCard
              title="Federal Jobs Tests (Other Departmental Recruitment)"
              authority="Varies — often the hiring department or a testing service acting on its behalf."
              eligibility="Set individually per advertisement; generally intermediate to graduate-level."
              pattern="Usually a single objective MCQ paper covering general knowledge, basic English, and post-relevant subject knowledge."
              tips="Identify the actual conducting body from the job advertisement — preparation should match NTS/OTS/PTS style when outsourced, not assume an FPSC format."
            />
          </div>

          <h3 className="text-lg font-black text-slate-900 mb-3">Provincial Government Exams</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <ExamCard
              title="PPSC (Punjab Public Service Commission)"
              authority="Punjab Public Service Commission, Lahore."
              eligibility="Varies by post — intermediate for some clerical roles to Bachelor's/Master's for specialist posts."
              pattern="Objective MCQ tests covering GK, Pakistan Studies, Islamic Studies, current affairs, and basic English, plus post-specific knowledge."
              tips={
                <>
                  Maintain consistent MCQs practice year-round. Visit our{" "}
                  <Link href="/government-exams/ppsc" className="font-bold text-[#1565C0] hover:underline">
                    PPSC
                  </Link>{" "}
                  exam page for subject-wise preparation.
                </>
              }
              link="/government-exams/ppsc"
              linkLabel="Open PPSC page"
            />
            <ExamCard
              title="KPPSC"
              authority="Khyber Pakhtunkhwa Public Service Commission, Peshawar."
              eligibility="Varies by post; qualifications and age limits specified per advertisement."
              pattern="Objective MCQ tests covering GK, current affairs, and Pakistan Studies, often with KP-specific content."
              tips="Balance standard GK with KP geography, history, and regional current affairs."
              link="/government-exams/kppsc"
              linkLabel="Open KPPSC page"
            />
            <ExamCard
              title="SPSC"
              authority="Sindh Public Service Commission, Karachi."
              eligibility="Set per post to match grade and department."
              pattern="Often MCQ-based; some senior posts use subjective/essay papers plus interview."
              tips="Confirm whether your post uses MCQs or subjective papers — essay-style answers need a different approach."
              link="/government-exams/spsc"
              linkLabel="Open SPSC page"
            />
            <ExamCard
              title="BPSC"
              authority="Balochistan Public Service Commission, Quetta."
              eligibility="Varies by post, similar structure to other provincial commissions."
              pattern="Objective MCQ tests covering GK, current affairs, and Pakistan Studies, plus technical content where needed."
              tips="Consistent MCQs practice plus regional current affairs relevant to Balochistan."
              link="/government-exams/bpsc"
              linkLabel="Open BPSC page"
            />
          </div>

          <h3 className="text-lg font-black text-slate-900 mb-3">Competitive Exams</h3>
          <div className="grid md:grid-cols-1 gap-4 mb-8">
            <ExamCard
              title="PMS (Provincial Management Service)"
              authority="Respective provincial public service commission (e.g. PPSC for Punjab)."
              eligibility="Bachelor's degree from a recognized university; age limits similar to CSS with provincial variations."
              pattern="Written papers covering compulsory and optional subjects, then psychological assessment and interview."
              tips={
                <>
                  PMS overlaps with CSS on compulsory subjects — also study province-specific content. Our{" "}
                  <Link href="/government-exams/pms" className="font-bold text-[#1565C0] hover:underline">
                    PMS exam
                  </Link>{" "}
                  page covers guidance tailored to this overlap.
                </>
              }
              link="/government-exams/pms"
              linkLabel="Open PMS page"
            />
            <ExamCard
              title="PCS (Provincial Civil Service, where applicable)"
              authority="Relevant provincial public service commission."
              eligibility="Bachelor's degree at minimum, with domicile requirements set by the commission."
              pattern="Generally written exam plus interview; subject requirements vary by province."
              tips="Confirm the exact structure from the official advertisement — naming and format can vary between provinces."
            />
          </div>

          <h3 className="text-lg font-black text-slate-900 mb-3">Other Testing Services</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <ExamCard
              title="NTS (National Testing Service)"
              authority="National Testing Service, on behalf of the hiring department."
              eligibility="Set by the hiring department per advertised post."
              pattern="Objective MCQs — typically GK, analytical/verbal ability, and English, plus subject-specific questions."
              tips="Confirm NAT/GAT-style or department-specific format before preparing; still build a strong general foundation."
              link="/government-exams/nts"
              linkLabel="Open NTS page"
            />
            <ExamCard
              title="CTS / OTS / PTS"
              authority="Varies by province and hiring organization (CTS, Open Testing Service, Punjab Testing Service)."
              eligibility="Set individually per advertised post."
              pattern="Objective MCQ papers covering GK, English, and post-specific content."
              tips="Treat like NTS: confirm syllabus in the advertisement, practice GK and current affairs, and review department past papers where available."
            />
          </div>
        </section>

        {/* Comparison table */}
        <section id="comparison" className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3">
            Government Exams in Pakistan Comparison
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            The table below summarizes the major government exams covered in this guide, to help you quickly compare
            exam level, conducting authority, and minimum qualification requirements.
          </p>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full min-w-[720px] text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1565C0] text-white">
                  <th className="px-3 py-3 font-bold rounded-tl-lg">Exam Name</th>
                  <th className="px-3 py-3 font-bold">Conducting Authority</th>
                  <th className="px-3 py-3 font-bold">Exam Level</th>
                  <th className="px-3 py-3 font-bold">Minimum Qualification</th>
                  <th className="px-3 py-3 font-bold rounded-tr-lg">Main Purpose</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {[
                  [
                    "CSS",
                    "FPSC",
                    "Federal — Senior Civil Service",
                    "Bachelor's degree (2nd division or equivalent CGPA)",
                    "Recruitment into Foreign Service, Police Service, Administrative Service, and other senior federal groups",
                  ],
                  [
                    "FPSC (general posts)",
                    "Federal Public Service Commission",
                    "Federal",
                    "Varies by post — Intermediate to Master's",
                    "Recruitment into federal ministries, divisions, and attached departments",
                  ],
                  [
                    "PMS",
                    "Provincial Public Service Commission (e.g., PPSC)",
                    "Provincial — Senior Management Service",
                    "Bachelor's degree",
                    "Recruitment into provincial administrative and management positions",
                  ],
                  [
                    "PPSC",
                    "Punjab Public Service Commission",
                    "Provincial (Punjab)",
                    "Varies by post — Intermediate to Master's",
                    "Recruitment into Punjab provincial government departments",
                  ],
                  [
                    "KPPSC",
                    "Khyber Pakhtunkhwa Public Service Commission",
                    "Provincial (KP)",
                    "Varies by post — Intermediate to Master's",
                    "Recruitment into KP provincial government departments",
                  ],
                  [
                    "SPSC",
                    "Sindh Public Service Commission",
                    "Provincial (Sindh)",
                    "Varies by post — Intermediate to Master's",
                    "Recruitment into Sindh provincial government departments",
                  ],
                  [
                    "BPSC",
                    "Balochistan Public Service Commission",
                    "Provincial (Balochistan)",
                    "Varies by post — Intermediate to Master's",
                    "Recruitment into Balochistan provincial government departments",
                  ],
                  [
                    "NTS",
                    "National Testing Service",
                    "Federal / Provincial / Departmental",
                    "Varies by hiring department — Intermediate to Master's",
                    "Test administration on behalf of various government departments, universities, and organizations",
                  ],
                ].map((row, i) => (
                  <tr key={row[0]} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-3 py-3 border-b border-slate-100 align-top ${j === 0 ? "font-bold text-slate-900" : ""}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 italic mt-4 leading-relaxed">
            Note: Minimum qualification and eligibility details vary by specific post within each exam body — always
            confirm exact requirements against the official job advertisement before applying.
          </p>
        </section>

        {/* Preparation guide */}
        <section id="preparation-guide" className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FaClipboardList className="text-[#1565C0]" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Government Exam Preparation Guide
            </h2>
          </div>
          <p className="text-sm text-slate-600 mb-6 max-w-3xl leading-relaxed">
            Regardless of which exam you&apos;re preparing for, a structured process consistently outperforms
            last-minute studying. This 7-step approach applies across FPSC, PPSC, KPPSC, NTS, and most other
            government exams in Pakistan.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prepSteps.map((s) => (
              <div key={s.step} className="relative bg-slate-50 rounded-2xl border border-slate-100 p-5 pt-6">
                <span className="absolute -top-3 left-4 bg-[#1565C0] text-white text-xs font-black w-7 h-7 rounded-full flex items-center justify-center">
                  {s.step}
                </span>
                <h3 className="font-black text-sm text-slate-900 mb-1">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <div
            className="mt-6 overflow-x-auto"
            role="img"
            aria-label="Government exam preparation process steps Pakistan"
          >
            <div className="flex items-center gap-2 min-w-[640px] text-[11px] font-bold text-slate-700">
              {[
                "Choose Exam",
                "Check Eligibility",
                "Study Syllabus",
                "Practice Past Papers",
                "Attempt Exam",
              ].map((label, i, arr) => (
                <div key={label} className="flex items-center gap-2 flex-1">
                  <span className="flex-1 text-center bg-blue-50 border border-blue-100 text-[#1565C0] rounded-lg px-2 py-2.5">
                    {label}
                  </span>
                  {i < arr.length - 1 && (
                    <FaArrowRight size={10} className="text-slate-300 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past papers */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FaFileAlt className="text-[#1565C0]" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900">Importance of Past Papers</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Past papers are among the most valuable — and most underused — resources in government exam preparation.
            They reveal phrasing, structure, repeated topics, and realistic difficulty that no syllabus document can
            fully replicate.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 mb-5">
            {[
              "Actual phrasing and structure used by each exam body",
              "Repeated or rephrased questions across test cycles",
              "Realistic difficulty calibration",
              "Subjects and topics a commission consistently emphasizes",
            ].map((t) => (
              <li key={t} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                {t}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Analyze past papers topic by topic — note frequent subjects, repeating question types, and your own gaps.
            Treat wrong answers as diagnostics, not just a score.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our{" "}
            <Link href="/past-papers" className="font-bold text-[#1565C0] hover:underline">
              past papers
            </Link>{" "}
            section organizes solved papers by exam body. For FPSC and CSS candidates, see{" "}
            <Link href="/fpsc-past-papers" className="font-bold text-[#1565C0] hover:underline">
              FPSC past papers
            </Link>{" "}
            and{" "}
            <Link href="/css-past-papers" className="font-bold text-[#1565C0] hover:underline">
              CSS past papers
            </Link>{" "}
            for pattern-based revision.
          </p>
        </section>

        {/* Eligibility */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
            Government Exam Eligibility Criteria
          </h2>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong className="text-slate-900">Education:</strong> Most posts require at least a Bachelor&apos;s
              degree; some clerical roles accept intermediate. CSS and PMS typically require at least a second-division
              Bachelor&apos;s or equivalent CGPA from a recognized university.
            </p>
            <p>
              <strong className="text-slate-900">Age limits:</strong> Vary by exam — CSS/PMS often fall around 21–30
              years with category relaxations. Provincial and departmental tests set limits per advertisement.
            </p>
            <p>
              <strong className="text-slate-900">Domicile:</strong> Provincial exams usually require domicile of that
              province; federal exams follow merit and provincial quota systems.
            </p>
            <p className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-amber-900/80">
              <strong>Common mistakes:</strong> applying without checking exact criteria, missing age relaxations,
              confusing domicile rules, or overlooking experience/professional certificates for specialized posts.
              Always verify against the official advertisement.
            </p>
          </div>
        </section>

        {/* Qualification-based */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3">
            Government Exams Based on Qualification
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Your current qualification level often determines which government exams you&apos;re eligible to apply for.
            Here&apos;s a general breakdown.
          </p>

          <h3 className="text-base font-black text-slate-900 mb-2">Government Exams After Intermediate</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            Candidates who have completed intermediate (FA/FSc or equivalent) are generally eligible for junior
            clerical, support staff, and lower BPS-scale posts advertised through PPSC, KPPSC, SPSC, BPSC, and testing
            services like NTS, OTS, and PTS. These posts typically involve an objective-type MCQ test covering general
            knowledge, basic English, and post-relevant content, without requiring the more advanced subject depth
            expected in graduate-level exams.
          </p>

          <h3 className="text-base font-black text-slate-900 mb-2">Government Exams After Graduation</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            A Bachelor&apos;s degree opens up a significantly wider range of opportunities, including:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 leading-relaxed mb-3">
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">CSS</strong> — for candidates seeking senior federal civil service
                positions.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">PMS</strong> — the provincial equivalent of CSS, for provincial
                administrative posts.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">FPSC (general posts)</strong> — various BPS-scale federal positions
                requiring a Bachelor&apos;s degree.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">PPSC</strong> — provincial posts in Punjab requiring graduate-level
                qualification.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">KPPSC</strong> — provincial posts in Khyber Pakhtunkhwa requiring
                graduate-level qualification.
              </span>
            </li>
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            Most graduate-level posts include both an MCQ-based written test and, for senior positions like CSS and PMS,
            an interview stage.
          </p>

          <h3 className="text-base font-black text-slate-900 mb-2">Government Exams After Master&apos;s Degree</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            Candidates with a Master&apos;s degree become eligible for more specialized and senior-level posts,
            including:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 leading-relaxed mb-4">
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">Lecturer positions</strong> — advertised through provincial public
                service commissions for government colleges and universities, typically requiring a relevant
                Master&apos;s degree and, in many cases, a qualifying test or NTS-conducted subject test.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">Specialist posts</strong> — technical or subject-specialist roles
                across various departments that require postgraduate qualification in a specific field.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                <strong className="text-slate-900">Research positions</strong> — roles within government research bodies
                or departments that require advanced subject knowledge, often assessed through a combination of written
                tests and interviews.
              </span>
            </li>
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed">
            Qualification requirements should always be confirmed against the specific job advertisement, since exact
            criteria can vary even within the same exam body depending on the post.
          </p>
        </section>

        {/* Resources */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FaBookOpen className="text-[#1565C0]" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Government Exam Preparation Resources
            </h2>
          </div>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            A well-rounded strategy draws on several resource types together — not just one:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {[
              { t: "Syllabus guides", d: "Clear breakdowns by subject and post type" },
              { t: "Exam-focused notes", d: "Concise notes for revision, not textbook dumps" },
              { t: "Topic-wise MCQs", d: "GK, current affairs, Pak Studies, Islamiat, English" },
              { t: "Past papers", d: "By exam body and year for pattern recognition" },
              { t: "Online tests", d: "Timed mocks for speed and exam readiness" },
              { t: "Study plans", d: "Phased schedules — especially for CSS and PMS" },
            ].map((r) => (
              <div key={r.t} className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                <p className="font-black text-sm text-[#1565C0]">{r.t}</p>
                <p className="text-xs text-slate-500 mt-0.5">{r.d}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Check current openings on our{" "}
            <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
              jobs
            </Link>{" "}
            section and track outcomes through our{" "}
            <Link href="/results" className="font-bold text-[#1565C0] hover:underline">
              results
            </Link>{" "}
            page as part of a complete preparation-to-application cycle.
          </p>
        </section>

        {/* Verify information */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3">
            How to Verify Government Exam Information
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Government exam requirements, schedules, and fee structures can change between recruitment cycles, so
            it&apos;s important to verify details directly rather than relying solely on secondary sources — including
            guides like this one.
          </p>
          <p className="text-sm font-bold text-slate-900 mb-3">
            Always check the following against official sources:
          </p>
          <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed mb-4">
            {[
              {
                t: "Official advertisements",
                d: "the job advertisement published by the exam body (FPSC, provincial commissions, or testing services) is the authoritative source for a specific post's requirements.",
              },
              {
                t: "Eligibility criteria",
                d: "qualification, age limits, and domicile requirements should be confirmed against the current advertisement, since these can change between recruitment cycles.",
              },
              {
                t: "Syllabus",
                d: "some exam bodies revise their syllabus periodically, so it's worth checking whether the syllabus for your target exam has been updated recently.",
              },
              {
                t: "Exam dates",
                d: "official schedules can shift, so candidates should monitor the relevant exam body's website or official notice board close to the expected test date.",
              },
              {
                t: "Fee details",
                d: "application fees and payment methods vary by exam body and can change, so confirm current fee requirements before submitting an application.",
              },
            ].map((item) => (
              <li key={item.t} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>
                  <strong className="text-slate-900">{item.t}</strong> — {item.d}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-4">
            Treating preparation guides and MCQs resources — including this one — as supporting material rather than a
            replacement for official information is the safest approach, since only the conducting authority can confirm
            current, binding requirements.
          </p>
        </section>

        {/* Why PakLearners */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FaShieldAlt className="text-[#1565C0]" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900">Why Choose PakLearners?</h2>
          </div>
          <ul className="space-y-2 text-sm text-slate-600 mb-4">
            {[
              "Built around Pakistan's government exam landscape — federal, provincial, competitive, and testing services",
              "Updated resources — syllabus direction, current affairs MCQs, and past papers refreshed ongoing",
              "Student-focused guides organized by exam body, not generic education clutter",
              "Plain-language explanations of patterns, eligibility, and requirements",
              "MCQs, past papers, and online tests as a connected preparation system",
            ].map((t) => (
              <li key={t} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                {t}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed">
            We focus on covering FPSC, PPSC, KPPSC, CSS, PMS, NTS, and related services accurately and keeping them
            current — rather than claiming equal depth on every exam in the country.
          </p>
        </section>

        {/* Author / review block */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <dl className="grid sm:grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <dt className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Written By</dt>
              <dd className="font-bold text-slate-900">PakLearners Editorial Team</dd>
            </div>
            <div>
              <dt className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Reviewed For</dt>
              <dd className="font-bold text-slate-900">Educational Accuracy and Student Usefulness</dd>
            </div>
            <div>
              <dt className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Last Updated</dt>
              <dd className="font-bold text-slate-900">July 2026</dd>
            </div>
          </dl>
          <p className="text-sm text-slate-600 leading-relaxed">
            This guide is maintained as part of PakLearners&apos; ongoing effort to keep government exam information
            accurate and useful for candidates across Pakistan. If you notice outdated or incorrect information, you can
            report it through our{" "}
            <Link href="/contact" className="font-bold text-[#1565C0] hover:underline">
              Contact
            </Link>{" "}
            page.
          </p>
        </section>

        {/* FAQs */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className={`border rounded-xl overflow-hidden transition-colors ${
                    open ? "border-[#1565C0] bg-blue-50/40" : "border-slate-100"
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
        </section>

        {/* Closing CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0d47a1] to-[#1565C0] text-white p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl font-black mb-2">Ready to Start Government Exam Preparation?</h2>
            <p className="text-sm text-blue-100">
              Pick your exam body, practice MCQs, and revise with past papers — all in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/mcqs"
              className="bg-white text-[#1565C0] font-bold text-sm px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Practice MCQs
            </Link>
            <Link
              href="/online-tests/start"
              className="bg-white/10 border border-white/30 font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/20"
            >
              Take a Free Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
