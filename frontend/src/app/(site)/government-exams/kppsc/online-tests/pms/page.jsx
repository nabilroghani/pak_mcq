import KppscPmsOnlineTestPillar from "@/Components/KppscPmsOnlineTestPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscPmsOnlineTestFaqs } from "@/data/kppscPmsOnlineTestFaqs";

export const metadata = {
  title: "KPPSC PMS Online Test – Free PMS MCQs & Practice Tests",
  description:
    "Practice the KPPSC PMS online test for free. 15 expert MCQs, subject-wise topics, and a proven PMS preparation strategy — start practicing now.",
  alternates: {
    canonical: "/government-exams/kppsc/online-tests/pms",
  },
  openGraph: {
    title: "KPPSC PMS Online Test 2026 – Free MCQs & Practice",
    description:
      "Practice the KPPSC PMS online test for free. 15 expert-level MCQs, subject breakdown, and a step-by-step PMS preparation strategy for KPPSC aspirants.",
    url: "/government-exams/kppsc/online-tests/pms",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/logo.webp"),
        alt: "KPPSC PMS online test – free PMS MCQs and practice questions on PakLearners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KPPSC PMS Online Test 2026 – Free MCQs & Practice",
    description:
      "Practice the KPPSC PMS online test for free. 15 expert MCQs with answers and explanations for KPPSC PMS aspirants.",
  },
};

const pageUrl = absoluteUrl("/government-exams/kppsc/online-tests/pms");
const headline = "KPPSC PMS Online Test – Free PMS MCQs & Practice Tests";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "KPPSC", path: "/government-exams/kppsc" },
  { name: "Online Tests", path: "/government-exams/kppsc/online-tests" },
  { name: "PMS Online Test", path: "/government-exams/kppsc/online-tests/pms" },
];

export default function KppscPmsOnlineTestPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-kppsc-pms-online-test"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: headline,
          url: pageUrl,
          description:
            "Free KPPSC PMS online test with 15 practice MCQs, subject breakdown, and PMS preparation strategy.",
          about: { "@type": "Thing", name: "KPPSC PMS Online Test" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-kppsc-pms-online-test"
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
          about: "KPPSC PMS Online Test",
        }}
      />
      <JsonLd
        id="schema-learningresource-kppsc-pms-online-test"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: headline,
          description:
            "Free KPPSC PMS online test with 15 MCQs, answers, explanations, and preparation guidance.",
          learningResourceType: "Practice test",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          dateModified: "2026-08-28",
        }}
      />
      <JsonLd id="schema-breadcrumb-kppsc-pms-online-test" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-kppsc-pms-online-test" faqs={kppscPmsOnlineTestFaqs} />
      <KppscPmsOnlineTestPillar />
    </>
  );
}
