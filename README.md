# Nicolás Delgado — Portfolio

Bilingual (Spanish / English) engineering portfolio, built as an editorial "spec sheet".
Static output, zero React, deployed on Netlify.

## Tech stack

- [Astro 7](https://astro.build) (static output, View Transitions, content collections, `astro:assets`)
- TypeScript (strictest preset) and [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`
- Vanilla TypeScript islands (theme toggle, counters, hero dot field), no UI framework
- Zod-validated content collections, self-hosted fonts (Bricolage Grotesque, Geist, Geist Mono)
- Build-time SEO: sitemap with `hreflang`, JSON-LD, Open Graph cards rendered with `satori` + `sharp`
- Playwright (e2e, axe WCAG 2.2 AA, build-output checks), ESLint 10 (flat config)

## Requirements

Node.js 22 or newer (`.nvmrc`), npm.

```bash
npm ci
npm run dev   # http://localhost:4321
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Astro dev server |
| `npm run check` | `astro check`: types for `.astro` and `.ts` files |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright suite (starts the dev server itself; `PORT=4322` if 4321 is busy) |
| `npm run test:i18n` | Unit specs in `tests/unit` (dictionary parity, paths, content, script budgets) |
| `npm run test:build` | Builds into a temp directory and checks the output (OG images, sitemap, canonical URLs, `netlify.toml`) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves `dist/` locally |

## Project structure

```
src/
  content/        JSON content collections: projects, services, timeline, skills, counters
  content.config.ts  Zod schemas for every collection
  data/           site constants (site-config.ts is shared with astro.config.mjs)
  i18n/           ui dictionaries (es, en), typed keys, localized path helpers
  pages/          es routes at /, en routes under /en, OG image endpoint, status pages
  components/     .astro components (header, dock nav, bento skills, git-log timeline, ...)
  scripts/        vanilla TS islands, each with a size budget enforced by tests
  lib/            SEO metadata, JSON-LD, OG card renderer, icon map
  assets/         images, skill icons, fonts used by the OG renderer
public/           favicon set, web manifest, robots.txt, CV PDFs
tests/            e2e/, unit/, build/ (Playwright)
```

### i18n

Spanish is the default locale and lives at `/`; English lives under `/en`. Every page renders
both locales at build time, with canonical and `hreflang` links, and the language switcher is a
plain link. UI strings live in `src/i18n/ui.ts`; both languages must define the same keys
(`npm run test:i18n` enforces it). Locale tags (`es-CO`, `en-US`) are defined once in
`src/data/site-config.ts`.

### Islands

There is no framework runtime. Interactivity is small vanilla TypeScript modules in
`src/scripts`: the theme toggle (system / light / dark, no flash), animated counters and the
hero dot field (idle-loaded, reduced-motion aware). Motion is disabled under
`prefers-reduced-motion`.

## Add a project

1. Add the image to `src/assets/images/`.
2. Create `src/content/projects/<slug>.json`:

```json
{
  "order": 5,
  "title": "My Project",
  "description": { "es": "Descripción en español.", "en": "Description in English." },
  "image": "../../assets/images/my-project.jpg",
  "repoUrl": "https://github.com/me/my-project",
  "demoUrl": "https://my-project.example.com",
  "tags": ["Astro", "TypeScript"]
}
```

`repoUrl`, `demoUrl` and `tags` are optional. The schema rejects missing locales or a broken
image path at build time, and the project shows up on the portfolio page (and the home page
if it is among the first ones by `order`).

## Deploy (Netlify)

`netlify.toml` configures everything: build command `npm run build`, publish directory `dist`,
Node 22, long-lived caching for `/_astro/*`, security headers, and a `/en/*` rule that serves
`/en/404.html` with a real 404 status (the default `/404.html` is served automatically).
Connect the repository in Netlify and it deploys with no further settings. The production
origin (`https://nicoj3000.netlify.app`) is `SITE_ORIGIN` in `src/data/site-config.ts`; change it
there when the domain changes.

## CI

`.github/workflows/ci.yml` runs lint and `astro check`, the Playwright suite (with axe) and
`npm run build` + `npm run test:build`.
