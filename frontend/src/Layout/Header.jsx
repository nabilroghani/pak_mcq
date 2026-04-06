import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const Header = () => {
  const [isMobileUrduOpen, setIsMobileUrduOpen] = useState(false);
  const [isMobileCAOpen, setIsMobileCAOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if ((e.key === "Enter" || e.type === "click") && searchTerm.trim() !== "") {
      navigate(`/category/search?q=${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  const mainLinks = [
    { name: "Pak Study", path: "/category/pak-study" },
    { name: "Islamic Studies", path: "/category/islamic-studies" },
    { name: "GK Mcqs", path: "/category/general-knowledge" },
    { name: "Everyday Science", path: "/category/everyday-science" },
  ];

  const dropdownLinks = [
    { name: "Biology", path: "/category/biology" },
    { name: "Chemistry", path: "/category/chemistry" },
    { name: "Physics", path: "/category/physics" },
    { name: "Pedagogy", path: "/category/pedagogy" },
    { name: "Computer", path: "/category/computer" },
    { name: "Maths", path: "/category/math" },
    { name: "English", path: "/category/english" },
    { name: "Urdu", path: "/category/urdu" },
  ];

  const currentAffairsLinks = [
    { name: "Pakistan Current Affairs", path: "/category/Pak-Current-Affairs" },
    { name: "World Current Affairs", path: "/category/World-Current-Affairs" },
  ];

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-16 md:top-[64px] z-[900] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter italic text-slate-800">
            PAK <span className="text-[#1565C0]">LEARNERS</span>
          </h1>
        </Link>

        <nav className="hidden xl:flex items-center">
          <ul className="flex items-center">
            {mainLinks.map((link) => (
              <li key={link.name}><Link to={link.path} className="px-3 py-5 text-[12px] font-bold uppercase tracking-wider hover:text-blue-600 transition-all text-gray-700">{link.name}</Link></li>
            ))}
            <li className="relative group">
              <button className="flex items-center gap-1 px-3 py-5 text-[12px] font-bold uppercase tracking-wider hover:text-blue-600 text-gray-700 outline-none">Current Affairs <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform" /></button>
              <div className="absolute top-full left-0 w-56 bg-white shadow-2xl border-t-4 border-blue-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
                {currentAffairsLinks.map((sub) => (
                  <Link key={sub.name} to={sub.path} className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">{sub.name}</Link>
                ))}
              </div>
            </li>
            <li className="relative group">
              <button className="flex items-center gap-1 px-3 py-5 text-[12px] font-bold uppercase tracking-wider hover:text-blue-600 text-gray-700 outline-none">Other <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform" /></button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-2xl border-t-4 border-blue-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
                {dropdownLinks.map((sub) => (
                  <Link key={sub.name} to={sub.path} className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">{sub.name} Mcqs</Link>
                ))}
              </div>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2 flex-1 justify-end lg:flex-none">
          <div className="relative">
            <input type="text" placeholder="Search MCQS..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleSearch} className="bg-gray-100 border border-gray-200 text-sm rounded-full py-1.5 pl-4 pr-10 focus:outline-none focus:border-blue-500 w-32 md:w-64 transition-all" />
            <button onClick={handleSearch} className="absolute right-3 top-2.5"><FaSearch className="text-gray-500 size-3" /></button>
          </div>
        </div>
      </div>

      <div className="xl:hidden bg-gray-50 border-t flex items-center px-4 py-2 space-x-4 text-[11px] font-bold uppercase overflow-x-auto no-scrollbar shadow-inner">
        {mainLinks.map((l) => (<Link key={l.name} to={l.path} className="whitespace-nowrap">{l.name}</Link>))}
        <button onClick={() => setIsMobileCAOpen(!isMobileCAOpen)} className="flex items-center gap-1 whitespace-nowrap">Current Affairs <FaChevronDown size={8}/></button>
        <button onClick={() => setIsMobileUrduOpen(!isMobileUrduOpen)} className="flex items-center gap-1 whitespace-nowrap text-blue-600">Other <FaChevronDown size={8}/></button>
      </div>
      {/* Mobile Dropdowns Logic Yahan Rehega */}
    </header>
  );
};
export default Header;