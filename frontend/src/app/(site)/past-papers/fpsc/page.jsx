import FpscPastPapersPillar from "@/Components/FpscPastPapersPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { fpscPastPapersFaqs } from "@/data/fpscPastPapersFaqs";

export const metadata = {
  title: "FPSC Past Papers – Previous Papers & Solved MCQs",
  description:
    "Browse FPSC past papers by exam and subject, practice solved MCQs, and build a smart CSS/FPSC preparation plan with PakLearners' exam resource hub.",
  alternates: {
    canonical: "/past-papers/fpsc",
  },
  openGraph: {
    title: "FPSC Past Papers Hub – Previous Papers, Subjects & MCQs",
    description:
      "Explore FPSC past papers by exam and subject, learn how to prepare with solved and unsolved papers, and practice with MCQs on PakLearners.",
    url: "/past-papers/fpsc",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/logo.webp"),
        alt: "FPSC past papers preparation guide for Pakistani competitive exam candidates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FPSC Past Papers Hub – Previous Papers, Subjects & MCQs",
    description:
      "Explore FPSC past papers by exam and subject, practice MCQs, and build a structured FPSC/CSS preparation plan.",
  },
};

const pageUrl = absoluteUrl("/past-papers/fpsc");
const headline = "FPSC Past Papers – Previous Papers & Solved MCQs";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Past Papers", path: "/past-papers" },
  { name: "FPSC Past Papers", path: "/past-papers/fpsc" },
];

export default function FpscPastPapersPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-fpsc-past-papers"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: headline,
          url: pageUrl,
          description:
            "FPSC past papers resource hub with exam and subject guidance, preparation strategy, and practice MCQs.",
          about: { "@type": "Thing", name: "FPSC Past Papers" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-fpsc-past-papers"
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
          about: "FPSC Past Papers",
        }}
      />
      <JsonLd
        id="schema-learningresource-fpsc-past-papers"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: headline,
          description:
            "Guide to FPSC past papers by exam and subject, with preparation strategy and practice MCQs for CSS and recruitment tests.",
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          dateModified: "2026-08-28",
        }}
      />
      <JsonLd id="schema-breadcrumb-fpsc-past-papers" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-fpsc-past-papers" faqs={fpscPastPapersFaqs} />
      <FpscPastPapersPillar />
    </>
  );
}
