import FpscPillar from "@/Components/FpscPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { fpscFaqs } from "@/data/fpscFaqs";

export const metadata = {
  title: "FPSC Exams in Pakistan – Complete Guide & Preparation",
  description:
    "Complete guide to FPSC exams in Pakistan — eligibility, syllabus, exam pattern, recruitment process, past papers and preparation strategy in one place.",
  alternates: {
    canonical: "/government-exams/fpsc",
  },
  openGraph: {
    title: "FPSC Exams in Pakistan – Complete Guide, Eligibility & Preparation",
    description:
      "Everything you need to know about FPSC exams — eligibility criteria, exam pattern, syllabus, recruitment process, past papers and a structured preparation strategy.",
    url: "/government-exams/fpsc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "FPSC Exams in Pakistan – Complete Preparation Guide",
    description:
      "Eligibility, syllabus, exam pattern, recruitment process, past papers & preparation strategy for FPSC exams — all in one guide.",
  },
};

const pageUrl = absoluteUrl("/government-exams/fpsc");

export default function FpscExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-fpsc"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "FPSC Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
          url: pageUrl,
          about: { "@type": "Thing", name: "FPSC Exams in Pakistan" },
          description:
            "Complete guide to FPSC exams in Pakistan — eligibility, syllabus, exam pattern, recruitment process, past papers and preparation strategy.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-fpsc"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "FPSC Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
          author: {
            "@type": "Organization",
            name: "PakLearners Editorial Team",
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl(siteConfig.logoPath),
            },
          },
          datePublished: "2026-07-01",
          dateModified: "2026-07-30",
          mainEntityOfPage: pageUrl,
          about: "FPSC Exams in Pakistan",
        }}
      />
      <JsonLd
        id="schema-learningresource-fpsc"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "FPSC Exams in Pakistan – Complete Preparation Guide",
          description:
            "Educational guide covering FPSC exam types, eligibility, recruitment process, syllabus, preparation strategy, past papers and FAQs.",
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: {
            "@type": "Organization",
            name: "PakLearners Editorial Team",
          },
          dateModified: "2026-07-30",
        }}
      />
      <JsonLd
        id="schema-breadcrumb-fpsc"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Government Exams",
              item: absoluteUrl("/government-exams"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "FPSC",
              item: pageUrl,
            },
          ],
        }}
      />
      <FaqSchema id="schema-faq-fpsc" faqs={fpscFaqs} />
      <FpscPillar />
    </>
  );
}
