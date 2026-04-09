import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
  // Social Links Mapping
  const socialLinks = [
    { icon: FaFacebookF, url: "https://www.facebook.com/share/18P9BbsVuz/" },
    { icon: FaTwitter, url: "#" }, // Aap yahan apna twitter link dal sakte hain
    { icon: FaInstagram, url: "#" }, // Aap yahan apna instagram link dal sakte hain
    { icon: FaWhatsapp, url: "https://whatsapp.com/channel/0029VbCMkBc9RZATvADmza08" },
  ];

  return (
    <footer className="bg-[#1565C0] text-white pt-16 pb-8 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Social Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter italic">
              PAK <span className="text-yellow-400">LEARNERS</span>
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Pakistan's #1 platform for MCQs preparation. We help thousands of students achieve their dreams.
            </p>
            <div className="flex gap-4">
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

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-yellow-400 pl-3 uppercase">Quick Links</h3>
            <ul className="space-y-3 text-white/70 text-sm font-bold">
              <li><a href="/" className="hover:text-yellow-400">Home Page</a></li>
              <li><a href="/past-papers" className="hover:text-yellow-400">Past Papers</a></li>
              <li><a href="/submit" className="hover:text-yellow-400">Submit MCQs</a></li>
              <li><a href="/about" className="hover:text-yellow-400">About Us</a></li>
            </ul>
          </div>

          {/* Top Subjects */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-yellow-400 pl-3 uppercase">Top Subjects</h3>
            <ul className="space-y-3 text-white/70 text-sm font-bold">
              <li><a href="/category/general-knowledge" className="hover:text-yellow-400">General Knowledge</a></li>
              <li><a href="/category/pak-study" className="hover:text-yellow-400">Pakistan Studies</a></li>
              <li><a href="/category/islamic-studies" className="hover:text-yellow-400">Islamic Studies</a></li>
              <li><a href="/category/computer" className="hover:text-yellow-400">Computer Science</a></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-yellow-400 pl-3 uppercase tracking-tighter">Newsletter</h3>
            <div className="flex bg-white/10 rounded-xl p-1 border border-white/20">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent border-none outline-none px-4 py-2 w-full text-sm placeholder:text-white/50" 
              />
              <button className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all">
                <FaPaperPlane />
              </button>
            </div>
            <div className="space-y-2 text-sm text-white/80 pt-2">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-yellow-400" /> +92 300 1234567
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-400" /> info@paklearners.com
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