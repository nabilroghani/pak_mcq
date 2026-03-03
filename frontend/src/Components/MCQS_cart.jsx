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
  const { categoryName } = useParams(); 
  const [subCats, setSubCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      setLoading(true);
      setSubCats([]); 
      try {
        if (categoryName) { // Sirf tabhi fetch karein jab category ho
          const res = await axios.get("http://localhost:5000/api/categories/all");
          const currentCat = res.data.find(c => c.slug.toLowerCase() === categoryName?.toLowerCase());
          if (currentCat) {
            const filtered = res.data.filter(c => c.parent === currentCat._id);
            setSubCats(filtered);
          }
        }
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchSubCategories();
  }, [categoryName]);

  const bannerImages = {
    "math": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000",
    "pak-study": "https://images.unsplash.com/photo-1527359443443-84a48abc7dfd?auto=format&fit=crop&w=1000",
    "default": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000"
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* --- BANNER SECTION (Only shows on Category Pages) --- */}
        {categoryName && (
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-6 shadow-md">
            <img 
              src={bannerImages[categoryName?.toLowerCase()] || bannerImages["default"]} 
              className="w-full h-full object-cover" 
              alt="Banner" 
            />
            <div className="absolute inset-0 bg-black/30 flex items-center pl-10">
               <h1 className="text-white text-4xl font-black uppercase">
                 {categoryName?.replace(/-/g, ' ')}
               </h1>
            </div>
          </div>
        )}

        {/* --- SUB-CATEGORY MENU TABLE --- */}
        {!loading && subCats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 border mb-10 rounded-lg overflow-hidden">
                 <div className="md:col-span-2 bg-gray-50 p-2 text-center font-bold border-b text-gray-700 uppercase text-xs tracking-widest">
                    {categoryName?.replace(/-/g, ' ')} Sub Categories
                 </div>
                 {subCats.map((item, index) => (
                    <Link key={item._id} to={`/category/${item.slug}`} className="p-3 border-b hover:bg-blue-50 text-blue-900 font-medium text-sm">
                        {index + 1}. {item.name}
                    </Link>
                 ))}
            </div>
        )}

        {/* --- MAIN CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.3fr] gap-8 items-start">
          <div className="w-full">
            <MCQs_Cart_leftSide key={categoryName || "home"} categorySlug={categoryName} />
          </div>
          <div className="w-full">
            <MCQs_cart_RightSide />
          </div>
        </div>
      </div>
    </div>
  );
}