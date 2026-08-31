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
import { kppscFaqs } from "@/data/kppscFaqs";

const examTypes = [
  {
    title: "Administrative Posts",
    body: (
      <>
        KPPSC recruits provincial administrative officers — such as Section Officers and other
        management-cadre roles — into Khyber Pakhtunkhwa&apos;s civil administration through
        competitive, merit-based examinations. These posts generally require a Bachelor&apos;s or
        Master&apos;s degree and involve an objective MCQ paper, sometimes followed by an additional
        written component, before the interview stage. Administrative posts can also lead toward
        related provincial civil service paths such as{" "}
        <Link href="/government-exams/pms" className="font-bold text-[#1565C0] hover:underline">
          PMS
        </Link>{" "}
        — while the federal-level equivalent competitive exam is{" "}
        <Link href="/government-exams/css" className="font-bold text-[#1565C0] hover:underline">
          CSS
        </Link>
        , conducted by FPSC rather than KPPSC.
      </>
    ),
  },
  {
    title: "Assistant Posts",
    body: "General BPS-scale assistant, clerk, and junior clerk posts are advertised regularly across Khyber Pakhtunkhwa government departments. These roles typically require Intermediate or a Bachelor's degree depending on the specific post, and involve a single objective-type MCQ paper covering general knowledge, Khyber Pakhtunkhwa Affairs, and basic subject-relevant content.",
  },
  {
    title: "Lecturer Jobs",
    body: "KPPSC recruits college lecturers across a wide range of subjects for Khyber Pakhtunkhwa's higher education institutions. These posts require a relevant Master's degree in the subject being taught, and typically involve a subject-specific written test in addition to general sections, given the specialized nature of teaching roles.",
  },
  {
    title: "Subject Specialists",
    body: "Subject Specialist posts are senior teaching roles requiring advanced subject qualification — often a Master's degree with additional criteria such as M.Phil in certain cases — and are tested through a dedicated subject-specific paper that goes deeper than the standard lecturer-level syllabus.",
  },
  {
    title: "Medical Officers",
    body: "Medical Officer and related healthcare posts recruited through KPPSC require an MBBS degree (or equivalent recognized medical qualification) and valid PMDC/PMC registration, with a subject-specific written test in addition to standard sections for most posts.",
  },
  {
    title: "Engineers",
    body: "Engineering posts across Khyber Pakhtunkhwa departments such as Irrigation, Communication & Works, and Public Health Engineering require a relevant engineering degree and PEC registration, and include subject-specific technical questions alongside general knowledge and Khyber Pakhtunkhwa Affairs sections.",
  },
  {
    title: "Agriculture Officers",
    body: "Agriculture Officer posts recruited for Khyber Pakhtunkhwa's Agriculture Department require a relevant Bachelor's or Master's degree in Agriculture Sciences, and include a subject-specific written test covering crop sciences, agronomy, and related technical content relevant to the role.",
  },
  {
    title: "Revenue Department Posts",
    body: "Revenue-related posts — such as Patwari, Naib Tehsildar, and Tehsildar — are recruited through KPPSC and require a qualification typically ranging from Intermediate to a Bachelor's degree depending on the post, with a written test covering general knowledge alongside revenue laws and land record procedures relevant to the role.",
  },
  {
    title: "Police-Related Administrative Posts",
    body: "KPPSC also recruits for civilian administrative and clerical posts within Khyber Pakhtunkhwa Police that are distinct from operational law-enforcement recruitment. These posts generally require a Bachelor's degree and involve a standard objective MCQ paper followed by an interview.",
  },
  {
    title: "Education Department Posts",
    body: "Beyond lecturer and subject specialist roles, KPPSC recruits for a range of administrative and support posts within the Elementary & Secondary Education and Higher Education departments — covering everything from clerical and supervisory roles to departmental administrative positions, each with eligibility defined per advertisement.",
  },
  {
    title: "Health Department Posts",
    body: "Besides Medical Officer posts, KPPSC recruits for various administrative, technical, and paramedical posts within the Khyber Pakhtunkhwa Health Department, with qualification requirements ranging from Intermediate-level technical certifications to relevant Bachelor's degrees depending on the specific role.",
  },
  {
    title: "IT & Technical Posts",
    body: "IT and technical posts — including roles such as Computer Operator, IT Officer, and other technology-focused positions — require qualifications ranging from a relevant diploma to a Bachelor's degree in Computer Science or a related field, with tests typically including a technical component alongside general sections.",
  },
  {
    title: "Specialized Government Posts",
    body: "Beyond the categories above, KPPSC periodically advertises other specialized posts — financial, scientific, legal, and administrative-specialist roles — each with eligibility and test pattern defined individually in the relevant advertisement.",
  },
];

const eligibilityRows = [
  ["Assistant/Clerical", "Intermediate/Bachelor's (varies by post)", "Objective MCQ", "Often, depending on post"],
  ["Administrative", "Bachelor's/Master's", "Objective MCQ (sometimes + written)", "Yes"],
  ["Lecturer", "Master's (subject-relevant)", "Subject-specific written", "Yes"],
  ["Subject Specialist", "Master's/M.Phil (subject-relevant)", "Subject-specific written", "Yes"],
  ["Medical Officer", "MBBS/equivalent + PMDC/PMC registration", "Subject-specific written", "Yes"],
  ["Engineer", "Relevant engineering degree + PEC registration", "Subject-specific technical", "Yes"],
  ["Agriculture Officer", "Bachelor's/Master's in Agriculture Sciences", "Subject-specific written", "Yes"],
  ["Revenue Dept. (e.g., Patwari)", "Intermediate/Bachelor's (post-dependent)", "Objective MCQ", "Often, depending on post"],
  ["IT & Technical", "Diploma/Bachelor's in Computer Science or related field", "Objective MCQ + technical", "Often, depending on post"],
];

const patternRows = [
  ["Assistant/Clerical & General Posts", "Single objective MCQ paper", "Often", "Written → Interview"],
  ["Administrative Posts", "Objective MCQ (sometimes + additional paper)", "Yes", "Written → Interview"],
  ["Lecturer/Subject Specialist", "Subject-specific written (often with MCQ component)", "Yes", "Written → Interview"],
  ["Technical (Medical/Engineering/IT)", "Subject-specific technical paper", "Yes", "Written → Interview"],
];

const processSteps = [
  { title: "Advertisement", text: "KPPSC publishes vacancy advertisements listing available posts, eligibility criteria, and application deadlines, typically through its official website and national newspapers." },
  { title: "Online Application", text: "Candidates apply through KPPSC's official online application system within the advertised window, submitting required documents and information matching the post's eligibility criteria." },
  { title: "Fee", text: "An application fee is required as part of the process; the exact amount and payment method are specified in the advertisement and can change over time." },
  { title: "Roll Number Slip (Admission Certificate)", text: "Eligible candidates receive a roll number slip confirming their test center, date, and roll number, usually downloadable through KPPSC's official portal closer to the exam date." },
  { title: "Written Test", text: "Candidates sit the written test relevant to their post — objective MCQ-based for most general and assistant-level posts, or subject-specific written papers for lecturer, specialist, and technical posts." },
  { title: "Result (Written Test)", text: "KPPSC announces written test results, typically listing candidates who have qualified to proceed to the next stage." },
  { title: "Interview", text: "Shortlisted candidates attend an interview conducted by a KPPSC panel, assessing subject knowledge, communication ability, and general suitability for the role." },
  { title: "Medical Examination", text: "For applicable posts, candidates recommended after the interview stage undergo a medical fitness examination as part of final clearance." },
  { title: "Merit List", text: "Based on combined written test and interview results, KPPSC prepares a final merit list ranking candidates according to available vacancies and quota allocation." },
  { title: "Appointment", text: "The hiring department issues a formal appointment letter to the recommended candidate, completing the recruitment cycle." },
];

const syllabusItems = [
  {
    title: "General Knowledge",
    text: "Covers geography, international organizations, notable achievements, and general awareness topics. Preparation strategy: build broad, consistent familiarity through regular MCQs practice rather than last-minute cramming, since this subject rewards accumulated exposure over time.",
  },
  {
    title: "Pakistan Affairs",
    text: "Covers Pakistan's history, constitutional development, political structure, and key national institutions. Preparation strategy: focus on constitutional milestones, key historical events, and their dates/significance, since these are commonly tested in a factual, direct format.",
  },
  {
    title: "Khyber Pakhtunkhwa Affairs",
    text: "Covers KP-specific history, geography, administration, and notable regional facts — content that is less covered in general Pakistan Studies material but appears specifically in KPPSC exams due to the commission's provincial scope. Preparation strategy: dedicate focused study time to KP-specific resources rather than assuming general current affairs preparation covers it adequately.",
  },
  {
    title: "Current Affairs",
    text: "Covers recent national and international developments, government policy, and major events. Preparation strategy: this subject demands ongoing attention rather than one-time study — set aside regular time to review recent developments, since outdated material actively hurts performance here.",
  },
  {
    title: "Islamic Studies",
    text: "Covers foundational Islamic teachings, history, and general religious knowledge relevant to the Pakistani curriculum, generally compulsory for Muslim candidates. Preparation strategy: prioritize accuracy and careful review of source material given the sensitivity of this subject.",
  },
  {
    title: "English",
    text: "Covers grammar, vocabulary, and comprehension relevant to objective-format KPPSC papers. Preparation strategy: build grammar fundamentals through consistent MCQs practice, focusing on commonly tested rules rather than exhaustive academic grammar study.",
  },
  {
    title: "Urdu",
    text: "Covers grammar, vocabulary, and comprehension in Urdu, appearing in many general and assistant-level KPPSC papers. Preparation strategy: practice objective-format Urdu MCQs alongside English, since both are often tested with similar question styles.",
  },
  {
    title: "Everyday Science",
    text: "Covers general scientific concepts relevant to daily life and current developments, commonly tested in general recruitment posts. Preparation strategy: focus on practical, applied science topics rather than deep theoretical content, since questions typically test general awareness rather than specialized knowledge.",
  },
  {
    title: "Computer Knowledge",
    text: "Covers basic computer literacy, common software, and general IT awareness, appearing in many general, assistant-level, and IT-related papers. Preparation strategy: review fundamental computer concepts and commonly used office software, since questions are usually introductory rather than technical unless applying for an IT-specific post.",
  },
  {
    title: "Subject-Specific Content",
    text: "For lecturer, subject specialist, medical, engineering, agriculture, and IT posts, subject-specific syllabus content follows the relevant academic or professional field. Preparation strategy: align study material directly with your degree-level knowledge in that subject, supplemented by past papers specific to that post category where available.",
  },
];

const mistakes = [
  "Applying without carefully reading the full eligibility criteria for the specific post.",
  "Assuming general preparation is enough without reviewing the specific post's syllabus.",
  "Ignoring current affairs until the final weeks before the exam.",
  "Relying on outdated current affairs or general knowledge material.",
  "Skipping past papers entirely and walking into the exam without a sense of real difficulty level.",
  "Underestimating how much Khyber Pakhtunkhwa Affairs matters, since it's often neglected in favor of general Pakistan Affairs.",
  "Not practicing under timed conditions before the actual exam.",
  "Submitting incomplete or mismatched documentation with the application.",
  "Missing the application deadline due to last-minute submission attempts.",
  "Not confirming age relaxation eligibility that may actually apply to their category.",
  "Assuming Khyber Pakhtunkhwa domicile requirements don't apply to their specific post.",
  "Neglecting interview preparation until after written results are announced.",
  "Studying passively (re-reading) instead of active recall through MCQs and practice questions.",
  "Failing to track roll number slip issuance in time.",
  "Not verifying updated exam pattern or syllabus changes before starting preparation.",
  "Over-focusing on one subject while neglecting others with equal weightage.",
  "Ignoring domicile/quota documentation requirements relevant to their application.",
  "Assuming a Bachelor's degree qualifies for posts that actually require a Master's or specific professional degree.",
  "Not preparing a structured study schedule, leading to inconsistent coverage of the syllabus.",
  "Relying on unofficial or unverified sources for exam dates, fee details, or eligibility changes.",
];

const tips = [
  "Start by reading the full official advertisement for your target post before opening any study material.",
  "Build a written study schedule that maps out subject coverage across your available preparation time.",
  "Treat current affairs as a daily habit, not a subject you review once.",
  "Use topic-wise MCQs practice before moving to full-length mock tests.",
  "Solve past papers early to understand realistic difficulty and pacing, not just in the final week.",
  "Give Khyber Pakhtunkhwa Affairs dedicated study time rather than assuming general Pakistan Affairs preparation covers it.",
  "Keep concise revision notes rather than re-reading entire textbooks repeatedly.",
  "Focus extra time on subjects where your past paper or mock test performance is weakest.",
  "Practice negative-marking-aware MCQ strategy if your specific paper uses negative marking.",
  "Review your incorrect answers specifically — don't just track your overall score.",
  "Build general knowledge gradually through consistent daily exposure rather than cramming.",
  "For subject-specific posts, align your prep material closely with your actual academic background.",
  "Simulate real exam timing during mock tests, including breaks if applicable.",
  "Stay updated on any changes to KPPSC's syllabus or exam pattern for your specific post.",
  "Prepare your application documents well ahead of the deadline to avoid last-minute errors.",
  "Practice verbal, structured answers for interview preparation, not just written content review.",
  "Avoid switching study material frequently — consistency with one well-organized resource beats scattered studying.",
  "Track your own progress with periodic self-assessment tests, not just passive review.",
  "Prioritize accuracy over speed initially, then build speed once your accuracy is consistently strong.",
  "Join structured revision cycles (e.g., weekly review of the past week's topics) to reinforce retention.",
  "Don't neglect Islamic Studies or Urdu in favor of only focusing on English and current affairs.",
  "For technical/subject-specific posts, revisit your degree-level coursework as core preparation material.",
  "Rest and pace your preparation over time — burnout close to the exam date reduces retention and performance.",
  "Double-check your domicile and quota documentation well before the application deadline.",
  "Verify every detail — fee, schedule, eligibility, syllabus — against KPPSC's official announcement before finalizing your preparation plan.",
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

export default function KppscPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC" },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href="/government-exams"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All Government Exams
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Khyber Pakhtunkhwa Public Service Commission
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            KPPSC Exams, MCQs, Syllabus &amp; Past Papers
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            Prepare for Khyber Pakhtunkhwa Public Service Commission exams with post-wise MCQs,
            past papers, syllabus guidance and job updates. Browse categories such as PMS, assistant,
            lecturer and medical officer roles — or use the resources below for structured preparation.
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <Link
              href="/category/kppsc-exams"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Browse KPPSC Categories <FaArrowRight size={11} />
            </Link>
            <Link
              href="/mcqs/kppsc"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              Practice KPPSC MCQs
            </Link>
            <Link
              href="/past-papers/kppsc"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              KPPSC Past Papers
            </Link>
          </div>
          <p className="text-sky-200/80 text-xs md:text-sm leading-relaxed max-w-3xl">
            Content on this page is reviewed for accuracy and updated regularly — but always confirm
            eligibility, fees, and schedules against KPPSC&apos;s official advertisements before applying.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        {/* Quick prep links */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            KPPSC Exam Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { name: "KPPSC syllabus guide", path: "/government-exams/kppsc/syllabus" },
              { name: "KPPSC past papers", path: "/government-exams/kppsc/past-papers" },
              { name: "Practice KPPSC MCQs", path: "/government-exams/kppsc/mcqs" },
              { name: "Latest KPPSC jobs", path: "/government-exams/kppsc/jobs" },
              { name: "Eligibility criteria", path: "/government-exams/kppsc/eligibility" },
              { name: "Preparation strategy", path: "/government-exams/kppsc/preparation" },
              { name: "KPPSC online tests", path: "/government-exams/kppsc/online-tests" },
              { name: "Browse by post category", path: "/category/kppsc-exams" },
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
              The Khyber Pakhtunkhwa Public Service Commission (KPPSC) is the primary recruiting body
              for <strong className="text-slate-900">KP government jobs</strong>, covering everything
              from entry-level clerical posts to senior specialist and management roles. For a large
              share of the province&apos;s government job aspirants, KPPSC represents the most
              consistent entry point into public sector employment across Khyber Pakhtunkhwa.
            </p>
            <p>
              Thousands of candidates apply to KPPSC recruitment cycles because of the sheer variety of
              departments involved — a single advertisement window can include administrative posts,
              teaching positions, medical officer roles, and technical specialist jobs across education,
              health, agriculture, revenue, and general administration all at once. Treating all of
              these posts the same, rather than matching preparation to the specific post being
              targeted, is one of the costliest mistakes a candidate can make.
            </p>
            <p>
              Preparation strategy matters more with KPPSC than many candidates initially realize.
              KPPSC papers include Khyber Pakhtunkhwa-specific content — from KP Affairs to
              province-specific administrative structure — that generic study material simply
              doesn&apos;t cover. Skipping this distinction and preparing from unfocused, one-size-fits-all
              resources is one of the most common reasons capable candidates underperform.
            </p>
            <p>
              This is where PakLearners fits in. Rather than offering generic competitive exam content,
              this guide and the wider{" "}
              <Link href="/government-exams" className="font-bold text-[#1565C0] hover:underline">
                government exams in Pakistan
              </Link>{" "}
              section it belongs to are organized specifically around how KPPSC exams actually work —
              supported by organized MCQs, solved past papers, and a structured preparation roadmap you
              can follow from day one through to your interview.
            </p>
          </Prose>
        </Section>

        <Section id="what-is-kppsc" title="What is KPPSC?">
          <Prose>
            <p className="font-semibold text-slate-800">
              KPPSC (Khyber Pakhtunkhwa Public Service Commission) is KP&apos;s constitutional body
              responsible for recruiting candidates into provincial government positions through
              competitive, merit-based examinations.
            </p>
            <p>
              <strong className="text-slate-900">History and constitutional basis:</strong> KPPSC
              operates under Article 242 of the Constitution of Pakistan, which establishes public
              service commissions at the federal and provincial levels to ensure recruitment into
              government service is conducted on a merit basis rather than through informal or
              discretionary appointment.
            </p>
            <p>
              <strong className="text-slate-900">Mission:</strong> KPPSC&apos;s core mandate is to
              conduct examinations and recruitment processes for provincial civil service posts in a
              transparent, competitive, and merit-based manner, ensuring that appointments to Khyber
              Pakhtunkhwa government departments are made according to candidates&apos; demonstrated
              ability rather than other factors.
            </p>
            <p>
              <strong className="text-slate-900">Responsibilities:</strong> KPPSC&apos;s
              responsibilities include advertising vacant provincial posts, conducting written
              examinations and interviews, preparing merit lists, and recommending successful
              candidates to the relevant KP departments for appointment.
            </p>
            <p>
              <strong className="text-slate-900">Recruitment process at a glance:</strong> KPPSC&apos;s
              process generally follows a consistent structure — public advertisement, online
              application, a written test (objective, subject-specific, or both depending on the post),
              and for most posts, a subsequent interview stage — before a final merit-based
              recommendation is sent to the hiring department. The full step-by-step breakdown is
              covered later in this guide.
            </p>
            <p>
              <strong className="text-slate-900">Departments KPPSC recruits for:</strong> KPPSC recruits
              across nearly every Khyber Pakhtunkhwa government department — Elementary &amp; Secondary
              Education, Higher Education, Health, Agriculture, Irrigation, Communication &amp; Works,
              Revenue, and general administration, among others — covering everything from entry-level
              assistant posts to senior specialist and administrative roles.
            </p>
            <p>
              <strong className="text-slate-900">Types of jobs recruited:</strong> The scope of KPPSC
              recruitment spans administrative posts, assistant posts, lecturer and subject specialist
              posts, medical officers, engineers, agriculture officers, revenue department posts, and
              IT &amp; technical posts — each with its own eligibility criteria and test pattern,
              covered in detail in the next section.
            </p>
            <p>
              Unlike the federal commission,{" "}
              <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">
                FPSC
              </Link>
              , which recruits for federal government positions across the entire country, or{" "}
              <Link href="/government-exams/ppsc" className="font-bold text-[#1565C0] hover:underline">
                PPSC
              </Link>
              , which serves the same function for Punjab, KPPSC&apos;s jurisdiction is limited to
              provincial government posts within Khyber Pakhtunkhwa, which is part of why KP domicile
              is generally required for most KPPSC posts.
            </p>
          </Prose>
        </Section>

        <Section id="types-of-kppsc-exams" title="Types of KPPSC Exams">
          <Prose>
            <p>
              KPPSC doesn&apos;t conduct a single, uniform exam — it manages recruitment across a wide
              range of post categories, each with its own pattern and requirements. Here&apos;s a
              breakdown of the major categories.
            </p>
          </Prose>
          <div
            className="mt-5 mb-6 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="Types of KPPSC exams in Pakistan infographic"
          >
            {[
              { title: "Administrative", items: "Administrative Posts · Assistant Posts · Revenue Dept." },
              { title: "Teaching/Education", items: "Lecturer · Subject Specialist · Education Dept. Posts" },
              { title: "Technical/Specialized", items: "Medical · Engineer · IT & Technical · Specialized Posts" },
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
            Across nearly all these categories, one thing holds true: the general knowledge, Pakistan
            Affairs, Khyber Pakhtunkhwa Affairs, current affairs, and English/Urdu components remain
            fairly consistent, while the subject-specific portion is what truly differs based on the post.
          </p>
        </Section>

        <Section id="eligibility" title="KPPSC Eligibility Criteria">
          <Prose>
            <p className="font-semibold text-slate-800">
              Eligibility for KPPSC exams varies significantly depending on the specific post, but
              several factors apply broadly across most KPPSC recruitment.
            </p>
            <p>
              <strong className="text-slate-900">Qualification:</strong> Requirements range from
              Intermediate for certain assistant-level posts to a Bachelor&apos;s degree for most
              general and administrative posts, a Master&apos;s degree for lecturer and certain
              specialist roles, and professional qualifications (MBBS, engineering degree) for medical
              and engineering posts respectively.
            </p>
            <p>
              <strong className="text-slate-900">Age Limit:</strong> Age limits are set individually per
              post in each advertisement, generally falling within a range appropriate to entry-level or
              specialist recruitment, with relaxation provisions for certain categories under KP
              government policy. Always confirm the exact age bracket and any relaxation provisions
              against the current advertisement, since these are periodically revised.
            </p>
            <p>
              <strong className="text-slate-900">Nationality:</strong> Candidates must generally be
              Pakistani citizens to be eligible for KPPSC recruitment, as is standard for provincial
              government service.
            </p>
            <p>
              <strong className="text-slate-900">Experience:</strong> Entry-level posts typically
              require no prior experience, while mid-to-senior posts (particularly subject specialist,
              administrative, and technical roles) often require a specified number of years of relevant
              professional experience, detailed in the specific advertisement.
            </p>
            <p>
              <strong className="text-slate-900">Domicile:</strong> Most KPPSC posts require Khyber
              Pakhtunkhwa domicile, since KPPSC recruits specifically for provincial government
              positions within KP. Domicile and district-level quota requirements can vary by specific
              post, so candidates should verify the exact requirement against the official advertisement
              before applying.
            </p>
            <p>
              <strong className="text-slate-900">Quota:</strong> KP recruitment through KPPSC operates
              under a quota system designed to ensure representation across districts and regions,
              alongside quotas for categories such as women, minorities, and disabled candidates, as
              defined by provincial policy. Quota structures can be revised, so candidates should verify
              current quota details for their specific post.
            </p>
            <p>
              <strong className="text-slate-900">Required Documents:</strong> Typically includes CNIC,
              educational certificates and transcripts, a Khyber Pakhtunkhwa domicile certificate,
              photographs, and any experience or professional registration relevant to the post — exact
              document requirements are listed in each specific advertisement.
            </p>
          </Prose>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">Common Eligibility Mistakes</h3>
          <BulletList
            items={[
              "Assuming a Bachelor's degree alone qualifies for posts that actually require a Master's or professional degree.",
              "Missing age relaxation provisions that may apply to the candidate's specific category.",
              "Submitting incomplete or mismatched domicile documentation relative to the claimed quota.",
              "Applying for a post without checking whether prior relevant experience is a hard requirement.",
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
            Always verify exact qualification, age, and process requirements against the specific KPPSC
            advertisement for your target post — this table reflects general patterns, not guaranteed
            current requirements.
          </p>
        </Section>

        <Section id="recruitment-process" title="KPPSC Recruitment Process">
          <Prose>
            <p className="font-semibold text-slate-800">
              KPPSC recruitment generally follows a consistent step-by-step structure, though specifics
              can vary slightly by post.
            </p>
          </Prose>
          <div
            className="my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2"
            role="img"
            aria-label="KPPSC recruitment process timeline"
          >
            {["Advertisement", "Online Application", "Written Test", "Interview", "Merit List", "Appointment"].map(
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
            high-volume recruitment drives, so candidates should plan their preparation timeline with
            this in mind.
          </p>
        </Section>

        <Section id="exam-pattern" title="KPPSC Exam Pattern">
          <Prose>
            <p className="font-semibold text-slate-800">
              KPPSC exam patterns differ depending on the post category, but generally fall into a few
              recognizable formats.
            </p>
            <p>
              <strong className="text-slate-900">MCQs (Objective Papers):</strong> Most assistant,
              administrative, and general posts use a single objective-type MCQ paper, typically
              covering general knowledge, Pakistan Affairs, Khyber Pakhtunkhwa Affairs, current affairs,
              and English/Urdu, usually within a defined negative-marking structure specified in the
              advertisement.
            </p>
            <p>
              <strong className="text-slate-900">Negative Marking:</strong> Negative marking policies
              can vary by specific KPPSC test and are defined in the relevant advertisement or
              recruitment rules, so candidates should verify whether negative marking applies to their
              specific exam rather than assuming a single, uniform rule applies across all KPPSC posts.
            </p>
            <p>
              <strong className="text-slate-900">Subject Weightage:</strong> For lecturer, subject
              specialist, medical, engineering, agriculture, and IT posts, a dedicated subject-specific
              paper carries significant weightage alongside the general sections, testing specialized
              knowledge relevant to the role.
            </p>
            <p>
              <strong className="text-slate-900">Interview:</strong> Most KPPSC posts include a panel
              interview after the written stage, assessing communication ability, subject depth, and
              general suitability for the role.
            </p>
            <p>
              <strong className="text-slate-900">Merit Formula:</strong> Final merit is typically
              calculated using a weighted combination of written test and interview marks, with the
              exact weightage defined per post category and detailed in the relevant recruitment rules.
            </p>
          </Prose>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">General Exam Pattern Comparison</h3>
          <DataTable
            headers={["Post Category", "Paper Format", "Interview", "Typical Stages"]}
            rows={patternRows}
          />
        </Section>

        <Section id="syllabus" title="KPPSC Syllabus Guide">
          <Prose>
            <p className="font-semibold text-slate-800">
              KPPSC syllabus content varies by post, but several subjects appear consistently across
              most exam types.
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

        <Section id="preparation-strategy" title="Best KPPSC Preparation Strategy">
          <Prose>
            <p className="font-semibold text-slate-800">
              A structured, time-bound preparation plan consistently outperforms unstructured studying.
              Here&apos;s a roadmap you can adapt to your own exam timeline for effective KPPSC test
              preparation and online preparation practice.
            </p>
          </Prose>
          <div
            className="my-5 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="KPPSC exam preparation roadmap and study plan"
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
                  "Dedicate focused study blocks (e.g., 2–3 hours) rather than long, unfocused sessions.",
                  "Include at least one current affairs review session daily, even if brief.",
                  "End each day with a short MCQs practice set covering that day's topic.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Weekly Routine</h3>
              <BulletList
                items={[
                  "Rotate through your core subjects (general knowledge, Pakistan Affairs, Khyber Pakhtunkhwa Affairs, English/Urdu, and post-specific content) across the week rather than focusing on just one subject at a time.",
                  "Set aside one day weekly for a consolidated current affairs review covering the week's major developments.",
                  "Attempt at least one timed mock test or past paper set weekly as your preparation progresses.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Monthly Plan</h3>
              <BulletList
                items={[
                  "Break your overall syllabus into monthly milestones, ensuring each core subject area is covered at least once before your exam date.",
                  "Use the final month primarily for past paper practice, mock tests, and targeted revision of weak areas rather than introducing new content.",
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
              <h3 className="text-base font-black text-slate-900 mb-2">Current Affairs Strategy</h3>
              <BulletList
                items={[
                  "Review current affairs at least a few times a week rather than in one long session, since this subject shifts constantly.",
                  "Prioritize developments relevant to Khyber Pakhtunkhwa and Pakistan specifically, alongside major international events, and don't neglect KP-specific Affairs in favor of general current affairs.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">MCQ Strategy</h3>
              <BulletList
                items={[
                  "Work through MCQs organized by subject before mixing subjects together in practice sets.",
                  "Practice negative-marking-aware selection if your specific paper penalizes wrong answers.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Mock Tests</h3>
              <BulletList
                items={[
                  "Begin timed mock tests once your foundational content review is largely complete, typically in the final 6–8 weeks before your exam.",
                  "Treat mock test results as diagnostic — focus subsequent study time on the specific topics where you're losing marks.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Interview Preparation</h3>
              <BulletList
                items={[
                  "Once you've cleared or are approaching the written stage, begin preparing for the interview by reviewing your academic background, staying current on major national and Khyber Pakhtunkhwa-specific developments, and practicing clear, structured verbal answers to common interview question types.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Time Management</h3>
              <BulletList
                items={[
                  "Practice pacing yourself during MCQs sessions to match the actual exam's time constraints, not just accuracy.",
                  "For subject-specific written papers, practice structuring full answers within a set time limit to build exam-day speed.",
                ]}
              />
            </div>
          </div>
        </Section>

        <Section id="best-books" title="Best Books for KPPSC">
          <Prose>
            <p>
              Rather than recommending specific titles (which can go out of print or be revised), here
              are the categories of preparation material worth prioritizing:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "General knowledge and current affairs compilations updated within the last year, since older editions quickly become outdated.",
                "Pakistan Affairs and Khyber Pakhtunkhwa Affairs guides aligned with the standard curriculum used in KPPSC syllabi.",
                "Islamic Studies guides matching the standard curriculum used in KPPSC and related competitive exams.",
                "English and Urdu grammar guides specifically designed for objective-format competitive exam preparation.",
                "Subject-specific reference material matching your degree background for lecturer, specialist, medical, engineering, or agriculture posts.",
                "MCQs practice compilations organized by topic, ideally cross-referenced against past paper trends.",
              ]}
            />
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
            Always check the publication or edition date before relying on any preparation book,
            particularly for current affairs and general knowledge material.
          </p>
        </Section>

        <Section id="past-papers" title="KPPSC Past Papers">
          <Prose>
            <p>
              <strong className="text-slate-900">Why past papers matter:</strong> KPPSC past papers
              reveal the actual phrasing, structure, and difficulty level used in real exams —
              information that generic study guides cannot fully replicate. They also help candidates
              recognize which topics KPPSC tends to emphasize repeatedly across different recruitment
              cycles.
            </p>
            <p>
              <strong className="text-slate-900">How to analyze past papers:</strong> Rather than
              solving a past paper once and moving on, go through it topic by topic — identify which
              subjects appeared most frequently, note the specific phrasing style used, and treat every
              incorrect answer as a signal pointing to a genuine knowledge gap rather than just a wrong
              guess.
            </p>
            <p>
              <strong className="text-slate-900">Repeated topics:</strong> Certain general knowledge,
              Khyber Pakhtunkhwa Affairs, and current affairs topics tend to reappear across KPPSC
              papers in different years, though exact repetition varies by post and exam cycle — past
              paper review is the most reliable way to identify these patterns for your specific target
              exam.
            </p>
            <p>
              <strong className="text-slate-900">How to practice effectively:</strong> Set aside
              dedicated past-paper practice sessions under timed conditions as your exam date
              approaches, rather than treating past papers as casual reading material. This builds both
              content familiarity and exam-day pacing simultaneously.
            </p>
            <p>
              Explore our organized{" "}
              <Link href="/past-papers" className="font-bold text-[#1565C0] hover:underline">
                past papers
              </Link>{" "}
              collection, or go directly to our dedicated{" "}
              <Link href="/past-papers/kppsc" className="font-bold text-[#1565C0] hover:underline">
                KPPSC past papers
              </Link>{" "}
              section for solved papers organized by year and post category.
            </p>
          </Prose>
        </Section>

        <Section id="mcqs" title="KPPSC MCQs Preparation">
          <Prose>
            <p>
              <strong className="text-slate-900">Daily practice:</strong> Consistent, even short, daily
              MCQs practice builds stronger long-term recall than occasional long study sessions,
              particularly for subjects like general knowledge and current affairs.
            </p>
            <p>
              <strong className="text-slate-900">Topic-wise practice:</strong> Work through MCQs
              organized by subject rather than randomly mixed sets, so you can identify and address
              specific weak areas systematically.
            </p>
            <p>
              <strong className="text-slate-900">Khyber Pakhtunkhwa Affairs MCQs:</strong> Since KP
              Affairs is often under-covered in general preparation material, prioritize dedicated
              KP-specific MCQs alongside your general knowledge practice.
            </p>
            <p>
              <strong className="text-slate-900">Current affairs MCQs:</strong> Given how quickly this
              subject changes, prioritize recently updated current affairs MCQs over older sets, and
              revisit this subject more frequently than others in your rotation.
            </p>
            <p>
              <strong className="text-slate-900">Mock tests:</strong> Once you&apos;ve built a solid
              MCQs foundation, shift toward timed, exam-simulating mock tests that combine multiple
              subjects, mirroring the actual KPPSC paper format for your target post.
            </p>
            <p>
              <strong className="text-slate-900">Online practice:</strong> Practicing MCQs online allows
              for faster iteration and immediate feedback on incorrect answers compared to static
              printed material, making it a useful supplement to book-based study, particularly in the
              final weeks before your exam.
            </p>
          </Prose>
          <Link
            href="/mcqs/kppsc"
            className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-[#1565C0] hover:underline"
          >
            Practice KPPSC MCQs <FaArrowRight size={10} />
          </Link>
        </Section>

        <Section id="latest-jobs" title="Latest KPPSC Jobs">
          <Prose>
            <p>
              <strong className="text-slate-900">Advertisements:</strong> KPPSC publishes new job
              advertisements periodically throughout the year, covering administrative, teaching,
              technical, and specialized posts across Khyber Pakhtunkhwa government departments. Always
              review the full advertisement text for exact eligibility, deadlines, and application
              instructions.
            </p>
            <p>
              <strong className="text-slate-900">Closing dates:</strong> Application deadlines vary by
              advertisement and are strictly enforced — track closing dates carefully, since late
              applications are typically not accepted.
            </p>
            <p>
              <strong className="text-slate-900">Roll number slips:</strong> Once your application is
              processed, your roll number slip confirming your test center and date is issued closer to
              the exam, usually downloadable through KPPSC&apos;s official portal.
            </p>
            <p>
              <strong className="text-slate-900">Test dates:</strong> Written test dates are announced
              following the application closing period; candidates should monitor official KPPSC
              communications for any schedule updates or changes.
            </p>
            <p>
              <strong className="text-slate-900">Results:</strong> Following each stage of testing,
              KPPSC releases results through official channels, moving qualifying candidates forward in
              the recruitment process. Track KPPSC results and related updates through our{" "}
              <Link href="/results" className="font-bold text-[#1565C0] hover:underline">
                results page
              </Link>
              , alongside official KPPSC announcements.
            </p>
            <p>
              We do not publish speculative, unconfirmed, or outdated job listings — check our{" "}
              <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
                jobs section
              </Link>{" "}
              for currently tracked openings, and always cross-verify against KPPSC&apos;s official
              advertisement before applying or paying any fee.
            </p>
          </Prose>
        </Section>

        <Section id="common-mistakes" title="Common Mistakes KPPSC Candidates Make">
          <ol className="space-y-2.5 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
            {mistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
        </Section>

        <Section id="expert-tips" title="Expert Preparation Tips">
          <ol className="space-y-2.5 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
            {tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        </Section>

        <Section id="why-paklearners" title="Why Choose PakLearners?">
          <BulletList
            items={[
              "Content organized specifically around how KPPSC exams actually work, rather than generic competitive exam material.",
              "MCQs and past papers structured by post category, so you can focus on exactly what your target exam tests.",
              "Regularly reviewed and updated content, reflecting current KPPSC patterns and syllabus emphasis.",
              "A structured preparation roadmap covering daily, weekly, and monthly study planning.",
              "Dedicated coverage of Khyber Pakhtunkhwa Affairs and other KPPSC-specific content often missed by general study guides.",
              "A single, organized platform connecting MCQs, past papers, current affairs, and job tracking in one place.",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            Preparing for KPPSC exams doesn&apos;t have to mean piecing together scattered resources
            from multiple sources. PakLearners brings structured, KPPSC-specific preparation material
            together in one place, so you can spend your time studying rather than searching for the
            right content.
          </p>
        </Section>

        {/* FAQ */}
        <Section id="faq" title="Frequently Asked Questions About KPPSC Exams">
          <div className="space-y-2">
            {kppscFaqs.map((faq, i) => {
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
                      {faq.q === "How is KPPSC different from PPSC and FPSC?" && (
                        <>
                          {" "}
                          Learn more on our{" "}
                          <Link href="/government-exams/ppsc" className="font-bold text-[#1565C0] hover:underline">
                            PPSC
                          </Link>{" "}
                          and{" "}
                          <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">
                            FPSC
                          </Link>{" "}
                          guides.
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* EEAT */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 mb-4">
            <span>
              <strong className="text-slate-900">Written By:</strong> PakLearners Editorial Team
            </span>
            <span>
              <strong className="text-slate-900">Reviewed For:</strong> Educational Accuracy
            </span>
            <span>
              <strong className="text-slate-900">Last Updated:</strong> July 2026
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            This guide is maintained as part of PakLearners&apos; ongoing effort to provide accurate,
            organized information about KPPSC exams. Eligibility, fees, schedules, and syllabus details
            should always be verified against KPPSC&apos;s official advertisements before applying,
            since these can be revised between recruitment cycles. If you notice outdated or incorrect
            information on this page, you can report it through our{" "}
            <Link href="/contact" className="font-bold text-[#1565C0] hover:underline">
              Contact
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </div>
  );
}
