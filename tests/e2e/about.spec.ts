import { expect, test } from "@playwright/test";
import { LANGS } from "./routes";

const ABOUT = { es: "/about-me", en: "/en/about-me" } as const;
const TITLE = { es: /Toda mi\s+carrera profesional/, en: /My entire\s+professional career/ } as const;
const FIRST_ENTRY = { es: "Director de TI", en: "IT Director" } as const;

for (const lang of LANGS) {
  test.describe(`about (${lang})`, () => {
    test("title, intro and AVIF/WebP portrait with alt", async ({ page }) => {
      await page.goto(ABOUT[lang]);
      await expect(page.locator("h1")).toHaveText(TITLE[lang]);
      const picture = page.locator("main picture").first();
      await expect(picture.locator('source[type="image/avif"]')).toHaveCount(1);
      await expect(picture.locator("img")).toHaveAttribute("alt", /.+/);
    });

    test("counters from the collection", async ({ page }) => {
      await page.goto(ABOUT[lang]);
      await expect(page.locator("main [data-counter]")).toHaveCount(4);
    });

    test("timeline reads like git log: hash, date, localized content, in order", async ({ page }) => {
      await page.goto(ABOUT[lang]);
      const items = page.locator("[data-timeline] > li");
      await expect(items).toHaveCount(4);
      await expect(items.first()).toContainText(FIRST_ENTRY[lang]);
      for (const item of await items.all()) {
        await expect(item.locator("[data-commit]")).toHaveText(/^[0-9a-f]{7}$/);
        await expect(item.locator("time")).not.toBeEmpty();
      }
      const hashes = await items.locator("[data-commit]").allTextContents();
      expect(new Set(hashes).size).toBe(4);
    });

    test("skills bento groups 27 icons by category; mono icons follow the theme", async ({ page }) => {
      await page.goto(ABOUT[lang]);
      const groups = page.locator("[data-skills] [data-category]");
      await expect(groups).toHaveCount(6);
      await expect(page.locator("[data-skill]")).toHaveCount(27);
      for (const skill of await page.locator("[data-skill]").all()) {
        await expect(skill.locator("svg")).toHaveCount(1);
        await expect(skill).not.toHaveText("");
      }
      await expect(page.locator('[data-skill="github"] svg')).toHaveAttribute("fill", "currentColor");
      await expect(page.locator('[data-skill="react"] svg')).not.toHaveAttribute("fill", "currentColor");
    });

    test("location block: static map with the three legacy markers and the cities", async ({ page }) => {
      await page.goto(ABOUT[lang]);
      const block = page.locator("[data-location]");
      await expect(block.locator("circle[data-marker]")).toHaveCount(3);
      await expect(block).toContainText("Bogotá");
      await expect(block).toContainText("Medellín");
      await expect(block).toContainText("Pereira");
      await expect(block.locator("svg").first()).toHaveAttribute("aria-hidden", "true");
    });
  });
}
