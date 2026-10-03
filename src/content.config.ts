import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** A string that must exist in every supported locale. */
const localized = z.object({ es: z.string().min(1), en: z.string().min(1) });

/** Service icons are referenced by name; the UI maps them to inline SVGs. */
export const SERVICE_ICONS = ["laptop", "server", "code-square", "target", "speech"] as const;

export const SKILL_CATEGORIES = ["language", "frontend", "backend", "data", "infra", "tools"] as const;

const json = (base: string) => glob({ pattern: "**/*.json", base: `./src/content/${base}` });

// One file per project: adding a project is just adding a file.
const projects = defineCollection({
  loader: json("projects"),
  schema: ({ image }) =>
    z.object({
      order: z.number().int().positive(),
      title: z.string().min(1),
      description: localized,
      image: image(),
      repoUrl: z.url().optional(),
      demoUrl: z.url().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

const services = defineCollection({
  loader: json("services"),
  schema: z.object({
    order: z.number().int().positive(),
    icon: z.enum(SERVICE_ICONS),
    title: localized,
    description: localized,
  }),
});

const timeline = defineCollection({
  loader: json("timeline"),
  schema: z.object({
    order: z.number().int().positive(),
    title: localized,
    subtitle: localized,
    description: localized,
    date: localized,
  }),
});

// `icon` is the slug of an SVG in src/assets/icons (see scripts/generate-skill-icons.mjs).
// `tone: "mono"` icons use currentColor so they follow the active theme.
const skills = defineCollection({
  loader: json("skills"),
  schema: z.object({
    order: z.number().int().positive(),
    name: z.string().min(1),
    icon: z.string().min(1),
    category: z.enum(SKILL_CATEGORIES),
    tone: z.enum(["brand", "mono"]).default("brand"),
  }),
});

const counters = defineCollection({
  loader: json("counters"),
  schema: z.object({
    order: z.number().int().positive(),
    value: z.number().int().nonnegative(),
    label: localized,
  }),
});

export const collections = { projects, services, timeline, skills, counters };
