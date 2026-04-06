import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LuLayoutDashboard, 
  LuBookOpen, 
  LuBriefcase, 
  LuLogOut, 
  LuShare2, 
  LuLayers, 
  LuMessageSquare,
  LuBook,
  LuClipboardCheck,
  LuMenu, 
  LuX     
} from "react-icons/lu";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle state
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <LuLayoutDashboard />, path: '/admin/dashboard' },
    { name: 'Categories', icon: <LuLayers />, path: '/admin/categories' },
    { name: 'MCQs Manager', icon: <LuBookOpen />, path: '/admin/mcqs' },
    { name: 'Review MCQs', icon: <LuClipboardCheck />, path: '/admin/review-mcqs' }, 
    { name: 'Quiz Builder', icon: <LuShare2 />, path: '/admin/quiz-builder' },
    { name: 'Govt Jobs', icon: <LuBriefcase />, path: '/admin/jobs' },
    { name: 'E-Books', icon: <LuBook />, path: '/admin/ebooks' },
    { name: 'Messages', icon: <LuMessageSquare />, path: '/admin/messages' }, 
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* --- Mobile Header Bar (Sirf tab dikhega jab screen choti hogi) --- */}
      <div className="lg:hidden bg-[#0a1128] text-white p-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-800">
        {/* <h1 className="font-bold text-xl">EduAdmin</h1> */}
        <button onClick={toggleSidebar} className="text-2xl p-2 bg-blue-900/50 rounded-lg">
          {isOpen ? <LuX /> : <LuMenu />}
        </button>
      </div>

      {/* --- Overlay (Mobile par jab sidebar khula ho toh background dark karne ke liye) --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* --- Main Sidebar Container --- */}
      <div className={`
        fixed lg:sticky top-0 left-0 z-50
        w-64 h-screen bg-[#0a1128] text-gray-400 
        flex flex-col border-r border-gray-800 
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        {/* Sidebar Header */}
        <div className="p-6 hidden lg:block">
          <h1 className="text-white text-2xl font-bold flex items-center gap-2">EduAdmin</h1>
          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Management Suite</p>
        </div>

        {/* Close Button for Mobile (Optional, inside sidebar) */}
        <div className="lg:hidden p-6 flex justify-between items-center">
             <span className="text-white font-bold">Menu</span>
             <LuX className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 overflow-y-auto mt-4 text-sm"> 
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Link click karte hi mobile menu band ho jaye
              className={`flex items-center gap-3 p-3 mb-2 rounded-lg transition-all ${
                location.pathname === item.path 
                ? 'bg-[#1e293b] text-blue-400 border-l-4 border-blue-400' 
                : 'hover:bg-[#111d3a] hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <LuLogOut size={20} />
            <span className="font-bold">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;