import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell page-hero">
      <p className="eyebrow">404 · Not found</p>
      <h1>This route left the system.</h1>
      <p><Link className="button button-primary" href="/en">Return to rentonhead <span aria-hidden="true">↗</span></Link></p>
    </section>
  );
}
