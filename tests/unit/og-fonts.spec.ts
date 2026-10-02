import { expect, test } from "@playwright/test";
import { createFontLoader, FONT_FILES, FONT_SUBDIR } from "../../src/lib/og-fonts";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

test.describe("OG font loader", () => {
  test("retries after a failed load instead of caching the rejection", async () => {
    let calls = 0;
    const load = createFontLoader(async (name) => {
      calls += 1;
      if (calls === 1) throw new Error("disk hiccup");
      return Buffer.from(name);
    });

    await expect(load()).rejects.toThrow("disk hiccup");
    const fonts = await load();
    expect(fonts.length).toBeGreaterThan(0);
  });

  test("caches a successful load", async () => {
    let calls = 0;
    const load = createFontLoader(async (name) => {
      calls += 1;
      return Buffer.from(name);
    });
    const first = await load();
    const callsAfterFirst = calls;
    expect(await load()).toBe(first);
    expect(calls).toBe(callsAfterFirst);
  });

  test("every bundled font file exists under src/assets/fonts", () => {
    const dir = new URL(`../../src/${FONT_SUBDIR}`, import.meta.url);
    for (const file of Object.values(FONT_FILES)) {
      expect(existsSync(fileURLToPath(new URL(file, dir))), file).toBe(true);
    }
  });
});
