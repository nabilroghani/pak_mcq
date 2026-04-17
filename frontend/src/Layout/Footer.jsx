import React from 'react';
import logo from "../assets/logo.webp"
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope, 
  FaPhoneAlt, FaPaperPlane
} from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, url: "https://www.facebook.com/share/18P9BbsVuz/" },
    { icon: FaTwitter, url: "#" },
    { icon: FaInstagram, url: "#" },
    { icon: FaWhatsapp, url: "https://whatsapp.com/channel/0029VbCMkBc9RZATvADmza08" },
  ];

  return (
    <footer className="bg-[#1565C0] text-white pt-16 pb-8 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Logo & Social Section */}
          <div className="space-y-6 text-center md:text-left">
            <Link to="/">
              <img 
                src={logo} 
                alt="Pak Learners Logo" 
                className="w-48 h-auto object-contain brightness-0 invert mx-auto md:mx-0" 
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Pakistan's #1 platform for MCQs preparation. We help thousands of students achieve their dreams.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white hover:text-blue-600 rounded-xl flex items-center justify-center transition-all group"
                >
                  <social.icon className="group-hover:scale-110 text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Updates & Featured (Old Login/Logout Section Removed) */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-yellow-400 pl-3 uppercase">Preparation Tools</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/job-updates" className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 px-4 py-3 rounded-xl text-xs font-black uppercase transition-all shadow-lg">
                Daily Job Updates
              </Link>
              <Link to="/past-papers" className="flex items-center justify-center bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl text-xs font-black uppercase border border-white/20 transition-all">
                Download Past Papers
              </Link>
              <Link to="/submit" className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 px-4 py-3 rounded-xl text-xs font-black uppercase shadow-lg transition-all">
                Contribute MCQs
              </Link>
            </div>
          </div>

          {/* 3. Quick Navigation */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-yellow-400 pl-3 uppercase">Quick Links</h3>
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-3 text-white/70 text-sm font-bold uppercase">
              <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-yellow-400">Privacy Policy</Link></li>
              <li><Link to="/e-book" className="hover:text-yellow-400">E Book</Link></li>
            </ul>
          </div>

          {/* 4. Newsletter & Official Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-yellow-400 pl-3 uppercase tracking-tighter">Stay Connected</h3>
            {/* <div className="flex bg-white/10 rounded-xl p-1 border border-white/20">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none outline-none px-4 py-2 w-full text-sm placeholder:text-white/50" 
              />
              <button className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all">
                <FaPaperPlane />
              </button>
            </div> */}
            <div className="space-y-3 text-[13px] text-white/80 pt-2 font-medium">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-yellow-400" /> +92 333 8005540
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-400" /> paklearnersofficial@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 text-center text-[10px] font-black text-white/40 tracking-widest uppercase">
          © 2026 PAKLEARNERS INC. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;