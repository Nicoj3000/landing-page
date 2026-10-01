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
- [ ] T1 — Astro scaffold: Astro 7 + strict TS + Tailwind 4 tokens, base layout, no-flash theme, i18n routing + hreflang, fonts. Route: delegated writer (2+ non-trivial files).
- [ ] T2 — Content collections with Zod (projects, services, timeline, skills) + UI dictionaries migrated from `utils/i18n.ts` with key-parity test. Route: delegated writer.
- [ ] T3 — Redesigned pages: home (hero), about-me (timeline/skills/counters), services, portfolio, 404, error. Route: delegated writer.
- [ ] T4 — SEO: metadata, canonical, OG/Twitter via satori at build, sitemap, robots, manifest, favicon/apple-icon, JSON-LD Person. Route: delegated writer.
- [ ] T5 — Islands & interactions: theme toggler (View Transitions), language switcher, counters, hero field, scroll animations, reduced motion. Route: delegated writer.
- [ ] T6 — Playwright e2e per route, theme, language, axe a11y; update `ci.yml` (local only). Route: delegated writer.
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

## Next step

T1 scaffold.
