import BpscPillar from "@/Components/BpscPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { bpscFaqs } from "@/data/bpscFaqs";

export const metadata = {
  title: "BPSC Jobs, Syllabus, Result & Preparation Guide 2026",
  description:
    "Complete BPSC guide — jobs, online apply, eligibility, syllabus, past papers, roll number slip, result and preparation strategy, all in one place.",
  alternates: {
    canonical: "/government-exams/bpsc",
  },
  openGraph: {
    title: "BPSC – Balochistan Public Service Commission | Complete Guide",
    description:
      "Everything you need on BPSC — latest jobs, eligibility, online apply steps, syllabus, past papers, roll number slip, result and a full preparation strategy.",
    url: "/government-exams/bpsc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "BPSC – Balochistan Public Service Commission | Complete Guide",
    description:
      "Everything you need on BPSC — latest jobs, eligibility, online apply steps, syllabus, past papers, roll number slip, result and a full preparation strategy.",
  },
};

const pageUrl = absoluteUrl("/government-exams/bpsc");

export default function BpscExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-bpsc"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "BPSC – Balochistan Public Service Commission | Jobs, Online Apply, Syllabus, Result & Preparation Guide",
          url: pageUrl,
          about: { "@type": "Thing", name: "BPSC" },
          description:
            "Complete BPSC guide — jobs, online apply, eligibility, syllabus, past papers, roll number slip, result and preparation strategy, all in one place.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-bpsc"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "BPSC – Balochistan Public Service Commission | Jobs, Online Apply, Syllabus, Result & Preparation Guide",
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
          dateModified: "2026-07-31",
          mainEntityOfPage: pageUrl,
          about: "BPSC",
        }}
      />
      <JsonLd
        id="schema-learningresource-bpsc"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "BPSC – Balochistan Public Service Commission | Complete Preparation Guide",
          description:
            "Educational guide covering BPSC job categories, eligibility, online apply process, syllabus, preparation strategy, past papers and FAQs.",
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: {
            "@type": "Organization",
            name: "PakLearners Editorial Team",
          },
          dateModified: "2026-07-31",
        }}
      />
      <JsonLd
        id="schema-breadcrumb-bpsc"
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
              name: "BPSC",
              item: pageUrl,
            },
          ],
        }}
      />
      <FaqSchema id="schema-faq-bpsc" faqs={bpscFaqs} />
      <BpscPillar />
    </>
  );
}
