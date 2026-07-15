import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, getProject } from "@/lib/content";
import { PUBLIC_LOCALES, SITE_URL, absoluteUrl, isPublicLocale, localePath } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return PUBLIC_LOCALES.flatMap((locale) => getContent(locale).projects.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isPublicLocale(locale)) return {};
  const project = getProject(locale, slug);
  if (!project) return {};
  return pageMetadata({ locale, path: `/work/${project.slug}`, title: `${project.name} — ${project.category}`, description: project.summary });
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isPublicLocale(locale)) notFound();
  const project = getProject(locale, slug);
  if (!project) notFound();
  const copy = getContent(locale);
  const nextIndex = (copy.projects.findIndex((item) => item.slug === project.slug) + 1) % copy.projects.length;
  const nextProject = copy.projects[nextIndex];
  const type = project.slug === "brewclock" || project.slug === "castor-coffee-mobile" ? "MobileApplication" : "SoftwareApplication";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: copy.labels.home, item: absoluteUrl(locale) },
          { "@type": "ListItem", position: 2, name: copy.nav.work, item: absoluteUrl(locale, "/work") },
          { "@type": "ListItem", position: 3, name: project.name, item: absoluteUrl(locale, `/work/${project.slug}`) },
        ],
      },
      {
        "@type": type,
        "@id": `${SITE_URL}/work/${project.slug}#project`,
        name: project.name,
        description: project.summary,
        url: absoluteUrl(locale, `/work/${project.slug}`),
        inLanguage: locale,
        author: { "@id": `${SITE_URL}/#person` },
        dateCreated: project.year,
        applicationCategory: project.category,
        operatingSystem: type === "MobileApplication" ? "iOS and Android" : undefined,
        programmingLanguage: project.stack,
      },
    ],
  };
  return (
    <article className="page-shell case-study">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="breadcrumb"><Link href={localePath(locale, "/work")}>← {copy.common.backToWork}</Link></div>
      <header className={`case-hero project-${project.accent}`}>
        <div>
          <p className="eyebrow">{project.category} · {project.year}</p>
          <h1>{project.name}</h1>
          <p>{project.statement}</p>
        </div>
        <div className="case-monogram" aria-hidden="true">{project.name}</div>
      </header>
      <dl className="case-facts">
        <div><dt>{copy.projectLabels.role}</dt><dd>{project.role}</dd></div>
        <div><dt>{copy.projectLabels.year}</dt><dd>{project.year}</dd></div>
        <div><dt>{copy.projectLabels.technology}</dt><dd>{project.stack.join(" · ")}</dd></div>
      </dl>
      <section className="case-intro">
        <p className="eyebrow">{copy.projectLabels.overview}</p>
        <h2>{project.summary}</h2>
      </section>
      <div className="case-sections">
        <section><span>01</span><div><h2>{copy.projectLabels.problem}</h2><p>{project.problem}</p></div></section>
        <section><span>02</span><div><h2>{copy.projectLabels.approach}</h2><p>{project.approach}</p></div></section>
        <section><span>03</span><div><h2>{copy.projectLabels.result}</h2><p>{project.result}</p></div></section>
        <section><span>04</span><div><h2>{copy.projectLabels.responsibilities}</h2><ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
      </div>
      {project.sourceHref && <a className="button button-quiet source-link" href={project.sourceHref}>{copy.common.source}<span aria-hidden="true">↗</span></a>}
      <Link className="next-project" href={localePath(locale, `/work/${nextProject.slug}`)}><span>{copy.common.nextProject}</span><strong>{nextProject.name}</strong><i aria-hidden="true">↗</i></Link>
    </article>
  );
}
