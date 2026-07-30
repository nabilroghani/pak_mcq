import PpscPillar from "@/Components/PpscPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { ppscFaqs } from "@/data/ppscFaqs";

export const metadata = {
  title: "PPSC Exams in Pakistan – Complete Guide & Preparation",
  description:
    "Complete guide to PPSC exams in Pakistan — eligibility, syllabus, exam pattern, recruitment process, past papers and preparation strategy in one place.",
  alternates: {
    canonical: "/government-exams/ppsc",
  },
  openGraph: {
    title: "PPSC Exams in Pakistan – Complete Guide, Eligibility & Preparation",
    description:
      "Everything you need to know about PPSC exams — eligibility criteria, exam pattern, syllabus, recruitment process, past papers and a structured preparation strategy.",
    url: "/government-exams/ppsc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PPSC Exams in Pakistan – Complete Preparation Guide",
    description:
      "Eligibility, syllabus, exam pattern, recruitment process, past papers & preparation strategy for PPSC exams — all in one guide.",
  },
};

const pageUrl = absoluteUrl("/government-exams/ppsc");

export default function PpscExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-ppsc"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "PPSC Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
          url: pageUrl,
          about: { "@type": "Thing", name: "PPSC Exams in Pakistan" },
          description:
            "Complete guide to PPSC exams in Pakistan — eligibility, syllabus, exam pattern, recruitment process, past papers and preparation strategy.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-ppsc"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "PPSC Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
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
          about: "PPSC Exams in Pakistan",
        }}
      />
      <JsonLd
        id="schema-learningresource-ppsc"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "PPSC Exams in Pakistan – Complete Preparation Guide",
          description:
            "Educational guide covering PPSC exam types, eligibility, recruitment process, syllabus, preparation strategy, past papers and FAQs.",
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
        id="schema-breadcrumb-ppsc"
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
              name: "PPSC",
              item: pageUrl,
            },
          ],
        }}
      />
      <FaqSchema id="schema-faq-ppsc" faqs={ppscFaqs} />
      <PpscPillar />
    </>
  );
}
