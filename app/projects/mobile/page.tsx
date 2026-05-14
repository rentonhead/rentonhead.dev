import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mobile Projects | rentonhead.dev",
  description:
    "iOS & SwiftUI mobile applications built by Hasan Cemil Acar (rentonhead). Crafted with precision for the Apple ecosystem.",
};

interface MobileProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  platform: string[];
  tech: string[];
  status: "Live" | "In Development" | "Coming Soon";
  gradient: string;
  iconBg: string;
  accentColor: string;
  link?: string;
}

const projects: MobileProject[] = [
  {
    id: "brewclock",
    name: "BrewClock",
    tagline: "The perfect brew, every time.",
    description:
      "A precision brew timer and guide for coffee enthusiasts. Track your brewing methods, dial in your recipes, and craft the perfect cup — every single time.",
    platform: ["iOS"],
    tech: ["SwiftUI", "Swift", "CoreData"],
    status: "In Development",
    gradient: "from-amber-400 via-orange-400 to-red-400",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    accentColor: "text-amber-500",
  },
];

const statusConfig = {
  Live: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  },
  "In Development": {
    dot: "bg-amber-400 animate-pulse",
    badge: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  },
  "Coming Soon": {
    dot: "bg-violet-400",
    badge: "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800",
  },
};

export default function MobileProjectsPage() {
  return (
    <div>
      {/* Hero Header */}
      <div className="pt-6 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
          <Link href="/projects" className="hover:text-teal-500 transition-colors duration-150">
            Projects
          </Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-600 dark:text-gray-400 font-medium">Mobile</span>
        </div>

        {/* Title block */}
        <div className="flex items-start gap-5 mb-4">
          <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg shadow-violet-500/25">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl leading-tight">
              Mobile Projects
            </h1>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
              Native iOS experiences built with SwiftUI — crafted for the Apple ecosystem with precision and care.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">{projects.length}</span> app{projects.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400">iOS / SwiftUI</span>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="pb-16 space-y-6">
        {projects.map((project) => {
          const status = statusConfig[project.status];
          return (
            <article
              key={project.id}
              id={`project-${project.id}`}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300"
            >
              {/* Gradient top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  {/* App Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${project.iconBg} flex items-center justify-center shadow-lg`}>
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {project.name}
                      </h2>
                      {/* Status badge */}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {project.status}
                      </span>
                    </div>

                    <p className={`text-sm font-semibold mb-3 ${project.accentColor}`}>
                      {project.tagline}
                    </p>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech stack & Platform */}
                    <div className="flex flex-wrap gap-2">
                      {project.platform.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                          </svg>
                          {p}
                        </span>
                      ))}
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:opacity-80 transition-opacity duration-150"
                    >
                      View App
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <span className="flex-shrink-0 self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-sm font-semibold cursor-default select-none">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        {/* Empty state placeholder for future projects */}
        <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-10 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">More apps in the works</p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">Stay tuned for upcoming releases</p>
        </div>
      </div>
    </div>
  );
}
