import MCQS_cart from "@/Components/MCQS_cart";
import KppscExamPrepContent from "@/Components/KppscExamPrepContent";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscFaqs } from "@/data/kppscFaqs";

export const metadata = {
  title: "KPPSC Exam Prep – Past Papers, MCQs & Syllabus",
  description:
    "Post-wise KPPSC exam preparation: use the official syllabus with past papers, subject MCQs and timed online tests. Practical guidance for KP candidates.",
  alternates: {
    canonical: "/government-exams/kppsc",
  },
  openGraph: {
    title: "KPPSC Exam Prep – Past Papers, MCQs & Syllabus | PakLearners",
    description:
      "Post-wise KPPSC exam preparation: use the official syllabus with past papers, subject MCQs and timed online tests. Practical guidance for KP candidates.",
    url: "/government-exams/kppsc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "KPPSC Exam Prep – Past Papers, MCQs & Syllabus | PakLearners",
    description:
      "Post-wise KPPSC exam preparation: use the official syllabus with past papers, subject MCQs and timed online tests. Practical guidance for KP candidates.",
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
          name: "KPPSC Exam Preparation – Past Papers, MCQs, Syllabus & Online Tests",
          url: pageUrl,
          about: { "@type": "Thing", name: "KPPSC Exam Preparation" },
          description:
            "Post-wise KPPSC exam preparation: use the official syllabus with past papers, subject MCQs and timed online tests. Practical guidance for KP candidates.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-kppsc"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "KPPSC Exam Preparation – Past Papers, MCQs, Syllabus & Online Tests",
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
          dateModified: "2026-09-04",
          mainEntityOfPage: pageUrl,
          about: "KPPSC Exam Preparation",
        }}
      />
      <JsonLd
        id="schema-learningresource-kppsc"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "KPPSC Exam Preparation – Past Papers, MCQs, Syllabus & Online Tests",
          description:
            "Post-wise KPPSC exam preparation: use the official syllabus with past papers, subject MCQs and timed online tests. Practical guidance for KP candidates.",
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: {
            "@type": "Organization",
            name: "PakLearners Editorial Team",
          },
          dateModified: "2026-09-04",
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
      <MCQS_cart defaultSlug="kppsc-exams" suppressHeading />
      <KppscExamPrepContent />
    </>
  );
}
