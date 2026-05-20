/** @type {import('next-sitemap').IConfig} */

const SITE_URL = "https://rentonhead.dev";
const LOCALES = ["en", "tr", "ru"];
const DEFAULT_LOCALE = "en";

// Per-URL priority/changefreq map keyed by locale-stripped path
const ROUTE_META = {
  "/": { priority: 1.0, changefreq: "weekly" },
  "/projects": { priority: 0.9, changefreq: "weekly" },
  "/projects/mobile": { priority: 0.8, changefreq: "weekly" },
  "/contact": { priority: 0.8, changefreq: "monthly" },
  "/brewclock/privacy": { priority: 0.3, changefreq: "yearly" },
  "/gastromancy/privacy": { priority: 0.3, changefreq: "yearly" },
};

function stripLocale(path) {
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0 && LOCALES.includes(segments[0])) {
    return "/" + segments.slice(1).join("/");
  }
  return path;
}

function localePathOf(path) {
  const segments = path.split("/").filter(Boolean);
  return segments[0] && LOCALES.includes(segments[0]) ? segments[0] : null;
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  autoLastmod: true,
  changefreq: "weekly",
  priority: 0.7,
  // Build alternateRefs for hreflang on every URL
  transform: async (config, path) => {
    const locale = localePathOf(path);
    const bare = stripLocale(path) || "/";
    const normalizedBare = bare === "" ? "/" : bare;

    const meta = ROUTE_META[normalizedBare] || {
      priority: config.priority,
      changefreq: config.changefreq,
    };

    // Build hreflang alternates pointing at the same logical page across locales
    const alternateRefs = [
      ...LOCALES.map((l) => ({
        href: `${SITE_URL}/${l}${normalizedBare === "/" ? "" : normalizedBare}`,
        hreflang: l,
      })),
      {
        href: `${SITE_URL}/${DEFAULT_LOCALE}${normalizedBare === "/" ? "" : normalizedBare}`,
        hreflang: "x-default",
      },
    ];

    return {
      loc: path,
      changefreq: meta.changefreq,
      priority: meta.priority,
      lastmod: new Date().toISOString(),
      alternateRefs,
    };
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      // Classic search engines
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "YandexBot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      // AI / LLM crawlers — explicitly allowed so the site can be cited and answered
      // in AI search engines (ChatGPT search, Perplexity, Claude, Gemini-grounded, etc.)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
    ],
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
  },
};
