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
        "Software Engineer focused on building high-impact digital experiences, with leadership in IT strategy, fullstack development, and technical mentoring.",
      titleI6: "See my work",
      titleI7: "Contact me",
      titleA: "My entire",
      titleA1: "professional career",
      titleA2: "Software engineer",
      counters: {
        title1: "Years of experience",
        title2: "Satisfied customers",
        title3: "Projects completed",
        title4: "Awards won",
      },
      timeline: {
        title1: "Software Engineering Graduate",
        subtitle1: "Universidad Libre de Pereira",
        description1:
          "Graduated in Software Engineering from Universidad Libre de Pereira, with strong foundations in software architecture, web application development, and technical problem solving.",
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
      titleS3: "Contact me",
      pageserv: {
        title1: "🤠 Hi, I am Nicolas. I am a Software Engineer.",
        title2: "🧠 I am currently working as IT Director at FH Velez Abogados.",
        title3: "😎 I continuously strengthen my skills in TypeScript, Next.js, React, Databases, Python, and Cybersecurity.",
        title4: "🥸 I also mentor students in Ministry of Education bootcamps.",
        title5:
          "🗣️ Ask me about IT leadership, SQL, JavaScript, PostgreSQL, MongoDB, Node.js, TypeScript, Python, Java, and more.",
      },
      webdevelop: {
        title: "Web development",
        description:
          "React development implementing dynamic interfaces Optimization with Next.js for faster loading. Responsive design for mobile and desktop devices.",
      },
      backenddev: {
        title: "Backend Development",
        description:
          "Backend application development using Node.js to build fast and scalable solutions with Express.js and MongoDB.",
      },
      titleP1: "My latest",
      titleP2: "completed projects",
      titleT1: "Some comments",
      titleT2: "from our clients",

      testimonial1: {
        title: "Juan Esteban Villada",
        description:"This platform has exceeded my expectations in every way. The features are robust and the performance is outstanding.  I highly recommend this developer to anyone looking for a reliable and efficient solution.",
      },
      testimonial2: {
        title: "Juan Jose Duque",
        description: "I had an exceptional experience with this platform. The user interface is intuitive and easy to navigate. The customer support team is responsive and very helpful. I was able to achieve my goals efficiently and effectively.",
      },


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
        "Ingeniero de Software enfocado en crear experiencias digitales de alto impacto, con liderazgo en estrategia TI, desarrollo fullstack y mentoría técnica.",
      titleI6: "Ver mi trabajo",
      titleI7: "Contáctame",
      titleA: "Toda mi",
      titleA1: "carrera profesional",
      titleA2: "Ingeniero de software",
      counters: {
        title1: "Años de experiencia",
        title2: "Clientes satisfechos",
        title3: "Proyectos completados",
        title4: "Premios ganados",
      },
      timeline: {
        title1: "Ingeniero de Software Graduado",
        subtitle1: "Universidad Libre de Pereira",
        description1:
          "Graduado en Ingeniería de Software de la Universidad Libre de Pereira, con bases sólidas en arquitectura de software, desarrollo de aplicaciones web y resolución de problemas técnicos.",
        title2: "Director de TI",
        subtitle2: "FH Velez Abogados",
        description2:
          "Desde enero de 2026 lidero el área de TI en FH Velez Abogados, definiendo estrategia tecnológica, coordinando implementaciones y mejorando la eficiencia operativa mediante soluciones digitales.",
        title3: "Monitor de Bootcamps Talento Tech",
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
      titleS3: "Contactame",
      pageserv: {
        title1: "🤠 ¡Hola! Soy Nicolas. Soy ingeniero de software.",
        title2: "🧠 Actualmente me desempeño como Director de TI en FH Velez Abogados.",
        title3: "😎 Fortalezco continuamente mis habilidades en TypeScript, Next.js, React, Bases de datos, Python y Ciberseguridad.",
        title4: "🥸 También soy monitor de estudiantes en bootcamps del Ministerio de Educación.",
        title5:
          "🗣️ Pregúntame sobre liderazgo TI, SQL, JavaScript, PostgreSQL, MongoDB, Node.js, TypeScript, Python, Java y mucho más.",
      },
      webdevelop: {
        title: "Desarrollo web",
        description:
          "Desarrollo de React implementando interfaces dinámicas Optimización con Next.js para una carga más rápida. Diseño responsivo para dispositivos móviles y de escritorio.",
        
      },
      backenddev: {
        title: "Desarrollo Backend",
        description:
          "Desarrollo de aplicaciones backend utilizando Node.js para construir soluciones rápidas y escalables con Express.js y MongoDB.",
      },
      titleP1: "Mis ultimos",
      titleP2: "proyectos completados",
      titleT1: "Algunos comentarios",
      titleT2: "de nuestros clientes",
      testimonial1: {
        title: "Juan Esteban Villada",
        description:"Esta plataforma ha superado mis expectativas en todos los sentidos. Las funciones son robustas y el rendimiento es excepcional. Recomiendo encarecidamente a este desarrollador a recomiendo al 100%",
      },
      testimonial2: {
        title: "Juan Jose Duque",
        description: "Tuve una experiencia excepcional con esta plataforma. La interfaz de usuario es intuitiva y fácil de navegar. El equipo de soporte al cliente es receptivo y muy servicial. Pude lograr mis objetivos de manera eficiente y efectiva.",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
