import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { Provider } from "./components/Provider";
import Footer from "./components/Footer";
import CursorComp from "./components/Cursor";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    default: "rentonhead | Hasan Cemil Acar",
    template: "%s | rentonhead | Hasan Cemil Acar",
  },
  description: "rentonhead | Software Developer | Istanbul/Turkey",
  keywords: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React",
    "JavaScript",
    "Web Developer",
    "Swift",
    "iOS",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["hasancemilacar@gmail.com", "www.rentonhead.dev"],
    },
  },
  category: "software development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-[#090908] dark:text-white h-full selection:bg-gray-50 dark:selection:bg-gray-800`}
      >
        <Provider>
          <CursorComp />
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
