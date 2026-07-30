"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { fpscFaqs } from "@/data/fpscFaqs";

const examTypes = [
  {
    title: "CSS (Central Superior Services)",
    body: (
      <>
        FPSC&apos;s flagship competitive exam, recruiting officers into Pakistan&apos;s senior civil
        service groups — including Foreign Service, Police Service, and Administrative Service. CSS
        involves written papers in compulsory and optional subjects, followed by a psychological
        assessment and interview. See our dedicated{" "}
        <Link href="/government-exams/css" className="font-bold text-[#1565C0] hover:underline">
          CSS exam guide
        </Link>{" "}
        for full details.
      </>
    ),
  },
  {
    title: "General Recruitment (BPS-Scale Posts)",
    body: "FPSC regularly advertises general BPS-scale posts across federal ministries and departments — administrative, clerical, and support roles that typically involve a single objective-type MCQ paper covering general knowledge, current affairs, and basic subject-relevant content.",
  },
  {
    title: "Assistant Director (AD) Posts",
    body: "AD-level posts are advertised across various federal departments and typically require a Bachelor's or Master's degree. These posts generally involve an MCQ-based written test followed by an interview, with subject-specific content depending on the hiring department.",
  },
  {
    title: "Inspector Posts",
    body: "Inspector-level posts (in departments such as Customs or similar federal bodies) typically require a Bachelor's degree and include a written test covering general knowledge and post-relevant subject knowledge, often followed by a physical or medical standard requirement specific to the role.",
  },
  {
    title: "Lecturer Posts",
    body: "FPSC occasionally recruits lecturers for federal educational institutions, requiring a relevant Master's degree in the subject being taught. These posts typically involve a subject-specific written test in addition to general sections, given the specialized nature of teaching roles.",
  },
  {
    title: "Customs",
    body: "Customs-related posts recruited through FPSC generally require a Bachelor's degree and involve a written test covering general knowledge and customs/trade-relevant content, with law-enforcement-adjacent posts sometimes requiring specific physical standards.",
  },
  {
    title: "ASF (Airport Security Force)",
    body: "FPSC-conducted recruitment for ASF-related federal posts generally requires candidates to meet both academic and physical eligibility standards, with a written test covering general knowledge and security-relevant awareness.",
  },
  {
    title: "FIA (Federal Investigation Agency)",
    body: "FIA posts recruited through FPSC typically require a Bachelor's degree, with written tests covering general knowledge, current affairs, and investigative or legal-awareness content depending on the specific post.",
  },
  {
    title: "Intelligence-Related Posts",
    body: "Certain federal intelligence-adjacent posts are recruited through FPSC, generally requiring strong general knowledge, analytical ability, and, for many roles, additional security clearance processes beyond the standard FPSC written test and interview.",
  },
  {
    title: "Medical Posts",
    body: "Medical officer and related healthcare posts recruited through FPSC require relevant medical qualifications (MBBS or equivalent, depending on the post) and often include a subject-specific written test in addition to standard sections.",
  },
  {
    title: "Engineering Posts",
    body: "Engineering posts across federal departments typically require a relevant engineering degree and include subject-specific technical questions alongside general knowledge and current affairs sections.",
  },
  {
    title: "Teaching Posts (Beyond Lecturer)",
    body: "Beyond lecturer-level roles, FPSC occasionally recruits for other federal teaching and training positions, with eligibility and test pattern depending on the specific institution and subject.",
  },
  {
    title: "IT Posts",
    body: "Information technology posts recruited through FPSC require relevant computer science or IT qualifications and typically include a technical written component testing programming, systems, or IT-management knowledge depending on the role.",
  },
  {
    title: "Specialized/Technical Posts",
    body: "Beyond the categories above, FPSC periodically recruits for other specialized technical posts — legal, financial, scientific, and administrative-specialist roles — each with eligibility and test pattern defined individually in the relevant advertisement.",
  },
];

const eligibilityRows = [
  ["CSS", "Bachelor's (2nd division/equivalent CGPA)", "Compulsory + Optional Subjects (written)", "Yes, plus psychological assessment"],
  ["General Recruitment (BPS-scale)", "Bachelor's (varies by scale)", "Objective MCQ", "Often, depending on post"],
  ["Assistant Director", "Bachelor's/Master's", "Objective MCQ", "Yes"],
  ["Inspector", "Bachelor's", "Objective MCQ", "Yes, often with physical standard"],
  ["Lecturer", "Master's (subject-relevant)", "Subject-specific written", "Yes"],
  ["Medical Officer", "MBBS/equivalent", "Subject-specific written", "Yes"],
  ["Engineering", "Relevant engineering degree", "Subject-specific technical", "Yes"],
  ["IT Posts", "Computer Science/IT degree", "Technical written", "Yes"],
];

const patternRows = [
  ["CSS", "Compulsory + Optional subjective papers", "Yes + psychological assessment", "Written → Assessment → Interview → Medical"],
  ["General/BPS Posts", "Single objective MCQ paper", "Often", "Written → Interview → Medical"],
  ["Lecturer/Specialist", "Subject-specific written (often subjective)", "Yes", "Written → Interview → Medical"],
  ["Technical (Engineering/IT/Medical)", "Subject-specific technical paper", "Yes", "Written → Interview → Medical"],
];

const processSteps = [
  { title: "Advertisement", text: "FPSC publishes vacancy advertisements listing available posts, eligibility criteria, and application deadlines, typically through its official website and national newspapers." },
  { title: "Application", text: "Candidates apply through FPSC's official application system within the advertised window, submitting required documents and information matching the post's eligibility criteria." },
  { title: "Fee", text: "An application fee is required to be submitted as part of the process; the exact amount and payment method are specified in the advertisement and can change over time." },
  { title: "Admission Certificate (Roll Number Slip)", text: "Eligible candidates receive an admission certificate confirming their test center, date, and roll number, usually issued closer to the exam date." },
  { title: "Written Test", text: "Candidates sit the written test relevant to their post — objective MCQ-based for most general posts, or compulsory/optional subjective papers for CSS and similar exams." },
  { title: "Result (Written Test)", text: "FPSC announces written test results, typically listing candidates who have qualified to proceed to the next stage." },
  { title: "Interview", text: "Shortlisted candidates attend an interview (and, for CSS, a psychological assessment) conducted by an FPSC panel." },
  { title: "Medical Examination", text: "For most federal posts, candidates recommended after the interview stage undergo a medical fitness examination as part of final clearance." },
  { title: "Final Recommendation", text: "Based on combined written test, interview, and medical clearance results, FPSC prepares a final merit list and recommends successful candidates to the relevant federal department." },
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
    title: "Current Affairs",
    text: "Covers recent national and international developments, government policy, and major events. Preparation strategy: this subject demands ongoing attention rather than one-time study — set aside regular time to review recent developments, since outdated material actively hurts performance here.",
  },
  {
    title: "English",
    text: "Covers grammar, vocabulary, comprehension, and for CSS, essay writing. Preparation strategy: build grammar fundamentals through consistent MCQs practice for objective-format exams, and for CSS specifically, practice structured essay writing regularly, since this is often a decisive factor in the compulsory subjects.",
  },
  {
    title: "Islamic Studies",
    text: "Covers foundational Islamic teachings, history, and general religious knowledge relevant to the Pakistani curriculum, generally compulsory for Muslim candidates. Preparation strategy: prioritize accuracy and careful review of source material given the sensitivity of this subject.",
  },
  {
    title: "Everyday Science",
    text: "Covers general scientific concepts relevant to daily life and current developments, commonly tested in general recruitment posts. Preparation strategy: focus on practical, applied science topics rather than deep theoretical content, since questions typically test general awareness rather than specialized knowledge.",
  },
  {
    title: "Subject-Specific Content",
    text: "For technical, medical, engineering, IT, and lecturer posts, subject-specific syllabus content follows the relevant academic or professional field. Preparation strategy: align study material directly with your degree-level knowledge in that subject, supplemented by past papers specific to that post category where available.",
  },
];

const mistakes = [
  "Applying without carefully reading the full eligibility criteria for the specific post.",
  "Assuming general preparation is enough without reviewing the specific post's syllabus.",
  "Ignoring current affairs until the final weeks before the exam.",
  "Relying on outdated current affairs or general knowledge material.",
  "Skipping past papers entirely and walking into the exam without a sense of real difficulty level.",
  "Underestimating how much English/essay writing matters for CSS specifically.",
  "Not practicing under timed conditions before the actual exam.",
  "Submitting incomplete or mismatched documentation with the application.",
  "Missing the application deadline due to last-minute submission attempts.",
  "Not confirming age relaxation eligibility that may actually apply to their category.",
  "Choosing CSS optional subjects based on popularity rather than personal strength.",
  "Neglecting interview preparation until after written results are announced.",
  "Studying passively (re-reading) instead of active recall through MCQs and practice questions.",
  "Failing to track the admission certificate/roll number slip issuance in time.",
  "Not verifying updated exam pattern or syllabus changes before starting preparation.",
  "Over-focusing on one subject while neglecting others with equal weightage.",
  "Ignoring domicile/quota documentation requirements relevant to their application.",
  "Assuming a Bachelor's degree qualifies for posts that actually require a Master's.",
  "Not preparing a structured study schedule, leading to inconsistent coverage of the syllabus.",
  "Relying on unofficial or unverified sources for exam dates, fee details, or eligibility changes.",
];

const tips = [
  "Start by reading the full official advertisement for your target post before opening any study material.",
  "Build a written study schedule that maps out subject coverage across your available preparation time.",
  "Treat current affairs as a daily habit, not a subject you review once.",
  "Use topic-wise MCQs practice before moving to full-length mock tests.",
  "Solve past papers early to understand realistic difficulty and pacing, not just in the final week.",
  "For CSS, practice essay writing regularly under timed conditions well before your exam date.",
  "Keep concise revision notes rather than re-reading entire textbooks repeatedly.",
  "Focus extra time on subjects where your past paper or mock test performance is weakest.",
  "Practice negative-marking-aware MCQ strategy if your specific paper uses negative marking.",
  "Review your incorrect answers specifically — don't just track your overall score.",
  "Build general knowledge gradually through consistent daily exposure rather than cramming.",
  "For subject-specific posts, align your prep material closely with your actual academic background.",
  "Simulate real exam timing during mock tests, including breaks if applicable.",
  "Stay updated on any changes to FPSC's syllabus or exam pattern for your specific post.",
  "Prepare your application documents well ahead of the deadline to avoid last-minute errors.",
  "Practice verbal, structured answers for interview preparation, not just written content review.",
  "For CSS, begin psychological assessment awareness and preparation alongside written prep, not after.",
  "Avoid switching study material frequently — consistency with one well-organized resource beats scattered studying.",
  "Track your own progress with periodic self-assessment tests, not just passive review.",
  "Prioritize accuracy over speed initially, then build speed once your accuracy is consistently strong.",
  "Join structured revision cycles (e.g., weekly review of the past week's topics) to reinforce retention.",
  "Don't neglect Islamic Studies or Pakistan Affairs in favor of only focusing on English and current affairs.",
  "For technical/subject-specific posts, revisit your degree-level coursework as core preparation material.",
  "Rest and pace your preparation over time — burnout close to the exam date reduces retention and performance.",
  "Verify every detail — fee, schedule, eligibility, syllabus — against FPSC's official announcement before finalizing your preparation plan.",
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

export default function FpscPillar() {
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
            Federal Public Service Commission
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            FPSC Exams in Pakistan – Complete Guide, Eligibility, Syllabus &amp; Preparation
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            FPSC conducts some of Pakistan&apos;s most competitive recruitment tests — from CSS to
            specialized federal posts across dozens of departments. This guide brings together everything
            a candidate needs in one place: what FPSC actually tests, who&apos;s eligible, how the
            recruitment process works step by step, and how to prepare without wasting time on the wrong
            material.
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <Link
              href="/mcqs/fpsc"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Start Practicing FPSC MCQs <FaArrowRight size={11} />
            </Link>
            <Link
              href="/past-papers/fpsc"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              View FPSC Past Papers
            </Link>
          </div>
          <p className="text-sky-200/80 text-xs md:text-sm leading-relaxed max-w-3xl">
            Content on this page is reviewed for accuracy and updated regularly — but always confirm
            eligibility, fees, and schedules against FPSC&apos;s official advertisements before applying.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        {/* Quick prep links */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            Start FPSC Preparation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { name: "Practice FPSC MCQs", path: "/mcqs/fpsc" },
              { name: "FPSC Past Papers", path: "/past-papers/fpsc" },
              { name: "Online Tests", path: "/online-tests/fpsc" },
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
              The Federal Public Service Commission (FPSC) is the primary recruiting body for{" "}
              <strong className="text-slate-900">federal government jobs Pakistan</strong> seekers rely
              on — ranging from senior civil service roles through CSS to specialized posts in departments
              like Customs, FIA, and various federal ministries. For thousands of candidates every year, an{" "}
              <strong className="text-slate-900">FPSC exam</strong> represents the most direct path into a
              stable, structured federal government career.
            </p>
            <p>
              Yet a large number of candidates who sit FPSC exams don&apos;t clear them — not always because
              they lack ability, but often because their preparation doesn&apos;t match what the exam
              actually tests. Some over-focus on subjects that carry less weightage while neglecting current
              affairs, which shifts constantly and requires ongoing attention. Others prepare using generic
              study material not aligned with FPSC&apos;s specific question style, or skip past papers
              entirely and walk into the exam without a realistic sense of difficulty or pacing.
            </p>
            <p>
              Proper preparation for FPSC exams means understanding three things clearly: exactly which exam
              and post you&apos;re targeting (since requirements and syllabus differ significantly across CSS,
              general recruitment, and specialized posts), what the actual exam pattern and syllabus
              weightage look like, and how to structure your study time so that practice — not just reading —
              takes up the majority of your preparation.
            </p>
            <p>
              This is where PakLearners fits in. Rather than offering generic competitive exam content, this
              guide and the wider{" "}
              <Link href="/government-exams" className="font-bold text-[#1565C0] hover:underline">
                government exams in Pakistan
              </Link>{" "}
              section it belongs to are organized specifically around how FPSC exams actually work —
              supported by organized MCQs, solved past papers, and a structured preparation roadmap you can
              follow from day one through to your interview.
            </p>
          </Prose>
        </Section>

        <Section id="what-is-fpsc" title="What is FPSC?">
          <Prose>
            <p className="font-semibold text-slate-800">
              FPSC (Federal Public Service Commission) is Pakistan&apos;s constitutional body responsible for
              recruiting candidates into federal government positions through competitive, merit-based
              examinations.
            </p>
            <p>
              <strong className="text-slate-900">History and constitutional basis:</strong> FPSC operates
              under Article 242 of the Constitution of Pakistan, which establishes public service commissions
              at the federal and provincial levels to ensure recruitment into government service is conducted
              on a merit basis rather than through informal or discretionary appointment.
            </p>
            <p>
              <strong className="text-slate-900">Mission:</strong> FPSC&apos;s core mandate is to conduct
              examinations and recruitment processes for federal civil service posts in a transparent,
              competitive, and merit-based manner, ensuring that appointments to federal departments are made
              according to candidates&apos; demonstrated ability rather than other factors.
            </p>
            <p>
              <strong className="text-slate-900">Responsibilities:</strong> FPSC&apos;s responsibilities
              include advertising vacant federal posts, conducting written examinations and interviews,
              preparing merit lists, and recommending successful candidates to the relevant federal ministries
              and departments for appointment. It also conducts CSS — Pakistan&apos;s premier competitive exam
              for senior civil service positions.
            </p>
            <p>
              <strong className="text-slate-900">Role in recruitment across federal departments:</strong> FPSC
              recruits for a wide range of federal ministries, divisions, and attached departments — from
              administrative and secretariat roles to specialized technical, medical, and
              law-enforcement-adjacent posts (such as those in Customs, FIA, and similar federal bodies). The
              scope of a single FPSC advertisement can range from a handful of specialist posts to broad,
              high-volume recruitment drives.
            </p>
            <p>
              <strong className="text-slate-900">Recruitment process at a glance:</strong> FPSC&apos;s process
              generally follows a consistent structure — public advertisement, candidate application, a written
              test (objective, subjective, or both depending on the post), and for many posts, a subsequent
              interview stage — before a final merit-based recommendation is sent to the hiring department. The
              full step-by-step breakdown is covered later in this guide.
            </p>
            <p>
              Unlike provincial commissions such as{" "}
              <Link href="/government-exams/ppsc" className="font-bold text-[#1565C0] hover:underline">
                PPSC
              </Link>
              , which recruit for provincial government posts within a specific province, FPSC&apos;s
              jurisdiction covers federal-level recruitment across the entire country, which is part of why
              FPSC exams tend to draw a larger and more geographically diverse candidate pool.
            </p>
          </Prose>
        </Section>

        <Section id="types-of-fpsc-exams" title="Types of FPSC Exams">
          <Prose>
            <p>
              FPSC doesn&apos;t conduct a single, uniform exam — it manages recruitment across a wide range of
              post categories, each with its own pattern and requirements. Here&apos;s a breakdown of the major
              categories. Related competitive pathways such as{" "}
              <Link href="/government-exams/pms" className="font-bold text-[#1565C0] hover:underline">
                PMS
              </Link>{" "}
              follow a similar civil-service style at the provincial level, but are not conducted by FPSC.
            </p>
          </Prose>
          <div
            className="mt-5 mb-6 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="Types of FPSC exams in Pakistan infographic"
          >
            {[
              { title: "Competitive", items: "CSS · Senior civil service" },
              { title: "General Recruitment", items: "BPS posts · AD · Inspector" },
              { title: "Specialized", items: "Medical · Engineering · IT · Lecturer · Customs · FIA · ASF" },
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
            Across nearly all these categories, one thing holds true: the general knowledge, current affairs,
            and English components remain fairly consistent, while the subject-specific portion is what truly
            differs based on the post.
          </p>
        </Section>

        <Section id="eligibility" title="FPSC Eligibility Criteria">
          <Prose>
            <p className="font-semibold text-slate-800">
              Eligibility for FPSC exams varies significantly depending on the specific post, but several
              factors apply broadly across most FPSC recruitment.
            </p>
            <p>
              <strong className="text-slate-900">Qualification:</strong> Requirements range from a Bachelor&apos;s
              degree for most general and AD-level posts to a Master&apos;s degree for lecturer and certain
              specialist roles, and professional qualifications (MBBS, engineering degree, law degree) for
              medical, engineering, and legal posts respectively. CSS requires at minimum a Bachelor&apos;s
              degree with second division or equivalent CGPA.
            </p>
            <p>
              <strong className="text-slate-900">Age Limit:</strong> Age limits are set individually per post in
              each advertisement. CSS traditionally has an age range in the low-to-mid twenties through early
              thirties, while general recruitment posts vary depending on the BPS scale and department. Always
              confirm the exact age bracket and any relaxation provisions against the current advertisement,
              since these are periodically revised.
            </p>
            <p>
              <strong className="text-slate-900">Nationality:</strong> Candidates must generally be Pakistani
              citizens to be eligible for FPSC recruitment, as is standard for federal government service.
            </p>
            <p>
              <strong className="text-slate-900">Experience:</strong> Entry-level posts typically require no
              prior experience, while mid-to-senior posts (particularly AD-level, specialist, and technical
              roles) often require a specified number of years of relevant professional experience, detailed in
              the specific advertisement.
            </p>
            <p>
              <strong className="text-slate-900">Domicile:</strong> FPSC recruitment generally follows a
              merit-and-quota system based on provincial representation rather than requiring a specific
              single-province domicile, though domicile documentation is still required as part of the
              application to verify quota eligibility.
            </p>
            <p>
              <strong className="text-slate-900">Quota:</strong> Federal recruitment through FPSC operates under
              a quota system designed to ensure representation across provinces and regions, alongside quotas
              for categories such as women, minorities, and disabled candidates, as defined by federal policy.
              Quota structures can be revised, so candidates should verify current quota details for their
              specific post.
            </p>
            <p>
              <strong className="text-slate-900">Required Documents:</strong> Typically includes CNIC,
              educational certificates and transcripts, domicile certificate, photographs, and any experience or
              professional certification relevant to the post — exact document requirements are listed in each
              specific advertisement.
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
            Always verify exact qualification, age, and process requirements against the specific FPSC
            advertisement for your target post — this table reflects general patterns, not guaranteed current
            requirements.
          </p>
        </Section>

        <Section id="recruitment-process" title="FPSC Recruitment Process">
          <Prose>
            <p className="font-semibold text-slate-800">
              FPSC recruitment generally follows a consistent step-by-step structure, though specifics can vary
              slightly by post.
            </p>
          </Prose>
          <div
            className="my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2"
            role="img"
            aria-label="FPSC recruitment process timeline"
          >
            {["Advertisement", "Application", "Written Test", "Interview", "Medical", "Appointment"].map(
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
            This process can take several months from advertisement to appointment, particularly for CSS and
            other multi-stage recruitment cycles, so candidates should plan their preparation timeline with this
            in mind.
          </p>
        </Section>

        <Section id="exam-pattern" title="FPSC Exam Pattern">
          <Prose>
            <p className="font-semibold text-slate-800">
              FPSC exam patterns differ depending on the post category, but generally fall into a few
              recognizable formats.
            </p>
            <p>
              <strong className="text-slate-900">MCQs (Objective Papers):</strong> Most general recruitment,
              AD, Inspector, and similar posts use a single objective-type MCQ paper, typically covering general
              knowledge, current affairs, Pakistan Affairs, English, and post-relevant subject content, usually
              within a defined negative-marking structure specified in the advertisement.
            </p>
            <p>
              <strong className="text-slate-900">Descriptive/Subjective Papers:</strong> CSS and certain
              lecturer/specialist posts include subjective, essay-style papers requiring detailed written
              answers rather than multiple-choice selection, testing depth of understanding and writing ability
              alongside subject knowledge.
            </p>
            <p>
              <strong className="text-slate-900">Subject Papers:</strong> For technical, medical, engineering,
              IT, and lecturer posts, a dedicated subject-specific paper (objective or subjective, depending on
              the post) tests specialized knowledge relevant to the role.
            </p>
            <p>
              <strong className="text-slate-900">Interview:</strong> Most FPSC posts include a panel interview
              after the written stage, assessing communication ability, subject depth, and general suitability
              for the role; CSS additionally includes a psychological assessment before the interview stage.
            </p>
            <p>
              <strong className="text-slate-900">Merit Determination:</strong> Final merit is typically
              calculated using a weighted combination of written test and interview marks (and psychological
              assessment marks for CSS), with the exact weightage defined per exam type.
            </p>
          </Prose>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">General Exam Pattern Comparison</h3>
          <DataTable
            headers={["Exam Type", "Paper Format", "Interview", "Typical Stages"]}
            rows={patternRows}
          />
        </Section>

        <Section id="syllabus" title="FPSC Syllabus">
          <Prose>
            <p className="font-semibold text-slate-800">
              FPSC syllabus content varies by post, but several subjects appear consistently across most exam
              types.
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

        <Section id="preparation-strategy" title="FPSC Preparation Strategy">
          <Prose>
            <p className="font-semibold text-slate-800">
              A structured, time-bound preparation plan consistently outperforms unstructured studying. Here&apos;s
              a roadmap you can adapt to your own exam timeline for effective FPSC test preparation and online
              preparation practice.
            </p>
          </Prose>
          <div
            className="my-5 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="FPSC exam preparation roadmap and study plan"
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
                  "Rotate through your core subjects (general knowledge, Pakistan Affairs, English, and post-specific content) across the week rather than focusing on just one subject at a time.",
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
              <h3 className="text-base font-black text-slate-900 mb-2">Time Management</h3>
              <BulletList
                items={[
                  "Practice pacing yourself during MCQs sessions to match the actual exam's time constraints, not just accuracy.",
                  "For CSS and subjective-paper exams, practice writing full answers within a set time limit to build exam-day speed.",
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
                  "Once you've cleared or are approaching the written stage, begin preparing for the interview by reviewing your academic background, staying current on major national and international developments, and practicing clear, structured verbal answers to common interview question types.",
                  "For CSS candidates, factor in preparation time for the psychological assessment stage as part of your overall timeline.",
                ]}
              />
            </div>
          </div>
        </Section>

        <Section id="best-books" title="Best Books">
          <Prose>
            <p>
              Rather than recommending specific titles (which can go out of print or be revised), here are the
              categories of preparation material worth prioritizing:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "General knowledge and current affairs compilations updated within the last year, since older editions quickly become outdated.",
                "Pakistan Affairs and Islamic Studies guides aligned with the standard curriculum used in FPSC and CSS syllabi.",
                "English grammar and essay-writing guides specifically designed for competitive exam preparation, rather than general academic English textbooks.",
                "Subject-specific reference material matching your degree background for technical, medical, engineering, or IT posts.",
                "MCQs practice compilations organized by topic, ideally cross-referenced against past paper trends.",
              ]}
            />
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
            Always check the publication or edition date before relying on any preparation book, particularly
            for current affairs and general knowledge material.
          </p>
        </Section>

        <Section id="past-papers" title="FPSC Past Papers">
          <Prose>
            <p>
              <strong className="text-slate-900">Why past papers matter:</strong> FPSC past papers reveal the
              actual phrasing, structure, and difficulty level used in real exams — information that generic
              study guides cannot fully replicate. They also help candidates recognize which topics FPSC tends
              to emphasize repeatedly across different recruitment cycles.
            </p>
            <p>
              <strong className="text-slate-900">How to analyze past papers:</strong> Rather than solving a past
              paper once and moving on, go through it topic by topic — identify which subjects appeared most
              frequently, note the specific phrasing style used, and treat every incorrect answer as a signal
              pointing to a genuine knowledge gap rather than just a wrong guess.
            </p>
            <p>
              <strong className="text-slate-900">Repeated topics:</strong> Certain general knowledge, Pakistan
              Affairs, and current affairs topics tend to reappear across FPSC papers in different years, though
              exact repetition varies by post and exam cycle — past paper review is the most reliable way to
              identify these patterns for your specific target exam.
            </p>
            <p>
              <strong className="text-slate-900">How to practice effectively:</strong> Set aside dedicated
              past-paper practice sessions under timed conditions as your exam date approaches, rather than
              treating past papers as casual reading material. This builds both content familiarity and exam-day
              pacing simultaneously.
            </p>
            <p>
              Explore our organized{" "}
              <Link href="/past-papers" className="font-bold text-[#1565C0] hover:underline">
                past papers
              </Link>{" "}
              collection, or go directly to our dedicated{" "}
              <Link href="/fpsc-past-papers" className="font-bold text-[#1565C0] hover:underline">
                FPSC past papers
              </Link>{" "}
              section for solved papers organized by year and post category.
            </p>
          </Prose>
        </Section>

        <Section id="mcqs" title="FPSC MCQs">
          <Prose>
            <p>
              <strong className="text-slate-900">Daily practice:</strong> Consistent, even short, daily MCQs
              practice builds stronger long-term recall than occasional long study sessions, particularly for
              subjects like general knowledge and current affairs.
            </p>
            <p>
              <strong className="text-slate-900">Topic-wise practice:</strong> Work through MCQs organized by
              subject rather than randomly mixed sets, so you can identify and address specific weak areas
              systematically.
            </p>
            <p>
              <strong className="text-slate-900">Current affairs MCQs:</strong> Given how quickly this subject
              changes, prioritize recently updated current affairs MCQs over older sets, and revisit this
              subject more frequently than others in your rotation.
            </p>
            <p>
              <strong className="text-slate-900">Mock tests:</strong> Once you&apos;ve built a solid MCQs
              foundation, shift toward timed, exam-simulating mock tests that combine multiple subjects,
              mirroring the actual FPSC paper format for your target post.
            </p>
            <p>
              <strong className="text-slate-900">Online practice:</strong> Practicing MCQs online allows for
              faster iteration and immediate feedback on incorrect answers compared to static printed material,
              making it a useful supplement to book-based study, particularly in the final weeks before your
              exam.
            </p>
          </Prose>
          <Link
            href="/mcqs/fpsc"
            className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-[#1565C0] hover:underline"
          >
            Practice FPSC MCQs <FaArrowRight size={10} />
          </Link>
        </Section>

        <Section id="results" title="FPSC Results">
          <Prose>
            <p>
              <strong className="text-slate-900">How to check results:</strong> FPSC announces results through
              its official website, typically listing roll numbers or candidate names who have qualified a given
              stage (written test, interview, or final recommendation). Always check results directly through
              FPSC&apos;s official channels rather than relying solely on secondary sources.
            </p>
            <p>
              <strong className="text-slate-900">Merit list:</strong> After the interview stage, FPSC compiles a
              merit list based on combined written test and interview (and, for CSS, psychological assessment)
              scores, ranking candidates for final recommendation according to available vacancies and quota
              allocation.
            </p>
            <p>
              <strong className="text-slate-900">Recommendation letters:</strong> Candidates who make the final
              merit list receive a recommendation from FPSC to the relevant hiring department, which then
              proceeds with formal appointment processing, including any final medical or verification
              requirements.
            </p>
            <p>
              Track FPSC results and related updates through our{" "}
              <Link href="/results" className="font-bold text-[#1565C0] hover:underline">
                results page
              </Link>
              , alongside official FPSC announcements.
            </p>
          </Prose>
        </Section>

        <Section id="latest-jobs" title="Latest FPSC Jobs">
          <Prose>
            <p>
              <strong className="text-slate-900">Advertisements:</strong> FPSC publishes new job advertisements
              periodically throughout the year, covering CSS, general recruitment, and specialized posts across
              federal departments. Always review the full advertisement text for exact eligibility, deadlines,
              and application instructions.
            </p>
            <p>
              <strong className="text-slate-900">Closing dates:</strong> Application deadlines vary by
              advertisement and are strictly enforced — track closing dates carefully, since late applications
              are typically not accepted.
            </p>
            <p>
              <strong className="text-slate-900">Admission certificates:</strong> Once your application is
              processed, your admission certificate (roll number slip) confirming your test center and date is
              issued closer to the exam, usually downloadable through FPSC&apos;s official portal.
            </p>
            <p>
              <strong className="text-slate-900">Test dates:</strong> Written test dates are announced following
              the application closing period; candidates should monitor official FPSC communications for any
              schedule updates or changes.
            </p>
            <p>
              <strong className="text-slate-900">Results:</strong> Following each stage of testing, FPSC
              releases results through official channels, moving qualifying candidates forward in the
              recruitment process.
            </p>
            <p>
              We do not publish speculative, unconfirmed, or outdated job listings — check our{" "}
              <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
                jobs section
              </Link>{" "}
              for currently tracked openings, and always cross-verify against FPSC&apos;s official advertisement
              before applying or paying any fee.
            </p>
          </Prose>
        </Section>

        <Section id="common-mistakes" title="Common Mistakes FPSC Candidates Make">
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

        {/* FAQ */}
        <Section id="faq" title="Frequently Asked Questions About FPSC Exams">
          <div className="space-y-2">
            {fpscFaqs.map((faq, i) => {
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
                      {faq.q === "How is FPSC different from PPSC?" && (
                        <>
                          {" "}
                          Learn more on our{" "}
                          <Link href="/government-exams/ppsc" className="font-bold text-[#1565C0] hover:underline">
                            PPSC
                          </Link>{" "}
                          guide.
                        </>
                      )}
                      {faq.q === "How can PakLearners help with FPSC exam preparation?" && (
                        <>
                          {" "}
                          Explore our{" "}
                          <Link href="/fpsc-past-papers" className="font-bold text-[#1565C0] hover:underline">
                            FPSC past papers
                          </Link>{" "}
                          collection to get started.
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
            This guide is maintained as part of PakLearners&apos; ongoing effort to provide accurate, organized
            information about FPSC exams. Eligibility, fees, schedules, and syllabus details should always be
            verified against FPSC&apos;s official advertisements before applying, since these can be revised
            between recruitment cycles. If you notice outdated or incorrect information on this page, you can
            report it through our{" "}
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
