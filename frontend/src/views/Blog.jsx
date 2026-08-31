"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaNewspaper,
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaBookOpen,
  FaStar,
  FaUser,
  FaGraduationCap,
  FaFileAlt,
} from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import BlogCoverArt, { getBlogCoverVariant } from "@/Components/BlogCoverArt";
import { blogPostList } from "@/data/blogPosts";

const categories = ["All", "KPPSC Preparation"];

const cardAccents = {
  "KPPSC Preparation": {
    icon: FaGraduationCap,
    glow: "group-hover:shadow-blue-200/60",
    badge: "bg-orange-400/90 text-white border-orange-300/50",
  },
  default: {
    icon: FaFileAlt,
    glow: "group-hover:shadow-slate-200/60",
    badge: "bg-[#1565C0]/90 text-white border-blue-300/50",
  },
};

function getAccent(category) {
  return cardAccents[category] || cardAccents.default;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function CoverImage({ post, featured = false, className = "" }) {
  return (
    <BlogCoverArt
      variant={getBlogCoverVariant(post)}
      className={className}
      showBadge
    />
  );
}

function PostCard({ post, featured = false }) {
  const accent = getAccent(post.category);
  const Icon = accent.icon;

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={`group relative block bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden mb-10 hover:shadow-2xl ${accent.glow} transition-all duration-300 hover:-translate-y-1`}
      >
        <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
          <FaStar size={9} /> Featured
        </div>
        <div className="grid lg:grid-cols-12 gap-0">
          <CoverImage
            post={post}
            featured
            className="lg:col-span-5 min-h-[260px] lg:min-h-[320px]"
          />
          <div className="lg:col-span-7 p-7 md:p-9 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/80 relative">
            <div>
              <div className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] mb-4 px-3 py-1 rounded-full border ${accent.badge}`}>
                <Icon size={10} /> {post.category}
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 leading-tight group-hover:text-[#1565C0] transition-colors mb-3">
                {post.title}
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed line-clamp-4">{post.excerpt}</p>
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 border border-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold">
                <span className="inline-flex items-center gap-1.5">
                  <FaUser size={10} className="text-[#1565C0]" /> PakLearners
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FaCalendarAlt size={10} /> {formatDate(post.datePublished)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FaClock size={10} /> {post.readTime}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#1565C0] bg-blue-50 px-4 py-2.5 rounded-xl group-hover:bg-[#1565C0] group-hover:text-white transition-all">
                Read guide <FaArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative flex flex-col bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden hover:shadow-xl ${accent.glow} transition-all duration-300 hover:-translate-y-1`}
    >
      <CoverImage post={post} className="h-44 sm:h-48" />
      <div className="absolute top-12 left-4 z-10">
        <div className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full border shadow-sm ${accent.badge}`}>
          <Icon size={9} /> {post.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1 -mt-1 relative z-10 bg-white rounded-t-3xl">
        <h2 className="text-lg font-black text-slate-900 group-hover:text-[#1565C0] transition-colors leading-snug mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#1565C0]">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold">
            <span className="inline-flex items-center gap-1">
              <FaCalendarAlt size={9} /> {formatDate(post.datePublished)}
            </span>
            <span className="inline-flex items-center gap-1">
              <FaClock size={9} /> {post.readTime}
            </span>
          </div>
          <span className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#1565C0] group-hover:text-white group-hover:border-[#1565C0] transition-all">
            <FaArrowRight size={10} />
          </span>
        </div>
      </div>
    </Link>
  );
}

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPostList
      : blogPostList.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const breadcrumbs = [{ name: "Home", path: "/" }, { name: "Blog" }];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 px-4 md:px-6 py-12 md:py-16 text-white relative overflow-hidden rounded-b-[2rem]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-20 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbs} variant="light" />
          <div className="inline-flex items-center gap-2 text-sky-300 text-[10px] font-black uppercase tracking-[0.2em] mb-3 mt-2 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">
            <FaNewspaper /> PakLearners Blog
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 max-w-3xl leading-tight">
            Exam Tips &amp; Preparation Guides
          </h1>
          <p className="text-blue-100/80 max-w-2xl text-sm md:text-base leading-relaxed">
            In-depth strategies, study plans, and practical guides to help you prepare smarter for
            FPSC, PPSC, KPPSC, NTS, and other government exams across Pakistan.
          </p>
          <p className="text-sky-300/70 text-xs mt-4 font-semibold">
            {blogPostList.length} article{blogPostList.length !== 1 ? "s" : ""} · Updated regularly
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Category filter */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filter</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#1565C0] text-white border-[#1565C0] shadow-lg shadow-blue-200/50 scale-105"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-[#1565C0] hover:shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
            No articles in this category yet. Check back soon.
          </div>
        )}

        {featured && <PostCard post={featured} featured />}

        {rest.length > 0 && (
          <>
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-5">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}

        {/* CTA strip */}
        <div className="mt-14 relative bg-gradient-to-br from-[#0d47a1] via-[#1565C0] to-slate-900 rounded-3xl p-8 md:p-10 text-white overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-sky-300 text-[10px] font-black uppercase tracking-[0.15em] mb-2 bg-white/10 px-3 py-1 rounded-full">
                <FaBookOpen size={11} /> Practice While You Learn
              </div>
              <h2 className="text-xl md:text-2xl font-black mb-2">Ready to Start Practicing?</h2>
              <p className="text-blue-100/80 text-sm max-w-lg leading-relaxed">
                Pair these guides with subject-wise MCQs, past papers, and online tests on PakLearners.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/government-exams/kppsc"
                className="inline-flex items-center gap-2 bg-white text-[#1565C0] text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-50 shadow-lg transition-all hover:-translate-y-0.5"
              >
                KPPSC Preparation <FaArrowRight size={11} />
              </Link>
              <Link
                href="/mcqs"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-white/20 transition-all"
              >
                Browse MCQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
