"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaCheck, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { modMcqs } from "@/data/modMcqs";
import { modOnlineTestFaqs } from "@/data/modOnlineTestFaqs";

const TOTAL_SECONDS = 15 * 60;
const PENALTY = 0.25;
const STORAGE_KEY = "paklearners-mod-online-test";

const whyTimed = [
  "Build a pacing instinct — how long you can spend on a question before moving on.",
  "Practice selective answering. A wrong answer costs 0.25 marks on this mock, so a blank can be safer than a guess.",
  "Make the format and the clock feel familiar before test day.",
  "Get a more honest read than an untimed session where you can think as long as you like.",
];

const howToUse = [
  "Don't start here if the subjects are still new. Work through MOD MCQs by topic first.",
  "Treat the first attempt as a baseline, not a verdict.",
  "Review every question afterward, including ones you got right without being sure.",
  "Track pacing separately from the score. Running out of time is a different problem from getting questions wrong.",
  "Retake after several days of study, not immediately. An instant retake mostly tests memory of these questions.",
];

const routine = [
  { lead: "Start with the fundamentals.", href: "/government-exams/mod", label: "MOD Exam Guide", rest: "covers eligibility, the recruitment process, and how requirements vary by post." },
  { lead: "Build knowledge untimed.", href: "/mcqs/mod", label: "MOD MCQs", rest: "are organized by subject, with explanations you can read without a clock." },
  { lead: "Use the past-papers guide for style.", href: "/past-papers/mod", label: "MOD Past Papers", rest: "explains the shortage of real papers and includes labeled sample questions." },
  { lead: "Shift to this timed mock once the foundation is solid.", rest: "That is usually the last few weeks, when you are no longer learning the material for the first time." },
  { lead: "Review and repeat.", rest: "Each attempt should point at your current weakest area, not only a higher score." },
];

const mistakes = [
  "Taking a timed test before any subject foundation. A low score then mostly discourages you without teaching much.",
  "Treating one attempt as a final verdict on readiness.",
  "Retaking immediately without reviewing what went wrong.",
  "Ignoring pacing because the score looked acceptable, even when questions were rushed or left blank.",
  "Repeating the same test with no study in between, which mostly measures memorization.",
  "Assuming this mock matches your exact MOD post, especially a technical or specialist paper.",
];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function netScore(answers) {
  let correct = 0;
  let wrong = 0;
  let blank = 0;
  modMcqs.forEach((q) => {
    const picked = answers[q.id];
    if (!picked) blank += 1;
    else if (picked === q.correct) correct += 1;
    else wrong += 1;
  });
  const net = Math.round((correct - wrong * PENALTY) * 100) / 100;
  return { correct, wrong, blank, net };
}

export default function ModOnlineTest() {
  const [openFaq, setOpenFaq] = useState(0);
  const [phase, setPhase] = useState("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setHistory(saved.slice(0, 5));
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    if (phase !== "active") return undefined;
    if (secondsLeft <= 0) {
      finish(answers, 0);
      return undefined;
    }
    const timer = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, secondsLeft]);

  function finish(finalAnswers, remaining) {
    const result = netScore(finalAnswers);
    const entry = {
      ...result,
      total: modMcqs.length,
      secondsUsed: TOTAL_SECONDS - remaining,
      at: new Date().toISOString(),
    };
    const next = [entry, ...history].slice(0, 5);
    setHistory(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage can be blocked; the on-screen result still shows */
    }
    setPhase("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function start() {
    setAnswers({});
    setIndex(0);
    setSecondsLeft(TOTAL_SECONDS);
    setPhase("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const question = modMcqs[index];
  const result = phase === "review" ? netScore(answers) : null;

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Online Tests", path: "/online-tests" },
              { name: "MOD" },
            ]}
            variant="light"
          />
          <Link
            href="/online-tests"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All Online Tests
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 mb-2">
            Ministry of Defence · Free practice mock
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            MOD Online Test – Timed Mock Practice for Ministry of Defence Screening
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed mb-6">
            A free 15-minute mock of 30 questions covering General Knowledge, Pakistan Studies, current
            affairs, English, basic reasoning, and Islamic Studies. It is practice built from our MOD MCQs,
            not an official MOD paper.
          </p>
          {phase === "intro" && (
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50"
            >
              Start 15-minute mock <FaArrowRight size={11} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-8 pb-16 space-y-8">
        {phase === "active" && question && (
          <section className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Question {index + 1} of {modMcqs.length}
              </p>
              <p className={`text-sm font-black tabular-nums ${secondsLeft < 60 ? "text-red-600" : "text-[#1565C0]"}`}>
                {formatTime(secondsLeft)}
              </p>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-2">{question.category}</p>
            <h2 className="text-lg font-black text-slate-900 mb-4">{question.question}</h2>
            <div className="grid gap-2">
              {question.options.map((opt) => {
                const selected = answers[question.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: opt.key }))}
                    className={`text-left rounded-xl border px-4 py-3 text-sm ${
                      selected ? "border-[#1565C0] bg-blue-50 font-bold text-slate-900" : "border-slate-100 bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="font-black mr-2">{opt.key}.</span>
                    {opt.text}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => setIndex((value) => value - 1)}
                className="text-sm font-bold text-slate-600 disabled:opacity-40"
              >
                Previous
              </button>
              {index < modMcqs.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setIndex((value) => value + 1)}
                  className="inline-flex items-center gap-2 bg-[#1565C0] text-white text-sm font-bold px-4 py-2.5 rounded-xl"
                >
                  Next <FaArrowRight size={11} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => finish(answers, secondsLeft)}
                  className="bg-emerald-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl"
                >
                  Submit test
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-4">
              {Object.keys(answers).length} answered · blank scores 0 · wrong answer −{PENALTY}
            </p>
          </section>
        )}

        {phase === "review" && result && (
          <section className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
            <h2 className="text-xl font-black text-slate-900 mb-2">Your result</h2>
            <p className="text-3xl font-black text-[#1565C0] mb-4">
              {result.net} <span className="text-base font-bold text-slate-400">/ {modMcqs.length}</span>
            </p>
            <p className="text-sm text-slate-600 mb-5">
              {result.correct} correct · {result.wrong} wrong (−{PENALTY} each) · {result.blank} left blank.
              This is a practice score, not an official MOD result.
            </p>
            <div className="space-y-3 mb-6">
              {modMcqs.map((q) => {
                const picked = answers[q.id];
                const ok = picked === q.correct;
                return (
                  <div key={q.id} className="rounded-xl border border-slate-100 px-4 py-3 text-sm">
                    <p className="font-bold text-slate-900">{q.id}. {q.question}</p>
                    <p className={ok ? "text-emerald-700 mt-1" : "text-slate-600 mt-1"}>
                      Your answer: {picked || "blank"} · Correct: {q.correct}
                    </p>
                    <p className="text-slate-500 mt-1">{q.explanation}</p>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setPhase("intro")}
              className="text-sm font-bold text-[#1565C0]"
            >
              Back to the guide
            </button>
          </section>
        )}

        {phase === "intro" && (
          <>
            <section className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-8">
              <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-3">This mock</h2>
              <div className="grid sm:grid-cols-3 gap-3 mb-5">
                {[
                  ["30", "questions"],
                  ["15 min", "time limit"],
                  ["−0.25", "per wrong answer"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                    <p className="text-lg font-black text-slate-900">{value}</p>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                The timer cannot be paused. Your last five scores stay in this browser. If the subjects are
                still new, start with{" "}
                <Link href="/mcqs/mod" className="font-bold text-[#1565C0] hover:underline">
                  MOD MCQs
                </Link>{" "}
                before a timed attempt.
              </p>
              {history.length > 0 && (
                <ul className="text-sm text-slate-600 space-y-1">
                  {history.map((item) => (
                    <li key={item.at}>
                      {new Date(item.at).toLocaleString()} — net {item.net}/{item.total} ({item.correct} correct, {item.wrong} wrong)
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <Guide
              openFaq={openFaq}
              setOpenFaq={setOpenFaq}
            />
          </>
        )}
      </div>
    </div>
  );
}

function Guide({ openFaq, setOpenFaq }) {
  return (
    <>
      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
          <p>
            Knowing an answer and selecting it while the clock is running are different skills. This mock is
            the closest practice available here to a Ministry of Defence screening sitting: a full set of
            questions and a fixed time.
          </p>
          <p>
            It uses the general subjects commonly reported for MOD&apos;s screening format. It is not an official
            MOD test, and it does not cover engineering, IT, or medical subject papers.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Why Timed Practice Matters</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Recent general recruitment drives have used an objective MCQ paper, and at least one large
          advertisement reportedly used negative marking. That habit is hard to build by reading MCQs with no clock.
        </p>
        <ul className="space-y-3 text-sm text-slate-600">
          {whyTimed.map((item) => (
            <li key={item} className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">How to Use This Online Test</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          {howToUse.map((item) => (
            <li key={item} className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">What to Expect from MOD&apos;s Screening Format</h2>
        <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
          <p>MOD does not publish one format the way FPSC does. From publicly reported drives, expect:</p>
          <ul className="space-y-2">
            {[
              "An objective multiple-choice paper for general and BPS-scale posts.",
              "Possible negative marking — confirm this on your own advertisement. This mock uses a 0.25 penalty so you can practice that habit.",
              "General subjects for general posts, plus technical content for engineering, IT, medical, and other specialist roles. This mock covers only the general subjects.",
              "A time limit. This practice paper allows 15 minutes. Your real paper may differ.",
            ].map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">A Complete MOD Preparation Routine</h2>
        <ol className="space-y-3">
          {routine.map((step, i) => (
            <li key={step.lead} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="font-black text-[#1565C0] shrink-0">{i + 1}.</span>
              <span>
                <strong className="text-slate-900">{step.lead}</strong>{" "}
                {step.href ? (
                  <Link href={step.href} className="font-bold text-[#1565C0] hover:underline">
                    {step.label}
                  </Link>
                ) : null}{" "}
                {step.rest}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Common Mistakes</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          {mistakes.map((item) => (
            <li key={item} className="flex gap-2 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {modOnlineTestFaqs.map((faq, i) => {
            const open = openFaq === i;
            return (
              <div key={faq.q} className="border border-slate-100 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-slate-50 hover:bg-slate-100/80"
                  aria-expanded={open}
                >
                  <span className="text-sm font-bold text-slate-900">{i + 1}. {faq.q}</span>
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
          This online test is a preparation resource built around generally reported MOD screening patterns.
          It is not an official MOD product. Confirm your format, time limit, and marking scheme from the
          official advertisement and admission notice. Also see{" "}
          <Link href="/jobs" className="font-bold text-[#1565C0] hover:underline">
            latest jobs
          </Link>{" "}
          for current openings.
        </p>
      </section>
    </>
  );
}
