import JsonLd from "@/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";

/** Organization schema — site-wide brand entity */
export default function OrganizationSchema() {
  return (
    <JsonLd
      id="schema-organization"
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: absoluteUrl("/"),
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.logoPath),
        },
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phoneE164,
        sameAs: siteConfig.sameAs,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: siteConfig.phoneE164,
            contactType: "customer support",
            email: siteConfig.email,
            areaServed: "PK",
            availableLanguage: ["English", "Urdu"],
          },
        ],
      }}
    />
  );
}
