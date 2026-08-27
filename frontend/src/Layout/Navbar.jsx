"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserShield, FaRightFromBracket, FaFacebook, FaWhatsapp } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { clearAuth, getUser } from "@/utils/auth";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const isAdmin = user && user.role === 'admin';

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    Swal.fire({ icon: 'success', title: 'Logged Out', showConfirmButton: false, timer: 1500 });
    router.push("/login");
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Job Updates', path: '/jobs' },
    { name: 'Past Papers', path: '/past-papers' },
    { name: 'Submit Mcqs', path: '/submit' },
    { name: 'E Book', path: '/study-resources/books' },
    { name: 'Quiz Of The Day', path: '/online-tests/start' },
  ];

  return (
    <nav className="bg-[#1565C0] shadow-lg sticky top-0 z-[999] w-full font-sans text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* 1. MOBILE LOGO & SOCIAL ICONS */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <Link
              href="/"
              className="font-black italic tracking-tighter text-2xl md:text-3xl lg:text-4xl transition-all hover:opacity-80"
            >
              PAK LEARNERS
            </Link>

            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/share/18P9BbsVuz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:brightness-110 transition-all"
              >
                <FaFacebook size={24} />
              </a>
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

          {/* 2. DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center flex-wrap gap-1">
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-[12px] font-black mr-2 shadow-lg transition-all uppercase"
              >
                <FaUserShield className="inline mr-1" /> Dashboard
              </Link>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="hover:bg-white/10 px-2 py-2 rounded-lg text-[12px] font-bold uppercase transition-all whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. DESKTOP AUTH */}
          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[12px] font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all"
              >
                <FaRightFromBracket size={14} /> LOGOUT
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="text-white text-[13px] font-bold hover:bg-white/10 px-4 py-2 rounded-lg transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-bold px-4 py-2 rounded-lg shadow-md transition-all"
                >
                  Sign Up
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
