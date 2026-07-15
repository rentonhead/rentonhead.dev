import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCard from "../components/ProjectCard";
import { getContent } from "@/lib/content";
import { SITE_URL, absoluteUrl, isPublicLocale } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import Breadcrumb from "../components/Breadcrumb";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isPublicLocale(locale)) return {};
  const copy = getContent(locale);
  return pageMetadata({ locale, path: "/work", title: copy.work.title, description: copy.work.intro });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isPublicLocale(locale)) notFound();
  const copy = getContent(locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: copy.labels.home, item: absoluteUrl(locale) },
          { "@type": "ListItem", position: 2, name: copy.nav.work, item: absoluteUrl(locale, "/work") },
        ],
      },
      {
        "@type": "ItemList",
        name: copy.work.title,
        itemListElement: copy.projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.name,
          url: `${SITE_URL}/${locale}/work/${project.slug}`,
        })),
      },
    ],
  };
  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Breadcrumb locale={locale} current={copy.nav.work} path="/work" includeSchema={false} />
      <header className="page-hero">
        <p className="eyebrow">{copy.work.eyebrow}</p>
        <h1>{copy.work.title}</h1>
        <p>{copy.work.intro}</p>
      </header>
      <div className="project-list work-page-list">
        {copy.projects.map((project, index) => <ProjectCard key={project.slug} locale={locale} project={project} index={index} />)}
      </div>
    </div>
  );
}
