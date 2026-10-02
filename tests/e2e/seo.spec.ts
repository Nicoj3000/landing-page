import { expect, test, type Page } from "@playwright/test";
import { SITE_ORIGIN } from "../../src/data/site-config";
import { pngSize } from "../helpers/png";
import { LANGS, ROUTES, STATUS_ROUTES } from "./routes";

const NAME = "Nicolás Delgado";

const OG_SLUG = { home: "home", about: "about-me", services: "services", portfolio: "portfolio" } as const;

const COPY = {
  es: {
    locale: "es_CO",
    alternate: "en_US",
    titles: {
      home: `${NAME} | Ingeniero de Sistemas`,
      about: `Sobre mí | ${NAME}`,
      services: `Mis servicios | ${NAME}`,
      portfolio: `Portafolio | ${NAME}`,
    },
  },
  en: {
    locale: "en_US",
    alternate: "es_CO",
    titles: {
      home: `${NAME} | Systems Engineer`,
      about: `About me | ${NAME}`,
      services: `My services | ${NAME}`,
      portfolio: `Portfolio | ${NAME}`,
    },
  },
} as const;

const meta = (page: Page, selector: string) => page.locator(`head ${selector}`).first().getAttribute("content");

type JsonObject = Record<string, unknown>;
const jsonLd = async (page: Page): Promise<JsonObject[]> =>
  (await page.locator('script[type="application/ld+json"]').allTextContents()).map((text) => JSON.parse(text) as JsonObject);

const graphOf = (blocks: JsonObject[]): JsonObject[] =>
  blocks.flatMap((block) => (Array.isArray(block["@graph"]) ? (block["@graph"] as JsonObject[]) : [block]));

test.describe("page metadata", () => {
  for (const route of ROUTES) {
    for (const lang of LANGS) {
      const path = route[lang];
      const id = route.name as keyof typeof OG_SLUG;

      test(`${lang} ${path}: title, description, canonical, hreflang`, async ({ page }) => {
        await page.goto(path);
        await expect(page).toHaveTitle(COPY[lang].titles[id]);

        const description = (await meta(page, 'meta[name="description"]')) ?? "";
        expect(description.length).toBeGreaterThan(60);
        expect(description.length).toBeLessThanOrEqual(175);

        const self = `${SITE_ORIGIN}${route[lang]}`;
        await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute("href", self);
        await expect(page.locator('head link[rel="alternate"][hreflang="es"]')).toHaveAttribute("href", `${SITE_ORIGIN}${route.es}`);
        await expect(page.locator('head link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", `${SITE_ORIGIN}${route.en}`);
        await expect(page.locator('head link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", `${SITE_ORIGIN}${route.es}`);
        await expect(page.locator('head meta[name="robots"]')).toHaveCount(0);
      });

      test(`${lang} ${path}: Open Graph and Twitter card`, async ({ page, request, baseURL }) => {
        await page.goto(path);
        const description = await meta(page, 'meta[name="description"]');
        const image = `${SITE_ORIGIN}/og/${lang === "en" ? "en/" : ""}${OG_SLUG[id]}.png`;

        expect(await meta(page, 'meta[property="og:type"]')).toBe("website");
        expect(await meta(page, 'meta[property="og:url"]')).toBe(`${SITE_ORIGIN}${route[lang]}`);
        expect(await meta(page, 'meta[property="og:title"]')).toBe(COPY[lang].titles[id]);
        expect(await meta(page, 'meta[property="og:description"]')).toBe(description);
        expect(await meta(page, 'meta[property="og:site_name"]')).toBe("NicoX");
        expect(await meta(page, 'meta[property="og:locale"]')).toBe(COPY[lang].locale);
        expect(await meta(page, 'meta[property="og:locale:alternate"]')).toBe(COPY[lang].alternate);
        expect(await meta(page, 'meta[property="og:image"]')).toBe(image);
        expect(await meta(page, 'meta[property="og:image:width"]')).toBe("1200");
        expect(await meta(page, 'meta[property="og:image:height"]')).toBe("630");
        expect(((await meta(page, 'meta[property="og:image:alt"]')) ?? "").length).toBeGreaterThan(5);

        expect(await meta(page, 'meta[name="twitter:card"]')).toBe("summary_large_image");
        expect(await meta(page, 'meta[name="twitter:title"]')).toBe(COPY[lang].titles[id]);
        expect(await meta(page, 'meta[name="twitter:description"]')).toBe(description);
        expect(await meta(page, 'meta[name="twitter:image"]')).toBe(image);

        // The advertised image really resolves (absolute URL re-pointed at the dev server).
        const res = await request.get(image.replace(SITE_ORIGIN, baseURL ?? ""));
        expect(res.status()).toBe(200);
        expect(res.headers()["content-type"]).toContain("image/png");
        expect(pngSize(await res.body())).toEqual({ width: 1200, height: 630 });
      });

      test(`${lang} ${path}: JSON-LD Person and WebSite`, async ({ page }) => {
        await page.goto(path);
        const graph = graphOf(await jsonLd(page));
        const person = graph.find((node) => node["@type"] === "Person");
        const website = graph.find((node) => node["@type"] === "WebSite");

        expect(person).toBeDefined();
        expect(person).toMatchObject({
          name: NAME,
          alternateName: "NicoX",
          url: SITE_ORIGIN,
          email: "mailto:nicoj3000its@gmail.com",
          jobTitle: lang === "es" ? "Ingeniero de Sistemas" : "Systems Engineer",
          address: { "@type": "PostalAddress", addressCountry: "CO" },
        });
        expect(person?.["sameAs"]).toEqual([
          "https://github.com/Nicoj3000",
          "https://www.linkedin.com/in/nicolas-delgado-6b22372b7/",
        ]);
        expect(String(person?.["image"])).toMatch(/^https:\/\/nicoj3000\.netlify\.app\//);
        const skills = person?.["knowsAbout"] as string[];
        expect(skills.length).toBeGreaterThan(10);
        expect(skills).toEqual(expect.arrayContaining(["TypeScript", "React"]));

        expect(website).toMatchObject({ name: "NicoX", url: SITE_ORIGIN, inLanguage: lang === "es" ? "es-CO" : "en-US" });
      });
    }
  }

  test("theme-color is declared for light and dark scheme", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('head meta[name="theme-color"][media="(prefers-color-scheme: dark)"]')).toHaveAttribute("content", "#0A0C0F");
    await expect(page.locator('head meta[name="theme-color"][media="(prefers-color-scheme: light)"]')).toHaveAttribute("content", "#F4F2EC");
  });

  test("JSON-LD never contains a raw '<' that could close the script tag", async ({ request }) => {
    const html = await (await request.get("/")).text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1] ?? "");
    expect(blocks.length).toBeGreaterThan(0);
    for (const block of blocks) expect(block).not.toContain("<");
  });
});

test.describe("status pages", () => {
  for (const path of STATUS_ROUTES) {
    test(`${path}: noindex, no canonical or hreflang`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('head meta[name="robots"]')).toHaveAttribute("content", "noindex");
      await expect(page.locator('head link[rel="canonical"]')).toHaveCount(0);
      await expect(page.locator('head link[rel="alternate"][hreflang]')).toHaveCount(0);
    });
  }
});
