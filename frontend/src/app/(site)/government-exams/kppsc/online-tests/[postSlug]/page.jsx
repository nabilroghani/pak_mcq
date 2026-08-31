import { notFound } from "next/navigation";
import KppscOnlineTestPlaceholder from "@/Components/KppscOnlineTestPlaceholder";
import JsonLd from "@/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl } from "@/data/siteConfig";
import { getPostTestBySlug, kppscPostOnlineTests } from "@/data/kppscOnlineTestsData";

export function generateStaticParams() {
  return kppscPostOnlineTests
    .filter((t) => t.slug !== "pms")
    .map((t) => ({ postSlug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const test = getPostTestBySlug(postSlug);
  if (!test) return {};

  const title = `${test.post} – KPPSC Online Practice`;
  const path = `/government-exams/kppsc/online-tests/${test.slug}`;

  return {
    title,
    description: `Practice ${test.post} MCQs for KPPSC recruitment exams. ${test.focus}`,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | PakLearners`,
      description: test.focus,
      url: path,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function KppscPostOnlineTestPage({ params }) {
  const { postSlug } = await params;
  const test = getPostTestBySlug(postSlug);
  if (!test) notFound();

  const pageUrl = absoluteUrl(`/government-exams/kppsc/online-tests/${test.slug}`);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC", path: "/government-exams/kppsc" },
    { name: "Online Tests", path: "/government-exams/kppsc/online-tests" },
    { name: test.post },
  ];

  return (
    <>
      <JsonLd
        id={`schema-webpage-kppsc-test-${test.slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: test.post,
          url: pageUrl,
          description: test.focus,
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id={`schema-breadcrumb-kppsc-test-${test.slug}`}
        data={buildBreadcrumbSchema(breadcrumbs)}
      />
      <KppscOnlineTestPlaceholder
        title={test.post}
        description={test.focus}
        breadcrumbs={breadcrumbs}
        type="post"
      />
    </>
  );
}
