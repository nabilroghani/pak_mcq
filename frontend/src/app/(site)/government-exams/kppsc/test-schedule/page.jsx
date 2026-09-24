import KppscTestSchedulePillar from "@/Components/KppscTestSchedulePillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscTestScheduleFaqs } from "@/data/kppscTestScheduleFaqs";

const title = "KPPSC Test Schedule 2026 – Written, Physical & Interview Dates by Post";
const description =
  "Track official KPPSC test schedules 2026 — physical test, written exam, and interview dates by post, advertisement number, and case number. Updated as KPPSC announces new schedules.";
const headline = "KPPSC Test Schedule 2026 – Physical, Written & Interview Dates";
const canonical = "/government-exams/kppsc/test-schedule";

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
  { name: "KPPSC", path: "/government-exams/kppsc" },
  { name: "Test Schedule", path: canonical },
];

export default function KppscTestSchedulePage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-kppsc-test-schedule"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: headline,
          url: pageUrl,
          description,
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-kppsc-test-schedule"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logoPath) },
          },
          datePublished: "2026-09-24",
          dateModified: "2026-09-24",
          mainEntityOfPage: pageUrl,
          about: "KPPSC Test Schedule 2026",
        }}
      />
      <JsonLd
        id="schema-breadcrumb-kppsc-test-schedule"
        data={buildBreadcrumbSchema(breadcrumbs)}
      />
      <FaqSchema id="schema-faq-kppsc-test-schedule" faqs={kppscTestScheduleFaqs} />
      <KppscTestSchedulePillar />
    </>
  );
}
