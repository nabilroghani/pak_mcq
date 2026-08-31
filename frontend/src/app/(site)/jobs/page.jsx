import JobUpdates from "@/views/JobUpdates";
import { buildPageMetadata } from "@/seo/buildPageMetadata";

export const metadata = buildPageMetadata({
  title: "Latest Government Jobs in Pakistan",
  description:
    "Browse the latest government job announcements in Pakistan — FPSC, PPSC, KPPSC, NTS, OTS and provincial commission vacancies updated regularly.",
  path: "/jobs",
});

export default function Page() {
  return <JobUpdates />;
}
