import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LuLayoutDashboard, 
  LuBookOpen, 
  LuBriefcase, 
  LuLogOut, 
  LuShare2, 
  LuLayers, 
  LuMessageSquare,
  LuBook // Naya icon E-Books ke liye
} from "react-icons/lu";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Sab purane items barkarar hain, 'E-Books Manager' add kar diya gaya hai
  const menuItems = [
    { name: 'Dashboard', icon: <LuLayoutDashboard />, path: '/admin/dashboard' },
    { name: 'Categories', icon: <LuLayers />, path: '/admin/categories' },
    { name: 'MCQs Manager', icon: <LuBookOpen />, path: '/admin/mcqs' },
    { name: 'Quiz Builder', icon: <LuShare2 />, path: '/admin/quiz-builder' },
    { name: 'Govt Jobs', icon: <LuBriefcase />, path: '/admin/jobs' },
    { name: 'E-Books', icon: <LuBook />, path: '/admin/ebooks' }, // Naya Route
    { name: 'Messages', icon: <LuMessageSquare />, path: '/admin/messages' }, 
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="w-64 h-screen bg-[#0a1128] text-gray-400 flex flex-col border-r border-gray-800 sticky top-0">
      <div className="p-6">
        <h1 className="text-white text-2xl font-bold flex items-center gap-2">
          EduAdmin
        </h1>
        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Management Suite</p>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto mt-4"> 
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
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
  );
};

export default AdminSidebar;