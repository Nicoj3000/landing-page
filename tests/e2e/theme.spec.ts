import { expect, test, type Page } from "@playwright/test";

// The inline head script must resolve the theme synchronously, before the
// first paint. We record the attribute at DOMContentLoaded, which fires only
// after every synchronous head script has run.
const recordThemeAtParse = () => {
  document.addEventListener("DOMContentLoaded", () => {
    (window as unknown as { __themeAtParse: string | null }).__themeAtParse =
      document.documentElement.getAttribute("data-theme");
  });
};

const themeAtParse = (page: Page) =>
  page.evaluate(
    () => (window as unknown as { __themeAtParse: string | null }).__themeAtParse,
  );

test.describe("no-flash theme", () => {
  test("server html carries no theme default: only the inline script decides", async ({
    request,
  }) => {
    const html = await (await request.get("/")).text();
    const htmlTag = html.match(/<html[^>]*>/)?.[0] ?? "";
    expect(htmlTag).not.toContain("data-theme");
  });

  test("with JavaScript disabled the page falls back to the dark token set", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: "light" });
    const page = await context.newPage();
    await page.goto("/");
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    // #0a0c0f: the default (no data-theme) token set is dark.
    expect(bg).toBe("rgb(10, 12, 15)");
    await context.close();
  });

  test("system preference changes are followed live while the preference is system", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.emulateMedia({ colorScheme: "light" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("an explicit stored preference ignores system preference changes", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.goto("/");
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForTimeout(150);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

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
