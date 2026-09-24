"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { kppscTestScheduleFaqs } from "@/data/kppscTestScheduleFaqs";

const KPPSC_SITE = "https://www.kppsc.gov.pk";

function Section({ id, title, children }) {
  return (
    <section id={id} className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Prose({ children }) {
  return <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">{children}</div>;
}

function OfficialLink({ children, className = "font-bold text-[#1565C0] hover:underline" }) {
  return (
    <a href={KPPSC_SITE} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

const scheduleRows = [
  [
    "Assistant Superintendent Jail (Prison), BPS-16 — Home & Tribal Affairs Department",
    "Physical Test",
    "02/2026, Sr. No. 33",
    "30/09/2026",
    "Qayyum Sports Complex, Peshawar Cantt, Peshawar",
  ],
];

const physicalRequirements = [
  {
    lead: "Physical measurements",
    text: "height and chest measurement (with and without expansion) checked against the standard set for that specific post.",
  },
  {
    lead: "Vision standard",
    text: "often requiring a certificate from a Services or DHQ hospital confirming eyesight meets the required standard without glasses, arranged in advance of the test date.",
  },
  {
    lead: "General medical fitness",
    text: "a declaration or certification of being free from disqualifying disabilities, usually obtained alongside the vision certificate.",
  },
  {
    lead: "Call letter and CNIC",
    text: "a printed call letter/roll number slip along with your original CNIC are typically mandatory for entry to the test venue; candidates without both are usually not permitted to appear.",
  },
];

const checklist = [
  "Download and print your call letter/roll number slip from KPPSC's official website as soon as it's uploaded — don't wait until the last day.",
  "If your post requires a medical or vision certificate, book your hospital appointment well ahead of time, since these can take longer to arrange than expected.",
  "Confirm your exact venue and reporting time from the official notice, and plan to arrive with buffer time, particularly for venues in cities you're not familiar with.",
  "Carry your original CNIC — not a photocopy — along with your printed call letter.",
  "If you haven't received any confirmation close to your expected test window, don't assume you've been excluded — contact KPPSC's office directly to confirm your status rather than missing the test on an assumption.",
];

const relatedLinks = [
  { name: "KPPSC exam guide", path: "/government-exams/kppsc" },
  { name: "Latest jobs", path: "/jobs" },
  { name: "KPPSC MCQs", path: "/mcqs/kppsc" },
  { name: "KPPSC past papers", path: "/past-papers/kppsc" },
  { name: "KPPSC online tests", path: "/government-exams/kppsc/online-tests" },
  { name: "KPPSC syllabus", path: "/government-exams/kppsc/syllabus" },
];

export default function KppscTestSchedulePillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC", path: "/government-exams/kppsc" },
    { name: "Test Schedule" },
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
            KPPSC Test Schedule 2026 – Physical, Written &amp; Interview Dates
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-4">
            Physical tests, written exams, and interviews organized by post and advertisement number,
            updated as KPPSC announces new schedules.
          </p>
          <p className="text-sky-200/80 text-xs md:text-sm leading-relaxed max-w-3xl">
            Last updated: September 2026. This page tracks confirmed test dates for candidates who have
            already applied. It is not a list of new job openings.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <Prose>
            <p>
              Once you&apos;ve applied for a Khyber Pakhtunkhwa Public Service Commission post, the
              advertisement itself doesn&apos;t tell you when your test will happen — that comes later, in a
              separate schedule notice issued once shortlisting is complete. KPPSC publishes these
              schedules on a rolling basis throughout the year, organized by advertisement number and
              serial/case number, which means candidates often have to search through multiple individual
              notices just to find their own test date.
            </p>
            <p>
              This page brings those schedules together in one place — physical tests, written exams, and
              interviews — organized by post and advertisement number, updated as KPPSC announces new
              ones. Whether you&apos;re checking a physical standard test date, confirming a written exam
              schedule, or looking for interview timing, this is meant to be a single reference point
              rather than something you have to piece together from scattered notices.
            </p>
            <p>
              <strong className="text-slate-900">
                This page is specifically for candidates who have already applied and are tracking a
                confirmed test date — it is not a list of new job openings.
              </strong>{" "}
              If you&apos;re looking for posts currently open for application, see our{" "}
              <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
                Latest Jobs
              </Link>{" "}
              page. For the full picture of KPPSC eligibility, syllabus, and preparation strategy, see the{" "}
              <Link href="/government-exams/kppsc" className="font-bold text-[#1565C0] hover:underline">
                KPPSC Exam Guide
              </Link>
              .
            </p>
          </Prose>
        </section>

        <Section id="current-schedules" title="Current KPPSC Test Schedules">
          <p className="text-sm text-slate-500 italic mb-4">
            Updated as new schedules are officially announced by KPPSC. Last updated: September 2026.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  {["Post", "Test Type", "Advertisement No.", "Test Date", "Venue"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-3 font-black text-[10px] md:text-xs uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {scheduleRows.map((row) => (
                  <tr key={row[2]} className="align-top">
                    {row.map((cell, i) => (
                      <td
                        key={`${row[2]}-${i}`}
                        className={`px-3 py-3 leading-relaxed text-xs md:text-sm ${i === 0 ? "font-bold text-slate-900 min-w-[16rem]" : "whitespace-nowrap"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            More schedules will be added to this table as KPPSC announces them — new entries typically
            appear for physical tests, written exams, and interviews across different departments and
            advertisement cycles throughout the year. If you don&apos;t see your specific post listed yet,
            check directly with <OfficialLink>KPPSC&apos;s official website</OfficialLink>, since this table
            reflects a subset of schedules we&apos;ve verified, not a real-time feed of every notice KPPSC
            issues.
          </p>
        </Section>

        <Section id="advertisement-case-number" title="Understanding Your Advertisement and Case Number">
          <Prose>
            <p>
              Every KPPSC schedule notice is tied to a specific <strong className="text-slate-900">advertisement number</strong>{" "}
              (the recruitment drive, e.g., &quot;02/2026&quot;) and a{" "}
              <strong className="text-slate-900">serial or case number</strong> (your specific post within
              that advertisement, e.g., &quot;Sr. No. 33&quot;). This matters because a single advertisement
              can cover dozens of different posts across multiple departments, each potentially following a
              different schedule.
            </p>
            <p>
              When checking for your test date — here or on KPPSC&apos;s official site — match both numbers
              exactly rather than just the post title, since post titles can repeat across different
              advertisements and departments with different eligibility, timelines, and requirements
              attached.
            </p>
          </Prose>
        </Section>

        <Section id="test-types" title="Types of KPPSC Tests You Might Be Scheduled For">
          <Prose>
            <p>Depending on your post, you may be scheduled for one or more of the following stages, generally in this order:</p>
          </Prose>
          <div className="mt-5 space-y-4">
            <article className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
              <h3 className="text-base font-black text-slate-900 mb-2">Written Test</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Most general recruitment and BPS-scale posts start here: an objective MCQ-based paper (or,
                for select posts, a subjective component) covering the subjects specified in your
                post&apos;s syllabus. See our{" "}
                <Link href="/government-exams/kppsc" className="font-bold text-[#1565C0] hover:underline">
                  KPPSC Exam Guide
                </Link>{" "}
                for how syllabus and pattern vary by post.
              </p>
            </article>
            <article className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
              <h3 className="text-base font-black text-slate-900 mb-2">Physical Test</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Reserved for posts with a defined physical standard, typically law-enforcement-adjacent and
                certain administrative or field posts. This usually involves height and chest measurements
                against a set standard, a vision check, and confirmation of general medical fitness — as
                reflected in the current schedule entry above.
              </p>
            </article>
            <article className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
              <h3 className="text-base font-black text-slate-900 mb-2">Interview</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                For most posts that clear the written and/or physical stage, an interview follows, generally
                assessing communication ability, relevant knowledge, and general suitability for the role.
              </p>
            </article>
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Not every post goes through all three stages, and the order or combination can vary — always
            follow what&apos;s specified in your own advertisement and schedule notice rather than assuming a
            fixed universal sequence.
          </p>
        </Section>

        <Section id="physical-requirements" title="What a Physical Test Schedule Typically Requires">
          <Prose>
            <p>
              Based on how KPPSC physical test notices are generally structured, expect requirements along
              these lines (exact standards vary by post and are specified in your individual notice):
            </p>
          </Prose>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed">
            {physicalRequirements.map((item) => (
              <li key={item.lead} className="flex gap-2 items-start">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1565C0] shrink-0" />
                <span>
                  <strong className="text-slate-900">{item.lead}</strong> — {item.text}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="checklist" title="A Practical Checklist Before Your Test Day">
          <Prose>
            <p>Regardless of test type, these steps reduce the chance of an avoidable problem on the day itself:</p>
          </Prose>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed list-disc pl-5">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section id="stay-updated" title="How to Stay Updated Between Now and Your Test">
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <li>
              <strong className="text-slate-900">Check KPPSC&apos;s official website regularly</strong>,
              particularly its schedules section, since call letters and roll number slips are uploaded there
              directly.
            </li>
            <li>
              <strong className="text-slate-900">Don&apos;t rely solely on SMS or email</strong> — KPPSC&apos;s
              own notices generally advise candidates who don&apos;t receive intimation through these channels
              to confirm their status independently.
            </li>
            <li>
              <strong className="text-slate-900">Contact KPPSC&apos;s office directly</strong> using the phone
              numbers or contact details provided in your specific schedule notice if you have any doubt about
              your status.
            </li>
            <li>
              <strong className="text-slate-900">Cross-check third-party sources (including this page)</strong>{" "}
              against KPPSC&apos;s official website before finalizing travel or leave arrangements, since
              official notices are the only authoritative source for your exact date, time, and venue.
            </li>
          </ul>
        </Section>

        <Section id="preparation" title="Preparing for Your Test in the Time You Have Left">
          <Prose>
            <p>How you use your remaining time depends on which stage you&apos;re preparing for:</p>
          </Prose>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed">
            <li>
              <strong className="text-slate-900">Physical test:</strong> Prioritize anything that needs
              advance scheduling — particularly vision and medical certification — well before the test date,
              since these can&apos;t be arranged the night before.
            </li>
            <li>
              <strong className="text-slate-900">Written test:</strong> Subject-wise practice and past papers
              tend to be more effective than last-minute review. Work through{" "}
              <Link href="/mcqs/kppsc" className="font-bold text-[#1565C0] hover:underline">
                KPPSC MCQs
              </Link>{" "}
              by subject, and use{" "}
              <Link href="/past-papers/kppsc" className="font-bold text-[#1565C0] hover:underline">
                KPPSC Past Papers
              </Link>{" "}
              to understand question style and pacing before your date. Once you&apos;re comfortable with the
              basics,{" "}
              <Link href="/government-exams/kppsc/online-tests" className="font-bold text-[#1565C0] hover:underline">
                KPPSC Online Tests
              </Link>{" "}
              help build exam-day speed under timed conditions.
            </li>
            <li>
              <strong className="text-slate-900">Interview:</strong> Review your academic background and stay
              current on relevant developments, since interviews typically follow the written or physical
              stage for eligible candidates.
            </li>
          </ul>
        </Section>

        <Section id="faq" title="Frequently Asked Questions">
          <div className="space-y-2">
            {kppscTestScheduleFaqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-slate-50 hover:bg-slate-100/80 transition-colors"
                    aria-expanded={open}
                  >
                    <span className="text-sm font-bold text-slate-900">
                      {i + 1}. {faq.q}
                    </span>
                    <FaChevronDown
                      size={12}
                      className={`text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="px-4 py-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {i === 1 ? (
                        <>
                          No. This page tracks test dates for posts where applications have already closed
                          and shortlisting is complete. For posts currently open for application, check our{" "}
                          <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
                            Latest Jobs
                          </Link>{" "}
                          page.
                        </>
                      ) : (
                        faq.a
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
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
          <p className="text-sm text-slate-500 leading-relaxed italic">
            This page compiles publicly available KPPSC test schedule notices for reference and is not an
            official KPPSC communication. Always confirm your exact test date, time, venue, and requirements
            directly from KPPSC&apos;s official website or your specific schedule notice before making any
            arrangements.
          </p>
        </section>
      </div>
    </div>
  );
}
