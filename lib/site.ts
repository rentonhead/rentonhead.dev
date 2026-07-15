export const SITE_URL = "https://rentonhead.dev";
export const DEFAULT_LOCALE = "en" as const;
export const PUBLIC_LOCALES = ["en", "ru"] as const;

export type PublicLocale = (typeof PUBLIC_LOCALES)[number];

export const PERSON = {
  name: "Hasan Cemil Acar",
  alternateName: "rentonhead",
  jobTitle: "Art Director & Programmer",
  email: "hasancemilacar@gmail.com",
  github: "https://github.com/rentonhead",
  linkedin: "https://www.linkedin.com/in/hasan-cemil-acar-b1738a1bb/",
  turkishPortfolio: "https://hasancemilacar.com.tr",
  businessStudio: "https://rentondiji.com",
} as const;

export function isPublicLocale(locale: string): locale is PublicLocale {
  return PUBLIC_LOCALES.includes(locale as PublicLocale);
}

export function localePath(locale: PublicLocale, path = "") {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function absoluteUrl(locale: PublicLocale, path = "") {
  return `${SITE_URL}${localePath(locale, path)}`;
}

export function languageAlternates(path = "") {
  return {
    en: absoluteUrl("en", path),
    ru: absoluteUrl("ru", path),
    "x-default": absoluteUrl("en", path),
  };
}
