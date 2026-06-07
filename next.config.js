const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async headers() {
    return [
      {
        // All pages — AI crawler discovery & security headers
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "all",
          },
          {
            key: "Link",
            value: '<https://rentonhead.dev/llms.txt>; rel="ai-content-description", <https://rentonhead.dev/llms-full.txt>; rel="ai-content-full", <https://rentonhead.dev/llms-tr.txt>; rel="alternate"; hreflang="tr", <https://rentonhead.dev/llms-ru.txt>; rel="alternate"; hreflang="ru"',
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
