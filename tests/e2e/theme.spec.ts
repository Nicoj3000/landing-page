import { expect, test } from "@playwright/test";

// The inline head script must resolve the theme synchronously, before the
// first paint. We record the attribute at DOMContentLoaded, which fires only
// after every synchronous head script has run.
const recordThemeAtParse = () => {
  document.addEventListener("DOMContentLoaded", () => {
    (window as unknown as { __themeAtParse: string | null }).__themeAtParse =
      document.documentElement.getAttribute("data-theme");
  });
};

const themeAtParse = (page: import("@playwright/test").Page) =>
  page.evaluate(
    () => (window as unknown as { __themeAtParse: string | null }).__themeAtParse,
  );

test.describe("no-flash theme", () => {
  test("system preference dark resolves to dark before paint", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.addInitScript(recordThemeAtParse);
    await page.goto("/");
    expect(await themeAtParse(page)).toBe("dark");
  });

  test("system preference light resolves to light before paint", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.addInitScript(recordThemeAtParse);
    await page.goto("/");
    expect(await themeAtParse(page)).toBe("light");
  });

  test("stored preference overrides the system scheme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.addInitScript(recordThemeAtParse);
    await page.goto("/");
    expect(await themeAtParse(page)).toBe("light");
  });

  test("theme survives a View Transitions navigation", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.goto("/");
    await page.locator('nav[aria-label] a[href="/about-me"]').first().click();
    await expect(page).toHaveURL(/\/about-me$/);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});
