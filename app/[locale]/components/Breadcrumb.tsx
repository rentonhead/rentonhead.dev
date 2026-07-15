import Link from "next/link";
import type { PublicLocale } from "@/lib/site";
import { absoluteUrl, localePath } from "@/lib/site";

export default function Breadcrumb({ locale, current, path, includeSchema = true }: { locale: PublicLocale; current: string; path: string; includeSchema?: boolean }) {
  const home = locale === "ru" ? "Главная" : "Home";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: home, item: absoluteUrl(locale) },
      { "@type": "ListItem", position: 2, name: current, item: absoluteUrl(locale, path) },
    ],
  };

  return (
    <>
      {includeSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /> : null}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href={localePath(locale)}>{home}</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span>
      </nav>
    </>
  );
}
