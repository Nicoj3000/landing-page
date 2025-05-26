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
        "On the path to becoming a Fullstack Developer to create fantastic digital experiences, eager to learn more every day.",
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
        title1: "Software engineer",
        subtitle1: "Universidad Libre de Pereira",
        description1:
          "I am in the 8th semester of software engineering at the Universidad Libre de Pereira, where I am acquiring technical skills and specialized knowledge in software development and web application design.",
        title2: "Developer Frontend and Backend",
        subtitle2: "Own Studio",
        description2:
          "Throughout my career, I have acquired skills in frontend and backend development, which has allowed me to work on challenging projects and collaborate with multidisciplinary teams, with experience in technologies such as React, Node.js, MongoDB, SQL, Postgres, TypeScript, JavaScript, HTML, CSS, Python among others.",
          title3: "Web Developer",
          subtitle3: "Senica SAS",
          description3: "Implemented the website for Senica SAS, developing a responsive and optimized platform using HTML, CSS, JavaScript, React, and Node.js.",
          title4: "Junior Developer",
          subtitle4: "Hidroconsultora",
          description4: "Developed a route optimization program in Python, implementing efficient algorithms to reduce transportation times and costs. Used libraries like NetworkX, Pandas, and Geopy for data analysis and processing. Also worked on integration with map APIs.",
        },
      titleS1: "My",
      titleS2: "services",
      titleS3: "Contact me",
      pageserv: {
        title1: "🤠 Hi i`m Nicolas. I am a software engineer.",
        title2: "🧠 I`m currently a student.",
        title3: "😎 I`m currently learning TypeScript, Nextjs, React, Base de datos, Python, Cybersecurity.",
        title4: "🥸 I`m looking to collaborate on projects.",
        title5:
          "🗣️ Ask me about SQL, JavaScript, Postgres, MongoDB, NodeJS, TypeScript, Python, Java and much more.",
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
        "En el camino para convertirme en un Desarrollador Fullstack para crear experiencias digitales fantásticas, ansioso por aprender más cada día.",
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
        title1: "Ingeniero de software",
        subtitle1: "Universidad Libre de Pereira",
        description1:
          "Estoy en el octavo semestre de ingeniería de software en la Universidad Libre de Pereira, donde estoy adquiriendo habilidades técnicas y conocimientos especializados en desarrollo de software y diseño de aplicaciones web.",
        title2: "Desarrollador Frontend y Backend",
        subtitle2: "Estudio Propio",
        description2:
          "A lo largo de mi carrera, he adquirido habilidades en desarrollo frontend y backend, lo que me ha permitido trabajar en proyectos desafiantes y colaborar con equipos multidisciplinarios, con experiencia en tecnologías como React, Node.js, MongoDB, SQL, Postgres, TypeScript, JavaScript, HTML, CSS, Python, entre otros.",
          title3: "Desarrollador Web",
          subtitle3: "Senica SAS",
          description3: "Implementación de la página web para la empresa Senica SAS, desarrollando una plataforma responsiva y optimizada. Utilicé tecnologías como HTML, CSS, JavaScript, React y Node.js.",
          title4: "Desarrollador Junior",
          subtitle4: "Hidroconsultora",
          description4: "Desarrollo de un programa de optimización de rutas en Python, implementando algoritmos eficientes para reducir tiempos y costos de transporte. Utilicé bibliotecas como NetworkX, Pandas y Geopy para el análisis y procesamiento de datos. Además, trabajé en la integración con APIs de mapas.",
        },
      titleS1: "Mis",
      titleS2: "servicios",
      titleS3: "Contactame",
      pageserv: {
        title1: "🤠 ¡Hola! Soy Nicolas. Soy ingeniero de software.",
        title2: "🧠 Actualmente soy estudiante.",
        title3: "😎 Actualmente estoy aprendiendo TypeScript, Nextjs, React, Base de datos, Python, Ciberseguridad.",
        title4: "🥸 Estoy buscando colaborar en proyectos.",
        title5:
          "🗣️ Pregúntame sobre SQL, JavaScript, Postgres, MongoDB, NodeJS, TypeScript, Python, Java y mucho más.",
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
