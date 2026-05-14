"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="flex justify-center">
      <div className="bg-teal-500/30 rounded-lg shadow m-4">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-teal-500 sm:text-center dark:text-teal-500 ">
            {t("createdBy", { year: currentYear })}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
