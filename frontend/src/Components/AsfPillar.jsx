"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaCheck, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { asfFaqs } from "@/data/asfFaqs";

const prepLinks = [
  { name: "FPSC exam guide", path: "/government-exams/fpsc" },
  { name: "FPSC MCQs", path: "/mcqs/fpsc" },
  { name: "FPSC past papers", path: "/past-papers/fpsc" },
  { name: "Latest jobs", path: "/jobs" },
];

const channels = [
  {
    title: "Officer-level posts",
    text: "Assistant Director, Inspector, and similar BS-16/BS-17 roles are typically advertised and recruited through FPSC, following FPSC's standard written-test-plus-interview process.",
  },
  {
    title: "Lower-tier and support posts",
    text: "Posts such as Constable have historically been recruited through NTS or ASF's own direct application portal, separate from FPSC's process.",
  },
];

const steps = [
  {
    title: "Advertisement",
    text: "FPSC (for officer posts) or ASF directly (for certain other posts) publishes the vacancy advertisement with eligibility criteria, application deadline, and instructions.",
  },
  {
    title: "Application",
    text: "Candidates apply through the official channel specified in the advertisement — typically FPSC's online application system for officer-level ASF posts.",
  },
  {
    title: "Application fee",
    text: "A fee is required as part of the application process. The exact amount and payment method are specified in the advertisement and can change between recruitment cycles.",
  },
  {
    title: "Written test",
    text: "Conducted by FPSC for officer-level posts, generally following FPSC's standard objective, MCQ-based format for general recruitment posts, covering general knowledge, current affairs, English, and other subjects relevant to the post.",
  },
  {
    title: "Physical test",
    text: "Given ASF's operational nature, a physical standards test (height, weight, vision, and general fitness) is typically part of the selection process for relevant posts.",
  },
  {
    title: "Interview",
    text: "Shortlisted candidates who clear the written and physical stages proceed to an interview.",
  },
  {
    title: "Security / intelligence clearance",
    text: "ASF recruitment has generally included a security clearance component — such as police verification and background checks — given the sensitive nature of aviation security work. This stage can extend the overall recruitment timeline.",
  },
  {
    title: "Final selection and appointment",
    text: "Based on combined performance across these stages, FPSC finalizes a merit list and forwards successful candidates to ASF for appointment.",
  },
];

const writtenPrep = [
  "Treat it like a standard FPSC general recruitment paper. General Knowledge, Current Affairs, Pakistan Affairs, and English form the likely core, based on how FPSC structures most of its general posts.",
  "Practice with FPSC MCQs and FPSC past papers, since ASF's officer-level written test shares FPSC's general format and subject range.",
  "Stay current on general national security and aviation-related developments, given the nature of the organization, alongside standard current affairs preparation.",
];

const physicalPrep = [
  "Prepare well ahead of time for height, weight, and vision standards specified for your post. Vision certification in particular may require advance scheduling with a hospital.",
  "Maintain general physical fitness in the lead-up to your test date, since specific fitness expectations beyond basic measurements may be assessed depending on the post.",
];

const interviewPrep = [
  "Be prepared to discuss your academic background and motivation for joining a security-focused organization.",
  "Ensure your documentation (educational certificates, CNIC, domicile, any previous employment records) is complete and consistent, since the security clearance process for ASF roles can be more document-intensive than a typical general recruitment post.",
];

const mistakes = [
  "Applying through unofficial third-party portals rather than FPSC's or ASF's official application channels. Always verify the correct application system from the current advertisement.",
  "Underestimating the physical standards component. Height, weight, and vision requirements are firm eligibility criteria, and should be confirmed and prepared for well ahead of your test date.",
  "Assuming ASF's written test has a unique format separate from FPSC's general pattern. For most officer posts, standard FPSC preparation (general knowledge, current affairs, English) applies directly.",
  "Underestimating the security clearance stage's timeline. The overall process can take longer than a typical general recruitment post because of this additional stage.",
  "Relying on outdated fee or eligibility figures from older articles or aggregator sites. Always cross-check against the current, specific advertisement, since these details change between recruitment cycles.",
  "Submitting incomplete documentation. Given the additional security clearance and physical verification stages, ensure all required documents are accurate and consistent well ahead of each stage's deadline.",
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}

function CheckList({ items }) {
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

function FaqAnswer({ faq }) {
  if (faq.q === "How can I prepare for the ASF written test?") {
    return (
      <>
        Prepare using standard FPSC general recruitment resources —{" "}
        <Link href="/mcqs/fpsc" className="font-bold text-[#1565C0] hover:underline">
          FPSC MCQs
        </Link>{" "}
        and{" "}
        <Link href="/past-papers/fpsc" className="font-bold text-[#1565C0] hover:underline">
          FPSC Past Papers
        </Link>{" "}
        — since ASF&apos;s officer-level written test follows FPSC&apos;s general pattern. There is no
        separately published ASF-specific format for most officer posts.
      </>
    );
  }

  if (faq.q === "Are ASF past papers different from general FPSC past papers?") {
    return (
      <>
        For most officer-level posts, ASF&apos;s written test follows FPSC&apos;s general recruitment format, so{" "}
        <Link href="/past-papers/fpsc" className="font-bold text-[#1565C0] hover:underline">
          FPSC Past Papers
        </Link>{" "}
        are directly relevant preparation material. There is no separately published ASF-specific past paper
        format for most officer posts.
      </>
    );
  }

  if (faq.q === "Where can I verify current ASF job openings and requirements?") {
    return (
      <>
        Always verify through FPSC&apos;s official website (www.fpsc.gov.pk) and ASF&apos;s official website
        (www.asf.gov.pk), and check our{" "}
        <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">
          FPSC Exam Guide
        </Link>{" "}
        and{" "}
        <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
          Latest Jobs
        </Link>{" "}
        page for currently tracked openings.
      </>
    );
  }

  return faq.a;
}

export default function AsfPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "FPSC", path: "/government-exams/fpsc" },
    { name: "ASF" },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href="/government-exams/fpsc"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> FPSC Exam Guide
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Airport Security Force · FPSC officer recruitment
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            ASF (Airport Security Force) Jobs via FPSC – Eligibility, Test Pattern &amp; Preparation
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            The Airports Security Force (ASF) is a federal force operating under Pakistan&apos;s Ministry of
            Defence, responsible for aviation security at the country&apos;s civil airports. For officer-level
            posts — most notably Assistant Director (BS-17) and Inspector (BPS-16) — ASF recruitment is
            conducted through the Federal Public Service Commission (FPSC), following a written test, physical
            standards check, interview, and security clearance process. Lower-tier posts such as Constable are
            generally recruited separately, often through NTS or ASF&apos;s own direct application channels.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mcqs/fpsc"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Practice FPSC MCQs <FaArrowRight size={11} />
            </Link>
            <Link
              href="/past-papers/fpsc"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              FPSC Past Papers
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            ASF Preparation Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {prepLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 bg-slate-50 border border-slate-100 text-slate-800 hover:border-blue-200 hover:bg-blue-50/60 transition-all"
              >
                <span className="text-sm font-bold">{link.name}</span>
                <FaArrowRight size={11} className="text-slate-300 group-hover:text-[#1565C0] transition-all" />
              </Link>
            ))}
          </div>
        </div>

        <Section id="what-is-asf" title="What Is ASF and How Does It Recruit?">
          <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            <p>
              ASF is Pakistan&apos;s dedicated federal aviation security force, tasked with safeguarding civil
              airports and enforcing aviation security standards nationwide. Recruitment into ASF happens through
              more than one channel depending on the post level.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {channels.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">
                  <h3 className="text-sm font-black text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <p>
              This page focuses specifically on ASF officer-level recruitment through FPSC, covering eligibility,
              the physical and academic standards involved, the overall selection process, and how to prepare —
              alongside FPSC&apos;s broader recruitment structure covered in our{" "}
              <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">
                FPSC Exam Guide
              </Link>
              .
            </p>
            <p>
              If you are targeting an FPSC-recruited ASF officer post, make sure the advertisement you are
              responding to is genuinely an FPSC notice. Verify through{" "}
              <a
                href="https://www.fpsc.gov.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#1565C0] hover:underline"
              >
                FPSC&apos;s official website
              </a>{" "}
              or{" "}
              <a
                href="https://www.asf.gov.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#1565C0] hover:underline"
              >
                ASF&apos;s official recruitment page
              </a>
              . ASF-related job postings circulate widely across aggregator websites with varying accuracy.
            </p>
          </div>
        </Section>

        <Section id="eligibility" title="ASF Eligibility Criteria (Officer-Level Posts)">
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            Eligibility varies by specific post and advertisement. The points below reflect how recent ASF
            officer-level recruitment through FPSC has generally been structured.
          </p>
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Assistant Director (BS-17)</h3>
              <CheckList
                items={[
                  "Typically requires 16 years of education — a Bachelor's or Master's degree, generally with at least Second Division or Grade 'C', from an HEC-recognized institution.",
                  "Physical fitness standards apply, given the operational nature of the role.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">Inspector (BPS-16)</h3>
              <CheckList
                items={[
                  "Typically requires a Bachelor's degree.",
                  "Age requirements have generally fallen in a range around the early-to-late twenties, with age relaxation provisions available for eligible categories.",
                  "Height and physical standards apply. Reported figures for constable and comparable posts have included a minimum height around 5'6\" for male candidates and 5'2\" for female candidates, alongside proportionate weight and vision standards (commonly 6/6, correctable in some cases).",
                ]}
              />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-2">General eligibility factors</h3>
              <CheckList
                items={[
                  "Pakistani citizenship.",
                  "Physical fitness meeting the standards specified for the post, including height, weight, and vision requirements.",
                  "A security and background clearance component, given the sensitive nature of aviation security work.",
                  "Both male and female candidates are eligible to apply for ASF posts where the advertisement does not restrict the role by gender, provided they meet the stated eligibility criteria.",
                ]}
              />
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            Always confirm exact qualification, age, height, and other physical standards from the specific FPSC
            or ASF advertisement for your target post. These details are set individually per recruitment cycle
            and can change between advertisements. Treat the figures above as a general guide.
          </p>
        </Section>

        <Section id="process" title="ASF Recruitment and Selection Process">
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            Based on how ASF&apos;s FPSC-recruited officer posts have generally proceeded:
          </p>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1565C0] text-xs font-black text-white">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">{step.title}.</strong> {step.text}
                </p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            The complete process — from advertisement to appointment — has been reported to take a few months in
            past recruitment cycles, partly due to the additional security clearance stage. Plan your preparation
            and expectations accordingly, and confirm your specific advertisement&apos;s exact stages and timeline.
          </p>
        </Section>

        <Section id="pattern" title="ASF Test Pattern (Written Test via FPSC)">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Since ASF officer-level recruitment is conducted through FPSC, the written test generally follows
            FPSC&apos;s standard pattern for general recruitment and BPS-scale posts.
          </p>
          <CheckList
            items={[
              "Objective, MCQ-based paper covering general knowledge, current affairs, Pakistan Affairs, English, and other subject content relevant to the post.",
              "Post-relevant content. Given ASF's security and law-enforcement-adjacent nature, expect some general awareness content connected to security, aviation, or general administrative knowledge, alongside standard general recruitment subjects.",
              "Negative marking and exact paper structure (number of questions, time allowed) are specified in the individual advertisement. Confirm these details directly.",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            For a fuller picture of how FPSC&apos;s general written test pattern works, see the{" "}
            <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">
              FPSC Exam Guide
            </Link>
            . ASF&apos;s officer-level written test follows the same general commission-administered format.
          </p>
        </Section>

        <Section id="prepare" title="How to Prepare for ASF Recruitment">
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-black text-slate-900 mb-3">For the written test</h3>
              <ol className="space-y-3">
                {writtenPrep.map((text, i) => (
                  <li key={text} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                    <span className="font-black text-[#1565C0] shrink-0">{i + 1}.</span>
                    <span>
                      {i === 1 ? (
                        <>
                          Practice with{" "}
                          <Link href="/mcqs/fpsc" className="font-bold text-[#1565C0] hover:underline">
                            FPSC MCQs
                          </Link>{" "}
                          and{" "}
                          <Link href="/past-papers/fpsc" className="font-bold text-[#1565C0] hover:underline">
                            FPSC Past Papers
                          </Link>
                          , since ASF&apos;s officer-level written test shares FPSC&apos;s general format and subject range.
                        </>
                      ) : (
                        text
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-3">For the physical test</h3>
              <ol className="space-y-3">
                {physicalPrep.map((text, i) => (
                  <li key={text} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                    <span className="font-black text-[#1565C0] shrink-0">{i + 1}.</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-3">For the interview and clearance stage</h3>
              <ol className="space-y-3">
                {interviewPrep.map((text, i) => (
                  <li key={text} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                    <span className="font-black text-[#1565C0] shrink-0">{i + 1}.</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        <Section id="past-papers" title="ASF Past Papers and MCQs">
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Since ASF&apos;s officer-level written test is conducted by FPSC using FPSC&apos;s general format,{" "}
              <Link href="/past-papers/fpsc" className="font-bold text-[#1565C0] hover:underline">
                FPSC Past Papers
              </Link>{" "}
              and{" "}
              <Link href="/mcqs/fpsc" className="font-bold text-[#1565C0] hover:underline">
                FPSC MCQs
              </Link>{" "}
              are directly relevant preparation resources. There is no separately published ASF-specific paper
              format distinct from FPSC&apos;s general recruitment pattern for most officer posts. Focus your practice on:
            </p>
            <CheckList
              items={[
                "General Knowledge and Current Affairs, which form a substantial part of most FPSC general recruitment papers.",
                "English and Pakistan Affairs, which are consistently tested across FPSC's general posts.",
                "Any post-specific content indicated in your individual advertisement, since some ASF officer posts may include additional subject matter beyond the standard general sections.",
              ]}
            />
          </div>
        </Section>

        <Section id="mistakes" title="Common Mistakes to Avoid">
          <CheckList items={mistakes} />
        </Section>

        <section id="faq" className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {asfFaqs.map((faq, i) => {
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
                      <FaqAnswer faq={faq} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-amber-50 rounded-2xl border border-amber-100 p-6 md:p-8">
          <p className="text-sm text-slate-600 leading-relaxed">
            This guide summarizes publicly reported patterns from past ASF recruitment cycles conducted through
            FPSC. Eligibility, physical standards, fees, and process details can change between advertisements.
            Always verify current requirements directly from{" "}
            <a
              href="https://www.fpsc.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#1565C0] hover:underline"
            >
              FPSC&apos;s official website
            </a>{" "}
            and{" "}
            <a
              href="https://www.asf.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#1565C0] hover:underline"
            >
              ASF&apos;s official website
            </a>
            , and the specific advertisement, before applying.
          </p>
        </section>
      </div>
    </div>
  );
}
