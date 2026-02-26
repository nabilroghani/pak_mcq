import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaSignalMessenger, FaYoutube, FaFacebook, FaTwitter, 
  FaTiktok, FaBars, FaXmark, FaInstagram, FaUserShield, FaRightFromBracket 
} from "react-icons/fa6";
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // LocalStorage se user check karna
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Swal.fire({ icon: 'success', title: 'Logged Out', showConfirmButton: false, timer: 1500 });
    navigate("/login");
  };

  // Aapke saare 8 pages yahan hain
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Job Updates', path: '/job-updates' },
    { name: 'PAST Papers', path: '/past-papers' },
    { name: 'Submit Mcqs', path: '/submit' },
    { name: 'E Book', path: '/E-Book'},
  ];

  const socialIcons = [
    { icon: <FaSignalMessenger size={18} />, link: "#", color: "hover:text-green-400" },
    { icon: <FaYoutube size={18} />, link: "#", color: "hover:text-red-500" },
    { icon: <FaFacebook size={18} />, link: "#", color: "hover:text-blue-400" },
    { icon: <FaInstagram size={18} />, link: "#", color: "hover:text-[#f9ce34]"}
  ];

  return (
    <nav className="bg-[#1565C0] shadow-lg sticky top-0 z-[999] w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left Side: Desktop Links */}
          <div className="hidden lg:flex space-x-1">
            {/* Agar Admin hai to pehle Dashboard ka link dikhao */}
            {isAdmin && (
              <Link to="/admin/dashboard" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-[12px] font-black flex items-center gap-1 transition-all mr-2 shadow-lg">
                <FaUserShield size={14}/> DASHBOARD
              </Link>
            )}

            {/* Baqi saare regular links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white/90 hover:text-white hover:bg-white/10 px-2 py-2 rounded-lg text-[12px] font-bold transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side: Social + Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3 border-r border-white/20 pr-4">
                {socialIcons.map((social, index) => (
                <a key={index} href={social.link} className={`text-white/80 ${social.color} transition-all duration-300`}>
                    {social.icon}
                </a>
                ))}
            </div>

            <div className="flex items-center space-x-2">
              {user ? (
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-[12px] font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md">
                  <FaRightFromBracket size={14} /> LOGOUT
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-white text-[13px] font-bold hover:bg-white/10 px-4 py-2 rounded-lg transition-all">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-bold px-4 py-2 rounded-lg shadow-md transition-all">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-2">
              {isOpen ? <FaXmark size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden bg-white border-t border-gray-100 shadow-2xl animate-fade-in-down`}>
        <div className="px-4 pt-4 pb-3 space-y-1">
          {isAdmin && (
             <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block bg-yellow-100 text-yellow-700 px-3 py-3 rounded-xl text-base font-black mb-2">
                ⭐ ADMIN DASHBOARD
             </Link>
          )}

          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="block text-gray-700 hover:bg-[#1565C0]/10 hover:text-[#1565C0] px-3 py-3 rounded-xl text-base font-bold transition-all">
              {link.name}
            </Link>
          ))}
          
          <div className="grid grid-cols-1 gap-2 pt-4 border-t border-gray-100">
            {user ? (
               <button onClick={handleLogout} className="w-full bg-red-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  <FaRightFromBracket /> Logout
               </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-center text-[#1565C0] border border-[#1565C0] py-3 rounded-xl font-bold">Login</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="text-center bg-[#1565C0] text-white py-3 rounded-xl font-bold">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;