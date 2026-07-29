"use client";

import React from "react";
import logo from "../assets/logo.webp";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { footerLinks } from "../data/siteStructure";
import { siteConfig } from "../data/siteConfig";
import { imgSrc } from "../utils/imgSrc";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, url: "https://www.facebook.com/share/18P9BbsVuz/" },
    { icon: FaTwitter, url: "#" },
    { icon: FaInstagram, url: "#" },
    { icon: FaWhatsapp, url: siteConfig.whatsappChannel },
  ];

  return (
    <footer className="bg-[#1565C0] text-white pt-16 pb-8 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 text-center md:text-left">
            <Link href="/">
              <img
                src={imgSrc(logo) || "/images/logo.webp"}
                alt="Pak Learners Logo"
                className="w-48 h-auto object-contain brightness-0 invert mx-auto md:mx-0"
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Pakistan&apos;s platform for MCQs, past papers, online tests and government exam
              preparation.
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

          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-yellow-400 pl-3 uppercase">
              Preparation Tools
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <Link
                href="/jobs"
                className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 px-4 py-3 rounded-xl text-xs font-black uppercase transition-all shadow-lg"
              >
                Daily Job Updates
              </Link>
              <Link
                href="/past-papers"
                className="flex items-center justify-center bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl text-xs font-black uppercase border border-white/20 transition-all"
              >
                Download Past Papers
              </Link>
              <Link
                href="/mcqs"
                className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 px-4 py-3 rounded-xl text-xs font-black uppercase shadow-lg transition-all"
              >
                Browse MCQs
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-yellow-400 pl-3 uppercase">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-3 text-white/70 text-sm font-bold uppercase">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="hover:text-yellow-400">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold border-l-4 border-yellow-400 pl-3 uppercase tracking-tighter">
              Stay Connected
            </h3>
            <div className="space-y-3 text-[13px] text-white/80 pt-2 font-medium">
              <a
                href={`tel:${siteConfig.phoneE164}`}
                className="flex items-center gap-3 hover:text-yellow-400"
              >
                <FaPhoneAlt className="text-yellow-400" /> {siteConfig.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 hover:text-yellow-400 break-all"
              >
                <FaEnvelope className="text-yellow-400 shrink-0" /> {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-[10px] font-black text-white/40 tracking-widest uppercase">
          © 2026 PAKLEARNERS INC. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
