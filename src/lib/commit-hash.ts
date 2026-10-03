/** Deterministic 7-hex "commit id" for an entry id (FNV-1a), used by the git-log timeline. */
export function commitHash(seed: string): string {
  let hash = 0x811c9dc5;
  for (const char of seed) {
    hash ^= char.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  // Mix once more so short, similar seeds do not share prefixes.
  hash = Math.imul(hash ^ (hash >>> 15), 0x2c1b3c6d) >>> 0;
  return hash.toString(16).padStart(8, "0").slice(0, 7);
}
