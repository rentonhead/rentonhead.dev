"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { PublicLocale } from "@/lib/site";
import { localePath } from "@/lib/site";

type MenuItem = readonly [label: string, href: string];

export default function MobileMenu({ locale, label, items }: { locale: PublicLocale; label: string; items: readonly MenuItem[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const details = detailsRef.current;
      if (!details?.open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        details.open = false;
        summaryRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = [summaryRef.current, ...details.querySelectorAll<HTMLAnchorElement>("nav a")].filter(Boolean) as HTMLElement[];
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function close() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <details className="mobile-menu" ref={detailsRef}>
      <summary aria-label={label} ref={summaryRef}><span /><span /></summary>
      <nav aria-label="Mobile navigation">
        {items.map(([itemLabel, href]) => (
          <Link key={href} href={localePath(locale, href)} onClick={close}>{itemLabel}<span aria-hidden="true">↗</span></Link>
        ))}
      </nav>
    </details>
  );
}
