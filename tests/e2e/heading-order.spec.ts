import { expect, test } from "@playwright/test";
import { LANGS, ROUTES } from "./routes";

// Headings must never skip a level (h1 -> h3) so screen-reader outlines stay coherent.
for (const route of ROUTES) {
  for (const lang of LANGS) {
    test(`heading levels do not skip on ${route.name} (${lang})`, async ({ page }) => {
      await page.goto(route[lang]);
      const levels = await page
        .locator("main :is(h1, h2, h3, h4, h5, h6)")
        .evaluateAll((nodes) => nodes.map((node) => Number(node.tagName.slice(1))));

      expect(levels[0]).toBe(1);
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i] - levels[i - 1], `jump to h${levels[i]} after h${levels[i - 1]}`).toBeLessThanOrEqual(1);
      }
    });
  }
}
