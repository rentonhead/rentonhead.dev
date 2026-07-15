import type { MetadataRoute } from "next";
import { content } from "@/lib/content";
import { PUBLIC_LOCALES, SITE_URL, absoluteUrl, languageAlternates } from "@/lib/site";

const UPDATED_AT = new Date("2026-07-15T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/work", "/capabilities", "/about", "/contact"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of PUBLIC_LOCALES) {
    for (const path of staticPaths) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: UPDATED_AT,
        changeFrequency: path === "" ? "monthly" : "yearly",
        priority: path === "" ? 1 : path === "/work" ? 0.9 : 0.7,
        alternates: { languages: languageAlternates(path) },
      });
    }

    for (const project of content[locale].projects) {
      const path = `/work/${project.slug}`;
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: UPDATED_AT,
        changeFrequency: "yearly",
        priority: 0.8,
        alternates: { languages: languageAlternates(path) },
      });
    }

    entries.push(
      { url: absoluteUrl(locale, "/brewclock/privacy"), lastModified: UPDATED_AT, changeFrequency: "yearly", priority: 0.2 },
      { url: absoluteUrl(locale, "/gastromancy/privacy"), lastModified: UPDATED_AT, changeFrequency: "yearly", priority: 0.2 },
    );
  }

  return entries;
}
