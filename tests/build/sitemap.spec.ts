import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { BUILD_DIR, SITE_ORIGIN, SKIP_REASON } from "./build-dir";

const REAL_PAGES = [
  "/",
  "/about-me",
  "/services",
  "/portfolio",
  "/en",
  "/en/about-me",
  "/en/services",
  "/en/portfolio",
] as const;

const STATUS_PAGES = ["/404", "/en/404", "/error", "/en/error"] as const;

const locs = (dir: string): string[] =>
  readdirSync(dir)
    .filter((name) => /^sitemap-\d+\.xml$/.test(name))
    .flatMap((name) =>
      [...readFileSync(join(dir, name), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] ?? ""),
    );

test.describe("built sitemap", () => {
  test.skip(BUILD_DIR === undefined, SKIP_REASON);

  test("lists the 8 real pages with clean URLs and none of the status pages", () => {
    const urls = locs(BUILD_DIR as string);
    // sitemap `<loc>` for the home page keeps the trailing slash of the origin.
    const normalized = urls.map((url) => url.replace(SITE_ORIGIN, "") || "/").map((p) => (p === "/" ? p : p.replace(/\/$/, "")));

    for (const page of REAL_PAGES) expect(normalized, `missing ${page}`).toContain(page);
    for (const page of STATUS_PAGES) expect(normalized, `unexpected ${page}`).not.toContain(page);
    for (const url of urls) {
      expect(url.startsWith(SITE_ORIGIN)).toBe(true);
      expect(url).not.toMatch(/\.html($|[?#])/);
    }
    expect(new Set(normalized).size).toBe(REAL_PAGES.length);
  });
});
