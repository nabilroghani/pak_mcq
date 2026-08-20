import GovernmentExamsPillar from "@/Components/GovernmentExamsPillar";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: "Government Exams in Pakistan – FPSC, PPSC, KPPSC & More",
  description:
    "Prepare for FPSC, PPSC, KPPSC, CSS, PMS, NTS, OTS and provincial exams with MCQs, past papers, syllabus guides and job updates — all in one place.",
  alternates: {
    canonical: "/government-exams",
  },
  openGraph: {
    title: "Government Exams in Pakistan – FPSC, PPSC, KPPSC & More | PakLearners",
    description:
      "Complete guide to government exams in Pakistan — FPSC, CSS, PPSC, KPPSC, NTS, OTS and more. Syllabus, eligibility, past papers and preparation tips.",
    url: "/government-exams",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Government Exams in Pakistan | PakLearners",
    description:
      "FPSC, PPSC, KPPSC, CSS, PMS, NTS, OTS — MCQs, past papers, syllabus and preparation guides for Pakistani competitive exams.",
  },
};

const faqs = [
  {
    q: "What are government exams in Pakistan?",
    a: "Government exams in Pakistan are competitive tests conducted by bodies like FPSC, provincial public service commissions (PPSC, KPPSC, SPSC, BPSC), and testing services such as NTS, OTS, and PTS to recruit candidates into public sector positions. These exams range from entry-level departmental tests to senior civil service exams like CSS and PMS. Each exam has its own eligibility criteria, syllabus, and pattern, so preparation strategies differ significantly depending on which exam and post a candidate is targeting.",
  },
  {
    q: "Which government exam is best in Pakistan?",
    a: "There's no single best government exam — the right one depends on qualifications, career goals, and province of residence. CSS is widely regarded as the most prestigious for senior federal civil service roles, while PMS offers a similar path at the provincial level. For quicker entry into public sector jobs, PPSC, KPPSC, or NTS-administered tests may be more accessible depending on available posts and eligibility.",
  },
  {
    q: "How can I prepare for government exams effectively?",
    a: "Start by understanding the specific exam's syllabus and pattern. Build a study schedule, use exam-relevant books and MCQs, regularly solve past papers, and stay updated on current affairs. In the final weeks, shift toward timed mock tests to build speed and confidence under real exam conditions.",
  },
  {
    q: "What is the FPSC exam?",
    a: "FPSC exams are conducted by the Federal Public Service Commission for recruitment into various federal government positions, including CSS and other BPS-scale posts. They typically include an objective-type MCQ paper covering general knowledge, current affairs, Pakistan Studies, and English, along with subject-specific content depending on the post.",
  },
  {
    q: "What is the CSS exam?",
    a: "CSS, or Central Superior Services exam, is Pakistan's premier competitive exam for recruiting officers into senior civil service positions, including the Foreign Service, Police Service, and Administrative Service groups. It is conducted by FPSC and includes written papers in compulsory and optional subjects, followed by a psychological assessment and interview for those who qualify.",
  },
  {
    q: "What is the difference between CSS and PMS?",
    a: "CSS is a federal-level competitive exam conducted by FPSC for senior federal civil service positions, while PMS is its provincial equivalent, conducted by provincial public service commissions like PPSC for provincial administrative posts. Both share a similar structure — written papers followed by an interview — but differ in service groups and jurisdictions.",
  },
  {
    q: "Which books are best for government exam preparation?",
    a: "The best books depend on the specific exam and syllabus. Prioritize material that matches the actual exam pattern. For MCQ-based exams like PPSC, KPPSC, or NTS, topic-wise practice books and updated current affairs resources tend to be more useful than dense textbooks meant for CSS or PMS.",
  },
  {
    q: "Where can I find government exam past papers?",
    a: "Past papers are available through organized exam preparation platforms that maintain collections by exam body and year. They help you understand how a specific commission phrases questions and which topics repeat across test cycles — especially useful in the final weeks before an exam.",
  },
  {
    q: "What is the eligibility criteria for FPSC exams?",
    a: "FPSC eligibility varies by post but generally requires a relevant Bachelor's or Master's degree, with age limits set per advertisement. CSS typically requires at least a second-division Bachelor's degree or equivalent CGPA, with age limits often between 21 and 30 years, subject to relaxations for certain categories.",
  },
  {
    q: "How is PPSC different from FPSC?",
    a: "FPSC recruits for federal government positions, while PPSC handles provincial government posts within Punjab. Both often use objective-type MCQ tests covering general knowledge, current affairs, and post-specific subjects, but eligibility, domicile requirements, and advertised posts differ.",
  },
  {
    q: "What subjects are important for NTS tests?",
    a: "NTS content varies by hiring department, but most tests share a common core of general knowledge, analytical or verbal ability, and English. Technical questions are added based on the post — confirm the exact pattern while building a strong general foundation.",
  },
  {
    q: "How long does it take to prepare for CSS?",
    a: "Most successful aspirants dedicate several months to a full year of consistent study, given the depth of compulsory and optional subjects. Sustained preparation tends to produce better results than short, intense bursts — especially for essay writing and optional subjects.",
  },
  {
    q: "Are online MCQ tests useful for government exam preparation?",
    a: "Yes. Most government exams in Pakistan, aside from CSS and PMS written stages, are entirely or largely MCQ-based. Timed online tests simulate real pressure, help build speed and accuracy, and highlight weak subjects for focused revision.",
  },
  {
    q: "What is the age limit for government jobs in Pakistan?",
    a: "Age limits vary by exam and post. CSS and PMS often require candidates within a range around 21–30 years, with relaxations for certain categories. Provincial and departmental tests set their own limits per advertisement — always verify current limits before applying.",
  },
  {
    q: "How can PakLearners help with government exam preparation?",
    a: "PakLearners brings together syllabus guidance, organized MCQs, solved past papers, and online tests for government exams in Pakistan — including FPSC, CSS, PPSC, KPPSC, and NTS-administered tests — organized by exam body so you prepare for what is actually relevant.",
  },
];

const pageUrl = absoluteUrl("/government-exams");

export default function Page() {
  return (
    <>
      <JsonLd
        id="schema-webpage-government-exams"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Government Exams in Pakistan – Complete Preparation Guide",
          url: pageUrl,
          about: { "@type": "Thing", name: "Government Exams in Pakistan" },
          description:
            "Complete guide to government exams in Pakistan — FPSC, CSS, PPSC, NTS and more. Syllabus, eligibility, past papers and preparation tips.",
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id="schema-article-government-exams"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Government Exams in Pakistan – Complete Preparation Guide, Syllabus, Past Papers & Updates",
          author: {
            "@type": "Organization",
            name: "PakLearners Editorial Team",
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl(siteConfig.logoPath),
            },
          },
          datePublished: "2026-07-01",
          dateModified: "2026-07-29",
          mainEntityOfPage: pageUrl,
          about: "Government Exams in Pakistan",
        }}
      />
      <JsonLd
        id="schema-learningresource-government-exams"
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: "Government Exams in Pakistan – Complete Preparation Guide",
          description:
            "Educational guide covering federal, provincial, competitive, and testing-service government exams in Pakistan.",
          learningResourceType: "Guide",
          educationalLevel: "Adult education",
          inLanguage: "en",
          url: pageUrl,
          author: {
            "@type": "Organization",
            name: "PakLearners Editorial Team",
          },
          dateModified: "2026-07-29",
        }}
      />
      <JsonLd
        id="schema-breadcrumb-government-exams"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Government Exams",
              item: pageUrl,
            },
          ],
        }}
      />
      <FaqSchema id="schema-faq-government-exams" faqs={faqs} />
      <GovernmentExamsPillar />
    </>
  );
}
