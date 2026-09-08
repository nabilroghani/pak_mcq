import "./globals.css";
import GoogleAnalytics from "@/Components/GoogleAnalytics";
import GlobalSchemas from "@/seo/GlobalSchemas";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Government Jobs Preparation Pakistan | FPSC PPSC MCQs | PakLearners",
    template: "%s | PakLearners",
  },
  description:
    "Prepare for FPSC, PPSC, KPPSC, ETEA & NTS with updated MCQs, past papers and free online tests. A focused platform for Pakistan's government job seekers.",
  verification: {
    google: "JR-pUEqf5Dln6fY6wqYdiJktHkd9MfQ7fuwYoy4dU1s",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Government Jobs Preparation Pakistan | PakLearners",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GlobalSchemas />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
