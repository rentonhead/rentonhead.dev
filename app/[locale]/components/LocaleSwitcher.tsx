"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_LOCALES, type PublicLocale } from "@/lib/site";

const languageNames: Record<PublicLocale, string> = {
  tr: "Türkçe",
  en: "English",
  ru: "Русский",
};

const selectionLabels: Record<PublicLocale, string> = {
  tr: "Dil seçimi",
  en: "Language selection",
  ru: "Выбор языка",
};

export default function LocaleSwitcher({ locale }: { locale: PublicLocale }) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className="locale-switcher" aria-label={selectionLabels[locale]}>
      <span className="sr-only">{languageNames[locale]}</span>
      {PUBLIC_LOCALES.map((targetLocale) => targetLocale === locale ? (
        <span key={targetLocale} aria-current="true">{targetLocale.toUpperCase()}</span>
      ) : (
        <Link
          key={targetLocale}
          href={pathname.replace(/^\/(tr|en|ru)(?=\/|$)/, `/${targetLocale}`)}
          hrefLang={targetLocale}
          title={languageNames[targetLocale]}
        >
          {targetLocale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
