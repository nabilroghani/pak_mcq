"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Layout/Navbar";
import Header from "@/Layout/Header";
import Footer from "@/Layout/Footer";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const isFullWidth =
    pathname === "/" ||
    pathname.startsWith("/category/") ||
    pathname === "/government-exams/kppsc";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Header />
      <main
        className={
          isFullWidth
            ? "w-full max-w-none mx-0 px-0 mt-0 pb-10 md:max-w-7xl md:mx-auto md:px-4 md:mt-8"
            : "max-w-7xl mx-auto px-4 mt-8 pb-10 w-full"
        }
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
