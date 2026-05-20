"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="mt-16 sm:mt-20">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-durer text-2xl dark:text-yellow-300 leading-none">
              rentonhead
            </span>
            <span className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t("based")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {t("availableForWork")}
            </span>
            <a
              href="mailto:hasancemilacar@gmail.com"
              className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              hasancemilacar@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>{t("createdBy", { year: currentYear })}</span>
          <span>{t("rights")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
