import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell page-hero">
      <p className="eyebrow">404 · Sayfa bulunamadı</p>
      <h1>Aradığınız sayfa bu sistemde bulunmuyor.</h1>
      <p><Link className="button button-primary" href="/tr">rentonhead ana sayfasına dön <span aria-hidden="true">↗</span></Link></p>
    </section>
  );
}
