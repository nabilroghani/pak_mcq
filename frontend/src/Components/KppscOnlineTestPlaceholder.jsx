"use client";

import Link from "next/link";
import { FaArrowLeft, FaClock } from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import { kppscOnlineTestsHubPath } from "@/data/kppscOnlineTestsData";

export default function KppscOnlineTestPlaceholder({ title, description, breadcrumbs, type = "post" }) {
  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-10 md:py-14 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <Link
            href={kppscOnlineTestsHubPath}
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> All KPPSC Online Tests
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight max-w-4xl">
            {title}
          </h1>
          <p className="text-blue-100/90 max-w-3xl text-sm md:text-base leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 -mt-8 pb-16">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-5">
            <FaClock size={22} />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-3">Coming Soon</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-md mx-auto">
            This {type === "subject" ? "subject-wise" : "post-wise"} KPPSC online test is being prepared
            and will be published here shortly. Bookmark the{" "}
            <Link href={kppscOnlineTestsHubPath} className="font-bold text-[#1565C0] hover:underline">
              KPPSC online tests hub
            </Link>{" "}
            to check back for updates.
          </p>
          <Link
            href={kppscOnlineTestsHubPath}
            className="inline-flex items-center gap-2 bg-[#1565C0] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to all KPPSC online tests
          </Link>
        </div>
      </div>
    </div>
  );
}
