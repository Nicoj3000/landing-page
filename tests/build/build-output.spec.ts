import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { BUILD_DIR, SITE, SKIP_REASON } from "./build-dir";

/**
 * Checks canonical / hreflang shapes in the BUILT html (where Astro.url.pathname
 * carries the `.html` suffix of `build.format: "file"`, unlike the dev server).
 * Needs an explicit BUILD_DIR; see ./build-dir.ts and `npm run test:build`.
 */

const PAGES = [
  { file: "index.html", es: "/", en: "/en" },
  { file: "about-me.html", es: "/about-me", en: "/en/about-me" },
  { file: "services.html", es: "/services", en: "/en/services" },
  { file: "portfolio.html", es: "/portfolio", en: "/en/portfolio" },
  { file: "en.html", es: "/", en: "/en" },
  { file: "en/about-me.html", es: "/about-me", en: "/en/about-me" },
  { file: "en/services.html", es: "/services", en: "/en/services" },
  { file: "en/portfolio.html", es: "/portfolio", en: "/en/portfolio" },
] as const;

const hrefs = (html: string, pattern: RegExp): string[] =>
  [...html.matchAll(pattern)].map((m) => m[1] ?? "");

test.describe("built html: canonical / hreflang / lang switch", () => {
  test.skip(BUILD_DIR === undefined, SKIP_REASON);

  for (const page of PAGES) {
    test(`${page.file}`, () => {
      const html = readFileSync(join(BUILD_DIR as string, page.file), "utf8");
      const isEn = page.file === "en.html" || page.file.startsWith("en/");
      const self = `${SITE}${isEn ? page.en : page.es}`;

      const canonical = hrefs(html, /<link rel="canonical" href="([^"]+)"/g);
      expect(canonical).toEqual([self]);

      const alternates = hrefs(html, /<link rel="alternate" hreflang="[^"]+" href="([^"]+)"/g);
      expect(alternates).toHaveLength(3);
      expect(alternates).toContain(`${SITE}${page.es}`);
      expect(alternates).toContain(`${SITE}${page.en}`);

      // No `.html` or `/index` leaks into any SEO / switch URL.
      for (const url of [...canonical, ...alternates]) {
        expect(url).not.toMatch(/\.html($|[?#])/);
        expect(url).not.toMatch(/\/index($|[?#])/);
      }

      const switchHrefs = hrefs(html, /<a href="([^"]+)" hreflang="(?:es|en)"/g);
      expect(switchHrefs.sort()).toEqual([page.en, page.es].sort());
    });
  }
});
