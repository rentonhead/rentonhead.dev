"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center">
      <div className=" bg-teal-500/30 rounded-lg shadow m-4 md:fixed md:bottom-0">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-teal-500 sm:text-center dark:text-teal-500 ">
            © 2023 created by rentonhead with Next.js
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
