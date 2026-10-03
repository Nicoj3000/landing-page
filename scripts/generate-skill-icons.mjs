// Writes brand SVGs into src/assets/icons from the `simple-icons` package so
// the site never fetches icons from a CDN at runtime.
// Usage: node scripts/generate-skill-icons.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import * as simpleIcons from "simple-icons";

const OUT = new URL("../src/assets/icons/", import.meta.url);

// slug -> fill. "currentColor" = monochrome brand that follows the theme.
const ICONS = {
  typescript: "#3178C6",
  javascript: "#F7DF1E",
  react: "#61DAFB",
  nextdotjs: "currentColor",
  nodedotjs: "#339933",
  express: "currentColor",
  nestjs: "#E0234E",
  python: "#3776AB",
  django: "currentColor",
  prisma: "currentColor",
  mongodb: "#47A248",
  postgresql: "#4169E1",
  mysql: "#4479A1",
  supabase: "#3ECF8E",
  docker: "#2496ED",
  vercel: "currentColor",
  netlify: "#00C7B7",
  tailwindcss: "#06B6D4",
  sass: "#CC6699",
  html5: "#E34F26",
  css: "#1572B6",
  git: "#F05032",
  github: "currentColor",
  vite: "#646CFF",
  figma: "#F24E1E",
  linux: "#FCC624",
};

mkdirSync(OUT, { recursive: true });
for (const [slug, fill] of Object.entries(ICONS)) {
  const key = `si${slug[0].toUpperCase()}${slug.slice(1)}`;
  const icon = simpleIcons[key];
  if (!icon) throw new Error(`simple-icons has no icon for "${slug}"`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fill}"><path d="${icon.path}"/></svg>\n`;
  writeFileSync(new URL(`${slug}.svg`, OUT), svg);
}
console.log(`wrote ${Object.keys(ICONS).length} icons`);
