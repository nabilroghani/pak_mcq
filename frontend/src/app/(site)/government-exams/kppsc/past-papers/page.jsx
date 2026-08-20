import KppscPastPapersPillar from "@/Components/KppscPastPapersPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscPastPapersFaqs } from "@/data/kppscPastPapersFaqs";

export const metadata = {
  title: "KPPSC Past Papers 2026 – Previous Papers & PDF Downloads",
  description:
    "Access KPPSC past papers 2026 by year and post, including PMS past papers. Download guidance, preparation tips and solved-paper strategy on PakLearners.",
  alternates: {
    canonical: "/government-exams/kppsc/past-papers",
  },
  openGraph: {
    title: "KPPSC Past Papers | Previous Papers, PMS Papers & PDF Downloads",
    description:
      "Browse KPPSC past papers by year and post, including PMS past papers, plus a practical step-by-step guide to using previous papers for exam preparation.",
    url: "/government-exams/kppsc/past-papers",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/logo.webp"),
        alt: "KPPSC past papers 2026 year-wise and post-wise resource guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KPPSC Past Papers | Previous Papers, PMS Papers & PDF Downloads",
    description:
      "KPPSC past papers 2026 by year and post — PMS papers, PDF download guidance and preparation strategy.",
  },
};

const pageUrl = absoluteUrl("/government-exams/kppsc/past-papers");
const headline = "KPPSC Past Papers 2026 – Previous Papers & PDF Downloads";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "KPPSC", path: "/government-exams/kppsc" },
  { name: "Past Papers", path: "/government-exams/kppsc/past-papers" },
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
            "KPPSC past papers 2026 organized by year and post, with PMS papers, PDF download guidance and preparation strategy.",
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
          dateModified: "2026-08-20",
          mainEntityOfPage: pageUrl,
          about: "KPPSC Past Papers 2026",
        }}
      />
      <JsonLd
        id="schema-learningresource-kppsc-past-papers"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: headline,
          description:
            "Resource hub for KPPSC past papers by year and post, including PMS papers and preparation guidance.",
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          dateModified: "2026-08-20",
        }}
      />
      <JsonLd id="schema-breadcrumb-kppsc-past-papers" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-kppsc-past-papers" faqs={kppscPastPapersFaqs} />
      <KppscPastPapersPillar />
    </>
  );
}
