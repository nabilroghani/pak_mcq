import KppscMcqsPillar from "@/Components/KppscMcqsPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscMcqsFaqs } from "@/data/kppscMcqsFaqs";

export const metadata = {
  title: "KPPSC MCQs 2026 – Online Practice & Subject-Wise Questions",
  description:
    "Practice KPPSC MCQs 2026 online with answers and explanations. Subject-wise questions covering English, GK, Current Affairs and more on PakLearners.",
  alternates: {
    canonical: "/government-exams/kppsc/mcqs",
  },
  openGraph: {
    title: "KPPSC MCQs | Online Practice, Subject-Wise Questions & Answers",
    description:
      "Prepare for KPPSC exams with subject-wise MCQs, online practice and clear explanations. Combine MCQs with syllabus and past papers for complete preparation.",
    url: "/government-exams/kppsc/mcqs",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/logo.webp"),
        alt: "KPPSC MCQs 2026 subject-wise online practice guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KPPSC MCQs | Online Practice, Subject-Wise Questions & Answers",
    description:
      "Practice KPPSC MCQs 2026 online — English, GK, Current Affairs, Pakistan Affairs and more with explanations.",
  },
};

const pageUrl = absoluteUrl("/government-exams/kppsc/mcqs");
const headline = "KPPSC MCQs 2026 – Online Practice & Subject-Wise Questions";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "KPPSC", path: "/government-exams/kppsc" },
  { name: "MCQs", path: "/government-exams/kppsc/mcqs" },
];

export default function KppscMcqsPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-kppsc-mcqs"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: headline,
          url: pageUrl,
          description:
            "Practice KPPSC MCQs 2026 online with subject-wise questions, answers and preparation guidance.",
          about: { "@type": "Thing", name: "KPPSC MCQs" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-kppsc-mcqs"
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
          about: "KPPSC MCQs 2026",
        }}
      />
      <JsonLd
        id="schema-learningresource-kppsc-mcqs"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: headline,
          description:
            "Subject-wise KPPSC MCQs practice guide with online preparation tips, screening test guidance and FAQ.",
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          dateModified: "2026-08-20",
        }}
      />
      <JsonLd id="schema-breadcrumb-kppsc-mcqs" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-kppsc-mcqs" faqs={kppscMcqsFaqs} />
      <KppscMcqsPillar />
    </>
  );
}
