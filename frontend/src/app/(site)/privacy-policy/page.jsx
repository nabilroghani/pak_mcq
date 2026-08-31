import PrivacyPolicy from "@/views/PrivacyPolicy";
import { buildPageMetadata } from "@/seo/buildPageMetadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Read the PakLearners privacy policy — how we collect, use and protect your information when you use our exam preparation platform.",
  path: "/privacy-policy",
});

export default function Page() {
  return <PrivacyPolicy />;
}
