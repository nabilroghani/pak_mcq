import SpscPillar from "@/Components/SpscPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { spscFaqs } from "@/data/spscFaqs";

export const metadata = {
  title: "SPSC Exams in Pakistan – Complete Guide & Preparation",
  description:
    "Complete guide to SPSC exams in Pakistan — eligibility, syllabus, exam pattern, recruitment process, past papers and preparation strategy in one place.",
  alternates: {
    canonical: "/government-exams/spsc",
  },
  openGraph: {
    title: "SPSC Exams in Pakistan – Complete Guide, Eligibility & Preparation",
    description:
      "Everything you need to know about SPSC exams — eligibility criteria, exam pattern, syllabus, recruitment process, past papers and a structured preparation strategy.",
    url: "/government-exams/spsc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPSC Exams in Pakistan – Complete Preparation Guide",
    description:
      "Eligibility, syllabus, exam pattern, recruitment process, past papers & preparation strategy for SPSC exams — all in one guide.",
  },
};

const pageUrl = absoluteUrl("/government-exams/spsc");

export default function SpscExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-spsc"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "SPSC Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
          url: pageUrl,
          about: { "@type": "Thing", name: "SPSC Exams in Pakistan" },
          description:
            "Complete guide to SPSC exams in Pakistan — eligibility, syllabus, exam pattern, recruitment process, past papers and preparation strategy.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-spsc"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "SPSC Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
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
          dateModified: "2026-07-31",
          mainEntityOfPage: pageUrl,
          about: "SPSC Exams in Pakistan",
        }}
      />
      <JsonLd
        id="schema-learningresource-spsc"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "SPSC Exams in Pakistan – Complete Preparation Guide",
          description:
            "Educational guide covering SPSC exam types, eligibility, recruitment process, syllabus, preparation strategy, past papers and FAQs.",
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: {
            "@type": "Organization",
            name: "PakLearners Editorial Team",
          },
          dateModified: "2026-07-31",
        }}
      />
      <JsonLd
        id="schema-breadcrumb-spsc"
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
              name: "SPSC",
              item: pageUrl,
            },
          ],
        }}
      />
      <FaqSchema id="schema-faq-spsc" faqs={spscFaqs} />
      <SpscPillar />
    </>
  );
}
