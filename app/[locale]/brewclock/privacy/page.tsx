import type { Metadata } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";

const SITE_URL = "https://rentonhead.dev";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata.brewclockPrivacy" });
  const url = `${SITE_URL}/${locale}/brewclock/privacy`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/brewclock/privacy`,
        tr: `${SITE_URL}/tr/brewclock/privacy`,
        ru: `${SITE_URL}/ru/brewclock/privacy`,
        "x-default": `${SITE_URL}/en/brewclock/privacy`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      type: "article",
    },
  };
}

export default function BrewClockPrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("privacy");

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "tr" ? "Ana Sayfa" : locale === "ru" ? "Главная" : "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumbProjects"), item: `${SITE_URL}/${locale}/projects` },
      { "@type": "ListItem", position: 3, name: t("breadcrumbMobile"), item: `${SITE_URL}/${locale}/projects/mobile` },
      { "@type": "ListItem", position: 4, name: t("breadcrumbPrivacy"), item: `${SITE_URL}/${locale}/brewclock/privacy` },
    ],
  };

  const dataItems = [
    { key: "local", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /> },
    { key: "cloud", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /> },
    { key: "location", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /> },
    { key: "photo", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
  ];

  const sections = [
    {
      number: "1",
      title: t("s1_title"),
      content: (
        <>
          <p>{t("s1_p1")}</p>
          <p className="mt-3">{t("s1_p2")}</p>
        </>
      ),
    },
    {
      number: "2",
      title: t("s2_title"),
      content: (
        <>
          <p>{t("s2_intro")}</p>
          <ul className="mt-4 space-y-4">
            {dataItems.map((item) => (
              <li key={item.key} className="flex gap-4">
                <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800">
                  <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {item.icon}
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{t(`s2_${item.key}_label`)}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5 leading-relaxed">{t(`s2_${item.key}_desc`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      number: "3",
      title: t("s3_title"),
      content: (
        <p>
          {t("s3_content")}{" "}
          <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-600 underline underline-offset-2 transition-colors">
            {t("s3_link")}
          </a>
        </p>
      ),
    },
    { number: "4", title: t("s4_title"), content: <p>{t("s4_content")}</p> },
    { number: "5", title: t("s5_title"), content: <p>{t("s5_content")}</p> },
    { number: "6", title: t("s6_title"), content: <p>{t("s6_content")}</p> },
    { number: "7", title: t("s7_title"), content: <p>{t("s7_content")}</p> },
    { number: "8", title: t("s8_title"), content: <p>{t("s8_content")}</p> },
  ];

  return (
    <div className="max-w-3xl pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 pt-6 mb-10">
        <Link href="/projects" className="hover:text-teal-500 transition-colors duration-150">{t("breadcrumbProjects")}</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href="/projects/mobile" className="hover:text-teal-500 transition-colors duration-150">{t("breadcrumbMobile")}</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-600 dark:text-gray-400 font-medium">{t("breadcrumbPrivacy")}</span>
      </nav>

      <div className="mb-12">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6">
          <span className="flex items-center justify-center w-5 h-5 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 flex-shrink-0">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </span>
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 tracking-wide">{t("appBadge")}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight mb-4">
          {t("title")}
        </h1>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span>{t("effectiveDate")} <strong className="text-gray-700 dark:text-gray-300">{t("effectiveDateValue")}</strong></span>
        </div>
      </div>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.number} id={`section-${section.number}`} className="scroll-mt-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xs font-bold flex-shrink-0 shadow-sm">{section.number}</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{section.title}</h2>
            </div>
            <div className="pl-10 text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">{section.content}</div>
          </section>
        ))}

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        <section id="section-contact" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xs font-bold flex-shrink-0 shadow-sm">9</span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t("s9_title")}</h2>
          </div>
          <div className="pl-10">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px] mb-4">{t("s9_content")}</p>
            <div className="inline-flex flex-col gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2.5 text-sm">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="text-gray-500 dark:text-gray-400">{t("developer")}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{t("developerName")}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-gray-500 dark:text-gray-400">{t("email")}</span>
                <a href="mailto:rentonhead@gmail.com" className="font-semibold text-amber-500 hover:text-amber-600 transition-colors underline underline-offset-2">rentonhead@gmail.com</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
