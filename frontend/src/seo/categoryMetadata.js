import { examCategoryMap } from "@/data/siteStructure";
import { buildPageMetadata } from "@/seo/buildPageMetadata";

const subjectMap = {
  "pak-current-affairs": "Pakistan Current Affairs",
  "general-knowledge": "General Knowledge",
  gk: "General Knowledge",
  "islamic-studies": "Islamic Studies",
  "pak-study": "Pakistan Studies",
  chemistry: "Chemistry",
  biology: "Biology",
  physics: "Physics",
  "computer-science": "Computer Science",
  "urdu-mcqs": "Urdu",
  math: "Mathematics",
};

/** Custom SEO overrides for specific category slugs */
const customCategoryMeta = {
  "general-knowledge": {
    title: "General Knowledge MCQs – Practice for FPSC, PPSC, KPPSC & NTS Exams",
    description:
      "General Knowledge MCQs and topic-wise practice for FPSC, PPSC, KPPSC, NTS and other Pakistan competitive exams — organized by subject to help you study smarter, not longer.",
  },
};

function formatSlug(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export function getCategoryDisplayName(slug) {
  const slugLower = slug?.toLowerCase()?.trim();
  const examContext = examCategoryMap[slugLower];

  if (examContext) {
    return `${examContext.label} Exams`;
  }

  return subjectMap[slugLower] || formatSlug(slug);
}

export function buildCategoryMetadata(categoryName) {
  const slugLower = categoryName?.toLowerCase()?.trim();
  const custom = customCategoryMeta[slugLower];

  if (custom) {
    return buildPageMetadata({
      title: custom.title,
      description: custom.description,
      path: `/category/${categoryName}`,
    });
  }

  const displayName = getCategoryDisplayName(categoryName);
  const path = `/category/${categoryName}`;

  return buildPageMetadata({
    title: `${displayName} MCQs – Practice Questions`,
    description: `Practice ${displayName} MCQs for FPSC, PPSC, KPPSC, NTS and other Pakistan competitive exams. Free questions updated regularly on PakLearners.`,
    path,
  });
}
