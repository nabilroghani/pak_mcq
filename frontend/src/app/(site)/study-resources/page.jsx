import { StudyResourcesHub } from "@/views/HubPages";
import { buildPageMetadata } from "@/seo/buildPageMetadata";
import { siteSections } from "@/data/siteStructure";

const section = siteSections["study-resources"];

export const metadata = buildPageMetadata({
  title: section.headline,
  description: section.description,
  path: "/study-resources",
});

export default function Page() {
  return <StudyResourcesHub />;
}
