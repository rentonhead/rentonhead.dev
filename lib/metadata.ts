import type { Metadata } from "next";
import type { PublicLocale } from "./site";
import { absoluteUrl, languageAlternates } from "./site";

export function pageMetadata({ locale, path, title, description }: { locale: PublicLocale; path: string; title: string; description: string }): Metadata {
  const canonical = absoluteUrl(locale, path);
  const ogImage = `/og?locale=${locale}&title=${encodeURIComponent(title)}`;
  return {
    title,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "rentonhead",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
