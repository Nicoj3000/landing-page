import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { pngSize } from "../helpers/png";
import { LOCALE_TAGS } from "../../src/data/site-config";
import { BUILD_DIR, SITE_ORIGIN, SKIP_REASON } from "./build-dir";

const OG_FILES = [
  "og/home.png",
  "og/about-me.png",
  "og/services.png",
  "og/portfolio.png",
  "og/en/home.png",
  "og/en/about-me.png",
  "og/en/services.png",
  "og/en/portfolio.png",
] as const;

const ICON_FILES = ["favicon.ico", "favicon.svg", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png"] as const;

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Body of the sitemap <url> entry for a path, found with plain string search (no regex). */
function sitemapEntry(xml: string, path: string): string {
  const open = `<url><loc>${SITE_ORIGIN}${path}</loc>`;
  const start = xml.indexOf(open);
  if (start === -1) return "";
  return xml.slice(start + open.length, xml.indexOf("</url>", start));
}
const read = (file: string) => readFileSync(join(BUILD_DIR as string, file));

test.describe("built SEO artifacts", () => {
  test.skip(BUILD_DIR === undefined, SKIP_REASON);

  for (const file of OG_FILES) {
    test(`${file} is a 1200x630 PNG`, () => {
      expect(pngSize(read(file))).toEqual({ width: 1200, height: 630 });
    });
  }

  test("every OG image referenced by a page was emitted", () => {
    for (const html of ["index.html", "en.html", "about-me.html", "en/about-me.html", "404.html", "en/404.html"]) {
      const image = /<meta property="og:image" content="([^"]+)"/.exec(read(html).toString("utf8"))?.[1] ?? "";
      expect(image.startsWith(SITE_ORIGIN)).toBe(true);
      expect(existsSync(join(BUILD_DIR as string, image.replace(SITE_ORIGIN, "")))).toBe(true);
    }
  });

  test("static icon files and manifest are copied", () => {
    for (const file of [...ICON_FILES, "site.webmanifest", "robots.txt"]) {
      expect(existsSync(join(BUILD_DIR as string, file)), file).toBe(true);
    }
    expect(read("robots.txt").toString("utf8")).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap-index.xml`);
  });

  test("sitemap emits es/en alternates for every page", () => {
    const xml = read("sitemap-0.xml").toString("utf8");
    const about = sitemapEntry(xml, "/about-me");
    expect(about).toContain(`hreflang="${LOCALE_TAGS.es}" href="${SITE_ORIGIN}/about-me"`);
    expect(about).toContain(`hreflang="${LOCALE_TAGS.en}" href="${SITE_ORIGIN}/en/about-me"`);
    const home = sitemapEntry(xml, "/");
    expect(home).toContain(`hreflang="${LOCALE_TAGS.en}" href="${SITE_ORIGIN}/en"`);
  });

  test("built JSON-LD has an absolute, optimized portrait URL", () => {
    const html = read("index.html").toString("utf8");
    const json = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)?.[1] ?? "";
    const graph = (JSON.parse(json) as { "@graph": Array<{ "@type": string; image?: string }> })["@graph"];
    const image = graph.find((node) => node["@type"] === "Person")?.image ?? "";
    expect(image).toMatch(new RegExp(`^${escapeRegExp(SITE_ORIGIN)}/_astro/Foto-CV\\..+\\.(jpg|webp|png)$`));
    expect(existsSync(join(BUILD_DIR as string, image.replace(SITE_ORIGIN, "")))).toBe(true);
  });
});
