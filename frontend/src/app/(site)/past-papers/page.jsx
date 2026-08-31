import { PastPapersHub } from "@/views/HubPages";
import { buildPageMetadata } from "@/seo/buildPageMetadata";
import { siteSections } from "@/data/siteStructure";

const section = siteSections["past-papers"];

export const metadata = buildPageMetadata({
  title: section.headline,
  description: section.description,
  path: "/past-papers",
});

export default function Page() {
  return <PastPapersHub />;
}
