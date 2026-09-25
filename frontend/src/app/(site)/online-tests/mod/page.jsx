import ModOnlineTest from "@/Components/ModOnlineTest";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { modOnlineTestFaqs } from "@/data/modOnlineTestFaqs";

const title = "MOD Online Test – Free Timed Mock Test for Ministry of Defence Preparation";
const description =
  "Practice with a free MOD online mock test — timed, exam-style questions to build speed and accuracy for the Ministry of Defence screening test. Track your progress before test day.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/online-tests/mod" },
  openGraph: {
    title: `${title} | PakLearners`,
    description,
    url: "/online-tests/mod",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOD Online Test | PakLearners",
    description,
  },
};

const pageUrl = absoluteUrl("/online-tests/mod");
const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Online Tests", path: "/online-tests" },
  { name: "MOD", path: "/online-tests/mod" },
];

export default function ModOnlineTestPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-mod-online-test"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "MOD Online Test – Timed Mock Practice for Ministry of Defence Screening",
          url: pageUrl,
          description,
          about: { "@type": "Thing", name: "Ministry of Defence online mock test" },
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-mod-online-test"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "MOD Online Test – Timed Mock Practice for Ministry of Defence Screening",
          description,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logoPath) },
          },
          dateModified: "2026-09-25",
          mainEntityOfPage: pageUrl,
        }}
      />
      <JsonLd id="schema-breadcrumb-mod-online-test" data={buildBreadcrumbSchema(breadcrumbs)} />
      <FaqSchema id="schema-faq-mod-online-test" faqs={modOnlineTestFaqs} />
      <ModOnlineTest />
    </>
  );
}
