/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://rentonhead.dev",
  changefreq: "daily",
  priority: 0.7,
  generateRobotsTxt: true,
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "test-bot",
        allow: ["/path", "/path-2"],
      },
      {
        userAgent: "black-listed-bot",
        disallow: ["/sub-path-1", "/path-2"],
      },
    ],
    additionalSitemaps: [
      "https://rentonhead.dev/my-custom-sitemap-1.xml",
      "https://rentonhead.dev/my-custom-sitemap-2.xml",
      "https://rentonhead.dev/my-custom-sitemap-3.xml",
    ],
  },
};
