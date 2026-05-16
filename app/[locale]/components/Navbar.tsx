"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Themebutton from "./Themebutton";

const localeLabels: Record<string, { flag: string; label: string }> = {
  en: { flag: "🇬🇧", label: "EN" },
  tr: { flag: "🇹🇷", label: "TR" },
  ru: { flag: "🇷🇺", label: "RU" },
};

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations("nav");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/");
  };

  const current = localeLabels[locale] || localeLabels.en;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150 ${
          compact ? "px-2 py-1.5" : "px-2.5 py-1.5"
        }`}
        aria-label={t("switchLanguage")}
        aria-expanded={open}
      >
        <span className="text-base leading-none">{current.flag}</span>
        {!compact && <span>{current.label}</span>}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl z-50 overflow-hidden">
          {Object.entries(localeLabels).map(([loc, { flag, label }]) => (
            <button
              key={loc}
              onClick={() => {
                setOpen(false);
                if (loc !== locale) switchLocale(loc);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-colors ${
                loc === locale
                  ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-base leading-none">{flag}</span>
              <span>{label}</span>
              {loc === locale && (
                <svg className="w-3.5 h-3.5 ml-auto text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname() || "/";
  const isProjects = pathname.includes("/projects");
  const isHome =
    pathname.endsWith("/") &&
    pathname.split("/").filter(Boolean).length <= 1;

  return (
    <Disclosure as="nav" className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-[#090908]/70 border-b border-gray-100/80 dark:border-gray-800/80">
      {({ open }: { open: boolean }) => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center" aria-label="rentonhead home">
                <h1 className="text-3xl sm:text-4xl font-xl font-durer dark:text-yellow-300 leading-none">
                  rentonhead
                </h1>
              </Link>

              {/* Desktop nav */}
              <div className="hidden sm:flex sm:items-center sm:gap-6">
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isHome
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {t("home")}
                </Link>
                <Link
                  href="/projects"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isProjects
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {t("projects")}
                </Link>
                <div className="h-5 w-px bg-gray-200 dark:bg-gray-700" />
                <LanguageSwitcher />
                <Themebutton />
              </div>

              {/* Mobile actions */}
              <div className="flex items-center gap-1.5 sm:hidden">
                <LanguageSwitcher compact />
                <Themebutton />
                <Disclosure.Button
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 transition-colors"
                  aria-label={open ? t("closeMenu") : t("openMenu")}
                >
                  {open ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-[#090908]/95 backdrop-blur-xl">
            <div className="px-3 py-3 space-y-1">
              <Disclosure.Button
                as={Link}
                href="/"
                prefetch
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isHome
                    ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {t("home")}
              </Disclosure.Button>

              <Disclosure.Button
                as={Link}
                href="/projects"
                prefetch
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isProjects
                    ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {t("projects")}
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
