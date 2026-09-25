import ModPastPapersContent from "@/Components/ModPastPapersContent";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { modPastPapersFaqs } from "@/data/modPastPapersFaqs";

const title = "MOD Past Papers – Ministry of Defence Test Preparation Guide & Sample Questions";
const description =
  "MOD past papers guide for Ministry of Defence recruitment tests — how to prepare, what to expect, and sample practice questions in the style of MOD's screening test.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/past-papers/mod" },
  openGraph: {
    title: `${title} | PakLearners`,
    description,
    url: "/past-papers/mod",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOD Past Papers | PakLearners",
    description,
  },
};

const pageUrl = absoluteUrl("/past-papers/mod");
const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Past Papers", path: "/past-papers" },
  { name: "MOD", path: "/past-papers/mod" },
];

export default function ModPastPapersPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-mod-past-papers"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "MOD Past Papers – Preparation Guide & Sample Practice Questions",
          url: pageUrl,
          description,
          about: { "@type": "Thing", name: "Ministry of Defence past papers" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-mod-past-papers"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "MOD Past Papers – Preparation Guide & Sample Practice Questions",
          description,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logoPath) },
          },
          dateModified: "2026-09-25",
          mainEntityOfPage: pageUrl,
        }}
      />
      <JsonLd id="schema-breadcrumb-mod-past-papers" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-mod-past-papers" faqs={modPastPapersFaqs} />
      <ModPastPapersContent />
    </>
  );
}
