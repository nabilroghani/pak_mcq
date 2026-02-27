import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "./Title.jsx";
import axios from "axios";

export default function MCQs_cart_RightSide({ className = "" }) {
  const [mcqDataCategory, setMcqDataCategory] = useState([]);
  const [openMenu, setOpenMenu] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFormatCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories/all");
        const dbData = res.data;

        // --- FIXED LOGIC ---
        // 1. Pehle wo nikalen jinka parent null hai (Main Headings)
        const parents = dbData.filter(cat => !cat.parent);

        // 2. Phir har parent ke andar uski sub-categories match karen using ID
        const formatted = parents.map((parent) => ({
          id: parent._id,
          name: parent.name,
          subCategories: dbData
            .filter(child => child.parent === parent._id) // ID comparison fixed
            .map((child) => ({
              id: child._id,
              name: child.name,
              slug: child.slug
            }))
        }));

        setMcqDataCategory(formatted);

        // Sab menus ko shuru mein open rakhne ke liye
        const initialOpenState = {};
        formatted.forEach((cat) => {
          initialOpenState[cat.name] = true;
        });
        setOpenMenu(initialOpenState);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dynamic categories:", err);
        setLoading(false);
      }
    };

    fetchAndFormatCategories();
  }, []);

  const toggleDropdown = (menuName) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  if (loading) return <div className="p-6 text-gray-400 text-sm animate-pulse">Loading Subjects...</div>;

  return (
    <div className={`hidden md:block ${className} pl-6 sticky top-10 self-start`}>
      <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-100">
        {mcqDataCategory.length > 0 ? (
          mcqDataCategory.map((category) => (
            <div key={category.id} className="mb-5 last:mb-0">
              {/* Category Header */}
              <div
                className="flex justify-between items-center px-4 py-2.5 bg-gradient-to-r from-[#1565C0] to-[#1e88e5] text-white rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => toggleDropdown(category.name)}
              >
                <Title text={category.name} />
                <span className="text-[10px] font-bold">
                  {openMenu[category.name] ? "▲" : "▼"}
                </span>
              </div>

              {/* Subcategories (Dynamic) */}
              {openMenu[category.name] && (
                <div className="mt-2 flex flex-col gap-1 border-l-2 border-blue-50 ml-3">
                  {category.subCategories.length > 0 ? (
                    category.subCategories.map((sub) => (
                      <Link
                        key={sub.id}
                        to={`/category/${sub.slug || sub.name.replace(/\s+/g, "-").toLowerCase()}`}
                        className="px-4 py-2 text-gray-600 text-sm font-semibold hover:text-blue-600 hover:bg-blue-50 rounded-r-lg transition-all border-l-2 border-transparent hover:border-blue-600"
                      >
                        {sub.name}
                      </Link>
                    ))
                  ) : (
                    <p className="text-[10px] text-gray-400 px-4 py-1 italic">No subjects added</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-xs text-center py-4">No categories found.</p>
        )}
      </div>
    </div>
  );
}