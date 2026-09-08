"use client";

import React, { useState, useEffect } from "react";
import api from "../utils/api.js";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LuBookOpen, LuChevronRight } from "react-icons/lu";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import MCQs_cart_RightSide from "./MCQs_cart_RightSide.jsx";
import MCQs_Cart_leftSide from "./MCQs_Cart_leftSide.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { examCategoryMap } from "../data/siteStructure";
import { kppscExamCategories } from "../data/kppscExamCategories";
import { imgSrc } from "../utils/imgSrc";
import {
  gkCategoryFaqs,
  gkTopicAreas,
  gkPreparationTips,
} from "../data/gkCategoryContent";


import pakCurrentAffairs from "../assets/1.webp";
import GK from "../assets/2.webp";
import islamicStudy from "../assets/3.webp";
import pakStudy from "../assets/4.webp";
import worldAffairs from "../assets/5.webp";
import chemistery from "../assets/6.webp";
import biology from "../assets/7.webp";
import physics from "../assets/8.webp";
import everydayScience from "../assets/9.webp";
import computerScience from "../assets/10.webp";
import english from "../assets/12.webp";
import urdu from "../assets/13.webp";
import math from "../assets/14.webp";
import kppscBanner from "../assets/kppsc.png";

const idStr = (id) => (id ? String(id) : null);

const bannerImages = {
  "kppsc-exams": kppscBanner,
  kppsc: kppscBanner,
  "pak-current-affairs": pakCurrentAffairs,
  "general-knowledge": GK,
  gk: GK,
  "islamic-studies": islamicStudy,
  "islamiat-studies": islamicStudy,
  is: islamicStudy,
  "pak-study": pakStudy,
  "pakistan-studies": pakStudy,
  "world-current-affairs": worldAffairs,
  chemistry: chemistery,
  biology,
  physics,
  "everyday-science": everydayScience,
  computer: computerScience,
  "computer-science": computerScience,
  english,
  urdu,
  mathematics: math,
  math,
};

const subjectMap = {
  "pak-current-affairs": "Pakistan Current Affairs",
  "general-knowledge": "General Knowledge",
  gk: "General Knowledge",
  "islamic-studies": "Islamic Studies",
  "pak-study": "Pakistan Studies",
  chemistry: "Chemistry",
  biology: "Biology",
  physics: "Physics",
  "computer-science": "Computer Science",
  "urdu-mcqs": "Urdu",
  math: "Mathematics",
};

const KPPSC_SLUGS = new Set(["kppsc-exams", "kppsc"]);

function getDotColor(index) {
  const col = index % 3;
  if (col === 0) return "bg-emerald-500";
  if (col === 1) return "bg-amber-400";
  return "bg-blue-500";
}

// ─── General Knowledge SEO Content Section ───────────────────────────────────

function GKSeoContent() {
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <div className="space-y-6 mt-6">
      {/* Intro */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
          General Knowledge MCQs – Practice for Competitive Exams
        </h2>
        <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
          <p>
            General Knowledge is one of the few subjects that shows up in almost every major competitive exam in Pakistan — FPSC, PPSC, KPPSC, NTS, and most other public service commission tests include it in some form, usually as an objective-type paper. What makes it tricky isn&apos;t the difficulty of any single question; it&apos;s the sheer range of topics it can draw from, which is why candidates often either over-prepare narrow areas or under-prepare broad ones.
          </p>
          <p>
            Browse the categories above to start practicing, or read on for a short breakdown of what General Knowledge actually covers and how to prepare it efficiently.
          </p>
        </div>
      </section>

      {/* What GK Covers */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
          What &quot;General Knowledge&quot; Usually Covers
        </h2>
        <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed mb-5">
          General Knowledge papers commonly draw from a mix of the following areas, though exact weightage and topic selection vary by exam and post:
        </p>
        <ul className="space-y-3">
          {gkTopicAreas.map((area) => (
            <li key={area.title} className="flex gap-3 items-start">
              <FaCheck className="text-emerald-500 mt-0.5 shrink-0" size={12} />
              <span className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-900">{area.title}</strong> — {area.desc}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-slate-500 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-4">
          Not every exam tests all of these equally — some posts lean heavily on world geography and organizations, others focus more on Pakistan-specific content. If you&apos;re preparing for a specific exam, it&apos;s worth checking that exam&apos;s syllabus or past papers to see which areas actually get tested, rather than trying to cover everything with equal effort.
        </p>
      </section>

      {/* Why GK is hard to finish */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
          Why General Knowledge Is Hard to &quot;Finish&quot; Studying
        </h2>
        <div className="space-y-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
          <p>
            Unlike a subject with a fixed syllabus — say, a specific chapter of Pakistan Studies — General Knowledge doesn&apos;t have a clear endpoint. There&apos;s always another country, another organization, another fact you haven&apos;t covered. That&apos;s normal, and it&apos;s not a sign you&apos;re behind. The more realistic goal is broad, consistent familiarity built over time, rather than trying to memorize an exhaustive list before your exam.
          </p>
          <p>
            This is also why candidates who study General Knowledge in short, regular sessions over weeks tend to retain more than those who try to cram it in the final few days — the subject rewards repeated, spaced exposure more than intensive last-minute review.
          </p>
        </div>
      </section>

      {/* How to Prepare */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-5">
          How to Prepare General Knowledge Efficiently
        </h2>
        <div className="space-y-4">
          {gkPreparationTips.map((tip) => (
            <article
              key={tip.title}
              className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5"
            >
              <h3 className="text-sm font-black text-[#1565C0] mb-1">{tip.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{tip.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Related Resources */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
          Related Practice Resources
        </h2>
        <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed mb-5">
          Once you&apos;ve worked through the General Knowledge MCQs on this page, a few resources can help you build on that foundation:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              name: "KPPSC Exam Guide",
              path: "/government-exams/kppsc",
              desc: "See how General Knowledge fits into that exam's overall syllabus and weightage.",
            },
            {
              name: "Current Affairs",
              path: "/current-affairs",
              desc: "Pairs naturally with static GK — the two subjects often overlap in real exam papers.",
            },
            {
              name: "All Subject MCQs",
              path: "/mcqs",
              desc: "Compare how GK weightage differs from other subjects across various exams.",
            },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="group flex flex-col gap-2 rounded-xl px-4 py-4 bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/60 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900 group-hover:text-[#1565C0]">
                  {link.name}
                </span>
                <LuChevronRight size={14} className="text-slate-300 group-hover:text-[#1565C0] transition-colors" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {gkCategoryFaqs.map((faq, i) => {
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
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm">
        <p className="text-sm text-slate-500 leading-relaxed">
          This page and its MCQs are practice resources compiled by PakLearners for exam preparation, <strong className="text-slate-700">not official content</strong> from FPSC, PPSC, KPPSC, or any other commission. Always verify exam-specific requirements from the relevant official source.
        </p>
      </section>
    </div>
  );
}

export default function MCQS_cart({ defaultSlug, suppressHeading = false }) {
  const { categoryName } = useParams();
  const [subCats, setSubCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizMode, setQuizMode] = useState(false);

  const activeSlug = categoryName || defaultSlug || "pak-current-affairs";
  const slugLower = activeSlug?.toLowerCase();
  const bannerImage = slugLower ? bannerImages[slugLower] : null;
  const examContext = slugLower ? examCategoryMap[slugLower] : null;
  const isExamCategory = Boolean(examContext);

  const getSubjectName = () => {
    if (examContext) return `${examContext.label} Exams`;
    if (!categoryName && !defaultSlug) return "Latest MCQs";
    const cleanSlug = (categoryName || defaultSlug).toLowerCase().trim();
    return (
      subjectMap[cleanSlug] ||
      (categoryName || defaultSlug).replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

  const getHeroSubtitle = () => {
    if (examContext) return "MCQs and Past Papers";
    return "MCQs and Practice";
  };

  const subjectName = getSubjectName();
  const displaySubCats =
    subCats.length > 0
      ? subCats
      : KPPSC_SLUGS.has(slugLower)
        ? kppscExamCategories
        : [];
  const showExamCategoryGrid = isExamCategory && displaySubCats.length > 0;
  const showMcqSection = !showExamCategoryGrid;
  const bannerHasTitle = isExamCategory && Boolean(bannerImage);

  const breadcrumbItems = examContext
    ? [
        { name: "Home", path: "/" },
        { name: "Government Exams", path: "/government-exams" },
        { name: examContext.label, path: examContext.guidePath },
        { name: `${subjectName} MCQs` },
      ]
    : categoryName
      ? [
          { name: "Home", path: "/" },
          { name: "MCQs", path: "/mcqs" },
          { name: subjectName },
        ]
      : [{ name: "Home", path: "/" }, { name: "MCQs" }];

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!activeSlug) {
        setSubCats([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const res = await api.get("/categories/all");
        const currentCat = res.data.find(
          (c) => c.slug.toLowerCase() === activeSlug.toLowerCase()
        );

        if (currentCat) {
          let filtered = res.data.filter(
            (c) => idStr(c.parent) === idStr(currentCat._id)
          );

          if (filtered.length === 0 && currentCat.parent) {
            filtered = res.data.filter(
              (c) => idStr(c.parent) === idStr(currentCat.parent)
            );
          }

          setSubCats(filtered);
        } else {
          setSubCats([]);
        }
      } catch (err) {
        console.error(err);
        setSubCats([]);
      }

      setLoading(false);
    };

    fetchSubCategories();
  }, [activeSlug]);

  return (
    <div className="min-h-screen bg-slate-50 w-full">
      <div className="w-full max-w-7xl mx-auto px-0 md:px-4">

        {/* Hero Banner */}
        <div className="relative w-full h-[220px] md:h-[280px] rounded-none md:rounded-[2rem] overflow-hidden shadow-2xl border-b border-x-0 md:border border-slate-100 mx-0">
          {bannerImage ? (
            <img
              src={imgSrc(bannerImage)}
              className={`w-full h-full object-cover ${isExamCategory ? "object-top" : "object-center"}`}
              alt={`${subjectName} banner`}
              loading="eager"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900" />
          )}
          <div
            className={`absolute inset-0 flex items-end p-6 md:p-10 ${
              bannerHasTitle
                ? "bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"
                : "bg-gradient-to-t from-black/85 via-black/30 to-transparent"
            }`}
          >
            <div className="w-full">
              {!isExamCategory && (
                <div className="mb-3">
                  <Breadcrumbs items={breadcrumbItems} variant="light" />
                </div>
              )}
              {!bannerHasTitle && !suppressHeading && (
                <>
                  <h1 className="text-white text-2xl md:text-5xl font-black drop-shadow-2xl uppercase tracking-tight leading-tight">
                    {subjectName}
                  </h1>
                  <p className="text-white/75 text-xs md:text-sm font-bold uppercase tracking-[0.15em] mt-2">
                    {getHeroSubtitle()}
                  </p>
                </>
              )}
              {!bannerHasTitle && suppressHeading && (
                <>
                  <p className="text-white text-2xl md:text-5xl font-black drop-shadow-2xl uppercase tracking-tight leading-tight">
                    {subjectName}
                  </p>
                  <p className="text-white/75 text-xs md:text-sm font-bold uppercase tracking-[0.15em] mt-2">
                    {getHeroSubtitle()}
                  </p>
                </>
              )}
              {bannerHasTitle && !suppressHeading && (
                <h1 className="sr-only">{subjectName} — {getHeroSubtitle()}</h1>
              )}
              {examContext && !isExamCategory && (
                <p className="text-white/80 text-xs md:text-sm leading-relaxed mt-3 max-w-2xl normal-case font-medium">
                  {examContext.intro}{" "}
                  <Link href={examContext.guidePath} className="font-bold text-sky-200 hover:text-white underline">
                    View {examContext.label} exam guide
                  </Link>
                  {" · "}
                  <Link href={examContext.pastPapersPath} className="font-bold text-sky-200 hover:text-white underline">
                    {examContext.label} past papers
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="w-full mx-0 px-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-6 md:mt-10 pb-12">
          <div className="w-full min-w-0 mx-0 px-0 lg:col-span-8 space-y-6">

            {/* Sub-Categories Grid */}
            {!loading && displaySubCats.length > 0 && (
              <div className="bg-white rounded-none md:rounded-3xl shadow-xl border border-x-0 md:border border-slate-100 overflow-hidden mx-0">
                <div className="flex items-center justify-between gap-3 px-5 md:px-8 py-5 border-b border-slate-100 bg-white">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 bg-blue-50 rounded-xl shrink-0">
                      <LuBookOpen className="text-[#1565C0]" size={20} />
                    </div>
                    <h2 className="text-slate-800 font-black uppercase tracking-wide text-sm md:text-base truncate">
                      {examContext ? `${examContext.label} Exam Categories` : `${subjectName} Categories`}
                    </h2>
                  </div>
                  {isExamCategory && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuizMode(!quizMode);
                        if (showMcqSection) {
                          setTimeout(() => {
                            document.getElementById("mcq-practice-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }, 100);
                        }
                      }}
                      className={`shrink-0 px-4 py-2 rounded-xl font-bold text-white text-xs md:text-sm shadow-sm transition-all active:scale-95 ${quizMode ? "bg-orange-500 hover:bg-orange-600" : "bg-[#1565C0] hover:bg-blue-700"}`}
                    >
                      {quizMode ? "Switch MCQS Mode" : "Switch QUIZ Mode"}
                    </button>
                  )}
                </div>

                <div className="px-4 py-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1 bg-slate-50/80">
                  {[...displaySubCats]
                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    .map((item, index) => (
                      <Link
                        key={item._id}
                        href={`/category/${item.slug}`}
                        className="flex items-center gap-3 py-3 px-2 rounded-xl group hover:bg-white border-b border-slate-100/80 last:border-0 transition-all"
                      >
                        <div
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${getDotColor(index)} shadow-sm group-hover:scale-125 transition-transform`}
                        />
                        <span className="text-slate-700 font-bold text-[13px] md:text-[14px] flex-1 leading-tight group-hover:text-[#1565C0]">
                          {isExamCategory ? item.name : `${item.name} MCQs`}
                        </span>
                        <LuChevronRight
                          size={16}
                          className="text-slate-300 group-hover:text-[#1565C0] shrink-0 transition-colors"
                        />
                      </Link>
                    ))}
                </div>

                {examContext && (
                  <div className="px-4 pb-4 md:px-8 md:pb-6 bg-slate-50/80">
                    <Link
                      href={examContext.pastPapersPath}
                      className="flex items-center gap-3 py-3 px-2 rounded-xl group hover:bg-white transition-all"
                    >
                      <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-purple-500 shadow-sm group-hover:scale-125 transition-transform" />
                      <span className="text-slate-700 font-bold text-[13px] md:text-[14px] flex-1 leading-tight group-hover:text-[#1565C0]">
                        All {examContext.label} Past Papers
                      </span>
                      <LuChevronRight
                        size={16}
                        className="text-slate-300 group-hover:text-[#1565C0] shrink-0 transition-colors"
                      />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 text-sm animate-pulse">
                Loading categories…
              </div>
            )}

            {/* MCQ List — hidden on exam hub pages that show post categories */}
            {showMcqSection && (
              <div id="mcq-practice-section">
                <MCQs_Cart_leftSide
                  key={activeSlug}
                  categorySlug={activeSlug}
                  quizMode={quizMode}
                  setQuizMode={setQuizMode}
                  hideModeBar={isExamCategory}
                />
              </div>
            )}

            {/* General Knowledge SEO content — renders below MCQs */}
            {slugLower === "general-knowledge" && <GKSeoContent />}
          </div>


          <div className="lg:col-span-4 w-full lg:sticky lg:top-[100px] px-0 md:px-0">
            <MCQs_cart_RightSide />
          </div>
        </div>
      </div>
    </div>
  );
}
