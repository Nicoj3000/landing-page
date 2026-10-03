import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { BUILD_DIR, SKIP_REASON } from "./build-dir";

/**
 * The stylesheet is inlined so first render needs no extra round trip.
 * Inspects the BUILT html; needs an explicit BUILD_DIR (see ./build-dir.ts and `npm run test:build`).
 */

const PAGES = [
  "index.html",
  "about-me.html",
  "services.html",
  "portfolio.html",
  "en.html",
  "en/about-me.html",
  "en/services.html",
  "en/portfolio.html",
] as const;

const read = (file: string): string => readFileSync(join(BUILD_DIR as string, file), "utf8");

test.describe("built html: stylesheet delivery", () => {
  test.skip(BUILD_DIR === undefined, SKIP_REASON);

  for (const file of PAGES) {
    test(`${file} has no external stylesheet`, () => {
      const html = read(file);
      expect(html).not.toMatch(/<link[^>]+rel="stylesheet"[^>]*href="\/_astro\//);
      expect(html).toMatch(/<style[^>]*>/);
    });
  }
});
