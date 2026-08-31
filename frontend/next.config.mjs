/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force title, description and robots into <head> for crawlers (Next.js 15 streaming metadata).
  htmlLimitedBots: /.*/,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    const apiOrigin = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/?$/, "") || "http://localhost:5000";
    return [
      {
        source: "/api/:path*",
        destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },
  async redirects() {
    const examRedirects = [
      "fpsc",
      "ppsc",
      "kppsc",
      "bpsc",
      "spsc",
      "ajkpsc",
      "nts",
      "ots",
      "etea",
      "css",
      "pms",
    ].flatMap((slug) => [
      { source: `/${slug}`, destination: `/government-exams/${slug}`, permanent: true },
      { source: `/${slug}/`, destination: `/government-exams/${slug}`, permanent: true },
    ]);

    const kppscSubRedirects = [
      ["syllabus", "/government-exams/kppsc/syllabus"],
      ["past-papers", "/government-exams/kppsc/past-papers"],
      ["mcqs", "/government-exams/kppsc/mcqs"],
      ["jobs", "/government-exams/kppsc/jobs"],
      ["eligibility", "/government-exams/kppsc/eligibility"],
      ["preparation", "/government-exams/kppsc/preparation"],
      ["online-test", "/government-exams/kppsc/online-tests"],
      ["online-tests", "/government-exams/kppsc/online-tests"],
    ].flatMap(([segment, destination]) => [
      { source: `/kppsc/${segment}`, destination, permanent: true },
      { source: `/kppsc/${segment}/`, destination, permanent: true },
    ]);

    return [
      { source: "/job-updates", destination: "/jobs", permanent: true },
      { source: "/e-book", destination: "/study-resources/books", permanent: true },
      { source: "/quiz-General", destination: "/online-tests/start", permanent: true },
      { source: "/fpsc-past-papers", destination: "/past-papers/fpsc", permanent: true },
      { source: "/fpsc-past-papers/", destination: "/past-papers/fpsc", permanent: true },
      { source: "/css-past-papers", destination: "/past-papers/fpsc", permanent: true },
      { source: "/css-past-papers/", destination: "/past-papers/fpsc", permanent: true },
      { source: "/admin", destination: "/admin/dashboard", permanent: false },
      { source: "/kppsc", destination: "/government-exams/kppsc", permanent: true },
      { source: "/kppsc/", destination: "/government-exams/kppsc", permanent: true },
      { source: "/government-exams/kppsc/online-test", destination: "/government-exams/kppsc/online-tests", permanent: true },
      { source: "/government-exams/kppsc/online-test/", destination: "/government-exams/kppsc/online-tests", permanent: true },
      { source: "/online-tests/kppsc", destination: "/government-exams/kppsc/online-tests", permanent: true },
      { source: "/online-tests/kppsc/", destination: "/government-exams/kppsc/online-tests", permanent: true },
      ...examRedirects,
      ...kppscSubRedirects,
    ];
  },
};

export default nextConfig;
