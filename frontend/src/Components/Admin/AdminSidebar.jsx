import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard, LuBookOpen, LuBriefcase, LuFileText, LuLogOut } from "react-icons/lu";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <LuLayoutDashboard />, path: '/admin/dashboard' },
    { name: 'MCQs Manager', icon: <LuBookOpen />, path: '/admin/mcqs' },
    { name: 'Govt Jobs', icon: <LuBriefcase />, path: '/admin/jobs' },
    { name: 'Blog & News', icon: <LuFileText />, path: '/admin/blogs' },
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
      </div>

      <nav className="flex-1 px-4">
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
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="m-4 flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
      >
        <LuLogOut />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminSidebar;