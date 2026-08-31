import About from "@/views/About";
import { buildPageMetadata } from "@/seo/buildPageMetadata";

export const metadata = buildPageMetadata({
  title: "About PakLearners – Exam Prep Platform",
  description:
    "Learn about PakLearners — Pakistan's platform for government exam preparation with MCQs, past papers, online tests and study resources for FPSC, PPSC, KPPSC and NTS.",
  path: "/about",
});

export default function Page() {
  return <About />;
}
