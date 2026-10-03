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
      levels.slice(1).forEach((level, i) => {
        const previous = levels[i] ?? 0;
        expect(level - previous, `jump to h${level} after h${previous}`).toBeLessThanOrEqual(1);
      });
    });
  }
}
