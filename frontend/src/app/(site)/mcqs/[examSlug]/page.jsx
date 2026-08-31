import McqPillar from "@/views/McqPillar";
import { buildExamPillarMetadata } from "@/seo/buildPageMetadata";
import { mcqExamPillars } from "@/data/siteStructure";

export function generateStaticParams() {
  return Object.keys(mcqExamPillars).map((examSlug) => ({ examSlug }));
}

export async function generateMetadata({ params }) {
  const { examSlug } = await params;
  const exam = mcqExamPillars[examSlug?.toLowerCase()];
  if (!exam) return {};
  return buildExamPillarMetadata(exam, "/mcqs", "MCQs – Practice");
}

export default function Page() {
  return <McqPillar />;
}
