import { StudyResourcePillar } from "@/views/SectionPillars";
import { buildTopicPillarMetadata } from "@/seo/buildPageMetadata";
import { studyResourcePillars } from "@/data/siteStructure";

export function generateStaticParams() {
  return Object.keys(studyResourcePillars).map((topicSlug) => ({ topicSlug }));
}

export async function generateMetadata({ params }) {
  const { topicSlug } = await params;
  const item = studyResourcePillars[topicSlug?.toLowerCase()];
  if (!item) return {};
  return buildTopicPillarMetadata(item, "/study-resources");
}

export default function Page() {
  return <StudyResourcePillar />;
}
