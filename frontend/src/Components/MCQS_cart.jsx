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

  // --- 1. BANNER IMAGES MAPPING (All Subjects Included) ---
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

  const currentCategoryLower = categoryName?.toLowerCase();
  const showBanner = currentCategoryLower && bannerImages[currentCategoryLower];

  // --- 2. SUBJECT NAMES MAPPING (For Headings) ---
  const getSubjectName = () => {
    if (!categoryName) return "Latest MCQs";
    const cleanSlug = categoryName.toLowerCase().trim();
    
    const subjectMap = {
      "pak-current-affairs": "Pakistan Current Affairs",
      "general-knowledge": "General Knowledge",
      "gk": "General Knowledge",
      "islamic-studies": "Islamic Studies",
      "is": "Islamiat Studies",
      "pak-study": "Pakistan Studies",
      "pakistan-studies": "Pakistan Studies",
      "world-current-affairs": "World Current Affairs",
      "chemistry": "Chemistry",
      "biology": "Biology",
      "physics": "Physics",
      "everyday-science": "Everyday Science",
      "computer-science": "Computer Science",
      "english": "English",
      "urdu-mcqs": "Urdu",
      "mathematics": "Mathematics",
      "math": "Mathematics"
    };
    
    // Agar map mein naam nahi milta to slug ko format karke dikhayega
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
        // Check current category match
        const currentCat = res.data.find(
          (c) => c.slug.toLowerCase() === categoryName.toLowerCase()
        );
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
        
        {/* --- BANNER SECTION --- */}
        {showBanner && (
          <div className="relative w-full h-[250px] rounded-2xl overflow-hidden mb-8 shadow-lg border border-gray-100">
            <img
              src={bannerImages[currentCategoryLower]}
              className="w-full h-full object-cover object-[center_top_20%]" 
              alt={`${getSubjectName()} Banner`}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {/* Optional Overlay Text on Banner */}
            <div className="absolute inset-0 bg-black/10 flex items-end p-6">
               <h1 className="text-white text-3xl font-black drop-shadow-lg uppercase tracking-tighter">
                 {getSubjectName()}
               </h1>
            </div>
          </div>
        )}

        {/* --- SUB-CATEGORIES SECTION --- */}
        {categoryName && !loading && subCats.length > 0 && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] p-4 text-center">
              <h2 className="text-white font-bold uppercase tracking-widest text-lg">
                {getSubjectName()} Topics
              </h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...subCats]
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((item, index) => (
                  <Link
                    key={item._id}
                    to={`/category/${item.slug}`}
                    className="flex justify-between items-center px-4 py-3 border-2 border-blue-500/10 rounded-full hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${index % 3 === 0 ? "bg-green-500" : index % 3 === 1 ? "bg-orange-400" : "bg-blue-600"}`}></div>
                      <span className="text-gray-700 font-bold text-sm group-hover:text-blue-700">
                        {item.name} MCQs
                      </span>
                    </div>
                    <span className="text-blue-300 group-hover:text-blue-600 transition-colors text-xs">❯</span>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* --- MAIN CONTENT AREA --- */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.3fr] gap-8 items-start">
          <div className="w-full">
            <MCQs_Cart_leftSide
              key={activeSlug}
              categorySlug={activeSlug}
            />
          </div>
          <div className="w-full">
            <MCQs_cart_RightSide />
          </div>
        </div>
      </div>
    </div>
  );
}