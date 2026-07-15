# rentonhead.dev

Global English/Russian portfolio of Hasan Cemil Acar (rentonhead), built with Next.js 16, React 19 and TypeScript.

## Local development

Use Node.js 24 (see `.nvmrc`) and npm:

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
npm run validate
```

`npm run validate` checks localized routes, internal links, canonical and hreflang metadata, discovery files, the generated Open Graph image, redirects and 404 behavior against a production build.

## URL policy

- `/` permanently redirects to `/en`.
- English and Russian are published at `/en` and `/ru` with matching route structures.
- Legacy `/en|ru/projects` routes permanently redirect to `/en|ru/work`.
- Turkish portfolio traffic is directed to [hasancemilacar.com.tr](https://hasancemilacar.com.tr).
- `rentonhead.dev` is the canonical non-www host.

SEO metadata, sitemap, robots policy, manifest, JSON-LD and AI discovery documents are generated or maintained from the App Router source. Vercel preview deployments are configured as `noindex`.
