"use client";

import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

/**
 * Visible, crawlable breadcrumb navigation for SEO and UX.
 * @param {{ items: { name: string, path?: string }[], variant?: 'default' | 'light' }} props
 */
export default function Breadcrumbs({ items = [], variant = "default" }) {
  if (!items.length) return null;

  const isLight = variant === "light";

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol
        className={`flex flex-wrap items-center gap-1.5 text-[11px] md:text-xs font-semibold ${
          isLight ? "text-white/70" : "text-slate-500"
        }`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <FaChevronRight
                  size={8}
                  className={`shrink-0 ${isLight ? "text-white/40" : "text-slate-300"}`}
                  aria-hidden="true"
                />
              )}
              {isLast || !item.path ? (
                <span
                  className={isLight ? "text-white" : "text-slate-700"}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className={
                    isLight
                      ? "text-sky-200 hover:text-white hover:underline"
                      : "text-[#1565C0] hover:underline"
                  }
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
