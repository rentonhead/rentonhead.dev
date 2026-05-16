import "../globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import { Provider } from "./components/Provider";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const CursorComp = dynamic(() => import("./components/Cursor"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin", "cyrillic", "latin-ext"], display: "swap" });

const SITE_URL = "https://rentonhead.dev";

// Locale → OpenGraph locale + alternate locales (BCP-47)
const ogLocaleMap: Record<string, { locale: string; alternates: string[] }> = {
  en: { locale: "en_US", alternates: ["tr_TR", "ru_RU"] },
  tr: { locale: "tr_TR", alternates: ["en_US", "ru_RU"] },
  ru: { locale: "ru_RU", alternates: ["en_US", "tr_TR"] },
};

// Locale → primary service area (for local SEO ServiceArea / address)
const localeGeoMap: Record<
  string,
  {
    addressLocality: string;
    addressCountry: string;
    addressCountryCode: string;
    region: string;
    geo: { latitude: number; longitude: number };
    areaServed: { name: string; type: "City" | "Country" | "AdministrativeArea" }[];
  }
> = {
  tr: {
    addressLocality: "İstanbul",
    addressCountry: "Türkiye",
    addressCountryCode: "TR",
    region: "TR-34",
    geo: { latitude: 41.0082, longitude: 28.9784 },
    areaServed: [
      { name: "İstanbul", type: "City" },
      { name: "Ankara", type: "City" },
      { name: "İzmir", type: "City" },
      { name: "Bursa", type: "City" },
      { name: "Antalya", type: "City" },
      { name: "Türkiye", type: "Country" },
    ],
  },
  ru: {
    addressLocality: "Москва",
    addressCountry: "Россия",
    addressCountryCode: "RU",
    region: "RU-MOW",
    geo: { latitude: 55.7558, longitude: 37.6173 },
    areaServed: [
      { name: "Москва", type: "City" },
      { name: "Санкт-Петербург", type: "City" },
      { name: "Россия", type: "Country" },
    ],
  },
  en: {
    addressLocality: "Istanbul",
    addressCountry: "Turkey",
    addressCountryCode: "TR",
    region: "TR-34",
    geo: { latitude: 41.0082, longitude: 28.9784 },
    areaServed: [
      { name: "Istanbul", type: "City" },
      { name: "Moscow", type: "City" },
      { name: "Worldwide", type: "Country" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090908" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const og = ogLocaleMap[locale] || ogLocaleMap.en;
  const geo = localeGeoMap[locale] || localeGeoMap.en;

  return {
    metadataBase: new URL(SITE_URL),
    icons: { icon: "/favicon.ico" },
    title: {
      default: t("title"),
      template: "%s",
    },
    description: t("description"),
    keywords: t("keywords").split(",").map((k) => k.trim()),
    authors: [{ name: "Hasan Cemil Acar", url: SITE_URL }],
    creator: "Hasan Cemil Acar",
    publisher: "rentonhead",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "RgUvBdhUfXiMJXPjGxk23nTuk3zf9w-9MX9qCRd7Xjk",
      yandex: "yandex",
      yahoo: "yahoo",
      other: {
        me: ["hasancemilacar@gmail.com", "www.rentonhead.dev"],
      },
    },
    category: "software development",
    other: {
      // Local SEO geo meta tags
      "geo.region": geo.region,
      "geo.placename": geo.addressLocality,
      "geo.position": `${geo.geo.latitude};${geo.geo.longitude}`,
      ICBM: `${geo.geo.latitude}, ${geo.geo.longitude}`,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/${locale}`,
      siteName: "rentonhead",
      locale: og.locale,
      alternateLocale: og.alternates,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/myphoto.webp`,
          width: 500,
          height: 500,
          alt: "Hasan Cemil Acar - rentonhead",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${SITE_URL}/myphoto.webp`],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        tr: `${SITE_URL}/tr`,
        ru: `${SITE_URL}/ru`,
        "x-default": `${SITE_URL}/en`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const geo = localeGeoMap[locale] || localeGeoMap.en;

  // Person schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Hasan Cemil Acar",
    alternateName: "rentonhead",
    url: SITE_URL,
    jobTitle: "Art Director & Programmer",
    description:
      "Art Director & Programmer specializing in iOS mobile app development, modern web development, UI/UX design, e-commerce and local SEO.",
    image: `${SITE_URL}/myphoto.webp`,
    email: "mailto:hasancemilacar@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: geo.addressLocality,
      addressCountry: geo.addressCountryCode,
    },
    knowsLanguage: ["en", "tr", "ru"],
    knowsAbout: [
      "Mobile App Development",
      "iOS Development",
      "Swift",
      "SwiftUI",
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "UI/UX Design",
      "Figma",
      "Adobe Creative Suite",
      "Photoshop",
      "Illustrator",
      "After Effects",
      "WordPress",
      "WooCommerce",
      "E-Commerce",
      "Local SEO",
      "Rank Math",
      "App Store Screenshot Design",
      "Brand Identity",
      "Art Direction",
    ],
    sameAs: [
      "https://github.com/rentonhead",
      "https://www.linkedin.com/in/hasan-cemil-acar-b1738a1bb/",
    ],
  };

  // ProfessionalService schema with local areaServed — boosts local SEO per country
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "rentonhead — Hasan Cemil Acar",
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/myphoto.webp`,
    priceRange: "$$",
    telephone: "",
    email: "hasancemilacar@gmail.com",
    description:
      "iOS mobile app development, modern web development with React & Next.js, WooCommerce e-commerce, UI/UX design and local SEO.",
    founder: { "@id": `${SITE_URL}/#person` },
    address: {
      "@type": "PostalAddress",
      addressLocality: geo.addressLocality,
      addressCountry: geo.addressCountryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.geo.latitude,
      longitude: geo.geo.longitude,
    },
    areaServed: geo.areaServed.map((a) => ({
      "@type": a.type === "Country" ? "Country" : "City",
      name: a.name,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "iOS Mobile App Development",
            description: "Native iOS apps built with Swift and SwiftUI.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description: "Modern web apps with React, Next.js and Tailwind CSS.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce & CMS",
            description: "Turnkey WordPress and WooCommerce solutions.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description: "Figma and Adobe Creative Suite based interface and brand design.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "App Store Screenshot Design",
            description: "Conversion-focused App Store screenshot design for mobile apps.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Local SEO",
            description: "Local and global SEO strategies with tools like Rank Math.",
          },
        },
      ],
    },
    sameAs: [
      "https://github.com/rentonhead",
      "https://www.linkedin.com/in/hasan-cemil-acar-b1738a1bb/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "rentonhead",
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [personSchema, serviceSchema, websiteSchema],
  };

  return (
    <html lang={locale} suppressHydrationWarning className="bg-white dark:bg-[#090908]">
      <body
        className={`${inter.className} bg-white text-black dark:bg-[#090908] dark:text-white min-h-screen antialiased selection:bg-teal-100 dark:selection:bg-teal-900/40`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <CursorComp />
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
            <Analytics />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
