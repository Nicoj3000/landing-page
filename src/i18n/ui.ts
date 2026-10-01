/**
 * UI dictionaries. Strings that belong to repeatable content (projects,
 * services, timeline, counters) live in src/content collections instead.
 * Keys are typed from the Spanish (default) dictionary, so a missing English
 * key is a type error.
 */
export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_LABEL: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

const es = {
  "nav.home": "Inicio",
  "nav.about": "Sobre mí",
  "nav.services": "Mis servicios",
  "nav.portfolio": "Portafolio",
  "nav.mail": "Correo",
  "hero.lead": "Si puedes pensarlo,",
  "hero.verb1": "puedes programarlo",
  "hero.verb2": "puedes diseñarlo",
  "hero.verb3": "puedes crearlo",
  "hero.verb4": "puedes construirlo",
  "hero.summary": "Ingeniero de Sistemas enfocado en crear experiencias digitales de alto impacto, con liderazgo en estrategia TI, desarrollo fullstack y mentoría técnica.",
  "hero.ctaWork": "Ver mi trabajo",
  "cta.downloadCv": "Descargar CV",
  "about.titleLead": "Toda mi",
  "about.titleEmphasis": "carrera profesional",
  "services.titleLead": "Mis",
  "services.titleEmphasis": "servicios",
  "services.ctaCv": "Descargar CV",
  "services.intro1": "Ingeniero de Sistemas que construye productos fullstack para equipos legales, educativos y empresariales.",
  "services.intro2": "Lidero estrategia y ejecución de TI, alineando tecnología con objetivos de negocio medibles.",
  "services.intro3": "Stack principal: TypeScript, React, Next.js, Node.js, SQL, MongoDB y Python.",
  "services.intro4": "Diseño arquitectura escalable, APIs limpias y código mantenible para crecimiento a largo plazo.",
  "services.intro5": "También mentoreo desarrolladores y equipos para mejorar calidad de código y velocidad de entrega.",
  "stack.titleLead": "Mi",
  "stack.titleEmphasis": "stack tecnológico",
  "stack.subtitle": "Tecnologías que uso en mis proyectos",
  "stack.eyebrow": "Stack",
  "location.titleLead": "Desde",
  "location.titleEmphasis": "Colombia",
  "location.cities": "Bogotá · Pereira · Medellín",
  "location.eyebrow": "Ubicación",
  "location.availableRemote": "Disponible para colaborar de forma remota",
  "portfolio.titleLead": "Mis últimos",
  "portfolio.titleEmphasis": "proyectos completados",
  "a11y.profilePicAlt": "Foto de perfil",
  "a11y.loading3d": "Cargando escena 3D",
  "a11y.scrollToTop": "Volver arriba",
  "a11y.iconCloudLabel": "Nube de íconos 3D interactiva",
  "nav.label": "Navegación principal",
  "a11y.skipToContent": "Saltar al contenido",
  "site.name": "Nicolás Delgado",
  "site.description":
    "Ingeniero de Sistemas enfocado en crear experiencias digitales de alto impacto, con liderazgo en estrategia TI, desarrollo fullstack y mentoría técnica.",
} as const;

export type UiKey = keyof typeof es;

const en: Record<UiKey, string> = {
  "nav.home": "Home",
  "nav.about": "About me",
  "nav.services": "My services",
  "nav.portfolio": "Portfolio",
  "nav.mail": "Mail",
  "hero.lead": "If you can think it,",
  "hero.verb1": "you can program it",
  "hero.verb2": "you can design it",
  "hero.verb3": "you can create it",
  "hero.verb4": "you can build it",
  "hero.summary": "Systems Engineer focused on building high-impact digital experiences, with leadership in IT strategy, fullstack development, and technical mentoring.",
  "hero.ctaWork": "See my work",
  "cta.downloadCv": "Download CV",
  "about.titleLead": "My entire",
  "about.titleEmphasis": "professional career",
  "services.titleLead": "My",
  "services.titleEmphasis": "services",
  "services.ctaCv": "Download CV",
  "services.intro1": "Systems Engineer building fullstack products for legal, education, and business teams.",
  "services.intro2": "I currently lead IT strategy and execution, aligning technology with measurable business goals.",
  "services.intro3": "Core stack: TypeScript, React, Next.js, Node.js, SQL, MongoDB, and Python.",
  "services.intro4": "I design scalable architecture, clean APIs, and maintainable codebases for long-term growth.",
  "services.intro5": "I also mentor developers and teams to improve code quality and delivery speed.",
  "stack.titleLead": "My",
  "stack.titleEmphasis": "tech stack",
  "stack.subtitle": "Technologies I use in my projects",
  "stack.eyebrow": "Stack",
  "location.titleLead": "Based in",
  "location.titleEmphasis": "Colombia",
  "location.cities": "Bogotá · Pereira · Medellín",
  "location.eyebrow": "Location",
  "location.availableRemote": "Available for remote collaboration",
  "portfolio.titleLead": "My latest",
  "portfolio.titleEmphasis": "completed projects",
  "a11y.profilePicAlt": "Profile picture",
  "a11y.loading3d": "Loading 3D scene",
  "a11y.scrollToTop": "Back to top",
  "a11y.iconCloudLabel": "Interactive 3D icon cloud",
  "nav.label": "Main navigation",
  "a11y.skipToContent": "Skip to content",
  "site.name": "Nicolás Delgado",
  "site.description":
    "Systems Engineer focused on building high-impact digital experiences, with leadership in IT strategy, fullstack development, and technical mentoring.",
};

export const ui: Record<Locale, Record<UiKey, string>> = { es, en };
