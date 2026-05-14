"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Themebutton from "./Themebutton";

function ProjectsDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive =
    pathname === "/projects" || pathname.startsWith("/projects/");

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`group inline-flex items-center gap-1.5 px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "border-teal-500 text-gray-900 dark:text-white"
            : "border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-teal-400"
        }`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Projects
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl shadow-black/10 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/5 z-50 overflow-hidden">
          {/* Header */}
          <div className="px-3 pt-3 pb-1">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">
              Categories
            </p>
          </div>

          {/* All Projects */}
          <Link
            href="/projects"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 mx-1 mb-0.5 rounded-lg text-sm font-medium transition-all duration-150 group/item ${
              pathname === "/projects"
                ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-teal-400 to-cyan-500 text-white shadow-sm flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </span>
            <div>
              <div>All Projects</div>
              <div className="text-[11px] font-normal text-gray-400 dark:text-gray-500">Web, design & more</div>
            </div>
          </Link>

          <div className="h-px bg-gray-100 dark:bg-gray-800 mx-3 my-1" />

          {/* Mobile Projects */}
          <Link
            href="/projects/mobile"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 mx-1 mb-1 rounded-lg text-sm font-medium transition-all duration-150 group/item ${
              pathname === "/projects/mobile"
                ? "bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </span>
            <div>
              <div>Mobile Projects</div>
              <div className="text-[11px] font-normal text-gray-400 dark:text-gray-500">iOS & SwiftUI apps</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  let pathname = usePathname() || "/";
  return (
    <Disclosure as="nav">
      {({ open }: { open: boolean }) => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
            <div className="flex justify-between h-16">
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <Link href="/">
                    <h1 className="text-4xl font-xl font-durer dark:text-yellow-300">
                      rentonhead
                    </h1>
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                  <ProjectsDropdown pathname={pathname} />
                  <Themebutton />
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <Themebutton />
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:hover:bg-gray-800">
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/"
                prefetch
                className={`${
                  pathname === "/"
                    ? "bg-teal-50  border-teal-500 text-teal-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-teal-500 block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-base font-medium dark:text-white"
                } `}
              >
                Home
              </Link>

              {/* Mobile: Projects header */}
              <p className="pl-3 pr-4 py-1 text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">
                Projects
              </p>

              <Link
                href="/projects"
                prefetch
                className={`${
                  pathname === "/projects"
                    ? "bg-teal-50 border-teal-500 text-teal-500 block pl-6 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-teal-500 block pl-6 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-base font-medium dark:text-white"
                } `}
              >
                All Projects
              </Link>

              <Link
                href="/projects/mobile"
                prefetch
                className={`${
                  pathname === "/projects/mobile"
                    ? "bg-violet-50 border-violet-500 text-violet-600 block pl-6 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-violet-500 block pl-6 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-base font-medium dark:text-white"
                } `}
              >
                Mobile Projects
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
