import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";
// Legacy react-i18next resources. Deleted in T7 together with the Next app;
// at that point this test switches to a frozen snapshot of the strings.
import legacy from "../../utils/i18n";
import { LOCALES, ui, type Locale } from "../../src/i18n/ui";

const CONTENT_DIR = fileURLToPath(new URL("../../src/content", import.meta.url));

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

/** Collects every string leaf of a JSON-like tree. */
function leaves(node: Json, out: string[] = []): string[] {
  if (typeof node === "string") out.push(node);
  else if (Array.isArray(node)) node.forEach((child) => leaves(child, out));
  else if (node && typeof node === "object")
    Object.values(node).forEach((child) => leaves(child, out));
  return out;
}

function isLocalized(node: Json): node is { es: Json; en: Json } {
  return (
    typeof node === "object" &&
    node !== null &&
    !Array.isArray(node) &&
    "es" in node &&
    "en" in node
  );
}

/** Collects the string leaves of a content entry as seen by one locale. */
function leavesFor(node: Json, locale: Locale, out: string[] = []): string[] {
  if (isLocalized(node)) return leavesFor(node[locale], locale, out);
  if (typeof node === "string") out.push(node);
  else if (Array.isArray(node)) node.forEach((c) => leavesFor(c, locale, out));
  else if (node && typeof node === "object")
    Object.values(node).forEach((c) => leavesFor(c, locale, out));
  return out;
}

function jsonFiles(dir: string): string[] {
  try {
    return readdirSync(dir).flatMap((name) => {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) return jsonFiles(full);
      return full.endsWith(".json") ? [full] : [];
    });
  } catch {
    return [];
  }
}

function contentStrings(locale: Locale): string[] {
  return jsonFiles(CONTENT_DIR).flatMap((file) =>
    leavesFor(JSON.parse(readFileSync(file, "utf8")) as Json, locale),
  );
}

function legacyStrings(locale: Locale): string[] {
  const bundle = legacy.getResourceBundle(locale, "translation") as Json;
  return leaves(bundle);
}

test.describe("i18n parity with legacy utils/i18n.ts", () => {
  for (const locale of LOCALES) {
    test(`every legacy ${locale} string is present in ui.ts or a content collection`, () => {
      const corpus = new Set([
        ...Object.values(ui[locale]),
        ...contentStrings(locale),
      ]);
      const legacyLeaves = legacyStrings(locale);
      expect(legacyLeaves.length).toBeGreaterThanOrEqual(72);

      const missing = legacyLeaves.filter((text) => !corpus.has(text));
      expect(missing).toEqual([]);
    });
  }

  test("es and en dictionaries expose the same keys", () => {
    expect(Object.keys(ui.en).sort()).toEqual(Object.keys(ui.es).sort());
  });

  test("no dictionary value is empty", () => {
    for (const locale of LOCALES) {
      const empty = Object.entries(ui[locale]).filter(([, v]) => v.trim() === "");
      expect(empty).toEqual([]);
    }
  });
});
