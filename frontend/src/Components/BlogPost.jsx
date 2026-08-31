"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Breadcrumbs from "@/Components/Breadcrumbs";
import BlogCoverArt, { getBlogCoverVariant } from "@/Components/BlogCoverArt";
import { blogPostList } from "@/data/blogPosts";

function RichParagraph({ text, links = [] }) {
  if (!links.length) {
    return <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed">{text}</p>;
  }

  const parts = [];
  let remaining = text;

  links.forEach((link, i) => {
    const idx = remaining.indexOf(link.label);
    if (idx === -1) return;
    if (idx > 0) parts.push({ type: "text", value: remaining.slice(0, idx) });
    parts.push({ type: "link", ...link });
    remaining = remaining.slice(idx + link.label.length);
  });

  if (remaining) parts.push({ type: "text", value: remaining });

  if (parts.length === 0) {
    return (
      <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
        {text}{" "}
        {links.map((link) => (
          <InlineLink key={link.href} {...link} />
        ))}
      </p>
    );
  }

  return (
    <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed">
      {parts.map((part, i) =>
        part.type === "link" ? (
          <InlineLink key={`${part.href}-${i}`} href={part.href} label={part.label} external={part.external} />
        ) : (
          <span key={i}>{part.value}</span>
        )
      )}
    </p>
  );
}

function InlineLink({ href, label, external }) {
  const className = "font-bold text-[#1565C0] hover:underline";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        <FaExternalLinkAlt className="inline ml-0.5 mb-0.5" size={9} />
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function BlockRenderer({ block }) {
  switch (block.type) {
    case "paragraph":
      return <RichParagraph text={block.text} links={block.links} />;

    case "highlight":
      return (
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 px-5 py-4 text-center">
          <p className="text-sm md:text-base font-black text-[#1565C0] tracking-wide">{block.text}</p>
        </div>
      );

    case "bullets":
      return (
        <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5 items-start">
              <FaCheck className="text-emerald-500 mt-1 shrink-0" size={11} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="space-y-4">
          {block.items.map((item, i) => (
            <li key={item.title || i} className="flex gap-3 items-start">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#1565C0] text-white text-xs font-black flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed pt-0.5">
                <strong className="text-slate-900">{item.title}</strong> {item.text}
              </p>
            </li>
          ))}
        </ol>
      );

    case "checklist":
      return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-semibold text-slate-700"
            >
              <span className="w-4 h-4 rounded border-2 border-emerald-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "plans":
      return (
        <div className="space-y-4">
          {block.items.map((plan) => (
            <article key={plan.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-5">
              <h3 className="text-sm font-black text-[#1565C0] mb-3">{plan.title}</h3>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {plan.bullets.map((b) => (
                  <li key={b} className="flex gap-2 items-start">
                    <span className="text-slate-400 shrink-0">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      );

    case "timeline":
      return (
        <div className="space-y-4">
          {block.items.map((item) => (
            <article
              key={item.label}
              className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-white p-5"
            >
              <p className="text-[10px] font-black uppercase tracking-wider text-[#1565C0] mb-1">{item.label}</p>
              <h3 className="text-sm font-black text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="px-4 py-3 font-black text-xs uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {block.rows.map((row) => (
                <tr key={row.join("-")} className="align-top">
                  {row.map((cell, i) => (
                    <td
                      key={`${row[0]}-${i}`}
                      className={`px-4 py-3 leading-relaxed ${i === 0 ? "font-bold text-slate-900" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "subsections":
      return (
        <div className="space-y-4">
          {block.items.map((sub) => (
            <article key={sub.title} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 md:p-5">
              <h3 className="text-base font-black text-[#1565C0] mb-2">{sub.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{sub.text}</p>
            </article>
          ))}
        </div>
      );

    default:
      return null;
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost({ post }) {
  const [openFaq, setOpenFaq] = useState(0);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title },
  ];

  const otherPosts = blogPostList.filter((p) => p.slug !== post.slug);
  const coverVariant = getBlogCoverVariant(post);

  return (
    <article className="bg-slate-50 text-slate-800">
      {/* Hero with cover art */}
      <header className="relative overflow-hidden rounded-b-[2rem]">
        <BlogCoverArt variant={coverVariant} className="min-h-[220px] md:min-h-[280px]" showBadge={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/95 via-[#0d47a1]/55 to-transparent" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-6 pb-10 md:pb-12 pt-24 text-white max-w-3xl mx-auto">
          <div className="mb-4">
            <Breadcrumbs items={breadcrumbs} variant="light" />
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-sky-300 hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft size={10} /> Back to Blog
          </Link>
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.15em] text-orange-300 bg-white/15 border border-white/25 rounded-full px-3 py-1 mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight drop-shadow-sm">
            {post.headline}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-blue-100/90">
            <span className="inline-flex items-center gap-1.5">
              <FaUser size={10} /> {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaCalendarAlt size={10} /> {formatDate(post.datePublished)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaClock size={10} /> {post.readTime}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {/* Intro */}
        <div className="relative bg-white rounded-3xl border border-slate-100 shadow-lg p-6 md:p-8 mb-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1565C0] via-indigo-500 to-sky-400" />
          <p className="text-base md:text-lg text-slate-700 leading-relaxed font-medium">{post.intro}</p>
          {post.lead && (
            <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed mt-4">{post.lead}</p>
          )}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-100">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-blue-50 text-[#1565C0] border border-blue-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Table of contents */}
        {post.sections?.length > 3 && (
          <nav className="bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 mb-8" aria-label="Table of contents">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-[#1565C0] mb-4">In This Guide</h2>
            <ol className="space-y-2">
              {post.sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm font-semibold text-slate-700 hover:text-[#1565C0] transition-colors flex gap-2"
                  >
                    <span className="text-slate-400 shrink-0">{i + 1}.</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Sections */}
        <div className="space-y-8">
          {post.sections?.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-lg transition-shadow p-6 md:p-8 scroll-mt-24"
            >
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-5 pb-3 border-b border-slate-100 flex items-center gap-3">
                <span className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[#1565C0] to-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-sm">
                  {post.sections.indexOf(section) + 1}
                </span>
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.blocks.map((block, i) => (
                  <BlockRenderer key={`${section.id}-${i}`} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* FAQ */}
        {post.faqs?.length > 0 && (
          <section id="faq" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 mt-8 scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-5">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {post.faqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={faq.q} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-slate-50 hover:bg-slate-100/80 transition-colors"
                      aria-expanded={open}
                    >
                      <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                      <FaChevronDown
                        size={12}
                        className={`text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    {open && (
                      <div className="px-4 py-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Related links */}
        {post.relatedLinks?.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 mt-8">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">Related Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {post.relatedLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 bg-slate-50 border border-slate-100 text-slate-800 hover:border-blue-200 hover:bg-blue-50/60 transition-all"
                >
                  <span className="text-sm font-bold">{link.name}</span>
                  <FaArrowRight
                    size={11}
                    className="text-slate-300 group-hover:text-[#1565C0] group-hover:translate-x-0.5 transition-all"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* More articles */}
        {otherPosts.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">More Articles</h2>
            <div className="space-y-3">
              {otherPosts.slice(0, 3).map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="group flex items-start justify-between gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wide text-[#1565C0]">{other.category}</span>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-[#1565C0] transition-colors mt-1">
                      {other.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{other.excerpt}</p>
                  </div>
                  <FaArrowRight className="text-slate-300 group-hover:text-[#1565C0] mt-1 shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Author / EEAT */}
        <footer className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 mt-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 mb-3">
            <span>
              <strong className="text-slate-900">Written By:</strong> {post.author}
            </span>
            <span>
              <strong className="text-slate-900">Last Updated:</strong> {formatDate(post.dateModified)}
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            This article is part of PakLearners&apos; exam preparation guides. Always verify eligibility, syllabus,
            and exam dates against{" "}
            <a
              href="https://www.kppsc.gov.pk/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#1565C0] hover:underline"
            >
              official KPPSC announcements
            </a>{" "}
            before applying or finalizing your study plan.
          </p>
        </footer>
      </div>
    </article>
  );
}
