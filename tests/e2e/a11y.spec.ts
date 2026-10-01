import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { LANGS, ROUTES, STATUS_ROUTES } from "./routes";

/**
 * WCAG 2.2 AA scan of every page, both locales, both themes. Contrast is NOT
 * disabled. `.reveal` blocks start at opacity 0 and fade in on scroll, which
 * would make axe measure a half-transparent colour, so scans run with
 * `reducedMotion: "reduce"` (content fully visible, which is the intended
 * reduced-motion behaviour, asserted in interactions.spec.ts).
 */
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const THEMES = ["light", "dark"] as const;

const PAGES = [
  ...ROUTES.flatMap((route) => LANGS.map((lang) => ({ label: `${route.name} (${lang})`, path: route[lang] }))),
  ...STATUS_ROUTES.map((path) => ({ label: `status ${path}`, path })),
];

test.describe("axe: WCAG 2.2 AA", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  for (const theme of THEMES) {
    test.describe(`${theme} theme`, () => {
      test.use({ colorScheme: theme });

      for (const { label, path } of PAGES) {
        test(`${label} has no violations`, async ({ page }) => {
          await page.goto(path);
          await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
          // Guard: the scan is only meaningful with reveals fully visible.
          expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
          const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
          const summary = results.violations.map((v) => ({
            rule: v.id,
            impact: v.impact,
            nodes: v.nodes.slice(0, 4).map((n) => ({ target: n.target, summary: n.failureSummary?.split("\n").slice(0, 3).join(" ") })),
          }));
          expect(summary).toEqual([]);
        });
      }
    });
  }
});
