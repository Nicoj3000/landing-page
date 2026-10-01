import { expect, test, type Page } from "@playwright/test";

const toggle = (page: Page) => page.locator("[data-theme-toggle]");
const stored = (page: Page) => page.evaluate(() => localStorage.getItem("theme"));
/** The theme is applied on the frame after the click (view transition callback), so wait for it. */
const expectPref = async (page: Page, value: string) => {
  await expect(page.locator("html")).toHaveAttribute("data-theme-pref", value);
  expect(await stored(page)).toBe(value);
};

test.describe("theme toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
  });

  test("is a named button; its label announces the current state", async ({ page }) => {
    await page.goto("/");
    await expect(toggle(page)).toHaveRole("button");
    await expect(toggle(page)).toHaveAccessibleName(/Cambiar tema.*sistema/i);
    await toggle(page).click();
    await expect(toggle(page)).toHaveAccessibleName(/Cambiar tema.*claro/i);
  });

  test("English label in the English site", async ({ page }) => {
    await page.goto("/en");
    await expect(toggle(page)).toHaveAccessibleName(/Change theme.*system/i);
  });

  test("cycles system -> light -> dark -> system and persists each step", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme-pref", "system");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await toggle(page).click();
    await expectPref(page, "light");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await toggle(page).click();
    await expectPref(page, "dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await toggle(page).click();
    await expectPref(page, "system");
  });

  test("the chosen theme survives a reload", async ({ page }) => {
    await page.goto("/");
    await toggle(page).click(); // light
    await expectPref(page, "light");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("html")).toHaveAttribute("data-theme-pref", "light");
  });

  test("it survives View Transitions navigation and keeps working afterwards", async ({ page }) => {
    await page.goto("/");
    await toggle(page).click(); // light
    await expectPref(page, "light");
    await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Sobre mí" }).click();
    await expect(page).toHaveURL(/\/about-me$/);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(toggle(page)).toHaveAccessibleName(/claro/i);
    await toggle(page).click(); // dark
    await expectPref(page, "dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("rapid clicks chain through the cycle without skipping a state", async ({ page }) => {
    await page.goto("/");
    await toggle(page).click();
    await toggle(page).click();
    await expectPref(page, "dark");
  });

  test("animates with a view transition when motion is allowed", async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as unknown as { __vt: number };
      w.__vt = 0;
      const original = document.startViewTransition?.bind(document);
      if (original) {
        document.startViewTransition = ((cb: () => void) => {
          w.__vt += 1;
          return original(cb);
        }) as typeof document.startViewTransition;
      }
    });
    await page.goto("/");
    test.skip(!(await page.evaluate(() => "startViewTransition" in document)), "no View Transitions support");
    await toggle(page).click();
    await expectPref(page, "light");
    expect(await page.evaluate(() => (window as unknown as { __vt: number }).__vt)).toBe(1);
    // The helper attribute is removed once the transition finishes.
    await expect(page.locator("html")).not.toHaveAttribute("data-theme-vt", /.*/);
  });

  test("changes instantly, without a view transition, under reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce", colorScheme: "dark" });
    const page = await context.newPage();
    await page.addInitScript(() => {
      const w = window as unknown as { __vt: number };
      w.__vt = 0;
      const original = document.startViewTransition?.bind(document);
      if (original) {
        document.startViewTransition = ((cb: () => void) => {
          w.__vt += 1;
          return original(cb);
        }) as typeof document.startViewTransition;
      }
    });
    await page.goto("/");
    await toggle(page).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(await page.evaluate(() => (window as unknown as { __vt: number }).__vt)).toBe(0);
    await context.close();
  });
});
