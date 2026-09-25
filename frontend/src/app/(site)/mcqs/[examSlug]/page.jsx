import McqPillar from "@/views/McqPillar";
import FaqSchema from "@/seo/FaqSchema";
import { buildExamPillarMetadata } from "@/seo/buildPageMetadata";
import { mcqExamPillars } from "@/data/siteStructure";
import { modMcqsFaqs } from "@/data/modMcqsFaqs";

export function generateStaticParams() {
  return Object.keys(mcqExamPillars).map((examSlug) => ({ examSlug }));
}

export async function generateMetadata({ params }) {
  const { examSlug } = await params;
  const exam = mcqExamPillars[examSlug?.toLowerCase()];
  if (!exam) return {};
  return buildExamPillarMetadata(exam, "/mcqs", "MCQs – Practice");
}

export default async function Page({ params }) {
  const { examSlug } = await params;
  const isMod = examSlug?.toLowerCase() === "mod";

  return (
    <>
      {isMod && <FaqSchema id="schema-faq-mod-mcqs" faqs={modMcqsFaqs} />}
      <McqPillar />
    </>
  );
}
