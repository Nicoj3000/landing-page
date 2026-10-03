import { devices, expect, test, type Page } from "@playwright/test";

// Paint-cost contract for touch devices: no backdrop blur on the dock, no hero
// canvas loop, and a compositor-only availability pulse.
test.describe("dock surface", () => {
  const dockList = (page: Page) =>
    page.getByRole("navigation", { name: "Navegación principal" }).locator("ul");

  test("is opaque (no backdrop blur) below lg", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/");
    const filter = await dockList(page).evaluate((el) => getComputedStyle(el).backdropFilter);
    expect(filter).toBe("none");
  });

  test("keeps the translucent blurred pill from lg up", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const filter = await dockList(page).evaluate((el) => getComputedStyle(el).backdropFilter);
    expect(filter).toContain("blur");
  });
});

test.describe("hero dot field on touch devices", () => {
  test("is not started and the canvas is not rendered (pointer: coarse)", async ({ browser }) => {
    const context = await browser.newContext({ ...devices["Pixel 7"] });
    const page = await context.newPage();
    await page.goto("/");
    expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
    const canvas = page.locator("canvas[data-dot-field]");
    // Positive signal that init ran and bailed out, instead of waiting a fixed time.
    await expect(canvas).toHaveAttribute("data-skipped", "coarse-pointer");
    await expect(canvas).not.toHaveAttribute("data-ready", /.*/);
    await expect(canvas).toBeHidden();
    await expect(page.locator(".hero-pattern")).toBeVisible();
    await context.close();
  });
});

test.describe("availability dot", () => {
  test("pulses with compositor-only properties (no box-shadow)", async ({ page }) => {
    await page.goto("/");
    const dot = page.locator("[data-hero] .status-dot");
    await expect
      .poll(() => dot.evaluate((el) => el.getAnimations({ subtree: true }).length))
      .toBeGreaterThan(0);
    const animated = await dot.evaluate((el) =>
      el
        .getAnimations({ subtree: true })
        .flatMap((a) => (a.effect as KeyframeEffect).getKeyframes().flatMap((k) => Object.keys(k)))
        .filter((p) => !["offset", "easing", "composite", "computedOffset"].includes(p)),
    );
    expect(animated.length).toBeGreaterThan(0);
    for (const prop of animated) expect(["transform", "opacity"]).toContain(prop);
  });
});
