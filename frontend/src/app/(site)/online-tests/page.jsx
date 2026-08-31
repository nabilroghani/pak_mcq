import { OnlineTestsHub } from "@/views/HubPages";
import { buildPageMetadata } from "@/seo/buildPageMetadata";
import { siteSections } from "@/data/siteStructure";

const section = siteSections["online-tests"];

export const metadata = buildPageMetadata({
  title: section.headline,
  description: section.description,
  path: "/online-tests",
});

export default function Page() {
  return <OnlineTestsHub />;
}
