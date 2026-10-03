import { expect, test, type Locator, type Page } from "@playwright/test";

const focusedOutline = (locator: Locator) =>
  locator.evaluate((el) => {
    const style = getComputedStyle(el);
    return { width: parseFloat(style.outlineWidth), style: style.outlineStyle };
  });

/** Tabs until `target` is focused (bounded), so a reordered page fails loudly. */
async function tabTo(page: Page, target: Locator, limit = 25): Promise<void> {
  for (let i = 0; i < limit; i += 1) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((el) => el === document.activeElement)) return;
  }
  throw new Error(`target not reached with ${limit} Tab presses`);
}

test.describe("keyboard navigation", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("first Tab lands on the skip link, Enter moves focus into main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.locator("a.skip-link");
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    expect((await focusedOutline(skip)).width + (await skip.evaluate((el) => parseFloat(getComputedStyle(el).borderTopWidth)))).toBeGreaterThan(0);

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
    const insideMain = await page.evaluate(() => {
      const active = document.activeElement;
      const main = document.querySelector("main#main");
      return active === main || !!main?.contains(active);
    });
    expect(insideMain).toBe(true);
  });

  test("nav links, theme toggle and language links are reachable with a visible focus ring", async ({ page }) => {
    await page.goto("/");
    const controls = [
      page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Sobre mí" }),
      page.getByRole("banner").locator('a[hreflang="en"]'),
      page.getByRole("banner").locator("[data-theme-toggle]"),
    ];
    for (const control of controls) {
      await tabTo(page, control);
      await expect(control).toBeFocused();
      const outline = await focusedOutline(control);
      expect(outline.style).not.toBe("none");
      expect(outline.width).toBeGreaterThan(0);
    }
  });

  test("the theme toggle works from the keyboard", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    const toggle = page.getByRole("banner").locator("[data-theme-toggle]");
    await tabTo(page, toggle);
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-theme-pref", "light");
    await page.keyboard.press("Space");
    await expect(page.locator("html")).toHaveAttribute("data-theme-pref", "dark");
  });
});
