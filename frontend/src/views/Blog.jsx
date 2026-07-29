"use client";

import Link from "next/link";
import { FaNewspaper, FaArrowRight } from "react-icons/fa";

const posts = [
  {
    title: "How to Prepare for FPSC & PPSC Exams",
    excerpt: "A practical roadmap covering MCQs practice, past papers and online tests.",
    path: "/government-exams",
  },
  {
    title: "Daily Current Affairs Strategy for Competitive Exams",
    excerpt: "Learn how to revise Pakistan and world affairs effectively for NTS and CSS-style tests.",
    path: "/current-affairs",
  },
  {
    title: "Best Subject-Wise MCQs Practice Plan",
    excerpt: "Build accuracy with General Knowledge, Pakistan Studies, Islamic Studies and more.",
    path: "/mcqs",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-6 py-12 md:py-16 text-white rounded-b-[2rem]">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 text-sky-300 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
            <FaNewspaper /> Pak Learners Blog
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
            Exam Tips & Preparation Guides
          </h1>
          <p className="text-blue-100/80 max-w-2xl text-sm md:text-base">
            Articles, strategies and updates to help you prepare smarter for government exams across Pakistan.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 pb-16 space-y-3">
        {posts.map((post) => (
          <Link
            key={post.title}
            href={post.path}
            className="group flex items-start justify-between gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#1565C0] transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{post.excerpt}</p>
            </div>
            <FaArrowRight className="text-slate-300 group-hover:text-[#1565C0] mt-1 shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
