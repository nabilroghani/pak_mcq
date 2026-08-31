import EBook from "@/views/EBook";
import { buildPageMetadata } from "@/seo/buildPageMetadata";

export const metadata = buildPageMetadata({
  title: "Books & Study PDFs",
  description:
    "Download free books and study PDFs for FPSC, PPSC, KPPSC, CSS, PMS and NTS exam preparation on PakLearners.",
  path: "/study-resources/books",
});

export default function Page() {
  return <EBook />;
}
