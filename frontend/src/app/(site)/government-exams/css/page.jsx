import CssPillar from "@/Components/CssPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { cssFaqs } from "@/data/cssFaqs";

export const metadata = {
  title: "CSS Exam in Pakistan – Syllabus, Eligibility & Preparation",
  description:
    "Complete CSS exam guide — eligibility, compulsory and optional subjects, exam stages, preparation strategy and how CSS compares to PMS.",
  alternates: { canonical: "/government-exams/css" },
  openGraph: {
    title: "CSS Exam in Pakistan – Syllabus, Eligibility & Preparation | PakLearners",
    description:
      "Everything you need to know about the CSS exam — FPSC eligibility, compulsory subjects, optional papers, exam stages and preparation tips.",
    url: "/government-exams/css",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Exam Preparation Guide | PakLearners",
    description: "CSS syllabus, eligibility, exam pattern and preparation strategy for Pakistan's premier civil service exam.",
  },
};

const pageUrl = absoluteUrl("/government-exams/css");
const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "CSS", path: "/government-exams/css" },
];

export default function CssExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-css"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "CSS Exam in Pakistan – Syllabus, Eligibility & Preparation",
          url: pageUrl,
          about: { "@type": "Thing", name: "CSS Exam in Pakistan" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-css"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "CSS Exam in Pakistan – Syllabus, Eligibility & Preparation",
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
      <JsonLd id="schema-breadcrumb-css" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-css" faqs={cssFaqs} />
      <CssPillar />
    </>
  );
}
