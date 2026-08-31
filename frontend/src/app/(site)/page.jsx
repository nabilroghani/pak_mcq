import Home from "@/views/Home";
import { buildPageMetadata } from "@/seo/buildPageMetadata";
import { siteConfig } from "@/data/siteConfig";

export const metadata = buildPageMetadata({
  title: "Government Jobs Prep – FPSC, PPSC MCQs",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return <Home />;
}
