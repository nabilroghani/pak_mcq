import { McqsHub } from "@/views/HubPages";
import { buildPageMetadata } from "@/seo/buildPageMetadata";
import { siteSections } from "@/data/siteStructure";

const section = siteSections.mcqs;

export const metadata = buildPageMetadata({
  title: section.headline,
  description: section.description,
  path: "/mcqs",
});

export default function Page() {
  return <McqsHub />;
}
