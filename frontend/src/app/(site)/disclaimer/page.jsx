import { Disclaimer } from "@/views/PolicyPages";
import { buildPageMetadata } from "@/seo/buildPageMetadata";

export const metadata = buildPageMetadata({
  title: "Disclaimer",
  description:
    "PakLearners disclaimer — important information about the use of MCQs, past papers and exam preparation content on this website.",
  path: "/disclaimer",
});

export default function Page() {
  return <Disclaimer />;
}
