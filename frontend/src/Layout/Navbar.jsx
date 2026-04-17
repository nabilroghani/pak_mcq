import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield, FaRightFromBracket, FaFacebook, FaWhatsapp } from "react-icons/fa6";
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === 'admin';

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
    { name: 'E Book', path: '/e-book' },
    { name: 'Quiz Of The Day', path: '/quiz-General' },
  ];

  return (
    <nav className="bg-[#1565C0] shadow-lg sticky top-0 z-[999] w-full font-sans text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. MOBILE LOGO & SOCIAL ICONS (Shown only on small screens) */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <Link to="/" className="font-black italic tracking-tighter text-lg">
              PAK LEARNERS
            </Link>
            
<div className="flex items-center gap-4">
  {/* Facebook - Original Blue */}
  <a 
    href="https://facebook.com/yourpage" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-white hover:brightness-110 transition-all"
  >
    <FaFacebook size={24} />
  </a>

  {/* WhatsApp - Original Green */}
  <a 
    href="https://whatsapp.com/channel/0029VbCMkBc9RZATvADmza08" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-[#25D366] hover:brightness-110 transition-all"
  >
    <FaWhatsapp size={24} />
  </a>
</div>
          </div>

          {/* 2. DESKTOP NAVIGATION (Hidden on Mobile) */}
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

          {/* 3. DESKTOP AUTH BUTTONS (Hidden on Mobile) */}
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

        </div>
      </div>
    </nav>
  );
};

export default Navbar;