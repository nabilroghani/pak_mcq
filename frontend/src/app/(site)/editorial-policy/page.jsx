import { EditorialPolicy } from "@/views/PolicyPages";
import { buildPageMetadata } from "@/seo/buildPageMetadata";

export const metadata = buildPageMetadata({
  title: "Editorial Policy",
  description:
    "PakLearners editorial policy — how we create, review and maintain MCQs, past papers and exam preparation content for accuracy and quality.",
  path: "/editorial-policy",
});

export default function Page() {
  return <EditorialPolicy />;
}
