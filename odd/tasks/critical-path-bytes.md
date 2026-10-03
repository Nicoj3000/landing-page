# Feature: Critical-path bytes (fonts + CSS)

- **Branch:** `perf/critical-path`
- **Status:** in progress
- **TDD:** strict, enabled (source: user global CLAUDE.md "Strict TDD Mode: enabled"); runner: Playwright (`npx playwright test`, plus `npm run test:build` for build-output specs) + `astro check` + `npm run lint`
- **Delivery strategy:** `ask-on-risk`; forecast < 200 authored changed lines → single PR to `main`
- **Build policy:** builds only where a build-output spec or the final measurement needs them (user rule: never build after each change)

## Objective

Cut the bytes that compete with the LCP portrait on the critical path, measured with a real browser trace (not Lighthouse simulation).

## Problem / Why

Lighthouse mobile on production, median of 3 (2026-10-03):

| Mode | Render delay | Load delay | Load duration | LCP |
|---|---|---|---|---|
| simulate | 752 ms | 52 ms | 339 ms | 2.11 s |
| devtools (real trace) | 16 ms | 493 ms | 856 ms | 1.72 s |

- The ~700 ms "render delay" proposed earlier is a Lighthouse simulation artifact; in a real trace it is 16 ms. Corrected with the user.
- Real cost: the portrait (14 KB AVIF) downloads in parallel with two preloaded High-priority fonts, including Bricolage Grotesque at 128 KB (variable weight 200–800), and a 7 KB render-blocking stylesheet.
- Display font weights actually used: 400 (one `font-normal` heading), 600 (`font-semibold`: hero h1, page h1s, counters, footer, projects), 700 (`font-bold` logo/status code + default weight of `h2`–`h4` via `:where(h1, h2, h3, h4)` in `global.css`).

## Decision (user, 2026-10-03)

Do both: (1) shrink the display font to the weights in use, (2) inline the stylesheet into the HTML.

## Scope / Constraints

- No visual change: same family, weights 400/600/700 render as before; no layout shift (Astro fonts API fallbacks stay).
- Static output on Netlify; no new dependencies.
- Keep a11y 100, ES/EN parity, existing tests and script budgets.

## Tasks

- [ ] T1 — Display font: limit Bricolage Grotesque to the weights in use and minimize the preloaded bytes on the critical path (variable 400–700 vs static weights; preload only what the hero needs). Measure file sizes before deciding. Route: delegated writer.
- [ ] T2 — Inline the stylesheet (`build.inlineStylesheets`) so first render needs no extra round trip. Route: delegated writer (same as T1).
- [ ] T3 — Measure: Lighthouse mobile with `--throttling-method=devtools`, median of 3, local preview baseline (`main`) vs branch; then on the deploy preview with `/.netlify/scripts/*` blocked. Route: inline bounded action.

## Acceptance criteria

- Preloaded font bytes on the critical path drop substantially (target ≥ 50% less than 128 KB + 28 KB).
- No external render-blocking stylesheet on the pages.
- Real-trace LCP on home does not regress and should improve; CLS stays 0; a11y stays 100.
- All checks pass: lint, check, e2e (desktop + mobile), test:build.

## Progress

- 2026-10-03: exploration and real-trace measurement done; user approved both optimizations; document created.

## Next step

T1 + T2 by one delegated writer, one commit per task.
