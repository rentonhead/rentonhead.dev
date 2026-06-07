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
        // All pages — AI crawler discovery headers
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "all",
          },
          {
            key: "Link",
            value: '<https://rentonhead.dev/llms.txt>; rel="ai-content-description", <https://rentonhead.dev/llms-full.txt>; rel="ai-content-full"',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
