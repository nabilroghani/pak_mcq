import fs from "fs";
import path from "path";
import {
  siteSections,
  governmentExamPillars,
  mcqExamPillars,
  pastPaperPillars,
  onlineTestPillars,
  currentAffairsPillars,
  studyResourcePillars,
} from "@/data/siteStructure";
import { kppscSubPageList } from "@/data/kppscSubPages";

/**
 * Builds the public URL list for sitemap.xml.
 * - Static routes: auto-discovered from src/app/(site) page files
 * - Dynamic routes: expanded from siteStructure pillars (add a pillar, it appears here)
 */
function walkSitePages(dir, baseRoute = "") {
  const routes = [];
  if (!fs.existsSync(dir)) return routes;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "api") continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Dynamic segment folders like [examSlug] — skipped here; expanded from data below
      if (entry.name.startsWith("[")) continue;
      const segment = entry.name;
      routes.push(...walkSitePages(full, `${baseRoute}/${segment}`));
      continue;
    }

    if (entry.name === "page.jsx" || entry.name === "page.js" || entry.name === "page.tsx") {
      routes.push(baseRoute || "/");
    }
  }

  return routes;
}

function pillarPaths(base, pillars) {
  return Object.values(pillars).map((p) => `${base}/${p.slug}`);
}

function sectionLinkPaths() {
  return Object.values(siteSections).flatMap((section) => [
    `/${section.slug}`,
    ...(section.links || []).map((l) => l.path),
    ...(section.related || []).map((l) => l.path),
  ]);
}

export function getPublicSitemapPaths() {
  const siteDir = path.join(process.cwd(), "src", "app", "(site)");
  const discovered = walkSitePages(siteDir);

  const fromData = [
    ...sectionLinkPaths(),
    ...pillarPaths("/government-exams", governmentExamPillars),
    ...kppscSubPageList.map((p) => `/government-exams/kppsc/${p.slug}`),
    ...pillarPaths("/mcqs", mcqExamPillars),
    ...pillarPaths("/past-papers", pastPaperPillars),
    ...pillarPaths("/online-tests", onlineTestPillars),
    ...pillarPaths("/current-affairs", currentAffairsPillars),
    ...pillarPaths("/study-resources", studyResourcePillars),
    "/online-tests/start",
    "/study-resources/books",
    "/results",
    "/submit",
    "/fpsc-past-papers",
    "/css-past-papers",
  ];

  const exclude = new Set([
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/admin",
  ]);

  const normalized = [...discovered, ...fromData]
    .map((p) => {
      if (!p || p === "/") return "/";
      const clean = p.replace(/\/+/g, "/").replace(/\/$/, "");
      return clean || "/";
    })
    .filter((p) => {
      if (exclude.has(p)) return false;
      if (p.startsWith("/admin")) return false;
      if (p.startsWith("/reset-password")) return false;
      if (p.includes("[")) return false;
      return true;
    });

  return [...new Set(normalized)].sort((a, b) => a.localeCompare(b));
}
