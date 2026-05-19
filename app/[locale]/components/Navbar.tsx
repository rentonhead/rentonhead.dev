"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Themebutton from "./Themebutton";

const localeLabels: Record<string, { code: string; name: string }> = {
  en: { code: "EN", name: "English" },
  tr: { code: "TR", name: "Türkçe" },
  ru: { code: "RU", name: "Русский" },
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
        className={`inline-flex items-center rounded-lg bg-teal-500/30 text-teal-500 hover:bg-teal-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 transition-colors duration-150 ${
          compact ? "p-2 gap-1" : "px-2.5 py-2 gap-1.5"
        }`}
        aria-label={t("switchLanguage")}
        aria-expanded={open}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={compact ? "w-6 h-6" : "w-5 h-5"}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3 7.5 7.03 7.5 12s2.015 9 4.5 9zM3.6 9h16.8M3.6 15h16.8"
          />
        </svg>
        {!compact && (
          <span className="text-sm font-semibold tracking-wide leading-none">
            {current.code}
          </span>
        )}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f0f0e] shadow-xl z-50 overflow-hidden"
        >
          {Object.entries(localeLabels).map(([loc, { code, name }]) => {
            const active = loc === locale;
            return (
              <button
                key={loc}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setOpen(false);
                  if (!active) switchLocale(loc);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-teal-500/10 text-teal-600 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-8 h-6 rounded-md text-[10px] font-bold tracking-wider ${
                    active
                      ? "bg-teal-500/20 text-teal-600 dark:text-teal-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {code}
                </span>
                <span className="flex-1 text-left">{name}</span>
                {active && (
                  <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
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
