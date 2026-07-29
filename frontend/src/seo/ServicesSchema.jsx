import JsonLd from "@/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";

const services = [
  {
    name: "Government Exam Preparation Guides",
    path: "/government-exams",
    description:
      "Guides for FPSC, CSS, PPSC, KPPSC, PMS, NTS and other government exams in Pakistan.",
  },
  {
    name: "Exam-Wise MCQs Practice",
    path: "/mcqs",
    description:
      "Topic and exam-wise multiple choice questions for competitive and departmental tests.",
  },
  {
    name: "Past Papers",
    path: "/past-papers",
    description:
      "Solved and organized past papers by exam body for pattern-based revision.",
  },
  {
    name: "Online Mock Tests",
    path: "/online-tests",
    description:
      "Timed online tests that simulate real government exam conditions.",
  },
  {
    name: "Current Affairs Updates",
    path: "/current-affairs",
    description:
      "Current affairs content for FPSC, PPSC, KPPSC, CSS and NTS preparation.",
  },
  {
    name: "Government Jobs Updates",
    path: "/jobs",
    description:
      "Latest government job advertisements and recruitment updates in Pakistan.",
  },
];

/** Service schema — each service as its own Service entity in one ItemList */
export default function ServicesSchema() {
  return (
    <JsonLd
      id="schema-services"
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": absoluteUrl("/#services"),
        name: `${siteConfig.name} Services`,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            "@id": absoluteUrl(`${service.path}#service`),
            name: service.name,
            description: service.description,
            url: absoluteUrl(service.path),
            provider: {
              "@id": absoluteUrl("/#organization"),
            },
            areaServed: {
              "@type": "Country",
              name: "Pakistan",
            },
            serviceType: "EducationalService",
          },
        })),
      }}
    />
  );
}
