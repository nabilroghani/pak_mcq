import AjkpscPillar from "@/Components/AjkpscPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { ajkpscFaqs } from "@/data/ajkpscFaqs";

export const metadata = {
  title: "AJKPSC Jobs, Syllabus, Result & Preparation Guide 2026",
  description:
    "Complete AJKPSC guide — jobs, online apply, eligibility, syllabus, past papers, roll number slip, result and preparation strategy, all in one place.",
  alternates: {
    canonical: "/government-exams/ajkpsc",
  },
  openGraph: {
    title: "AJKPSC – Complete Guide to Azad Jammu & Kashmir Public Service Commission Jobs",
    description:
      "Everything you need on AJKPSC — latest jobs, eligibility, online apply steps, syllabus, past papers, roll number slip, result and a full preparation strategy.",
    url: "/government-exams/ajkpsc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AJKPSC – Complete Guide to Azad Jammu & Kashmir Public Service Commission Jobs",
    description:
      "Everything you need on AJKPSC — latest jobs, eligibility, online apply steps, syllabus, past papers, roll number slip, result and a full preparation strategy.",
  },
};

const pageUrl = absoluteUrl("/government-exams/ajkpsc");

export default function AjkpscExamPage() {
  return (
    <>
      <JsonLd
        id="schema-webpage-ajkpsc"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "AJKPSC – Complete Guide to Azad Jammu & Kashmir Public Service Commission Jobs, Online Apply, Syllabus, Results & Preparation",
          url: pageUrl,
          about: { "@type": "Thing", name: "AJKPSC" },
          description:
            "Complete AJKPSC guide — jobs, online apply, eligibility, syllabus, past papers, roll number slip, result and preparation strategy, all in one place.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-ajkpsc"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "AJKPSC – Complete Guide to Azad Jammu & Kashmir Public Service Commission Jobs, Online Apply, Syllabus, Results & Preparation",
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
          about: "AJKPSC",
        }}
      />
      <JsonLd
        id="schema-learningresource-ajkpsc"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "AJKPSC – Complete Preparation Guide",
          description:
            "Educational guide covering AJKPSC job categories, eligibility, online apply process, syllabus, preparation strategy, past papers and FAQs.",
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
        id="schema-breadcrumb-ajkpsc"
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
              name: "AJKPSC",
              item: pageUrl,
            },
          ],
        }}
      />
      <FaqSchema id="schema-faq-ajkpsc" faqs={ajkpscFaqs} />
      <AjkpscPillar />
    </>
  );
}
