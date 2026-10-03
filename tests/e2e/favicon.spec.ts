import { expect, test } from "@playwright/test";

test.describe("favicon", () => {
  test("head declares an SVG icon and a sized ICO fallback", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="icon"][type="image/svg+xml"][href="/favicon.svg"]')).toHaveCount(1);
    await expect(page.locator('link[rel="icon"][href="/favicon.ico"]')).toHaveCount(1);
  });

  test("favicon.svg is a small SVG", async ({ request }) => {
    const res = await request.get("/favicon.svg");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/svg+xml");
    expect((await res.body()).length).toBeLessThan(2_000);
  });

  test("favicon.ico is a real ICO with 32 and 48 px images, not a photo", async ({ request }) => {
    const res = await request.get("/favicon.ico");
    expect(res.status()).toBe(200);
    const body = await res.body();
    // ICONDIR: reserved=0, type=1 (icon), count=2
    expect([body.readUInt16LE(0), body.readUInt16LE(2), body.readUInt16LE(4)]).toEqual([0, 1, 2]);
    expect([body.readUInt8(6), body.readUInt8(22)]).toEqual([32, 48]);
    expect(body.length).toBeLessThan(10_000);
  });
});
