"use client";

import React, { useState, useEffect } from "react";
import api from "../utils/api.js";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LuBookOpen, LuChevronRight } from "react-icons/lu";
import MCQs_cart_RightSide from "./MCQs_cart_RightSide.jsx";
import MCQs_Cart_leftSide from "./MCQs_Cart_leftSide.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { examCategoryMap } from "../data/siteStructure";
import { imgSrc } from "../utils/imgSrc";

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

const idStr = (id) => (id ? String(id) : null);

const bannerImages = {
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

function getDotColor(index) {
  const col = index % 3;
  if (col === 0) return "bg-emerald-500";
  if (col === 1) return "bg-amber-400";
  return "bg-blue-500";
}

export default function MCQS_cart({ defaultSlug }) {
  const { categoryName } = useParams();
  const [subCats, setSubCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeSlug = categoryName || defaultSlug || "pak-current-affairs";
  const currentCategoryLower = categoryName?.toLowerCase();
  const bannerImage = currentCategoryLower ? bannerImages[currentCategoryLower] : null;
  const examContext = currentCategoryLower ? examCategoryMap[currentCategoryLower] : null;

  const getSubjectName = () => {
    if (!categoryName) return "Latest MCQs";
    if (examContext) return `${examContext.label} Exams`;
    const cleanSlug = categoryName.toLowerCase().trim();
    return (
      subjectMap[cleanSlug] ||
      categoryName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

  const getHeroSubtitle = () => {
    if (examContext) return "MCQs and Past Papers";
    return "MCQs and Practice";
  };

  const subjectName = getSubjectName();

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
      if (!categoryName) {
        setSubCats([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const res = await api.get("/categories/all");
        const currentCat = res.data.find(
          (c) => c.slug.toLowerCase() === categoryName.toLowerCase()
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
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-slate-50 w-full">
      <div className="w-full max-w-7xl mx-auto px-0 md:px-4">

        {/* Hero Banner */}
        <div className="relative w-full h-[220px] md:h-[280px] rounded-none md:rounded-[2rem] overflow-hidden shadow-2xl border-b border-x-0 md:border border-slate-100 mx-0">
          {bannerImage ? (
            <img
              src={imgSrc(bannerImage)}
              className="w-full h-full object-cover object-center"
              alt={`${subjectName} banner`}
              loading="eager"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-6 md:p-10">
            <div className="w-full">
              <div className="mb-3">
                <Breadcrumbs items={breadcrumbItems} variant="light" />
              </div>
              <p className="text-orange-300 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] mb-2">
                Pak Learners
              </p>
              <h1 className="text-white text-2xl md:text-5xl font-black drop-shadow-2xl uppercase tracking-tight leading-tight">
                {subjectName}
              </h1>
              <p className="text-white/75 text-xs md:text-sm font-bold uppercase tracking-[0.15em] mt-2">
                {getHeroSubtitle()}
              </p>
              {examContext && (
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
            {categoryName && !loading && subCats.length > 0 && (
              <div className="bg-white rounded-none md:rounded-3xl shadow-xl border border-x-0 md:border border-slate-100 overflow-hidden mx-0">
                <div className="flex items-center gap-3 px-5 md:px-8 py-5 border-b border-slate-100 bg-white">
                  <div className="p-2.5 bg-blue-50 rounded-xl shrink-0">
                    <LuBookOpen className="text-[#1565C0]" size={20} />
                  </div>
                  <h2 className="text-slate-800 font-black uppercase tracking-wide text-sm md:text-base">
                    {examContext ? `${examContext.label} Exam Categories` : `${subjectName} Categories`}
                  </h2>
                </div>

                <div className="px-4 py-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1">
                  {[...subCats]
                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    .map((item, index) => (
                      <Link
                        key={item._id}
                        href={`/category/${item.slug}`}
                        className="flex items-center gap-3 py-3 px-2 rounded-xl group hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-all"
                      >
                        <div
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${getDotColor(index)} shadow-sm group-hover:scale-125 transition-transform`}
                        />
                        <span className="text-slate-700 font-bold text-[13px] md:text-[14px] flex-1 leading-tight group-hover:text-[#1565C0]">
                          {item.name} MCQs
                        </span>
                        <LuChevronRight
                          size={16}
                          className="text-slate-300 group-hover:text-[#1565C0] shrink-0 transition-colors"
                        />
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {categoryName && loading && (
              <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 text-sm animate-pulse">
                Loading categories…
              </div>
            )}

            {/* MCQ List */}
            <MCQs_Cart_leftSide key={activeSlug} categorySlug={activeSlug} />
          </div>

          <div className="lg:col-span-4 w-full lg:sticky lg:top-[100px] px-0 md:px-0">
            <MCQs_cart_RightSide />
          </div>
        </div>
      </div>
    </div>
  );
}
