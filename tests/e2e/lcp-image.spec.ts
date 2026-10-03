import { expect, test } from "@playwright/test";

// The portrait is the LCP element on the pages that show it (Lighthouse mobile).
for (const path of ["/", "/about-me", "/en", "/en/about-me"]) {
  test(`portrait on ${path} is fetched eagerly with high priority`, async ({ page }) => {
    await page.goto(path);
    const img = page.locator("figure.portrait img");
    await expect(img).toHaveAttribute("loading", "eager");
    await expect(img).toHaveAttribute("fetchpriority", "high");
  });
}
