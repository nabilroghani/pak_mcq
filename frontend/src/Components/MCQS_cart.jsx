import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MCQs_cart_RightSide from "./MCQs_cart_RightSide.jsx";
import MCQs_Cart_leftSide from "./MCQs_Cart_leftSide.jsx";

// Images Import (Make sure paths are correct relative to this file)
import pakCurrentAffairs from "../../public/images/2.png";
import GK from "../../public/images/3.png";
import islamicStudy from "../../public/images/6.png";
import pakStudy from "../../public/images/9.png";

export default function MCQS_cart({ defaultSlug }) {
  const { categoryName } = useParams();
  const [subCats, setSubCats] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeSlug = categoryName || defaultSlug || "pak-current-affairs";

  // Banner Images Mapping
  const bannerImages = {
    "gk": GK,
    "general-knowledge": GK,
    "pak-study": pakStudy,
    "pak-current-affairs": pakCurrentAffairs,
    "is": islamicStudy,
    "islamic-studies": islamicStudy,
    "islamiat-studies": islamicStudy,
  };

  // Check: Agar categoryName 'bannerImages' object ki kisi bhi key se match kare
  const currentCategoryLower = categoryName?.toLowerCase();
  const showBanner = currentCategoryLower && bannerImages[currentCategoryLower];

  const getSubjectName = () => {
    if (!categoryName) return "Latest MCQs";
    const cleanSlug = categoryName.toLowerCase().trim();
    const subjectMap = {
      "general-knowledge": "General Knowledge",
      "gk": "General Knowledge",
      "pak-study": "Pakistan Studies",
      "islamic-studies": "Islamiat Studies",
      "is": "Islamiat Studies",
      "english": "English", 
      "computer-science": "Computer Science",
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
        // Case-insensitive search for current category
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
      // FIX: 'object-top' image ko oopar se dikhayega, 'object-center' ya 'object-bottom' bhi try kar sakte hain
      className="w-full h-full object-cover object-[center_top_20%]" 
      alt="Subject Banner"
      onError={(e) => { e.target.style.display = 'none'; }}
    />
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