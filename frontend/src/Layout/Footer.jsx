import React from 'react';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, 
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter italic">
              PAK <span className="text-cyan-400">LEARNERS.</span>
            </h2>
            <p className="text-blue-100/70 text-sm leading-relaxed">
              Pakistan's #1 platform for MCQs and competitive exam preparation. We help thousands of students achieve their dreams in PPSC, FPSC, and NTS exams.
            </p>
            <div className="flex gap-4 pt-2">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 hover:bg-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300 group">
                  <Icon className="text-white group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-cyan-500 pl-3">Quick Links</h3>
            <ul className="space-y-4 text-blue-100/70 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Home Page</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Past Papers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Online Quiz</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Submit MCQs</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* 3. Popular Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-cyan-500 pl-3">Popular Categories</h3>
            <ul className="space-y-4 text-blue-100/70 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">General Knowledge</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Pakistan Studies</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Islamic Studies</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Everyday Science</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Computer Science</a></li>
            </ul>
          </div>

          {/* 4. Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-cyan-500 pl-3">Newsletter</h3>
            <p className="text-blue-100/70 text-sm italic">Stay updated with latest MCQs.</p>
            <div className="flex bg-white/5 rounded-xl p-1 border border-white/10 focus-within:border-cyan-500 transition-all">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent border-none outline-none px-4 py-2 w-full text-sm"
              />
              <button className="bg-cyan-500 p-3 rounded-lg hover:bg-white hover:text-cyan-600 transition-all">
                <FaPaperPlane />
              </button>
            </div>
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm text-blue-100/70">
                <FaPhoneAlt className="text-cyan-400" /> +92 300 1234567
              </div>
              <div className="flex items-center gap-3 text-sm text-blue-100/70">
                <FaEnvelope className="text-cyan-400" /> info@paklearners.com
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-blue-100/40 tracking-widest uppercase">
          <p>© 2026 PAKLEARNERS INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;