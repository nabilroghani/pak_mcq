"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaCheck, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { modFaqs } from "@/data/modFaqs";

const prepLinks = [
  { name: "MOD MCQs", path: "/mcqs/mod" },
  { name: "MOD past papers", path: "/past-papers/mod" },
  { name: "FPSC past papers", path: "/past-papers/fpsc" },
  { name: "FPSC exam guide", path: "/government-exams/fpsc" },
  { name: "Current affairs", path: "/current-affairs" },
  { name: "Latest jobs", path: "/jobs" },
];

const postTypes = [
  {
    title: "Administrative and management",
    text: "Roles such as Assistant Director across various pay scales, often requiring a Bachelor's or Master's degree.",
  },
  {
    title: "Technical",
    text: "Assistant Director (Engineering), Assistant Director (Computer Programming), and similar roles requiring engineering, IT, or computer science qualifications.",
  },
  {
    title: "Medical and nursing",
    text: "Healthcare-related roles requiring relevant medical or nursing qualifications.",
  },
  {
    title: "Security-adjacent",
    text: "Sub-Inspector and similar roles, often with both academic and physical eligibility standards.",
  },
  {
    title: "Technician and support",
    text: "Technical support roles requiring relevant trade or vocational qualifications.",
  },
  {
    title: "Clerical and administrative support",
    text: "General BS-scale clerical roles requiring Intermediate to Bachelor's-level qualifications.",
  },
];

const eligibility = [
  {
    title: "Qualification",
    text: "Ranges from Matric or Intermediate for lower BS-scale support and clerical posts, to a Bachelor's or Master's degree for administrative and technical posts, to specific professional qualifications for specialized technical and medical roles.",
  },
  {
    title: "Age limit",
    text: "Set per post in each advertisement, generally following the federal government's standard age bracket for the relevant pay scale, with the possibility of age relaxation for specific categories.",
  },
  {
    title: "Age relaxation",
    text: "Past advertisements have included relaxation for Scheduled Castes and recognized minority communities, released or retired Armed Forces personnel (with conditions on total years served), widows, widowers, and children of government servants who died in service, and persons with disabilities applying for BS-15 and below posts. Exact periods are specified per advertisement.",
  },
  {
    title: "Nationality",
    text: "Pakistani citizenship, consistent with other federal government recruitment.",
  },
  {
    title: "Quota",
    text: "MOD recruitment generally observes quotas for provinces and regions (Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Azad Jammu & Kashmir, Gilgit-Baltistan), along with quotas for women, minorities, and persons with disabilities.",
  },
  {
    title: "Required documents",
    text: "Typically CNIC, educational certificates and transcripts, domicile certificate, photographs, and any experience or professional certification relevant to the post. The exact list is in each advertisement.",
  },
];

const steps = [
  {
    title: "Advertisement",
    text: "MOD publishes vacancy advertisements listing available posts, eligibility criteria, and application deadlines, typically through its official website and national newspapers.",
  },
  {
    title: "Application",
    text: "Candidates apply through the process named in the advertisement. Use only the channel stated in the official notice — do not rely on third-party websites claiming to be an official MOD application portal.",
  },
  {
    title: "Screening / written test",
    text: "Eligible candidates sit a screening or written test for their post. Prior advertisements have used objective MCQ tests with negative marking for general posts. Exact format and rules are set per advertisement.",
  },
  {
    title: "Interview",
    text: "Shortlisted candidates who clear the written or screening stage typically proceed to an interview.",
  },
  {
    title: "Final selection and appointment",
    text: "MOD finalizes a merit list from combined test and interview performance and issues appointment offers, after any medical or document verification specified for the post.",
  },
];

const syllabus = [
  "General Knowledge — broad national and international awareness.",
  "Current Affairs — recent national and international developments and relevant policy updates.",
  "Pakistan Studies — history, constitutional development, and general national awareness.",
  "English — grammar, vocabulary, and comprehension.",
  "Basic Mathematics / Analytical Reasoning — for many general and clerical posts.",
  "Subject-specific content — for technical, medical, engineering, and IT posts, aligned with the professional field.",
];

const prepSteps = [
  "Read the full advertisement for your specific post before starting, since eligibility, test format, and requirements vary by role and pay scale.",
  "Build general knowledge and current affairs steadily. These appear consistently across federal screening tests, including MOD.",
  "Practice English and basic reasoning or mathematics through regular MCQs, particularly for clerical and general administrative posts.",
  "For technical and specialist posts, prioritize degree-level subject knowledge. Engineering, IT, and medical posts generally weight subject content heavily.",
  "Practice under negative-marking conditions if your test uses a penalty. That changes guessing strategy compared with a test that has no penalty.",
  "Use past papers and MCQs to understand pacing. Where MOD-specific papers are scarce, general federal-recruitment MCQs are a reasonable substitute.",
  "Prepare documents well ahead of the deadline. MOD advertisements, like other federal recruitment, enforce closing dates strictly.",
];

const mistakes = [
  "Applying through unofficial or third-party portals that claim to be MOD's official application system.",
  "Assuming a fixed universal MOD syllabus instead of checking the specific post. Subject weightage varies by role and pay scale.",
  "Ignoring negative-marking strategy on screening tests that use it. A wrong guess can cost more than leaving an uncertain question blank.",
  "Missing quota or age-relaxation categories that may actually apply to you.",
  "Relying on unofficial sources for fees, portals, or deadlines. Conflicting information about MOD recruitment circulates widely online.",
  "Submitting incomplete documentation because certificates were left until the closing date.",
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default function ModPillar() {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "MOD" },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href="/government-exams"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All Government Exams
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Ministry of Defence · Civilian recruitment
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            MOD Jobs in Pakistan – Complete Guide, Eligibility &amp; Test Preparation
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            The Ministry of Defence periodically recruits civilian staff from BS-01 to BS-18 — administrative,
            technical, medical, clerical, and security-adjacent posts. This guide covers eligibility, the
            recruitment process, test pattern, syllabus, and how to prepare. Exact fees, age limits, and
            application portals change with each advertisement, so confirm those on MOD&apos;s official website.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mcqs/mod"
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Practice MOD MCQs <FaArrowRight size={11} />
            </Link>
            <Link
              href="/past-papers/mod"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20"
            >
              MOD Past Papers
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
            MOD Preparation Resources
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

        <Section id="what-is-mod" title="What Is the Ministry of Defence (MOD)?">
          <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
            <p>
              The Ministry of Defence is the federal government body responsible for Pakistan&apos;s defense policy,
              working alongside the armed forces on national security, defense procurement, and related
              administration. Beyond that policy role, MOD maintains a substantial civilian workforce across its
              departments, attached organizations, and administrative wings — and that civilian recruitment is what
              most job-seeking candidates are looking for.
            </p>
            <p>
              MOD civilian posts are government jobs on pay scales (BS-1 through roughly BS-18, depending on the
              advertisement), similar in structure to other federal ministries. They are separate from joining the
              Army, Navy, or Air Force through commissioned or enlisted service.
            </p>
            <p>
              One notable structure inside MOD is the <strong className="text-slate-900">Armed Forces Headquarters (AFHQ) Civil Service</strong>,
              a distinct cadre that provides administrative support inside defense headquarters, with grades such as
              Section Officer and Deputy Director. Some of those posts are filled by direct recruitment. Beyond AFHQ,
              MOD and attached departments — including bodies such as the Directorate General of Civil Defence —
              advertise administrative, technical, and support posts as vacancies arise.
            </p>
            <p>
              For a federal career, MOD drives are worth watching alongside{" "}
              <Link href="/government-exams/fpsc" className="font-bold text-[#1565C0] hover:underline">
                FPSC exams
              </Link>
              . They follow a broadly similar advertisement-to-appointment structure, but the Ministry conducts them
              directly rather than through FPSC. Treat this page as a starting point, not a substitute for the
              advertisement you are applying under.
            </p>
          </div>
        </Section>

        <Section id="posts" title="MOD Recruitment: What It Covers">
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            Publicly reported advertisements have covered a broad mix of post types. A single notice may list a
            handful of specialized posts or a large multi-department drive spanning BS-1 to BS-18.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {postTypes.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">
                <h3 className="text-sm font-black text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            Always check the specific advertisement for which posts are open and their individual eligibility
            criteria. Scope changes significantly from one cycle to the next.
          </p>
        </Section>

        <Section id="eligibility" title="MOD Eligibility Criteria">
          <div className="space-y-4">
            {eligibility.map((item) => (
              <div key={item.title} className="flex gap-3 items-start">
                <FaCheck className="text-emerald-500 mt-1 shrink-0" size={12} />
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">{item.title}.</strong> {item.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            Verify qualification, age, and quota for your post from the official advertisement. These details are
            set per recruitment drive and can change between notices.
          </p>
        </Section>

        <Section id="process" title="MOD Recruitment Process">
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            Publicly available accounts of past drives follow a structure similar to other federal recruitment bodies.
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
            Larger multi-department drives can take several months from advertisement to appointment. Plan
            preparation around your own notice, and confirm stage timelines from that advertisement rather than a
            general estimate.
          </p>
        </Section>

        <Section id="pattern" title="MOD Test Pattern">
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            {[
              "Objective MCQ screening tests have been used for general recruitment posts, with a negative-marking scheme (a fraction of a mark deducted per incorrect answer) reported in at least one recent large-scale advertisement.",
              "Technical and subject-specific posts (engineering, IT, medical, nursing) likely include subject-relevant content in addition to general sections, consistent with other federal recruiting bodies. Confirm MOD's exact approach from your advertisement.",
              "Some drives are conducted by an MOD-approved or designated testing organization rather than entirely in-house. The advertisement names the body conducting your test.",
            ].map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 leading-relaxed mt-5">
            MOD&apos;s test pattern is not documented as consistently as FPSC&apos;s or the provincial commissions&apos;.
            Treat this description as a general guide, and rely on your advertisement and any test instructions
            issued to you for the definitive format.
          </p>
        </Section>

        <Section id="syllabus" title="MOD Syllabus">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            General federal screening tests usually mix the subjects below. Exact syllabus content is set per
            advertisement — MOD does not publish one universal syllabus for every post.
          </p>
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            {syllabus.map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="prepare" title="How to Prepare for a MOD Recruitment Test">
          <ol className="space-y-3">
            {prepSteps.map((text, i) => (
              <li key={text} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                <span className="font-black text-[#1565C0] shrink-0">{i + 1}.</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="past-papers" title="MOD Past Papers">
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              MOD-specific past papers are less widely circulated than FPSC or the provincial commissions, partly
              because recruitment drives vary in scope and frequency. Where available, they help you judge style,
              difficulty, recurring general-knowledge themes, and realistic pacing for objective papers that use
              negative marking.
            </p>
            <p>
              Explore the{" "}
              <Link href="/past-papers/mod" className="font-bold text-[#1565C0] hover:underline">
                MOD past papers
              </Link>{" "}
              collection as papers from recent cycles are added, and cross-reference{" "}
              <Link href="/past-papers/fpsc" className="font-bold text-[#1565C0] hover:underline">
                FPSC past papers
              </Link>{" "}
              for overlapping general knowledge and current affairs practice.
            </p>
          </div>
        </Section>

        <Section id="mcqs" title="MOD MCQs">
          <p className="text-sm text-slate-600 leading-relaxed">
            General screening tests draw on the same core subjects used across most federal recruitment — general
            knowledge, current affairs, English, and basic reasoning. Subject-wise MCQ practice is one of the most
            reliable ways to prepare, especially while MOD-specific past material is still limited. Work through{" "}
            <Link href="/mcqs/mod" className="font-bold text-[#1565C0] hover:underline">
              MOD MCQs
            </Link>{" "}
            and combine them with broader federal-recruitment practice.
          </p>
        </Section>

        <Section id="mistakes" title="Common Mistakes to Avoid">
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            {mistakes.map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <section id="faq" className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {modFaqs.map((faq, i) => {
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
                    <FaChevronDown size={12} className={`text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
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
        </section>

        <section className="bg-amber-50 rounded-2xl border border-amber-100 p-6 md:p-8">
          <p className="text-sm text-slate-600 leading-relaxed">
            This guide is based on publicly reported information about past MOD recruitment drives and general
            patterns across federal government recruitment in Pakistan. MOD does not publish one standardized
            process or syllabus for every advertisement. Always verify eligibility, application procedure, test
            pattern, fees, and deadlines directly from{" "}
            <a
              href="https://www.mod.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#1565C0] hover:underline"
            >
              www.mod.gov.pk
            </a>{" "}
            and your specific advertisement before applying.
          </p>
        </section>
      </div>
    </div>
  );
}
