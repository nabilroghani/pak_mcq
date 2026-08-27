import Blog from "@/views/Blog";

export const metadata = {
  title: "Exam Tips & Preparation Guides",
  description:
    "Read practical government exam preparation guides — study plans, MCQ strategies, past paper tips, and syllabus advice for FPSC, PPSC, KPPSC, NTS and more.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Exam Tips & Preparation Guides | PakLearners Blog",
    description:
      "In-depth exam preparation articles — study plans, MCQ strategies, past paper tips, and syllabus advice for Pakistan government job tests.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exam Tips & Preparation Guides | PakLearners Blog",
    description:
      "Practical government exam preparation guides for FPSC, PPSC, KPPSC, NTS and more on PakLearners.",
  },
};

export default function BlogPage() {
  return <Blog />;
}
