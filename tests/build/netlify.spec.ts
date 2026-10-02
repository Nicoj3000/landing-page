import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { parse } from "smol-toml";

interface NetlifyConfig {
  build?: { command?: string; publish?: string; environment?: { NODE_VERSION?: string } };
  redirects?: Array<{ from: string; to: string; status?: number; force?: boolean }>;
  headers?: Array<{ for: string; values: Record<string, string> }>;
}

const config = parse(readFileSync(new URL("../../netlify.toml", import.meta.url), "utf8")) as NetlifyConfig;
const headersFor = (path: string) => config.headers?.find((rule) => rule.for === path)?.values ?? {};

test.describe("netlify.toml", () => {
  test("builds with npm and publishes dist on the Node version pinned in .nvmrc", () => {
    const nvmrc = readFileSync(new URL("../../.nvmrc", import.meta.url), "utf8").trim();
    expect(config.build).toMatchObject({ command: "npm run build", publish: "dist" });
    expect(config.build?.environment?.NODE_VERSION).toBe(nvmrc);
  });

  test("unknown /en/* paths get the English 404 page with a 404 status", () => {
    const rule = config.redirects?.find((redirect) => redirect.from === "/en/*");
    expect(rule).toMatchObject({ to: "/en/404.html", status: 404 });
    // `force` would shadow real pages such as /en/about-me.
    expect(rule?.force ?? false).toBe(false);
  });

  test("hashed assets are cached immutably for a year", () => {
    expect(headersFor("/_astro/*")["Cache-Control"]).toBe("public, max-age=31536000, immutable");
  });

  test("every path gets the baseline security headers", () => {
    const values = headersFor("/*");
    expect(values["X-Content-Type-Options"]).toBe("nosniff");
    expect(values["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(values["X-Frame-Options"]).toBe("DENY");
    expect(values["Content-Security-Policy"]).toContain("frame-ancestors 'none'");
    expect(values["Permissions-Policy"]).toContain("camera=()");
  });
});
