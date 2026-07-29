import SectionHub from "./SectionHub";
import { siteSections } from "../data/siteStructure";

export { default as GovernmentExams } from "@/Components/GovernmentExamsPillar";

export const McqsHub = () => <SectionHub section={siteSections.mcqs} />;

export const OnlineTestsHub = () => (
  <SectionHub section={siteSections["online-tests"]} />
);

export const PastPapersHub = () => (
  <SectionHub section={siteSections["past-papers"]} />
);

export const CurrentAffairsHub = () => (
  <SectionHub section={siteSections["current-affairs"]} />
);

export const StudyResourcesHub = () => (
  <SectionHub section={siteSections["study-resources"]} />
);
