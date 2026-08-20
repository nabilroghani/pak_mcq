import KppscJobsPillar from "@/Components/KppscJobsPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscJobsFaqs } from "@/data/kppscJobsFaqs";

export const metadata = {
  title: "KPPSC Jobs 2026 – Latest Vacancies & Apply Online",
  description:
    "Explore latest KPPSC jobs 2026 by department and post. Check eligibility, age limit, advertisement details and apply online guidance on PakLearners.",
  alternates: {
    canonical: "/government-exams/kppsc/jobs",
  },
  openGraph: {
    title: "KPPSC Jobs 2026 | Latest Vacancies, Eligibility & Apply Online",
    description:
      "Browse latest KPPSC jobs by department and post, check eligibility and age limit, and follow a step-by-step guide to applying online before the deadline.",
    url: "/government-exams/kppsc/jobs",
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/logo.webp"),
        alt: "KPPSC Jobs 2026 latest vacancies and advertisement guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KPPSC Jobs 2026 | Latest Vacancies, Eligibility & Apply Online",
    description:
      "Latest KPPSC jobs 2026 — vacancies by department and post, eligibility, age limit and apply online guidance.",
  },
};

const pageUrl = absoluteUrl("/government-exams/kppsc/jobs");
const headline = "KPPSC Jobs 2026 – Latest Vacancies, Advertisement & Apply Online";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Government Exams", path: "/government-exams" },
  { name: "KPPSC", path: "/government-exams/kppsc" },
  { name: "Jobs", path: "/government-exams/kppsc/jobs" },
];

export default function KppscJobsPage() {
  return (
    <>
      <JsonLd
        id="schema-collectionpage-kppsc-jobs"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: headline,
          url: pageUrl,
          description:
            "Resource hub for KPPSC jobs 2026 — latest vacancies, advertisement guidance, eligibility, apply online steps and preparation resources.",
          about: { "@type": "Thing", name: "KPPSC Jobs" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
          },
        }}
      />
      <JsonLd
        id="schema-webpage-kppsc-jobs"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: headline,
          url: pageUrl,
          description:
            "KPPSC jobs 2026 resource hub with vacancy listings structure, eligibility guidance and apply online steps.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-kppsc-jobs"
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
          about: "KPPSC Jobs 2026",
        }}
      />
      <JsonLd id="schema-breadcrumb-kppsc-jobs" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-kppsc-jobs" faqs={kppscJobsFaqs} />
      <KppscJobsPillar />
    </>
  );
}
