import { OnlineTestPillar } from "@/views/SectionPillars";
import { buildExamPillarMetadata } from "@/seo/buildPageMetadata";
import { onlineTestPillars } from "@/data/siteStructure";

export function generateStaticParams() {
  return Object.keys(onlineTestPillars).map((examSlug) => ({ examSlug }));
}

export async function generateMetadata({ params }) {
  const { examSlug } = await params;
  const exam = onlineTestPillars[examSlug?.toLowerCase()];
  if (!exam) return {};
  return buildExamPillarMetadata(exam, "/online-tests", "Online Tests");
}

export default function Page() {
  return <OnlineTestPillar />;
}
