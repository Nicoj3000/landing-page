// Rasterizes the NX monogram (public/favicon.svg) into the PNG icon set:
//   apple-touch-icon.png (180, opaque), icon-192.png, icon-512.png (rounded, "any"),
//   icon-maskable-512.png (full-bleed, logo inside the 80% safe zone).
// Outputs are committed; rerun only when the monogram changes.
// Usage: node scripts/generate-icons.mjs
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const publicUrl = (name) => new URL(`../public/${name}`, import.meta.url);
const rounded = readFileSync(publicUrl("favicon.svg"));

const INK = "#0A0C0F";
const LIME = "#C8F03C";

// Same strokes as favicon.svg (64x64 grid), on a full-bleed square. `scale` shrinks the
// mark around the center to leave a margin; the logo spans roughly x 10..56 / y 14..50.
const fullBleed = (scale) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${INK}"/>
  <g transform="translate(32 32) scale(${scale}) translate(-32 -32)" fill="none" stroke="${LIME}" stroke-width="6">
    <path d="M13 47V17l19 30V17" stroke-linejoin="miter" stroke-miterlimit="8"/>
    <path d="M39 17l14 30M53 17L39 47"/>
  </g>
</svg>`;

const png = (svg, size) => sharp(Buffer.from(svg), { density: 512 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

const outputs = [
  ["apple-touch-icon.png", await png(fullBleed(1.05), 180)],
  ["icon-192.png", await png(rounded, 192)],
  ["icon-512.png", await png(rounded, 512)],
  ["icon-maskable-512.png", await png(fullBleed(0.72), 512)],
];
for (const [name, bytes] of outputs) writeFileSync(publicUrl(name), bytes);
console.log(outputs.map(([name, bytes]) => `${name} (${bytes.length} B)`).join("\n"));
