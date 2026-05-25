import "../globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import CursorClient from "./components/CursorClient";
import { Provider } from "./components/Provider";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

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
    currency: string;
    geo: { latitude: number; longitude: number };
    serviceRadiusKm: number;
    areaServed: { name: string; type: "City" | "Country" | "AdministrativeArea" }[];
  }
> = {
  tr: {
    addressLocality: "İstanbul",
    addressCountry: "Türkiye",
    addressCountryCode: "TR",
    region: "TR-34",
    currency: "TRY",
    geo: { latitude: 41.0082, longitude: 28.9784 },
    serviceRadiusKm: 50,
    areaServed: [
      // Primary city + key Istanbul districts (heavy local search volume)
      { name: "İstanbul", type: "City" },
      { name: "Kadıköy", type: "AdministrativeArea" },
      { name: "Beşiktaş", type: "AdministrativeArea" },
      { name: "Şişli", type: "AdministrativeArea" },
      { name: "Beyoğlu", type: "AdministrativeArea" },
      { name: "Üsküdar", type: "AdministrativeArea" },
      { name: "Bakırköy", type: "AdministrativeArea" },
      { name: "Maltepe", type: "AdministrativeArea" },
      // Secondary Turkish cities
      { name: "Ankara", type: "City" },
      { name: "İzmir", type: "City" },
      { name: "Bursa", type: "City" },
      { name: "Antalya", type: "City" },
      { name: "Eskişehir", type: "City" },
      { name: "Konya", type: "City" },
      { name: "Gaziantep", type: "City" },
      { name: "Adana", type: "City" },
      { name: "Türkiye", type: "Country" },
    ],
  },
  ru: {
    addressLocality: "Москва",
    addressCountry: "Россия",
    addressCountryCode: "RU",
    region: "RU-MOW",
    currency: "RUB",
    geo: { latitude: 55.7558, longitude: 37.6173 },
    serviceRadiusKm: 80,
    areaServed: [
      // Moscow + key districts
      { name: "Москва", type: "City" },
      { name: "ЦАО", type: "AdministrativeArea" },
      { name: "САО", type: "AdministrativeArea" },
      { name: "Хамовники", type: "AdministrativeArea" },
      { name: "Пресненский район", type: "AdministrativeArea" },
      // Secondary Russian cities
      { name: "Санкт-Петербург", type: "City" },
      { name: "Казань", type: "City" },
      { name: "Новосибирск", type: "City" },
      { name: "Екатеринбург", type: "City" },
      { name: "Нижний Новгород", type: "City" },
      { name: "Россия", type: "Country" },
    ],
  },
  en: {
    addressLocality: "Istanbul",
    addressCountry: "Turkey",
    addressCountryCode: "TR",
    region: "TR-34",
    currency: "USD",
    geo: { latitude: 41.0082, longitude: 28.9784 },
    serviceRadiusKm: 50,
    areaServed: [
      { name: "Istanbul", type: "City" },
      { name: "Kadıköy", type: "AdministrativeArea" },
      { name: "Beşiktaş", type: "AdministrativeArea" },
      { name: "Moscow", type: "City" },
      { name: "St. Petersburg", type: "City" },
      { name: "Ankara", type: "City" },
      { name: "İzmir", type: "City" },
      { name: "Worldwide", type: "Country" },
    ],
  },
};

// Locale → localized service catalog (used in ProfessionalService JSON-LD)
type ServiceOffer = { name: string; description: string };
const localeServicesMap: Record<string, ServiceOffer[]> = {
  tr: [
    { name: "iOS Mobil Uygulama Geliştirme", description: "Swift ve SwiftUI ile yerli iOS mobil uygulama geliştirme — İstanbul ve tüm Türkiye'ye anahtar teslim hizmet." },
    { name: "Modern Web Geliştirme", description: "React, Next.js ve Tailwind CSS ile modern, hızlı ve SEO uyumlu web sitesi geliştirme." },
    { name: "E-Ticaret & CMS Çözümleri", description: "WordPress, WooCommerce ve Shopify ile anahtar teslim, uygun fiyatlı e-ticaret sitesi yapımı." },
    { name: "WordPress Eklenti Geliştirme", description: "PHP ile özel WordPress eklentileri — WooCommerce, Elementor ve çekirdek WordPress'i temiz koduyla genişletme." },
    { name: "UI/UX Tasarım", description: "Figma ve Adobe Creative Suite ile profesyonel UI/UX ve marka kimliği tasarımı." },
    { name: "App Store Ekran Tasarımı", description: "iOS uygulamaları için dönüşüm odaklı App Store screenshot ve görsel tasarımı." },
    { name: "Lokal SEO", description: "Türkiye ve global pazarlar için Rank Math destekli lokal ve teknik SEO." },
  ],
  ru: [
    { name: "Разработка мобильных приложений iOS", description: "Нативные iOS-приложения на Swift и SwiftUI — разработка под ключ для клиентов из Москвы, Санкт-Петербурга и других регионов." },
    { name: "Современная веб-разработка", description: "Разработка быстрых и SEO-оптимизированных сайтов на React, Next.js и Tailwind CSS." },
    { name: "E-Commerce и CMS-решения", description: "Создание интернет-магазинов под ключ на WordPress, WooCommerce и Shopify — недорого и качественно." },
    { name: "Разработка плагинов WordPress", description: "Кастомные плагины WordPress на PHP — расширяю WooCommerce, Elementor и ядро системы чистым и поддерживаемым кодом." },
    { name: "UI/UX дизайн", description: "Профессиональный UI/UX и дизайн фирменного стиля в Figma и Adobe Creative Suite." },
    { name: "Дизайн скриншотов App Store", description: "Конверсионные скриншоты и визуалы App Store для iOS-приложений." },
    { name: "Локальное SEO", description: "Локальное и техническое SEO на базе Rank Math для клиентов в России и за рубежом." },
  ],
  en: [
    { name: "iOS Mobile App Development", description: "Native iOS apps built with Swift and SwiftUI — end-to-end mobile development for clients in Istanbul, Moscow and worldwide." },
    { name: "Modern Web Development", description: "Fast, SEO-friendly websites built with React, Next.js and Tailwind CSS." },
    { name: "E-Commerce & CMS", description: "Turnkey, affordable e-commerce stores with WordPress, WooCommerce and Shopify." },
    { name: "WordPress Plugin Development", description: "Custom WordPress plugins in PHP — extending WooCommerce, Elementor and the core with clean, maintainable code." },
    { name: "UI/UX Design", description: "Professional UI/UX and brand identity design in Figma and Adobe Creative Suite." },
    { name: "App Store Screenshot Design", description: "Conversion-focused App Store screenshot and marketing visual design for iOS apps." },
    { name: "Local SEO", description: "Local and technical SEO powered by Rank Math for clients in Turkey, Russia and worldwide." },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const og = ogLocaleMap[locale] || ogLocaleMap.en;
  const geo = localeGeoMap[locale] || localeGeoMap.en;

  return {
    metadataBase: new URL(SITE_URL),
    icons: { icon: "/icon.png", apple: "/icon.png" },
    manifest: "/manifest.json",
    applicationName: "rentonhead",
    appleWebApp: { capable: true, title: "rentonhead", statusBarStyle: "black-translucent" },
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
      other: {
        me: ["hasancemilacar@gmail.com", "https://rentonhead.dev"],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090908" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const geo = localeGeoMap[locale] || localeGeoMap.en;
  const services = localeServicesMap[locale] || localeServicesMap.en;

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
      "PHP",
      "WordPress Plugin Development",
      "Custom WordPress Plugins",
      "WordPress Hooks",
      "WordPress REST API",
      "Elementor Addon Development",
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
      "https://hasancemilacar.com.tr",
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
    currenciesAccepted: `${geo.currency}, USD, EUR`,
    paymentAccepted: "Bank transfer, Wire, USDT",
    email: "hasancemilacar@gmail.com",
    description:
      "iOS mobile app development, modern web development with React & Next.js, WooCommerce e-commerce, custom WordPress plugin development in PHP, UI/UX design and local SEO.",
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
    // GeoCircle service area — concrete signal for "near me" / local-pack searches
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: geo.geo.latitude,
        longitude: geo.geo.longitude,
      },
      geoRadius: `${geo.serviceRadiusKm * 1000}`,
    },
    // Opening hours — helps with local pack visibility on Google Maps / search
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: geo.areaServed.map((a) => ({
      "@type": a.type === "Country" ? "Country" : a.type === "AdministrativeArea" ? "AdministrativeArea" : "City",
      name: a.name,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          areaServed: geo.areaServed.map((a) => ({
            "@type": a.type === "Country" ? "Country" : "City",
            name: a.name,
          })),
          provider: { "@id": `${SITE_URL}/#service` },
        },
      })),
    },
    sameAs: [
      "https://hasancemilacar.com.tr",
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
    alternateName: ["rentonhead.dev", "Hasan Cemil Acar"],
    description:
      locale === "tr"
        ? "İstanbul merkezli, iOS mobil uygulama, web sitesi ve e-ticaret stüdyosu."
        : locale === "ru"
        ? "Студия из Стамбула и Москвы: iOS-приложения, сайты под ключ и интернет-магазины."
        : "Istanbul-based studio for iOS apps, modern websites and e-commerce.",
    inLanguage: ["en", "tr", "ru"],
    publisher: { "@id": `${SITE_URL}/#person` },
    image: `${SITE_URL}/myphoto.webp`,
    // Sitelinks Searchbox — opt-in to Google's site search action in SERP
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    // Voice search hint — what assistants read aloud when citing this site
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".text-pretty"],
    },
  };

  // Per-city LocalBusiness schemas — each major service city gets its own
  // anchored LocalBusiness entry. This is the strongest "I serve {city}"
  // signal for Google's local pack and Yandex local search.
  type CityEntry = {
    name: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    lat: number;
    lng: number;
    radiusKm: number;
  };
  const cityListPerLocale: Record<string, CityEntry[]> = {
    tr: [
      { name: "rentonhead — İstanbul",  addressLocality: "İstanbul", addressRegion: "TR-34", addressCountry: "TR", lat: 41.0082, lng: 28.9784, radiusKm: 30 },
      { name: "rentonhead — Ankara",    addressLocality: "Ankara",   addressRegion: "TR-06", addressCountry: "TR", lat: 39.9334, lng: 32.8597, radiusKm: 25 },
      { name: "rentonhead — İzmir",     addressLocality: "İzmir",    addressRegion: "TR-35", addressCountry: "TR", lat: 38.4192, lng: 27.1287, radiusKm: 25 },
      { name: "rentonhead — Bursa",     addressLocality: "Bursa",    addressRegion: "TR-16", addressCountry: "TR", lat: 40.1828, lng: 29.0665, radiusKm: 20 },
      { name: "rentonhead — Antalya",   addressLocality: "Antalya",  addressRegion: "TR-07", addressCountry: "TR", lat: 36.8969, lng: 30.7133, radiusKm: 25 },
    ],
    ru: [
      { name: "rentonhead — Москва",          addressLocality: "Москва",          addressRegion: "RU-MOW", addressCountry: "RU", lat: 55.7558, lng: 37.6173, radiusKm: 50 },
      { name: "rentonhead — Санкт-Петербург", addressLocality: "Санкт-Петербург", addressRegion: "RU-SPE", addressCountry: "RU", lat: 59.9311, lng: 30.3609, radiusKm: 40 },
      { name: "rentonhead — Казань",          addressLocality: "Казань",          addressRegion: "RU-TA",  addressCountry: "RU", lat: 55.7963, lng: 49.1064, radiusKm: 30 },
      { name: "rentonhead — Екатеринбург",    addressLocality: "Екатеринбург",    addressRegion: "RU-SVE", addressCountry: "RU", lat: 56.8389, lng: 60.6057, radiusKm: 30 },
    ],
    en: [
      { name: "rentonhead — Istanbul", addressLocality: "Istanbul", addressRegion: "TR-34",  addressCountry: "TR", lat: 41.0082, lng: 28.9784, radiusKm: 30 },
      { name: "rentonhead — Moscow",   addressLocality: "Moscow",   addressRegion: "RU-MOW", addressCountry: "RU", lat: 55.7558, lng: 37.6173, radiusKm: 50 },
    ],
  };
  const citiesForLocale = cityListPerLocale[locale] || cityListPerLocale.en;
  const cityLocalBusinessSchemas = citiesForLocale.map((c, i) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/${locale}#local-${c.addressLocality.replace(/\s+/g, "-").toLowerCase()}`,
    name: c.name,
    image: `${SITE_URL}/myphoto.webp`,
    url: `${SITE_URL}/${locale}`,
    telephone: undefined,
    email: "hasancemilacar@gmail.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: c.addressLocality,
      addressRegion: c.addressRegion,
      addressCountry: c.addressCountry,
    },
    geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng },
      geoRadius: `${c.radiusKm * 1000}`,
    },
    parentOrganization: { "@id": `${SITE_URL}/#service` },
    sameAs: [
      "https://hasancemilacar.com.tr",
      "https://github.com/rentonhead",
      "https://www.linkedin.com/in/hasan-cemil-acar-b1738a1bb/",
    ],
  }));

  // FAQPage schema — drives Google "People Also Ask" rich results
  const faqLocaleMap: Record<string, { q: string; a: string }[]> = {
    tr: [
      {
        q: "Hangi hizmetleri sunuyorsunuz?",
        a: "iOS mobil uygulama geliştirme (Swift/SwiftUI), modern web sitesi (React/Next.js), anahtar teslim e-ticaret (WooCommerce/Shopify), özel WordPress eklenti geliştirme (PHP), UI/UX tasarım (Figma/Adobe) ve lokal SEO hizmetleri sunuyorum.",
      },
      {
        q: "Nereden hizmet veriyorsunuz?",
        a: "İstanbul ve Moskova merkezliyim; Türkiye genelinde (Ankara, İzmir, Bursa, Antalya), Rusya'da (Moskova, Sankt-Petersburg) ve dünya genelinde uzaktan freelance hizmet veriyorum.",
      },
      {
        q: "WordPress için özel eklenti yazıyor musunuz?",
        a: "Evet. PHP ile çekirdek WordPress, WooCommerce ve Elementor'ü genişleten temiz, sürdürülebilir ve projeye özgü eklentiler geliştiriyorum.",
      },
      {
        q: "Mobil uygulama maliyeti nedir?",
        a: "Uygulama maliyeti kapsama, özellik sayısına ve App Store yayın gereksinimlerine bağlıdır. Detaylı bir teklif için iletişim sayfasından mesaj atabilirsiniz; 1-2 iş günü içinde dönüş yapıyorum.",
      },
      {
        q: "Hangi dillerde iletişim kurabiliyorsunuz?",
        a: "Türkçe, İngilizce ve Rusça iletişim kurabiliyorum. Tüm projeler için ana dilde dokümantasyon sağlıyorum.",
      },
    ],
    ru: [
      {
        q: "Какие услуги вы предлагаете?",
        a: "Разработка нативных iOS-приложений (Swift/SwiftUI), современные сайты (React/Next.js), интернет-магазины под ключ (WooCommerce/Shopify), кастомные плагины WordPress (PHP), UI/UX дизайн (Figma/Adobe) и локальное SEO.",
      },
      {
        q: "В каких городах вы работаете?",
        a: "Я работаю из Стамбула и Москвы. Беру удалённые проекты по всей России (Москва, Санкт-Петербург), Турции (Стамбул, Анкара, Измир) и по всему миру.",
      },
      {
        q: "Вы разрабатываете кастомные плагины WordPress?",
        a: "Да. На PHP я создаю чистые, поддерживаемые и адаптированные под задачи проекта плагины, расширяющие ядро WordPress, WooCommerce и Elementor.",
      },
      {
        q: "Сколько стоит разработка мобильного приложения?",
        a: "Стоимость зависит от объёма функций, сложности и требований к публикации в App Store. Напишите через страницу «Контакты» — отвечаю в течение 1-2 рабочих дней с подробной оценкой.",
      },
      {
        q: "На каких языках вы общаетесь с клиентами?",
        a: "Свободно общаюсь на русском, английском и турецком. По проектам предоставляю документацию на родном языке клиента.",
      },
    ],
    en: [
      {
        q: "What services do you offer?",
        a: "Native iOS app development (Swift/SwiftUI), modern websites (React/Next.js), turnkey e-commerce (WooCommerce/Shopify), custom WordPress plugin development (PHP), UI/UX design (Figma/Adobe), and local SEO.",
      },
      {
        q: "Where are you based and who do you serve?",
        a: "I'm based between Istanbul and Moscow and work remotely with clients across Turkey (Istanbul, Ankara, Izmir), Russia (Moscow, St. Petersburg), and worldwide.",
      },
      {
        q: "Do you build custom WordPress plugins?",
        a: "Yes. I write custom WordPress plugins in PHP that extend the core, WooCommerce, and Elementor with clean, maintainable code tailored to project requirements.",
      },
      {
        q: "How much does a mobile app cost?",
        a: "Cost depends on scope, feature complexity, and App Store launch requirements. Reach out via the contact page and I'll return a detailed quote within 1-2 business days.",
      },
      {
        q: "What languages do you communicate in?",
        a: "I speak English, Turkish, and Russian fluently and provide project documentation in the client's preferred language.",
      },
    ],
  };
  const faqs = faqLocaleMap[locale] || faqLocaleMap.en;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/${locale}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Standalone Service nodes — each service gets its own ranking-worthy
  // entity in addition to the OfferCatalog wrapping (which Google sometimes
  // de-emphasises). This is the per-service equivalent of per-city LocalBusiness.
  const standaloneServiceSchemas = services.map((s, i) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${locale}#service-${i}`,
    name: s.name,
    description: s.description,
    serviceType: s.name,
    provider: { "@id": `${SITE_URL}/#service` },
    areaServed: geo.areaServed.map((a) => ({
      "@type": a.type === "Country" ? "Country" : a.type === "AdministrativeArea" ? "AdministrativeArea" : "City",
      name: a.name,
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: geo.currency,
      availability: "https://schema.org/InStock",
    },
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      personSchema,
      serviceSchema,
      websiteSchema,
      faqSchema,
      ...cityLocalBusinessSchemas,
      ...standaloneServiceSchemas,
    ],
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
            <CursorClient />
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
