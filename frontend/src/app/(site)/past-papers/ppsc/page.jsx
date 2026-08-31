import PpscPastPapersPillar from "@/Components/PpscPastPapersPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { ppscPastPapersFaqs } from "@/data/ppscPastPapersFaqs";

export const metadata = {
  title: "PPSC Past Papers – Previous Papers & Solved MCQs",
  description:
    "Browse PPSC past papers by exam, post, and subject, practice solved MCQs, and build a smart PPSC preparation plan with PakLearners' exam resource hub.",
  alternates: {
    canonical: "/past-papers/ppsc",
  },
  openGraph: {
    title: "PPSC Past Papers Hub – Previous Papers, Posts & MCQs",
    description:
      "Explore PPSC past papers by exam, post, and subject, learn how to prepare with solved and unsolved papers, and practice with MCQs on PakLearners.",
    url: "/past-papers/ppsc",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/logo.webp"),
        alt: "PPSC past papers preparation guide for Punjab government exam candidates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PPSC Past Papers Hub – Previous Papers, Posts & MCQs",
    description:
      "Explore PPSC past papers by exam, post, and subject, practice MCQs, and build a structured PPSC preparation plan.",
  },
};

const pageUrl = absoluteUrl("/past-papers/ppsc");
const headline = "PPSC Past Papers – Previous Papers & Solved MCQs";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Past Papers", path: "/past-papers" },
  { name: "PPSC Past Papers", path: "/past-papers/ppsc" },
];

export default function PpscPastPapersPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-ppsc-past-papers"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: headline,
          url: pageUrl,
          description:
            "PPSC past papers resource hub with exam, post, and subject guidance, preparation strategy, and practice MCQs.",
          about: { "@type": "Thing", name: "PPSC Past Papers" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-ppsc-past-papers"
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
          about: "PPSC Past Papers",
        }}
      />
      <JsonLd
        id="schema-learningresource-ppsc-past-papers"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: headline,
          description:
            "Guide to PPSC past papers by exam, post, and subject, with preparation strategy and practice MCQs for Punjab government exams.",
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          dateModified: "2026-08-28",
        }}
      />
      <JsonLd id="schema-breadcrumb-ppsc-past-papers" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-ppsc-past-papers" faqs={ppscPastPapersFaqs} />
      <PpscPastPapersPillar />
    </>
  );
}
