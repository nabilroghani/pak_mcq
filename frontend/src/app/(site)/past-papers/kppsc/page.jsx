import KppscPastPapersPillar from "@/Components/KppscPastPapersPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscPastPapersFaqs } from "@/data/kppscPastPapersFaqs";

export const metadata = {
  title: "KPPSC Past Papers – Previous Papers & Solved MCQs",
  description:
    "Browse KPPSC past papers by exam, post, and subject — including PMS — practice solved MCQs, and build a smart KPPSC preparation plan with PakLearners.",
  alternates: {
    canonical: "/past-papers/kppsc",
  },
  openGraph: {
    title: "KPPSC Past Papers Hub – PMS, Posts & MCQs",
    description:
      "Explore KPPSC past papers by exam, post, and subject — including PMS — learn how to prepare with solved and unsolved papers, and practice with MCQs on PakLearners.",
    url: "/past-papers/kppsc",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/logo.webp"),
        alt: "KPPSC past papers preparation guide for Khyber Pakhtunkhwa exam candidates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KPPSC Past Papers Hub – PMS, Posts & MCQs",
    description:
      "Explore KPPSC past papers by exam, post, and subject — including PMS — and practice with MCQs on PakLearners.",
  },
};

const pageUrl = absoluteUrl("/past-papers/kppsc");
const headline = "KPPSC Past Papers – Previous Papers & Solved MCQs";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Past Papers", path: "/past-papers" },
  { name: "KPPSC Past Papers", path: "/past-papers/kppsc" },
];

export default function KppscPastPapersPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-kppsc-past-papers"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: headline,
          url: pageUrl,
          description:
            "KPPSC past papers resource hub with exam, post, and subject guidance — including PMS — preparation strategy, and practice MCQs.",
          about: { "@type": "Thing", name: "KPPSC Past Papers" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-kppsc-past-papers"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logoPath) },
          },
          datePublished: "2026-08-01",
          dateModified: "2026-08-28",
          mainEntityOfPage: pageUrl,
          about: "KPPSC Past Papers",
        }}
      />
      <JsonLd
        id="schema-learningresource-kppsc-past-papers"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: headline,
          description:
            "Guide to KPPSC past papers by exam, post, and subject — including PMS — with preparation strategy and practice MCQs for KP government exams.",
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          dateModified: "2026-08-28",
        }}
      />
      <JsonLd id="schema-breadcrumb-kppsc-past-papers" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-kppsc-past-papers" faqs={kppscPastPapersFaqs} />
      <KppscPastPapersPillar />
    </>
  );
}
