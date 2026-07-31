"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { spscFaqs } from "@/data/spscFaqs";

const examTypes = [
  {
    title: "Administrative Posts",
    body: "General administrative and secretariat-level posts across Sindh government departments, typically requiring a Bachelor's degree. Depending on the seniority of the post, this may involve either an objective-type MCQ paper or, for more senior administrative roles, a subjective written component, generally followed by an interview.",
  },
  {
    title: "Assistant Posts",
    body: "Clerical and assistant-level posts, often accepting Intermediate to Bachelor's-level qualifications depending on the specific post, with an MCQ-based written test focused on general knowledge, basic English, and Urdu.",
  },
  {
    title: "Lecturer Jobs",
    body: "Teaching positions at government colleges in Sindh, requiring a relevant Master's degree in the subject being taught. Lecturer recruitment typically includes a subject-specific written test in addition to general sections.",
  },
  {
    title: "Subject Specialists",
    body: "Specialist posts requiring advanced qualification in a specific field, generally involving a Master's degree requirement and a subject-focused written test alongside general knowledge components.",
  },
  {
    title: "Medical Officers",
    body: "Medical officer and related healthcare posts requiring an MBBS or equivalent medical qualification, often including a subject-specific written component and standard registration requirements (such as PMDC/PMC registration where applicable) alongside the general SPSC process.",
  },
  {
    title: "Engineers",
    body: "Engineering posts across Sindh government departments requiring a relevant engineering degree, typically including subject-specific technical questions alongside general knowledge and current affairs sections.",
  },
  {
    title: "Agriculture Officers",
    body: "Agriculture department posts requiring a relevant agricultural sciences degree, with subject-specific technical content forming a significant part of the written test alongside general knowledge components.",
  },
  {
    title: "Revenue Department Posts",
    body: "Posts within Sindh's revenue department generally requiring Intermediate to Bachelor's-level qualification, with a written test focused on general knowledge, basic mathematics, and revenue-related awareness.",
  },
  {
    title: "Education Department Posts",
    body: "Beyond lecturer roles, SPSC recruits for other education department positions — including administrative and supervisory roles within the sector — with eligibility and test pattern varying by specific post.",
  },
  {
    title: "Health Department Posts",
    body: "Beyond medical officer roles, health department recruitment includes administrative, paramedical, and allied health posts, each with eligibility requirements matching the specific role's qualification needs.",
  },
  {
    title: "IT & Technical Posts",
    body: "Information technology and technical posts across Sindh departments require relevant computer science, IT, or technical qualifications, typically including a technical written component testing relevant skills for the role.",
  },
  {
    title: "Specialized Government Posts",
    body: "Beyond the categories above, SPSC periodically recruits for other specialized technical, financial, and administrative-specialist roles, each with eligibility and test pattern defined individually in the relevant advertisement.",
  },
];

const eligibilityRows = [
  ["Assistant/Clerical", "Intermediate/Bachelor's", "Objective MCQ", "Often, depending on post"],
  ["Administrative", "Bachelor's", "Objective MCQ or subjective (senior posts)", "Yes"],
  ["Lecturer", "Master's (subject-relevant)", "Subject-specific written", "Yes"],
  ["Subject Specialist", "Master's (subject-relevant)", "Subject-specific written", "Yes"],
  ["Medical Officer", "MBBS/equivalent", "Subject-specific written", "Yes"],
  ["Engineer", "Relevant engineering degree", "Subject-specific technical", "Yes"],
  ["Agriculture Officer", "Agriculture sciences degree", "Subject-specific written", "Yes"],
  ["Revenue Dept.", "Intermediate/Bachelor's", "Objective MCQ", "Often, depending on post"],
];

const patternRows = [
  ["Assistant/Clerical", "Objective MCQ", "Often", "Written → Interview → Appointment"],
  ["Administrative (general)", "Objective MCQ", "Yes", "Written → Interview → Appointment"],
  ["Administrative (senior)", "Objective MCQ + subjective component", "Yes", "Written → Interview → Appointment"],
  ["Lecturer/Specialist", "Subject-specific written", "Yes", "Written → Interview → Appointment"],
  ["Technical (Medical/Engineering)", "Subject-specific technical paper", "Yes", "Written → Interview → Appointment"],
];

const processSteps = [
  { title: "Advertisement", text: "SPSC publishes vacancy advertisements listing available posts, eligibility criteria, and application deadlines through its official website and provincial/national newspapers." },
  { title: "Online Application", text: "Candidates apply through SPSC's official online application portal within the advertised window, entering required information and uploading supporting documents." },
  { title: "Fee Submission", text: "An application fee is required as part of the process; the exact amount and payment method are specified in the advertisement and can change over time." },
  { title: "Application Review", text: "SPSC reviews submitted applications against the post's eligibility criteria before confirming candidates for the written test stage." },
  { title: "Roll Number Slip", text: "Eligible candidates receive a roll number slip confirming their test center, date, and roll number, typically downloadable through SPSC's official portal closer to the exam date." },
  { title: "Written Test", text: "Candidates sit the written test relevant to their post — predominantly objective MCQ-based for most posts, with subjective components for certain senior administrative posts and subject-specific written papers for lecturer, specialist, and technical roles." },
  { title: "Result (Written Test)", text: "SPSC announces written test results, typically listing candidates who have qualified to proceed to the next stage." },
  { title: "Interview", text: "Shortlisted candidates attend an interview conducted by an SPSC panel, assessing subject knowledge, communication ability, and general suitability for the post." },
  { title: "Final Merit List", text: "Based on combined written test and interview scores, SPSC prepares a final merit list ranking candidates according to available vacancies and quota allocation." },
  { title: "Appointment Letter", text: "The hiring Sindh government department issues a formal appointment letter to the recommended candidate, completing the recruitment cycle." },
];

const syllabusItems = [
  {
    title: "General Knowledge",
    text: "Covers geography, international organizations, notable achievements, and general awareness topics. Preparation strategy: build broad familiarity through consistent MCQs practice rather than last-minute cramming.",
  },
  {
    title: "Pakistan Affairs",
    text: "Covers Pakistan's history, constitutional development, and key national institutions. Preparation strategy: focus on constitutional milestones and major historical events, since these are commonly tested in a direct, factual format.",
  },
  {
    title: "Sindh Affairs",
    text: "Covers Sindh-specific history, geography, administration, and notable regional facts. Preparation strategy: since this content is specific to Sindh and less covered in general competitive exam material, dedicate focused study time to Sindh-specific resources rather than relying on general Pakistan Studies content alone.",
  },
  {
    title: "Current Affairs",
    text: "Covers recent national and international developments, government policy, and major events. Preparation strategy: treat this as an ongoing daily habit rather than a one-time review, since outdated material actively hurts performance here.",
  },
  {
    title: "Islamic Studies",
    text: "Covers foundational Islamic teachings, history, and general religious knowledge relevant to the Pakistani curriculum, generally compulsory for Muslim candidates. Preparation strategy: prioritize accuracy and careful review of source material.",
  },
  {
    title: "English",
    text: "Covers grammar, vocabulary, and comprehension, and for certain senior posts, essay writing as part of the subjective paper. Preparation strategy: build grammar fundamentals through consistent MCQs practice for objective-format posts, and for senior posts with a subjective component, practice structured essay writing regularly.",
  },
  {
    title: "Urdu",
    text: "Covers grammar, vocabulary, and comprehension in Urdu, appearing in many SPSC papers alongside English. Preparation strategy: review core Urdu grammar rules and practice translation/comprehension-style questions regularly.",
  },
  {
    title: "Everyday Science",
    text: "Covers general scientific concepts relevant to daily life and current developments. Preparation strategy: focus on practical, applied science topics rather than deep theoretical content.",
  },
  {
    title: "Computer Knowledge",
    text: "Covers basic computer literacy and general IT terminology, increasingly tested across various SPSC posts. Preparation strategy: review fundamental computer concepts and common terminology relevant to general office use.",
  },
  {
    title: "Subject-Specific Preparation",
    text: "For lecturer, specialist, medical, engineering, and agriculture posts, subject-specific syllabus content follows the relevant academic or professional field. Preparation strategy: align study material directly with your degree-level knowledge, supplemented by past papers specific to that post category where available.",
  },
];

const mistakes = [
  "Applying without carefully reading the full eligibility criteria for the specific post.",
  "Assuming general preparation is enough without reviewing the specific post's syllabus.",
  "Ignoring current affairs until the final weeks before the exam.",
  "Relying on outdated current affairs or general knowledge material.",
  "Skipping past papers entirely and walking into the exam without a sense of realistic difficulty.",
  "Underestimating how much Sindh Affairs matters specifically for SPSC compared to general Pakistan Studies content.",
  "Assuming every SPSC post uses a pure MCQ format, when certain senior posts include a subjective written component.",
  "Not practicing under timed conditions before the actual exam.",
  "Submitting incomplete or mismatched documentation with the application.",
  "Missing the application deadline due to last-minute submission attempts.",
  "Not confirming age relaxation eligibility that may actually apply to their category.",
  "Failing to verify district/zone-level domicile quota requirements before applying.",
  "Neglecting interview preparation until after written results are announced.",
  "Studying passively (re-reading) instead of active recall through MCQs and practice questions.",
  "Failing to download and verify the roll number slip in time before the exam.",
  "Not verifying updated exam pattern or marking criteria before starting preparation.",
  "Over-focusing on one subject while neglecting others with similar weightage.",
  "Ignoring mandatory professional registration requirements for medical or technical posts.",
  "Assuming a Bachelor's degree qualifies for posts that actually require a Master's or professional qualification.",
  "Relying on unofficial or unverified sources for exam dates, fee details, or eligibility changes.",
];

const tips = [
  "Start by reading the full official advertisement for your target post before opening any study material.",
  "Build a written study schedule mapping subject coverage across your available preparation time.",
  "Treat current affairs as a daily habit, not a subject you review once.",
  "Confirm early whether your target post involves a pure MCQ paper or a subjective written component, since preparation differs significantly between the two.",
  "Use topic-wise MCQs practice before moving to full-length mock tests.",
  "Solve past papers early to understand realistic difficulty and pacing, not just in the final week.",
  "Dedicate specific study time to Sindh Affairs rather than assuming general Pakistan Studies content covers it.",
  "Keep concise revision notes rather than re-reading entire textbooks repeatedly.",
  "Focus extra time on subjects where your past paper or mock test performance is weakest.",
  "Verify current marking criteria (including any negative marking) before finalizing your MCQ-attempt strategy.",
  "Review your incorrect answers specifically — don't just track your overall score.",
  "Build general knowledge gradually through consistent daily exposure rather than cramming.",
  "For subject-specific posts, align your prep material closely with your actual academic background.",
  "Simulate real exam timing during mock tests, including any breaks if applicable.",
  "Stay updated on any changes to SPSC's syllabus or exam pattern for your specific post.",
  "Prepare your application documents well ahead of the deadline to avoid last-minute errors.",
  "Practice verbal, structured answers for interview preparation, not just written content review.",
  "For posts with a subjective component, practice essay writing under timed conditions well before your exam date.",
  "Confirm required professional registration (e.g., PMDC/PMC) is in order before applying for relevant posts.",
  "Avoid switching study material frequently — consistency with one well-organized resource beats scattered studying.",
  "Track your own progress with periodic self-assessment tests, not just passive review.",
  "Prioritize accuracy over speed initially, then build speed once accuracy is consistently strong.",
  "Join structured weekly revision cycles to reinforce retention of earlier material.",
  "Don't neglect Urdu or Islamic Studies in favor of only focusing on English and current affairs.",
  "Verify every detail — fee, schedule, eligibility, syllabus, exam pattern — against SPSC's official announcement before finalizing your preparation plan.",
];

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
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-900">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-3 font-black text-xs uppercase tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-600">
          {rows.map((row) => (
            <tr key={row[0]} className="align-top">
              {row.map((cell, i) => (
                <td key={`${row[0]}-${i}`} className={`px-3 py-3 leading-relaxed ${i === 0 ? "font-bold text-slate-900" : ""}`}>
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

export default function SpscPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link
            href="/government-exams"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All Government Exams
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Sindh Public Service Commission
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            SPSC Exams in Pakistan – Complete Guide, Eligibility, Syllabus &amp; Preparation
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            SPSC conducts recruitment for provincial government posts across Sindh — from administrative
            and clerical roles to lecturer, medical, engineering, and specialist positions. This guide
            brings together everything a candidate needs in one place: what SPSC actually tests,
            who&apos;s eligible for which post category, how the recruitment process works step by step,
            and how to prepare without wasting time on the wrong material.
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <Link
              href="/mcqs/spsc"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Start Practicing SPSC MCQs <FaArrowRight size={11} />
            </Link>
            <Link
              href="/past-papers/spsc"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              View SPSC Past Papers
            </Link>
          </div>
          <p className="text-sky-200/80 text-xs md:text-sm leading-relaxed max-w-3xl">
            Content on this page is reviewed for accuracy and updated regularly — but always confirm
            eligibility, fees, and schedules against SPSC&apos;s official advertisements before applying.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        {/* Quick prep links */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            Start SPSC Preparation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { name: "Practice SPSC MCQs", path: "/mcqs/spsc" },
              { name: "SPSC Past Papers", path: "/past-papers/spsc" },
              { name: "Online Tests", path: "/online-tests/spsc" },
              { name: "Latest Jobs", path: "/jobs" },
              { name: "Current Affairs", path: "/current-affairs" },
              { name: "Study Resources", path: "/study-resources" },
            ].map((link) => (
              <Link
                key={link.name}
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
        </div>

        <Section id="introduction" title="Introduction">
          <Prose>
            <p>
              The Sindh Public Service Commission (SPSC) is the primary recruiting body for provincial
              government positions across Sindh, covering roles ranging from entry-level clerical posts to
              senior specialist, technical, and management positions. For candidates based in or connected
              to Sindh, SPSC represents one of the most direct paths into public sector employment within
              the province.
            </p>
            <p>
              Thousands of candidates apply during SPSC recruitment cycles, drawn by the range of departments
              involved — education, health, revenue, agriculture, and general administration among them.
              Some SPSC posts, particularly at more senior levels, also involve subjective written papers
              rather than pure MCQ testing, which sets SPSC apart from the fully objective format used for
              most posts by some other provincial commissions — a distinction candidates need to plan for,
              not assume away.
            </p>
            <p>
              Preparation strategy matters significantly with SPSC precisely because of this variety in both
              post type and paper format. A candidate targeting an administrative post preparing purely for
              MCQs needs a fundamentally different study approach than one targeting a senior post that
              includes essay-style written papers. Recognizing this early — and confirming the exact format
              for your specific target post — saves considerable time and improves preparation quality.
            </p>
            <p>
              This is where PakLearners fits in. Rather than offering scattered, generic content, this
              guide and the wider{" "}
              <Link href="/government-exams" className="font-bold text-[#1565C0] hover:underline">
                government exams in Pakistan
              </Link>{" "}
              section it belongs to are organized specifically around how SPSC recruitment actually works —
              supported by organized MCQs, solved past papers, and a structured preparation roadmap you can
              follow from your first day of study through to your interview.
            </p>
          </Prose>
        </Section>

        <Section id="what-is-spsc" title="What is SPSC?">
          <Prose>
            <p className="font-semibold text-slate-800">
              SPSC (Sindh Public Service Commission) is the constitutional body responsible for recruiting
              candidates into provincial government positions across Sindh through competitive, merit-based
              examinations.
            </p>
            <p>
              <strong className="text-slate-900">History and constitutional basis:</strong> SPSC operates
              under Article 242 of the Constitution of Pakistan, which establishes public service
              commissions at both federal and provincial levels to ensure government recruitment is conducted
              on a transparent, merit basis rather than through informal appointment.
            </p>
            <p>
              <strong className="text-slate-900">Mission:</strong> SPSC&apos;s core mandate is to conduct
              fair, competitive examinations and recruitment processes for provincial civil service posts in
              Sindh, ensuring appointments are made according to candidates&apos; demonstrated ability and
              qualifications.
            </p>
            <p>
              <strong className="text-slate-900">Responsibilities:</strong> SPSC&apos;s responsibilities
              include advertising vacant provincial posts, conducting written examinations (objective and,
              for certain posts, subjective) and interviews, preparing merit lists, and recommending
              successful candidates to the relevant Sindh government departments for appointment.
            </p>
            <p>
              <strong className="text-slate-900">Recruitment process at a glance:</strong> SPSC&apos;s
              process generally follows advertisement, online application, a written test — MCQ-based for most
              posts, with subjective/essay-style papers for certain senior or specialized posts — and for
              most posts, an interview stage, before a final merit-based recommendation is issued to the
              hiring department. The full breakdown is covered later in this guide.
            </p>
            <p>
              <strong className="text-slate-900">Sindh government departments:</strong> SPSC recruits
              across a wide range of Sindh government departments — including education, health, revenue,
              agriculture, general administration, and various technical and specialist departments —
              reflecting the broad operational scope of provincial governance in Sindh.
            </p>
            <p>
              <strong className="text-slate-900">Types of jobs:</strong> SPSC advertises everything from
              entry-level clerical and assistant posts to lecturer positions, subject specialist roles,
              medical officer posts, engineering positions, and senior administrative posts, matching the
              wide range of departments it serves.
            </p>
            <p>
              Unlike{" "}
              <Link href="/government-exams/bpsc" className="font-bold text-[#1565C0] hover:underline">
                BPSC
              </Link>
              , which serves the same function specifically for Balochistan, SPSC&apos;s jurisdiction is
              limited to provincial posts within Sindh, with its own domicile requirements, Sindh-specific
              syllabus content, and — for certain posts — a written paper format that differs from a purely
              MCQ-based approach.
            </p>
          </Prose>
        </Section>

        <Section id="types-of-spsc-exams" title="Types of SPSC Exams">
          <Prose>
            <p>
              SPSC doesn&apos;t conduct a single uniform exam — it manages recruitment across many post
              categories, each with distinct eligibility and exam patterns.
            </p>
          </Prose>
          <div
            className="mt-5 mb-6 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="Types of SPSC exams in Pakistan infographic"
          >
            {[
              { title: "Administrative", items: "Administrative Posts · Assistant Posts · Revenue Dept." },
              { title: "Teaching/Education", items: "Lecturer · Subject Specialist · Education Dept. Posts" },
              { title: "Technical/Specialized", items: "Medical · Engineer · Agriculture · IT & Technical · Specialized" },
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
          <div className="space-y-4">
            {examTypes.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
                <h3 className="text-base font-black text-[#1565C0] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            Across nearly all these categories, general knowledge, Pakistan Affairs, Sindh Affairs, current
            affairs, and English/Urdu components remain fairly consistent, while the subject-specific
            portion — and, for senior posts, the subjective/essay component — is what differs most based on
            the specific post.
          </p>
        </Section>

        <Section id="eligibility" title="SPSC Eligibility Criteria">
          <Prose>
            <p className="font-semibold text-slate-800">
              Eligibility for SPSC exams varies significantly by post, but several factors apply broadly.
            </p>
            <p>
              <strong className="text-slate-900">Educational Qualification:</strong> Requirements range
              from Intermediate-level for certain assistant and revenue department posts, to Bachelor&apos;s
              degree for most administrative and general posts, and Master&apos;s or professional
              qualification (MBBS, engineering degree, agriculture degree) for specialist, medical,
              engineering, and lecturer roles respectively.
            </p>
            <p>
              <strong className="text-slate-900">Age Limit:</strong> Age limits are set individually per
              post in each advertisement, generally falling within a range appropriate to entry-level or
              specialist recruitment, with relaxation provisions for certain categories as defined by Sindh
              government policy. Always confirm the exact age bracket against the current advertisement,
              since these are periodically revised.
            </p>
            <p>
              <strong className="text-slate-900">Gender:</strong> Most SPSC posts are open to both male
              and female candidates, though some posts may specify gender-based quota allocations or, in
              limited cases, gender-specific roles as defined in the advertisement — always verify this per
              specific post.
            </p>
            <p>
              <strong className="text-slate-900">Nationality:</strong> Candidates must generally be
              Pakistani citizens to be eligible for SPSC recruitment.
            </p>
            <p>
              <strong className="text-slate-900">Sindh Domicile:</strong> Most SPSC posts require Sindh
              domicile, since SPSC recruits specifically for provincial government positions within Sindh,
              though exact domicile and district/zone-level quota requirements can vary by post and
              department.
            </p>
            <p>
              <strong className="text-slate-900">Experience Requirements:</strong> Entry-level posts
              typically require no prior experience, while specialist, medical, engineering, and senior
              administrative posts often require a specified number of years of relevant professional
              experience, detailed in the specific advertisement.
            </p>
            <p>
              <strong className="text-slate-900">Required Documents:</strong> Typically includes CNIC,
              educational certificates and transcripts, domicile certificate, photographs, and any
              professional registration or experience certificates relevant to the post — exact requirements
              are listed in each specific advertisement.
            </p>
          </Prose>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">Common Eligibility Mistakes</h3>
          <BulletList
            items={[
              "Assuming a Bachelor's degree qualifies for posts that actually require a Master's or professional degree.",
              "Missing age relaxation provisions that may apply to the candidate's specific category.",
              "Submitting a domicile certificate that doesn't match the district/zone-level quota requirement of the specific post.",
              "Overlooking mandatory professional registration (e.g., PMDC/PMC for medical posts) before applying.",
            ]}
          />
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">
            Eligibility Comparison Table (General Pattern by Post Type)
          </h3>
          <DataTable
            headers={["Post Category", "Typical Minimum Qualification", "Written Test Type", "Interview Required"]}
            rows={eligibilityRows}
          />
          <p className="text-xs text-slate-500 leading-relaxed mt-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
            Always verify exact qualification, age, and process requirements against the specific SPSC
            advertisement for your target post — this table reflects general patterns, not guaranteed
            current requirements.
          </p>
        </Section>

        <Section id="recruitment-process" title="SPSC Recruitment Process">
          <Prose>
            <p className="font-semibold text-slate-800">
              SPSC recruitment generally follows a consistent step-by-step structure, though specifics can
              vary slightly by post.
            </p>
          </Prose>
          <div
            className="my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2"
            role="img"
            aria-label="SPSC recruitment process timeline"
          >
            {["Advertisement", "Application", "Fee", "Review", "Roll No. Slip", "Written Test", "Result", "Interview", "Merit List", "Appointment"].map(
              (step, i) => (
                <div
                  key={step}
                  className="rounded-xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white px-2 py-3 text-center"
                >
                  <p className="text-[10px] font-black text-[#1565C0] mb-1">{i + 1}</p>
                  <p className="text-[11px] font-bold text-slate-700 leading-snug">{step}</p>
                </div>
              )
            )}
          </div>
          <ol className="space-y-4">
            {processSteps.map((step, i) => (
              <li key={step.title} className="flex gap-3 items-start">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            This process can take several months from advertisement to appointment, particularly for
            high-volume recruitment drives or posts involving subjective written papers, so candidates
            should plan their preparation timeline with this in mind.
          </p>
        </Section>

        <Section id="exam-pattern" title="SPSC Exam Pattern">
          <Prose>
            <p className="font-semibold text-slate-800">
              SPSC exam patterns differ depending on the post category, but generally follow a few
              recognizable formats.
            </p>
            <p>
              <strong className="text-slate-900">MCQ Test:</strong> Most SPSC posts — administrative,
              assistant, revenue department, and general recruitment roles — use a single objective-type MCQ
              paper covering general knowledge, Pakistan Affairs, Sindh Affairs, current affairs, and
              English/Urdu, along with post-relevant subject content.
            </p>
            <p>
              <strong className="text-slate-900">Subject Weightage:</strong> Subject weightage differs by
              post category — general posts weight current affairs and general knowledge heavily, while
              lecturer, specialist, medical, and engineering posts weight the subject-specific paper more
              heavily, with general sections carrying comparatively less weight.
            </p>
            <p>
              <strong className="text-slate-900">Interview:</strong> Most SPSC posts include a panel
              interview after the written test stage, assessing subject depth, communication ability, and
              general suitability for the role.
            </p>
            <p>
              <strong className="text-slate-900">Merit Formula:</strong> Final merit is typically
              calculated using a weighted combination of written test and interview marks, with the exact
              weightage defined per post category in the relevant recruitment rules — candidates should
              check the specific merit formula for their target post rather than assuming a fixed universal
              ratio.
            </p>
            <p>
              <strong className="text-slate-900">Negative marking / marking criteria:</strong> Negative
              marking and specific marking criteria may vary by post and are defined in each advertisement
              — candidates should verify the latest official notification for their specific SPSC test
              before finalizing their MCQ-attempt strategy, rather than assuming a uniform rule across all
              posts.
            </p>
          </Prose>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">General Exam Pattern Comparison</h3>
          <DataTable
            headers={["Post Category", "Paper Format", "Interview", "Typical Stages"]}
            rows={patternRows}
          />
        </Section>

        <Section id="syllabus" title="SPSC Syllabus Guide">
          <Prose>
            <p className="font-semibold text-slate-800">
              SPSC syllabus content varies by post, but several subjects appear consistently across most
              exam types.
            </p>
          </Prose>
          <div className="mt-5 space-y-4">
            {syllabusItems.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <h3 className="text-base font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="preparation-strategy" title="Best SPSC Preparation Strategy">
          <Prose>
            <p className="font-semibold text-slate-800">
              A structured, time-bound preparation plan consistently outperforms unstructured studying.
            </p>
          </Prose>
          <div
            className="my-5 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="SPSC exam preparation roadmap and study plan"
          >
            {[
              { title: "Daily", items: "Focused blocks · Current affairs · Short MCQs" },
              { title: "Weekly", items: "Subject rotation · Affairs review · Timed practice" },
              { title: "Monthly", items: "Syllabus milestones · Mocks · Weak-area revision" },
            ].map((col) => (
              <div
                key={col.title}
                className="rounded-xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white px-4 py-3 text-center"
              >
                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700 mb-1">
                  {col.title}
                </p>
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">{col.items}</p>
              </div>
            ))}
          </div>
          <div className="space-y-5 text-sm text-slate-600 leading-relaxed">
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Daily Study Plan</h3>
              <BulletList
                items={[
                  "Dedicate focused study blocks rather than long, unfocused sessions.",
                  "Include a brief current affairs review every day, even during busy periods.",
                  "End each day with a short MCQs practice set covering that day's topic.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Weekly Plan</h3>
              <BulletList
                items={[
                  "Rotate through core subjects (general knowledge, Pakistan Affairs, Sindh Affairs, English/Urdu, and post-specific content) across the week.",
                  "Set aside one day weekly for a consolidated current affairs review.",
                  "Attempt at least one timed mock test or past paper set weekly as preparation progresses.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Monthly Plan</h3>
              <BulletList
                items={[
                  "Break your overall syllabus into monthly milestones, ensuring each subject area is covered before your exam date.",
                  "Use the final month primarily for past paper practice and targeted revision of weak areas.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Revision Strategy</h3>
              <BulletList
                items={[
                  "Maintain concise revision notes for each subject as you study, rather than re-reading full source material repeatedly.",
                  "Revisit incorrect MCQs from practice sessions specifically, since repeated mistakes reveal genuine knowledge gaps.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">MCQ Practice</h3>
              <BulletList
                items={[
                  "Practice topic-wise MCQs before moving to full-length, mixed-subject mock tests.",
                  "Track which subjects consistently show lower accuracy and adjust your study time accordingly.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Mock Tests</h3>
              <BulletList
                items={[
                  "Begin timed mock tests once your foundational content review is largely complete, typically in the final 6–8 weeks before your exam.",
                  "Treat mock test results as diagnostic, directing subsequent study time toward your weakest areas.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Current Affairs Strategy</h3>
              <BulletList
                items={[
                  "Review current affairs daily in short sessions rather than in occasional long blocks.",
                  "Focus especially on developments relevant to Sindh alongside national and international news, since SPSC papers often test Sindh-specific current events.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Interview Preparation</h3>
              <BulletList
                items={[
                  "Once approaching or clearing the written stage, prepare for the interview by reviewing your academic background, staying current on major developments, and practicing clear, structured verbal answers.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Time Management</h3>
              <BulletList
                items={[
                  "Practice pacing yourself during MCQs sessions to match actual exam time constraints, not just accuracy.",
                  "For posts with a subjective/essay component, practice writing full answers within a set time limit to build exam-day speed.",
                ]}
              />
            </div>
          </div>
        </Section>

        <Section id="books" title="Best Books for SPSC Preparation">
          <Prose>
            <p className="font-semibold text-slate-800">
              Rather than recommending specific titles (which can go out of print or be revised), here are
              categories worth prioritizing:
            </p>
          </Prose>
          <BulletList
            items={[
              "General knowledge and current affairs compilations updated within the last year, since older editions quickly become outdated.",
              "Pakistan Affairs and Sindh Affairs guides aligned with the standard curriculum used in SPSC syllabi.",
              "Islamic Studies and Everyday Science guides matching the general SPSC pattern.",
              "English and Urdu grammar guides specifically designed for competitive exam preparation, plus essay-writing guides for posts with a subjective paper component.",
              "Subject-specific reference material matching your degree background for lecturer, specialist, medical, engineering, or agriculture posts.",
              "MCQs practice compilations organized by topic, ideally cross-referenced against past paper trends.",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            Always check the publication or edition date before relying on any preparation book, particularly
            for current affairs and general knowledge material.
          </p>
        </Section>

        <Section id="past-papers" title="SPSC Past Papers">
          <Prose>
            <p>
              <strong className="text-slate-900">Why past papers matter:</strong> SPSC past papers reveal the
              actual phrasing, structure, and difficulty level used in real exams — information that generic
              study guides cannot fully replicate. They also help candidates recognize which topics SPSC tends
              to emphasize repeatedly across different recruitment cycles.
            </p>
            <p>
              <strong className="text-slate-900">How to analyze past papers:</strong> Rather than solving a
              past paper once and moving on, go through it topic by topic — identify which subjects appeared
              most frequently, note the specific phrasing style used, and treat every incorrect answer as a
              signal pointing to a genuine knowledge gap.
            </p>
            <p>
              <strong className="text-slate-900">Repeated topics:</strong> Certain general knowledge,
              Pakistan Affairs, and Sindh Affairs topics tend to reappear across SPSC papers in different
              years, though exact repetition varies by post and exam cycle — past paper review is the most
              reliable way to identify these patterns for your specific target exam.
            </p>
            <p>
              <strong className="text-slate-900">Preparation strategy using past papers:</strong> Set aside
              dedicated past-paper practice sessions under timed conditions as your exam date approaches,
              rather than treating past papers as casual reading material. For posts with a subjective
              component, also review past essay/written paper topics to understand the expected depth and
              structure. This builds both content familiarity and exam-day pacing simultaneously.
            </p>
          </Prose>
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            Explore our organized{" "}
            <Link href="/past-papers" className="font-bold text-[#1565C0] hover:underline">
              past papers
            </Link>{" "}
            collection for solved SPSC papers organized by post category and year.
          </p>
        </Section>

        <Section id="mcqs" title="SPSC MCQs Preparation">
          <Prose>
            <p>
              <strong className="text-slate-900">Topic-wise practice:</strong> Work through MCQs organized
              by subject rather than randomly mixed sets, so you can identify and address specific weak
              areas systematically.
            </p>
            <p>
              <strong className="text-slate-900">Daily MCQs:</strong> Consistent, even short, daily MCQs
              practice builds stronger long-term recall than occasional long study sessions, particularly for
              general knowledge and current affairs.
            </p>
            <p>
              <strong className="text-slate-900">Online tests:</strong> Practicing MCQs online allows for
              faster iteration and immediate feedback on incorrect answers, making it a useful supplement to
              book-based study, particularly in the final weeks before your exam.
            </p>
            <p>
              <strong className="text-slate-900">Current affairs MCQs:</strong> Given how quickly this
              subject changes, prioritize recently updated current affairs MCQs over older sets, and
              revisit this subject more frequently than others in your study rotation.
            </p>
            <p>
              <strong className="text-slate-900">General knowledge MCQs:</strong> Build broad general
              knowledge through regular, topic-organized practice rather than passive reading, since this
              subject rewards accumulated exposure over consistent practice sessions.
            </p>
          </Prose>
        </Section>

        <Section id="jobs-results" title="Latest SPSC Jobs & Results">
          <Prose>
            <p>
              <strong className="text-slate-900">Advertisements:</strong> SPSC publishes new job
              advertisements periodically throughout the year, covering administrative, teaching, medical,
              engineering, and specialist posts across Sindh government departments. Always review the full
              advertisement text for exact eligibility, deadlines, and application instructions.
            </p>
            <p>
              <strong className="text-slate-900">Application deadlines:</strong> Application windows vary
              by advertisement and are strictly enforced — track closing dates carefully, since late
              applications are typically not accepted.
            </p>
            <p>
              <strong className="text-slate-900">Roll number slips:</strong> Once your application is
              processed and confirmed eligible, your roll number slip is issued closer to the exam date,
              usually downloadable through SPSC&apos;s official portal.
            </p>
            <p>
              <strong className="text-slate-900">Exam schedule:</strong> Written test dates are announced
              following the application closing period; candidates should monitor official SPSC
              communications for any schedule updates or changes.
            </p>
            <p>
              <strong className="text-slate-900">Results:</strong> Following each stage of testing, SPSC
              releases results through official channels, moving qualifying candidates forward in the
              recruitment process.
            </p>
            <p>
              <strong className="text-slate-900">Merit lists:</strong> Final merit lists are compiled by
              SPSC based on combined written test and interview scores, ranking candidates according to
              available vacancies and quota allocation. Track results and related updates through our{" "}
              <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
                jobs section
              </Link>
              , alongside official SPSC announcements.
            </p>
          </Prose>
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            We do not publish speculative, unconfirmed, or outdated job listings — always cross-verify
            against SPSC&apos;s official advertisement before applying or paying any fee.
          </p>
        </Section>

        <Section id="common-mistakes" title="Common Mistakes Candidates Make">
          <BulletList items={mistakes} />
        </Section>

        <Section id="expert-tips" title="Expert Preparation Tips">
          <BulletList items={tips} />
        </Section>

        <Section id="why-paklearners" title="Why Choose PakLearners?">
          <Prose>
            <p>
              PakLearners is built specifically around Pakistan&apos;s government exam landscape, including
              SPSC&apos;s range of post categories, rather than mixing this content with unrelated general
              education material.
            </p>
          </Prose>
          <BulletList
            items={[
              "Updated study material — content structured by post category (administrative, lecturer, specialist, technical) and reviewed on an ongoing basis rather than presented as one undifferentiated mass of information.",
              "MCQs — topic-wise practice questions covering general knowledge, Sindh Affairs, current affairs, and post-specific subjects.",
              "Past papers — solved SPSC papers organized for pattern-based revision.",
              "Preparation guides — structured roadmaps that account for the real differences between MCQ-based and subjective-paper posts.",
              "Student-friendly learning — explanations written in plain language rather than dense bureaucratic phrasing.",
              "Reliable educational resources — content cross-checked against official syllabi and patterns where possible, and updated when SPSC revises its recruitment process.",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            We don&apos;t claim to be Pakistan&apos;s largest platform, and we avoid making unverifiable claims
            about user numbers or guaranteed outcomes. What we focus on is making sure the SPSC content we
            provide is accurate, organized, and genuinely useful for candidates preparing for a specific
            post.
          </p>
        </Section>

        <Section id="faq" title="Frequently Asked Questions">
          <div className="space-y-3">
            {spscFaqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-100 transition-colors"
                  aria-expanded={openFaq === index}
                >
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  <FaChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* EEAT Block */}
        <div className="bg-slate-100 rounded-2xl border border-slate-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                Editorial Information
              </p>
              <p className="text-sm font-bold text-slate-900">Written By: PakLearners Editorial Team</p>
              <p className="text-sm text-slate-600">Reviewed For: Educational Accuracy</p>
              <p className="text-sm text-slate-600">Last Updated: July 2026</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            This guide is maintained as part of PakLearners&apos; ongoing effort to provide accurate,
            organized information about SPSC exams. Eligibility, syllabus, fees, exam dates, advertisements,
            and recruitment rules should always be verified through official SPSC announcements before
            applying, since these can be revised between recruitment cycles. If you notice outdated or
            incorrect information on this page, you can report it through our Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
