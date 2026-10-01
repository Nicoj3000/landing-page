import { expect, test } from "@playwright/test";
import { LANGS } from "./routes";

const HOME = { es: "/", en: "/en" } as const;
const LEAD = { es: "Si puedes pensarlo,", en: "If you can think it," } as const;
const FIRST_ROLE = { es: "puedes programarlo", en: "you can program it" } as const;

for (const lang of LANGS) {
  test.describe(`home (${lang})`, () => {
    test("headline text is the h1 and rotates through the four roles", async ({ page }) => {
      await page.goto(HOME[lang]);
      const h1 = page.locator("h1");
      await expect(h1).toContainText(LEAD[lang]);
      await expect(h1.locator("[data-role]")).toHaveCount(4);
      await expect(h1.locator("[data-role]").first()).toHaveText(FIRST_ROLE[lang]);
      // Rotation is pure CSS: every role carries a running animation.
      const names = await h1
        .locator("[data-role]")
        .evaluateAll((els) => els.map((el) => getComputedStyle(el).animationName));
      expect(names.every((name) => name !== "none")).toBe(true);
    });

    test("reduced motion shows only the first role, statically", async ({ browser }) => {
      const context = await browser.newContext({ reducedMotion: "reduce" });
      const page = await context.newPage();
      await page.goto(HOME[lang]);
      const roles = page.locator("h1 [data-role]");
      await expect(roles.first()).toBeVisible();
      await expect(roles.nth(1)).toBeHidden();
      await expect(roles.nth(3)).toBeHidden();
      expect(await roles.first().evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
      await context.close();
    });

    test("without JavaScript the headline is static", async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(HOME[lang]);
      await expect(page.locator("h1 [data-role]").first()).toBeVisible();
      await expect(page.locator("h1 [data-role]").nth(2)).toBeHidden();
      await context.close();
    });

    test("CTAs: CV for this locale, mail and portfolio", async ({ page, request }) => {
      await page.goto(HOME[lang]);
      const hero = page.locator("[data-hero]");
      const cv = hero.locator(`a[href="/hoja-de-vida-${lang}.pdf"]`);
      await expect(cv).toHaveCount(1);
      await expect(cv).toHaveAttribute("download", "");
      expect((await request.get(`/hoja-de-vida-${lang}.pdf`)).status()).toBe(200);
      await expect(hero.locator('a[href^="mailto:nicoj3000its@gmail.com"]')).toHaveCount(1);
      await expect(hero.locator(`a[href="${lang === "es" ? "/portfolio" : "/en/portfolio"}"]`)).toHaveCount(1);
    });

    test("portrait is an AVIF/WebP picture with dimensions and alt", async ({ page }) => {
      await page.goto(HOME[lang]);
      const picture = page.locator("[data-hero] picture");
      await expect(picture.locator('source[type="image/avif"]')).toHaveCount(1);
      await expect(picture.locator('source[type="image/webp"]')).toHaveCount(1);
      const img = picture.locator("img");
      await expect(img).toHaveAttribute("alt", lang === "es" ? "Foto de perfil" : "Profile picture");
      await expect(img).toHaveAttribute("width", /\d+/);
      await expect(img).toHaveAttribute("height", /\d+/);
      await expect(img).toHaveAttribute("sizes", /.+/);
    });

    test("hero carries a decorative dot field canvas", async ({ page }) => {
      await page.goto(HOME[lang]);
      const canvas = page.locator("[data-hero] canvas[data-dot-field]");
      await expect(canvas).toHaveCount(1);
      await expect(canvas).toHaveAttribute("aria-hidden", "true");
    });

    test("counter strip renders the four collection values in the HTML", async ({ page, request }) => {
      const html = await (await request.get(HOME[lang])).text();
      for (const value of [4, 2, 10, 8]) {
        expect(html).toMatch(new RegExp(`data-counter-to="${value}"[^>]*>\\s*${value}\\s*<`));
      }
      await page.goto(HOME[lang]);
      await expect(page.locator("[data-counter]")).toHaveCount(4);
    });

    test("featured projects teaser links into the portfolio", async ({ page }) => {
      await page.goto(HOME[lang]);
      const rows = page.locator("[data-featured] a");
      await expect(rows.first()).toHaveAttribute("href", new RegExp(`${lang === "es" ? "" : "/en"}/portfolio#`));
      expect(await rows.count()).toBeGreaterThanOrEqual(3);
    });
  });
}
