import ModPillar from "@/Components/ModPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { modFaqs } from "@/data/modFaqs";

const title = "MOD Jobs Pakistan – Ministry of Defence Test Preparation, MCQs & Past Papers";
const description =
  "Complete guide to Ministry of Defence (MOD) jobs in Pakistan — eligibility, recruitment process, test pattern, syllabus, and preparation strategy for BS-01 to BS-18 civilian posts.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/government-exams/mod" },
  openGraph: {
    title: `${title} | PakLearners`,
    description,
    url: "/government-exams/mod",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOD Jobs in Pakistan | PakLearners",
    description,
  },
};

const pageUrl = absoluteUrl("/government-exams/mod");
const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "MOD", path: "/government-exams/mod" },
];

export default function ModExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-mod"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "MOD Jobs in Pakistan – Complete Guide, Eligibility & Test Preparation",
          url: pageUrl,
          description,
          about: { "@type": "Thing", name: "Ministry of Defence jobs in Pakistan" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-mod"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "MOD Jobs in Pakistan – Complete Guide, Eligibility & Test Preparation",
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
      <JsonLd id="schema-breadcrumb-mod" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-mod" faqs={modFaqs} />
      <ModPillar />
    </>
  );
}
