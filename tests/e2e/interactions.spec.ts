import { expect, test, type Page } from "@playwright/test";

const FINAL = { 4: "4", 2: "2", 10: "10", 8: "8" } as const;

/** Records every text value a counter ever shows, from before the page scripts run. */
const recordCounter = (page: Page) =>
  page.addInitScript(() => {
    const w = window as unknown as { __seen: Record<string, string[]> };
    w.__seen = {};
    new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
        const key = el.dataset.counterTo ?? "";
        const list = (w.__seen[key] ??= []);
        const text = el.textContent?.trim() ?? "";
        if (list.at(-1) !== text) list.push(text);
      });
    }).observe(document, { subtree: true, childList: true, characterData: true });
  });

const seen = (page: Page, key: string) =>
  page.evaluate((k) => (window as unknown as { __seen: Record<string, string[]> }).__seen[k] ?? [], key);

test.describe("counters", () => {
  test("final values are in the HTML and stay when JavaScript is off", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    for (const [value, text] of Object.entries(FINAL)) {
      await expect(page.locator(`[data-counter-to="${value}"]`)).toHaveText(text);
    }
    await context.close();
  });

  test("count up from 0 to the final value once scrolled into view", async ({ page }) => {
    await recordCounter(page);
    await page.setViewportSize({ width: 1280, height: 500 });
    await page.goto("/about-me");
    const target = page.locator('[data-counter-to="10"]');
    await target.scrollIntoViewIfNeeded();
    await expect(target).toHaveText("10", { timeout: 5000 });
    // The first recorded value is the server-rendered number; the replay starts at 0.
    const all = (await seen(page, "10")).map(Number);
    const values = all.slice(all.indexOf(0));
    expect(values[0]).toBe(0);
    expect(values.at(-1)).toBe(10);
    expect(values.some((v) => v > 0 && v < 10)).toBe(true);
    expect([...values]).toEqual([...values].sort((a, b) => a - b));
  });

  test("reduced motion never shows an intermediate number", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await recordCounter(page);
    await page.goto("/about-me");
    await page.locator('[data-counter-to="10"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await expect(page.locator('[data-counter-to="10"]')).toHaveText("10");
    const values = await seen(page, "10");
    // Non-vacuous: the observer did record the counter, and only ever its final value.
    expect(values.length).toBeGreaterThan(0);
    expect(values.every((v) => v === "10")).toBe(true);
    await context.close();
  });
});

test.describe("hero dot field", () => {
  const canvas = (page: Page) => page.locator("canvas[data-dot-field]");

  test("loads lazily, draws, and reacts to the pointer", async ({ page, isMobile }) => {
    test.skip(isMobile, "the dot field is off on coarse pointers (see mobile-paint.spec.ts)");
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(canvas(page)).toHaveAttribute("data-ready", "true", { timeout: 5000 });
    const size = await canvas(page).evaluate((el: HTMLCanvasElement) => [el.width, el.height]);
    expect(size[0]).toBeGreaterThan(0);
    expect(size[1]).toBeGreaterThan(0);

    const before = await canvas(page).evaluate((el: HTMLCanvasElement) => el.toDataURL());
    await page.mouse.move(400, 300);
    await page.mouse.move(520, 340, { steps: 6 });
    await expect
      .poll(() => canvas(page).evaluate((el: HTMLCanvasElement) => el.toDataURL()))
      .not.toBe(before);
  });

  test("pauses while the hero is off-screen and resumes when it returns", async ({ page, isMobile }) => {
    test.skip(isMobile, "the dot field is off on coarse pointers (see mobile-paint.spec.ts)");
    await page.setViewportSize({ width: 1280, height: 700 });
    await page.goto("/");
    await expect(canvas(page)).toHaveAttribute("data-ready", "true", { timeout: 5000 });
    await expect(canvas(page)).toHaveAttribute("data-active", "true");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(canvas(page)).toHaveAttribute("data-active", "false");
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(canvas(page)).toHaveAttribute("data-active", "true");
  });

  test("is off under reduced motion: static CSS pattern only", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForTimeout(1200);
    await expect(canvas(page)).not.toHaveAttribute("data-ready", /.*/);
    await expect(page.locator(".hero-pattern")).toBeVisible();
    await context.close();
  });

  test("works after a View Transitions round trip", async ({ page, isMobile }) => {
    test.skip(isMobile, "the dot field is off on coarse pointers (see mobile-paint.spec.ts)");
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/about-me");
    await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Inicio" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(canvas(page)).toHaveAttribute("data-ready", "true", { timeout: 5000 });
  });

  test("never blocks the headline: the LCP element is the h1 text", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      const w = window as unknown as { __lcp: string };
      new PerformanceObserver((list) => {
        const last = list.getEntries().at(-1) as PerformanceEntry & { element?: Element };
        w.__lcp = last?.element ? `${last.element.tagName}:${last.element.closest("h1") ? "h1" : "other"}` : "";
      }).observe({ type: "largest-contentful-paint", buffered: true });
    });
    await page.goto("/");
    await page.waitForTimeout(1500);
    const lcp = await page.evaluate(() => (window as unknown as { __lcp: string }).__lcp);
    expect(lcp).toMatch(/:h1$/);
  });
});

test.describe("scroll reveal and reduced motion", () => {
  test("reveal uses a scroll-driven animation when supported", async ({ page }) => {
    await page.goto("/about-me");
    const supported = await page.evaluate(() => CSS.supports("animation-timeline: view()"));
    test.skip(!supported, "scroll-driven animations unsupported");
    const timeline = await page.locator(".reveal").first().evaluate((el) => getComputedStyle(el).getPropertyValue("animation-timeline"));
    expect(timeline).toContain("view");
  });

  test("with reduced motion nothing animates and content is fully visible", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/about-me");
    const result = await page.evaluate(() => {
      const names = (selector: string) =>
        [...document.querySelectorAll<HTMLElement>(selector)].map((el) => {
          const s = getComputedStyle(el);
          return { name: s.animationName, opacity: s.opacity };
        });
      return { reveal: names(".reveal"), dot: names(".status-dot"), ring: names(".marker-ring") };
    });
    for (const group of Object.values(result)) {
      expect(group.length).toBeGreaterThan(0);
      for (const item of group) {
        expect(item.name).toBe("none");
        expect(item.opacity).toBe("1");
      }
    }
    await context.close();
  });
});
