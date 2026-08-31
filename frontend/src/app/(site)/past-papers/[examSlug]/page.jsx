import { PastPaperPillar } from "@/views/SectionPillars";
import { buildExamPillarMetadata } from "@/seo/buildPageMetadata";
import { pastPaperPillars } from "@/data/siteStructure";

export function generateStaticParams() {
  return Object.keys(pastPaperPillars)
    .filter((slug) => slug !== "fpsc" && slug !== "ppsc" && slug !== "kppsc")
    .map((examSlug) => ({ examSlug }));
}

export async function generateMetadata({ params }) {
  const { examSlug } = await params;
  const exam = pastPaperPillars[examSlug?.toLowerCase()];
  if (!exam) return {};
  return buildExamPillarMetadata(exam, "/past-papers", "Past Papers");
}

export default function Page() {
  return <PastPaperPillar />;
}
