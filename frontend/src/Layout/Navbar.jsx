import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaXmark, FaUserShield, FaRightFromBracket, FaUserPlus, FaLockOpen } from "react-icons/fa6";
import axios from 'axios';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicQuizzes, setDynamicQuizzes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === 'admin';

  const handleLogout = () => {
    setIsOpen(false); // Close menu on logout
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
    { name: 'E Book', path: '/e-book' },
    { name: 'Quiz', path: '/quiz-General' },
  ];

  return (
    <nav className="bg-[#1565C0] shadow-lg sticky top-0 z-[999] w-full font-sans text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center flex-wrap gap-1">
            {isAdmin && (
              <Link to="/admin/dashboard" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-[12px] font-black mr-2 shadow-lg transition-all uppercase">
                <FaUserShield className="inline mr-1" /> Dashboard
              </Link>
            )}

            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="hover:bg-white/10 px-2 py-2 rounded-lg text-[12px] font-bold uppercase transition-all whitespace-nowrap">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            {user ? (
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-[12px] font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all">
                <FaRightFromBracket size={14} /> LOGOUT
              </button>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="text-white text-[13px] font-bold hover:bg-white/10 px-4 py-2 rounded-lg transition-all">Login</Link>
                <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-bold px-4 py-2 rounded-lg shadow-md transition-all">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <span className="font-black italic tracking-tighter text-lg"><Link to={"/"}>PAK LEARNERS</Link></span>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 outline-none">
              {isOpen ? <FaXmark size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden bg-white border-t border-gray-100 shadow-2xl transition-all duration-300`}>
        <div className="px-4 pt-4 pb-6 space-y-4">
          
          {/* Admin Dashboard on Mobile */}
          {isAdmin && (
            <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center bg-yellow-500 text-white p-3 rounded-xl text-xs font-black uppercase shadow-md">
              <FaUserShield className="mr-2" /> Admin Dashboard
            </Link>
          )}

          {/* Nav Links Grid */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-gray-700 bg-slate-50 px-3 py-3 rounded-xl text-[11px] font-bold text-center border border-slate-100 uppercase hover:bg-blue-50 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Auth Buttons (LOGIN / SIGNUP / LOGOUT) */}
          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <button 
                onClick={handleLogout} 
                className="w-full bg-red-500 text-white p-4 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <FaRightFromBracket size={16} /> Logout My Account
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-800 p-4 rounded-xl font-black text-xs uppercase border border-slate-200"
                >
                  <FaLockOpen size={16} /> Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white p-4 rounded-xl font-black text-xs uppercase shadow-lg shadow-orange-200"
                >
                  <FaUserPlus size={16} /> Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;