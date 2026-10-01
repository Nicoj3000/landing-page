import { expect, test } from "@playwright/test";

const SITE = "https://nicoj3000.netlify.app";

const ROUTES = [
  { es: "/", en: "/en" },
  { es: "/about-me", en: "/en/about-me" },
  { es: "/services", en: "/en/services" },
  { es: "/portfolio", en: "/en/portfolio" },
] as const;

test.describe("localized routing", () => {
  for (const route of ROUTES) {
    test(`es ${route.es} responds 200 with lang=es`, async ({ page }) => {
      const response = await page.goto(route.es);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
    });

    test(`en ${route.en} responds 200 with lang=en`, async ({ page }) => {
      const response = await page.goto(route.en);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
    });

    test(`hreflang + canonical on ${route.es}`, async ({ page }) => {
      await page.goto(route.es);
      const href = (rel: string, hreflang?: string) =>
        page
          .locator(
            hreflang
              ? `link[rel="${rel}"][hreflang="${hreflang}"]`
              : `link[rel="${rel}"]:not([hreflang])`,
          )
          .getAttribute("href");

      expect(await href("alternate", "es")).toBe(`${SITE}${route.es}`);
      expect(await href("alternate", "en")).toBe(`${SITE}${route.en}`);
      expect(await href("alternate", "x-default")).toBe(`${SITE}${route.es}`);
      expect(await href("canonical")).toBe(`${SITE}${route.es}`);
    });

    test(`canonical on ${route.en} points to itself`, async ({ page }) => {
      await page.goto(route.en);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${SITE}${route.en}`,
      );
    });
  }

  test("skip link targets the main landmark", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a.skip-link[href="#main"]')).toHaveCount(1);
    await expect(page.locator("main#main")).toHaveCount(1);
  });
});
