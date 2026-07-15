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
  return pageMetadata({ locale, path: "/capabilities", title: copy.capabilitiesPage.title, description: copy.capabilitiesPage.intro });
}

export default async function CapabilitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isPublicLocale(locale)) notFound();
  const copy = getContent(locale);
  return (
    <div className="page-shell">
      <Breadcrumb locale={locale} current={copy.nav.capabilities} path="/capabilities" />
      <header className="page-hero"><p className="eyebrow">{copy.capabilitiesPage.eyebrow}</p><h1>{copy.capabilitiesPage.title}</h1><p>{copy.capabilitiesPage.intro}</p></header>
      <div className="capabilities-detail-list">
        {copy.capabilities.map((capability, index) => (
          <article key={capability.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{capability.title}</h2>
            <p>{capability.description}</p>
            <dl><div><dt>{copy.labels.output}</dt><dd>{capability.outputs}</dd></div><div><dt>{copy.labels.tools}</dt><dd>{capability.tools}</dd></div></dl>
          </article>
        ))}
      </div>
      <section className="capability-bridge"><p className="eyebrow">{copy.labels.designEngineering}</p><h2>{copy.capabilitiesPage.bridgeTitle}</h2><p>{copy.capabilitiesPage.bridgeBody}</p></section>
    </div>
  );
}
