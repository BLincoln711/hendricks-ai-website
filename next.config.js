/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/lines/marketing-ops", destination: "/practice", permanent: true },
      { source: "/lines/cx", destination: "/", permanent: true },
      { source: "/lines/sales", destination: "/", permanent: true },
      { source: "/lines/operations", destination: "/", permanent: true },
      { source: "/lines", destination: "/", permanent: true },
      { source: "/lines/:path*", destination: "/", permanent: true },
      { source: "/results", destination: "/", permanent: true },
      { source: "/results/:path*", destination: "/", permanent: true },
      { source: "/industries", destination: "/", permanent: true },
      { source: "/industries/:path*", destination: "/", permanent: true },
      { source: "/contact", destination: "/briefing", permanent: true },
    ];
  },
};

module.exports = nextConfig;
