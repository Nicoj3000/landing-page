import { expect, test } from "@playwright/test";
import { LANGS, ROUTES } from "./routes";

const MAIL = "mailto:nicoj3000its@gmail.com";

test.describe("site shell", () => {
  for (const route of ROUTES) {
    for (const lang of LANGS) {
      const path = route[lang];

      test(`${lang} ${path}: landmarks, one h1, nav links, footer contacts`, async ({ page }) => {
        await page.goto(path);
        await expect(page.getByRole("banner")).toHaveCount(1);
        await expect(page.getByRole("main")).toHaveCount(1);
        await expect(page.getByRole("contentinfo")).toHaveCount(1);
        await expect(page.locator("h1")).toHaveCount(1);
        await expect(page.locator("h1")).not.toBeEmpty();

        const nav = page.getByRole("navigation", { name: lang === "es" ? "Navegación principal" : "Main navigation" });
        await expect(nav.getByRole("link")).toHaveCount(4);
        await expect(nav.locator('a[aria-current="page"]')).toHaveCount(1);
        await expect(nav.locator('a[aria-current="page"]')).toHaveAttribute("href", path);

        const footer = page.getByRole("contentinfo");
        await expect(footer.locator(`a[href^="${MAIL}"]`)).not.toHaveCount(0);
        await expect(footer.locator('a[href="https://github.com/Nicoj3000"]')).toHaveCount(1);
        await expect(
          footer.locator('a[href="https://www.linkedin.com/in/nicolas-delgado-6b22372b7/"]'),
        ).toHaveCount(1);
        await expect(footer.locator(`a[href="/hoja-de-vida-${lang}.pdf"]`)).toHaveCount(1);
      });

      test(`${lang} ${path}: language switch links to the same page in the other locale`, async ({
        page,
      }) => {
        await page.goto(path);
        const other = lang === "es" ? "en" : "es";
        const target = route[other];
        const link = page.locator(`header a[hreflang="${other}"]`);
        await expect(link).toHaveAttribute("href", target);
        await expect(page.locator(`header a[hreflang="${lang}"]`)).toHaveAttribute("aria-current", "true");
        await link.click();
        await expect(page).toHaveURL(new RegExp(`${target === "/" ? "/$" : `${target}$`}`));
        await expect(page.locator("html")).toHaveAttribute("lang", other);
      });
    }
  }

  test("external links open safely and announce it", async ({ page }) => {
    await page.goto("/");
    const external = page.locator('footer a[href^="https://"]');
    await expect(external).toHaveCount(2);
    for (const link of await external.all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("aria-label", /\(se abre en una pestaña nueva\)/);
    }
  });

  test("skip link is the first tab stop and focus rings are visible", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.locator("a.skip-link");
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    const outline = await page.evaluate(() => {
      const style = getComputedStyle(document.activeElement as Element);
      return { width: style.outlineWidth, style: style.outlineStyle };
    });
    expect(outline.style).not.toBe("none");
    expect(parseFloat(outline.width)).toBeGreaterThanOrEqual(2);
  });

  test("the dock nav is a bottom bar on mobile and a top pill on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Navegación principal" });
    const mobile = await nav.boundingBox();
    expect(mobile && mobile.y > 600).toBe(true);
    await page.setViewportSize({ width: 1280, height: 800 });
    const desktop = await nav.boundingBox();
    expect(desktop && desktop.y < 100).toBe(true);
  });

  test("the logo and header carry view-transition names", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header [data-astro-transition-scope]")).not.toHaveCount(0);
  });
});
