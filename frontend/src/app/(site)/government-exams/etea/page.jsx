import EteaPillar from "@/Components/EteaPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { eteaFaqs } from "@/data/eteaFaqs";

export const metadata = {
  title: "ETEA Exams in Pakistan – Complete Guide & Preparation",
  description:
    "Complete guide to ETEA exams in Pakistan — eligibility, syllabus, test pattern, recruitment process, past papers and preparation strategy in one place.",
  alternates: {
    canonical: "/government-exams/etea",
  },
  openGraph: {
    title: "ETEA Exams in Pakistan – Complete Guide, Eligibility & Preparation",
    description:
      "Everything you need to know about ETEA exams — eligibility criteria, test pattern, syllabus, recruitment process, past papers and a structured preparation strategy.",
    url: "/government-exams/etea",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETEA Exams in Pakistan – Complete Preparation Guide",
    description:
      "Eligibility, syllabus, test pattern, recruitment process, past papers & preparation strategy for ETEA exams — all in one guide.",
  },
};

const pageUrl = absoluteUrl("/government-exams/etea");

export default function EteaExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-etea"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "ETEA Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
          url: pageUrl,
          about: { "@type": "Thing", name: "ETEA Exams in Pakistan" },
          description:
            "Complete guide to ETEA exams in Pakistan — eligibility, syllabus, test pattern, recruitment process, past papers and preparation strategy.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-etea"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "ETEA Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
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
          about: "ETEA Exams in Pakistan",
        }}
      />
      <JsonLd
        id="schema-learningresource-etea"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "ETEA Exams in Pakistan – Complete Preparation Guide",
          description:
            "Educational guide covering ETEA exam types, eligibility, recruitment process, syllabus, preparation strategy, past papers and FAQs.",
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
        id="schema-breadcrumb-etea"
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
              name: "ETEA",
              item: pageUrl,
            },
          ],
        }}
      />
      <FaqSchema id="schema-faq-etea" faqs={eteaFaqs} />
      <EteaPillar />
    </>
  );
}
