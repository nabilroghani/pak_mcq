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
import { kppscJobsFaqs } from "@/data/kppscJobsFaqs";

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

function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 mt-4">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-900">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-3 font-black text-[10px] md:text-xs uppercase tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-600">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="align-top">
              {row.map((cell, i) => (
                <td
                  key={`${rowIndex}-${i}`}
                  className={`px-3 py-3 leading-relaxed text-xs md:text-sm ${i === 0 ? "font-bold text-slate-900" : ""}`}
                >
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

const advertisementItems = [
  "Advertisement number — used to identify and reference the specific recruitment notice.",
  "Post name — the exact title of the position being advertised.",
  "Department — the provincial department the post belongs to.",
  "Number of vacancies — how many openings exist for that post in the current cycle.",
  "Qualification — the minimum educational requirement for the post.",
  "Age limit — the minimum and maximum age allowed, including any relaxation.",
  "Quota — reserved seats such as district, women, minority, or disability quotas, where applicable.",
  "Domicile requirements — which district(s) or province candidates must hold domicile in to be eligible.",
  "Application deadline — the closing date and time for submissions.",
  "Application procedure — how to apply, including required documents and fee details.",
];

const departments = [
  "Agriculture Department",
  "Education Department",
  "Health Department",
  "Higher Education Department",
  "Planning & Development Department",
  "Irrigation Department",
  "Revenue & Estate Department",
  "Industries Department",
  "Local Government Department",
  "Other provincial departments",
];

const postCategories = [
  "Assistant Director",
  "Agriculture Officer",
  "Lecturer",
  "Subject Specialist",
  "Research Officer",
  "Engineer",
  "Medical Officer",
  "Planning Officer",
  "Other professional and administrative posts",
];

const applySteps = [
  { title: "Step 1: Find the Relevant KPPSC Advertisement", text: "Identify the specific advertisement for the post you're interested in, including its advertisement number and posting date." },
  { title: "Step 2: Check Your Eligibility", text: "Confirm that you meet the qualification, age, domicile and any quota requirements listed in that advertisement before proceeding." },
  { title: "Step 3: Create or Log Into Your KPPSC Online Account", text: "Most KPPSC applications require an online account on the official KPPSC portal to begin the application process." },
  { title: "Step 4: Complete the Online Application", text: "Fill in your personal, educational and post-specific details accurately as required by the application form." },
  { title: "Step 5: Pay the Required Application Fee", text: "Pay the applicable fee using the payment method specified in the current advertisement — fee amounts and accepted methods can change between advertisements." },
  { title: "Step 6: Review Your Application Carefully", text: "Double-check every field before submission, since incorrect information can lead to rejection." },
  { title: "Step 7: Submit the Application Before the Deadline", text: "Submit well ahead of the closing date and time to avoid last-minute technical issues." },
  { title: "Step 8: Save and Record Your Application Information", text: "Keep your application number, submission confirmation, and any related documents for future reference." },
];

const feeChecklist = [
  "Fee amount — the exact figure specified for your post and category.",
  "Payment method — whether payment is accepted via bank challan, online banking, or another designated channel.",
  "Service charges — any additional charges that may apply depending on the payment method used.",
  "Refund policy — whether and under what circumstances a fee refund is possible.",
];

const deadlineItems = [
  "Application opening date — when the application window begins.",
  "Closing date — the final date by which applications must be submitted.",
  "Closing time — some portals close at a specific time on the deadline date, not just the date itself.",
  "Advertisement date — useful for cross-referencing which recruitment cycle a post belongs to.",
  "Any extension or addendum — KPPSC occasionally issues deadline extensions or corrections, which should be checked separately.",
];

const preparationItems = [
  "Checking the applicable syllabus for your specific post.",
  "Studying the relevant subjects systematically.",
  "Practicing MCQs to build speed and accuracy.",
  "Solving past papers to understand real question patterns.",
  "Taking mock or timed tests to simulate exam conditions.",
  "Revising regularly rather than leaving preparation until the last moment.",
  "Tailoring your preparation specifically to the post you've applied for, rather than generic study material.",
];

const commonMistakes = [
  "Applying without checking eligibility — wastes both the application fee and your time if you're later found ineligible.",
  "Missing the deadline — even a few minutes past the closing time can disqualify an otherwise strong application.",
  "Ignoring the advertisement — relying on a job title alone without reading the full advertisement often leads to missed requirements.",
  "Entering incorrect information — errors in personal or educational details can cause rejection during scrutiny.",
  "Selecting the wrong post — especially when multiple similar posts are advertised together; double-check the exact post code or title.",
  "Ignoring quota requirements — failing to correctly claim or verify quota eligibility where applicable.",
  "Using outdated information — old advertisements, social media posts, or third-party listings can misrepresent current requirements.",
  "Not keeping application records — losing your application number or submission proof can complicate follow-up if issues arise.",
  "Starting preparation too late — waiting until after the written test date is announced often leaves too little time for thorough preparation.",
  "Assuming every KPPSC post has the same requirements — qualification, age, domicile and test pattern can all differ meaningfully between posts.",
];

const qualificationChecklist = [
  "Degree — does your qualification meet the minimum requirement stated in the advertisement?",
  "Subject/Specialization — for subject-specific posts, does your academic specialization align with what's required?",
  "Experience — do you meet any minimum experience requirement, where applicable?",
  "Age — do you fall within the minimum and maximum age limits, including any relaxation you may qualify for?",
  "Domicile — do you hold domicile in the required district or region for that specific post?",
  "Quota — are you eligible under any relevant quota category, and have you confirmed how to claim it?",
  "Department — does the department and nature of work match your career interests and background?",
  "BPS (Basic Pay Scale) — does the scale match your qualification level and career stage?",
  "Test/Syllabus — are you prepared, or able to prepare in time, for the specific test pattern associated with this post?",
  "Deadline — do you have enough time remaining to complete a strong, accurate application before the closing date?",
];

const prepResources = [
  { name: "KPPSC syllabus", path: "/government-exams/kppsc/syllabus", note: "Understand exactly which subjects and topics are relevant to your post before you start studying." },
  { name: "KPPSC MCQs", path: "/government-exams/kppsc/mcqs", note: "Practice subject-wise multiple-choice questions to build accuracy and speed." },
  { name: "KPPSC past papers", path: "/government-exams/kppsc/past-papers", note: "Review previous exam papers to understand real question patterns and difficulty level." },
  { name: "KPPSC exam preparation", path: "/government-exams/kppsc", note: "A broader overview of KPPSC exams, posts and preparation guidance." },
];

const relatedLinks = [
  { name: "Browse all job updates", path: "/jobs" },
  { name: "Exam results", path: "/results" },
  { name: "KPPSC eligibility guide", path: "/government-exams/kppsc/eligibility" },
  { name: "KPPSC syllabus", path: "/government-exams/kppsc/syllabus" },
  { name: "KPPSC MCQs", path: "/government-exams/kppsc/mcqs" },
  { name: "KPPSC exam guide", path: "/government-exams/kppsc" },
];

export default function KppscJobsPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC", path: "/government-exams/kppsc" },
    { name: "Jobs" },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href="/government-exams/kppsc"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> KPPSC Exam Guide
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            KPPSC Jobs 2026 – Latest Vacancies, Advertisement &amp; Apply Online
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-4">
            This page is a resource hub for <strong className="text-white">KPPSC jobs</strong> — helping
            candidates track latest vacancies, understand advertisement details, check eligibility and
            prepare a complete application. Always verify current requirements against the official
            KPPSC advertisement before submitting your application.
          </p>
          <p className="text-sky-200/80 text-xs md:text-sm leading-relaxed max-w-3xl mb-6">
            This page provides educational guidance and is not a substitute for the official KPPSC
            website or advertisement notice.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
          >
            Browse Latest Job Updates <FaArrowRight size={11} />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <Section id="latest-jobs-2026" title="Latest KPPSC Jobs 2026">
          <Prose>
            <p>
              KPPSC announces recruitment for a wide range of provincial government departments and
              posts through official advertisements published periodically throughout the year. Each
              advertisement specifies its own set of posts, vacancy numbers, qualifications, age limits
              and deadlines — there is no single, fixed list of &quot;KPPSC jobs&quot; that stays constant
              year to year.
            </p>
            <p>
              The table below reflects the structure used to display current KPPSC vacancies. Live
              postings are added and updated here as new advertisements are released; if no active listing
              appears for a given post at the moment, it means that vacancy is not currently open.
            </p>
          </Prose>
          <DataTable
            headers={["Post", "BPS", "Department", "Qualification", "Age Limit", "Vacancies", "Last Date", "Details"]}
            rows={[
              [
                "Updated as new KPPSC advertisements are released",
                "—",
                "—",
                "—",
                "—",
                "—",
                "—",
                "—",
              ],
            ]}
          />
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            For the most current and complete listing, always cross-check against the official KPPSC
            advertisement, since job availability changes frequently. You can also browse our{" "}
            <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
              latest job updates
            </Link>{" "}
            section for tracked openings.
          </p>
        </Section>

        <Section id="jobs-advertisement" title="KPPSC Jobs Advertisement 2026">
          <Prose>
            <p>
              Every KPPSC job is tied to a specific advertisement, and reading it carefully before
              applying is essential. A typical KPPSC advertisement includes:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList items={advertisementItems} />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Where current advertisements are listed on this page, each posted job will be linked to its
            corresponding advertisement so you can review the complete official details before applying.
            Never rely on a job title alone — always read the full advertisement, since eligibility
            details can vary even between similarly named posts.
          </p>
        </Section>

        <Section id="jobs-by-department" title="KPPSC Jobs by Department">
          <Prose>
            <p>
              Browsing by department can help candidates track openings relevant to their field.
              Departments that commonly recruit through KPPSC include:
            </p>
          </Prose>
          <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
            {departments.map((dept) => (
              <div
                key={dept}
                className="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                {dept}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            This structure is designed to scale as more departments post active vacancies — not every
            department listed here will have an open position at all times. Check back regularly or
            monitor this page for updates when a new advertisement is released for your relevant
            department.
          </p>
        </Section>

        <Section id="jobs-by-post" title="KPPSC Jobs by Post">
          <Prose>
            <p>
              Many candidates search by specific job title rather than department. Common post categories
              seen in KPPSC recruitment include:
            </p>
          </Prose>
          <div className="mt-4 flex flex-wrap gap-2">
            {postCategories.map((post) => (
              <span
                key={post}
                className="text-xs font-bold px-3 py-2 rounded-lg bg-blue-50 border border-blue-100 text-[#1565C0]"
              >
                {post}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            As with department listings, the posts shown here represent common categories rather than a
            guarantee of currently open vacancies. Available posts depend entirely on the KPPSC
            advertisements active at any given time.
          </p>
        </Section>

        <Section id="eligibility-criteria" title="KPPSC Jobs Eligibility Criteria">
          <Prose>
            <p>
              Eligibility requirements are set individually for each post and advertisement, so there is
              no single rule that applies across all KPPSC jobs. The main factors candidates need to
              check include:
            </p>
          </Prose>
          <div className="mt-5 space-y-4">
            {[
              { title: "Qualification", text: "Degree and education requirements vary significantly by post — an administrative role may require a bachelor's degree, while a specialist or technical post may require a relevant master's degree, professional certification, or specific subject specialization." },
              { title: "Age Limit", text: "Minimum and maximum age requirements differ by post and are set out in each advertisement, along with any applicable age relaxation rules." },
              { title: "Domicile", text: "Some posts require domicile from a specific district or region within Khyber Pakhtunkhwa, while others may be open more broadly. Always check the domicile requirement stated in your target advertisement." },
              { title: "Gender", text: "Certain posts may specify gender-based eligibility or reserved seats, depending on the department and nature of the role." },
              { title: "Quota", text: "Reserved quotas — such as district, women, minority or disability quotas — may apply to specific posts and are detailed in the advertisement." },
              { title: "Experience", text: "Professional and senior-level positions may require a minimum number of years of relevant work experience, in addition to the base qualification." },
            ].map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
                <h3 className="text-base font-black text-[#1565C0] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Because these factors vary so widely, always treat the eligibility criteria in a specific
            advertisement as the final word — see our{" "}
            <Link href="/government-exams/kppsc/eligibility" className="font-bold text-[#1565C0] hover:underline">
              KPPSC eligibility guide
            </Link>{" "}
            for general guidance on what to look for.
          </p>
        </Section>

        <Section id="age-limit" title="KPPSC Jobs Age Limit">
          <Prose>
            <p>
              Age limits for KPPSC jobs are set individually per advertisement rather than through one
              fixed provincial rule. In general, candidates should expect to review:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList
              items={[
                "Minimum age — the youngest age at which a candidate becomes eligible for the post.",
                "Maximum age — the oldest age a candidate can be while remaining eligible, before relaxation.",
                "Age relaxation — additional years that may be added to the maximum age limit for certain categories of candidates (such as government employees or specific quotas), where applicable under the rules in force.",
                "Where to confirm exact limits — always verify the specific minimum and maximum age for your target post directly from that advertisement, since these figures are not standardized across all KPPSC recruitment.",
              ]}
            />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Any age figures mentioned elsewhere — including on social media or third-party job portals
            — should be treated as examples only, not as a universal KPPSC age policy, unless they are
            drawn directly from your specific advertisement.
          </p>
        </Section>

        <Section id="apply-online" title="How to Apply for KPPSC Jobs Online">
          <Prose>
            <p>
              KPPSC recruitment is generally conducted through an online application process.
              Here&apos;s a general step-by-step guide:
            </p>
          </Prose>
          <div className="mt-5 space-y-4">
            {applySteps.map((step) => (
              <article key={step.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
                <h3 className="text-base font-black text-[#1565C0] mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed bg-amber-50 border border-amber-100 rounded-xl p-4">
            Official KPPSC instructions require online applications for current advertisements and specify
            fee and submission details individually — always confirm the exact process for your target
            advertisement rather than assuming it matches a previous one.
          </p>
        </Section>

        <Section id="application-fee" title="KPPSC Jobs Application Fee">
          <Prose>
            <p>
              Application fees for KPPSC jobs are not fixed and can vary depending on the current
              advertisement and applicable instructions. Before applying, verify:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList items={feeChecklist} />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Do not rely on a fee amount seen for a previous advertisement or a different post — always
            confirm current fee details directly from the advertisement you&apos;re applying under.
          </p>
        </Section>

        <Section id="last-date" title="KPPSC Jobs Last Date">
          <Prose>
            <p>
              Missing a deadline is one of the most common — and most avoidable — reasons candidates lose
              out on an opportunity. Pay close attention to:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList items={deadlineItems} />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed bg-red-50 border border-red-100 rounded-xl p-4">
            <strong className="text-slate-900">Important:</strong> Candidates should not rely on old
            social media posts, screenshots, or third-party job listings for the final deadline, since
            these can be outdated or inaccurate. Always verify the current, official advertisement
            directly before assuming a deadline is still valid.
          </p>
        </Section>

        <Section id="preparation" title="KPPSC Jobs Preparation">
          <Prose>
            <p>
              Applying is only the first step — once your application is submitted, your focus should
              shift to preparing for the relevant test. This generally involves:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList items={preparationItems} />
          </div>
        </Section>

        <Section id="preparation-resources" title="KPPSC Jobs Preparation Resources">
          <Prose>
            <p>
              Once you&apos;ve identified a relevant KPPSC job and confirmed your eligibility, these
              PakLearners resources can help you prepare for the actual test:
            </p>
          </Prose>
          <div className="mt-5 space-y-3">
            {prepResources.map((resource) => (
              <Link
                key={resource.path}
                href={resource.path}
                className="group block rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5 hover:border-blue-200 hover:bg-blue-50/60 transition-all"
              >
                <span className="text-base font-black text-[#1565C0] group-hover:underline">
                  {resource.name}
                </span>
                <p className="text-sm text-slate-600 leading-relaxed mt-1">{resource.note}</p>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Using the syllabus, MCQs and past papers together, rather than relying on just one, gives a
            far more complete and realistic preparation path for your specific post.
          </p>
        </Section>

        <Section id="common-mistakes" title="Common Mistakes When Applying for KPPSC Jobs">
          <ol className="space-y-2.5 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
            {commonMistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
        </Section>

        <Section id="find-right-job" title="How to Find the Right KPPSC Job for Your Qualification">
          <Prose>
            <p>
              Matching your background to the right KPPSC job takes more than just checking the post
              title. Compare your profile against each advertisement using these factors:
            </p>
          </Prose>
          <ol className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
            {qualificationChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Going through this checklist for each advertisement helps you apply strategically rather than
            broadly, increasing the chances that your applications are both eligible and well-matched to
            your background.
          </p>
        </Section>

        <Section id="faq" title="Frequently Asked Questions About KPPSC Jobs">
          <div className="space-y-2">
            {kppscJobsFaqs.map((faq, i) => {
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
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Final Thoughts</h2>
          <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed mb-5">
            Finding the right KPPSC job starts with reading the official advertisement carefully and
            honestly matching it against your qualification, age, domicile and career goals. Once
            you&apos;ve identified a suitable post, verify every eligibility detail directly from the
            advertisement, apply well before the deadline, and shift your focus to preparation — starting
            with the{" "}
            <Link href="/government-exams/kppsc/syllabus" className="font-bold text-[#1565C0] hover:underline">
              KPPSC syllabus
            </Link>
            , reinforced with{" "}
            <Link href="/government-exams/kppsc/mcqs" className="font-bold text-[#1565C0] hover:underline">
              KPPSC MCQs
            </Link>{" "}
            and{" "}
            <Link href="/government-exams/kppsc/past-papers" className="font-bold text-[#1565C0] hover:underline">
              KPPSC past papers
            </Link>
            . For broader guidance on KPPSC exams and preparation, visit the main{" "}
            <Link href="/government-exams/kppsc" className="font-bold text-[#1565C0] hover:underline">
              KPPSC exam preparation
            </Link>{" "}
            page, or explore PakLearners&apos; wider{" "}
            <Link href="/government-exams" className="font-bold text-[#1565C0] hover:underline">
              government exams
            </Link>{" "}
            section as you continue your job search.
          </p>
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
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 mb-3">
            <span>
              <strong className="text-slate-900">Written By:</strong> PakLearners Editorial Team
            </span>
            <span>
              <strong className="text-slate-900">Last Updated:</strong> August 2026
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            This page is maintained as an educational jobs resource hub. Vacancy details, deadlines,
            eligibility and fees should always be verified against official KPPSC advertisements before
            applying or paying any fee.
          </p>
        </section>
      </div>
    </div>
  );
}
