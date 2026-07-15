import Link from "next/link";
import type { PublicLocale } from "@/lib/site";
import { PERSON, localePath } from "@/lib/site";
import { getContent } from "@/lib/content";

export default function Footer({ locale }: { locale: PublicLocale }) {
  const copy = getContent(locale);
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="wordmark footer-wordmark" href={localePath(locale)}>rentonhead</Link>
          <p>{copy.footer.descriptor}</p>
        </div>
        <nav aria-label={copy.labels.footerNavigation}>
          <Link href={localePath(locale, "/work")}>{copy.nav.work}</Link>
          <Link href={localePath(locale, "/capabilities")}>{copy.nav.capabilities}</Link>
          <Link href={localePath(locale, "/about")}>{copy.nav.about}</Link>
          <Link href={localePath(locale, "/contact")}>{copy.nav.contact}</Link>
        </nav>
        <nav aria-label={copy.labels.relatedWebsites}>
          <a href={PERSON.turkishPortfolio}>{copy.footer.turkish}<span aria-hidden="true">↗</span></a>
          <a href={PERSON.businessStudio}>{copy.footer.business}<span aria-hidden="true">↗</span></a>
          <a href={PERSON.github}>GitHub<span aria-hidden="true">↗</span></a>
          <a href={PERSON.linkedin}>LinkedIn<span aria-hidden="true">↗</span></a>
        </nav>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} Hasan Cemil Acar · rentonhead</span>
        <span>{copy.footer.rights}</span>
      </div>
    </footer>
  );
}
