import SubmitMcqs from "@/views/SubmitMcqs";
import { buildPageMetadata } from "@/seo/buildPageMetadata";

export const metadata = buildPageMetadata({
  title: "Submit MCQs – Contribute Questions",
  description:
    "Submit your MCQs to PakLearners and help fellow students prepare for FPSC, PPSC, KPPSC, NTS and other Pakistan competitive exams.",
  path: "/submit",
});

export default function Page() {
  return <SubmitMcqs />;
}
