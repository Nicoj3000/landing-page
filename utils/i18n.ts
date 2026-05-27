import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      titleI: "If you can think it,",
      titleI1: "you can program it",
      titleI2: "you can design it",
      titleI3: "you can create it",
      titleI4: "you can build it",
      titleI5:
        "Systems Engineer focused on building high-impact digital experiences, with leadership in IT strategy, fullstack development, and technical mentoring.",
      titleI6: "See my work",
      titleI7: "Download CV",
      titleA: "My entire",
      titleA1: "professional career",
      titleA2: "Systems engineer",
      counters: {
        title1: "Years of experience",
        title2: "Satisfied customers",
        title3: "Projects completed",
        title4: "Technologies",
      },
      timeline: {
        title1: "Systems Engineering",
        subtitle1: "Universidad Libre de Pereira",
        description1:
          "Graduated in Systems Engineering from Universidad Libre de Pereira, with strong foundations in software architecture, web application development, and technical problem solving.",
        title2: "IT Director",
        subtitle2: "FH Velez Abogados",
        description2:
          "Since January 2026, I have been leading the IT area at FH Velez Abogados, defining technology strategy, coordinating implementations, and improving operational efficiency through digital solutions.",
        title3: "Bootcamp Mentor",
        subtitle3: "Ministry of Education Talento Tech",
        description3:
          "I support bootcamp classes as a mentor, guiding students in practical exercises, reinforcing programming fundamentals, and helping them build real-world projects.",
        title4: "Fullstack Developer",
        subtitle4: "Previous Professional Experience",
        description4:
          "Built web platforms and automation solutions for organizations such as Senica SAS and Hidroconsultora, using React, Next.js, Node.js, TypeScript, Python, SQL, and MongoDB.",
      },
      titleS1: "My",
      titleS2: "services",
      titleS3: "Download CV",
      pageserv: {
        title1:
          "Systems Engineer building fullstack products for legal, education, and business teams.",
        title2:
          "I currently lead IT strategy and execution, aligning technology with measurable business goals.",
        title3:
          "Core stack: TypeScript, React, Next.js, Node.js, SQL, MongoDB, and Python.",
        title4:
          "I design scalable architecture, clean APIs, and maintainable codebases for long-term growth.",
        title5:
          "I also mentor developers and teams to improve code quality and delivery speed.",
      },
      webdevelop: {
        title: "Web development",
        description:
          "Modern interfaces with React and Next.js, optimized for performance, UX, and responsive behavior on desktop, tablet, and mobile.",
      },
      backenddev: {
        title: "Backend Development",
        description:
          "Backend systems with Node.js, API-first architecture, secure authentication, and robust integrations built for scalability.",
      },
      fullstack: {
        title: "Fullstack Product Delivery",
        description:
          "End-to-end implementation from idea to deployment, with UX-focused frontend, stable backend, and iterative delivery.",
      },
      itstrategy: {
        title: "IT Strategy and Architecture",
        description:
          "Technical roadmap, architecture decisions, and process improvements to reduce risk and accelerate delivery.",
      },
      mentoring: {
        title: "Technical Mentoring",
        description:
          "Mentoring for developers and teams in code quality, problem solving, and project structure with practical best practices.",
      },
      titleP1: "My latest",
      titleP2: "completed projects",
    },
  },
  es: {
    translation: {
      titleI: "Si puedes pensarlo,",
      titleI1: "puedes programarlo",
      titleI2: "puedes diseñarlo",
      titleI3: "puedes crearlo",
      titleI4: "puedes construirlo",
      titleI5:
        "Ingeniero de Sistemas enfocado en crear experiencias digitales de alto impacto, con liderazgo en estrategia TI, desarrollo fullstack y mentoría técnica.",
      titleI6: "Ver mi trabajo",
      titleI7: "Descargar CV",
      titleA: "Toda mi",
      titleA1: "carrera profesional",
      titleA2: "Ingeniero de Sistemas",
      counters: {
        title1: "Años de experiencia",
        title2: "Clientes satisfechos",
        title3: "Proyectos completados",
        title4: "Tecnologías",
      },
      timeline: {
        title1: "Ingeniero de Sistemas",
        subtitle1: "Universidad Libre de Pereira",
        description1:
          "Graduado en Ingeniería de Sistemas de la Universidad Libre de Pereira, con bases sólidas en arquitectura de software, desarrollo de aplicaciones web y resolución de problemas técnicos.",
        title2: "Director de TI",
        subtitle2: "FH Velez Abogados",
        description2:
          "Desde enero de 2026 lidero el área de TI en FH Velez Abogados, definiendo estrategia tecnológica, coordinando implementaciones y mejorando la eficiencia operativa mediante soluciones digitales.",
        title3: "Monitor Talento Tech",
        subtitle3: "Ministerio de Educación",
        description3:
          "Apoyo procesos formativos como monitor en bootcamps, acompañando clases, reforzando fundamentos de programación y guiando a estudiantes en proyectos prácticos.",
        title4: "Desarrollador Fullstack",
        subtitle4: "Experiencia Profesional Previa",
        description4:
          "Desarrollé plataformas web y soluciones de automatización para organizaciones como Senica SAS e Hidroconsultora, usando React, Next.js, Node.js, TypeScript, Python, SQL y MongoDB.",
      },
      titleS1: "Mis",
      titleS2: "servicios",
      titleS3: "Descargar CV",
      pageserv: {
        title1:
          "Ingeniero de Sistemas que construye productos fullstack para equipos legales, educativos y empresariales.",
        title2:
          "Lidero estrategia y ejecución de TI, alineando tecnología con objetivos de negocio medibles.",
        title3:
          "Stack principal: TypeScript, React, Next.js, Node.js, SQL, MongoDB y Python.",
        title4:
          "Diseño arquitectura escalable, APIs limpias y código mantenible para crecimiento a largo plazo.",
        title5:
          "También mentoreo desarrolladores y equipos para mejorar calidad de código y velocidad de entrega.",
      },
      webdevelop: {
        title: "Desarrollo web",
        description:
          "Interfaces modernas con React y Next.js, optimizadas para rendimiento, UX y experiencia responsive en desktop, tablet y móvil.",
      },
      backenddev: {
        title: "Desarrollo Backend",
        description:
          "Sistemas backend con Node.js, arquitectura API-first, autenticación segura e integraciones robustas orientadas a escalabilidad.",
      },
      fullstack: {
        title: "Entrega de Producto Fullstack",
        description:
          "Implementación end-to-end desde la idea hasta el despliegue, con frontend orientado a UX y backend estable.",
      },
      itstrategy: {
        title: "Estrategia y Arquitectura TI",
        description:
          "Roadmap técnico, decisiones de arquitectura y mejora de procesos para reducir riesgo y acelerar entregas.",
      },
      mentoring: {
        title: "Mentoría Técnica",
        description:
          "Mentoría para desarrolladores y equipos en calidad de código, resolución de problemas y estructura de proyectos.",
      },
      titleP1: "Mis últimos",
      titleP2: "proyectos completados",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
