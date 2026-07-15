import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { PERSON, isPublicLocale } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import Breadcrumb from "../components/Breadcrumb";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isPublicLocale(locale)) return {};
  const copy = getContent(locale);
  return pageMetadata({ locale, path: "/contact", title: copy.contact.title, description: copy.contact.intro });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isPublicLocale(locale)) notFound();
  const copy = getContent(locale);
  return (
    <div className="page-shell contact-page">
      <Breadcrumb locale={locale} current={copy.nav.contact} path="/contact" />
      <header className="page-hero"><p className="eyebrow">{copy.contact.eyebrow}</p><h1>{copy.contact.title}</h1><p>{copy.contact.intro}</p></header>
      <section className="contact-panel">
        <div><p className="eyebrow">{copy.contact.emailLabel}</p><a className="contact-email" href={`mailto:${PERSON.email}?subject=${encodeURIComponent(copy.common.emailSubject)}`}>{PERSON.email}<span aria-hidden="true">↗</span></a><p>{copy.contact.availability}</p></div>
        <div><p className="eyebrow">{copy.contact.networkTitle}</p><a href={PERSON.github}>GitHub <span aria-hidden="true">↗</span></a><a href={PERSON.linkedin}>LinkedIn <span aria-hidden="true">↗</span></a><a href={PERSON.turkishPortfolio}>{copy.footer.turkish} <span aria-hidden="true">↗</span></a></div>
      </section>
    </div>
  );
}
