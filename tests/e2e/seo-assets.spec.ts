import { expect, test } from "@playwright/test";
import { pngSize } from "../helpers/png";

const ICONS = [
  { path: "/apple-touch-icon.png", size: 180 },
  { path: "/icon-192.png", size: 192 },
  { path: "/icon-512.png", size: 512 },
  { path: "/icon-maskable-512.png", size: 512 },
] as const;

interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
}
interface Manifest {
  name: string;
  short_name: string;
  start_url: string;
  display: string;
  background_color: string;
  theme_color: string;
  icons: ManifestIcon[];
}

test.describe("icons and manifest", () => {
  for (const icon of ICONS) {
    test(`${icon.path} is a ${icon.size}px square PNG`, async ({ request }) => {
      const res = await request.get(icon.path);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("image/png");
      expect(pngSize(await res.body())).toEqual({ width: icon.size, height: icon.size });
    });
  }

  test("head links the manifest and the apple touch icon on every locale", async ({ page }) => {
    for (const path of ["/", "/en/services"]) {
      await page.goto(path);
      await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "/site.webmanifest");
      await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute("href", "/apple-touch-icon.png");
    }
  });

  test("web manifest describes the app and lists every icon, one maskable", async ({ request }) => {
    const res = await request.get("/site.webmanifest");
    expect(res.status()).toBe(200);
    const manifest = (await res.json()) as Manifest;
    expect(manifest.name).toBe("NicoX — Ingeniero de Sistemas Fullstack");
    expect(manifest.short_name).toBe("NicoX");
    expect(manifest.start_url).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.background_color).toBe("#0A0C0F");
    expect(manifest.theme_color).toBe("#0A0C0F");

    const srcs = manifest.icons.map((icon) => icon.src);
    expect(srcs).toEqual(expect.arrayContaining(["/icon-192.png", "/icon-512.png", "/icon-maskable-512.png"]));
    expect(manifest.icons.filter((icon) => icon.purpose === "maskable").map((icon) => icon.src)).toEqual([
      "/icon-maskable-512.png",
    ]);
    for (const icon of manifest.icons) expect((await request.get(icon.src)).status()).toBe(200);
  });

  test("robots.txt allows crawling and points to the sitemap index", async ({ request }) => {
    const body = await (await request.get("/robots.txt")).text();
    expect(body).toMatch(/User-agent: \*/);
    expect(body).toContain("Sitemap: https://nicoj3000.netlify.app/sitemap-index.xml");
  });
});
