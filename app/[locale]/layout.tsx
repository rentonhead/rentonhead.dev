import "../globals.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { notFound } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PERSON, PUBLIC_LOCALES, SITE_URL, absoluteUrl, isPublicLocale, languageAlternates } from "@/lib/site";
import { getContent } from "@/lib/content";
import Me from "../myphoto.webp";

const wordmark = localFont({
  src: "../../public/Durer.otf",
  display: "swap",
  variable: "--font-wordmark",
});

const descriptions = {
  tr: "Hasan Cemil Acar, diğer adıyla rentonhead; native iOS uygulamaları, dijital ürünler, modern web deneyimleri ve marka sistemleri geliştiren bir Sanat Yönetmeni ve Yazılımcıdır.",
  en: "Hasan Cemil Acar, known as rentonhead, is an Art Director & Programmer creating native iOS apps, digital products, modern web experiences and brand systems for international clients.",
  ru: "Хасан Джемиль Аджар, известный как rentonhead, — арт-директор и программист, создающий iOS-приложения, цифровые продукты, современные веб-сервисы и визуальные системы.",
} as const;

export function generateStaticParams() {
  return PUBLIC_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isPublicLocale(locale)) return {};

  const isPreview = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production");
  const title = locale === "tr"
    ? "Hasan Cemil Acar (rentonhead) — Sanat Yönetmeni ve Yazılımcı"
    : locale === "ru"
      ? "Hasan Cemil Acar (rentonhead) — Арт-директор и программист"
      : "Hasan Cemil Acar (rentonhead) — Art Director & Programmer";

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s — rentonhead" },
    description: descriptions[locale],
    applicationName: "rentonhead",
    authors: [{ name: PERSON.name, url: SITE_URL }],
    creator: PERSON.name,
    publisher: "rentonhead",
    category: "creative technology",
    icons: { icon: "/icon.png", apple: "/icon.png" },
    manifest: "/manifest.webmanifest",
    alternates: { canonical: absoluteUrl(locale), languages: languageAlternates() },
    robots: isPreview
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: {
      type: "profile",
      url: absoluteUrl(locale),
      siteName: "rentonhead",
      title,
      description: descriptions[locale],
      locale: locale === "tr" ? "tr_TR" : locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: ["tr_TR", "en_US", "ru_RU"].filter((value) => value !== (locale === "tr" ? "tr_TR" : locale === "ru" ? "ru_RU" : "en_US")),
      images: [{ url: `/og?locale=${locale}&title=${encodeURIComponent(title)}`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: descriptions[locale],
      images: [`/og?locale=${locale}&title=${encodeURIComponent(title)}`],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0d0d0b",
  colorScheme: "dark light",
};

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isPublicLocale(locale)) notFound();

  const copy = getContent(locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "rentonhead",
        description: descriptions[locale],
        inLanguage: ["tr", "en", "ru"],
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PERSON.name,
        alternateName: PERSON.alternateName,
        url: SITE_URL,
        image: new URL(Me.src, SITE_URL).toString(),
        jobTitle: PERSON.jobTitle,
        description: descriptions[locale],
        knowsLanguage: ["en", "ru", "tr"],
        knowsAbout: ["Art direction", "Native iOS development", "SwiftUI", "Digital product design", "Next.js", "React", "React Native", "WordPress", "WooCommerce", "App Store visual design"],
        sameAs: [PERSON.github, PERSON.linkedin, PERSON.turkishPortfolio],
      },
      {
        "@type": "ProfilePage",
        "@id": `${absoluteUrl(locale)}#profile`,
        url: absoluteUrl(locale),
        name: copy.about.title,
        description: descriptions[locale],
        inLanguage: locale,
        mainEntity: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
  };

  return (
    <html lang={locale} className={wordmark.variable} data-theme="dark">
      <body>
        <a className="skip-link" href="#main-content">{copy.labels.skipToContent}</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(structuredData) }} />
        <Navbar locale={locale} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
