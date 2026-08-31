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
import { kppscSyllabusFaqs } from "@/data/kppscSyllabusFaqs";

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

function NumberedList({ items }) {
  return (
    <ol className="space-y-3 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

const subjectOverview = [
  "English – grammar, vocabulary, comprehension, sentence correction, and basic composition skills.",
  "General Knowledge – covering national and international general awareness topics.",
  "Current Affairs – recent national and international developments relevant to the exam period.",
  "Pakistan Affairs – history, geography, constitutional development, and general facts about Pakistan.",
  "Islamiat / General Ethics – Islamic studies for Muslim candidates, or general ethics for non-Muslim candidates where applicable.",
  "Everyday Science – general scientific concepts relevant to daily life and common awareness.",
  "Mathematics / Basic Numerical Ability – arithmetic, basic reasoning and quantitative aptitude, more common in certain posts.",
  "Computer Science / IT Knowledge – basic computer awareness, more relevant for computer-related and administrative posts.",
  "Post-specific / Professional Subjects – technical or subject-specific knowledge directly related to the post being advertised.",
];

const postCategories = [
  "PMS (Provincial Management Service) – involves a structured written examination with multiple compulsory and optional subjects, generally more extensive than other posts.",
  "Lecturer posts – typically emphasize subject-specific knowledge in the candidate's academic discipline, often alongside general sections.",
  "Subject Specialist posts – focus heavily on advanced subject knowledge relevant to the specific field.",
  "Assistant and administrative posts – usually test general subjects such as English, General Knowledge, Pakistan Affairs and basic computer knowledge.",
  "Computer-related posts – include a stronger focus on IT and computer science concepts.",
  "Medical and health-related posts – test relevant medical or health-sector knowledge alongside general sections.",
  "Engineering posts – include technical/engineering subject knowledge specific to the discipline.",
  "Other professional posts – such as legal, finance or specialized regulatory roles, which usually have their own dedicated subject requirements.",
];

const downloadSteps = [
  "Identify your KPPSC post and scale — note the exact post title and BPS scale as written in your application or roll number slip.",
  "Check the relevant advertisement — locate the specific KPPSC advertisement under which you applied, since syllabus details are usually tied to the advertisement number.",
  "Locate the official syllabus or exam syllabus notice — this is typically published on the official KPPSC website or included with test-related notifications.",
  "Verify the applicable subjects and topics — confirm the subject list, and where available, the paper pattern and marks distribution for your specific post.",
  "Download and save the syllabus PDF if available — keep a copy for offline reference during your preparation.",
  "Use it as your preparation checklist — tick off subjects and topics as you complete them, so nothing is missed before the test.",
];

const preparationTips = [
  "Start with the official syllabus as your base document — don't rely on guesswork or word-of-mouth lists.",
  "Break the syllabus into subjects and sub-topics, so each study session has a clear, specific target.",
  "Create a realistic study timetable that allocates more time to subjects carrying greater weightage or that you find more difficult.",
  "Prioritize high-value topics first — areas that appear frequently in KPPSC tests for your post category deserve early attention.",
  "Practice MCQs regularly rather than only reading notes, since KPPSC tests are typically MCQ-based.",
  "Solve past papers to understand actual question patterns, difficulty level and recurring themes.",
  "Review your mistakes after every practice session instead of moving on immediately — this is where real improvement happens.",
  "Follow current affairs consistently, since this section changes constantly and cannot be prepared through one-time revision.",
  "Take mock tests under timed conditions to build speed and exam-day confidence.",
  "Revise regularly using short notes or summaries instead of re-reading full material every time.",
];

const strategySteps = [
  {
    title: "Step 1: Understand the Syllabus",
    text: "Read the official syllabus carefully and note every subject and topic listed for your specific post.",
  },
  {
    title: "Step 2: Collect Study Material",
    text: "Gather books, notes and reliable online resources that match the syllabus — avoid material that covers unrelated topics.",
  },
  {
    title: "Step 3: Prepare Subject-Wise",
    text: "Study one subject at a time in depth rather than jumping between topics, so concepts are retained properly.",
  },
  {
    title: "Step 4: Practice MCQs",
    text: "Reinforce each subject with MCQ practice immediately after studying it, since recall under exam conditions is different from simply reading.",
  },
  {
    title: "Step 5: Solve Past Papers",
    text: "Attempt previous KPPSC papers relevant to similar posts to understand the real difficulty level and commonly repeated concepts.",
  },
  {
    title: "Step 6: Take Mock Tests",
    text: "Simulate exam-day conditions with full-length timed tests to build stamina and manage time pressure.",
  },
  {
    title: "Step 7: Revise",
    text: "Set aside dedicated revision cycles in the final weeks before the test, focusing on weak areas identified during practice.",
  },
];

const commonMistakes = [
  "Preparing without checking the syllabus first, leading to wasted effort on irrelevant topics.",
  "Relying on outdated syllabus information instead of confirming details against the current advertisement.",
  "Ignoring post-specific or professional subjects and focusing only on general topics.",
  "Studying only general knowledge while neglecting English, Pakistan Affairs, or technical subjects that may carry equal or greater weightage.",
  "Not practicing MCQs consistently, which hurts speed and accuracy on test day.",
  "Ignoring past papers, missing valuable insight into question patterns and difficulty level.",
  "Skipping regular revision, causing earlier preparation to fade by the time the exam approaches.",
  "Depending entirely on guess papers or shortcuts instead of building genuine subject understanding.",
  "Neglecting current affairs, assuming it can be revised at the last minute.",
];

const relatedLinks = [
  { name: "KPPSC exam guide", path: "/government-exams/kppsc" },
  { name: "KPPSC MCQs", path: "/government-exams/kppsc/mcqs" },
  { name: "KPPSC past papers", path: "/government-exams/kppsc/past-papers" },
  { name: "KPPSC online tests", path: "/government-exams/kppsc/online-tests" },
  { name: "KPPSC eligibility", path: "/government-exams/kppsc/eligibility" },
  { name: "KPPSC preparation", path: "/government-exams/kppsc/preparation" },
];

export default function KppscSyllabusPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC", path: "/government-exams/kppsc" },
    { name: "Syllabus" },
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
            KPPSC Syllabus 2026 – Latest Subject-Wise Syllabus &amp; Preparation Guide
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            Preparing for a KPPSC exam starts with knowing exactly what to study. The{" "}
            <strong className="text-white">KPPSC syllabus</strong> tells candidates which subjects,
            topics and question patterns to expect — and it changes depending on the post and
            advertisement. This guide explains what the syllabus generally covers, how it differs
            across posts, and how to build a focused preparation plan around it.
          </p>
          <p className="text-sky-200/80 text-xs md:text-sm leading-relaxed max-w-3xl">
            Always cross-check details here with your official KPPSC advertisement, since the syllabus
            for each post is only confirmed by KPPSC itself.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <Section id="what-is-kppsc-syllabus" title="What Is the KPPSC Syllabus?">
          <Prose>
            <p>
              <strong className="text-slate-900">
                The KPPSC syllabus is the official list of subjects and topics set by the Khyber
                Pakhtunkhwa Public Service Commission for a specific post&apos;s written or screening
                test.
              </strong>{" "}
              It defines what candidates need to prepare and helps them avoid wasting time on
              irrelevant material.
            </p>
            <p>
              The Khyber Pakhtunkhwa Public Service Commission (KPPSC) conducts recruitment tests for
              a wide range of provincial government posts, from administrative and clerical roles to
              specialized positions in education, health, engineering and other technical
              departments. Because these posts differ so much in nature, KPPSC does not use one fixed
              syllabus for every exam. Instead:
            </p>
          </Prose>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600 leading-relaxed">
            {[
              "Each advertisement usually specifies the test type — written test, screening test, or both.",
              "The subjects and their relative importance depend on the post's qualification requirements and job nature.",
              "Some posts test general subjects only, while others combine general subjects with professional or technical knowledge related to the post.",
              "The syllabus is usually announced along with the advertisement or shared once the test schedule is finalized.",
            ].map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Understanding the syllabus before you start preparing helps you build a focused study plan,
            avoid unnecessary topics, and use your preparation time efficiently — which matters a great
            deal in a competitive exam environment.
          </p>
        </Section>

        <Section id="syllabus-2026-overview" title="KPPSC Syllabus 2026 – Subject-Wise Overview">
          <Prose>
            <p>
              While the exact <strong className="text-slate-900">KPPSC syllabus 2026</strong> depends
              on the post you are applying for, a number of subjects appear frequently across many
              KPPSC written and screening tests. These commonly tested areas include:
            </p>
          </Prose>
          <div className="mt-5 space-y-2.5">
            {subjectOverview.map((subject) => {
              const [label, ...rest] = subject.split(" – ");
              return (
                <div
                  key={subject}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm text-slate-600 leading-relaxed"
                >
                  <strong className="text-slate-900">{label}</strong>
                  {rest.length > 0 && ` – ${rest.join(" – ")}`}
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            It is important to understand that <strong className="text-slate-900">not every KPPSC test includes all of these subjects.</strong> A general administrative post may focus heavily on English, General Knowledge, Current Affairs and Pakistan Affairs, while a technical or subject-specialist post may allocate a much larger portion of the test to professional and subject-specific knowledge. The actual subject distribution, weightage and paper pattern are determined by the specific KPPSC advertisement and examination scheme for that recruitment cycle, so candidates should always confirm subject-wise details from their official advertisement rather than assuming a fixed pattern.
          </p>
        </Section>

        <Section id="syllabus-by-post" title="KPPSC Syllabus for Different Posts">
          <Prose>
            <p>
              KPPSC recruits for a large number of departments across Khyber Pakhtunkhwa, and the
              syllabus structure can vary significantly from one category of post to another. Some broad
              categories where candidates commonly appear for KPPSC exams include:
            </p>
          </Prose>
          <div className="mt-5 space-y-3">
            {postCategories.map((item) => {
              const [label, ...rest] = item.split(" – ");
              return (
                <div
                  key={item}
                  className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/60 to-white px-4 py-3.5 text-sm text-slate-600 leading-relaxed"
                >
                  <strong className="text-[#1565C0]">{label}</strong>
                  {rest.length > 0 && ` – ${rest.join(" – ")}`}
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Because the syllabus, paper pattern and marks distribution can differ meaningfully between
            these categories, candidates should never assume that the syllabus for one post applies to
            another — even within the same recruitment cycle. Always match the syllabus you are studying
            with the exact post, scale and advertisement number mentioned in your KPPSC application.
            For structured practice built around real exam patterns, candidates preparing for
            administrative and subject-specific roles alike can strengthen their preparation using{" "}
            <Link href="/government-exams/kppsc/mcqs" className="font-bold text-[#1565C0] hover:underline">
              KPPSC MCQs
            </Link>{" "}
            organized by subject.
          </p>
        </Section>

        <Section id="download-syllabus-pdf" title="How to Download KPPSC Syllabus PDF">
          <Prose>
            <p>
              Many candidates search for a <strong className="text-slate-900">KPPSC syllabus PDF</strong>{" "}
              to keep as a fixed reference while studying. Here is a simple, reliable process to find
              the correct one:
            </p>
          </Prose>
          <div className="mt-4">
            <NumberedList items={downloadSteps} />
          </div>
          <p className="mt-5 text-sm text-slate-600 leading-relaxed bg-amber-50 border border-amber-100 rounded-xl p-4">
            PakLearners does not host or issue official KPPSC syllabus PDFs on behalf of the Commission.
            The information on this page is educational guidance meant to help you understand and
            organize your preparation. For the exact, legally applicable syllabus of your post, always
            refer to the official KPPSC advertisement or the KPPSC website directly.
          </p>
        </Section>

        <Section id="prepare-according-to-syllabus" title="How to Prepare According to the KPPSC Syllabus">
          <Prose>
            <p>
              Once you have confirmed your syllabus, preparation becomes far more manageable if you
              approach it systematically rather than studying randomly. A practical approach looks like
              this:
            </p>
          </Prose>
          <div className="mt-4">
            <BulletList items={preparationTips} />
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            This kind of structured routine, built directly around the syllabus rather than generic
            study material, is what separates focused preparation from wasted effort.
          </p>
        </Section>

        <Section id="preparation-strategy" title="KPPSC Syllabus Preparation Strategy">
          <Prose>
            <p>
              For candidates who prefer a step-by-step framework, the following strategy works well
              for most KPPSC posts:
            </p>
          </Prose>
          <div className="mt-5 space-y-4">
            {strategySteps.map((step) => (
              <article key={step.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
                <h3 className="text-base font-black text-[#1565C0] mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Candidates preparing under time pressure often find it useful to combine this strategy with
            regular practice on{" "}
            <Link href="/government-exams/kppsc/online-tests" className="font-bold text-[#1565C0] hover:underline">
              KPPSC online tests
            </Link>
            , which helps track progress and identify weak subjects before the actual exam.
          </p>
        </Section>

        <Section id="syllabus-vs-past-papers" title="KPPSC Syllabus vs KPPSC Past Papers">
          <Prose>
            <p>
              Candidates often wonder whether they should focus on the syllabus or on past papers — the
              honest answer is that both serve different purposes and work best together.
            </p>
          </Prose>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed">
            {[
              <>The <strong className="text-slate-900">syllabus tells you what to study</strong> — the exact subjects and topics that are fair game for your exam.</>,
              <><strong className="text-slate-900">Past papers show you how questions are actually asked</strong> — the phrasing, difficulty level, and format used in real KPPSC tests.</>,
              <>Using only the syllabus without past papers can leave you unprepared for the actual question style.</>,
              <>Using only past papers without the syllabus risks missing newer topics or areas that haven&apos;t appeared in previous tests yet.</>,
            ].map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            The most effective approach is to use the syllabus to structure your study plan, then
            reinforce each topic with relevant{" "}
            <Link href="/government-exams/kppsc/past-papers" className="font-bold text-[#1565C0] hover:underline">
              KPPSC past papers
            </Link>{" "}
            to see how those topics have been tested historically. This combination helps candidates
            identify repeated concepts, frequently tested areas, and question patterns specific to their
            post category.
          </p>
        </Section>

        <Section id="common-mistakes" title="Common Mistakes Candidates Make While Preparing for KPPSC">
          <Prose>
            <p>Avoiding these common errors can save significant preparation time:</p>
          </Prose>
          <ol className="mt-4 space-y-2.5 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
            {commonMistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
          <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            Recognizing and correcting these mistakes early in your preparation cycle makes a noticeable
            difference in test performance.
          </p>
        </Section>

        <Section id="faq" title="Frequently Asked Questions About KPPSC Syllabus">
          <div className="space-y-2">
            {kppscSyllabusFaqs.map((faq, i) => {
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
            The KPPSC syllabus is the foundation of any serious preparation strategy — without it,
            even hard-working candidates end up studying the wrong material. Start by confirming the
            exact syllabus for your post and advertisement, then build your preparation around it step
            by step. Practice regularly with{" "}
            <Link href="/government-exams/kppsc/mcqs" className="font-bold text-[#1565C0] hover:underline">
              KPPSC MCQs
            </Link>
            , work through{" "}
            <Link href="/government-exams/kppsc/past-papers" className="font-bold text-[#1565C0] hover:underline">
              KPPSC past papers
            </Link>{" "}
            to understand real question patterns, and test your readiness with{" "}
            <Link href="/government-exams/kppsc/online-tests" className="font-bold text-[#1565C0] hover:underline">
              KPPSC online tests
            </Link>{" "}
            before exam day. For more guidance on posts, eligibility and test schedules, visit the main{" "}
            <Link href="/government-exams/kppsc" className="font-bold text-[#1565C0] hover:underline">
              KPPSC exam preparation
            </Link>{" "}
            page on PakLearners and continue building your preparation one subject at a time.
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
            This guide is maintained as educational preparation material. Eligibility, syllabus details,
            fees and schedules should always be verified against KPPSC&apos;s official advertisements
            before applying or finalizing your study plan.
          </p>
        </section>
      </div>
    </div>
  );
}
