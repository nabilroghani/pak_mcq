import KppscPillar from "@/Components/KppscPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscFaqs } from "@/data/kppscFaqs";

export const metadata = {
  title: "KPPSC Exams in Pakistan – Complete Guide & Preparation",
  description:
    "Complete guide to KPPSC exams in Pakistan — eligibility, syllabus, exam pattern, recruitment process, past papers and preparation strategy in one place.",
  alternates: {
    canonical: "/government-exams/kppsc",
  },
  openGraph: {
    title: "KPPSC Exams in Pakistan – Complete Guide, Eligibility & Preparation",
    description:
      "Everything you need to know about KPPSC exams — eligibility criteria, exam pattern, syllabus, recruitment process, past papers and a structured preparation strategy.",
    url: "/government-exams/kppsc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "KPPSC Exams in Pakistan – Complete Preparation Guide",
    description:
      "Eligibility, syllabus, exam pattern, recruitment process, past papers & preparation strategy for KPPSC exams — all in one guide.",
  },
};

const pageUrl = absoluteUrl("/government-exams/kppsc");

export default function KppscExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-kppsc"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "KPPSC Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
          url: pageUrl,
          about: { "@type": "Thing", name: "KPPSC Exams in Pakistan" },
          description:
            "Complete guide to KPPSC exams in Pakistan — eligibility, syllabus, exam pattern, recruitment process, past papers and preparation strategy.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-kppsc"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "KPPSC Exams in Pakistan – Complete Guide, Eligibility, Syllabus & Preparation",
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
          about: "KPPSC Exams in Pakistan",
        }}
      />
      <JsonLd
        id="schema-learningresource-kppsc"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "KPPSC Exams in Pakistan – Complete Preparation Guide",
          description:
            "Educational guide covering KPPSC exam types, eligibility, recruitment process, syllabus, preparation strategy, past papers and FAQs.",
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
        id="schema-breadcrumb-kppsc"
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
              name: "KPPSC",
              item: pageUrl,
            },
          ],
        }}
      />
      <FaqSchema id="schema-faq-kppsc" faqs={kppscFaqs} />
      <KppscPillar />
    </>
  );
}
