/** @type {import('next').NextConfig} */
const nextConfig = {
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
  async redirects() {
    return [
      { source: "/job-updates", destination: "/jobs", permanent: true },
      { source: "/e-book", destination: "/study-resources/books", permanent: true },
      { source: "/quiz-General", destination: "/online-tests/start", permanent: true },
      { source: "/fpsc-past-papers", destination: "/past-papers/fpsc", permanent: true },
      { source: "/fpsc-past-papers/", destination: "/past-papers/fpsc", permanent: true },
      { source: "/css-past-papers", destination: "/past-papers/fpsc", permanent: true },
      { source: "/css-past-papers/", destination: "/past-papers/fpsc", permanent: true },
      { source: "/admin", destination: "/admin/dashboard", permanent: false },
    ];
  },
};

export default nextConfig;
