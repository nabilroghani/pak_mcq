import Link from "next/link";
import { FaArrowRight, FaCheck } from "react-icons/fa";

export const metadata = {
  title: "Government Exam Results in Pakistan – Updates & Roll Numbers",
  description:
    "Track government exam results in Pakistan for FPSC, CSS, PPSC, KPPSC, NTS and more. Cross-check announcements with official exam body sources.",
  alternates: {
    canonical: "/results",
  },
};

export default function ResultsPage() {
  return (
    <div className="bg-slate-50 min-h-[60vh]">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 text-white rounded-b-[2rem]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-300 mb-3">
            Pak Learners · Results
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Government Exam Results in Pakistan
          </h1>
          <p className="text-blue-100/90 text-sm md:text-base max-w-2xl leading-relaxed">
            Track result announcements for federal, provincial, and testing-service exams — and always verify
            outcomes on the official exam body website.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-6">
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-3">How Results Are Announced</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            After a government exam is conducted, results are usually published on the conducting authority&apos;s
            official website. Timelines vary by body — FPSC, provincial commissions, and testing services like NTS each
            follow their own announcement schedules.
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            {[
              "Check the official commission or testing service website first",
              "Keep your roll number and CNIC ready when searching results",
              "Treat secondary listings as alerts — confirm against the official notice",
            ].map((t) => (
              <li key={t} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-4">Related Resources</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: "Latest Jobs", path: "/jobs", note: "New advertisements and deadlines" },
              { name: "Government Exams Guide", path: "/government-exams", note: "Syllabus, eligibility & prep" },
              { name: "Past Papers", path: "/past-papers", note: "Pattern practice by exam body" },
              { name: "Online Tests", path: "/online-tests", note: "Timed MCQ practice" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 border border-slate-100 bg-slate-50 hover:border-blue-200 hover:bg-blue-50/60"
              >
                <div>
                  <span className="block text-sm font-bold text-slate-900">{item.name}</span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">{item.note}</span>
                </div>
                <FaArrowRight
                  size={11}
                  className="text-slate-300 group-hover:text-[#1565C0] transition-colors"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
