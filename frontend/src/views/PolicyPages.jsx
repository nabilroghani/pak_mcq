"use client";

import Link from "next/link";
import { FaPenFancy, FaBalanceScale } from "react-icons/fa";

const PolicyPage = ({ icon: Icon, title, accent, intro, sections }) => (
  <div className="min-h-screen bg-slate-50">
    <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-black py-12 px-6 text-center relative overflow-hidden rounded-b-[3rem] shadow-xl">
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-cyan-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-white/10">
          <Icon className="text-cyan-400" /> Pak Learners Policy
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
          {title} <span className="text-cyan-500">{accent}</span>
        </h1>
        <p className="text-blue-200/60 max-w-xl mx-auto font-medium text-sm">{intro}</p>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-6 -mt-8 pb-20">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-8 md:p-14 border border-white space-y-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-black text-blue-950 mb-3 uppercase tracking-tight">
              {section.heading}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">{section.body}</p>
          </section>
        ))}

        <p className="text-sm text-slate-500 pt-4 border-t border-slate-100">
          Questions?{" "}
          <Link href="/contact" className="text-[#1565C0] font-bold hover:underline">
            Contact us
          </Link>
          {" · "}
          <Link href="/privacy-policy" className="text-[#1565C0] font-bold hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export const EditorialPolicy = () => (
  <PolicyPage
    icon={FaPenFancy}
    title="Editorial"
    accent="Policy"
    intro="How Pak Learners creates, reviews and updates educational content for competitive exam preparation."
    sections={[
      {
        heading: "Our Mission",
        body: "Pak Learners publishes MCQs, past papers guidance, current affairs and study resources to help students prepare for government and competitive exams across Pakistan. Accuracy, clarity and usefulness guide every update.",
      },
      {
        heading: "Content Standards",
        body: "Subject pages and quizzes are organized by exam relevance. We prioritize commonly tested topics, clear wording, and verifiable answers. Where sources conflict, we revise content after review.",
      },
      {
        heading: "Updates & Corrections",
        body: "Educational material is reviewed regularly. If you find an error, please report it via the Contact page or Submit MCQs form so our team can verify and correct it promptly.",
      },
      {
        heading: "Independence",
        body: "Editorial decisions are made for learner benefit. Sponsored or promotional material, if any, will be clearly distinguished from educational content.",
      },
    ]}
  />
);

export const Disclaimer = () => (
  <PolicyPage
    icon={FaBalanceScale}
    title="Disclaimer"
    accent=""
    intro="Important legal and usage notices for Pak Learners visitors and learners."
    sections={[
      {
        heading: "Educational Purpose",
        body: "All MCQs, tests, past papers references, job updates and study materials on Pak Learners are provided for educational and informational purposes only. They do not replace official exam notices, syllabi or commission guidelines.",
      },
      {
        heading: "No Guarantee of Results",
        body: "Using this website does not guarantee selection, admission or a specific exam score. Success depends on individual preparation, eligibility and official exam conditions.",
      },
      {
        heading: "Official Sources",
        body: "Always confirm job advertisements, dates, fees and eligibility from official commission or testing agency websites (FPSC, PPSC, KPPSC, NTS, ETEA and others) before applying.",
      },
      {
        heading: "Limitation of Liability",
        body: "Pak Learners is not liable for decisions made solely based on website content, including application choices, preparation plans or interpretation of practice questions.",
      },
    ]}
  />
);
