import { CurrentAffairsHub } from "@/views/HubPages";
import { buildPageMetadata } from "@/seo/buildPageMetadata";
import { siteSections } from "@/data/siteStructure";

const section = siteSections["current-affairs"];

export const metadata = buildPageMetadata({
  title: section.headline,
  description: section.description,
  path: "/current-affairs",
});

export default function Page() {
  return <CurrentAffairsHub />;
}
