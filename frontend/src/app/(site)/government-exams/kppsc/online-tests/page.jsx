import KppscOnlineTestsPillar from "@/Components/KppscOnlineTestsPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscOnlineTestsFaqs } from "@/data/kppscOnlineTestsFaqs";
import {
  kppscPostOnlineTests,
  kppscSubjectOnlineTests,
} from "@/data/kppscOnlineTestsData";

export const metadata = {
  title: "KPPSC Online Test 2026 – Free Mock Tests & MCQs",
  description:
    "Practice free KPPSC online tests & MCQs by post and subject. Post-wise mock tests, past paper practice & exam preparation tips for KPPSC 2026 candidates.",
  alternates: {
    canonical: "/government-exams/kppsc/online-tests",
  },
  openGraph: {
    title: "KPPSC Online Tests 2026 – Free Mock Tests & MCQs Practice",
    description:
      "Free KPPSC online tests organized by post and subject. Practice MCQs, track weak areas, and prepare smarter for your KPPSC exam with PakLearners.",
    url: "/government-exams/kppsc/online-tests",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/logo.webp"),
        alt: "KPPSC online test preparation – free mock tests and MCQs on PakLearners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KPPSC Online Tests 2026 – Free Mock Tests & MCQs Practice",
    description:
      "Free KPPSC online tests organized by post and subject. Practice MCQs, track weak areas, and prepare smarter for your KPPSC exam.",
  },
};

const pageUrl = absoluteUrl("/government-exams/kppsc/online-tests");
const headline = "KPPSC Online Tests 2026 – Free Mock Tests, MCQs & Practice Tests";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "KPPSC", path: "/government-exams/kppsc" },
  { name: "Online Tests", path: "/government-exams/kppsc/online-tests" },
];

const collectionItems = [
  ...kppscPostOnlineTests.map((t) => ({
    name: t.post,
    url: absoluteUrl(`/government-exams/kppsc/online-tests/${t.slug}`),
  })),
  ...kppscSubjectOnlineTests.map((t) => ({
    name: `${t.subject} Online Test`,
    url: absoluteUrl(`/government-exams/kppsc/online-tests/subject/${t.slug}`),
  })),
];

export default function KppscOnlineTestsPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-kppsc-online-tests"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: headline,
          url: pageUrl,
          description:
            "Free KPPSC online tests and MCQs organized by post and subject for KPPSC 2026 exam preparation.",
          about: { "@type": "Thing", name: "KPPSC Online Tests" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-collection-kppsc-online-tests"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: headline,
          url: pageUrl,
          description:
            "Directory of KPPSC online tests by post and subject for free MCQ practice and mock test preparation.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
          hasPart: collectionItems.map((item) => ({
            "@type": "WebPage",
            name: item.name,
            url: item.url,
          })),
        }}
      />
      <JsonLd
        id="schema-article-kppsc-online-tests"
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
          about: "KPPSC Online Test 2026",
        }}
      />
      <JsonLd id="schema-breadcrumb-kppsc-online-tests" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-kppsc-online-tests" faqs={kppscOnlineTestsFaqs} />
      <KppscOnlineTestsPillar />
    </>
  );
}
