import { expect, test } from "@playwright/test";
import { localizedPath, normalizePathname, stripLocale } from "../../src/i18n/utils";

// `build.format: "file"` makes Astro.url.pathname look like "/about-me.html"
// at build time, while the dev server reports "/about-me". Every consumer of
// the pathname (canonical, hreflang, language switch, aria-current) must see
// the same normalized value.
test.describe("normalizePathname", () => {
  const cases: Array<[string, string]> = [
    ["/", "/"],
    ["", "/"],
    ["/index.html", "/"],
    ["/index", "/"],
    ["/about-me", "/about-me"],
    ["/about-me/", "/about-me"],
    ["/about-me.html", "/about-me"],
    ["/en", "/en"],
    ["/en/", "/en"],
    ["/en/index.html", "/en"],
    ["/en/about-me.html", "/en/about-me"],
    ["/en/portfolio/index.html", "/en/portfolio"],
  ];
  for (const [input, expected] of cases) {
    test(`${JSON.stringify(input)} -> ${expected}`, () => {
      expect(normalizePathname(input)).toBe(expected);
    });
  }
});

test.describe("locale helpers share the normalized pathname", () => {
  test("stripLocale ignores .html and index", () => {
    expect(stripLocale("/en/about-me.html")).toBe("/about-me");
    expect(stripLocale("/en/index.html")).toBe("/");
    expect(stripLocale("/index.html")).toBe("/");
  });

  test("localizedPath never emits .html", () => {
    expect(localizedPath("/about-me.html", "en")).toBe("/en/about-me");
    expect(localizedPath("/en/about-me.html", "es")).toBe("/about-me");
    expect(localizedPath("/index.html", "en")).toBe("/en");
    expect(localizedPath("/en/index.html", "es")).toBe("/");
  });
});
