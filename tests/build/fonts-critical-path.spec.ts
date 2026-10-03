import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { BUILD_DIR, SKIP_REASON } from "./build-dir";

/**
 * Guards the font bytes that compete with the LCP portrait on first load.
 * Inspects the BUILT html;
 * needs an explicit BUILD_DIR (see ./build-dir.ts and `npm run test:build`).
 */

// Display font weights used by the site (400 heading, 600 h1/counters, 700 logo + h2-h4).
const DISPLAY_WEIGHTS = [400, 600, 700];
// Display 600 (~22 KB) + Geist (~29 KB) = ~51 KB today; the old variable display file alone was 132 KB.
const PRELOADED_FONT_BUDGET_BYTES = 60_000;

const read = (file: string): string => readFileSync(join(BUILD_DIR as string, file), "utf8");

test.describe("built html: fonts on the critical path", () => {
  test.skip(BUILD_DIR === undefined, SKIP_REASON);

  test("preloaded font files stay under the byte budget", () => {
    const html = read("index.html");
    const hrefs = [...html.matchAll(/<link rel="preload" href="([^"]+)" as="font"/g)].map((m) => m[1] ?? "");
    expect(hrefs.length).toBeGreaterThan(0);
    const total = hrefs.reduce((sum, href) => sum + statSync(join(BUILD_DIR as string, href)).size, 0);
    expect(total).toBeLessThanOrEqual(PRELOADED_FONT_BUDGET_BYTES);
  });

  test("display @font-face rules cover only the weights in use", () => {
    const html = read("index.html");
    const faces = [...html.matchAll(/@font-face\s*\{[^}]*\}/g)]
      .map((m) => m[0])
      .filter((rule) => /font-family:"Bricolage Grotesque-[0-9a-f]+";/.test(rule));
    const ranges = faces.map((rule) => {
      const [lo = "", hi = lo] = (/font-weight:([^;]+);/.exec(rule)?.[1] ?? "").trim().split(/\s+/);
      return [Number(lo), Number(hi)] as const;
    });
    for (const weight of DISPLAY_WEIGHTS) {
      expect(ranges.some(([lo, hi]) => lo <= weight && weight <= hi), `weight ${weight}`).toBe(true);
    }
    // No face may span the unused extremes (the full 200-800 axis ships a 132 KB file).
    for (const [lo, hi] of ranges) expect(hi - lo).toBeLessThanOrEqual(300);
  });
});
