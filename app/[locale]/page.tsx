import Image from "next/image";
import Me from "../myphoto.webp";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const skills = [
  {
    key: "creative",
    accent: "from-pink-500 to-rose-600",
    iconBg: "bg-pink-50 dark:bg-pink-900/20",
    iconColor: "text-pink-600 dark:text-pink-400",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    ),
  },
  {
    key: "mobile",
    accent: "from-violet-500 to-purple-700",
    iconBg: "bg-violet-50 dark:bg-violet-900/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    ),
  },
  {
    key: "web",
    accent: "from-teal-400 to-cyan-600",
    iconBg: "bg-teal-50 dark:bg-teal-900/20",
    iconColor: "text-teal-600 dark:text-teal-400",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    ),
  },
  {
    key: "ecom",
    accent: "from-emerald-400 to-green-600",
    iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
  },
  {
    key: "seo",
    accent: "from-amber-400 to-orange-500",
    iconBg: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    ),
  },
  {
    key: "appstore",
    accent: "from-sky-500 to-blue-600",
    iconBg: "bg-sky-50 dark:bg-sky-900/20",
    iconColor: "text-sky-600 dark:text-sky-400",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
  },
] as const;

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("home");

  return (
    <div className="pb-16">
      {/* ============ HERO ============ */}
      <section className="pt-8 sm:pt-12">
        <div className="grid grid-cols-1 gap-10 md:gap-12 xl:grid-cols-3 xl:gap-x-12">
          {/* Profile */}
          <div className="flex flex-col items-center text-center xl:items-start xl:text-left">
            <div className="relative">
              <Image
                alt={t("imageAlt")}
                src={Me}
                width={500}
                height={500}
                priority
                placeholder="blur"
                sizes="(max-width: 768px) 176px, 208px"
                className="h-44 w-44 sm:h-48 sm:w-48 xl:h-52 xl:w-52 rounded-full object-cover object-top ring-4 ring-white dark:ring-gray-900 shadow-xl"
              />
              <span
                className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-semibold shadow-lg"
                aria-label={t("availability")}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                </span>
                <span className="hidden sm:inline">{t("availability")}</span>
                <span className="sm:hidden">Available</span>
              </span>
            </div>

            <h1 className="pt-5 text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
              {t("name")}
            </h1>
            <p className="pt-1 text-base sm:text-lg text-gray-500 dark:text-gray-400">
              {t("aka")}
            </p>
            <p className="pt-2 text-sm font-medium text-teal-600 dark:text-teal-400">
              {t("role")}
            </p>

            <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{t("location")}</span>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <a
                href="https://github.com/rentonhead"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("githubAria")}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-teal-500 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/30 transition-colors"
              >
                <svg viewBox="0 0 1024 1024" fill="currentColor" className="w-5 h-5">
                  <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/hasan-cemil-acar-b1738a1bb/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("linkedinAria")}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-teal-500 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/30 transition-colors"
              >
                <svg viewBox="0 0 1024 1024" fill="currentColor" className="w-5 h-5">
                  <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1168.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z" />
                </svg>
              </a>
              <a
                href="mailto:hasancemilacar@gmail.com?subject=Hey,rentonhead!"
                aria-label={t("mailAria")}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-teal-500 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/30 transition-colors"
              >
                <svg viewBox="0 0 1024 1024" fill="currentColor" className="w-5 h-5">
                  <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 01194 256h648.8a7.2 7.2 0 014.4 12.9z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bio */}
          <div className="xl:col-span-2 xl:pt-2">
            <div className="space-y-4 sm:space-y-5 text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p className="text-pretty">
                {t("bio1")}{" "}
                <span className="font-semibold text-gray-900 dark:text-white">{t("bio1Name")}</span>
                {t("bio1End")}
              </p>
              <p className="text-pretty">{t("bio2")}</p>
              <p className="text-pretty">{t("bio3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-gray-100 dark:border-gray-800">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-3">
            {t("skillsTitle")}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 max-w-2xl text-balance">
            {t("skillsSubtitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {skills.map((s) => (
            <article
              key={s.key}
              className="group relative flex flex-col p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${s.iconBg} mb-4`}>
                <svg className={`w-5 h-5 ${s.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  {s.icon}
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {t(`skill_${s.key}_title` as any)}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-4 flex-1">
                {t(`skill_${s.key}_desc` as any)}
              </p>
              <p className="text-[11px] font-medium tracking-wide text-gray-400 dark:text-gray-500 pt-3 border-t border-gray-100 dark:border-gray-800">
                {t(`skill_${s.key}_tags` as any)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
