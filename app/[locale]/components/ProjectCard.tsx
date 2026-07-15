import Link from "next/link";
import type { Project } from "@/lib/content";
import type { PublicLocale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { getContent } from "@/lib/content";

export default function ProjectCard({ project, locale, index }: { project: Project; locale: PublicLocale; index: number }) {
  const copy = getContent(locale);
  return (
    <article className={`project-card project-${project.accent}`}>
      <Link className="project-visual" href={localePath(locale, `/work/${project.slug}`)}>
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="project-word">{project.name}</span>
        <span className="project-system" aria-hidden="true">{project.stack.join("  /  ")}</span>
      </Link>
      <div className="project-info">
        <div className="project-title-line"><h3>{project.name}</h3><span>{project.year}</span></div>
        <p className="project-category">{project.category}</p>
        <p className="project-summary">{project.summary}</p>
        <div className="project-meta"><span>{project.role}</span><span>{project.stack.slice(0, 3).join(" · ")}</span></div>
        <Link className="text-link" href={localePath(locale, `/work/${project.slug}`)}>{copy.common.readCase}<span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
