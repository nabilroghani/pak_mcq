import ExamPillar from "@/views/ExamPillar";
import { buildPageMetadata } from "@/seo/buildPageMetadata";
import { governmentExamPillars } from "@/data/siteStructure";

export function generateStaticParams() {
  return Object.keys(governmentExamPillars).map((examSlug) => ({ examSlug }));
}

export async function generateMetadata({ params }) {
  const { examSlug } = await params;
  const exam = governmentExamPillars[examSlug?.toLowerCase()];
  if (!exam) return {};
  return buildPageMetadata({
    title: exam.headline,
    description: exam.description,
    path: `/government-exams/${exam.slug}`,
  });
}

export default function Page() {
  return <ExamPillar />;
}
