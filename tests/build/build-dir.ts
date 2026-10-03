import { existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Build-output specs inspect a build that the caller produced on purpose.
 * They never guess at `./dist`, which may be stale: set BUILD_DIR explicitly
 * (`npm run test:build` does it for you with a throw-away directory).
 */
export const SKIP_REASON =
  "BUILD_DIR is not set. These specs only inspect an explicit build; run `npm run test:build`.";

export const BUILD_DIR: string | undefined = process.env.BUILD_DIR
  ? resolve(process.env.BUILD_DIR)
  : undefined;

if (BUILD_DIR !== undefined && !existsSync(BUILD_DIR)) {
  // A typo must fail loudly instead of silently skipping every build spec.
  throw new Error(`BUILD_DIR points to a missing directory: ${BUILD_DIR}`);
}

export { SITE_ORIGIN } from "../../src/data/site-config";
