import React, { useState } from "react";
import { Link } from "react-router-dom"; // Navigation ke liye
import Title from "./Title.jsx";
import { mcqDataCategory } from "../assets/category.js";

export default function MCQs_cart_RightSide({ className = "" }) {
  // Saari categories ko shuru mein open rakhne ki logic
  const initialOpenState = {};
  mcqDataCategory.forEach((cat) => {
    initialOpenState[cat.name] = true;
  });

  const [openMenu, setOpenMenu] = useState(initialOpenState);

  const toggleDropdown = (menuName) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <div className={`hidden md:block ${className} pl-6 sticky top-10 self-start`}>
      <div className="bg-white shadow-lg rounded-xl p-6">
        {mcqDataCategory.map((category) => (
          <div key={category.id} className="mb-4">
            {/* Category Header */}
            <div
              className="flex justify-between items-center md:px-4 py-2 bg-[#1565C0] text-white rounded-lg cursor-pointer hover:bg-[#1254a1] transition-colors"
              onClick={() => toggleDropdown(category.name)}
            >
              <Title text={category.name} />
              <span className="text-xs">{openMenu[category.name] ? "▲" : "▼"}</span>
            </div>

            {/* Subcategories */}
            {openMenu[category.name] && (
              <div className="mt-3 flex flex-col gap-1">
                {category.subCategories.map((sub) => (
                  <Link
                    key={sub.id}
                    // URL mein spaces ko "-" se replace kar rahe hain taake professional lage
                    // Example: "Pak Study MCQs" -> "/category/Pak-Study-MCQs"
                    to={`/category/${sub.name.replace(/\s+/g, "-")}`}
                    className="px-3 py-2 rounded-lg text-gray-700 text-sm font-medium hover:text-blue-600 hover:bg-blue-50 cursor-pointer transition-all duration-200 border-l-2 border-transparent hover:border-blue-600"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}