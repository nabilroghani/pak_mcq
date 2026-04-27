  import api from "../utils/api";
  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import Title from "./Title.jsx";
  import axios from "axios";
  import { FaChevronDown, FaChevronUp, FaThList } from "react-icons/fa";

  export default function MCQs_cart_RightSide({ className = "" }) {
    const [mcqDataCategory, setMcqDataCategory] = useState([]);
    const [openMenu, setOpenMenu] = useState({});
    const [loading, setLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
      const fetchAndFormatCategories = async () => {
        try {
          const res = await api.get("/categories/all");
          const dbData = res.data;
          const sortedData = [...dbData].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
          );
          const parents = sortedData.filter((cat) => !cat.parent);

          const formatted = parents.map((parent) => ({
            id: parent._id,
            name: parent.name,
            subCategories: sortedData
              .filter((child) => child.parent === parent._id)
              .map((child) => ({
                id: child._id,
                name: child.name,
                slug: child.slug,
              })),
          }));

          setMcqDataCategory(formatted);

          // Desktop check: Agar screen bari hai to sab open rakho
          const isDesktop = window.innerWidth >= 768;
          const initialOpenState = {};
          formatted.forEach((cat) => {
            initialOpenState[cat.name] = isDesktop ? true : false;
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
      // Desktop par click karne se band nahi hoga (optional: agar aap chahte hain desktop pe bhi toggle ho to 'isDesktop' check hata dein)
      if (window.innerWidth < 768) {
        setOpenMenu((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
      }
    };

    if (loading)
      return (
        <div className="p-6 text-gray-400 text-sm animate-pulse">
          Loading Subjects...
        </div>
      );

    return (
      <div className={`${className} w-full`}>
        {/* Mobile Toggle Button - Hidden on Desktop */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-full mb-4 flex items-center justify-between bg-[#1565C0] text-white px-5 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-2">
            <FaThList /> <span>All Categories</span>
          </div>
          {isMobileMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* Main Container */}
        <div
          className={`${isMobileMenuOpen ? "block" : "hidden"} md:block sticky top-24 self-start`}
        >
          <div className="bg-white shadow-xl rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <div className="w-1 h-5 bg-[#1565C0] rounded-full"></div>
              <h3 className="text-[#1565C0] font-black text-[12px] uppercase tracking-widest">
                Main Subjects
              </h3>
            </div>

            {mcqDataCategory.length > 0 ? (
              mcqDataCategory.map((category) => (
                <div key={category.id} className="mb-4 last:mb-0">
                  {/* Category Header */}
                  <div
                    className={`flex justify-between items-center px-4 py-2.5 rounded-xl transition-all duration-300 ${
                      window.innerWidth >= 768
                        ? "bg-blue-50/50 cursor-default"
                        : "bg-gray-50 cursor-pointer hover:bg-blue-50"
                    }`}
                    onClick={() => toggleDropdown(category.name)}
                  >
                    <span className="font-bold text-[13px] text-slate-800 uppercase tracking-tighter">
                      {category.name}
                    </span>
                    {/* Icon only shows on Mobile */}
                    <span className="text-[10px] text-blue-600 md:hidden">
                      {openMenu[category.name] ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  </div>

                  {/* Subcategories (Open by default on Desktop) */}
                  {(openMenu[category.name] || window.innerWidth >= 768) && (
                    <div className="mt-2 flex flex-col gap-1 border-l-2 border-blue-100 ml-4">
                      {category.subCategories.length > 0 ? (
                        category.subCategories.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/category/${sub.slug || (sub.name || "").replace(/\s+/g, "-").toLowerCase()}`}
                            onClick={() => {
                              if (window.innerWidth < 768)
                                setIsMobileMenuOpen(false);
                            }}
                            className="px-4 py-2 text-gray-600 text-[12px] font-bold hover:text-blue-600 hover:bg-blue-50 rounded-r-lg transition-all border-l-2 border-transparent hover:border-blue-600"
                          >
                            {sub.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-[10px] text-gray-400 px-4 py-1 italic">
                          No subjects
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-xs text-center py-4">
                No categories found.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
