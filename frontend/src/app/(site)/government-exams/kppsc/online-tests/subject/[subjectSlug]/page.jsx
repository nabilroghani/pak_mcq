import { notFound } from "next/navigation";
import KppscOnlineTestPlaceholder from "@/Components/KppscOnlineTestPlaceholder";
import JsonLd from "@/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl } from "@/data/siteConfig";
import { getSubjectTestBySlug, kppscSubjectOnlineTests } from "@/data/kppscOnlineTestsData";

export function generateStaticParams() {
  return kppscSubjectOnlineTests.map((t) => ({ subjectSlug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { subjectSlug } = await params;
  const test = getSubjectTestBySlug(subjectSlug);
  if (!test) return {};

  const title = `KPPSC ${test.subject} Online Test`;
  const path = `/government-exams/kppsc/online-tests/subject/${test.slug}`;

  return {
    title,
    description: `Practice KPPSC ${test.subject} MCQs online. ${test.focus}`,
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

export default async function KppscSubjectOnlineTestPage({ params }) {
  const { subjectSlug } = await params;
  const test = getSubjectTestBySlug(subjectSlug);
  if (!test) notFound();

  const pageUrl = absoluteUrl(`/government-exams/kppsc/online-tests/subject/${test.slug}`);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Government Exams", path: "/government-exams" },
    { name: "KPPSC", path: "/government-exams/kppsc" },
    { name: "Online Tests", path: "/government-exams/kppsc/online-tests" },
    { name: test.subject },
  ];

  return (
    <>
      <JsonLd
        id={`schema-webpage-kppsc-subject-${test.slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `KPPSC ${test.subject} Online Test`,
          url: pageUrl,
          description: test.focus,
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id={`schema-breadcrumb-kppsc-subject-${test.slug}`}
        data={buildBreadcrumbSchema(breadcrumbs)}
      />
      <KppscOnlineTestPlaceholder
        title={`KPPSC ${test.subject} Online Test`}
        description={test.focus}
        breadcrumbs={breadcrumbs}
        type="subject"
      />
    </>
  );
}
