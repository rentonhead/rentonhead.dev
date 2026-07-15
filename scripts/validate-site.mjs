import assert from "node:assert/strict";

const base = process.env.SITE_UNDER_TEST ?? "http://127.0.0.1:3100";
const projectSlugs = ["brewclock", "castor-coffee-mobile", "rentonsoft", "okulsistem"];
const pagePaths = [
  "",
  "/work",
  "/capabilities",
  "/about",
  "/contact",
  "/brewclock/privacy",
  "/gastromancy/privacy",
  ...projectSlugs.map((slug) => `/work/${slug}`),
];
const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();

for (const locale of ["tr", "en", "ru"]) {
  for (const path of pagePaths) {
    const route = `/${locale}${path}`;
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, `${route} should return 200`);
    const html = await response.text();
    const canonicalRoute = path === "" ? `${route}/` : route;
    assert.match(html, new RegExp(`<html[^>]+lang=["']${locale}["']`), `${route} should set html lang`);
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${route} should expose one h1`);
    assert.match(html, new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']https://www\\.rentonhead\\.dev${canonicalRoute.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`), `${route} should have a self-canonical`);
    assert.match(html, /hreflang=["']en["']/i, `${route} should reference English`);
    assert.match(html, /hreflang=["']ru["']/i, `${route} should reference Russian`);
    assert.match(html, /hreflang=["']tr["']/i, `${route} should reference Turkish`);
    assert.match(html, /property=["']og:title["']/, `${route} should expose Open Graph metadata`);
    assert.match(html, /property=["']og:description["']/, `${route} should expose an Open Graph description`);
    assert.match(html, /property=["']og:image["']/, `${route} should expose an Open Graph image`);
    assert.match(html, /name=["']robots["'][^>]+content=["']index, follow["']/, `${route} should be indexable`);
    assert.match(html, /application\/ld\+json/, `${route} should expose structured data`);

    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    const description = html.match(/<meta name=["']description["'] content=["']([^"']+)/)?.[1];
    assert.ok(title, `${route} should have a title`);
    assert.ok(description, `${route} should have a description`);
    assert.equal(titles.get(title), undefined, `${route} should have a unique title`);
    assert.equal(descriptions.get(description), undefined, `${route} should have a unique description`);
    titles.set(title, route);
    descriptions.set(description, route);

    for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/g)) {
      if (match[1].startsWith("/") && !match[1].startsWith("//")) internalLinks.add(match[1]);
    }
  }
}

for (const href of internalLinks) {
  const response = await fetch(`${base}${href}`);
  assert.ok(response.status < 400, `${href} should resolve without a broken internal link`);
}

const redirectChecks = [
  ["/", "/tr"],
  ["/tr/projects", "/tr/work"],
  ["/en/projects", "/en/work"],
  ["/ru/projects/mobile", "/ru/work/brewclock"],
];
for (const [from, to] of redirectChecks) {
  const response = await fetch(`${base}${from}`, { redirect: "manual" });
  assert.equal(response.status, 308, `${from} should be a permanent redirect`);
  assert.ok(response.headers.get("location")?.endsWith(to), `${from} should redirect to ${to}`);
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
assert.match(sitemap, /https:\/\/www\.rentonhead\.dev\/en\/work\/brewclock/);
assert.match(sitemap, /https:\/\/www\.rentonhead\.dev\/tr\/work\/brewclock/);
assert.match(sitemap, /hreflang="ru"/);
assert.match(sitemap, /hreflang="tr"/);

const robots = await (await fetch(`${base}/robots.txt`)).text();
assert.match(robots, /Sitemap: https:\/\/www\.rentonhead\.dev\/sitemap\.xml/);

for (const path of ["/manifest.webmanifest", "/llms.txt", "/llms-full.txt", "/llms-ru.txt", "/llms-tr.txt"]) {
  assert.equal((await fetch(`${base}${path}`)).status, 200, `${path} should return 200`);
}

const og = await fetch(`${base}/og?locale=tr&title=Hasan%20Cemil%20Acar`);
assert.equal(og.status, 200);
assert.match(og.headers.get("content-type") ?? "", /image\/png/);

assert.equal((await fetch(`${base}/en/route-that-does-not-exist`, { redirect: "manual" })).status, 404);

console.log(`Validated ${pagePaths.length * 3} localized pages, ${internalLinks.size} internal links, redirects, metadata, discovery files, OG image and 404 behavior.`);
