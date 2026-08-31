import Contact from "@/views/Contact";
import { buildPageMetadata } from "@/seo/buildPageMetadata";

export const metadata = buildPageMetadata({
  title: "Contact PakLearners",
  description:
    "Get in touch with the PakLearners team for questions, feedback, or support with FPSC, PPSC, KPPSC and NTS exam preparation resources.",
  path: "/contact",
});

export default function Page() {
  return <Contact />;
}
