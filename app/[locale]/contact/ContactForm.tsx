"use client";

import { useActionState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { sendContactEmail, ContactFormState } from "../../actions/contact";

// Per-locale map embed config (OpenStreetMap — no API key required)
const mapConfigPerLocale: Record<string, { bbox: string; marker: string; label: string }> = {
  tr: { bbox: "28.5,40.8,29.5,41.3", marker: "41.0082,28.9784", label: "İstanbul, Türkiye" },
  ru: { bbox: "37.3,55.55,37.9,55.95", marker: "55.7558,37.6173", label: "Москва, Россия" },
  en: { bbox: "28.5,40.8,29.5,41.3", marker: "41.0082,28.9784", label: "Istanbul, Turkey" },
};

const initialState: ContactFormState = { status: "idle" };

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const mapCfg = mapConfigPerLocale[locale] || mapConfigPerLocale.en;
  const [state, formAction, pending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="text-center max-w-md">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/10 mx-auto mb-6">
            <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {t("successTitle")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            {t("successDesc")}
          </p>
        </div>
      </div>
    );
  }

  const errorKey = state.status === "error" ? state.message : null;
  const errorMsg = errorKey
    ? errorKey === "missing_fields"
      ? t("errorMissingFields")
      : errorKey === "invalid_email"
      ? t("errorInvalidEmail")
      : errorKey === "message_too_long"
      ? t("errorMessageTooLong")
      : errorKey === "rate_limited"
      ? t("errorRateLimited")
      : errorKey === "spam_detected"
      ? t("errorSpamDetected")
      : t("errorServer")
    : null;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="pt-8 sm:pt-12 pb-10 border-b border-gray-100 dark:border-gray-800">
        <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 dark:text-teal-400 mb-3">
          {t("eyebrow")}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-3">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl text-pretty">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 pt-10">
        {/* Left — contact info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4">
              {t("infoTitle")}
            </p>
            <div className="space-y-4">
              <a href="mailto:hasancemilacar@gmail.com" className="flex items-center gap-3 group">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 group-hover:bg-teal-500/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  hasancemilacar@gmail.com
                </span>
              </a>

              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  İstanbul ↔ Moskova
                </span>
              </div>
            </div>

            {/* Embedded map — local search signal + visual proof of location */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800/80 bg-white dark:bg-gray-900/40">
              <iframe
                title={mapCfg.label}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCfg.bbox}&layer=mapnik&marker=${mapCfg.marker}`}
                width="100%"
                height="220"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block" }}
              />
              <div className="px-3 py-2 text-[11px] font-medium text-gray-500 dark:text-gray-400 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/80">
                <span>{mapCfg.label}</span>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${mapCfg.marker.split(",")[0]}&mlon=${mapCfg.marker.split(",")[1]}#map=12/${mapCfg.marker.replace(",", "/")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 dark:text-teal-400 hover:underline"
                >
                  ↗
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <a href="https://github.com/rentonhead" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-teal-500 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/30 transition-colors">
              <svg viewBox="0 0 1024 1024" fill="currentColor" className="w-5 h-5">
                <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/hasan-cemil-acar-b1738a1bb/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-teal-500 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-teal-900/30 transition-colors">
              <svg viewBox="0 0 1024 1024" fill="currentColor" className="w-5 h-5">
                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1168.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z" />
              </svg>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{t("available")}</p>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-500 leading-relaxed">{t("availableDesc")}</p>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-3">
          <form ref={formRef} action={formAction} className="space-y-5">
            {/* Honeypot anti-spam */}
            <input type="text" name="_honey" className="hidden" aria-hidden="true" tabIndex={-1} />

            {errorMsg && (
              <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase">
                  {t("fieldName")} <span className="text-red-400">*</span>
                </label>
                <input id="name" name="name" type="text" required autoComplete="name"
                  placeholder={t("placeholderName")}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase">
                  {t("fieldEmail")} <span className="text-red-400">*</span>
                </label>
                <input id="email" name="email" type="email" required autoComplete="email"
                  placeholder={t("placeholderEmail")}
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="subject" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase">
                {t("fieldSubject")}
              </label>
              <input id="subject" name="subject" type="text"
                placeholder={t("placeholderSubject")}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase">
                {t("fieldMessage")} <span className="text-red-400">*</span>
              </label>
              <textarea id="message" name="message" required rows={6}
                placeholder={t("placeholderMessage")}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold text-sm shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5"
            >
              {pending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t("sending")}
                </>
              ) : (
                <>
                  {t("send")}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
