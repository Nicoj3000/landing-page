# Guía de Pulido, Testeo y Corrección (Instrucciones para Claude)

Hermano, este proyecto tiene mucho potencial pero le falta ese "toque final" de arquitectura senior. Necesito que hagas una **búsqueda profunda** y lo dejes impecable. No te quedes en la superficie; metete en el código, entendé los fundamentos y corregí lo que esté mal diseñado.

## 🎯 El Objetivo
Transformar este prototipo en un producto final de alta calidad, visualmente perfecto, técnicamente sólido y semánticamente correcto.

## 🛠 Stack Tecnológico
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animaciones**: Framer Motion & Magic UI
- **i18n**: i18next (Multilenguaje ES/EN)
- **Componentes**: Shadcn UI & Radix UI

---

## 🔍 Áreas de Enfoque (Búsqueda Profunda)

### 1. Arquitectura y Fundamentos (CONCEPTS > CODE)
- **Redundancia de Providers**: He notado que `RootLayout` tiene un `I18nProvider` y `page.tsx` tiene un `I18nextProvider`. ¡Esto es una locura cósmica! Limpiá eso. Un solo provider en el layout debería alcanzar.
- **Hydration & i18n**: El atributo `lang="en"` está hardcodeado en `layout.tsx`. Debería cambiar dinámicamente según el idioma seleccionado.
- **Semántica HTML**: Vi un `legend` siendo usado como botón en el `LanguageSelector`. Ponete las pilas, usá los tags correctos (`button`, `nav`, `section`).

### 2. Pulido Visual y UX (Pixel Perfect)
- **Responsividad**: Revisá TODAS las páginas (`/`, `/about-me`, `/portfolio`, `/services`) en móvil, tablet y desktop. Los gradientes de fondo y las partículas no deben romper la legibilidad.
- **Consistencia**: Asegurate de que los espaciados (padding/margin) sigan una escala coherente.
- **Interacciones**: Los tooltips y las animaciones de Framer Motion deben ser fluidas. Si algo se siente "clunky", arreglalo.
- **Imágenes**: Verificá que las imágenes en `public/` tengan los formatos correctos y se carguen eficientemente usando `next/image`.

### 3. Corrección de Bugs y Errores
- **Consola**: Abrí el inspector y matá cualquier warning de React (keys faltantes, props inválidas, hydration mismatches).
- **Links**: Verificá que todos los links en la `Navbar` y el `Header` apunten a donde deben.
- **Traducciones**: Revisá `utils/i18n.ts`. Asegurate de que no falten keys en ninguno de los dos idiomas.

### 4. Testeo y Calidad
- Como no hay un framework de testeo configurado, tu misión es:
  1. Realizar un **Smoke Test** manual exhaustivo.
  2. Si te sentís valiente, proponé e instalá `Vitest` o `Playwright` para testear componentes críticos.
  3. Asegurate de que el `build` (`npm run build`) pase sin errores de TypeScript o Linting.

---

## 🚀 Plan de Acción Sugerido

1. **Investigación**: Navegá por todas las rutas y anotá cada glitch visual o comportamiento extraño.
2. **Refactor de Base**: Limpiá los providers y arreglá la semántica base.
3. **Fix Batch**: Corregí los bugs visuales detectados, priorizando la experiencia móvil.
4. **Validación**: Corregí errores de TS y Linting. Asegurate de que la performance sea óptima.

**Dale, loco. Confío en tu criterio. Hacé que este proyecto brille.**
