/**
 * Builds the site into a throw-away directory and runs the build-output specs
 * (tests/build) against it. Never touches ./dist.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const outDir = mkdtempSync(join(tmpdir(), "landing-build-"));
const run = (args) => spawnSync("npx", args, { stdio: "inherit", env: { ...process.env, BUILD_DIR: outDir } });

let status;
try {
  const build = run(["astro", "build", "--outDir", outDir]);
  status =
    build.status === 0
      ? (run(["playwright", "test", "-c", "playwright.build.config.ts"]).status ?? 1)
      : (build.status ?? 1);
} finally {
  if (!process.env.KEEP_BUILD) rmSync(outDir, { recursive: true, force: true });
  else console.log(`Build kept at ${outDir}`);
}
process.exit(status);
