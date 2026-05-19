import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";

const SITE_URL = "https://rentonhead.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.mobileProjects" });
  const url = `${SITE_URL}/${locale}/projects/mobile`;
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(",").map((k) => k.trim()),
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/projects/mobile`,
        tr: `${SITE_URL}/tr/projects/mobile`,
        ru: `${SITE_URL}/ru/projects/mobile`,
        "x-default": `${SITE_URL}/en/projects/mobile`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function MobileProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("mobileProjects");
  const projectCount: number = 2;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "tr" ? "Ana Sayfa" : locale === "ru" ? "Главная" : "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumbProjects"), item: `${SITE_URL}/${locale}/projects` },
      { "@type": "ListItem", position: 3, name: t("breadcrumbMobile"), item: `${SITE_URL}/${locale}/projects/mobile` },
    ],
  };

  const brewclockApp = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: t("brewclock_name"),
    description: t("brewclock_description"),
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: ["en", "tr", "ru"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const gastromancyApp = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: t("gastromancy_name"),
    description: t("gastromancy_description"),
    applicationCategory: "FoodAndDrinkApplication",
    operatingSystem: "iOS",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: ["en", "tr", "ru"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const statusConfig: Record<string, { dot: string; badge: string }> = {
    "In Development": {
      dot: "bg-amber-400 animate-pulse",
      badge: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    },
    "Live": {
      dot: "bg-emerald-400",
      badge: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    },
    "Coming Soon": {
      dot: "bg-violet-400",
      badge: "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800",
    },
  };

  const status = statusConfig["In Development"];
  const liveStatus = statusConfig["Live"];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brewclockApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gastromancyApp) }}
      />
      {/* Hero Header */}
      <div className="pt-8 sm:pt-12 pb-12">
        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
          <Link href="/projects" className="hover:text-teal-500 transition-colors duration-150">
            {t("breadcrumbProjects")}
          </Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-600 dark:text-gray-400 font-medium">{t("breadcrumbMobile")}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 mb-4">
          <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg shadow-violet-500/25">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight text-balance">
              {t("title")}
            </h1>
            <p className="mt-2 text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl text-pretty">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">{projectCount}</span>{" "}
              {projectCount === 1 ? t("appsCount", { count: projectCount }).replace(String(projectCount), "").trim() : t("appsCountPlural", { count: projectCount }).replace(String(projectCount), "").trim()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400">{t("platform")}</span>
          </div>
        </div>
      </div>

      {/* BrewClock Card */}
      <div className="pb-16 space-y-6">
        <article className="group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("brewclock_name")}</h2>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {t("brewclock_status")}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-3 text-amber-500">{t("brewclock_tagline")}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{t("brewclock_description")}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    iOS
                  </span>
                  {["SwiftUI", "Swift", "CoreData"].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <span className="flex-shrink-0 self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-sm font-semibold cursor-default select-none">
                {t("comingSoon")}
              </span>
            </div>
          </div>
        </article>

        {/* Gastromancy Card */}
        <article className="group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400" />
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10l1.4 1.4M3 12h2m14 0h2M5.6 18.4l1.4-1.4m10-10l1.4-1.4" />
                  <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("gastromancy_name")}</h2>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${liveStatus.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${liveStatus.dot}`} />
                    {t("gastromancy_status")}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-3 text-rose-500">{t("gastromancy_tagline")}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{t("gastromancy_description")}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    iOS
                  </span>
                  {["React Native", "Expo", "Gemini AI", "RevenueCat"].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/gastromancy/privacy"
                className="flex-shrink-0 self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold transition-colors"
              >
                {t("viewPrivacy")}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </article>

        <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-10 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("moreApps")}</p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">{t("stayTuned")}</p>
        </div>
      </div>
    </div>
  );
}
