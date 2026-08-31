"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaChevronDown,
  FaSearch,
  FaTimes,
  FaBars,
  FaChevronRight,
  FaUserCircle,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa";
import { clearAuth, getToken } from "@/utils/auth";
import { siteSections } from "@/data/siteStructure";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();

  const [mobileAcc, setMobileAcc] = useState({
    ca: false,
    other: false,
    exams: false,
    mcqs: false,
    papers: false,
    tests: false,
    study: false,
  });

  useEffect(() => {
    setToken(getToken());
  }, []);

  const handleLogout = () => {
    clearAuth();
    setToken(null);
    setIsMenuOpen(false);
    router.push("/login");
  };

  const handleSearch = (e) => {
    if ((e.key === "Enter" || e.type === "click") && searchTerm.trim() !== "") {
      router.push(`/category/search?q=${searchTerm.trim()}`);
      setSearchTerm("");
      setIsMenuOpen(false);
    }
  };

  // --- OLD links (same as before) ---
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
    { name: "Daily Current Affairs", path: "/current-affairs/daily" },
    { name: "Monthly Current Affairs", path: "/current-affairs/monthly" },
    { name: "International Affairs", path: "/current-affairs/international" },
    { name: "Pakistan Affairs", path: "/current-affairs/pakistan" },
    { name: "Important MCQs", path: "/current-affairs/important-mcqs" },
  ];

  // --- NEW options adjusted in ---
  const governmentExamsLinks = siteSections["government-exams"].links.map((link) => ({
    name: link.name,
    path: link.path,
  }));

  const mcqsLinks = [
    { name: "FPSC", path: "/mcqs/fpsc" },
    { name: "PPSC", path: "/mcqs/ppsc" },
    { name: "KPPSC", path: "/mcqs/kppsc" },
    { name: "ETEA", path: "/mcqs/etea" },
    { name: "NTS", path: "/mcqs/nts" },
    { name: "SPSC", path: "/mcqs/spsc" },
    { name: "BPSC", path: "/mcqs/bpsc" },
    { name: "AJKPSC", path: "/mcqs/ajkpsc" },
  ];

  const pastPapersLinks = [
    { name: "FPSC", path: "/past-papers/fpsc" },
    { name: "PPSC", path: "/past-papers/ppsc" },
    { name: "KPPSC", path: "/past-papers/kppsc" },
    { name: "ETEA", path: "/past-papers/etea" },
    { name: "NTS", path: "/past-papers/nts" },
    { name: "SPSC", path: "/past-papers/spsc" },
    { name: "BPSC", path: "/past-papers/bpsc" },
    { name: "AJKPSC", path: "/past-papers/ajkpsc" },
  ];

  const onlineTestsLinks = [
    { name: "FPSC", path: "/online-tests/fpsc" },
    { name: "PPSC", path: "/online-tests/ppsc" },
    { name: "KPPSC", path: "/government-exams/kppsc/online-tests" },
    { name: "ETEA", path: "/online-tests/etea" },
    { name: "NTS", path: "/online-tests/nts" },
    { name: "SPSC", path: "/online-tests/spsc" },
    { name: "BPSC", path: "/online-tests/bpsc" },
    { name: "AJKPSC", path: "/online-tests/ajkpsc" },
  ];

  const studyResourcesLinks = [
    { name: "Study Notes", path: "/study-resources/study-notes" },
    { name: "Preparation Guides", path: "/study-resources/preparation-guides" },
    { name: "Interview Preparation", path: "/study-resources/interview-preparation" },
    { name: "Books & PDFs", path: "/study-resources/books" },
    { name: "Syllabus", path: "/study-resources/syllabus" },
    { name: "Exam Tips", path: "/study-resources/exam-tips" },
  ];

  const Dropdown = ({ label, links, wide, path }) => (
    <li className="relative group shrink-0">
      {path ? (
        <Link
          href={path}
          className="flex items-center gap-0.5 px-1.5 py-5 text-[10px] 2xl:text-[11px] font-bold uppercase tracking-wider hover:text-blue-600 text-gray-700 outline-none whitespace-nowrap"
        >
          {label}
          <FaChevronDown size={9} className="group-hover:rotate-180 transition-transform" />
        </Link>
      ) : (
        <button
          type="button"
          className="flex items-center gap-0.5 px-1.5 py-5 text-[10px] 2xl:text-[11px] font-bold uppercase tracking-wider hover:text-blue-600 text-gray-700 outline-none whitespace-nowrap"
        >
          {label}
          <FaChevronDown size={9} className="group-hover:rotate-180 transition-transform" />
        </button>
      )}
      <div
        className={`absolute top-full left-0 ${
          wide ? "w-56" : "w-48"
        } bg-white shadow-2xl border-t-4 border-blue-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]`}
      >
        {path && (
          <Link
            href={path}
            className="block px-4 py-3 text-xs font-black uppercase tracking-wide text-blue-600 bg-blue-50 border-b border-gray-50 hover:bg-blue-100"
          >
            View All {label}
          </Link>
        )}
        {links.map((sub) => (
          <Link
            key={sub.name}
            href={sub.path}
            className={`block px-4 py-3 text-xs font-bold border-b border-gray-50 ${
              sub.highlight
                ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                : "hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {sub.name}
            {label === "Other" && !sub.highlight ? " Mcqs" : ""}
          </Link>
        ))}
      </div>
    </li>
  );

  const toggleAcc = (key) =>
    setMobileAcc((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-16 md:top-[64px] z-[900] border-b border-gray-100">
      <div className="w-full px-3 sm:px-4 h-16 flex items-center gap-2 xl:gap-3">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="xl:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
        >
          <FaBars size={22} />
        </button>

        <Link href="/" className="hidden md:flex shrink-0 relative z-20 pr-2" aria-label="PakLearners home">
          <span className="text-lg xl:text-xl 2xl:text-2xl font-black tracking-tighter italic text-slate-800 uppercase whitespace-nowrap">
            PAK <span className="text-[#1565C0]">LEARNERS</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center flex-1 min-w-0 overflow-visible">
          <ul className="flex items-center flex-nowrap justify-start gap-0">
            {/* OLD links — same */}
            {mainLinks.map((link) => (
              <li key={link.name} className="shrink-0">
                <Link
                  href={link.path}
                  className="block px-1.5 py-5 text-[10px] 2xl:text-[11px] font-bold uppercase tracking-wider hover:text-blue-600 transition-all text-gray-700 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <Dropdown label="Current Affairs" links={currentAffairsLinks} wide path="/current-affairs" />
            <Dropdown label="Other" links={dropdownLinks} />

            {/* NEW options — clickable pillars + sub pages */}
            <Dropdown
              label="Govt Exams"
              links={governmentExamsLinks}
              wide
              path="/government-exams"
            />
            <Dropdown label="MCQs" links={mcqsLinks} wide path="/mcqs" />
            <Dropdown label="Past Papers" links={pastPapersLinks} wide path="/past-papers" />
            <Dropdown label="Online Tests" links={onlineTestsLinks} wide path="/online-tests" />
            <Dropdown label="Study" links={studyResourcesLinks} wide path="/study-resources" />

            <li className="shrink-0">
              <Link
                href="/blog"
                className="block px-1.5 py-5 text-[10px] 2xl:text-[11px] font-bold uppercase tracking-wider hover:text-blue-600 transition-all text-gray-700 whitespace-nowrap"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <Link
            href="/online-tests/start"
            className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-700 px-3 py-2.5 rounded-full text-white text-xs font-black shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] active:scale-95 transition-all flex items-center justify-center shrink-0 border-b-2 border-blue-800 uppercase tracking-wider"
          >
            Quiz
          </Link>

          <div className="relative w-[140px] sm:w-44 md:w-52 xl:w-44 2xl:w-56">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-gray-100 border border-gray-200 text-sm rounded-full py-2.5 pl-4 pr-11 focus:outline-none focus:border-blue-500 w-full transition-all shadow-inner"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
            >
              <FaSearch size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 bg-black/60 z-[1000] transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-[85%] max-w-[320px] h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-[#1565C0] text-white shrink-0">
            <div className="flex flex-col">
              <span className="font-black italic text-lg leading-none">PAK LEARNERS</span>
              <span className="text-[10px] opacity-80 font-bold uppercase tracking-widest mt-1">
                Navigation Menu
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 bg-white/10 rounded-full"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 p-4">
            <div className="space-y-1 mb-6">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2 mb-2">
                Main Categories
              </p>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs uppercase hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                Home <FaChevronRight size={10} className="text-gray-300" />
              </Link>
              {mainLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs uppercase hover:bg-blue-50 hover:text-blue-600 transition-all"
                >
                  {link.name} <FaChevronRight size={10} className="text-gray-300" />
                </Link>
              ))}
            </div>

            {[
              { key: "ca", title: "Current Affairs", links: currentAffairsLinks, path: "/current-affairs", active: "bg-blue-600 text-white", idle: "bg-blue-50 text-blue-700" },
              { key: "other", title: "Subject Categories", links: dropdownLinks, active: "bg-emerald-600 text-white", idle: "bg-emerald-50 text-emerald-700", grid: true },
              { key: "exams", title: "Government Exams", links: governmentExamsLinks, path: "/government-exams", active: "bg-[#1565C0] text-white", idle: "bg-slate-50 text-slate-700" },
              { key: "mcqs", title: "All MCQs", links: mcqsLinks, path: "/mcqs", active: "bg-indigo-600 text-white", idle: "bg-indigo-50 text-indigo-700" },
              { key: "papers", title: "Past Papers", links: pastPapersLinks, path: "/past-papers", active: "bg-orange-600 text-white", idle: "bg-orange-50 text-orange-700" },
              { key: "tests", title: "Online Tests", links: onlineTestsLinks, path: "/online-tests", active: "bg-cyan-600 text-white", idle: "bg-cyan-50 text-cyan-700" },
              { key: "study", title: "Study Resources", links: studyResourcesLinks, path: "/study-resources", active: "bg-rose-600 text-white", idle: "bg-rose-50 text-rose-700" },
            ].map((section) => (
              <div key={section.key} className="mb-4">
                <button
                  onClick={() => toggleAcc(section.key)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl font-bold text-xs uppercase transition-all ${
                    mobileAcc[section.key] ? section.active : section.idle
                  }`}
                >
                  {section.title}{" "}
                  <FaChevronDown
                    size={10}
                    className={mobileAcc[section.key] ? "rotate-180" : ""}
                  />
                </button>
                {mobileAcc[section.key] &&
                  (section.grid ? (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {section.links.map((link) => (
                        <Link
                          key={link.name}
                          href={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="bg-gray-50 p-3 rounded-xl text-[10px] font-bold text-gray-700 text-center border border-gray-100 uppercase"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-2 space-y-1 pl-2">
                      {section.path && (
                        <Link
                          href={section.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between p-3 text-xs text-blue-600 font-black uppercase bg-blue-50 rounded-lg mb-1"
                        >
                          View All {section.title}
                          <FaChevronRight size={9} />
                        </Link>
                      )}
                      {section.links.map((link) => (
                        <Link
                          key={link.name}
                          href={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 p-3 text-xs text-gray-600 font-bold uppercase border-b border-gray-50"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  ))}
              </div>
            ))}

            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs uppercase hover:bg-blue-50 hover:text-blue-600 transition-all mb-2"
            >
              Blog <FaChevronRight size={10} className="text-gray-300" />
            </Link>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0">
            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 w-full p-4 bg-rose-50 text-rose-600 font-black text-xs uppercase rounded-xl border border-rose-100 active:scale-95 transition-all"
              >
                <FaSignOutAlt size={16} /> Logout Account
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-4 bg-white border border-gray-200 text-gray-700 font-black text-[10px] uppercase rounded-xl active:scale-95 transition-all"
                >
                  <FaUserCircle size={14} /> Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white font-black text-[10px] uppercase rounded-xl shadow-md active:scale-95 transition-all"
                >
                  <FaUserPlus size={14} /> Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
