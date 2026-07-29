import { absoluteUrl } from "@/data/siteConfig";
import { getPublicSitemapPaths } from "@/seo/getPublicSitemapPaths";

export const dynamic = "force-dynamic";

export default function sitemap() {
  const now = new Date();

  return getPublicSitemapPaths().map((route) => {
    const isHome = route === "/";
    const isHub =
      route === "/government-exams" ||
      route === "/mcqs" ||
      route === "/past-papers" ||
      route === "/online-tests" ||
      route === "/jobs" ||
      route === "/current-affairs";

    return {
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: isHome || isHub ? "daily" : "weekly",
      priority: isHome ? 1 : isHub ? 0.9 : 0.7,
    };
  });
}
