import JsonLd from "@/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";

/** LocalBusiness schema — local presence (Peshawar, Pakistan) */
export default function LocalBusinessSchema() {
  return (
    <JsonLd
      id="schema-local-business"
      data={{
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        additionalType: "https://schema.org/LocalBusiness",
        "@id": absoluteUrl("/#localbusiness"),
        name: siteConfig.name,
        image: absoluteUrl(siteConfig.logoPath),
        url: absoluteUrl("/"),
        telephone: siteConfig.phoneE164,
        email: siteConfig.email,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.addressLocality,
          addressRegion: siteConfig.address.addressRegion,
          addressCountry: siteConfig.address.addressCountry,
        },
        areaServed: {
          "@type": "Country",
          name: "Pakistan",
        },
        priceRange: "Free",
        sameAs: siteConfig.sameAs,
        parentOrganization: {
          "@id": absoluteUrl("/#organization"),
        },
      }}
    />
  );
}
