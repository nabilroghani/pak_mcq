"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { ntsFaqs } from "@/data/ntsFaqs";

const examTypes = [
  {
    title: "Government Jobs Tests",
    body: "NTS conducts written recruitment tests on behalf of various federal and provincial government departments, typically covering general knowledge, current affairs, English, and post-relevant subject content, with the specific syllabus and pattern varying by hiring department.",
  },
  {
    title: "University Admission Tests",
    body: "Beyond NAT and GAT specifically, NTS administers various other admission-related tests for individual universities and academic programs, with syllabus and format defined by the admitting institution's requirements.",
  },
  {
    title: "NAT (National Aptitude Test)",
    body: "NAT is a general aptitude test used by many universities across Pakistan as part of undergraduate admission criteria, covering English, quantitative reasoning, analytical reasoning, and a general subject-area component (arts or science stream), depending on the NAT variant relevant to the candidate's intended program.",
  },
  {
    title: "GAT General",
    body: "GAT General is a graduate-level aptitude test commonly required for admission to MS/MPhil and similar postgraduate programs, covering verbal reasoning, quantitative reasoning, and analytical reasoning at a level appropriate for graduate applicants.",
  },
  {
    title: "GAT Subject",
    body: "GAT Subject tests assess subject-specific knowledge relevant to a candidate's specific postgraduate or specialized program (such as a subject-specific test for a particular MS/PhD field), often required alongside or instead of GAT General depending on the program's admission criteria.",
  },
  {
    title: "Teacher Recruitment Tests",
    body: "NTS conducts recruitment tests for teaching positions on behalf of various provincial education departments, typically including a subject-specific written component aligned with the specific teaching subject, alongside general knowledge and pedagogy-related content depending on the post.",
  },
  {
    title: "Health Department Tests",
    body: "Recruitment tests for health department posts conducted through NTS on behalf of various provincial or federal health departments, with eligibility and syllabus depending on the specific post and hiring body.",
  },
  {
    title: "Police Recruitment",
    body: "NTS occasionally conducts written tests for police department recruitment drives, typically covering general knowledge, current affairs, and basic reasoning, generally followed by a physical test and interview conducted by the police department itself.",
  },
  {
    title: "Scholarship Tests",
    body: "Tests connected to specific scholarship programs administered through NTS, with syllabus and eligibility defined by the individual scholarship program's requirements.",
  },
  {
    title: "Engineering & Technical Recruitment",
    body: "Recruitment tests for engineering and technical positions across various government departments and organizations, requiring relevant technical qualifications and including subject-specific content alongside general sections.",
  },
  {
    title: "Banking Recruitment",
    body: "NTS conducts recruitment tests on behalf of certain public-sector banks and financial institutions, typically covering general knowledge, English, mathematics, and analytical reasoning relevant to banking-sector roles.",
  },
  {
    title: "Contract-Based Government Recruitment",
    body: "NTS also administers testing for contract-based (rather than permanent/regular) government positions across various departments, which may have different eligibility timelines and terms compared to standard recruitment, as specified in the relevant advertisement.",
  },
];

const eligibilityRows = [
  ["Government Jobs Tests", "Varies by post — Intermediate to Master's", "Objective MCQ", "Interview (often)"],
  ["NAT", "Intermediate (FA/FSc or equivalent)", "Objective MCQ — English, Quant, Analytical, subject stream", "Used as part of university admission criteria"],
  ["GAT General", "Bachelor's degree", "Objective MCQ — Verbal, Quantitative, Analytical", "Used for MS/MPhil admission criteria"],
  ["GAT Subject", "Bachelor's degree (subject-relevant)", "Subject-specific MCQ", "Used for specialized graduate admission"],
  ["Teacher Recruitment", "Bachelor's/Master's (subject-relevant)", "Subject-specific + general MCQ", "Interview (often)"],
  ["Banking Recruitment", "Bachelor's/Master's", "Objective MCQ", "Interview"],
];

const patternRows = [
  ["Government Jobs Tests", "General knowledge, current affairs, post-relevant subject", "Yes (by hiring department)", "Department's own selection process"],
  ["NAT", "English, quantitative, analytical, subject stream", "No", "Input into university admission criteria"],
  ["GAT General", "Verbal, quantitative, analytical reasoning", "No", "Input into postgraduate admission criteria"],
  ["GAT Subject", "Subject-specific content", "No", "Input into specialized graduate admission"],
  ["Teacher Recruitment", "Subject-specific + general", "Often", "Department's own selection process"],
];

const processSteps = [
  { title: "Advertisement", text: "The hiring department, university, or organization publishes a vacancy or admission announcement, sometimes jointly with NTS, listing eligibility criteria and registration deadlines." },
  { title: "Online Registration", text: "Candidates register for the specific NTS test through NTS's official online portal within the announced window." },
  { title: "Application Form", text: "Candidates complete the application form with personal, educational, and test-specific details as required for their target test." },
  { title: "Fee Submission", text: "A test fee is required as part of registration; the exact amount and payment method are specified in the registration notice and can vary by test type." },
  { title: "Document Upload", text: "Candidates upload required supporting documents (CNIC, educational certificates, photographs) as part of the online registration process." },
  { title: "Application Review", text: "Submitted applications are reviewed against the test's eligibility criteria before candidates are confirmed for the test." },
  { title: "Roll Number Slip", text: "Eligible candidates receive a roll number slip confirming their test center, date, and roll number, typically downloadable through NTS's official portal closer to the test date." },
  { title: "Written Test", text: "Candidates sit the NTS-administered written test relevant to their specific category — recruitment, NAT, GAT, or subject-specific." },
  { title: "Interview (where applicable)", text: "For recruitment-related tests, shortlisted candidates attend an interview conducted by the hiring department's panel; admission tests like NAT and GAT typically do not include an NTS-administered interview stage." },
  { title: "Final Result", text: "NTS releases results through its official channels; for recruitment tests, the hiring department then proceeds with further selection stages, while for admission tests, results are used directly by the university as part of its own admission process." },
];

const syllabusItems = [
  {
    title: "General Knowledge",
    text: "Covers geography, international organizations, and general awareness topics, common across most recruitment-related NTS tests. Preparation strategy: build broad familiarity through consistent MCQs practice rather than last-minute cramming.",
  },
  {
    title: "Pakistan Affairs",
    text: "Covers Pakistan's history, constitutional development, and key national institutions, appearing in many recruitment tests. Preparation strategy: focus on constitutional milestones and major historical events, since these are commonly tested in a direct, factual format.",
  },
  {
    title: "Current Affairs",
    text: "Covers recent national and international developments, relevant primarily to recruitment tests. Preparation strategy: treat this as an ongoing daily habit rather than a one-time review, since outdated material actively hurts performance here.",
  },
  {
    title: "Islamic Studies",
    text: "Covers foundational Islamic teachings and general religious knowledge, appearing in some recruitment tests, generally compulsory for Muslim candidates where included. Preparation strategy: prioritize accuracy and careful review of source material.",
  },
  {
    title: "English",
    text: "Covers grammar, vocabulary, and comprehension across nearly all NTS test types, including NAT and GAT, where it's often a significant scoring component. Preparation strategy: build grammar and comprehension skills through consistent practice, since English carries meaningful weight across almost every NTS test category.",
  },
  {
    title: "Mathematics/Quantitative Reasoning",
    text: "Appears in NAT, GAT General, banking recruitment, and various technical tests, covering basic to intermediate-level mathematical and quantitative problem-solving. Preparation strategy: focus on core arithmetic, algebra, and data interpretation, since these are the most commonly tested areas in the quantitative sections of aptitude tests.",
  },
  {
    title: "Analytical Reasoning",
    text: "Covers logical reasoning and problem-solving questions, prominent in NAT, GAT General, and many recruitment tests. Preparation strategy: practice a range of reasoning question types regularly to build both accuracy and speed, since this section often distinguishes strong scorers from average ones in aptitude-based tests.",
  },
  {
    title: "Computer Knowledge",
    text: "Covers basic computer literacy and general IT terminology, appearing in various recruitment tests. Preparation strategy: review fundamental computer concepts and common terminology relevant to general office or technical use.",
  },
  {
    title: "Subject-Specific Topics",
    text: "For GAT Subject, teacher recruitment, and technical/engineering tests, this means content matching the specific graduate field, teaching subject, or technical discipline being tested. Preparation strategy: align study material directly with the exact syllabus published for your specific test — GAT Subject and teacher recruitment candidates in particular should follow their discipline's standard academic curriculum closely rather than generic aptitude test material.",
  },
];

const mistakes = [
  "Assuming all NTS tests follow the same syllabus and format, regardless of test category.",
  "Registering for the wrong GAT variant (General vs. Subject) relative to what their target program actually requires.",
  "Applying without carefully reading the full eligibility criteria for the specific test.",
  "Ignoring current affairs preparation for recruitment-related tests until the final weeks.",
  "Relying on outdated current affairs or general knowledge material.",
  "Skipping past papers entirely and walking into the test without a sense of realistic difficulty.",
  "Preparing for NAT/GAT using recruitment-test-style material instead of aptitude-focused practice.",
  "Not practicing under timed conditions before the actual test, especially for time-pressured sections like analytical reasoning.",
  "Submitting incomplete or mismatched documentation during registration.",
  "Missing the registration deadline due to last-minute submission attempts.",
  "Not confirming the exact test variant or subject requirement before registering.",
  "Failing to verify domicile or quota-specific documentation relevant to a specific recruitment post.",
  "Neglecting interview preparation for recruitment tests until after written results are announced.",
  "Studying passively (re-reading) instead of active recall through MCQs and practice questions.",
  "Failing to download and verify the roll number slip in time before the test.",
  "Not verifying the current test pattern (question count, duration, negative marking) before starting preparation.",
  "Over-focusing on one section while neglecting others with similar weightage.",
  "Assuming a strong general knowledge base alone is enough for NAT/GAT, which are primarily aptitude-based.",
  "Not preparing a structured study schedule, leading to inconsistent syllabus coverage.",
  "Relying on unofficial or unverified sources for test dates, fee details, or eligibility changes.",
];

const tips = [
  "Start by identifying exactly which NTS test category you're preparing for before choosing study material.",
  "Read the full official advertisement or registration notice for your target test before beginning preparation.",
  "Build a written study schedule mapping subject coverage across your available preparation time.",
  "For recruitment tests, treat current affairs as a daily habit, not a subject you review once.",
  "For NAT/GAT, prioritize timed practice in quantitative and analytical reasoning over content memorization.",
  "Use topic-wise MCQs practice before moving to full-length mock tests.",
  "Solve past papers early to understand realistic difficulty and pacing, not just in the final week.",
  "Keep concise revision notes rather than re-reading entire textbooks repeatedly.",
  "Focus extra time on sections where your past paper or mock test performance is weakest.",
  "Review your incorrect answers specifically — don't just track your overall score.",
  "Build general knowledge gradually through consistent daily exposure rather than cramming, for tests where it's relevant.",
  "For GAT Subject or teacher recruitment tests, align your prep material closely with your specific academic discipline.",
  "Simulate real test timing during mock tests, since NTS tests are often more time-pressured than candidates expect.",
  "Stay updated on any changes to NTS's test pattern for your specific category before finalizing your prep plan.",
  "Prepare your registration documents well ahead of the deadline to avoid last-minute errors.",
  "Practice verbal, structured answers for interview preparation if your test category includes one.",
  "Avoid switching study material frequently — consistency with one well-organized resource beats scattered studying.",
  "Track your own progress with periodic self-assessment tests, not just passive review.",
  "Prioritize accuracy over speed initially, then build speed once accuracy is consistently strong.",
  "Join structured weekly revision cycles to reinforce retention of earlier material.",
  "Don't neglect English in favor of only focusing on quantitative or subject-specific content, since it appears across nearly every NTS test type.",
  "For technical or subject-specific tests, revisit your degree-level coursework as core preparation material.",
  "Pace your preparation over time — burnout close to the test date reduces retention and performance.",
  "Double-check which specific NTS test variant your target university or department requires before registering, since mismatched registration wastes both time and fee.",
  "Verify every detail — fee, schedule, eligibility, syllabus, test pattern — against NTS's official announcement before finalizing your preparation plan.",
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

export default function NtsPillar() {
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
            National Testing Service
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            NTS Exams in Pakistan – Complete Guide, Eligibility, Syllabus &amp; Preparation
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            NTS conducts tests on behalf of dozens of departments, universities, and organizations across
            Pakistan — from government recruitment and teacher hiring to university admissions like NAT and
            GAT and scholarship testing. This guide brings together everything a candidate needs in one
            place: what NTS actually tests, who&apos;s eligible for which test category, how registration
            works step by step, and how to prepare without wasting time on the wrong material.
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <Link
              href="/mcqs/nts"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Start Practicing NTS MCQs <FaArrowRight size={11} />
            </Link>
            <Link
              href="/past-papers/nts"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              View NTS Past Papers
            </Link>
          </div>
          <p className="text-sky-200/80 text-xs md:text-sm leading-relaxed max-w-3xl">
            Content on this page is reviewed for accuracy and updated regularly — but always confirm
            eligibility, fees, and schedules against NTS&apos;s official announcements before applying.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        {/* Quick prep links */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            Start NTS Preparation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { name: "Practice NTS MCQs", path: "/mcqs/nts" },
              { name: "NTS Past Papers", path: "/past-papers/nts" },
              { name: "Online Tests", path: "/online-tests/nts" },
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
              The National Testing Service (NTS) is one of Pakistan&apos;s most widely used testing bodies,
              conducting exams on behalf of federal and provincial government departments, universities, and
              various public and semi-public organizations. Unlike a public service commission that owns the
              entire recruitment process, NTS functions as a testing service — designing and administering
              the test itself on behalf of whichever department, university, or organization has engaged it
              for a specific hiring or admission cycle.
            </p>
            <p>
              NTS&apos;s importance comes from its sheer reach. On any given testing cycle, NTS might be
              administering a government recruitment test for one department, a graduate admission test (NAT)
              for universities across the country, a subject-specific GAT test for postgraduate applicants,
              and a teacher recruitment test for a provincial education department — all at once. For
              thousands of candidates every year, an NTS test is either their gateway into graduate or
              postgraduate study, or their entry point into a specific government or public sector role.
            </p>
            <p>
              Because NTS administers tests on behalf of so many different clients, the syllabus, format,
              and difficulty of &quot;an NTS test&quot; can vary substantially depending on which specific
              test you&apos;re sitting. A government recruitment test looks very different from NAT, which
              itself differs from a subject-specific GAT paper. Preparing generically — treating all NTS
              tests as interchangeable — is one of the most common and costly mistakes candidates make.
            </p>
            <p>
              This is where PakLearners fits in. Rather than offering scattered, generic content, this
              guide and the wider{" "}
              <Link href="/government-exams" className="font-bold text-[#1565C0] hover:underline">
                government exams in Pakistan
              </Link>{" "}
              section it belongs to are organized specifically around how NTS testing actually works across
              its different categories — supported by organized MCQs, solved past papers, and a structured
              preparation roadmap you can follow from your first day of study through to test day.
            </p>
          </Prose>
        </Section>

        <Section id="what-is-nts" title="What is NTS?">
          <Prose>
            <p className="font-semibold text-slate-800">
              NTS (National Testing Service) is a testing organization that designs and administers
              standardized tests in Pakistan on behalf of government departments, universities, and various
              public and semi-public organizations.
            </p>
            <p>
              <strong className="text-slate-900">History:</strong> NTS was established to provide a
              standardized, centralized testing service that federal and provincial departments, universities,
              and organizations could rely on instead of independently designing and administering their own
              recruitment or admission tests.
            </p>
            <p>
              <strong className="text-slate-900">Mission:</strong> NTS&apos;s core mission is to conduct fair,
              standardized, and merit-based testing on behalf of the departments, institutions, and
              organizations that engage its services, aiming for consistency and transparency in the testing
              process nationwide.
            </p>
            <p>
              <strong className="text-slate-900">Responsibilities:</strong> NTS&apos;s responsibilities
              include designing test content appropriate to each client&apos;s requirements, administering
              written tests at centers across the country, processing results, and providing scorecards or
              merit data to the hiring department or admitting institution, which then handles the remainder
              of the selection or admission process.
            </p>
            <p>
              <strong className="text-slate-900">National Testing Service role:</strong> Because NTS operates
              nationally rather than being tied to a single province, it&apos;s engaged by clients across
              Pakistan — federal departments, provincial departments outside their own testing bodies,
              universities nationwide, and various semi-government organizations — giving it a notably
              broad footprint compared to province-specific testing agencies.
            </p>
            <p>
              <strong className="text-slate-900">Government recruitment:</strong> For government recruitment,
              NTS typically conducts the written testing stage on behalf of the hiring department, similar in
              structure to how other testing agencies operate — the department itself usually handles
              advertisement, application processing, and final appointment, while NTS focuses on test design
              and administration.
            </p>
            <p>
              <strong className="text-slate-900">University admissions:</strong> NTS is widely known for
              administering graduate and postgraduate admission tests — most notably NAT (National Aptitude
              Test) and GAT (Graduate Assessment Test) — used by universities across Pakistan as part of
              their own admission criteria.
            </p>
            <p>
              <strong className="text-slate-900">Scholarships:</strong> NTS also administers tests connected
              to certain scholarship programs, where a standardized test score forms part of the scholarship
              eligibility or selection criteria.
            </p>
            <p>
              <strong className="text-slate-900">Recruitment transparency:</strong> By providing a
              standardized, externally administered test, NTS&apos;s involvement is often intended to add a
              layer of transparency and consistency to a hiring or admission process, reducing reliance on
              each individual department or institution&apos;s internal testing capacity.
            </p>
            <p>
              NTS&apos;s role is broader in geographic scope than a provincially-focused testing agency like{" "}
              <Link href="/government-exams/etea" className="font-bold text-[#1565C0] hover:underline">
                ETEA
              </Link>
              , which is based in and primarily serves Khyber Pakhtunkhwa — NTS, by contrast, is engaged
              by clients across all provinces and at the federal level.
            </p>
          </Prose>
        </Section>

        <Section id="types-of-nts-tests" title="Types of NTS Tests">
          <Prose>
            <p>
              NTS doesn&apos;t conduct one uniform test — it administers exams across several distinct
              categories, each with its own purpose, syllabus, and eligibility.
            </p>
          </Prose>
          <div
            className="mt-5 mb-6 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="Types of NTS tests in Pakistan infographic"
          >
            {[
              { title: "Recruitment Tests", items: "Government Jobs · Teacher · Health · Police · Banking" },
              { title: "Admission Tests", items: "NAT · GAT General · GAT Subject · University Tests" },
              { title: "Specialized Tests", items: "Scholarships · Engineering & Technical · Contract-Based" },
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
            Across nearly all recruitment-related categories, general knowledge, current affairs, and English
            components remain fairly consistent, while admission tests like NAT and GAT follow a distinct
            aptitude-and-reasoning-focused format, and subject-specific tests (teacher recruitment, GAT
            Subject, technical posts) add a dedicated subject component.
          </p>
        </Section>

        <Section id="eligibility" title="NTS Eligibility Criteria">
          <Prose>
            <p className="font-semibold text-slate-800">
              Eligibility for NTS tests varies significantly depending on which specific test category
              you&apos;re applying for.
            </p>
            <p>
              <strong className="text-slate-900">Educational Qualification:</strong> Requirements range
              from Intermediate-level for NAT (used for undergraduate admissions) to a Bachelor&apos;s
              degree for GAT General (used for most postgraduate admissions) and GAT Subject (matching the
              specific graduate program), while recruitment-related tests require qualifications matching the
              specific post, typically Bachelor&apos;s or Master&apos;s depending on the role.
            </p>
            <p>
              <strong className="text-slate-900">Age Limit:</strong> Age limits apply mainly to
              recruitment-related NTS tests and are set individually per post by the hiring department,
              detailed in each specific advertisement; admission tests like NAT and GAT generally don&apos;t
              impose a strict age limit, though candidates should confirm this against the specific
              university or program&apos;s own admission criteria.
            </p>
            <p>
              <strong className="text-slate-900">Nationality:</strong> Candidates must generally be
              Pakistani citizens for government recruitment tests; international or overseas candidates
              applying for certain university admission tests should check the specific institution&apos;s
              policy, since this can differ from standard NTS recruitment eligibility.
            </p>
            <p>
              <strong className="text-slate-900">Domicile:</strong> Domicile requirements apply primarily
              to recruitment tests tied to a specific provincial department&apos;s quota system; admission
              tests like NAT and GAT are generally open nationally without a domicile restriction, though
              individual university admission criteria may still apply province-based quotas separately.
            </p>
            <p>
              <strong className="text-slate-900">Experience Requirements:</strong> Entry-level recruitment
              posts typically require no prior experience, while specialist or technical posts may require
              relevant experience as specified in the advertisement; admission tests do not involve
              experience requirements.
            </p>
            <p>
              <strong className="text-slate-900">Required Documents:</strong> Typically includes CNIC (or
              B-Form for younger candidates), educational certificates and transcripts matching the test&apos;s
              qualification requirement, recent photographs, and for recruitment tests, a domicile certificate
              where relevant — exact requirements vary by specific test and are listed in the relevant
              advertisement or registration notice.
            </p>
          </Prose>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">Common Eligibility Mistakes</h3>
          <BulletList
            items={[
              "Assuming eligibility requirements are the same across all NTS test categories, when they actually vary significantly between recruitment tests and admission tests like NAT/GAT.",
              "Registering for GAT Subject without confirming it's the specific variant required by the target graduate program (versus GAT General).",
              "Missing domicile or quota-specific documentation required for a particular recruitment post.",
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
            Always verify exact qualification, age, and process requirements against the specific NTS
            advertisement or registration notice for your target test — this table reflects general patterns,
            not guaranteed current requirements.
          </p>
        </Section>

        <Section id="registration-process" title="NTS Registration Process">
          <Prose>
            <p className="font-semibold text-slate-800">
              For NTS tests generally, the process follows this structure, though specifics can vary by test
              category and client department/institution.
            </p>
          </Prose>
          <div
            className="my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2"
            role="img"
            aria-label="NTS registration process timeline"
          >
            {["Advertisement", "Registration", "Application", "Fee", "Documents", "Review", "Roll No. Slip", "Written Test", "Interview", "Result"].map(
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
            This process timeline varies depending on the specific client and test category, so candidates
            should track official NTS and department/institution communications closely rather than assuming
            a fixed universal timeline.
          </p>
        </Section>

        <Section id="test-pattern" title="NTS Test Pattern">
          <Prose>
            <p className="font-semibold text-slate-800">
              NTS test patterns differ significantly depending on the specific test category.
            </p>
            <p>
              <strong className="text-slate-900">MCQ Format:</strong> The vast majority of NTS tests — both
              recruitment and admission-related — use an objective-type multiple-choice format.
            </p>
            <p>
              <strong className="text-slate-900">Number of Questions and Time Duration:</strong> These vary
              by test type — NAT, GAT General, GAT Subject, and recruitment tests each have their own
              defined question count and time duration, specified in the official test guide or registration
              notice for that specific test. Candidates should confirm the exact figures for their target
              test rather than assuming a uniform standard across all NTS tests.
            </p>
            <p>
              <strong className="text-slate-900">Subject Weightage:</strong> Weightage differs by test type
              — NAT and GAT General weight aptitude and reasoning components (English, quantitative,
              analytical) heavily, GAT Subject weights subject-specific content heavily, and recruitment
              tests typically weight general knowledge and current affairs alongside post-relevant subject
              content.
            </p>
            <p>
              <strong className="text-slate-900">Passing Criteria:</strong> Passing criteria and merit
              thresholds vary by test type and, for admission tests, by the specific university or
              program&apos;s own minimum score requirement — NTS itself typically reports a raw or
              percentile score, with the passing or qualifying threshold determined by the client department
              or institution.
            </p>
            <p>
              <strong className="text-slate-900">Merit Process:</strong> For recruitment tests, merit is
              generally determined by the hiring department using combined written test and interview scores;
              for admission tests like NAT and GAT, the test score becomes one input into the admitting
              university&apos;s own overall merit calculation, often combined with academic record.
            </p>
          </Prose>
          <p className="text-xs text-slate-500 leading-relaxed mt-5 bg-slate-50 border border-slate-100 rounded-xl p-3">
            The test pattern varies meaningfully by test category, and specific details (question count,
            duration, negative marking, passing score) should always be verified against NTS&apos;s current
            official test guide or registration notice for your specific test.
          </p>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">General Test Pattern Comparison</h3>
          <DataTable
            headers={["Test Type", "Core Content", "Interview", "Result Usage"]}
            rows={patternRows}
          />
        </Section>

        <Section id="syllabus" title="NTS Syllabus">
          <Prose>
            <p className="font-semibold text-slate-800">
              NTS syllabus content varies significantly by test type, but several subjects appear
              consistently across recruitment-related tests, while NAT/GAT follow a distinct aptitude-focused
              format.
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

        <Section id="preparation-strategy" title="Best NTS Preparation Strategy">
          <Prose>
            <p className="font-semibold text-slate-800">
              A structured, time-bound preparation plan consistently outperforms unstructured studying.
            </p>
          </Prose>
          <div
            className="my-5 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="NTS exam preparation roadmap and study plan"
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
                  "Include a brief current affairs review daily if preparing for a recruitment-related test.",
                  "End each day with a short MCQs practice set covering that day's topic.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Weekly Plan</h3>
              <BulletList
                items={[
                  "Rotate through core subjects across the week rather than focusing on just one subject at a time.",
                  "Set aside one day weekly for a consolidated review of weaker areas identified through practice.",
                  "Attempt at least one timed mock test or past paper set weekly as preparation progresses.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Monthly Plan</h3>
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
                  "For NAT/GAT, prioritize timed quantitative and analytical reasoning practice specifically, since these sections often require the most speed-building.",
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
              <h3 className="text-base font-black text-slate-900 mb-2">Time Management</h3>
              <BulletList
                items={[
                  "Practice pacing yourself during MCQs sessions to match the actual test's time constraints, not just accuracy.",
                  "For NAT/GAT specifically, practice under strict timing, since these tests are often more time-pressured relative to the number of questions than typical recruitment tests.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Current Affairs Strategy</h3>
              <BulletList
                items={[
                  "For recruitment-related tests, review current affairs daily in short sessions rather than occasional long blocks.",
                  "Skip heavy current affairs focus for NAT/GAT preparation, since these admission tests are primarily aptitude-based rather than current-affairs-based.",
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
          </div>
        </Section>

        <Section id="books" title="Best Books for NTS Preparation">
          <Prose>
            <p className="font-semibold text-slate-800">
              Rather than recommending specific titles (which can go out of print or be revised), here are
              categories worth prioritizing:
            </p>
          </Prose>
          <BulletList
            items={[
              "General knowledge and current affairs compilations updated within the last year, most relevant for recruitment-related tests.",
              "NAT/GAT preparation guides specifically designed around the aptitude-test format — English, quantitative, and analytical reasoning — rather than generic competitive exam books.",
              "Quantitative reasoning and mathematics practice books focused on the level typically tested in NAT and GAT General.",
              "Analytical/logical reasoning practice compilations, since this section carries significant weight in both admission and many recruitment tests.",
              "Subject-specific reference material matching your discipline for GAT Subject or teacher recruitment tests.",
              "MCQs practice compilations organized by topic, ideally cross-referenced against past paper trends for your specific test type.",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            Always check the publication or edition date before relying on any preparation book, particularly
            for current affairs and general knowledge material.
          </p>
        </Section>

        <Section id="past-papers" title="NTS Past Papers">
          <Prose>
            <p>
              <strong className="text-slate-900">Why past papers matter:</strong> NTS past papers reveal the
              actual phrasing, structure, and difficulty level used in real tests — information that generic
              study guides cannot fully replicate. They also help candidates recognize which topics or
              question types NTS tends to emphasize repeatedly within a given test category.
            </p>
            <p>
              <strong className="text-slate-900">How to analyze past papers:</strong> Rather than solving a
              past paper once and moving on, go through it topic by topic — identify which sections appeared
              most frequently, note the specific phrasing and difficulty style used, and treat every incorrect
              answer as a signal pointing to a genuine knowledge or skill gap.
            </p>
            <p>
              <strong className="text-slate-900">Repeated topics:</strong> Certain quantitative and
              analytical reasoning question types tend to reappear across NAT and GAT papers in different
              years, and certain general knowledge and current affairs topics recur across recruitment test
              cycles, though exact repetition varies by test category — past paper review is the most reliable
              way to identify these patterns for your specific target test.
            </p>
            <p>
              <strong className="text-slate-900">Preparation strategy using past papers:</strong> Set aside
              dedicated past-paper practice sessions under timed conditions as your test date approaches,
              rather than treating past papers as casual reading material. This builds both content
              familiarity and exam-day pacing simultaneously.
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

        <Section id="mcqs" title="NTS MCQs Preparation">
          <Prose>
            <p>
              <strong className="text-slate-900">Topic-wise practice:</strong> Work through MCQs organized
              by subject or section (English, quantitative, analytical, general knowledge) rather than randomly
              mixed sets, so you can identify and address specific weak areas systematically.
            </p>
            <p>
              <strong className="text-slate-900">Daily MCQs:</strong> Consistent, even short, daily MCQs
              practice builds stronger long-term recall and speed than occasional long study sessions.
            </p>
            <p>
              <strong className="text-slate-900">Online tests:</strong> Practicing MCQs online allows for
              faster iteration and immediate feedback on incorrect answers, making it a useful supplement to
              book-based study, particularly in the final weeks before your test.
            </p>
            <p>
              <strong className="text-slate-900">Current affairs MCQs:</strong> For recruitment-related tests,
              prioritize recently updated current affairs MCQs over older sets, and revisit this subject more
              frequently than others in your study rotation.
            </p>
            <p>
              <strong className="text-slate-900">General knowledge MCQs:</strong> Build broad general knowledge
              through regular, topic-organized practice rather than passive reading, since this subject
              rewards accumulated exposure over consistent practice sessions.
            </p>
            <p>
              <strong className="text-slate-900">Analytical practice:</strong> For NAT, GAT, and many
              recruitment tests, dedicate specific practice time to analytical reasoning question types, since
              this section often requires distinct problem-solving techniques that improve significantly with
              focused, repeated practice.
            </p>
          </Prose>
        </Section>

        <Section id="jobs-results" title="Latest NTS Jobs & Results">
          <Prose>
            <p>
              <strong className="text-slate-900">Advertisements:</strong> NTS-administered recruitment tests
              are advertised by the hiring department, sometimes with joint NTS notices, covering a wide
              range of government departments, teaching posts, and other organizations. Always review the full
              advertisement text for exact eligibility, deadlines, and registration instructions.
            </p>
            <p>
              <strong className="text-slate-900">Registration deadlines:</strong> Registration windows vary
              by advertisement and are strictly enforced — track closing dates carefully, since late
              registrations are typically not accepted.
            </p>
            <p>
              <strong className="text-slate-900">Roll number slips:</strong> Once your registration is
              processed and confirmed eligible, your roll number slip is issued closer to the test date,
              usually downloadable through NTS&apos;s official portal.
            </p>
            <p>
              <strong className="text-slate-900">Test dates:</strong> Written test dates are announced
              following the registration closing period; candidates should monitor official NTS and
              department communications for any schedule updates or changes.
            </p>
            <p>
              <strong className="text-slate-900">Results:</strong> Following each test, NTS releases results
              through official channels, either directly or in coordination with the hiring department or
              admitting institution, moving qualifying candidates forward in the process.
            </p>
            <p>
              <strong className="text-slate-900">Merit lists:</strong> For recruitment posts, final merit
              lists are typically compiled by the hiring department using combined test and interview scores;
              for admission tests like NAT and GAT, individual universities compile their own merit lists
              using NTS scores combined with their specific admission criteria.
            </p>
          </Prose>
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            We do not publish speculative, unconfirmed, or outdated job listings or exam dates — check our{" "}
            <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
              jobs section
            </Link>{" "}
            for currently tracked openings, and always cross-verify against NTS&apos;s or the hiring
            department&apos;s official advertisement before registering or paying any fee.
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
              PakLearners is built specifically around Pakistan&apos;s government exam and testing
              landscape, including NTS&apos;s wide range of test categories, rather than mixing this content
              with unrelated general education material.
            </p>
          </Prose>
          <BulletList
            items={[
              "Updated study material — content reviewed and refreshed on an ongoing basis, particularly for current affairs and general knowledge sections relevant to recruitment tests.",
              "MCQs — topic-wise practice questions covering general knowledge, current affairs, quantitative reasoning, analytical reasoning, and subject-specific content relevant to your target test.",
              "Past papers — organized by test category, supporting focused, pattern-based revision.",
              "Preparation guides — structured roadmaps that account for the real differences between recruitment tests, NAT, GAT, and subject-specific tests, rather than treating all NTS tests the same.",
              "Student-friendly learning — explanations written in plain language rather than dense bureaucratic phrasing.",
              "Reliable educational resources — content cross-checked against official patterns where possible, and updated when test formats change.",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            We don&apos;t claim to be Pakistan&apos;s largest platform, and we avoid making unverifiable claims
            about user numbers or guaranteed outcomes. What we focus on is making sure the NTS content we
            provide is accurate, organized, and genuinely useful for candidates preparing for a specific test.
          </p>
        </Section>

        <Section id="faq" title="Frequently Asked Questions">
          <div className="space-y-3">
            {ntsFaqs.map((faq, index) => (
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
            organized information about NTS exams. Eligibility, syllabus, registration deadlines, fees, test
            pattern, advertisements, and exam dates should always be verified through official NTS
            announcements before applying, since these can be revised between test cycles and vary
            significantly by test category. If you notice outdated or incorrect information on this page, you
            can report it through our Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
