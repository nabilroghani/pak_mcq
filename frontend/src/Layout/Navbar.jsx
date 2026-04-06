import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaSignalMessenger, FaYoutube, FaFacebook,
  FaBars, FaXmark, FaInstagram, FaUserShield, FaRightFromBracket, FaShareNodes
} from "react-icons/fa6";
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === 'admin';

  // Check if current URL is a shared quiz
  useEffect(() => {
    if (location.pathname.startsWith("/quiz/")) {
      const slug = location.pathname.split("/quiz/")[1];
      // "General" ko exclude kar rahe hain taake wo normal Quiz of the Day hi rahe
      if (slug && slug !== "General") {
        setActiveSlug(slug);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Swal.fire({ icon: 'success', title: 'Logged Out', showConfirmButton: false, timer: 1500 });
    navigate("/login");
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Job Updates', path: '/job-updates' },
    { name: 'Past Papers', path: '/past-papers' },
    { name: 'Submit Mcqs', path: '/submit' },
    { name: 'E Book', path: '/E-Book' },
  ];

  return (
    <nav className="bg-[#1565C0] shadow-lg sticky top-0 z-[999] w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left: Desktop Links */}
          <div className="hidden lg:flex items-center flex-wrap gap-1">
            {isAdmin && (
              <Link to="/admin/dashboard" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-[12px] font-black flex items-center gap-1 transition-all mr-2 shadow-lg">
                <FaUserShield size={14} /> DASHBOARD
              </Link>
            )}

            {/* SHARED QUIZ BUTTON - Sirf tab dikhega jab slug active ho */}
            {activeSlug ? (
              <Link 
                to={`/quiz/${activeSlug}`} 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 text-white px-4 py-2 rounded-lg text-[11px] font-black flex items-center gap-2 transition-all mr-2 shadow-lg border border-indigo-400 animate-pulse"
              >
                <FaShareNodes size={12} /> SHARED QUIZ
              </Link>
            ) : (
              <Link 
                to="/quiz/General" 
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:scale-105 text-white px-4 py-2 rounded-lg text-[11px] font-black flex items-center gap-1 transition-all mr-2 shadow-lg"
              >
                QUIZ OF THE DAY
              </Link>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white/90 hover:text-white hover:bg-white/10 px-2 py-2 rounded-lg text-[12px] font-bold transition-all whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Social + Auth */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <div className="flex items-center space-x-2">
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
        <div className="px-4 pt-4 pb-3 space-y-1">
          {/* Shared Quiz Mobile Button */}
          {activeSlug && (
            <Link 
              to={`/quiz/${activeSlug}`} 
              onClick={() => setIsOpen(false)} 
              className="block bg-indigo-600 text-white px-3 py-3 rounded-xl text-base font-black mb-3 text-center shadow-lg"
            >
              🔗 SHARED QUIZ
            </Link>
          )}
          
          <Link to="/quiz/General" onClick={() => setIsOpen(false)} className="block bg-orange-500 text-white px-3 py-3 rounded-xl text-base font-black mb-3 text-center">
            🔥 QUIZ OF THE DAY
          </Link>

          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="block text-gray-700 hover:bg-blue-50 px-3 py-3 rounded-xl text-base font-bold">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;