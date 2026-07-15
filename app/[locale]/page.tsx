import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectCard from "./components/ProjectCard";
import { getContent } from "@/lib/content";
import { PERSON, isPublicLocale, localePath } from "@/lib/site";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isPublicLocale(locale)) notFound();
  const copy = getContent(locale);

  return (
    <>
      <section className="hero section-shell">
        <div className="hero-meta">
          <p className="eyebrow">{copy.common.eyebrow}</p>
          <p className="hero-kicker">{copy.home.kicker}</p>
        </div>
        <div className="hero-copy">
          <h1>{copy.home.title}</h1>
          <div className="hero-intro-row">
            <p>{copy.home.intro}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href={localePath(locale, "/work")}>{copy.common.viewWork}<span aria-hidden="true">↘</span></Link>
              <Link className="button button-quiet" href={localePath(locale, "/contact")}>{copy.common.startProject}<span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <span className="availability-line"><i aria-hidden="true" />{copy.home.availability}</span>
          <span aria-hidden="true">01 — 06</span>
        </div>
      </section>

      <section className="section-shell work-section" aria-labelledby="selected-work">
        <div className="section-heading split-heading">
          <p className="eyebrow">{copy.home.workEyebrow}</p>
          <h2 id="selected-work">{copy.home.workTitle}</h2>
          <Link className="text-link" href={localePath(locale, "/work")}>{copy.common.viewAllWork}<span aria-hidden="true">↗</span></Link>
        </div>
        <div className="project-list">
          {copy.projects.map((project, index) => <ProjectCard key={project.slug} locale={locale} project={project} index={index} />)}
        </div>
      </section>

      <section className="section-shell capabilities-section" aria-labelledby="capabilities-home">
        <div className="section-heading split-heading">
          <p className="eyebrow">{copy.home.capabilitiesEyebrow}</p>
          <h2 id="capabilities-home">{copy.home.capabilitiesTitle}</h2>
          <Link className="text-link" href={localePath(locale, "/capabilities")}>{copy.nav.capabilities}<span aria-hidden="true">↗</span></Link>
        </div>
        <div className="capability-grid">
          {copy.capabilities.map((capability, index) => (
            <article className="capability-card" key={capability.title}>
              <span className="index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <dl>
                <div><dt>{copy.labels.output}</dt><dd>{capability.outputs}</dd></div>
                <div><dt>{copy.labels.tools}</dt><dd>{capability.tools}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell bridge-section">
        <p className="eyebrow">{copy.home.bridgeEyebrow}</p>
        <div className="bridge-grid">
          <h2>{copy.home.bridgeTitle}</h2>
          <div>
            <p>{copy.home.bridgeBody}</p>
            <div className="tool-rail" aria-label={copy.labels.coreTools}>
              <span>SwiftUI</span><span>Next.js</span><span>Figma</span><span>React Native</span><span>WordPress</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell process-section" aria-labelledby="process-title">
        <div className="section-heading split-heading">
          <p className="eyebrow">{copy.home.processEyebrow}</p>
          <h2 id="process-title">{copy.home.processTitle}</h2>
        </div>
        <ol className="process-list">
          {copy.home.process.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-shell ecosystem-section">
        <p className="eyebrow">{copy.home.ecosystemEyebrow}</p>
        <div className="ecosystem-grid">
          <h2>{copy.home.ecosystemTitle}</h2>
          <div>
            <p>{copy.home.ecosystemBody}</p>
            <div className="ecosystem-links">
              <a href={PERSON.turkishPortfolio}>Hasan Cemil Acar <span>{copy.footer.turkish} ↗</span></a>
              <a href={PERSON.businessStudio}>RentonDiji <span>{copy.footer.business} ↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell contact-band">
        <p className="eyebrow">{copy.home.contactEyebrow}</p>
        <h2>{copy.home.contactTitle}</h2>
        <div>
          <p>{copy.home.contactBody}</p>
          <a className="button button-primary" href={`mailto:${PERSON.email}?subject=${encodeURIComponent(copy.common.emailSubject)}`}>{copy.common.email}<span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </>
  );
}
