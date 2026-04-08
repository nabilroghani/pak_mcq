import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaBars, FaXmark, FaUserShield, FaRightFromBracket, FaShareNodes, FaFire
} from "react-icons/fa6";
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === 'admin';

  // Persistence Logic: URL refresh aur navigation dono handle karta hai
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    
    // Check if we are currently on a shared quiz page
    if (pathParts[1] === "quiz" && pathParts[2] && pathParts[2] !== "General") {
      const slug = pathParts[2];
      localStorage.setItem("persistent_quiz_slug", slug);
      setActiveSlug(slug);
    } else {
      // Kisi aur page par hote huye check karein ke kya pichla koi slug saved hai?
      const savedSlug = localStorage.getItem("persistent_quiz_slug");
      if (savedSlug) {
        setActiveSlug(savedSlug);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Logout par persistence clear kar dete hain taake naya user purana shared quiz na dekhe
    localStorage.removeItem("persistent_quiz_slug");
    setActiveSlug(null);
    Swal.fire({ icon: 'success', title: 'Logged Out', showConfirmButton: false, timer: 1500 });
    navigate("/login");
  };

  // ALL PAGES LIST
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Job Updates', path: '/job-updates' },
    { name: 'Past Papers', path: '/past-papers' },
    { name: 'Submit Mcqs', path: '/submit' },
    { name: 'E Book', path: '/e-book' },
  ];

  return (
    <nav className="bg-[#1565C0] shadow-lg sticky top-0 z-[999] w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left Section: Dashboard & Quiz Buttons */}
          <div className="hidden lg:flex items-center flex-wrap gap-1">
            {isAdmin && (
              <Link to="/admin/dashboard" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-[12px] font-black flex items-center gap-1 transition-all mr-2 shadow-lg">
                <FaUserShield size={14} /> DASHBOARD
              </Link>
            )}

            {/* DYNAMIC QUIZ BUTTON - Sirf tab dikhega jab link shared ho */}
            {activeSlug && (
              <Link 
                to={`/quiz/${activeSlug}`} 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 text-white px-4 py-2 rounded-lg text-[11px] font-black flex items-center gap-2 transition-all mr-2 shadow-lg border border-indigo-400 animate-pulse"
              >
                <FaShareNodes size={12} /> SHARED QUIZ ACTIVE
              </Link>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white/90 hover:text-white hover:bg-white/10 px-2 py-2 rounded-lg text-[12px] font-bold transition-all whitespace-nowrap uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section: Auth */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {user ? (
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-[12px] font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md">
                <FaRightFromBracket size={14} /> LOGOUT
              </button>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="text-white text-[13px] font-bold hover:bg-white/10 px-4 py-2 rounded-lg transition-all">Login</Link>
                <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-bold px-4 py-2 rounded-lg shadow-md transition-all">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center ml-auto">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <FaXmark size={28} /> : <FaBars size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden bg-white border-t border-gray-100 shadow-2xl`}>
        <div className="px-4 pt-4 pb-6 space-y-2">
          
          {/* Shared Quiz Button for Mobile */}
          {activeSlug && (
            <Link 
              to={`/quiz/${activeSlug}`} 
              onClick={() => setIsOpen(false)} 
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-3 py-3 rounded-xl text-base font-black shadow-lg"
            >
              <FaShareNodes size={18} /> SHARED QUIZ ACTIVE
            </Link>
          )}

          <div className="grid grid-cols-2 gap-2 mt-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)} 
                className="text-gray-700 bg-slate-50 hover:bg-blue-50 px-3 py-3 rounded-xl text-sm font-bold text-center border border-slate-100 uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            {user ? (
              <button onClick={handleLogout} className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:bg-red-100 transition-all">
                <FaRightFromBracket /> Logout Account
              </button>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="flex-1 text-center py-3 font-bold text-slate-600 border border-slate-200 rounded-xl" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/signup" className="flex-1 text-center py-3 bg-blue-600 text-white rounded-xl font-bold" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;