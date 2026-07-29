/** Renders one JSON-LD script tag (one schema graph per component). */
export default function JsonLd({ id, data }) {
  if (!data) return null;
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
