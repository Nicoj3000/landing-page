# Tema claro + Animated Theme Toggler — Diseño

**Fecha**: 2026-06-12
**Estado**: aprobado por el usuario

## Objetivo

Agregar soporte de tema claro/oscuro al portfolio con el componente
`AnimatedThemeToggler` de MagicUI (View Transitions API, variante **circle**),
integrado en modo controlado con `next-themes`.

Decisiones de producto (confirmadas por el usuario):

- **Tema inicial**: según el sistema operativo del visitante (`defaultTheme="system"`).
- **Variante de animación**: circle (expande desde el botón).
- **Integración**: modo controlado con `next-themes` (`theme` + `onThemeChange`).
- El tema oscuro actual queda **visualmente idéntico** — es el `.dark`.

## Arquitectura

### 1. Infraestructura de theming

- Reinstalar `next-themes`.
- `components/theme-provider.tsx`: wrapper de `NextThemesProvider`.
- `app/layout.tsx`: envolver con `<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>`; agregar `suppressHydrationWarning` a `<html>`.
- `tailwind.config.ts` ya tiene `darkMode: ["class"]` — sin cambios de modo.

### 2. Tokens semánticos de color

Variables CSS en `globals.css`, formato RGB triplet para soportar el
modificador de opacidad de Tailwind (`bg-card/60`):

| Token | Claro (`:root`) | Oscuro (`.dark`) | Reemplaza |
|-------|-----------------|-------------------|-----------|
| `--background` | `#f4f6fb` | `#070b14` (darkBg actual) | fondo body |
| `--foreground` | `#0f172a` | `#f1f5f9` (slate-100) | texto principal |
| `--muted-foreground` | `#475569` | `#94a3b8` (slate-400) | texto secundario |
| `--card` | `#ffffff` | `#0d1326` | fondos de tarjetas |
| `--card-deep` | `#eef1f8` | `#090e1d` | fondos profundos (marcos de imagen) |
| `--border-soft` | `#0f172a` al 10% | `#ffffff` al 10-12% | bordes de tarjetas |
| `--accent` | `#3f5cff` | `#3f5cff` | sin cambio (ya es `secondary`) |

Expuestos en `tailwind.config.ts` como `background`, `foreground`,
`muted-foreground`, `card`, `card-deep`, `border-soft` con `<alpha-value>`.

Los gradientes decorativos complejos (cards con `linear-gradient` rgba fijo,
gradiente del título del hero, glass) se resuelven con clases utilitarias
propias en `globals.css` que cambian bajo `.dark`, no con tokens por canal.

### 3. Componentes a migrar (colores hardcodeados → tokens)

`app/layout.tsx` (body), `globals.css` (glass, glass-card, loader),
`components/introduction.tsx`, `header.tsx`, `navbar.tsx` (ya usa
`bg-background` de shadcn — unificar), `portfolio-box.tsx`,
`slider-services.tsx`, `skills-section.tsx`, `time-line.tsx`,
`counter-services.tsx`, `scroll-to-top.tsx`, `languageSwitcher.tsx`,
`download-cv-button.tsx`, `ui/card.tsx`, `ui/separator.tsx`.

Casos con lógica (no solo CSS):

- **`cover-particles.tsx`**: partículas y links blancos son invisibles en
  claro. Lee `resolvedTheme` de `useTheme` y usa `#334155` en claro /
  `#ffffff` en oscuro. Remontar `Particles` al cambiar tema (key).
- **Gradiente del título del hero** (`from-neutral-50 to-neutral-400`):
  clase utilitaria que invierte a slate oscuro en claro.
- **`ui/spotlight.tsx` / `ui/dotted-map.tsx`**: fills via props ya
  existentes; ajustar valores por tema donde el contraste lo requiera.

### 4. Toggler

- `components/ui/animated-theme-toggler.tsx`: código MagicUI con dos ajustes:
  1. **Guard de `prefers-reduced-motion`** (el original no lo trae): si el
     usuario lo pide, cambia el tema sin `startViewTransition`.
  2. El código upstream se conserva completo (incluida la rama no
     controlada con `localStorage`, que queda inerte): en este proyecto el
     componente se usa **siempre en modo controlado** por `next-themes`,
     pasando `theme` y `onThemeChange`. Mantenerlo fiel al upstream
     facilita actualizarlo después.
- CSS requerido en `globals.css`: reset de `::view-transition-old/new(root)`
  y duración scoped via `html[data-magicui-theme-vt="active"]`.
- Ubicación: `header.tsx`, junto a `LanguageSelector`. Guard de montaje
  (`useEffect` + estado `mounted`) para evitar mismatch de hidratación.

## Manejo de errores y fallbacks

- Navegador sin View Transitions API → toggle instantáneo (ya en upstream).
- `prefers-reduced-motion` → toggle sin animación (mejora propia).
- Flash de tema incorrecto al cargar → script inline de `next-themes`.
- `resolvedTheme` indefinido en SSR → guard de montaje en el botón.

## Orden de implementación

1. Tokens + provider + migración de componentes a tokens, con `.dark`
   reproduciendo el sitio actual **antes** de diseñar el claro (sin
   regresión visual en oscuro).
2. Paleta clara: valores `:root` + casos con lógica (partículas, gradientes).
3. Toggler: componente + CSS + integración en header.

## Testing

- `tsc --noEmit` y `next lint` en cada paso.
- Smoke E2E de Playwright existente debe seguir verde (asume tema por
  defecto del entorno CI).
- Verificación manual en ambos temas: hero (gradiente, Spline, spotlight),
  partículas, portfolio, servicios, about (timeline, counters, mapa, icon
  cloud), navbar/dock, selector de idioma, scroll-to-top.
- Toggle con reduced-motion activado: cambia sin animación.

## Fuera de alcance

- Migración a `next-intl` (pendiente aparte).
- Cambios de contenido o layout.
