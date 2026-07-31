"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { ajkpscFaqs } from "@/data/ajkpscFaqs";

const jobCategories = [
  { title: "Education", body: "Teaching and lecturer posts requiring a relevant Master's degree, along with non-teaching administrative roles within the education department." },
  { title: "Health", body: "Medical officer and allied health posts requiring MBBS/equivalent or relevant health qualifications." },
  { title: "Engineering", body: "Technical posts requiring a relevant engineering degree." },
  { title: "Administration", body: "General administrative and secretariat roles, typically requiring a Bachelor's degree." },
  { title: "Police", body: "Administrative and support posts affiliated with police department functions." },
  { title: "Finance", body: "Posts requiring relevant commerce, accounting, or finance qualifications." },
  { title: "Revenue", body: "Posts requiring general knowledge and basic numerical ability." },
  { title: "Agriculture", body: "Agriculture officer posts requiring a relevant agricultural sciences degree." },
  { title: "Forest", body: "Forestry department posts requiring relevant environmental or forestry science qualifications." },
  { title: "Judiciary", body: "Administrative and support posts connected to AJK's judicial system, distinct from judicial officer appointments which typically follow a separate process." },
  { title: "Social Welfare", body: "Posts within social welfare departments, often requiring relevant social sciences qualifications." },
  { title: "Planning", body: "Posts within planning and development departments, often requiring economics, statistics, or planning-related qualifications." },
  { title: "Information Technology", body: "IT posts requiring relevant computer science or IT qualifications." },
];

const jobCategoryRows = [
  ["Education (Teaching)", "Master's (subject-relevant)", "Subject-specific written", "Yes"],
  ["Health (Medical Officer)", "MBBS/equivalent", "Subject-specific written", "Yes"],
  ["Engineering", "Relevant engineering degree", "Subject-specific technical", "Yes"],
  ["Administration", "Bachelor's", "Objective MCQ", "Yes"],
  ["Police (administrative)", "Bachelor's", "Objective MCQ", "Yes"],
  ["Finance", "Bachelor's (commerce/finance)", "Objective MCQ + subject content", "Yes"],
  ["Revenue", "Intermediate/Bachelor's", "Objective MCQ", "Often"],
  ["Agriculture", "Agriculture sciences degree", "Subject-specific written", "Yes"],
  ["Forest", "Relevant forestry/environmental degree", "Subject-specific written", "Yes"],
  ["Social Welfare", "Relevant social sciences degree", "Objective MCQ + subject content", "Yes"],
  ["Planning", "Relevant economics/statistics degree", "Objective MCQ + subject content", "Yes"],
  ["Information Technology", "Computer science/IT degree", "Technical written", "Yes"],
];

const syllabusItems = [
  {
    title: "English",
    text: "Covers grammar, vocabulary, and comprehension, and for posts with a subjective component, essay writing. Build grammar fundamentals through consistent MCQs practice, and for relevant posts, practice structured essay writing.",
  },
  {
    title: "Pakistan Affairs",
    text: "Covers Pakistan's history, constitutional development, and key national institutions. Focus on constitutional milestones and major historical events, since these are commonly tested in a direct, factual format.",
  },
  {
    title: "Current Affairs",
    text: "Covers recent national and international developments. Treat this as an ongoing daily habit rather than a one-time review, since outdated material actively hurts performance here.",
  },
  {
    title: "Islamic Studies",
    text: "Covers foundational Islamic teachings, history, and general religious knowledge, generally compulsory for Muslim candidates. Prioritize accuracy and careful review of source material.",
  },
  {
    title: "Everyday Science",
    text: "Covers general scientific concepts relevant to daily life. Focus on practical, applied science topics rather than deep theoretical content.",
  },
  {
    title: "Computer",
    text: "Covers basic computer literacy and general IT terminology, increasingly tested across various posts. Review fundamental computer concepts relevant to general office use.",
  },
  {
    title: "Mathematics",
    text: "Appears in certain posts, covering basic to intermediate-level mathematical concepts. Focus on core arithmetic and problem-solving.",
  },
  {
    title: "Analytical Reasoning",
    text: "Covers logical reasoning and problem-solving questions, common in many AJKPSC tests. Practice a range of reasoning question types regularly to build both accuracy and speed.",
  },
  {
    title: "General Knowledge",
    text: "Covers geography, international organizations, and general awareness topics. Build broad familiarity through consistent MCQs practice rather than last-minute cramming.",
  },
  {
    title: "Subject-Specific Papers",
    text: "For teaching, medical, engineering, agriculture, and forestry posts, subject-specific content follows the relevant academic or professional field. Align study material directly with your degree-level knowledge.",
  },
];

const mistakes = [
  "Applying without carefully reading the full eligibility criteria for the specific post.",
  "Assuming general preparation is enough without reviewing the specific post's syllabus.",
  "Ignoring current affairs until the final weeks before the exam.",
  "Relying on outdated current affairs or general knowledge material.",
  "Skipping past papers entirely and walking into the exam without a sense of realistic difficulty.",
  "Assuming every AJKPSC post uses a pure MCQ format, when some posts include a subject-specific written component.",
  "Not practicing under timed conditions before the actual exam.",
  "Submitting incomplete or mismatched documentation with the application.",
  "Missing the application deadline due to last-minute submission attempts.",
  "Not confirming age relaxation eligibility that may actually apply to their category.",
  "Failing to verify domicile/state subject documentation before applying.",
  "Neglecting interview preparation until after written results are announced.",
  "Studying passively (re-reading) instead of active recall through MCQs and practice questions.",
  "Failing to download and verify the roll number slip in time before the exam.",
  "Assuming last year's eligibility or exam pattern still applies without checking the current advertisement.",
  "Over-focusing on one subject while neglecting others with similar weightage.",
  "Ignoring mandatory professional registration or medical fitness requirements for relevant posts.",
  "Relying on unofficial or unverified sources for exam dates, fee details, or eligibility changes.",
];

const tips = [
  "Start by reading the full official advertisement for your target post before opening any study material.",
  "Build a written study schedule mapping subject coverage across your available preparation time.",
  "Treat current affairs as a daily habit, not a subject you review once.",
  "Confirm early whether your target post involves a pure MCQ paper or a subject-specific written component.",
  "Use topic-wise MCQs practice before moving to full-length mock tests.",
  "Solve past papers early to understand realistic difficulty and pacing, not just in the final week.",
  "Keep concise revision notes rather than re-reading entire textbooks repeatedly.",
  "Focus extra time on subjects where your past paper or mock test performance is weakest.",
  "Review your incorrect answers specifically — don't just track your overall score.",
  "Build general knowledge gradually through consistent daily exposure rather than cramming.",
  "For subject-specific posts, align your prep material closely with your actual academic background.",
  "Simulate real exam timing during mock tests.",
  "Stay updated on any changes to AJKPSC's syllabus or exam pattern for your specific post.",
  "Prepare your application documents — including character certificate and medical fitness proof where required — well ahead of the deadline.",
  "Practice verbal, structured answers for interview preparation, not just written content review.",
  "For posts with a written subject paper, practice full-length answers under timed conditions before your exam date.",
  "Confirm required professional registration is in order before applying for relevant posts.",
  "Avoid switching study material frequently — consistency with one well-organized resource beats scattered studying.",
  "Track your own progress with periodic self-assessment tests, not just passive review.",
  "Verify every detail — fee, schedule, eligibility, syllabus — against AJKPSC's official announcement before finalizing your preparation plan.",
];

const materialTable = [
  ["General knowledge & current affairs compilation", "Broad awareness building", "All post categories", "Published or revised within the last year"],
  ["Pakistan Affairs guide", "Constitutional and historical knowledge", "All post categories", "Aligned with standard competitive exam curriculum"],
  ["Islamic Studies & Everyday Science guide", "Compulsory-subject coverage", "Most general posts", "Matches AJKPSC's general syllabus pattern"],
  ["English grammar & essay-writing guide", "Language and writing skills", "All posts; especially those with a subjective component", "Includes practice exercises, not just theory"],
  ["Subject-specific reference material", "Degree-level subject mastery", "Teaching, medical, engineering, agriculture, forestry, IT posts", "Matches your specific academic field and level"],
  ["MCQs practice compilation", "Applied practice", "All post categories", "Organized by topic; ideally cross-referenced with past paper trends"],
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

export default function AjkpscPillar() {
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
            Azad Jammu and Kashmir Public Service Commission
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            AJKPSC – Complete Guide to Azad Jammu &amp; Kashmir Public Service Commission Jobs, Online Apply, Syllabus, Results &amp; Preparation
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            The Azad Jammu and Kashmir Public Service Commission (AJKPSC) is the body responsible for
            recruiting candidates into government positions across Azad Jammu and Kashmir. If you&apos;re
            exploring a government career in AJK — teaching, administration, health, engineering, or one of
            several other departments — AJKPSC is the commission you&apos;ll most likely go through to get
            there.
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <Link
              href="/mcqs/ajkpsc"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Start Practicing AJKPSC MCQs <FaArrowRight size={11} />
            </Link>
            <Link
              href="/past-papers/ajkpsc"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              View AJKPSC Past Papers
            </Link>
          </div>
          <p className="text-sky-200/80 text-xs md:text-sm leading-relaxed max-w-3xl">
            Content on this page is reviewed for accuracy and updated regularly — but always confirm
            eligibility, fees, and schedules against AJKPSC&apos;s official advertisements before applying.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        {/* Quick prep links */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            Start AJKPSC Preparation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { name: "Practice AJKPSC MCQs", path: "/mcqs/ajkpsc" },
              { name: "AJKPSC Past Papers", path: "/past-papers/ajkpsc" },
              { name: "Online Tests", path: "/online-tests/ajkpsc" },
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

        <Section id="what-is-ajkpsc" title="What is AJKPSC?">
          <Prose>
            <p className="font-semibold text-slate-800">
              AJKPSC (Azad Jammu and Kashmir Public Service Commission) is the constitutional body
              responsible for recruiting candidates into government positions across Azad Jammu and Kashmir
              through competitive, merit-based examinations.
            </p>
            <p>
              <strong className="text-slate-900">History:</strong> AJKPSC was established to provide a
              standardized, transparent recruitment mechanism for government posts in AJK, mirroring the
              role that public service commissions play at the federal and provincial levels elsewhere in
              Pakistan.
            </p>
            <p>
              <strong className="text-slate-900">Mission:</strong> AJKPSC&apos;s mission is to conduct fair,
              competitive recruitment processes for government posts in AJK, ensuring appointments reflect
              candidates&apos; demonstrated qualifications and ability rather than informal influence.
            </p>
            <p>
              <strong className="text-slate-900">Vision:</strong> To maintain a recruitment system in AJK
              that candidates and the public can trust as consistent, transparent, and genuinely
              merit-based.
            </p>
            <p>
              <strong className="text-slate-900">Objectives:</strong> AJKPSC aims to standardize recruitment
              across the many departments it serves, minimize discretionary appointment practices, and
              provide equal opportunity to eligible candidates across AJK.
            </p>
            <p>
              <strong className="text-slate-900">Responsibilities:</strong> Core responsibilities include
              advertising vacant posts, conducting written examinations and interviews, preparing merit
              lists, and recommending successful candidates to the relevant AJK government departments for
              final appointment.
            </p>
            <p>
              <strong className="text-slate-900">Departments:</strong> AJKPSC recruits across numerous
              departments — education, health, engineering, administration, finance, revenue, agriculture,
              forestry, judiciary-adjacent roles, social welfare, planning, and information technology among
              them.
            </p>
            <p>
              <strong className="text-slate-900">Recruitment system:</strong> AJKPSC&apos;s process
              generally follows advertisement, application, a written test (objective for most posts, with
              subject-specific papers for specialized roles), and an interview stage, before a final
              merit-based recommendation.
            </p>
            <p>
              <strong className="text-slate-900">Role in the AJK Government:</strong> AJKPSC functions as
              the AJK government&apos;s primary recruitment arm for civil service posts, similar in structural
              role to how{" "}
              <Link href="/government-exams/ppsc" className="font-bold text-[#1565C0] hover:underline">
                PPSC
              </Link>{" "}
              and{" "}
              <Link href="/government-exams/spsc" className="font-bold text-[#1565C0] hover:underline">
                SPSC
              </Link>{" "}
              function for Punjab and Sindh respectively, though operating under AJK&apos;s own administrative
              and legal framework rather than under the federal or provincial systems that apply elsewhere in
              Pakistan.
            </p>
            <p>
              For the wider picture of how AJKPSC compares with other recruiting bodies across the country,
              see our full{" "}
              <Link href="/government-exams" className="font-bold text-[#1565C0] hover:underline">
                government exams
              </Link>{" "}
              overview.
            </p>
          </Prose>
        </Section>

        <Section id="latest-jobs" title="Latest AJKPSC Jobs">
          <Prose>
            <p>
              AJKPSC advertises posts across a wide range of departments, and understanding which category
              your target post falls into shapes your preparation approach.
            </p>
          </Prose>
          <div
            className="mt-5 mb-6 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="AJKPSC job categories infographic"
          >
            {[
              { title: "Education", items: "Teaching · Lecturer · Non-teaching" },
              { title: "Technical", items: "Health · Engineering · IT" },
              { title: "Administration", items: "Admin · Finance · Revenue · Planning" },
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
            {jobCategories.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
                <h3 className="text-base font-black text-[#1565C0] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">Comparison Table — AJKPSC Job Categories at a Glance</h3>
          <DataTable
            headers={["Category", "Typical Minimum Qualification", "Test Format", "Interview"]}
            rows={jobCategoryRows}
          />
          <p className="text-xs text-slate-500 leading-relaxed mt-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
            Tip: We do not publish speculative or unconfirmed job listings. Always check AJKPSC&apos;s official
            advertisement directly before applying or paying any fee.
          </p>
        </Section>

        <Section id="eligibility" title="Eligibility Criteria">
          <Prose>
            <p className="font-semibold text-slate-800">
              Eligibility for AJKPSC posts varies by category, but several factors apply broadly across most
              recruitment.
            </p>
            <p>
              <strong className="text-slate-900">Education:</strong> Requirements range from
              Intermediate-level for certain revenue and support posts, to Bachelor&apos;s degree for most
              administrative posts, and Master&apos;s or professional qualifications (MBBS, engineering
              degree, agriculture degree) for specialist, medical, engineering, and teaching roles.
            </p>
            <p>
              <strong className="text-slate-900">Nationality:</strong> Candidates must generally be Pakistani
              citizens (with AJK-specific citizenship/residency status as applicable) to be eligible for
              AJKPSC recruitment.
            </p>
            <p>
              <strong className="text-slate-900">Domicile:</strong> Most AJKPSC posts require AJK domicile or
              state subject status, since the commission recruits specifically for AJK government positions,
              though exact requirements can vary by post.
            </p>
            <p>
              <strong className="text-slate-900">Age Limit:</strong> Age limits are set individually per
              post in each advertisement, generally falling within a range appropriate to entry-level or
              specialist recruitment.
            </p>
            <p>
              <strong className="text-slate-900">Age Relaxation:</strong> Relaxation provisions exist for
              certain categories under AJK government policy, though exact relaxation criteria vary and
              should be confirmed against the current advertisement rather than assumed from previous cycles.
            </p>
            <p>
              <strong className="text-slate-900">Gender:</strong> Most AJKPSC posts are open to both male
              and female candidates, though some posts may specify gender-based quota allocations as defined
              in the advertisement.
            </p>
            <p>
              <strong className="text-slate-900">Experience:</strong> Entry-level posts typically require no
              prior experience, while specialist and senior posts often require a specified number of years
              of relevant professional experience.
            </p>
            <p>
              <strong className="text-slate-900">Required Documents:</strong> Typically includes CNIC (or
              relevant AJK identity documentation), educational certificates and transcripts,
              domicile/state subject certificate, photographs, and any professional registration or
              experience certificates relevant to the post.
            </p>
            <p>
              <strong className="text-slate-900">Medical Fitness:</strong> Certain posts — particularly
              those involving physical or operational duties — require candidates to meet specified medical
              fitness standards, confirmed through a medical examination at the appropriate stage of
              recruitment.
            </p>
            <p>
              <strong className="text-slate-900">Character Certificate:</strong> Many posts require a
              character certificate, typically issued by a relevant local authority, as part of the standard
              document requirements for government recruitment.
            </p>
          </Prose>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">Eligibility Checklist</h3>
          <BulletList
            items={[
              "Confirmed exact qualification requirement for your target post",
              "Verified current age limit and any applicable relaxation",
              "Domicile/state subject certificate matches the post's requirement",
              "All required educational certificates and transcripts are ready",
              "Professional registration (if applicable) is valid and current",
              "Character certificate obtained from the relevant authority",
              "Medical fitness requirement confirmed for posts where it applies",
            ]}
          />
          <p className="text-xs text-slate-500 leading-relaxed mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <strong className="text-amber-800">Warning:</strong> Never assume last year&apos;s eligibility
            criteria still apply. Age limits, quota rules, and qualification requirements can be revised
            between recruitment cycles — always check the current AJKPSC advertisement.
          </p>
        </Section>

        <Section id="how-to-apply" title="How to Apply Online for AJKPSC">
          <Prose>
            <p className="font-semibold text-slate-800">
              Follow these steps to complete your AJKPSC application online:
            </p>
          </Prose>
          <ol className="space-y-4">
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                1
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Registration</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Candidates create an account on AJKPSC&apos;s official online application portal, where
                  required, before starting the application.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                2
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Advertisement Review</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Read the full advertisement for your target post carefully, confirming eligibility, deadline,
                  and required documents before proceeding.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                3
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Fee Submission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Submit the application fee through the specified payment method; the exact amount and process
                  are detailed in the advertisement and can change between cycles.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                4
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Application Form</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Complete the application form with accurate personal, educational, and post-specific
                  information matching the advertised post.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                5
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Uploading Documents</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Upload required supporting documents (CNIC, educational certificates, domicile/state subject
                  certificate, photograph) in the specified format and size.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                6
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Review</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Carefully review all entered information before final submission, since corrections after
                  submission are often limited or unavailable.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                7
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Final Submission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Submit your completed application within the advertised deadline window.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                8
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Print Application</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Print or save a copy of your submitted application and payment confirmation for your own
                  records.
                </p>
              </div>
            </li>
          </ol>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">Common Mistakes to Avoid</h3>
          <BulletList
            items={[
              "Submitting the application at the very last moment, risking technical issues near the deadline.",
              "Uploading documents in the wrong format or exceeding size limits, causing application rejection.",
              "Entering mismatched personal details between the application form and supporting documents.",
              "Forgetting to save proof of fee payment.",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            <strong className="text-slate-900">Tip:</strong> Complete your application at least a few days
            before the deadline. Portal traffic tends to spike in the final 24–48 hours, increasing the risk
            of technical delays.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mt-2">
            For a broader look at how this process compares elsewhere, our{" "}
            <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">
              FPSC
            </Link>{" "}
            guide walks through the federal-level equivalent of this same application structure.
          </p>
        </Section>

        <Section id="selection-process" title="AJKPSC Selection Process">
          <Prose>
            <p className="font-semibold text-slate-800">
              AJKPSC&apos;s selection process generally follows these stages:
            </p>
          </Prose>
          <div
            className="my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
            role="img"
            aria-label="AJKPSC selection process timeline"
          >
            {["Application Review", "Screening Test", "Written Exam", "Subject Papers", "Interview", "Merit List", "Appointment Letter"].map(
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
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                1
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Application Review</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  AJKPSC reviews submitted applications against the post&apos;s eligibility criteria before
                  confirming candidates for the test stage.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                2
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Screening Test (where applicable)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For posts with a high volume of applicants, a screening test may be used to shortlist
                  candidates for the main written examination.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                3
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Written Examination</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Candidates sit the written test relevant to their post — objective MCQ-based for most posts.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                4
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Subject Papers (where applicable)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For teaching, medical, engineering, and other specialist posts, a subject-specific written
                  paper tests specialized knowledge relevant to the role.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                5
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Interview</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Shortlisted candidates attend a panel interview assessing subject knowledge, communication
                  ability, and general suitability for the role.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                6
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Merit List</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  AJKPSC compiles a final merit list using a weighted combination of written test and interview
                  scores, ranking candidates according to available vacancies and quota allocation.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                7
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Appointment Letter</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The hiring AJK government department issues a formal appointment letter to the recommended
                  candidate, completing the recruitment cycle.
                </p>
              </div>
            </li>
          </ol>
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            <strong className="text-slate-900">Selection Process Flow:</strong> Application Review → Screening
            Test (where applicable) → Written Examination → Subject Papers (where applicable) → Interview →
            Merit List → Appointment Letter
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-4 bg-slate-50 border border-slate-100 rounded-xl p-3">
            <strong className="text-slate-900">Expert Note:</strong> Not every post includes a screening test
            or a separate subject paper — these apply selectively depending on the post. Always check your
            specific advertisement to understand which stages apply to you.
          </p>
        </Section>

        <Section id="syllabus" title="AJKPSC Syllabus">
          <Prose>
            <p className="font-semibold text-slate-800">
              AJKPSC syllabus content varies by post category, but several subjects appear consistently across
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

        <Section id="preparation-strategy" title="AJKPSC Test Preparation Strategy">
          <Prose>
            <p className="font-semibold text-slate-800">
              A structured, time-bound preparation plan consistently outperforms unstructured studying.
            </p>
          </Prose>
          <div
            className="my-5 grid sm:grid-cols-3 gap-3"
            role="img"
            aria-label="AJKPSC exam preparation roadmap"
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
                  "Include a brief current affairs review daily.",
                  "End each day with a short MCQs practice set covering that day's topic.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Books</h3>
              <p>
                Use updated, exam-relevant preparation material matched to your specific post&apos;s syllabus
                rather than generic competitive exam guides (see the next section for guidance on choosing
                preparation material).
              </p>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">MCQs</h3>
              <BulletList
                items={[
                  "Practice topic-wise MCQs before moving to full-length, mixed-subject mock tests, tracking which subjects consistently show lower accuracy.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Past Papers</h3>
              <BulletList
                items={[
                  "Solve past papers under timed conditions as your exam date approaches, treating incorrect answers as a signal pointing to a genuine knowledge gap rather than just a wrong guess.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Revision Strategy</h3>
              <BulletList
                items={[
                  "Maintain concise revision notes for each subject as you study, and revisit incorrect MCQs specifically rather than re-reading full source material repeatedly.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Time Management</h3>
              <BulletList
                items={[
                  "Practice pacing yourself during MCQs sessions to match actual exam time constraints, and for posts with a subjective component, practice writing full answers within a set time limit.",
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
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-4 bg-slate-50 border border-slate-100 rounded-xl p-3">
            <strong className="text-slate-900">Tip:</strong> Build your study schedule around your weakest
            subjects first, not your strongest ones. Marks lost in weak areas are usually easier to recover
            than marks gained by over-preparing a subject you&apos;re already comfortable with.
          </p>
        </Section>

        <Section id="preparation-material" title="Best Preparation Material for AJKPSC">
          <Prose>
            <p className="font-semibold text-slate-800">
              Rather than naming specific book titles and authors — which go out of print, get revised, or
              become outdated in ways we can&apos;t verify at the time of writing — here&apos;s how to choose
              preparation material by category and purpose:
            </p>
          </Prose>
          <DataTable
            headers={["Material Type", "Purpose", "Best For", "Things to Check Before Buying"]}
            rows={materialTable}
          />
          <p className="text-xs text-slate-500 leading-relaxed mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <strong className="text-amber-800">Warning:</strong> We deliberately avoid recommending specific
            book titles or authors here, since doing so risks pointing you toward outdated editions we can&apos;t
            verify. Choose recent, well-reviewed material matching the categories above.
          </p>
        </Section>

        <Section id="past-papers" title="AJKPSC Past Papers">
          <Prose>
            <p>
              <strong className="text-slate-900">Importance:</strong> AJKPSC past papers reveal the actual
              phrasing, structure, and difficulty level used in real exams — information generic study
              guides can&apos;t fully replicate. They help you recognize which topics AJKPSC tends to
              emphasize repeatedly across recruitment cycles.
            </p>
            <p>
              <strong className="text-slate-900">Exam Pattern:</strong> Reviewing past papers alongside the
              official syllabus for your target post gives you a realistic sense of question distribution
              across subjects, which is often more informative than the syllabus document alone.
            </p>
            <p>
              <strong className="text-slate-900">Frequently Asked Topics:</strong> Certain general knowledge,
              Pakistan Affairs, and current affairs topics tend to reappear across different years&apos; papers,
              though exact repetition varies by post — past paper review is the most reliable way to identify
              these patterns for your specific target exam.
            </p>
            <p>
              <strong className="text-slate-900">Preparation Strategy:</strong> Solve past papers under timed
              conditions as your exam date approaches rather than treating them as casual reading, and go
              through each paper topic by topic to identify where your preparation still has gaps.
            </p>
          </Prose>
        </Section>

        <Section id="roll-number-slip" title="AJKPSC Roll Number Slip">
          <Prose>
            <p>
              <strong className="text-slate-900">How to Download:</strong> Once your application is processed
              and confirmed eligible, your roll number slip is typically issued and made available for
              download through AJKPSC&apos;s official online portal closer to the exam date.
            </p>
            <p>
              <strong className="text-slate-900">Common Issues:</strong> Candidates sometimes face
              difficulty locating their slip due to portal traffic near the exam date, mismatched application
              details, or incomplete document submission earlier in the process.
            </p>
            <p>
              <strong className="text-slate-900">Solutions:</strong> Contact AJKPSC&apos;s official helpdesk or
              relevant office directly if your slip isn&apos;t available closer to the exam date, rather than
              waiting until the last moment. Keep your application reference number and submission
              confirmation on hand when reaching out.
            </p>
          </Prose>
          <p className="text-sm text-slate-600 leading-relaxed mt-4 bg-slate-50 border border-slate-100 rounded-xl p-3">
            <strong className="text-slate-900">Tip:</strong> Download and print your roll number slip a few
            days before your exam, not the night before — this gives you time to resolve any discrepancy
            directly with AJKPSC.
          </p>
        </Section>

        <Section id="answer-keys" title="AJKPSC Answer Keys">
          <Prose>
            <p>
              <strong className="text-slate-900">Checking Method:</strong> Following an objective MCQ-based
              test, AJKPSC may release a provisional answer key through its official channels, allowing
              candidates to estimate their performance ahead of the official result.
            </p>
            <p>
              <strong className="text-slate-900">Objection Procedure:</strong> If a candidate believes a
              specific answer key entry is incorrect, AJKPSC&apos;s official process (where available) typically
              allows objections to be raised within a specified window — always follow the exact procedure
              and timeline stated in the official notice rather than assuming a general process applies.
            </p>
          </Prose>
        </Section>

        <Section id="results" title="AJKPSC Result">
          <Prose>
            <p>
              <strong className="text-slate-900">How to Check:</strong> AJKPSC announces results through its
              official website, typically listing candidates who have qualified a particular stage —
              written test, interview, or final merit list.
            </p>
            <p>
              <strong className="text-slate-900">Merit List:</strong> After the interview stage, AJKPSC
              compiles a final merit list using combined written test and interview scores, ranking
              candidates according to available vacancies and quota allocation.
            </p>
            <p>
              <strong className="text-slate-900">Interview Call:</strong> Candidates who qualify the written
              stage are typically notified of their interview date through an official call letter or notice,
              issued through AJKPSC&apos;s official channels.
            </p>
            <p>
              <strong className="text-slate-900">Next Steps:</strong> Candidates who make the final merit
              list are recommended to the relevant hiring department, which proceeds with formal appointment
              processing, including any final verification requirements.
            </p>
          </Prose>
          <p className="text-xs text-slate-500 leading-relaxed mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <strong className="text-amber-800">Warning:</strong> Always verify your result directly through
            AJKPSC&apos;s official channels. Third-party sources can be delayed, incomplete, or simply
            incorrect.
          </p>
        </Section>

        <Section id="interview-preparation" title="AJKPSC Interview Preparation">
          <Prose>
            <p>
              <strong className="text-slate-900">Dress Code:</strong> Dress formally and conservatively, in line
              with standard professional expectations for a government interview panel.
            </p>
            <p>
              <strong className="text-slate-900">Confidence Tips:</strong> Speak clearly and at a measured
              pace — confidence comes across less through what you say and more through how composed you
              remain when answering, including on questions you&apos;re less sure about.
            </p>
            <p>
              <strong className="text-slate-900">Frequently Asked Questions:</strong> Expect questions about
              your academic background, your motivation for applying to this specific post, your
              understanding of the department you&apos;re applying to, and general current affairs relevant to
              AJK and Pakistan.
            </p>
            <p>
              <strong className="text-slate-900">Documents Required:</strong> Bring original and photocopied
              versions of all your educational certificates, domicile/state subject certificate, CNIC,
              character certificate, and your roll number slip/interview call letter, organized in a single
              folder.
            </p>
            <p>
              <strong className="text-slate-900">Communication Skills:</strong> Practice structured, concise
              answers rather than long, unfocused responses — panels generally respond better to clear,
              direct communication than to lengthy explanations.
            </p>
          </Prose>
          <h3 className="text-base font-black text-slate-900 mt-6 mb-3">Interview Preparation Checklist</h3>
          <BulletList
            items={[
              "Formal attire prepared in advance",
              "All original and photocopied documents organized",
              "Reviewed your own academic and professional background thoroughly",
              "Practiced answers to common interview question types out loud",
              "Reviewed recent current affairs relevant to AJK and Pakistan",
              "Confirmed interview date, time, and venue in advance",
            ]}
          />
        </Section>

        <Section id="common-mistakes" title="Common Mistakes Candidates Make">
          <BulletList items={mistakes} />
        </Section>

        <Section id="expert-tips" title="20 Expert Tips to Crack AJKPSC">
          <BulletList items={tips} />
        </Section>

        <Section id="why-paklearners" title="Why Prepare with PakLearners?">
          <Prose>
            <p>
              PakLearners is built around Pakistan&apos;s (and AJK&apos;s) government exam landscape, rather than
              mixing this content with unrelated general education material.
            </p>
          </Prose>
          <BulletList
            items={[
              "Updated Notes — content reviewed and refreshed on an ongoing basis, particularly for current affairs and general knowledge sections.",
              "MCQs — topic-wise practice questions covering general knowledge, current affairs, and post-specific subjects.",
              "Past Papers — organized by post category, supporting focused, pattern-based revision.",
              "Study Plans — daily, weekly, and monthly structures you can adapt to your own preparation timeline.",
              "Practice Tests — timed, exam-simulating tests to build real exam-day readiness.",
              "Latest Job Updates — organized tracking of currently advertised posts, cross-checked against official sources.",
              "Preparation Guides — structured roadmaps that account for the real differences between MCQ-based and subject-paper-based posts.",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            We don&apos;t claim to be the largest or a &quot;No. 1&quot; platform, and we avoid making
            unverifiable claims about user numbers or guaranteed outcomes. What we focus on is making sure the
            AJKPSC content we provide is accurate, organized, and genuinely useful for candidates preparing
            for a specific post.
          </p>
        </Section>

        <Section id="conclusion" title="Conclusion">
          <Prose>
            <p>
              AJKPSC recruitment spans a genuinely wide range of government careers across Azad Jammu and
              Kashmir — from teaching and administration to health, engineering, and technical posts.
              Success comes down to understanding exactly which post you&apos;re targeting, preparing according
              to its specific syllabus and format, and treating past papers and timed practice as core parts of
              your preparation rather than an afterthought.
            </p>
            <p>
              If you&apos;re preparing for AJKPSC, don&apos;t stop here. Explore our full{" "}
              <Link href="/government-exams" className="font-bold text-[#1565C0] hover:underline">
                government exams
              </Link>{" "}
              section for guides covering{" "}
              <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">
                FPSC
              </Link>
              ,{" "}
              <Link href="/government-exams/ppsc" className="font-bold text-[#1565C0] hover:underline">
                PPSC
              </Link>
              , and{" "}
              <Link href="/government-exams/spsc" className="font-bold text-[#1565C0] hover:underline">
                SPSC
              </Link>{" "}
              as well — understanding how these commissions compare can sharpen your own preparation
              strategy, especially if you&apos;re considering opportunities beyond AJK too.
            </p>
          </Prose>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/mcqs/ajkpsc"
              className="inline-flex items-center gap-2 bg-[#1565C0] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-700"
            >
              Start Practicing AJKPSC MCQs <FaArrowRight size={11} />
            </Link>
            <Link
              href="/government-exams"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] border border-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Explore More Government Exam Guides <FaArrowRight size={11} />
            </Link>
          </div>
        </Section>

        <Section id="faq" title="Frequently Asked Questions">
          <div className="space-y-3">
            {ajkpscFaqs.map((faq, index) => (
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
            organized information about AJKPSC exams. Eligibility, syllabus, fees, exam dates, advertisements,
            and recruitment rules should always be verified through official AJKPSC announcements before
            applying, since these can be revised between recruitment cycles. If you notice outdated or
            incorrect information on this page, you can report it through our Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
