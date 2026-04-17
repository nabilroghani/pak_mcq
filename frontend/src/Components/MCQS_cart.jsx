import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MCQs_cart_RightSide from "./MCQs_cart_RightSide.jsx";
import MCQs_Cart_leftSide from "./MCQs_Cart_leftSide.jsx";

// Images Imports
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

export default function MCQS_cart({ defaultSlug }) {
  const { categoryName } = useParams();
  const [subCats, setSubCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeSlug = categoryName || defaultSlug || "pak-current-affairs";
  const currentCategoryLower = categoryName?.toLowerCase();

  const bannerImages = {
    "pak-current-affairs": pakCurrentAffairs,
    "general-knowledge": GK, "gk": GK,
    "islamic-studies": islamicStudy, "islamiat-studies": islamicStudy, "is": islamicStudy,
    "pak-study": pakStudy, "pakistan-studies": pakStudy,
    "world-current-affairs": worldAffairs,
    "chemistry": chemistery, "biology": biology, "physics": physics,
    "everyday-science": everydayScience, "computer": computerScience,
    "english": english, "urdu": urdu, "mathematics": math, "math": math
  };

  const showBanner = currentCategoryLower && bannerImages[currentCategoryLower];

  const getSubjectName = () => {
    if (!categoryName) return "Latest MCQs";
    const cleanSlug = categoryName.toLowerCase().trim();
    const subjectMap = {
      "pak-current-affairs": "Pakistan Current Affairs",
      "general-knowledge": "General Knowledge",
      "gk": "General Knowledge",
      "islamic-studies": "Islamic Studies",
      "pak-study": "Pakistan Studies",
      "chemistry": "Chemistry", "biology": "Biology", "physics": "Physics",
      "computer-science": "Computer Science", "urdu-mcqs": "Urdu", "math": "Mathematics"
    };
    return subjectMap[cleanSlug] || categoryName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!categoryName) { setSubCats([]); setLoading(false); return; }
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/categories/all");
        const currentCat = res.data.find((c) => c.slug.toLowerCase() === categoryName.toLowerCase());
        if (currentCat) {
          const filtered = res.data.filter((c) => c.parent === currentCat._id);
          setSubCats(filtered);
        }
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchSubCategories();
  }, [categoryName]);

  const getDotColor = (index) => {
    const col = index % 3;
    if (col === 0) return "bg-emerald-500";
    if (col === 1) return "bg-amber-400";
    return "bg-blue-500";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-1 md:px-4 py-6">
        
        {/* 1. BANNER */}
        {showBanner && (
          <div className="relative w-full h-[250px] md:h-[280px] rounded-none md:rounded-[2rem] overflow-hidden mb-10 shadow-2xl border-b md:border border-gray-100 bg-gray-100">
            <img
              src={bannerImages[currentCategoryLower]}
              className="w-full h-full object-cover object-center" 
              alt="Subject Banner"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-8">
               <h1 className="text-white text-3xl md:text-5xl font-black drop-shadow-2xl uppercase tracking-tighter leading-tight">
                 {getSubjectName()}
               </h1>
            </div>
          </div>
        )}

        {/* 3. SUB-CATEGORIES SECTION */}
        {categoryName && !loading && subCats.length > 0 && (
          <div className="bg-white rounded-none md:rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
            {/* Title Background Blue and Original Name */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-5 text-center">
              <h2 className="text-white font-black uppercase tracking-[0.2em] text-sm md:text-lg">
                {getSubjectName()} Sub-Topics
              </h2>
            </div>
            
            <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-3">
              {[...subCats].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((item, index) => (
                <Link 
                  key={item._id} 
                  to={`/category/${item.slug}`} 
                  className="flex items-center gap-3 py-2.5 group border-b border-slate-50 hover:border-blue-100 transition-all"
                >
                  {/* Colored Dots */}
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${getDotColor(index)} shadow-sm group-hover:scale-125 transition-transform`}></div>
                  
                  <span className="text-slate-700 font-bold text-[14px] flex-1 leading-tight group-hover:text-blue-700">
                    {item.name} MCQs
                  </span>
                  
                  <span className="text-slate-300 group-hover:text-blue-600 transition-colors">❯</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 4. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-8 w-full">
            <MCQs_Cart_leftSide key={activeSlug} categorySlug={activeSlug} />
          </div>
          <div className="hidden lg:block lg:col-span-4 w-full sticky top-[100px]">
            <MCQs_cart_RightSide />
          </div>
        </div>
      </div>
    </div>
  );
}