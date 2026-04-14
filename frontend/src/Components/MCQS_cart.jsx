import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MCQs_cart_RightSide from "./MCQs_cart_RightSide.jsx";
import MCQs_Cart_leftSide from "./MCQs_Cart_leftSide.jsx";

// Images Imports
import pakCurrentAffairs from "../../public/images/1.png";
import GK from "../../public/images/2.png";
import islamicStudy from "../../public/images/3.png";
import pakStudy from "../../public/images/4.png";
import worldAffairs from "../../public/images/5.png";
import chemistery from "../../public/images/6.png";
import biology from "../../public/images/7.png";
import physics from "../../public/images/8.png";
import everydayScience from "../../public/images/9.png";
import computerScience from "../../public/images/10.png";
import english from "../../public/images/12.png";
import urdu from "../../public/images/13.png";
import math from "../../public/images/14.png";

export default function MCQS_cart({ defaultSlug }) {
  const { categoryName } = useParams();
  const [subCats, setSubCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeSlug = categoryName || defaultSlug || "pak-current-affairs";
  const currentCategoryLower = categoryName?.toLowerCase();

  const bannerImages = {
    "pak-current-affairs": pakCurrentAffairs,
    "general-knowledge": GK,
    "gk": GK,
    "islamic-studies": islamicStudy,
    "islamiat-studies": islamicStudy,
    "is": islamicStudy,
    "pak-study": pakStudy,
    "pakistan-studies": pakStudy,
    "world-current-affairs": worldAffairs,
    "chemistry": chemistery,
    "biology": biology,
    "physics": physics,
    "everyday-science": everydayScience,
    "computer-science": computerScience,
    "english": english,
    "urdu-mcqs": urdu,
    "mathematics": math,
    "math": math
  };

  const showBanner = currentCategoryLower && bannerImages[currentCategoryLower];

  // --- Optimization: Preload image for instant display ---
  useEffect(() => {
    if (showBanner) {
      const img = new Image();
      img.src = bannerImages[currentCategoryLower];
    }
  }, [currentCategoryLower, showBanner]);

  const getSubjectName = () => {
    if (!categoryName) return "Latest MCQs";
    const cleanSlug = categoryName.toLowerCase().trim();
    const subjectMap = {
      "pak-current-affairs": "Pakistan Current Affairs",
      "general-knowledge": "General Knowledge",
      "gk": "General Knowledge",
      "islamic-studies": "Islamic Studies",
      "pak-study": "Pakistan Studies",
      "chemistry": "Chemistry",
      "biology": "Biology",
      "physics": "Physics",
      "computer-science": "Computer Science",
      "urdu-mcqs": "Urdu",
      "math": "Mathematics"
    };
    return subjectMap[cleanSlug] || categoryName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!categoryName) {
        setSubCats([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/categories/all");
        const currentCat = res.data.find((c) => c.slug.toLowerCase() === categoryName.toLowerCase());
        if (currentCat) {
          const filtered = res.data.filter((c) => c.parent === currentCat._id);
          setSubCats(filtered);
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
      setLoading(false);
    };
    fetchSubCategories();
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* --- 1. OPTIMIZED BANNER SECTION --- */}
        {showBanner && (
          <div className="relative w-full h-[180px] md:h-[280px] rounded-[2rem] overflow-hidden mb-10 shadow-2xl border border-gray-100 bg-gray-100">
            <img
              src={bannerImages[currentCategoryLower]}
              className="w-full h-full object-cover object-center" 
              alt="Subject Banner"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8">
               <h1 className="text-white text-3xl md:text-5xl font-black drop-shadow-2xl uppercase tracking-tighter">
                 {getSubjectName()}
               </h1>
            </div>
          </div>
        )}



        {/* --- 3. SUB-CATEGORIES SECTION --- */}
        {categoryName && !loading && subCats.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-5 text-center">
              <h2 className="text-white font-black uppercase tracking-[0.2em] text-sm md:text-lg">
                {getSubjectName()} Sub-Topics
              </h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[...subCats].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((item, index) => (
                <Link key={item._id} to={`/category/${item.slug}`} className="flex justify-between items-center px-5 py-4 border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${index % 3 === 0 ? "bg-emerald-500" : index % 3 === 1 ? "bg-amber-500" : "bg-blue-600"}`}></div>
                    <span className="text-slate-700 font-bold text-sm group-hover:text-blue-700">{item.name} MCQs</span>
                  </div>
                  <span className="text-slate-300 group-hover:text-blue-600 transition-colors">❯</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* --- 4. MAIN CONTENT AREA --- */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.3fr] gap-10 items-start">
          <div className="w-full">
            <MCQs_Cart_leftSide key={activeSlug} categorySlug={activeSlug} />
          </div>
          <div className="w-full sticky top-6">
            <MCQs_cart_RightSide />
          </div>
        </div>
      </div>
    </div>
  );
}