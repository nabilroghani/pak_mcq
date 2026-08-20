import OtsPillar from "@/Components/OtsPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { otsFaqs } from "@/data/otsFaqs";

export const metadata = {
  title: "OTS Tests in Pakistan – Jobs, Syllabus & MCQs Preparation",
  description:
    "Complete OTS guide — what Open Testing Service tests cover, how they compare to NTS, registration process and MCQs preparation strategy.",
  alternates: { canonical: "/government-exams/ots" },
  openGraph: {
    title: "OTS Tests in Pakistan – Jobs, Syllabus & Preparation | PakLearners",
    description:
      "Guide to OTS tests in Pakistan — test types, syllabus, registration and effective MCQs preparation.",
    url: "/government-exams/ots",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "OTS Test Preparation Guide | PakLearners",
    description: "OTS tests explained — syllabus, registration, MCQs practice and comparison with NTS.",
  },
};

const pageUrl = absoluteUrl("/government-exams/ots");
const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "OTS", path: "/government-exams/ots" },
];

export default function OtsExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-ots"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "OTS Tests in Pakistan – Jobs, Syllabus & MCQs Preparation",
          url: pageUrl,
          about: { "@type": "Thing", name: "OTS Tests in Pakistan" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-ots"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "OTS Tests in Pakistan – Jobs, Syllabus & MCQs Preparation",
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logoPath) },
          },
          dateModified: "2026-08-01",
          mainEntityOfPage: pageUrl,
        }}
      />
      <JsonLd id="schema-breadcrumb-ots" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-ots" faqs={otsFaqs} />
      <OtsPillar />
    </>
  );
}
