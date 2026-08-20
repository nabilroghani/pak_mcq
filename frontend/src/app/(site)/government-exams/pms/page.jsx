import PmsPillar from "@/Components/PmsPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { pmsFaqs } from "@/data/pmsFaqs";

export const metadata = {
  title: "PMS Exam in Pakistan – Syllabus, Eligibility & Preparation",
  description:
    "Complete PMS exam guide — provincial management service eligibility, exam pattern, compulsory subjects and preparation strategy for PPSC and KPPSC.",
  alternates: { canonical: "/government-exams/pms" },
  openGraph: {
    title: "PMS Exam in Pakistan – Syllabus, Eligibility & Preparation | PakLearners",
    description:
      "Everything about the PMS exam — eligibility, written papers, interview stage and how PMS compares to CSS.",
    url: "/government-exams/pms",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PMS Exam Preparation Guide | PakLearners",
    description: "PMS syllabus, eligibility, exam pattern and preparation tips for provincial competitive exams.",
  },
};

const pageUrl = absoluteUrl("/government-exams/pms");
const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "PMS", path: "/government-exams/pms" },
];

export default function PmsExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-pms"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "PMS Exam in Pakistan – Syllabus, Eligibility & Preparation",
          url: pageUrl,
          about: { "@type": "Thing", name: "PMS Exam in Pakistan" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-pms"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "PMS Exam in Pakistan – Syllabus, Eligibility & Preparation",
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
      <JsonLd id="schema-breadcrumb-pms" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-pms" faqs={pmsFaqs} />
      <PmsPillar />
    </>
  );
}
