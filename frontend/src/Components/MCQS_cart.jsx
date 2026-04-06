import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MCQs_cart_RightSide from "./MCQs_cart_RightSide.jsx";
import MCQs_Cart_leftSide from "./MCQs_Cart_leftSide.jsx";

// defaultSlug prop add ki gayi hai
export default function MCQS_cart({ defaultSlug }) {
  const { categoryName } = useParams();
  const [subCats, setSubCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeSlug = categoryName || defaultSlug || "pak-current-affairs";

  const getSubjectName = () => {
    if (!categoryName) return "Latest MCQs";
    
    const cleanSlug = categoryName.toLowerCase().trim().replace(/-/g, " ");

    const subjectMap = {
      "gk": "General Knowledge",
      "gk mcqs": "General Knowledge",
      "pak study": "Pakistan Studies",
      "pak-study": "Pakistan Studies",
      "ca": "Current Affairs",
      "is": "Islamiat Studies",
      "eng": "English Grammar", 
      "cs": "Computer Science",
      "math": "Mathematics",
      "asf ad": "Assistant Director & Airports Security Force"
    };

    if (subjectMap[cleanSlug]) {
      return subjectMap[cleanSlug];
    }

    return categoryName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      // Logic: Agar categoryName nahi hai (yani Home page), toh fetch skip karo
      if (!categoryName) {
        setSubCats([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/categories/all");
        const currentCat = res.data.find(
          (c) => c.slug.toLowerCase() === categoryName?.toLowerCase()
        );
        if (currentCat) {
          const filtered = res.data.filter((c) => c.parent === currentCat._id);
          setSubCats(filtered);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchSubCategories();
  }, [categoryName]);

  const bannerImages = {
    math: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000",
    "pak-study": "https://images.unsplash.com/photo-1527359443443-84a48abc7dfd?auto=format&fit=crop&w=1000",
    default: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000",
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* --- BANNER SECTION: Sirf Category pages par dikhega --- */}
        {categoryName && (
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-6 shadow-md">
            <img
              src={bannerImages[categoryName?.toLowerCase()] || bannerImages["default"]}
              className="w-full h-full object-cover"
              alt="Banner"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center pl-10">
              <h1 className="text-white text-4xl font-black uppercase tracking-tight">
                {getSubjectName()}
              </h1>
            </div>
          </div>
        )}

        {/* --- SUB-CATEGORIES TABLE: Home page par categoryName khali hoga toh ye hide rahega --- */}
        {categoryName && !loading && subCats.length > 0 && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] p-4 text-center">
              <h2 className="text-white font-bold uppercase tracking-widest text-lg">
                {getSubjectName()}
              </h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...subCats]
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((item, index) => (
                  <Link
                    key={item._id}
                    to={`/category/${item.slug}`}
                    className="flex justify-between items-center px-4 py-3 border-2 border-blue-100 rounded-full hover:border-blue-500 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-sm ${index % 3 === 0 ? "bg-green-500" : index % 3 === 1 ? "bg-orange-400" : "bg-blue-600"}`}></div>
                      <span className="text-gray-800 font-bold text-sm">
                        {item.name} MCQs
                      </span>
                    </div>
                    <span className="text-blue-300 group-hover:text-blue-600 transition-colors text-xs">❯</span>
                  </Link>
                ))}
            </div>
          </div>
        )}

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