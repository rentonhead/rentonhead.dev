import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import { Provider } from "./components/Provider";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const CursorComp = dynamic(() => import("./components/Cursor"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    default: "rentonhead | Hasan Cemil Acar",
    template: "%s | rentonhead | Hasan Cemil Acar",
  },
  description: "rentonhead | Art Director & Programmer | Istanbul & Moscow",
  keywords: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React",
    "JavaScript",
    "Web Developer",
    "Swift",
    "SwiftUI",
    "iOS",
    "Art Director",
    "UI/UX Design",
    "Figma",
    "Branding",
  ],
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
};

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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-[#090908] dark:text-white h-full selection:bg-gray-50 dark:selection:bg-gray-800`}
      >
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
