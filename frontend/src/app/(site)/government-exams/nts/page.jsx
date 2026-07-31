import NtsPillar from "@/Components/NtsPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { ntsFaqs } from "@/data/ntsFaqs";

export const metadata = {
  title: "NTS Exams in Pakistan – Complete Guide & Preparation",
  description:
    "Complete guide to NTS exams in Pakistan — eligibility, syllabus, test pattern, registration process, past papers and preparation strategy in one place.",
  alternates: {
    canonical: "/government-exams/nts",
  },
  openGraph: {
    title: "NTS Exams in Pakistan – Complete Guide, Eligibility & Preparation",
    description:
      "Everything you need to know about NTS exams — eligibility criteria, test pattern, syllabus, registration process, past papers and a structured preparation strategy.",
    url: "/government-exams/nts",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "NTS Exams in Pakistan – Complete Preparation Guide",
    description:
      "Eligibility, syllabus, test pattern, registration process, past papers & preparation strategy for NTS exams — all in one guide.",
  },
};

const pageUrl = absoluteUrl("/government-exams/nts");

export default function NtsExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-nts"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "NTS Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
          url: pageUrl,
          about: { "@type": "Thing", name: "NTS Exams in Pakistan" },
          description:
            "Complete guide to NTS exams in Pakistan — eligibility, syllabus, test pattern, registration process, past papers and preparation strategy.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-nts"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "NTS Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
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
          about: "NTS Exams in Pakistan",
        }}
      />
      <JsonLd
        id="schema-learningresource-nts"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "NTS Exams in Pakistan – Complete Preparation Guide",
          description:
            "Educational guide covering NTS exam types, eligibility, registration process, syllabus, preparation strategy, past papers and FAQs.",
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
        id="schema-breadcrumb-nts"
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
              name: "NTS",
              item: pageUrl,
            },
          ],
        }}
      />
      <FaqSchema id="schema-faq-nts" faqs={ntsFaqs} />
      <NtsPillar />
    </>
  );
}
