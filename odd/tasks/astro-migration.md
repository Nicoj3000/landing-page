# Feature: Astro migration + frontend redesign

- **Branch:** `astro-migration-nicoj3000` (local only — never push, never open PRs)
- **Status:** in progress
- **TDD:** strict, enabled (source: user global CLAUDE.md "Strict TDD Mode: enabled"); runner: Playwright (`npx playwright test`) + `astro check`
- **Delivery strategy:** local work-unit commits per phase; no PR slicing (user requested local-only)

## Objective

Migrate the portfolio from Next.js 14 to Astro (latest stable, 7.x) with strict TypeScript and Tailwind 4, and redesign the whole frontend with a distinctive 2026-level visual identity, keeping full functional parity.

## Problem / Why

- Almost every component is a client component; Spline (~1.35 MB + WASM), tsParticles, framer-motion and icon-cloud ship heavy JS.
- i18n is client-only: SSR is always Spanish (flash for EN visitors), no localized routes, no hreflang, metadata Spanish-only.
- No JSON-LD; OG images rely on Next edge runtime.
- `data.tsx` mixes JSX with data; skills are hardcoded in a component.

## Design direction — "Spec Sheet"

- Engineer portfolio read as an editorial technical spec sheet / blueprint.
- Palette: dark ink `#0A0C0F` / text `#E8E6E1`; light paper `#F4F2EC` / ink `#14161A`; single accent electric lime `#C8F03C` (dark) and AA-safe dark olive in light mode.
- Type: Bricolage Grotesque (display), Geist (body), Geist Mono (labels/numbers/meta). Self-hosted.
- Hero: kinetic typography + pointer-reactive dot field (canvas, vanilla JS, lazy, reduced-motion aware). Spline and particles removed; LCP is text.
- Numbered sections (`01 / ABOUT`), bento skills grid, `git log`-style timeline, project cards with mono metadata.
- Motion: CSS scroll-driven animations, Astro View Transitions, clip-path theme toggle; all disabled under `prefers-reduced-motion`.

## Scope / Constraints

- Static output (no SSR) deployed to Netlify via `netlify.toml`.
- i18n: `/` (es, default) and `/en/` routes, hreflang, language switcher as real links, CV per locale.
- Theme: dark/light/system with no flash (inline head script).
- Content as Zod-validated content collections (projects, services, timeline, skills).
- Islands justified; prefer zero React.
- WCAG 2.2 AA; mobile-first 360px → ultrawide; no horizontal scroll; `astro:assets` images.
- Never build after each change: builds only for baseline (T0) and final metrics (T7).
- Nothing pushed to the remote.

## Tasks

- [x] T0 — Baseline metrics of current Next.js site (JS weight, Lighthouse mobile per route). Route: inline bounded action.
- [x] T1 — Astro scaffold: Astro 7 + strict TS + Tailwind 4 tokens, base layout, no-flash theme, i18n routing + hreflang, fonts. Route: delegated writer (2+ non-trivial files).
- [x] T2 — Content collections with Zod (projects, services, timeline, skills) + UI dictionaries migrated from `utils/i18n.ts` with key-parity test. Route: delegated writer.
- [x] T3a — Review follow-ups R3-001..006. Route: delegated writer (same writer as T3/T5).
- [x] T3 — Redesigned pages: home (hero), about-me (timeline/skills/counters), services, portfolio, 404, error. Route: delegated writer.
- [x] T4 — SEO: metadata, canonical, OG/Twitter via satori at build, sitemap, robots, manifest, favicon/apple-icon, JSON-LD Person. Route: delegated writer.
- [x] T3b — Review follow-ups R3-101..104. Route: delegated writer (same writer as T4/T6).
- [x] T5 — Islands & interactions: theme toggler (View Transitions), language switcher, counters, hero field, scroll animations, reduced motion. Route: delegated writer.
- [x] T6 — Playwright e2e per route, theme, language, axe a11y; update `ci.yml` (local only). Route: delegated writer.
- [ ] T7 — Remove Next and unused deps, `netlify.toml`, final metrics, report. Route: delegated writer + inline metrics.

## Acceptance criteria

- Lighthouse mobile ≥ 95 (Perf, A11y, BP, SEO) on every route.
- Home client JS far below baseline (reported in KB).
- `astro check`, lint and build with no errors.
- Playwright suite green, including axe checks.
- Every key from `utils/i18n.ts` present in both locales.

## Progress / Evidence

### T0 baseline (Next.js 14, `next build` + `next start`, Lighthouse 13 mobile, local)

| Route | Perf | A11y | BP | SEO | LCP | TBT | Total KB | Script KB (transfer) | First Load JS (gzip, next build) |
|---|---|---|---|---|---|---|---|---|---|
| / | 39 | 100 | 100 | 100 | 16.2 s | 4,420 ms | 2701 | 858 | 192 kB |
| /about-me | 37 | 98 | 96 | 100 | 11.8 s | 5,790 ms | 2038 | 282 | 211 kB |
| /services | 76 | 98 | 100 | 100 | 3.1 s | 720 ms | 1940 | 282 | 175 kB |
| /portfolio | 77 | 98 | 100 | 100 | 6.5 s | 70 ms | 2202 | 282 | 181 kB |

Home script transfer includes the lazy Spline runtime.

### T1 + T2 (delegated writer; trigger: 2+ non-trivial files)

- Commits: `65af0f6` scaffold, `3bed474` content collections, `a8bd5aa` i18n dictionaries + parity test.
- Decisions: `trailingSlash: 'never'` + `build.format: 'file'` (keeps legacy URLs); Astro fonts API (fontsource provider) with `--af-*` vars; theme via `data-theme` / `data-theme-pref` on `<html>`, re-applied on `astro:after-swap`; all collections JSON + Zod with `{es,en}` localized fields; 26 skill icons generated once from `simple-icons` into `src/assets/icons` (no runtime CDN); `ui.ts` typed from `es` keys.
- Light accent `#4F6700` (5.7:1); dark lime `#C8F03C` (14.9:1).
- RED/GREEN: T1 19 failing → 21/21; T2 parity test failing on 72 leaf strings/lang → 3/3. Zod rejection proven (`label.en: Required`).
- Verification (parent spot check): `npx astro check` → 0 errors, 0 warnings, 0 hints. Writer: `PORT=4322 npx playwright test` → 28 passed; `npm run test:i18n` → 3 passed. `npm run lint` not run yet (still legacy eslint) — pending T7.
- Review (RDD on): assess medium, `slice_budget_reached`; consent granted by user; lineage `review-561420713d50fcf9`, lens reliability — APPROVED and acknowledged (authority burned). Reviewed boundary → `a8bd5aa`. 6 non-blocking findings (R3-001 `.html` suffix in canonical/hreflang under `build.format: 'file'`; R3-002 no build-output URL test; R3-003 dark theme test vacuous due to hardcoded `data-theme`; R3-004 parity test depends on legacy module; R3-005 no matchMedia listener; R3-006 favicon is the full profile PNG) → scheduled as T3a fixes.
- Open for later: parity test imports legacy `utils/i18n.ts` → freeze a snapshot before T7 deletes it; dev toolbar disabled; `--ignore-lock` in Playwright webServer; map markers not migrated; favicon to replace in T4.

### T3a + T3 + T5 (delegated writer; trigger: 2+ non-trivial files, one writer)

- Commits: `429dfe0` T3a fixes, `0721d13` shell + home, about page commit, `65a7fdf` services + portfolio, `149103e` 404/error, `bc1759e` T5 islands.
- T3a: `normalizePathname` in `src/i18n/utils.ts` feeds canonical/hreflang/LangSwitch/aria-current; `tests/unit/build-output.spec.ts` checks built HTML (run: `npx astro build --outDir <dir>` then `BUILD_DIR=<dir> npx playwright test tests/unit/build-output.spec.ts`; skipped when absent); SSR html has no `data-theme`; matchMedia listener while pref is system; parity test reads `tests/fixtures/legacy-i18n.json`; NX monogram SVG favicon + generated 32/48 ICO (`scripts/generate-favicon.mjs`, uses sharp from Astro's deps).
- Decisions: nav = one `<nav>` landmark that is a bottom tab bar below `lg` (thumb reach, labels wrap at 360px) and a floating top pill from `lg`; theme cycle system -> light -> dark -> system with circle view-transition reveal (skipped under reduced motion/unsupported); icons are an inline SVG map (`src/lib/icons.ts`, Lucide-style paths) instead of `@lucide/astro` (zero runtime, 5 service icons); hero roles rotate in pure CSS and animate only once `html[data-theme]` exists (so no-JS and reduced motion get the static first role); 404 is per-locale (`/404`, `/en/404`) and error page is static (`/error`, `/en/error`): a static site has no 5xx, Netlify serves `/en/404.html` only through a redirect rule that T7 must add to `netlify.toml` (`/en/* -> /en/404.html` status 404); status pages are noindex and filtered from the sitemap.
- Islands (all vanilla TS, no React): theme toggle (click, eager module), counters (IntersectionObserver), hero dot field (idle-loaded, ~2.0 KB min / 1.1 KB gzip). Budgets enforced by `tests/unit/script-budget.spec.ts`.
- Verification: `npx astro check` 0 errors; `PORT=4322 npx playwright test` 145 passed, 8 skipped (build-output, no BUILD_DIR); with the scratch build `BUILD_DIR=... build-output.spec.ts` 8 passed. Single scratch `astro build` succeeded (12 pages); built `en` home is `en.html`.
- Known gaps: T4 SEO (OG/Twitter, JSON-LD, apple-touch/manifest), T6 (axe, CI; `.reveal` elements start at opacity 0 until scrolled, check axe contrast timing), T7 (delete `components/`, `app/`, legacy deps, netlify.toml with the `/en/*` 404 rule, metrics, `npm run lint`).

### T3b + T4 + T6 (delegated writer; trigger: 2+ non-trivial files, one writer)

- Commits: `99333f3` T3b, `a853413` icons + manifest + robots, `5613d8a` metadata/OG/JSON-LD/sitemap, `284d3fc` tests (language switch, axe, keyboard), `b88ab87` ESLint + CI, plus this docs commit.
- T3b: R3-101 sitemap spec (8 pages present, 404/error absent, no `.html`); R3-102 theme toggle skips the previous view transition and only the latest clears `data-theme-vt` (RED: overlap spec with fake transitions failed, GREEN after fix); R3-103 build specs moved to `tests/build/`, require explicit `BUILD_DIR` (throws if it points to a missing dir, skips with a reason when unset), `npm run test:build` builds into a temp dir and runs `playwright.build.config.ts` (no browser, no dev server); R3-104 reduced-motion counter test now awaits text "10" and asserts at least one recorded value.
- T4 decisions: `src/lib/seo.ts` (page registry, title/description per page and locale, OG slug), `src/lib/json-ld.ts` (Person + WebSite `@graph`, `<` escaped), `src/lib/og-image.ts` + `src/pages/og/[...slug].png.ts` (8 static PNGs, satori -> SVG -> sharp PNG, 1200x630, Spec Sheet look). satori cannot read WOFF2, so 3 static WOFF files (Bricolage Grotesque 800, Geist Mono 400/500, from fontsource, OFL) are committed in `src/assets/fonts` and the fontsource packages are not dependencies. Icons from the NX monogram via `scripts/generate-icons.mjs` (sharp is now an explicit devDependency): apple-touch 180, icon-192/512, maskable 512 (logo at 72% inside the safe zone). `site.webmanifest`, `robots.txt` -> `sitemap-index.xml`. Sitemap `i18n` (es-CO / en-US) emits alternates; filter kept. 404/error pages: noindex, no canonical/hreflang, reuse the home OG card. New ui keys: `seo.about|services|portfolio.description` (ES/EN).
- T6 decisions: legacy `tests/home` + `tests/base-page.ts` removed; `tests/e2e/language-switch.spec.ts` with `pages/home-page.ts` page object. axe (`@axe-core/playwright` 4.13.0) scans 4 pages x 2 locales + 4 status pages, in light and dark (24 scans), tags wcag2a/aa, wcag21a/aa, wcag22aa, contrast rule enabled; `.reveal` fade-ins are handled with `contextOptions.reducedMotion = "reduce"` (guard asserts the media query matches). Sanity check: an injected low-contrast paragraph is reported as `color-contrast`. Zero violations found; axe "incomplete" items are the hero text over the canvas layer (overlap, tokens are 14.9:1 / 5.7:1) and the aria-hidden outlined `404` numeral. One real a11y bug found by the keyboard spec (RED) and fixed: `main#main` was not focusable, so the skip link did not move focus; now `tabindex="-1"` with no outline. `--ignore-lock` is REQUIRED (verified: without it Astro 7 `astro dev` detaches to a daemon in non-TTY and exits 0). ESLint is flat `eslint.config.js` (eslint 10: `eslint-plugin-astro` 3.x needs eslint >=10, not 9; typescript-eslint, @eslint/js, globals), ignoring `.next`, legacy `app/ components/ lib/ utils/ data.tsx` etc. `eslint-config-next` and `.eslintrc.json` removed. `.nvmrc` = 22; local `.github/workflows/ci.yml` has quality (lint + astro check), e2e (chromium, report upload on failure) and build (`npm run build` + `npm run test:build`). Never pushed.
- Verification: `npx astro check` 0 errors/warnings/hints; `npm run lint` 0 errors, 0 warnings; `PORT=4322 npx playwright test` 213 passed, 21 skipped (build specs, no BUILD_DIR, reason reported); `npm run test:build` 21 passed; `npm run test:i18n` 24 passed. Two scratch builds (T3b, T4); no build into `./dist`.
- Known gaps for T7: remove Next and legacy deps (next, react, react-dom, @types/react*, radix, spline, tsparticles, framer-motion, i18next, react-i18next, lucide-react, next-themes, react-countup, react-type-animation, svg-dotted-map, tailwindcss-animate, class-variance-authority, clsx, tailwind-merge, autoprefixer, postcss; check satori's optional react types), delete `app/ components/ lib/ utils/ data.tsx` and legacy configs (next.config.mjs, tailwind.config.ts, postcss.config.mjs, components.json) then drop the matching `tsconfig` excludes, ESLint ignores and the `css.postcss` override in `astro.config.mjs`; `netlify.toml` with build command and `/en/* -> /en/404.html` (status 404); final Lighthouse metrics; `README.md`/`docs/` refresh; consider `engines.node` in package.json.

## Next step

T7 (cleanup, `netlify.toml`, final metrics and report).
