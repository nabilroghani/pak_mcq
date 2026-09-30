"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaCheck, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { spscCceFaqs } from "@/data/spscCceFaqs";

const prepLinks = [
  { name: "SPSC exam guide", path: "/government-exams/spsc" },
  { name: "SPSC MCQs", path: "/mcqs/spsc" },
  { name: "SPSC past papers", path: "/past-papers/spsc" },
  {
    name: "KPPSC PMS written exam guide",
    path: "/blog/kppsc-pms-officer-written-exam-2026-schedule-preparation",
  },
];

const halves = [
  {
    title: "6 Compulsory Papers — 600 marks total",
    text: "English Essay, English (Précis & Composition), General Knowledge, Islamic Studies, Pakistan Studies, and Sindhi are the subjects generally included.",
  },
  {
    title: "6 Optional Papers — 600 marks total",
    text: "Typically 3 optional subjects, 2 papers each, chosen from the list SPSC publishes with its advertisement.",
  },
];

const compulsorySubjects = [
  "English Essay",
  "English (Précis & Composition)",
  "General Knowledge (covering areas such as General Science, Current Affairs, and similar general awareness topics)",
  "Islamic Studies (compulsory for Muslim candidates, with an alternative paper for non-Muslim candidates where applicable)",
  "Pakistan Studies",
  "Sindhi",
];

const eligibility = [
  {
    title: "Qualification",
    text: "A Bachelor's degree (typically at least Second Division, or the equivalent grading) from an HEC-recognized institution is generally required, consistent with other CSS/PMS-tier competitive exams.",
  },
  {
    title: "Age limit",
    text: "CCE has generally followed an age bracket similar to CSS and PMS (commonly in the low-to-mid twenties as a minimum, with an upper limit around the late twenties to low thirties), with the exact bracket and any relaxation provisions set out in each cycle's advertisement.",
  },
  {
    title: "Domicile",
    text: "As a provincial exam, CCE eligibility is generally tied to Sindh domicile requirements, in line with SPSC's general recruitment rules.",
  },
  {
    title: "Nationality",
    text: "Pakistani citizenship, consistent with other public service recruitment.",
  },
];

const steps = [
  {
    title: "Advertisement",
    text: "SPSC publishes the CCE advertisement, specifying eligibility, optional subject options, and application deadlines.",
  },
  {
    title: "Application",
    text: "Candidates apply through SPSC's specified application channel, selecting their optional subjects at this stage.",
  },
  {
    title: "Written Examination",
    text: "Candidates sit the full set of compulsory and optional papers across a scheduled examination period.",
  },
  {
    title: "Psychological Assessment/Test",
    text: "Consistent with how CSS and PMS-tier exams are generally structured, a psychological assessment stage may follow the written examination for candidates who qualify.",
  },
  {
    title: "Interview",
    text: "Shortlisted candidates proceed to an interview before the commission.",
  },
  {
    title: "Final Merit and Allocation",
    text: "Based on combined written, psychological, and interview performance, SPSC compiles a final merit list and allocates successful candidates to specific service groups and posts.",
  },
];

const syllabus = [
  {
    title: "English Essay",
    text: "Structured, well-argued long-form writing on a given topic.",
  },
  {
    title: "English (Précis & Composition)",
    text: "Summarization, comprehension, and general written English proficiency.",
  },
  {
    title: "General Knowledge",
    text: "Broad national and international awareness, current affairs, and general science.",
  },
  {
    title: "Islamic Studies",
    text: "Foundational Islamic teachings, history, and general religious knowledge.",
  },
  {
    title: "Pakistan Studies",
    text: "Pakistan's history, constitutional development, and national institutions.",
  },
  {
    title: "Sindhi",
    text: "Language proficiency relevant to the provincial context.",
  },
];

const optionalChoice = [
  "Pick subjects where you already have some academic background or genuine interest — CCE's optional papers reward depth, and starting from scratch in an unfamiliar subject this close to a major exam is a harder path.",
  "Consider how well-documented past papers and study material are for each subject option, since some optional subjects have far more accessible past material than others.",
];

const compulsoryPrep = [
  "Treat English Essay and Précis & Composition as skills built over weeks or months of regular writing practice, not something crammed close to the exam.",
  "Keep Current Affairs and General Knowledge under continuous review, since this content becomes outdated the fastest of any compulsory subject.",
  "Build a steady base in Pakistan Studies and Islamic Studies through structured reading rather than last-minute revision.",
];

const optionalPrep = [
  "Work through past papers for your specific chosen subjects to understand examiner expectations and recurring themes.",
  "Practice full-length written answers under timed conditions, since CCE's optional papers — like CSS and PMS — are subjective, essay-style papers rather than objective MCQs.",
];

const mistakes = [
  "Choosing optional subjects based on perceived \"easy scoring\" rather than genuine familiarity — a subject you don't understand well rarely scores better just because it has a reputation for being scoring.",
  "Neglecting the compulsory papers while over-focusing on optional subjects, when both halves carry equal weight in the final total.",
  "Treating English Essay and Précis as last-minute preparation items rather than skills that need sustained practice over time.",
  "Letting Current Affairs and General Knowledge preparation go stale by studying them only once early in your preparation timeline rather than reviewing continuously.",
  "Underestimating the psychological assessment and interview stages by focusing exclusively on the written papers and leaving these later stages unprepared for.",
  "Relying on outdated optional subject lists or syllabus versions — always confirm the current cycle's exact subject list and syllabus from SPSC's official advertisement.",
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

function NumberedList({ items }) {
  return (
    <ol className="space-y-3">
      {items.map((text, i) => (
        <li key={text} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
          <span className="font-black text-[#1565C0] shrink-0">{i + 1}.</span>
          <span>{text}</span>
        </li>
      ))}
    </ol>
  );
}

function FaqAnswer({ faq }) {
  if (faq.q === "Where can I find CCE past papers?") {
    return (
      <>
        See our{" "}
        <Link href="/past-papers/spsc" className="font-bold text-[#1565C0] hover:underline">
          SPSC Past Papers
        </Link>{" "}
        collection, and prioritize past papers specific to your chosen optional subjects alongside general
        compulsory-subject past papers.
      </>
    );
  }

  if (faq.q === "Where can I practice CCE-relevant MCQs?") {
    return (
      <>
        Our{" "}
        <Link href="/mcqs/spsc" className="font-bold text-[#1565C0] hover:underline">
          SPSC MCQs
        </Link>{" "}
        cover general knowledge, current affairs, Pakistan Studies, and Islamic Studies content relevant to
        CCE&apos;s compulsory papers.
      </>
    );
  }

  return faq.a;
}

export default function SpscCcePillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "SPSC", path: "/government-exams/spsc" },
    { name: "CCE" },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href="/government-exams/spsc"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> SPSC Exam Guide
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Combined Competitive Examination · Sindh Public Service Commission
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            SPSC CCE – Combined Competitive Examination Guide, Syllabus &amp; Preparation
          </h1>
          <div className="space-y-3 text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            <p>
              The Combined Competitive Examination (CCE) is the Sindh Public Service Commission&apos;s flagship
              recruitment exam — the provincial equivalent of what CSS is at the federal level and PMS is in
              Khyber Pakhtunkhwa. It&apos;s a full written examination spanning compulsory and optional papers,
              used to recruit officers into senior provincial civil service posts across Sindh.
            </p>
            <p>
              If you&apos;re aiming for a Sindh-based provincial management career, CCE is very likely the exam
              standing between you and that goal. This guide covers what CCE is, who&apos;s eligible, the complete
              12-paper structure, syllabus areas, and how to build a realistic preparation plan — along with
              where to find past papers and MCQs to practice with.
            </p>
            <p>
              For SPSC&apos;s broader recruitment process beyond CCE specifically, see our{" "}
              <Link href="/government-exams/spsc" className="font-bold text-white underline hover:text-sky-200">
                SPSC Exam Guide
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mcqs/spsc"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Practice SPSC MCQs <FaArrowRight size={11} />
            </Link>
            <Link
              href="/past-papers/spsc"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              SPSC Past Papers
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            CCE Preparation Resources
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

        <Section id="what-is-cce" title="What Is the SPSC CCE?">
          <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            <p>
              The Combined Competitive Examination is Sindh Public Service Commission&apos;s primary competitive
              exam for recruiting officers into various provincial civil service groups and cadres. It combines
              multiple compulsory subjects with candidate-chosen optional subjects into a single, comprehensive
              written examination — the same general model CSS uses federally and PMS uses in KP, adapted to
              Sindh&apos;s specific provincial service structure.
            </p>
            <p>
              CCE is considered one of the more prestigious and competitive routes into Sindh&apos;s civil service,
              given the range of postings it can lead to and the seniority of the resulting positions. Because
              of this, it draws a large number of applicants each cycle, similar to how CSS and PMS attract
              broad interest at their respective levels.
            </p>
          </div>
        </Section>

        <Section id="structure" title="SPSC CCE Structure: 12 Papers, 1,200 Marks">
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            CCE&apos;s examination structure is built around two halves of equal weight:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {halves.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">
                <h3 className="text-sm font-black text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <h3 className="text-base font-black text-slate-900 mb-3">Compulsory subjects generally include:</h3>
          <CheckList items={compulsorySubjects} />
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            <strong className="text-slate-900">Optional subjects</strong> are chosen by each candidate from a
            wider list SPSC publishes with its advertisement — commonly covering areas such as Political
            Science, Economics, Public Administration, Law, History, Sociology, and various other social
            science, humanities, and technical subjects, each contributing two papers to the total.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            The exact optional subject list, their groupings, and specific exam dates are set out in
            SPSC&apos;s official CCE advertisement for each cycle — always confirm the current list from
            SPSC&apos;s official website rather than assuming it matches a previous cycle exactly.
          </p>
        </Section>

        <Section id="eligibility" title="SPSC CCE Eligibility Criteria">
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            Based on how CCE has generally been structured:
          </p>
          <div className="space-y-4">
            {eligibility.map((item) => (
              <p key={item.title} className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-900">{item.title}.</strong> {item.text}
              </p>
            ))}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            Always verify the exact qualification, age bracket, and domicile requirements for the current CCE
            cycle directly from SPSC&apos;s official advertisement, since these details are set per cycle and can
            be revised.
          </p>
        </Section>

        <Section id="process" title="SPSC CCE Recruitment Process">
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            The overall CCE process generally follows this sequence:
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
            Always confirm the exact current-cycle process and stage sequence from SPSC&apos;s official
            advertisement and notices, since procedural details can be refined between cycles.
          </p>
        </Section>

        <Section id="syllabus" title="SPSC CCE Syllabus Overview">
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            <strong className="text-slate-900">Compulsory subjects</strong> generally test:
          </p>
          <div className="space-y-4">
            {syllabus.map((item) => (
              <p key={item.title} className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-900">{item.title}.</strong> {item.text}
              </p>
            ))}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            <strong className="text-slate-900">Optional subjects</strong> draw on standard academic syllabi
            for each chosen field — Political Science, Economics, Public Administration, Law, History,
            Sociology, and others — generally aligned with how these subjects are taught at the
            Bachelor&apos;s/Master&apos;s level, though exact paper-wise syllabus content for each optional subject
            is specified in SPSC&apos;s official syllabus document.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mt-4">
            Always download the current, official syllabus from SPSC&apos;s website for the specific compulsory
            and optional papers relevant to your application, since detailed topic-by-topic content is set
            out there rather than in general overviews like this one.
          </p>
        </Section>

        <Section id="prepare" title="How to Prepare for SPSC CCE">
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-black text-slate-900 mb-3">Choosing optional subjects</h3>
              <NumberedList items={optionalChoice} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-3">For compulsory papers</h3>
              <NumberedList items={compulsoryPrep} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-3">For optional papers</h3>
              <NumberedList items={optionalPrep} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-3">Overall approach</h3>
              <ol className="space-y-3">
                <li className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="font-black text-[#1565C0] shrink-0">1.</span>
                  <span>
                    Build a study timeline that spans months rather than weeks, given the breadth of a
                    12-paper examination.
                  </span>
                </li>
                <li className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="font-black text-[#1565C0] shrink-0">2.</span>
                  <span>
                    Balance your time across compulsory and optional papers rather than over-investing in one
                    at the expense of the other — both halves carry equal total marks.
                  </span>
                </li>
              </ol>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                For a sense of how a similarly structured provincial exam schedule and preparation plan can
                look in practice, see our guide on{" "}
                <Link
                  href="/blog/kppsc-pms-officer-written-exam-2026-schedule-preparation"
                  className="font-bold text-[#1565C0] hover:underline"
                >
                  KPPSC&apos;s PMS Officer Written Exam
                </Link>
                , since CCE and PMS share a broadly comparable compulsory-plus-optional format.
              </p>
            </div>
          </div>
        </Section>

        <Section id="past-papers" title="SPSC CCE Past Papers and MCQs">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Since CCE combines both objective general-knowledge-style content and subjective essay-based
            optional papers, your practice approach should reflect that mix:
          </p>
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                For compulsory subjects like General Knowledge, Current Affairs, Pakistan Studies, and Islamic
                Studies, work through{" "}
                <Link href="/mcqs/spsc" className="font-bold text-[#1565C0] hover:underline">
                  SPSC MCQs
                </Link>{" "}
                to build broad factual command.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                For written-response preparation across both compulsory and optional papers,{" "}
                <Link href="/past-papers/spsc" className="font-bold text-[#1565C0] hover:underline">
                  SPSC Past Papers
                </Link>{" "}
                help you understand question phrasing, structure expectations, and the kind of analytical
                depth CCE examiners look for.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>
                Since CCE&apos;s optional subjects vary widely by candidate, prioritize past papers specific to
                your chosen subjects rather than trying to cover every possible optional area.
              </span>
            </li>
          </ul>
        </Section>

        <Section id="mistakes" title="Common Mistakes to Avoid">
          <CheckList items={mistakes} />
        </Section>

        <section id="faq" className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {spscCceFaqs.map((faq, i) => {
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
            This guide summarizes CCE&apos;s generally reported structure and process based on publicly available
            information about SPSC&apos;s recruitment rules. Exact syllabus content, optional subject lists, marks
            distribution, and procedural stages should always be verified from{" "}
            <a
              href="https://www.spsc.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#1565C0] hover:underline"
            >
              SPSC&apos;s official website
            </a>{" "}
            and the current CCE advertisement before you finalize your preparation or application.
          </p>
        </section>
      </div>
    </div>
  );
}
