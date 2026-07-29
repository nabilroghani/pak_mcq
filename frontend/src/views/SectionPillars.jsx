import TopicPillar from "./TopicPillar";
import {
  pastPaperPillars,
  onlineTestPillars,
  currentAffairsPillars,
  studyResourcePillars,
} from "../data/siteStructure";

export const PastPaperPillar = () => (
  <TopicPillar
    pillars={pastPaperPillars}
    parentPath="/past-papers"
    parentLabel="All Past Papers"
    paramKey="examSlug"
    relatedLinks={(item) => [
      { name: `${item.name} MCQs`, path: `/mcqs/${item.slug}` },
      { name: `${item.name} Exam Guide`, path: `/government-exams/${item.slug}` },
      { name: `${item.name} Online Test`, path: `/online-tests/${item.slug}` },
      { name: "All Past Papers", path: "/past-papers" },
      { name: "Online Tests", path: "/online-tests" },
      { name: "Study Resources", path: "/study-resources" },
    ]}
  />
);

export const OnlineTestPillar = () => (
  <TopicPillar
    pillars={onlineTestPillars}
    parentPath="/online-tests"
    parentLabel="All Online Tests"
    paramKey="examSlug"
    relatedLinks={(item) => [
      { name: `Start ${item.name} Test`, path: "/online-tests/start" },
      { name: `${item.name} MCQs`, path: `/mcqs/${item.slug}` },
      { name: `${item.name} Past Papers`, path: `/past-papers/${item.slug}` },
      { name: `${item.name} Exam Guide`, path: `/government-exams/${item.slug}` },
      { name: "All Online Tests", path: "/online-tests" },
      { name: "Browse MCQs", path: "/mcqs" },
    ]}
  />
);

export const CurrentAffairsPillar = () => (
  <TopicPillar
    pillars={currentAffairsPillars}
    parentPath="/current-affairs"
    parentLabel="All Current Affairs"
    paramKey="topicSlug"
    relatedLinks={() => [
      { name: "Pakistan Affairs MCQs", path: "/category/Pak-Current-Affairs" },
      { name: "World Affairs MCQs", path: "/category/World-Current-Affairs" },
      { name: "All Current Affairs", path: "/current-affairs" },
      { name: "Browse MCQs", path: "/mcqs" },
      { name: "Online Tests", path: "/online-tests" },
      { name: "Blog", path: "/blog" },
    ]}
  />
);

export const StudyResourcePillar = () => (
  <TopicPillar
    pillars={studyResourcePillars}
    parentPath="/study-resources"
    parentLabel="All Study Resources"
    paramKey="topicSlug"
    relatedLinks={() => [
      { name: "Books & PDFs", path: "/study-resources/books" },
      { name: "Browse MCQs", path: "/mcqs" },
      { name: "Past Papers", path: "/past-papers" },
      { name: "Government Exams", path: "/government-exams" },
      { name: "Online Tests", path: "/online-tests" },
      { name: "All Study Resources", path: "/study-resources" },
    ]}
  />
);
