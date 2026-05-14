import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { client } from "../lib/sanity";

export const metadata: Metadata = {
  title: "Projects | rentonhead.dev",
  description:
    "Explore the work of Hasan Cemil Acar (rentonhead) — mobile apps, web experiences, e-commerce solutions, visual identities and UI/UX designs.",
};

interface SanityProject {
  title: string;
  overview: string;
  link: string;
  _id: string;
  imageUrl: string;
}

async function getProjects() {
  const query = `*[_type == "project"] {
    title,
      overview,
      link,
      _id,
      "imageUrl": image.asset->url
  }`;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

const categories = [
  {
    id: "mobile",
    label: "Mobile",
    sublabel: "iOS & SwiftUI",
    description: "Native iOS applications crafted with SwiftUI for the Apple ecosystem.",
    href: "/projects/mobile",
    gradient: "from-violet-500 to-purple-700",
    bgLight: "bg-violet-50",
    bgDark: "dark:bg-violet-900/20",
    borderLight: "border-violet-100",
    borderDark: "dark:border-violet-800",
    textAccent: "text-violet-600 dark:text-violet-400",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "web",
    label: "Web",
    sublabel: "React & Next.js",
    description: "Full-stack web applications and performant digital experiences for the modern web.",
    href: "#web-projects",
    gradient: "from-teal-400 to-cyan-600",
    bgLight: "bg-teal-50",
    bgDark: "dark:bg-teal-900/20",
    borderLight: "border-teal-100",
    borderDark: "dark:border-teal-800",
    textAccent: "text-teal-600 dark:text-teal-400",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    sublabel: "Scalable Solutions",
    description: "Robust and scalable e-commerce infrastructures built to grow with brands.",
    href: "#web-projects",
    gradient: "from-emerald-400 to-green-600",
    bgLight: "bg-emerald-50",
    bgDark: "dark:bg-emerald-900/20",
    borderLight: "border-emerald-100",
    borderDark: "dark:border-emerald-800",
    textAccent: "text-emerald-600 dark:text-emerald-400",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    id: "branding",
    label: "Visual Identity",
    sublabel: "Branding Systems",
    description: "Comprehensive brand identities and visual systems that make lasting impressions.",
    href: "#web-projects",
    gradient: "from-pink-500 to-rose-600",
    bgLight: "bg-pink-50",
    bgDark: "dark:bg-pink-900/20",
    borderLight: "border-pink-100",
    borderDark: "dark:border-pink-800",
    textAccent: "text-pink-600 dark:text-pink-400",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: "uiux",
    label: "UI/UX Design",
    sublabel: "Figma & Adobe",
    description: "Thoughtful interface and experience design — functional, aesthetic, and human-centred.",
    href: "#web-projects",
    gradient: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-50",
    bgDark: "dark:bg-amber-900/20",
    borderLight: "border-amber-100",
    borderDark: "dark:border-amber-800",
    textAccent: "text-amber-600 dark:text-amber-400",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

export default async function Projects() {
  const data: SanityProject[] = await getProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="pt-6 pb-10 border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl mb-3">
          All Projects
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
          A collection of work spanning mobile, web, e-commerce, branding and design.
        </p>
      </div>

      {/* Category Cards */}
      <div className="py-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-5">
          Areas of Work
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group flex items-start gap-4 p-5 rounded-2xl border ${cat.borderLight} ${cat.borderDark} ${cat.bgLight} ${cat.bgDark} hover:shadow-md transition-all duration-200`}
            >
              {/* Icon */}
              <span className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${cat.gradient} shadow-md`}>
                {cat.icon}
              </span>

              {/* Text */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{cat.label}</p>
                  {cat.id === "mobile" && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400">
                      ↗
                    </span>
                  )}
                </div>
                <p className={`text-[11px] font-semibold mb-1.5 ${cat.textAccent}`}>{cat.sublabel}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sanity Projects Section */}
      <div id="web-projects" className="scroll-mt-8 pb-16">
        <div className="flex items-center gap-3 mb-6 pt-2 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 pt-6">
            Featured Projects
          </p>
        </div>

        {data.length > 0 ? (
          <div className="grid gap-y-8 sm:gap-6 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {data.map((project) => (
              <article
                key={project._id}
                className="overflow-hidden dark:border-zinc-700 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg dark:bg-gray-900 dark:shadow-black/30 shadow-gray-100 transition-all duration-300 group"
              >
                <div className="h-52 w-full relative overflow-hidden">
                  <Image
                    fill
                    src={project.imageUrl}
                    alt={`${project.title} project image`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>

                <div className="p-5">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                  </a>

                  <p className="line-clamp-3 mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {project.overview}
                  </p>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors"
                  >
                    Learn More
                    <span className="block transition-transform group-hover/link:translate-x-0.5">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-12 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Case studies coming soon</p>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
              Check out{" "}
              <a href="https://github.com/rentonhead" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline">
                GitHub
              </a>{" "}
              in the meantime
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
