import { expect, test } from "@playwright/test";
import { LANGS, ROUTES, STATUS_ROUTES } from "./routes";

// Mobile-first contract: nothing may overflow horizontally at 360px.
test.describe("no horizontal scroll at 360px", () => {
  test.use({ viewport: { width: 360, height: 780 } });

  for (const route of ROUTES) {
    for (const lang of LANGS) {
      test(`${lang} ${route[lang]}`, async ({ page }) => {
        await page.goto(route[lang]);
        await page.waitForLoadState("load");
        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
      });
    }
  }

  for (const path of STATUS_ROUTES) {
    test(`status page ${path}`, async ({ page }) => {
      await page.goto(path);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });
  }
});
