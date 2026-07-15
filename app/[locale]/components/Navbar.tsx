import Link from "next/link";
import type { PublicLocale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { getContent } from "@/lib/content";
import LocaleSwitcher from "./LocaleSwitcher";
import Themebutton from "./Themebutton";
import MobileMenu from "./MobileMenu";

export default function Navbar({ locale }: { locale: PublicLocale }) {
  const { nav } = getContent(locale);
  const items = [
    [nav.work, "/work"],
    [nav.capabilities, "/capabilities"],
    [nav.about, "/about"],
    [nav.contact, "/contact"],
  ] as const;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href={localePath(locale)} aria-label="rentonhead home">rentonhead</Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {items.map(([label, href]) => <Link key={href} href={localePath(locale, href)}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <span className="availability-mini"><i aria-hidden="true" />{nav.availability}</span>
          <LocaleSwitcher locale={locale} />
          <Themebutton />
          <MobileMenu locale={locale} label={nav.menu} items={items} />
        </div>
      </div>
    </header>
  );
}
