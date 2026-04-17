import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaSearch, FaTimes, FaBars, FaChevronRight, FaClipboardList } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Mobile Accordion States
  const [mobileAcc, setMobileAcc] = useState({ ca: false, other: false });

  const handleSearch = (e) => {
    if ((e.key === "Enter" || e.type === "click") && searchTerm.trim() !== "") {
      navigate(`/category/search?q=${searchTerm.trim()}`);
      setSearchTerm("");
      setIsMenuOpen(false);
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
    // Sticky property restore kar di gayi hai top-16 ke sath
    <header className="bg-white text-gray-800 shadow-md sticky top-16 md:top-[64px] z-[900] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        
        {/* HAMBURGER: Only on Mobile/Tablet */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="xl:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FaBars size={22} />
        </button>

        {/* LOGO: Hidden on Mobile, Flex on Desktop */}
        <Link to="/" className="hidden md:flex flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter italic text-slate-800 uppercase">
            PAK <span className="text-[#1565C0]">LEARNERS</span>
          </h1>
        </Link>

        {/* DESKTOP NAV: Only for large screens */}
        <nav className="hidden xl:flex items-center">
          <ul className="flex items-center">
            {mainLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="px-3 py-5 text-[12px] font-bold uppercase tracking-wider hover:text-blue-600 transition-all text-gray-700">{link.name}</Link>
              </li>
            ))}
            
            <li className="relative group">
              <button className="flex items-center gap-1 px-3 py-5 text-[12px] font-bold uppercase tracking-wider hover:text-blue-600 text-gray-700 outline-none">
                Current Affairs <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white shadow-2xl border-t-4 border-blue-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
                {currentAffairsLinks.map((sub) => (
                  <Link key={sub.name} to={sub.path} className="block px-4 py-3 text-xs font-bold hover:bg-blue-50 hover:text-blue-600 border-b border-gray-50">{sub.name}</Link>
                ))}
              </div>
            </li>

            <li className="relative group">
              <button className="flex items-center gap-1 px-3 py-5 text-[12px] font-bold uppercase tracking-wider hover:text-blue-600 text-gray-700 outline-none">
                Other <FaChevronDown size={10} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-2xl border-t-4 border-blue-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
                {dropdownLinks.map((sub) => (
                  <Link key={sub.name} to={sub.path} className="block px-4 py-3 text-xs font-bold hover:bg-blue-50 hover:text-blue-600 border-b border-gray-50">{sub.name} Mcqs</Link>
                ))}
              </div>
            </li>
          </ul>
        </nav>

        {/* SEARCH AREA & MOBILE QUIZ BUTTON */}
        <div className="flex items-center flex-1 md:flex-none gap-2">
          
          {/* QUIZ BUTTON: Only visible on mobile/tablet */}
          <Link 
            to="/quiz-General" 
            className="md:hidden bg-amber-500 p-2.5 rounded-full text-white shadow-md active:scale-95 transition-transform flex items-center justify-center shrink-0"
          >
            <FaClipboardList size={18} />
          </Link>

          <div className="relative w-full md:w-64 lg:w-80">
            <input 
              type="text" 
              placeholder="Search MCQS..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              onKeyDown={handleSearch} 
              className="bg-gray-100 border border-gray-200 text-sm rounded-full py-2.5 pl-5 pr-12 focus:outline-none focus:border-blue-500 w-full transition-all shadow-inner" 
            />
            <button onClick={handleSearch} className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors">
              <FaSearch size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE HAMBURGER SIDEBAR */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[1000] transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 left-0 w-[85%] max-w-[320px] h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#1565C0] text-white">
            <div className="flex flex-col">
                <span className="font-black italic text-lg leading-none">PAK LEARNERS</span>
                <span className="text-[10px] opacity-80 font-bold uppercase tracking-widest mt-1">Navigation Menu</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/10 rounded-full"><FaTimes size={18}/></button>
          </div>

          <div className="overflow-y-auto h-[calc(100%-80px)] p-4 custom-scrollbar">
            <div className="space-y-1 mb-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2 mb-2">Main Categories</p>
                {mainLinks.map((link) => (
                <Link 
                    key={link.name} 
                    to={link.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs uppercase hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent"
                >
                    {link.name} <FaChevronRight size={10} className="text-gray-300"/>
                </Link>
                ))}
            </div>

            <div className="mb-4">
              <button 
                onClick={() => setMobileAcc({...mobileAcc, ca: !mobileAcc.ca})}
                className={`w-full flex items-center justify-between p-4 rounded-xl font-bold text-xs uppercase transition-all ${mobileAcc.ca ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'}`}
              >
                Current Affairs MCQs <FaChevronDown size={10} className={`${mobileAcc.ca ? 'rotate-180' : ''}`}/>
              </button>
              {mobileAcc.ca && (
                <div className="mt-2 space-y-1 pl-2 animate-fadeIn">
                  {currentAffairsLinks.map((link) => (
                    <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 text-xs text-gray-600 font-bold uppercase border-b border-gray-50">
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4">
              <button 
                onClick={() => setMobileAcc({...mobileAcc, other: !mobileAcc.other})}
                className={`w-full flex items-center justify-between p-4 rounded-xl font-bold text-xs uppercase transition-all ${mobileAcc.other ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'}`}
              >
                Subject Categories <FaChevronDown size={10} className={`${mobileAcc.other ? 'rotate-180' : ''}`}/>
              </button>
              {mobileAcc.other && (
                <div className="mt-3 grid grid-cols-2 gap-2 animate-fadeIn">
                  {dropdownLinks.map((link) => (
                    <Link 
                        key={link.name} 
                        to={link.path} 
                        onClick={() => setIsMenuOpen(false)} 
                        className="bg-gray-50 p-3 rounded-xl text-[10px] font-bold text-gray-700 text-center border border-gray-100 uppercase"
                    >
                        {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;