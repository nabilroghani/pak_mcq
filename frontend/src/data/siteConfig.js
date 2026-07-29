/** Central site identity — used by SEO schemas, footer, contact, sitemap */

export const siteConfig = {
  name: "PakLearners",
  legalName: "PakLearners",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://paklearners.com",
  description:
    "Pakistan's platform for government exam preparation — FPSC, PPSC, KPPSC, CSS, PMS, NTS MCQs, past papers, online tests and job updates.",
  email: "paklearnersofficial@gmail.com",
  phoneDisplay: "+92 333 8005540",
  phoneE164: "+923338005540",
  whatsappChannel: "https://whatsapp.com/channel/0029VbCMkBc9RZATvADmza08",
  address: {
    streetAddress: "",
    addressLocality: "Peshawar",
    addressRegion: "Khyber Pakhtunkhwa",
    addressCountry: "PK",
  },
  sameAs: [
    "https://www.facebook.com/share/18P9BbsVuz/",
    "https://whatsapp.com/channel/0029VbCMkBc9RZATvADmza08",
  ],
  logoPath: "/images/logo.webp",
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
