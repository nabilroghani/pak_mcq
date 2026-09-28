import AsfPillar from "@/Components/AsfPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { asfFaqs } from "@/data/asfFaqs";

const title = "ASF Jobs via FPSC – Eligibility, Test Pattern & Past Papers Guide";
const description =
  "Complete guide to ASF (Airport Security Force) recruitment through FPSC — eligibility for Assistant Director and Inspector posts, physical standards, test pattern, and preparation strategy.";
const headline =
  "ASF (Airport Security Force) Jobs via FPSC – Eligibility, Test Pattern & Preparation";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/government-exams/fpsc/asf" },
  openGraph: {
    title: `${title} | PakLearners`,
    description,
    url: "/government-exams/fpsc/asf",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASF Jobs via FPSC | PakLearners",
    description,
  },
};

const pageUrl = absoluteUrl("/government-exams/fpsc/asf");
const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "FPSC", path: "/government-exams/fpsc" },
  { name: "ASF", path: "/government-exams/fpsc/asf" },
];

export default function AsfExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-asf"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: headline,
          url: pageUrl,
          description,
          about: { "@type": "Thing", name: "Airport Security Force jobs via FPSC" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-asf"
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
          datePublished: "2026-09-26",
          dateModified: "2026-09-26",
          mainEntityOfPage: pageUrl,
        }}
      />
      <JsonLd id="schema-breadcrumb-asf" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-asf" faqs={asfFaqs} />
      <AsfPillar />
    </>
  );
}
