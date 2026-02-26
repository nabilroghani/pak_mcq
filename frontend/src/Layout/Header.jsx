import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const Header = () => {
  const [isMobileUrduOpen, setIsMobileUrduOpen] = useState(false);
  const [isMobileCAOpen, setIsMobileCAOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Search handle karne ka function
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      // Ye user ko search query ke sath dynamic route par le jayega
      navigate(`/category/search?q=${searchTerm.trim()}`);
      setSearchTerm(""); // Input saaf karne ke liye
    }
  };

  const mainLinks = [
    { name: "Pak Study", path: "/category/Pak-Study-MCQs" },
    { name: "Islamic Studies", path: "/category/Islamic-Studies-MCQs" },
    { name: "GK Mcqs", path: "/category/General-Knowledge-MCQs" },
    { name: "Everyday Science", path: "/category/Everyday-Science-MCQs" },
  ];

  const dropdownLinks = [
    { name: "Biology", path: "/category/Biology-MCQs" },
    { name: "Chemistry", path: "/category/Chemistry-MCQs" },
    { name: "Physics", path: "/category/Physics-MCQs" },
    { name: "Pedagogy", path: "/category/Pedagogy-MCQs" },
    { name: "Computer", path: "/category/Computer-MCQs" },
    { name: "Maths", path: "/category/Maths-MCQs" },
    { name: "English", path: "/category/English-MCQs" },
    { name: "Urdu", path: "/category/Urdu-MCQs" },
  ];

  const currentAffairsLinks = [
    { name: "Pakistan Current Affairs", path: "/category/Pakistan-Current-Affairs" },
    { name: "World Current Affairs", path: "/category/World-Current-Affairs" },
  ];

  return (
    <header className="bg-[#f8fafc] text-gray-800 shadow-lg sticky top-0 z-[90] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* 1. LOGO */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter italic text-[#444444]">
            PAK LEARNERS
          </h1>
        </Link>

        {/* 2. NAVIGATION (Desktop) */}
        <nav className="hidden xl:flex items-center">
          <ul className="flex items-center">
            {mainLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="px-3 py-5 text-[12px] font-bold uppercase tracking-wider hover:text-cyan-600 transition-all whitespace-nowrap text-gray-700"
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Current Affairs Dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1 px-3 py-5 text-[12px] font-bold uppercase tracking-wider hover:text-cyan-600 text-gray-700 transition-all outline-none">
                Current Affairs{" "}
                <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 w-56 bg-white text-gray-800 shadow-2xl rounded-b-md border-t-4 border-cyan-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
                <div className="flex flex-col py-2">
                  {currentAffairsLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className="px-4 py-2 text-sm hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            {/* Other Dropdown */}
            <li className="relative group">
              <button className="flex items-center gap-1 px-3 py-5 text-[12px] font-bold uppercase tracking-wider hover:text-cyan-600 text-gray-700 transition-all outline-none">
                Other{" "}
                <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform" />
              </button>

              <div className="absolute top-full left-0 w-48 bg-white text-gray-800 shadow-2xl rounded-b-md border-t-4 border-cyan-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
                <div className="flex flex-col py-2">
                  {dropdownLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className="px-4 py-2 text-sm hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                    >
                      {sub.name} Mcqs
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </nav>

        {/* 3. SEARCH BAR */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end lg:flex-none">
          <div className="relative block">
            <input
              type="text"
              placeholder="Search MCQS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-gray-200/50 border border-gray-300 text-gray-800 text-sm rounded-full py-1.5 pl-4 pr-10 focus:outline-none focus:border-cyan-500 w-32 md:w-64 transition-all"
            />
            <button onClick={() => handleSearch({ key: 'Enter' })} className="absolute right-3 top-2.5">
               <FaSearch className="text-gray-500 size-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE SCROLL BAR */}
      <div className="xl:hidden bg-gray-100 border-t border-gray-200 relative">
        <div className="flex items-center px-4 py-2 space-x-4 text-[11px] font-bold uppercase overflow-x-auto scrollbar-hide text-gray-600">
          {mainLinks.map((l) => (
            <Link key={l.name} to={l.path} className="whitespace-nowrap hover:text-cyan-600">
              {l.name}
            </Link>
          ))}

          {/* Mobile Dropdowns */}
          <button
            onClick={() => setIsMobileCAOpen(!isMobileCAOpen)}
            className="flex items-center gap-1 whitespace-nowrap text-gray-700 outline-none"
          >
            Current Affairs <FaChevronDown size={8} className={isMobileCAOpen ? "rotate-180" : ""} />
          </button>

          <button
            onClick={() => setIsMobileUrduOpen(!isMobileUrduOpen)}
            className="flex items-center gap-1 whitespace-nowrap text-cyan-600 outline-none"
          >
            Other Mcqs <FaChevronDown size={8} className={isMobileUrduOpen ? "rotate-180" : ""} />
          </button>
        </div>

        {/* Mobile Dropdown Menus */}
        {isMobileCAOpen && (
          <div className="bg-white border-b flex flex-col p-2 text-xs">
            {currentAffairsLinks.map(link => (
              <Link key={link.name} to={link.path} className="py-2 px-4 border-b last:border-0">{link.name}</Link>
            ))}
          </div>
        )}
        {isMobileUrduOpen && (
          <div className="bg-white border-b flex flex-col p-2 text-xs">
            {dropdownLinks.map(link => (
              <Link key={link.name} to={link.path} className="py-2 px-4 border-b last:border-0">{link.name}</Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;