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

// Rules that only exist in src/styles/global.css (font <style> blocks are inlined regardless).
const GLOBAL_CSS_MARKERS = [":where(h1,h2,h3,h4){", "@view-transition{navigation:auto}"];

const inlineCss = (html: string): string =>
  [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((match) => match[1]).join("\n");

const astroStylesheetLinks = (html: string): string[] =>
  (html.match(/<link\b[^>]*>/g) ?? []).filter((tag) => /rel="stylesheet"/.test(tag) && /href="\/_astro\//.test(tag));

test.describe("built html: stylesheet delivery", () => {
  test.skip(BUILD_DIR === undefined, SKIP_REASON);

  for (const file of PAGES) {
    test(`${file} inlines the global stylesheet instead of linking it`, () => {
      const html = read(file);
      expect(astroStylesheetLinks(html)).toEqual([]);
      const css = inlineCss(html);
      for (const marker of GLOBAL_CSS_MARKERS) expect(css).toContain(marker);
    });
  }
});
