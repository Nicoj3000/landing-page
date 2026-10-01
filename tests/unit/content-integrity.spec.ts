import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = (path: string) => fileURLToPath(new URL(`../../${path}`, import.meta.url));

const readEntries = (collection: string) =>
  readdirSync(root(`src/content/${collection}`))
    .filter((name) => name.endsWith(".json"))
    .map((name) => ({
      name,
      data: JSON.parse(readFileSync(root(`src/content/${collection}/${name}`), "utf8")) as Record<string, unknown>,
    }));

test.describe("content collections", () => {
  test("every skill references an SVG stored locally", () => {
    const missing = readEntries("skills")
      .map(({ data }) => String(data.icon))
      .filter((slug) => !existsSync(root(`src/assets/icons/${slug}.svg`)));
    expect(missing).toEqual([]);
  });

  test("every project image exists as a local asset", () => {
    const missing = readEntries("projects")
      .map(({ name, data }) => ({ name, image: String(data.image) }))
      .filter(({ image }) => !existsSync(root(`src/content/projects/${image}`)));
    expect(missing).toEqual([]);
  });

  test("ordered collections have unique order values", () => {
    for (const collection of ["projects", "services", "timeline", "skills", "counters"]) {
      const orders = readEntries(collection).map(({ data }) => data.order);
      expect(new Set(orders).size, `${collection} order values`).toBe(orders.length);
    }
  });
});
