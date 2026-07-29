import JsonLd from "@/seo/JsonLd";

/**
 * FAQPage schema — pass faqs: [{ q, a }] or [{ question, answer }]
 * Use one instance per page that has an FAQ section.
 */
export default function FaqSchema({ id = "schema-faq", faqs = [] }) {
  if (!faqs.length) return null;

  return (
    <JsonLd
      id={id}
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q || faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a || faq.answer,
          },
        })),
      }}
    />
  );
}
