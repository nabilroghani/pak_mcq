import Quiz from "@/views/Quiz";
import { buildPageMetadata } from "@/seo/buildPageMetadata";

export const metadata = buildPageMetadata({
  title: "Start Online Test – Practice Quiz",
  description:
    "Attempt a timed online practice test on PakLearners to improve speed and accuracy for FPSC, PPSC, KPPSC and NTS competitive exams.",
  path: "/online-tests/start",
});

export default function Page() {
  return <Quiz />;
}
