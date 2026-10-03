import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { LANGS } from "./routes";

const SERVICES = { es: "/services", en: "/en/services" } as const;
const PORTFOLIO = { es: "/portfolio", en: "/en/portfolio" } as const;

interface Project {
  id: string;
  order: number;
  title: string;
  repoUrl?: string;
  demoUrl?: string;
  tags: string[];
  description: { es: string; en: string };
}
interface Service {
  order: number;
  title: { es: string; en: string };
  description: { es: string; en: string };
}

const readCollection = <T>(name: string): Array<T & { id: string }> => {
  const dir = join(process.cwd(), "src/content", name);
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ id: f.replace(/\.json$/, ""), ...(JSON.parse(readFileSync(join(dir, f), "utf8")) as T) }))
    .sort((a, b) => (a as unknown as { order: number }).order - (b as unknown as { order: number }).order);
};

const projects = readCollection<Project>("projects");
const services = readCollection<Service>("services");

for (const lang of LANGS) {
  test.describe(`services (${lang})`, () => {
    test("five numbered spec rows with icon, title, description and mail CTA, in order", async ({ page }) => {
      await page.goto(SERVICES[lang]);
      await expect(page.locator("h1")).toHaveText(lang === "es" ? /Mis\s+servicios/ : /My\s+services/);
      const rows = page.locator("[data-service]");
      await expect(rows).toHaveCount(5);
      for (const [i, service] of services.entries()) {
        const row = rows.nth(i);
        await expect(row.locator("h2")).toHaveText(service.title[lang]);
        await expect(row).toContainText(service.description[lang]);
        await expect(row.locator("[data-index]")).toHaveText(String(i + 1).padStart(2, "0"));
        await expect(row.locator("svg").first()).toHaveAttribute("aria-hidden", "true");
        const cta = row.locator('a[href^="mailto:nicoj3000its@gmail.com"]');
        await expect(cta).toHaveCount(1);
        await expect(cta).toHaveAttribute("href", new RegExp(`subject=${encodeURIComponent(service.title[lang])}`));
        await expect(cta).toHaveAccessibleName(new RegExp(service.title[lang]));
      }
    });

    test("offers the locale CV", async ({ page }) => {
      await page.goto(SERVICES[lang]);
      await expect(page.locator(`main a[href="/hoja-de-vida-${lang}.pdf"]`)).toHaveCount(1);
    });
  });

  test.describe(`portfolio (${lang})`, () => {
    test("one card per project, sorted by order, with anchor ids", async ({ page }) => {
      await page.goto(PORTFOLIO[lang]);
      await expect(page.locator("h1")).toHaveText(lang === "es" ? /Mis últimos\s+proyectos completados/ : /My latest\s+completed projects/);
      const cards = page.locator("[data-project]");
      await expect(cards).toHaveCount(projects.length);
      for (const [i, project] of projects.entries()) {
        const card = cards.nth(i);
        await expect(card).toHaveAttribute("id", project.id);
        await expect(card.locator("h2")).toHaveText(project.title);
        await expect(card).toContainText(project.description[lang]);
        for (const tag of project.tags) await expect(card.locator("[data-tag]", { hasText: tag })).toHaveCount(1);
      }
    });

    test("images: AVIF/WebP, dimensions, descriptive alt, lazy except the first", async ({ page }) => {
      await page.goto(PORTFOLIO[lang]);
      for (const [i, project] of projects.entries()) {
        const card = page.locator("[data-project]").nth(i);
        await expect(card.locator('picture source[type="image/avif"]')).toHaveCount(1);
        await expect(card.locator('picture source[type="image/webp"]')).toHaveCount(1);
        const img = card.locator("picture img");
        await expect(img).toHaveAttribute("alt", new RegExp(project.title));
        await expect(img).toHaveAttribute("width", /\d+/);
        await expect(img).toHaveAttribute("height", /\d+/);
        await expect(img).toHaveAttribute("sizes", /.+/);
        await expect(img).toHaveAttribute("loading", i === 0 ? "eager" : "lazy");
      }
    });

    test("links have accessible names and open safely", async ({ page }) => {
      await page.goto(PORTFOLIO[lang]);
      const repoOf = lang === "es" ? "Repositorio en GitHub de" : "GitHub repository of";
      const demoOf = lang === "es" ? "Demo en vivo de" : "Live demo of";
      for (const [i, project] of projects.entries()) {
        const card = page.locator("[data-project]").nth(i);
        const repo = card.locator(`a[href="${project.repoUrl}"]`);
        const demo = card.locator(`a[href="${project.demoUrl}"]`);
        if (project.repoUrl) {
          await expect(repo).toHaveAccessibleName(new RegExp(`^${repoOf} ${project.title}`));
          await expect(repo).toHaveAttribute("rel", /noopener/);
          await expect(repo).toHaveAttribute("target", "_blank");
        } else {
          await expect(card.locator('a[href*="github.com"]')).toHaveCount(0);
        }
        if (project.demoUrl) {
          await expect(demo).toHaveAccessibleName(new RegExp(`^${demoOf} ${project.title}`));
          await expect(demo).toHaveAttribute("rel", /noopener/);
        }
      }
    });

    test("anchor from the home teaser lands on the card", async ({ page }) => {
      await page.goto(`${PORTFOLIO[lang]}#${projects[1]?.id}`);
      await expect(page.locator(`#${projects[1]?.id}`)).toBeInViewport();
    });
  });
}
