// import React from "react";
// import MCQs_cart_RightSide from "./MCQs_cart_RightSide.jsx";
// import MCQs_Cart_leftSide from "./MCQs_Cart_leftSide.jsx";

// export default function MCQS_cart() {
//   return (
//     <div className="min-h-screen px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2.5fr_1.3fr] gap-5 items-start">
//         {/* LEFT SIDE */}
//         <div className="w-full">
//           <MCQs_Cart_leftSide />
//         </div>

//         {/* RIGHT SIDE */}
//         <div className=" mt-10 lg:mt-0">
//           <MCQs_cart_RightSide />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MCQs_cart_RightSide from "./MCQs_cart_RightSide.jsx";
import MCQs_Cart_leftSide from "./MCQs_Cart_leftSide.jsx";

export default function MCQS_cart() {
  const { categoryName } = useParams(); // Ye slug lega, e.g., 'pak-study'
  const [subCats, setSubCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        setLoading(true);
        // 1. Pehle sari categories mangwao
        const res = await axios.get("http://localhost:5000/api/categories/all");
        const allCats = res.data;

        // 2. Current category find karo slug ke zariye
        const currentCat = allCats.find(c => c.slug === categoryName);
        
        if (currentCat) {
          // 3. Wo sari categories nikalen jinka parent is current category ki ID hai
          const filtered = allCats.filter(c => c.parent === currentCat._id);
          setSubCats(filtered);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sub-categories:", err);
        setLoading(false);
      }
    };
    fetchSubCategories();
  }, [categoryName]);

  // Banner Images Mapping
  const bannerImages = {
    "math": "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000&auto=format&fit=crop",
    "pak-study": "https://images.unsplash.com/photo-1527359443443-84a48abc7dfd?q=80&w=1000&auto=format&fit=crop",
    "default": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop"
  };

  const currentBanner = bannerImages[categoryName?.toLowerCase()] || bannerImages["default"];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Banner Section */}
        <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-6 shadow-md">
          <img src={currentBanner} className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute inset-0 bg-black/20 flex items-center pl-10">
             <h1 className="text-white text-4xl font-black uppercase drop-shadow-md">
                {categoryName?.replace(/-/g, ' ')}
             </h1>
          </div>
        </div>

        {/* Header Text */}
        <div className="mb-6">
          <p className="text-gray-700 text-sm leading-relaxed">
            {categoryName?.replace(/-/g, ' ')} Mcqs, Get Complete Mcqs of this category for NTS, FPSC, PPSC, SPSC, CSS, PMS Test Preparation.
          </p>
        </div>

        {/* --- DYNAMIC DATABASE MENU TABLE (PakMcqs Style) --- */}
        {!loading && subCats.length > 0 && (
          <div className="border border-gray-200 rounded-md overflow-hidden mb-10 shadow-sm">
            <div className="bg-gray-100 border-b border-gray-200 py-2.5 text-center">
              <h2 className="text-sm font-black text-gray-700 uppercase tracking-widest">
                {categoryName?.replace(/-/g, ' ')} MENU
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {subCats.map((item, index) => (
                <Link
                  key={item._id}
                  to={`/category/${item.slug}`}
                  className={`flex items-center p-3 border-b border-gray-100 hover:bg-blue-50 transition-all ${index % 2 === 0 ? 'md:border-r' : ''}`}
                >
                  <span className="text-gray-400 text-xs w-6 font-bold">{index + 1}.</span>
                  <span className="text-blue-900 font-bold text-sm hover:underline">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.3fr] gap-8">
          <div className="w-full">
            <MCQs_Cart_leftSide />
          </div>
          <div className="w-full">
            <MCQs_cart_RightSide />
          </div>
        </div>
      </div>
    </div>
  );
}