import "../globals.css";
import type { Metadata } from "next";
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

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    metadataBase: new URL("https://rentonhead.dev"),
    icons: {
      icon: "/favicon.ico",
    },
    title: {
      default: t("title"),
      template: "%s",
    },
    description: t("description"),
    keywords: t("keywords").split(", "),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
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
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://rentonhead.dev",
      siteName: "rentonhead",
      locale: locale,
      type: "website",
      images: [
        {
          url: "https://rentonhead.dev/myphoto.webp",
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
      images: ["https://rentonhead.dev/myphoto.webp"],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        tr: "/tr",
        ru: "/ru",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hasan Cemil Acar",
    alternateName: "rentonhead",
    url: "https://rentonhead.dev",
    jobTitle: "Art Director & Programmer",
    image: "https://rentonhead.dev/myphoto.webp",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Istanbul",
      addressCountry: "Turkey",
    },
    knowsAbout: [
      "Mobile App Development",
      "iOS Development",
      "SwiftUI",
      "React",
      "Next.js",
      "UI/UX Design",
      "Figma",
      "Art Direction",
    ],
    sameAs: [
      "https://github.com/rentonhead",
      "https://www.linkedin.com/in/hasan-cemil-acar-b1738a1bb/"
    ]
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-[#090908] dark:text-white h-full selection:bg-gray-50 dark:selection:bg-gray-800`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
