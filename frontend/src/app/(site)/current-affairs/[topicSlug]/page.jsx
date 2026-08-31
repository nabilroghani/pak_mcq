import { CurrentAffairsPillar } from "@/views/SectionPillars";
import { buildTopicPillarMetadata } from "@/seo/buildPageMetadata";
import { currentAffairsPillars } from "@/data/siteStructure";

export function generateStaticParams() {
  return Object.keys(currentAffairsPillars).map((topicSlug) => ({ topicSlug }));
}

export async function generateMetadata({ params }) {
  const { topicSlug } = await params;
  const item = currentAffairsPillars[topicSlug?.toLowerCase()];
  if (!item) return {};
  return buildTopicPillarMetadata(item, "/current-affairs");
}

export default function Page() {
  return <CurrentAffairsPillar />;
}
