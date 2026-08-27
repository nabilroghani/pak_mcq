import MCQS_cart from "@/Components/MCQS_cart";
import KppscExamPrepContent from "@/Components/KppscExamPrepContent";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscFaqs } from "@/data/kppscFaqs";

export const metadata = {
  title: "KPPSC Exam Preparation – MCQs & Past Papers",
  description:
    "KPPSC exam preparation with free MCQs, past papers & subject-wise tests for PMS, Assistant, Tehsildar, Patwari & other KPPSC posts on PakLearners.",
  alternates: {
    canonical: "/government-exams/kppsc",
  },
  openGraph: {
    title: "KPPSC Exam Preparation – MCQs & Past Papers | PakLearners",
    description:
      "KPPSC exam preparation with free MCQs, past papers & subject-wise tests for PMS, Assistant, Tehsildar, Patwari & other KPPSC posts on PakLearners.",
    url: "/government-exams/kppsc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "KPPSC Exam Preparation – MCQs & Past Papers | PakLearners",
    description:
      "KPPSC exam preparation with free MCQs, past papers & subject-wise tests for PMS, Assistant, Tehsildar, Patwari & other KPPSC posts.",
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
          name: "KPPSC Exam Preparation – MCQs & Past Papers",
          url: pageUrl,
          about: { "@type": "Thing", name: "KPPSC Exam Preparation" },
          description:
            "KPPSC exam preparation with free MCQs, past papers and subject-wise tests for PMS, Assistant, Tehsildar, Patwari and other KPPSC posts.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-kppsc"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "KPPSC Exam Preparation – MCQs & Past Papers",
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
          about: "KPPSC Exam Preparation 2026",
        }}
      />
      <JsonLd
        id="schema-learningresource-kppsc"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "KPPSC Exam Preparation – MCQs & Past Papers",
          description:
            "KPPSC exam preparation with free MCQs, past papers, subject-wise tests and online mock tests for PMS, Assistant, Tehsildar, Patwari and other KPPSC posts.",
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
      <MCQS_cart defaultSlug="kppsc-exams" />
      <KppscExamPrepContent />
    </>
  );
}
