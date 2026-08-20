import KppscSubPillar from "@/Components/KppscSubPillar";
import JsonLd from "@/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { kppscSubPages } from "@/data/kppscSubPages";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.keys(kppscSubPages)
    .filter((topic) => !["syllabus", "past-papers", "mcqs", "jobs"].includes(topic))
    .map((topic) => ({ topic }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  const page = kppscSubPages[topic?.toLowerCase()];
  if (!page) return {};

  const canonical = `/government-exams/kppsc/${page.slug}`;

  return {
    title: page.metaTitle.replace(" | PakLearners", ""),
    description: page.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function KppscSubPage({ params }) {
  const { topic } = await params;
  const page = kppscSubPages[topic?.toLowerCase()];
  if (!page) notFound();

  const pageUrl = absoluteUrl(`/government-exams/kppsc/${page.slug}`);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC", path: "/government-exams/kppsc" },
    { name: page.title, path: `/government-exams/kppsc/${page.slug}` },
  ];

  return (
    <>
      <JsonLd
        id={`schema-webpage-kppsc-${page.slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.headline,
          url: pageUrl,
          description: page.description,
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id={`schema-article-kppsc-${page.slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.headline,
          author: { "@type": "Organization", name: "PakLearners Editorial Team" },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logoPath) },
          },
          dateModified: "2026-08-01",
          mainEntityOfPage: pageUrl,
        }}
      />
      <JsonLd
        id={`schema-breadcrumb-kppsc-${page.slug}`}
        data={buildBreadcrumbSchema(breadcrumbs)}
      />
      <KppscSubPillar page={page} />
    </>
  );
}
