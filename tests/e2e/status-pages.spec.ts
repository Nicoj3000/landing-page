import { expect, test } from "@playwright/test";

test.describe("404 pages", () => {
  test("unknown URL answers 404 with the Spanish page", async ({ page }) => {
    const response = await page.goto("/definitely-not-a-page");
    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("h1")).toHaveText("Página no encontrada");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.locator('main a[href="/"]')).toHaveCount(1);
  });

  test("/en/404 is the English page (Netlify serves it for /en/* misses)", async ({ page }) => {
    await page.goto("/en/404");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("h1")).toHaveText("Page not found");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
    await expect(page.locator('main a[href="/en"]')).toHaveCount(1);
    await expect(page.locator('main a[href="/en/portfolio"]')).toHaveCount(1);
  });

  test("the code numeral is decorative", async ({ page }) => {
    await page.goto("/en/404");
    await expect(page.locator("main [data-status-code]")).toHaveAttribute("aria-hidden", "true");
  });
});

test.describe("static error pages", () => {
  const cases = [
    { path: "/error", lang: "es", h1: "Algo salió mal", home: "/" },
    { path: "/en/error", lang: "en", h1: "Something went wrong", home: "/en" },
  ] as const;

  for (const c of cases) {
    test(`${c.path} renders ${c.lang}, noindex, with a way out`, async ({ page }) => {
      const response = await page.goto(c.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", c.lang);
      await expect(page.locator("h1")).toHaveText(c.h1);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
      await expect(page.locator(`main a[href="${c.home}"]`)).toHaveCount(1);
    });
  }
});
