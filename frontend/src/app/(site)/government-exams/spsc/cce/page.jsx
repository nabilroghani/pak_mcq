import SpscCcePillar from "@/Components/SpscCcePillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { spscCceFaqs } from "@/data/spscCceFaqs";

const title =
  "SPSC CCE 2026 – Combined Competitive Examination Guide, Syllabus & Past Papers";
const description =
  "Complete guide to SPSC's Combined Competitive Examination (CCE) — eligibility, 12-paper structure, compulsory and optional subjects, syllabus, and preparation strategy for Sindh's top provincial exam.";
const headline =
  "SPSC CCE – Combined Competitive Examination Guide, Syllabus & Preparation";
const canonical = "/government-exams/spsc/cce";

export const metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title: `${title} | PakLearners`,
    description,
    url: canonical,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | PakLearners`,
    description,
  },
};

const pageUrl = absoluteUrl(canonical);
const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "SPSC", path: "/government-exams/spsc" },
  { name: "CCE", path: canonical },
];

export default function SpscCcePage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-spsc-cce"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: headline,
          url: pageUrl,
          description,
          about: { "@type": "Thing", name: "SPSC Combined Competitive Examination" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-spsc-cce"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline,
          description,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logoPath) },
          },
          datePublished: "2026-09-30",
          dateModified: "2026-09-30",
          mainEntityOfPage: pageUrl,
          about: "SPSC Combined Competitive Examination",
        }}
      />
      <JsonLd
        id="schema-learningresource-spsc-cce"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: headline,
          description,
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          dateModified: "2026-09-30",
        }}
      />
      <JsonLd id="schema-breadcrumb-spsc-cce" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-spsc-cce" faqs={spscCceFaqs} />
      <SpscCcePillar />
    </>
  );
}
