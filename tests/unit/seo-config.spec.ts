import { expect, test } from "@playwright/test";
import { LOCALE_TAGS } from "../../src/data/site-config";
import { HTML_LANG, OG_LOCALE, PAGE_IDS, ogSlug } from "../../src/lib/seo";

test.describe("locale tags", () => {
  test("HTML_LANG and OG_LOCALE derive from the single LOCALE_TAGS map", () => {
    expect(HTML_LANG).toEqual({ es: "es-CO", en: "en-US" });
    expect(HTML_LANG).toEqual(LOCALE_TAGS);
    expect(OG_LOCALE).toEqual({ es: "es_CO", en: "en_US" });
  });
});

test.describe("ogSlug", () => {
  const expected = {
    home: ["home", "en/home"],
    about: ["about-me", "en/about-me"],
    services: ["services", "en/services"],
    portfolio: ["portfolio", "en/portfolio"],
  } as const;
  for (const id of PAGE_IDS) {
    test(`${id}`, () => {
      expect([ogSlug("es", id), ogSlug("en", id)]).toEqual(expected[id]);
    });
  }
});
