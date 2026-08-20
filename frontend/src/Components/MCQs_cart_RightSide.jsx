"use client";

import api from "../utils/api";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp, FaThList } from "react-icons/fa";

const idStr = (id) => (id ? String(id) : null);

export default function MCQs_cart_RightSide({ className = "" }) {
  const [mcqDataCategory, setMcqDataCategory] = useState([]);
  const [openMenu, setOpenMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const fetchAndFormatCategories = async () => {
      try {
        const res = await api.get("/categories/all");
        const dbData = res.data;
        const sortedData = [...dbData].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        const parents = sortedData.filter((cat) => !cat.parent);

        const formatted = parents.map((parent) => ({
          id: parent._id,
          name: parent.name,
          slug: parent.slug,
          subCategories: sortedData
            .filter((child) => idStr(child.parent) === idStr(parent._id))
            .map((child) => ({
              id: child._id,
              name: child.name,
              slug: child.slug,
            })),
        }));

        setMcqDataCategory(formatted);

        const initialOpenState = {};
        formatted.forEach((cat) => {
          initialOpenState[cat.name] = window.innerWidth >= 768;
        });
        setOpenMenu(initialOpenState);
      } catch (err) {
        console.error("Error fetching dynamic categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAndFormatCategories();
  }, []);

  const toggleDropdown = (menuName) => {
    if (!isDesktop) {
      setOpenMenu((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-400 text-sm animate-pulse bg-white rounded-2xl border border-slate-100 shadow-xl">
        Loading Subjects…
      </div>
    );
  }

  return (
    <div className={`${className} w-full`}>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden w-full mb-4 flex items-center justify-between bg-[#1565C0] text-white px-5 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-2">
          <FaThList /> <span>All Categories</span>
        </div>
        {isMobileMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      <div className={`${isMobileMenuOpen ? "block" : "hidden"} lg:block`}>
        <div className="bg-white shadow-xl rounded-2xl p-5 border border-slate-100">
          <div className="flex items-center gap-2 mb-5 border-b border-slate-100 pb-3">
            <div className="w-1 h-5 bg-[#1565C0] rounded-full" />
            <h3 className="text-[#1565C0] font-black text-[12px] uppercase tracking-widest">
              Main Subjects
            </h3>
          </div>

          {mcqDataCategory.length > 0 ? (
            mcqDataCategory.map((category) => (
              <div key={category.id} className="mb-4 last:mb-0">
                <div
                  className={`flex justify-between items-center px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    isDesktop
                      ? "bg-blue-50/50 cursor-default"
                      : "bg-slate-50 cursor-pointer hover:bg-blue-50"
                  }`}
                  onClick={() => toggleDropdown(category.name)}
                >
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={(e) => {
                      if (!isDesktop) e.stopPropagation();
                    }}
                    className="font-bold text-[13px] text-slate-800 uppercase tracking-tighter hover:text-[#1565C0] transition-colors"
                  >
                    {category.name}
                  </Link>
                  {!isDesktop && (
                    <span className="text-[10px] text-blue-600">
                      {openMenu[category.name] ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  )}
                </div>

                {(openMenu[category.name] || isDesktop) && (
                  <div className="mt-2 flex flex-col gap-0.5 border-l-2 border-blue-100 ml-4">
                    {category.subCategories.length > 0 ? (
                      category.subCategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${sub.slug || (sub.name || "").replace(/\s+/g, "-").toLowerCase()}`}
                          onClick={() => {
                            if (!isDesktop) setIsMobileMenuOpen(false);
                          }}
                          className="px-4 py-2 text-gray-600 text-[12px] font-bold hover:text-[#1565C0] hover:bg-blue-50 rounded-r-lg transition-all border-l-2 border-transparent hover:border-[#1565C0]"
                        >
                          {sub.name}
                        </Link>
                      ))
                    ) : (
                      <p className="text-[10px] text-gray-400 px-4 py-1 italic">No sub-topics</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-xs text-center py-6">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
