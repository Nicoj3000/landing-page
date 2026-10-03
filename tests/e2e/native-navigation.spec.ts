import { expect, test } from "@playwright/test";

// Page-to-page navigation is a plain document load animated by the browser's
// native cross-document View Transitions: no client router ships.
test.describe("native cross-document navigation", () => {
  test("no client router is mounted", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("astro-route-announcer")).toHaveCount(0);
    await expect(page.locator('meta[name="astro-view-transitions-enabled"]')).toHaveCount(0);
  });

  test("global CSS opts in to cross-document view transitions", async ({ page }) => {
    await page.goto("/");
    const rules = await page.evaluate(() =>
      [...document.styleSheets].flatMap((sheet) => [...sheet.cssRules].map((rule) => rule.cssText)),
    );
    expect(rules.some((rule) => /@view-transition/.test(rule) && /navigation:\s*auto/.test(rule))).toBe(true);
  });

  test("the header, logo and page keep their view-transition names", async ({ page }) => {
    await page.goto("/");
    const name = (selector: string) =>
      page.evaluate((sel) => getComputedStyle(document.querySelector(sel) as Element).viewTransitionName, selector);
    expect(await name("header")).toBe("site-header");
    expect(await name("main")).toBe("page");
    await expect(page.locator("header [data-astro-transition-scope]")).not.toHaveCount(0);
  });

  test("dock links are prefetched without any hover", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="prefetch"][href$="/about-me"]')).toHaveCount(1, { timeout: 5000 });
  });

  test("theme toggle and hero still work after a navigation", async ({ page }) => {
    await page.goto("/about-me");
    await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Inicio" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("canvas[data-dot-field]")).toHaveAttribute("data-ready", "true", { timeout: 5000 });

    const toggle = page.locator("[data-theme-toggle]:visible").first();
    const before = await page.locator("html").getAttribute("data-theme-pref");
    await toggle.click();
    await expect(page.locator("html")).not.toHaveAttribute("data-theme-pref", before ?? "");
    await expect(toggle).toHaveAttribute("aria-label", /.+: .+/);
  });
});

// Page choreography budget: the old page fades out, then the new one fades in.
// Read from the stylesheet (the pseudo-elements only exist during a transition).
test.describe("page transition timing", () => {
  const MAX_TOTAL_MS = 250;
  const MAX_TRANSLATE_PX = 6;

  test("old + new page animations stay within the snappy budget", async ({ page }) => {
    await page.goto("/");
    const timing = await page.evaluate(() => {
      const flatten = (rules: CSSRuleList): CSSRule[] =>
        [...rules].flatMap((rule) => [rule, ...("cssRules" in rule ? flatten((rule as CSSGroupingRule).cssRules) : [])]);
      const all = [...document.styleSheets].flatMap((sheet) => flatten(sheet.cssRules));
      const root = getComputedStyle(document.documentElement);
      const toMs = (token: string) => {
        const value = token.startsWith("var(") ? root.getPropertyValue(token.slice(4, -1)).trim() : token;
        return value.endsWith("ms") ? parseFloat(value) : value.endsWith("s") ? parseFloat(value) * 1000 : NaN;
      };
      const durationOf = (selector: string) => {
        const rule = all.find((r): r is CSSStyleRule => r instanceof CSSStyleRule && r.selectorText === selector);
        const shorthand = rule?.style.getPropertyValue("animation") ?? "";
        const token = /var\(--[\w-]+\)|[\d.]+m?s/.exec(shorthand.replace(/^\s*[\w-]+\s+/, ""))?.[0];
        return token ? toMs(token) : NaN;
      };
      const translates = all
        .filter((r): r is CSSKeyframesRule => r instanceof CSSKeyframesRule && r.name.startsWith("vt-page-"))
        .flatMap((r) => [...r.cssRules].map((k) => (k as CSSKeyframeRule).style.transform))
        .map((t) => Math.abs(parseFloat(/translateY\((-?[\d.]+)px\)/.exec(t)?.[1] ?? "0")));
      return {
        out: durationOf("::view-transition-old(page)"),
        in: durationOf("::view-transition-new(page)"),
        translates,
      };
    });
    expect(timing.out).toBeGreaterThan(0);
    expect(timing.in).toBeGreaterThan(0);
    expect(timing.out + timing.in).toBeLessThanOrEqual(MAX_TOTAL_MS);
    expect(timing.translates.length).toBeGreaterThan(0);
    for (const px of timing.translates) expect(px).toBeLessThanOrEqual(MAX_TRANSLATE_PX);
  });
});
