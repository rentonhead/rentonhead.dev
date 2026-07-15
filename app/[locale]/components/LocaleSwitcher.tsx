"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PublicLocale } from "@/lib/site";
import { PERSON } from "@/lib/site";

export default function LocaleSwitcher({ locale }: { locale: PublicLocale }) {
  const pathname = usePathname() || `/${locale}`;
  const counterpart = pathname.replace(/^\/(en|ru)(?=\/|$)/, locale === "en" ? "/ru" : "/en");

  return (
    <div className="locale-switcher" aria-label="Language selection">
      <span className="sr-only">Current language: {locale === "en" ? "English" : "Russian"}</span>
      <Link href={counterpart} hrefLang={locale === "en" ? "ru" : "en"}>{locale === "en" ? "RU" : "EN"}</Link>
      <a href={PERSON.turkishPortfolio} hrefLang="tr" title="Turkish portfolio">TR↗</a>
    </div>
  );
}
