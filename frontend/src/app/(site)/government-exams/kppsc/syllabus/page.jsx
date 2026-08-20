import KppscSyllabusPillar from "@/Components/KppscSyllabusPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscSyllabusFaqs } from "@/data/kppscSyllabusFaqs";

export const metadata = {
  title: "KPPSC Syllabus 2026 – Latest Subject-Wise Syllabus & PDF",
  description:
    "Get the latest KPPSC syllabus 2026 with subject-wise details, download guidance and a complete preparation strategy for all KPPSC posts on PakLearners.",
  alternates: {
    canonical: "/government-exams/kppsc/syllabus",
  },
  openGraph: {
    title: "KPPSC Syllabus 2026 | Subject-Wise Details & Preparation Guide",
    description:
      "Confused about what to study for KPPSC? Explore the latest KPPSC syllabus, subject-wise breakdown, post-specific details and a step-by-step preparation strategy.",
    url: "/government-exams/kppsc/syllabus",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/logo.webp"),
        alt: "KPPSC Syllabus 2026 subject-wise preparation guide by PakLearners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KPPSC Syllabus 2026 | Subject-Wise Details & Preparation Guide",
    description:
      "Latest KPPSC syllabus 2026 — subject-wise breakdown, post-specific details, PDF download guidance and preparation strategy.",
  },
};

const pageUrl = absoluteUrl("/government-exams/kppsc/syllabus");
const headline = "KPPSC Syllabus 2026 – Latest Subject-Wise Syllabus & Preparation Guide";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "KPPSC", path: "/government-exams/kppsc" },
  { name: "Syllabus", path: "/government-exams/kppsc/syllabus" },
];

export default function KppscSyllabusPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-kppsc-syllabus"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: headline,
          url: pageUrl,
          description:
            "Latest KPPSC syllabus 2026 with subject-wise details, post-specific guidance, PDF download steps and preparation strategy.",
          about: { "@type": "Thing", name: "KPPSC Syllabus" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-kppsc-syllabus"
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
          about: "KPPSC Syllabus 2026",
        }}
      />
      <JsonLd
        id="schema-learningresource-kppsc-syllabus"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: headline,
          description:
            "Subject-wise KPPSC syllabus guide with preparation strategy, post-specific details and FAQ for Khyber Pakhtunkhwa competitive exams.",
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          dateModified: "2026-08-20",
        }}
      />
      <JsonLd id="schema-breadcrumb-kppsc-syllabus" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-kppsc-syllabus" faqs={kppscSyllabusFaqs} />
      <KppscSyllabusPillar />
    </>
  );
}
