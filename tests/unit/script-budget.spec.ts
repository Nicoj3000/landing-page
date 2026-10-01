import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { expect, test } from "@playwright/test";
import { transform } from "esbuild";

/** Island budgets, measured as minified bytes of the TypeScript source. */
const BUDGETS = [
  { file: "src/scripts/hero-field.ts", minified: 4096 },
  { file: "src/scripts/counters.ts", minified: 1536 },
  { file: "src/scripts/theme-toggle.ts", minified: 2048 },
] as const;

for (const { file, minified } of BUDGETS) {
  test(`${file} stays under ${minified} bytes minified`, async () => {
    const source = readFileSync(file, "utf8");
    const out = await transform(source, { loader: "ts", minify: true, target: "es2022" });
    const size = Buffer.byteLength(out.code);
    console.log(`${file}: ${size} B minified, ${gzipSync(out.code).length} B gzip`);
    expect(size).toBeLessThan(minified);
  });
}
