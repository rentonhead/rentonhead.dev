import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { isPublicLocale } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import Breadcrumb from "../components/Breadcrumb";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isPublicLocale(locale)) return {};
  const copy = getContent(locale);
  return pageMetadata({ locale, path: "/about", title: copy.about.title, description: copy.about.intro });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isPublicLocale(locale)) notFound();
  const copy = getContent(locale);
  return (
    <div className="page-shell about-page">
      <Breadcrumb locale={locale} current={copy.nav.about} path="/about" />
      <header className="page-hero"><p className="eyebrow">{copy.about.eyebrow}</p><h1>{copy.about.title}</h1><p>{copy.about.intro}</p></header>
      <section className="about-story">
        <div className="about-signature" aria-hidden="true"><span>HCA</span><small>rentonhead</small></div>
        <div>{copy.about.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>
      <section className="facts-section">
        <p className="eyebrow">{copy.labels.faqEyebrow}</p><h2>{copy.about.factsTitle}</h2>
        <div>{copy.about.facts.map((fact) => <article key={fact.question}><h3>{fact.question}</h3><p>{fact.answer}</p></article>)}</div>
      </section>
    </div>
  );
}
