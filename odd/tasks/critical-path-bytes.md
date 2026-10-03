# Feature: Critical-path bytes (fonts + CSS)

- **Branch:** `perf/critical-path`
- **Status:** implementation complete; T1 reverted on evidence; pending user decision on delivery
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

Revised (user, 2026-10-03, after T3 evidence): revert T1, keep only T2.

## Scope / Constraints

- No visual change: same family, weights 400/600/700 render as before; no layout shift (Astro fonts API fallbacks stay).
- Static output on Netlify; no new dependencies.
- Keep a11y 100, ES/EN parity, existing tests and script budgets.

## Tasks

- [x] T1 — REVERTED. Display font: limit Bricolage Grotesque to the weights in use and minimize the preloaded bytes on the critical path. Route: delegated writer. Commit `7399746`, reverted in `fdd46ed`.
  - Measured: variable `400 700` = same 132 KB file (no gain); static 400/600/700 + preload 600 = 22 KB each, preloaded font bytes 161 KB → 51 KB.
  - Why reverted: static instances lose Bricolage's optical-size axis; on mobile the hero h1 grew from 129 px to 171 px (3 → 4 lines; screenshots compared base vs branch). Real-trace LCP did not improve (see T3) and CLS rose slightly (0.029 → 0.034). Violates the no-visual-change constraint for no measurable gain.
- [x] T2 — Inline the stylesheet (`build.inlineStylesheets: "always"`; default `"auto"` only inlines < 4 KB and the CSS is ~7 KB). Tradeoff: CSS not cached across pages, fine for 4 pages. Route: delegated writer. Commit `57ab638`.
  - RED: `tests/build/inline-styles.spec.ts` 8/8 failing on the external `/_astro/` stylesheet link.
- [x] T2b — Native review WARNING (lineage review-b932ddd98b76a19a, approved): the positive check only required any `<style>`, which the font blocks always satisfy. The spec now asserts global-only rules (`:where(h1,h2,h3,h4){`, `@view-transition{navigation:auto}`) and detects stylesheet links in any attribute order. Mutation: with `inlineStylesheets: "auto"` and the link assertion disabled, the positive check alone fails 8/8. GREEN: test:build 33/33, e2e 465 passed / 32 skipped / 0 failed, lint ok, check 0. The two other review suggestions targeted T1 and are moot after the revert. Route: inline. Commit `2d58906`.
- [x] T3 — Measure (local part). Route: inline bounded action. Deploy-preview confirmation pending delivery.
  - Lighthouse mobile, `--throttling-method=devtools`, median of 3, local static builds served with `serve`:

    | Variant | Perf | FCP | LCP | CLS |
    |---|---|---|---|---|
    | `main` | 99 | 1550 ms | 1554 ms | 0.029 |
    | T2 only (kept) | 100 | 886 ms | 1522 ms | 0.029 |
    | T1 + T2 | 95 | 883 ms | 1539 ms | 0.034 |

  - Conclusion: the whole gain comes from inlining CSS (FCP −43%); the font change added nothing measurable.

## Acceptance criteria

- ~~Preloaded font bytes on the critical path drop ≥ 50%~~ — dropped with T1 (no measured LCP benefit, visual regression).
- No external render-blocking stylesheet on the pages. ✅
- Real-trace LCP on home does not regress; CLS does not get worse; a11y stays 100. ✅ (LCP 1554 → 1522 ms, CLS 0.029 = 0.029)
- All checks pass: lint, check, e2e (desktop + mobile), test:build. ✅

## Progress

- 2026-10-03: exploration and real-trace measurement done; user approved both optimizations; document created.
- 2026-10-03: T1 measured, reverted with user approval; T2 kept and its spec hardened (T2b); local T3 done.

## Next step

User decision: push + PR, then confirm on the Netlify deploy preview (block `/.netlify/scripts/*`).
