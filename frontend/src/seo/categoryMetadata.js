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
  const displayName = getCategoryDisplayName(categoryName);
  const path = `/category/${categoryName}`;

  return buildPageMetadata({
    title: `${displayName} MCQs – Practice Questions`,
    description: `Practice ${displayName} MCQs for FPSC, PPSC, KPPSC, NTS and other Pakistan competitive exams. Free questions updated regularly on PakLearners.`,
    path,
  });
}
