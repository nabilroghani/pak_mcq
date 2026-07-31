"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { eteaFaqs } from "@/data/eteaFaqs";

const examTypes = [
  {
    title: "Police Recruitment",
    body: "ETEA conducts written tests for various police department recruitment drives in KP, typically covering general knowledge, current affairs, and basic reasoning, often followed by a physical test and interview conducted by the police department itself.",
  },
  {
    title: "Health Department",
    body: "Recruitment tests for health department posts — including paramedical and administrative roles — conducted through ETEA on behalf of the KP health department, with eligibility and syllabus depending on the specific post.",
  },
  {
    title: "Education Department",
    body: "Tests for various education department posts, including administrative and support roles within the department, with eligibility generally requiring a relevant academic qualification matching the specific post.",
  },
  {
    title: "Rescue 1122",
    body: "ETEA conducts recruitment tests for Rescue 1122 positions in KP, which typically combine a written test with a physical fitness component given the operational nature of Rescue 1122 roles.",
  },
  {
    title: "Engineering Posts",
    body: "Recruitment tests for engineering positions within KP government departments, requiring a relevant engineering degree and including subject-specific technical content alongside general sections.",
  },
  {
    title: "Medical Admissions",
    body: "ETEA conducts entry tests for medical college admissions in Khyber Pakhtunkhwa, covering pre-medical subjects (Biology, Chemistry, Physics, and English) for candidates seeking admission to MBBS/BDS and related programs.",
  },
  {
    title: "Scholarship Tests",
    body: "ETEA occasionally conducts tests related to scholarship eligibility or allocation for students in KP, with specific eligibility and test format defined per scholarship program.",
  },
  {
    title: "Technical Posts",
    body: "Technical recruitment tests for various government departments requiring specific technical or vocational qualifications, with subject-specific content matching the relevant technical field.",
  },
  {
    title: "Government Department Jobs",
    body: "Beyond the categories above, ETEA is periodically engaged by other KP government departments for general recruitment testing, with post requirements and syllabus defined individually per advertisement.",
  },
  {
    title: "Contract-Based Recruitment",
    body: "ETEA also conducts testing for contract-based (rather than permanent/regular) government positions, which may have different eligibility timelines and terms compared to standard recruitment, as specified in the relevant advertisement.",
  },
];

const eligibilityRows = [
  ["Police Recruitment", "Intermediate/Bachelor's (varies by post)", "Objective MCQ", "Physical test + interview"],
  ["Health Department", "Relevant qualification per post", "Objective MCQ", "Interview (often)"],
  ["Education Department", "Relevant qualification per post", "Objective MCQ", "Interview (often)"],
  ["Rescue 1122", "Intermediate/Bachelor's (varies by post)", "Objective MCQ", "Physical fitness test"],
  ["Engineering Posts", "Relevant engineering degree", "Subject-specific + general MCQ", "Interview"],
  ["Medical Admissions", "FSc Pre-Medical (or equivalent)", "Subject-specific MCQ (Biology, Chemistry, Physics, English)", "Merit-based admission"],
];

const patternRows = [
  ["Recruitment (Police, Health, Education)", "Objective MCQ", "Yes (by hiring department)", "Physical test for some posts"],
  ["Rescue 1122", "Objective MCQ", "Often", "Physical fitness test"],
  ["Medical Admission", "Subject-specific MCQ", "No", "Merit-based selection"],
  ["Engineering Posts", "Subject-specific + general MCQ", "Yes", "—"],
];

const processSteps = [
  { title: "Advertisement", text: "The hiring department publishes a vacancy advertisement (sometimes jointly with ETEA) listing available posts, eligibility criteria, and application deadlines." },
  { title: "Online Registration", text: "Candidates register for the ETEA test through the official ETEA portal or the relevant department's designated process within the advertised window." },
  { title: "Fee Submission", text: "A test fee is required as part of registration; the exact amount and payment method are specified in the advertisement and can change over time." },
  { title: "Application Review", text: "Submitted applications are reviewed against the post's eligibility criteria before candidates are confirmed for the test." },
  { title: "Roll Number Slip", text: "Eligible candidates receive a roll number slip confirming their test center, date, and roll number, typically downloadable through ETEA's official portal closer to the test date." },
  { title: "Written Test", text: "Candidates sit the ETEA-administered written test relevant to their post, typically objective MCQ-based." },
  { title: "Physical Test (where applicable)", text: "For posts like police recruitment or Rescue 1122 that involve operational duties, a physical test stage follows written test qualification." },
  { title: "Interview", text: "Shortlisted candidates attend an interview conducted by the hiring department's panel, assessing suitability for the specific role." },
  { title: "Result", text: "ETEA and/or the hiring department announces results at each relevant stage, moving qualifying candidates forward in the process." },
  { title: "Final Selection", text: "Based on combined test, physical (where applicable), and interview performance, the hiring department finalizes selection and issues appointment offers to successful candidates." },
];

const syllabusItems = [
  {
    title: "General Knowledge",
    text: "Covers geography, international organizations, and general awareness topics, common across most recruitment-related ETEA tests. Preparation strategy: build broad familiarity through consistent MCQs practice rather than last-minute cramming.",
  },
  {
    title: "Pakistan Affairs",
    text: "Covers Pakistan's history, constitutional development, and key national institutions. Preparation strategy: focus on constitutional milestones and major historical events, since these are commonly tested in a direct, factual format.",
  },
  {
    title: "Current Affairs",
    text: "Covers recent national and international developments. Preparation strategy: treat this as an ongoing daily habit rather than a one-time review, since outdated material actively hurts performance here.",
  },
  {
    title: "Islamic Studies",
    text: "Covers foundational Islamic teachings, history, and general religious knowledge, generally compulsory for Muslim candidates in recruitment-related tests. Preparation strategy: prioritize accuracy and careful review of source material.",
  },
  {
    title: "English",
    text: "Covers grammar, vocabulary, and comprehension, appearing across most ETEA test types in some form. Preparation strategy: build grammar fundamentals through consistent MCQs practice.",
  },
  {
    title: "Mathematics",
    text: "Appears in certain recruitment and technical tests, covering basic to intermediate-level mathematical concepts. Preparation strategy: focus on core arithmetic, percentages, and basic problem-solving, since these are the most commonly tested areas.",
  },
  {
    title: "Computer Knowledge",
    text: "Covers basic computer literacy and general IT terminology, appearing in various recruitment tests. Preparation strategy: review fundamental computer concepts and common terminology relevant to general office use.",
  },
  {
    title: "Analytical Reasoning",
    text: "Covers logical reasoning and problem-solving questions, common in many recruitment-related ETEA tests. Preparation strategy: practice a range of reasoning question types regularly to build both accuracy and speed.",
  },
  {
    title: "Subject-Specific Topics",
    text: "For medical admission tests, this means Biology, Chemistry, and Physics at the FSc level; for engineering posts, relevant technical subjects; for other specialist recruitment, field-specific content. Preparation strategy: align study material directly with the exact syllabus for your specific test — medical and engineering candidates in particular should follow the FSc-level curriculum closely rather than generic competitive exam material.",
  },
];

const mistakes = [
  "Assuming all ETEA tests follow the same syllabus and format, regardless of test category.",
  "Applying without carefully reading the full eligibility criteria for the specific post or program.",
  "Ignoring current affairs preparation for recruitment-related tests until the final weeks.",
  "Relying on outdated current affairs or general knowledge material.",
  "Skipping past papers entirely and walking into the test without a sense of realistic difficulty.",
  "Preparing for a medical/engineering admission test using generic competitive exam material instead of FSc-level curriculum.",
  "Not practicing under timed conditions before the actual test.",
  "Submitting incomplete or mismatched documentation during registration.",
  "Missing the registration deadline due to last-minute submission attempts.",
  "Not confirming the exact subject-combination requirement (e.g., pre-medical vs. pre-engineering) before registering.",
  "Failing to verify domicile or quota-specific documentation relevant to the specific post or program.",
  "Neglecting interview preparation for recruitment tests until after written results are announced.",
  "Studying passively (re-reading) instead of active recall through MCQs and practice questions.",
  "Failing to download and verify the roll number slip in time before the test.",
  "Not verifying the current test pattern before starting preparation, assuming last year's format still applies.",
  "Over-focusing on one subject while neglecting others with similar weightage.",
  "Ignoring physical fitness preparation for posts like police or Rescue 1122 that include a physical test stage.",
  "Assuming general recruitment test preparation is sufficient for a subject-heavy admission test, or vice versa.",
  "Not preparing a structured study schedule, leading to inconsistent syllabus coverage.",
  "Relying on unofficial or unverified sources for test dates, fee details, or eligibility changes.",
];

const tips = [
  "Start by identifying exactly which ETEA test category you're preparing for before choosing study material.",
  "Read the full official advertisement or admission notice for your target test before beginning preparation.",
  "Build a written study schedule mapping subject coverage across your available preparation time.",
  "For recruitment tests, treat current affairs as a daily habit, not a subject you review once.",
  "For medical/engineering admission tests, closely follow the FSc board curriculum rather than generic entry-test guides.",
  "Use topic-wise MCQs practice before moving to full-length mock tests.",
  "Solve past papers early to understand realistic difficulty and pacing, not just in the final week.",
  "Keep concise revision notes rather than re-reading entire textbooks repeatedly.",
  "Focus extra time on subjects where your past paper or mock test performance is weakest.",
  "Review your incorrect answers specifically — don't just track your overall score.",
  "Build general knowledge gradually through consistent daily exposure rather than cramming.",
  "For subject-specific tests, align your prep material closely with the exact syllabus your test covers.",
  "Simulate real test timing during mock tests, including full-length practice for subject-heavy exams.",
  "Stay updated on any changes to ETEA's test pattern for your specific category.",
  "Prepare your registration documents well ahead of the deadline to avoid last-minute errors.",
  "If your test includes a physical component (police, Rescue 1122), begin physical preparation alongside written study, not after.",
  "Practice verbal, structured answers for interview preparation if your test category includes one.",
  "Avoid switching study material frequently — consistency with one well-organized resource beats scattered studying.",
  "Track your own progress with periodic self-assessment tests, not just passive review.",
  "Prioritize accuracy over speed initially, then build speed once accuracy is consistently strong.",
  "Join structured weekly revision cycles to reinforce retention of earlier material.",
  "Don't neglect Islamic Studies or English in favor of only focusing on subject-specific content.",
  "For technical or medical tests, revisit your FSc/degree-level coursework as core preparation material.",
  "Pace your preparation over time — burnout close to the test date reduces retention and performance.",
  "Verify every detail — fee, schedule, eligibility, syllabus — against ETEA's or the hiring department's official announcement before finalizing your preparation plan.",
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

export default function EteaPillar() {
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
            Educational Testing and Evaluation Agency
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            ETEA Exams in Pakistan – Complete Guide, Eligibility, Syllabus &amp; Preparation
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            ETEA conducts a wide range of tests in Khyber Pakhtunkhwa — from recruitment tests for police,
            health, and education department posts to entry tests for medical and engineering admissions.
            This guide brings together everything a candidate needs in one place: what ETEA actually tests,
            who&apos;s eligible for which test category, how the process works step by step, and how to prepare
            without wasting time on the wrong material.
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <Link
              href="/mcqs/etea"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Start Practicing ETEA MCQs <FaArrowRight size={11} />
            </Link>
            <Link
              href="/past-papers/etea"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              View ETEA Past Papers
            </Link>
          </div>
          <p className="text-sky-200/80 text-xs md:text-sm leading-relaxed max-w-3xl">
            Content on this page is reviewed for accuracy and updated regularly — but always confirm
            eligibility, fees, and schedules against ETEA&apos;s official advertisements before applying.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        {/* Quick prep links */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            Start ETEA Preparation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { name: "Practice ETEA MCQs", path: "/mcqs/etea" },
              { name: "ETEA Past Papers", path: "/past-papers/etea" },
              { name: "Online Tests", path: "/online-tests/etea" },
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
              The Educational Testing and Evaluation Agency (ETEA) is one of the primary testing bodies
              operating in Khyber Pakhtunkhwa, conducting both recruitment tests for various government
              departments and entry tests for professional academic admissions. Unlike a public service
              commission that handles the full appointment process, ETEA&apos;s core role is administering the
              test itself — often on behalf of a hiring department or an admitting institution — making it a
              distinct but equally important part of KP&apos;s testing landscape.
            </p>
            <p>
              ETEA exams matter because they cover a genuinely wide range of opportunities: police
              recruitment, health department posts, education department roles, Rescue 1122 recruitment,
              engineering and medical entry tests, and various contract-based and technical government
              positions all pass through ETEA at some point. For many candidates in KP, an ETEA test is either
              their entry point into a professional degree program or their route into a specific government
              department role.
            </p>
            <p>
              Because ETEA administers tests on behalf of so many different departments and institutions,
              the syllabus, format, and difficulty can vary meaningfully from one ETEA test to another. A
              police recruitment test looks different from a medical college entry test, and both differ from a
              Rescue 1122 recruitment exam. Preparing generically, without understanding which specific ETEA
              test you&apos;re sitting and what it actually covers, is one of the most common reasons candidates
              underperform.
            </p>
            <p>
              This is where PakLearners fits in. Rather than offering scattered, generic content, this guide
              and the wider{" "}
              <Link href="/government-exams" className="font-bold text-[#1565C0] hover:underline">
                government exams in Pakistan
              </Link>{" "}
              section it belongs to are organized specifically around how ETEA testing actually works —
              supported by organized MCQs, solved past papers, and a structured preparation roadmap you can
              follow from your first day of study through to test day.
            </p>
          </Prose>
        </Section>

        <Section id="what-is-etea" title="What is ETEA?">
          <Prose>
            <p className="font-semibold text-slate-800">
              ETEA (Educational Testing and Evaluation Agency) is a testing body based in Khyber Pakhtunkhwa
              that conducts recruitment tests for various government departments and entry tests for
              professional academic admissions.
            </p>
            <p>
              <strong className="text-slate-900">History:</strong> ETEA was established to provide a
              standardized, centralized testing service for government departments and educational institutions
              in Khyber Pakhtunkhwa, reducing the need for each department or institution to independently
              design and administer its own recruitment or entry test.
            </p>
            <p>
              <strong className="text-slate-900">Mission:</strong> ETEA&apos;s core mission is to conduct
              fair, standardized, and merit-based tests on behalf of the departments and institutions that
              engage its services, ensuring consistency and transparency across the testing process.
            </p>
            <p>
              <strong className="text-slate-900">Responsibilities:</strong> ETEA&apos;s responsibilities
              include designing test content, administering written tests at designated centers, processing
              results, and providing merit lists or scorecards to the hiring department or admitting
              institution, which then handles the remainder of the selection or admission process.
            </p>
            <p>
              <strong className="text-slate-900">Role in recruitment:</strong> For government recruitment,
              ETEA typically conducts the written testing stage on behalf of the hiring department, with the
              department itself handling advertisement, application processing, and final appointment — meaning
              ETEA&apos;s role is centered specifically on test design and administration rather than the full
              recruitment cycle.
            </p>
            <p>
              <strong className="text-slate-900">Educational testing:</strong> Beyond recruitment, ETEA is
              widely known for conducting entry tests for professional degree admissions — most notably medical
              and engineering entry tests — for institutions across Khyber Pakhtunkhwa, functioning similarly
              to other provincial entry test bodies in this respect.
            </p>
            <p>
              <strong className="text-slate-900">Government recruitment process (ETEA&apos;s part in it):</strong>{" "}
              When a KP government department needs to fill posts, it may engage ETEA to design and conduct
              the written test portion of recruitment. Candidates apply and register for the specific test,
              sit the ETEA-administered exam, and results are then used by the hiring department to proceed
              with further stages such as physical tests, interviews, or final selection.
            </p>
            <p>
              ETEA&apos;s role is distinct from{" "}
              <Link href="/government-exams/kppsc" className="font-bold text-[#1565C0] hover:underline">
                KPPSC
              </Link>
              , which is a constitutional public service commission handling the complete recruitment process
              for many provincial posts. ETEA, by contrast, more often functions as a testing service engaged
              by individual departments and institutions for specific recruitment or admission needs.
            </p>
          </Prose>
        </Section>

        <Section id="types-of-etea-exams" title="Types of ETEA Exams">
          <Prose>
            <p>
              ETEA doesn&apos;t conduct one uniform test — it administers exams across several distinct
              categories, each with its own purpose and eligibility.
            </p>
          </Prose>
          <div
            className="mt-5 mb-6 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="Types of ETEA exams in Pakistan infographic"
          >
            {[
              { title: "Recruitment Tests", items: "Police · Health · Education · Rescue 1122" },
              { title: "Admission Tests", items: "Medical · Engineering · Scholarships" },
              { title: "Technical & Specialized", items: "Technical Posts · Contract-Based · Govt Dept. Jobs" },
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
            Across nearly all these categories, general knowledge, current affairs, and basic English/reasoning
            components remain fairly consistent, while the subject-specific portion (medical sciences,
            engineering, technical skills) differs based on the specific test.
          </p>
        </Section>

        <Section id="eligibility" title="ETEA Eligibility Criteria">
          <Prose>
            <p className="font-semibold text-slate-800">
              Eligibility for ETEA tests varies significantly depending on which specific test and post or
              program you&apos;re applying for.
            </p>
            <p>
              <strong className="text-slate-900">Educational Qualification:</strong> Requirements range from
              Intermediate-level for medical/engineering entry tests (with FSc pre-medical or pre-engineering
              typically required) to Bachelor&apos;s or relevant technical qualifications for most
              recruitment-related tests, depending on the specific post.
            </p>
            <p>
              <strong className="text-slate-900">Age Limit:</strong> Age limits are set individually per test
              and post by the relevant hiring department or admitting institution, and are detailed in each
              specific advertisement or admission notice.
            </p>
            <p>
              <strong className="text-slate-900">Nationality:</strong> Candidates must generally be Pakistani
              citizens, and for KP-specific recruitment tests, KP domicile is typically required as well.
            </p>
            <p>
              <strong className="text-slate-900">Domicile:</strong> Most recruitment-related ETEA tests
              require Khyber Pakhtunkhwa domicile, since these tests are conducted on behalf of KP
              government departments; medical and engineering admission tests may have province-specific or
              institution-specific domicile and quota rules.
            </p>
            <p>
              <strong className="text-slate-900">Experience:</strong> Entry-level recruitment posts typically
              require no prior experience, while certain technical or specialist posts may require relevant
              experience as specified in the advertisement.
            </p>
            <p>
              <strong className="text-slate-900">Required Documents:</strong> Typically includes CNIC (or B-Form
              for younger candidates in the case of admission tests), educational certificates and
              transcripts, domicile certificate, and recent photographs — exact requirements vary by specific
              test and are listed in the relevant advertisement or admission notice.
            </p>
          </Prose>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">Common Eligibility Mistakes</h3>
          <BulletList
            items={[
              "Assuming eligibility requirements are the same across all ETEA test categories, when they actually vary significantly between recruitment and admission tests.",
              "Missing domicile or quota-specific documentation required for a particular post or program.",
              "Applying for a technical or medical test without confirming the exact subject-combination requirement (e.g., pre-medical vs. pre-engineering FSc group).",
              "Not verifying the current age limit for a specific recruitment post before applying.",
            ]}
          />
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">
            Eligibility Comparison Table (General Pattern by Test Type)
          </h3>
          <DataTable
            headers={["Test Category", "Typical Minimum Qualification", "Test Format", "Additional Stage"]}
            rows={eligibilityRows}
          />
          <p className="text-xs text-slate-500 leading-relaxed mt-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
            Always verify exact qualification, age, and process requirements against the specific ETEA
            advertisement or admission notice for your target test — this table reflects general patterns, not
            guaranteed current requirements.
          </p>
        </Section>

        <Section id="recruitment-process" title="ETEA Recruitment Process">
          <Prose>
            <p className="font-semibold text-slate-800">
              For recruitment-related ETEA tests, the process generally follows this structure, though
              specifics can vary by hiring department and post.
            </p>
          </Prose>
          <div
            className="my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2"
            role="img"
            aria-label="ETEA recruitment process timeline"
          >
            {["Advertisement", "Registration", "Fee", "Roll No. Slip", "Written Test", "Physical Test", "Interview", "Result", "Selection"].map(
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
            This process timeline varies significantly depending on the hiring department and post, so
            candidates should track official communications closely rather than assuming a fixed universal
            timeline.
          </p>
        </Section>

        <Section id="exam-pattern" title="ETEA Test Pattern">
          <Prose>
            <p className="font-semibold text-slate-800">
              ETEA test patterns differ depending on the specific test and post, but generally follow a few
              recognizable formats.
            </p>
            <p>
              <strong className="text-slate-900">MCQ Format:</strong> Most ETEA tests — both recruitment and
              admission-related — use an objective-type MCQ format, covering general knowledge, current
              affairs, and subject-specific content relevant to the post or program.
            </p>
            <p>
              <strong className="text-slate-900">Subject Weightage:</strong> Subject weightage differs by test
              type — recruitment tests typically weight general knowledge and current affairs heavily, while
              medical and engineering admission tests weight subject-specific content (Biology, Chemistry,
              Physics, or relevant technical subjects) far more heavily.
            </p>
            <p>
              <strong className="text-slate-900">Passing Criteria:</strong> Passing criteria and merit
              thresholds vary by specific test, post, and the number of available seats or vacancies, since
              ETEA tests are often merit-based rather than using a single fixed passing percentage across all
              test types.
            </p>
            <p>
              <strong className="text-slate-900">Interview:</strong> Most recruitment-related ETEA tests are
              followed by an interview conducted by the hiring department, while admission tests (like medical
              entry tests) typically rely on merit score alone without a separate interview stage.
            </p>
            <p>
              <strong className="text-slate-900">Merit List:</strong> For recruitment posts, merit is generally
              calculated using a combination of written test and interview scores as determined by the hiring
              department; for admission tests, merit is typically based on the test score itself, often
              combined with academic record according to the admitting institution&apos;s policy.
            </p>
          </Prose>
          <p className="text-xs text-slate-500 leading-relaxed mt-5 bg-slate-50 border border-slate-100 rounded-xl p-3">
            Candidates should always verify the latest official test pattern for their specific ETEA test,
            since format and weightage can vary by post and are subject to revision by the hiring department
            or admitting institution.
          </p>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">General Test Pattern Comparison</h3>
          <DataTable
            headers={["Test Type", "Format", "Interview", "Additional Stage"]}
            rows={patternRows}
          />
        </Section>

        <Section id="syllabus" title="ETEA Syllabus">
          <Prose>
            <p className="font-semibold text-slate-800">
              ETEA syllabus content varies significantly by test type, but several subjects appear
              consistently across most recruitment-related tests, while admission tests follow a distinct
              academic syllabus.
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

        <Section id="preparation-strategy" title="Best ETEA Preparation Strategy">
          <Prose>
            <p className="font-semibold text-slate-800">
              A structured, time-bound preparation plan consistently outperforms unstructured studying.
            </p>
          </Prose>
          <div
            className="my-5 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="ETEA exam preparation roadmap and study plan"
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
              <h3 className="text-base font-black text-slate-900 mb-2">Daily Routine</h3>
              <BulletList
                items={[
                  "Dedicate focused study blocks rather than long, unfocused sessions.",
                  "Include a brief current affairs review daily if preparing for a recruitment-related test.",
                  "End each day with a short MCQs practice set covering that day's topic.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Weekly Routine</h3>
              <BulletList
                items={[
                  "Rotate through core subjects across the week rather than focusing on just one subject at a time.",
                  "Set aside one day weekly for a consolidated review of weaker areas identified through practice.",
                  "Attempt at least one timed mock test or past paper set weekly as preparation progresses.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Monthly Study Plan</h3>
              <BulletList
                items={[
                  "Break your overall syllabus into monthly milestones, ensuring full coverage before your test date.",
                  "Use the final month primarily for past paper practice, mock tests, and targeted revision rather than introducing new content.",
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
                  "For medical/engineering admission tests, prioritize subject-specific MCQs closely aligned with the FSc syllabus.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Mock Tests</h3>
              <BulletList
                items={[
                  "Begin timed mock tests once your foundational content review is largely complete, typically in the final 4–6 weeks before your test.",
                  "Treat mock test results as diagnostic, directing subsequent study time toward your weakest areas.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Interview Preparation</h3>
              <BulletList
                items={[
                  "For recruitment tests that include an interview stage, prepare by reviewing your background, staying current on relevant developments, and practicing clear, structured verbal answers once you're confident of clearing the written test.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Time Management</h3>
              <BulletList
                items={[
                  "Practice pacing yourself during MCQs sessions to match the actual test's time constraints, not just accuracy.",
                  "For subject-heavy tests like medical admissions, practice full-length timed papers to build stamina and pacing for the actual test duration.",
                ]}
              />
            </div>
          </div>
        </Section>

        <Section id="books" title="Best Books for ETEA Preparation">
          <Prose>
            <p className="font-semibold text-slate-800">
              Rather than recommending specific titles (which can go out of print or be revised), here are
              categories worth prioritizing:
            </p>
          </Prose>
          <BulletList
            items={[
              "General knowledge and current affairs compilations updated within the last year, since older editions quickly become outdated — most relevant for recruitment-related tests.",
              "Pakistan Affairs and Islamic Studies guides aligned with the standard curriculum used in recruitment test syllabi.",
              "FSc-level Biology, Chemistry, and Physics guides specifically for candidates preparing for medical or engineering admission tests, matching the board curriculum closely.",
              "English grammar and comprehension guides designed for competitive/entry test preparation.",
              "Analytical reasoning practice books for recruitment tests that include a reasoning component.",
              "MCQs practice compilations organized by topic, ideally cross-referenced against past paper trends for your specific test type.",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            Always check the publication or edition date before relying on any preparation book, particularly
            for current affairs and general knowledge material.
          </p>
        </Section>

        <Section id="past-papers" title="ETEA Past Papers">
          <Prose>
            <p>
              <strong className="text-slate-900">Why past papers matter:</strong> ETEA past papers reveal the
              actual phrasing, structure, and difficulty level used in real tests — information that generic
              study guides cannot fully replicate. They also help candidates recognize which topics ETEA tends
              to emphasize repeatedly across different test cycles for a given category.
            </p>
            <p>
              <strong className="text-slate-900">How to analyze past papers:</strong> Rather than solving a
              past paper once and moving on, go through it topic by topic — identify which subjects appeared
              most frequently, note the specific phrasing style used, and treat every incorrect answer as a
              signal pointing to a genuine knowledge gap.
            </p>
            <p>
              <strong className="text-slate-900">Repeated topics:</strong> Certain general knowledge and
              subject-specific topics tend to reappear across ETEA papers within the same test category (e.g.,
              medical admission tests) across different years, though exact repetition varies — past paper
              review is the most reliable way to identify these patterns for your specific target test.
            </p>
            <p>
              <strong className="text-slate-900">Preparation strategy using past papers:</strong> Set aside
              dedicated past-paper practice sessions under timed conditions as your test date approaches,
              rather than treating past papers as casual reading material. This builds both content familiarity
              and exam-day pacing simultaneously.
            </p>
          </Prose>
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            Explore our organized{" "}
            <Link href="/past-papers" className="font-bold text-[#1565C0] hover:underline">
              past papers
            </Link>{" "}
            collection for solved papers organized by test category and year.
          </p>
        </Section>

        <Section id="mcqs" title="ETEA MCQs">
          <Prose>
            <p>
              <strong className="text-slate-900">Daily practice:</strong> Consistent, even short, daily MCQs
              practice builds stronger long-term recall than occasional long study sessions, particularly for
              general knowledge and current affairs.
            </p>
            <p>
              <strong className="text-slate-900">Topic-wise MCQs:</strong> Work through MCQs organized by
              subject rather than randomly mixed sets, so you can identify and address specific weak areas
              systematically.
            </p>
            <p>
              <strong className="text-slate-900">Online practice:</strong> Practicing MCQs online allows for
              faster iteration and immediate feedback on incorrect answers, making it a useful supplement to
              book-based study, particularly in the final weeks before your test.
            </p>
            <p>
              <strong className="text-slate-900">Current affairs MCQs:</strong> For recruitment-related tests,
              prioritize recently updated current affairs MCQs over older sets, and revisit this subject more
              frequently than others in your study rotation.
            </p>
            <p>
              <strong className="text-slate-900">GK MCQs:</strong> Build broad general knowledge through
              regular, topic-organized practice rather than passive reading, since this subject rewards
              accumulated exposure over consistent practice sessions.
            </p>
          </Prose>
        </Section>

        <Section id="jobs-results" title="Latest ETEA Jobs & Results">
          <Prose>
            <p>
              <strong className="text-slate-900">Advertisements:</strong> ETEA-administered recruitment
              tests are advertised by the hiring department, sometimes with joint ETEA notices, covering
              police, health, education, Rescue 1122, and other KP government posts. Always review the full
              advertisement text for exact eligibility, deadlines, and registration instructions.
            </p>
            <p>
              <strong className="text-slate-900">Roll number slips:</strong> Once your registration is
              processed and confirmed eligible, your roll number slip is issued closer to the test date,
              usually downloadable through ETEA&apos;s official portal.
            </p>
            <p>
              <strong className="text-slate-900">Test schedule:</strong> Written test dates are announced
              following the registration closing period; candidates should monitor official ETEA and department
              communications for any schedule updates or changes.
            </p>
            <p>
              <strong className="text-slate-900">Results:</strong> Following each test, ETEA releases results
              through official channels, either directly or in coordination with the hiring department, moving
              qualifying candidates forward in the process.
            </p>
            <p>
              <strong className="text-slate-900">Merit lists:</strong> For recruitment posts, final merit
              lists are typically compiled by the hiring department using combined test and interview (and
              physical test, where applicable) scores; for admission tests, merit lists are compiled by the
              admitting institution based on ETEA test scores.
            </p>
          </Prose>
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            We do not publish speculative, unconfirmed, or outdated job listings — check our{" "}
            <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
              jobs section
            </Link>{" "}
            for currently tracked openings, and always cross-verify against ETEA&apos;s or the hiring
            department&apos;s official advertisement before registering or paying any fee.
          </p>
        </Section>

        <Section id="common-mistakes" title="Common Mistakes Students Make">
          <BulletList items={mistakes} />
        </Section>

        <Section id="expert-tips" title="Expert Preparation Tips">
          <BulletList items={tips} />
        </Section>

        <Section id="why-paklearners" title="Why Choose PakLearners?">
          <Prose>
            <p>
              PakLearners is built specifically around Pakistan&apos;s government exam and testing landscape,
              including ETEA&apos;s wide range of test categories, rather than mixing this content with
              unrelated general education material.
            </p>
          </Prose>
          <BulletList
            items={[
              "Updated study material — content reviewed and refreshed on an ongoing basis, particularly for current affairs and general knowledge sections relevant to recruitment tests.",
              "Past papers — organized by test category, supporting focused, pattern-based revision.",
              "MCQs — topic-wise practice questions covering general knowledge, current affairs, and subject-specific content relevant to your target test.",
              "Preparation guides — structured roadmaps that account for the real differences between recruitment tests and admission tests, rather than treating all ETEA tests the same.",
              "Student-friendly content — explanations written in plain language rather than dense bureaucratic phrasing.",
              "Reliable educational resources — content cross-checked against official patterns where possible, and updated when test formats change.",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            We don&apos;t claim to be Pakistan&apos;s largest platform, and we avoid making unverifiable claims
            about user numbers or guaranteed outcomes. What we focus on is making sure the ETEA content we
            provide is accurate, organized, and genuinely useful for candidates preparing for a specific test.
          </p>
        </Section>

        <Section id="faq" title="Frequently Asked Questions">
          <div className="space-y-3">
            {eteaFaqs.map((faq, index) => (
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
            organized information about ETEA exams. Eligibility, fees, schedules, and syllabus details should
            always be verified against ETEA&apos;s official announcements before applying or registering,
            since these can be revised between test cycles and vary significantly by test category. If you
            notice outdated or incorrect information on this page, you can report it through our Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
