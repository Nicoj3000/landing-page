# Feature: Mobile navigation performance

- **Branch:** `perf/mobile-navigation`
- **Status:** implementation complete; pending user decision on delivery (push + PR + deploy-preview Lighthouse)
- **TDD:** strict, enabled (source: user global CLAUDE.md "Strict TDD Mode: enabled"); runner: Playwright (`npx playwright test`, dev server via `webServer`) + `astro check` + `npm run lint`
- **Delivery strategy:** `ask-on-risk`; forecast ~250–350 authored changed lines → single PR to `main`
- **Build policy:** never build after each change (user rule); `npm run build` only for the final metrics task (T6)

## Objective

Make navigation on mobile feel instant and remove avoidable main-thread and paint cost, while keeping the visual design, accessibility (100) and i18n behavior.

## Problem / Why

Baseline, Lighthouse mobile against production (2026-10-03):

| Page | Perf | FCP | LCP | TBT | Speed Index |
|---|---|---|---|---|---|
| `/` | 90 | 1.4 s | 2.3 s | 300 ms | 4.1 s |
| `/about-me` | 98 | 1.3 s | 2.2 s | 0 ms | 2.8 s |

- `<ClientRouter />` (`src/layouts/BaseLayout.astro`) is the most expensive script on home (~633 ms bootup on mobile).
- Prefetch defaults to the `hover` strategy under ClientRouter, so on touch devices the next page is only fetched on tap.
- Every navigation runs ~700 ms of page choreography (`vt-page-out` 220 ms + `vt-page-in` 480 ms, `src/styles/global.css`).
- Paint costs on mobile: `backdrop-blur-md` on the fixed dock (`src/components/DockNav.astro`), hero dot-field canvas drawn right after each navigation to home (`src/scripts/hero-field.ts`), infinite `box-shadow` pulse on `.status-dot`.

## Decision (user, 2026-10-03)

Option A: remove `<ClientRouter />` and use native cross-document View Transitions (`@view-transition { navigation: auto; }`) with zero JS. Accepted tradeoffs: no page animation in browsers without cross-document VT (e.g. Firefox navigates normally); the header is no longer DOM-persisted between pages (still visually matched via `view-transition-name`).

## Scope / Constraints

- Static output on Netlify stays; no new dependencies.
- Keep `transition:name` / view-transition names for header, logo and page.
- Keep `prefers-reduced-motion` behavior (no animations).
- Keep theme no-flash behavior and the theme toggle circle reveal (same-document `startViewTransition`).
- Keep the script size budgets (`tests/unit/script-budget.spec.ts`).
- WCAG 2.2 AA, 360px layout, ES/EN parity.

## Tasks

- [x] T1 — Replace ClientRouter with native cross-document View Transitions; migrate `astro:page-load` / `astro:after-swap` / `astro:before-swap` listeners to native lifecycle (DOMContentLoaded / `pageshow` / `pagereveal`); enable prefetch with `prefetchAll` + `viewport` strategy; update tests that assert ClientRouter behavior. Route: delegated writer (2+ non-trivial files). Commit `28c74b1`.
  - RED: `tests/e2e/native-navigation.spec.ts` 3/5 failed on old code (router meta present, no `@view-transition`, no prefetch without hover).
  - GREEN: native-navigation 5/5; full Playwright 238 passed / 21 skipped / 0 failed; lint clean. Parent spot check: 17/17 nav, theme, language specs.
  - `transition:name` still emits `view-transition-name` without ClientRouter (verified by spec + docs).
  - Review: assess `under_budget` (medium, 172 lines since `65f846e`), pending in slice.
- [x] T1b — Pre-existing `npm run check` failure on `main` (2 × TS2532 in `tests/e2e/heading-order.spec.ts:15`). Fixed with strict-safe iteration. Route: inline (one mechanical file). Commit `7ac1891`. Evidence: check 0 errors, heading-order 8/8, lint clean.
- [x] T2 — Shorten page transition choreography for snappy navigation (target ≤ 250 ms total), keep reduced-motion off. Route: delegated writer. Commit `23ce8fd`. RED: budget spec `Expected <= 250, Received 700` on both projects. GREEN: dedicated `--duration-page-out: 100ms` / `--duration-page-in: 150ms`, translate -4px/6px; full suite 442 passed / 21 skipped.
- [x] T3 — Mobile paint costs: no `backdrop-blur` below `lg` (opaque surface instead); skip hero dot field on `(pointer: coarse)`; `.status-dot` pulse via `transform`/`opacity` instead of `box-shadow`. Route: delegated writer. Commit `c6c006a`. RED: 3/4 `tests/e2e/mobile-paint.spec.ts` failing per project (blur(12px), canvas data-ready, boxShadow keyframes). GREEN: 447 passed / 24 skipped (3 desktop-only canvas specs skipped on mobile with reason).
- [x] T4 — LCP: `fetchpriority="high"` on the above-the-fold portrait. Route: inline (one mechanical file). Premise verified: Lighthouse LCP element is the portrait on home and about-me. Commit `35437d0`. RED: `tests/e2e/lcp-image.spec.ts` `Expected "high", Received ""`; GREEN 8/8 (re-confirmed RED by stashing the fix).
- [x] T5 — Add a mobile Playwright project (e.g. Pixel 7) so nav/layout specs run under mobile emulation. Route: delegated writer. Commit `ba1fd4e`. `mobile-chrome` (Pixel 7) project, e2e only; 440 passed / 21 skipped.
- [x] T1c — Review follow-ups (approved native review of the plan+T1+T1b slice, lineage review-77830a15447a43bd): bfcache theme spec + network-based prefetch assertion. Route: delegated writer. Commit `486fb01`. Note: headless Chromium does not restore from bfcache, so the `pageshow`/`persisted` branch itself stays untested (spec covers the fresh-load path).
- [~] T6 — Final metrics: lint, check, full Playwright, build, Lighthouse mobile on the Netlify deploy preview vs baseline. Route: inline bounded action. Local part done; deploy-preview part pending (needs push, user decision).
  - lint ok; check 0 errors; e2e 459 passed / 24 skipped / 0 failed (desktop + mobile); test:build 25/25; build 12 pages.
  - Shipped JS: one 4 KB external module (`page.*.js`); no ClientRouter in `dist` (baseline shipped a 16 KB ClientRouter bundle).
  - Lighthouse mobile, local `astro preview`, median of 3, baseline `65f846e` vs branch: home perf 99/99, LCP 2255/2254 ms, TBT 0/0; about-me perf 98/98, LCP 2404/2406 ms. Home main-thread script bootup 820 → 253 ms.
  - Honest reading: page-load metrics were already near the ceiling locally; the production TBT of 300 ms did not reproduce locally (likely network/CPU variance). The user-facing win is navigation: no router JS, prefetch without hover on touch, 700 → 250 ms page transition, no blur/canvas/box-shadow repaint on mobile. Lighthouse does not measure page-to-page navigation.
  - Remaining LCP cost is element render delay (~650-760 ms) on the portrait; candidate follow-up.

## Acceptance criteria

- No ClientRouter script shipped; navigation between pages works with plain document loads and animates via native VT where supported.
- Internal links are prefetched without a hover (viewport strategy).
- Home Lighthouse mobile TBT < 100 ms and Performance ≥ 95 on the deploy preview; accessibility stays 100.
- All existing Playwright specs (updated where they asserted ClientRouter internals) pass on desktop and mobile projects.

## Applicable checks

`npm run lint`, `npm run check`, `npx playwright test`, `npm run test:build` (T6), Lighthouse mobile (T6).

## Progress

- 2026-10-03: exploration + baseline done; option A chosen; document created.
- 2026-10-03: T1 and T1b done; native review approved (plan+T1+T1b). Execution order for the rest: T5 (mobile project first, so T2/T3 are tested on mobile), T2, T3, then T4 inline, then T6.

- 2026-10-03: T5, T2, T3, T1c, T4 done; T6 local metrics done. Slice since `4c11a1b` assessed `under_budget` (medium, 209 lines), pending.

## Next step

User decision: push branch + open PR to get the Netlify deploy preview, run Lighthouse there, then merge. Optional follow-up: portrait render delay.
