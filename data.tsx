import { BookText, CodeSquare, HomeIcon, UserRound, Linkedin, Twitter, Rss, Twitch, Youtube, Crop, Pencil, Computer, Book, Rocket, Speech, X, Instagram, Github, Laptop, Server } from "lucide-react";

export const socialNetworks = [
    {
        id: 4,
        logo: <Github size={30} strokeWidth={1} />,
        src: "https://github.com/Nicoj3000",
    },
    

    {
        id: 3,
        logo: <X size={30} strokeWidth={1} />,
        src: "https://x.com/Nicoj3000",
    },

    {
        id: 5,
        logo: <Twitch size={30} strokeWidth={1} />,
        src: "https://www.twitch.tv/nicoj_3000",
    },
    {
        id: 2,
        logo: <Linkedin size={30} strokeWidth={1} />,
        src: "https://www.linkedin.com/in/nicolas-delgado-6b22372b7/",
    },
];


export const itemsNavbar = [
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon size={25} color="#fff" strokeWidth={1} />,
        link: "/",
    },
    {
        id: 2,
        title: "User",
        icon: <UserRound size={25} color="#fff" strokeWidth={1} />,
        link: "/about-me",
    },
    {
        id: 3,
        title: "Book",
        icon: <BookText size={25} color="#fff" strokeWidth={1} />,
        link: "/services",
    },
    {
        id: 4,
        title: "Target",
        icon: <CodeSquare size={25} color="#fff" strokeWidth={1} />,
        link: "/portfolio",
    },
    {
        id: 5,
        title: "Home",
        icon: <Speech size={25} color="#fff" strokeWidth={1} />,
        link: "/testimonials",
    },
];

export const dataAboutPage = [
    {
        id: 1,
        title: "Software engineer",
        subtitle: "Universidad libre de Pereira",
        description: "Estoy en 8 semestre de ingeniería de software en la Universidad Libre de Pereira, donde estoy adquiriendo habilidades técnicas y conocimientos especializados en desarrollo de software y diseño de aplicaciones web.",
        date: "2021 - 2024 ",
    },
    {
        id: 2,
        title: "Developer Frontend and Backend",
        subtitle: "Estudio propio",
        description: "A lo largo de mi carrera, he adquirido habilidades en desarrollo frontend y backend, lo que me ha permitido trabajar en proyectos desafiantes y colaborar con equipos multidisciplinarios, con experiencia en tecnologías como React, Node.js, MongoDB, SQL, Postgres, TypeScript, JavaScript, HTML, CSS, Python entre otros.",
        date: "Sep 2024",
    },

]

export const dataCounter = [
    {
        id: 0,
        endCounter: 1,
        text: "Años de experiencia",
        lineRight: true,
        lineRightMobile: true,
    },
    {
        id: 1,
        endCounter: 2,
        text: "Clientes satisfechos",
        lineRight: true,
        lineRightMobile: false,
    },
    {
        id: 2,
        endCounter: 4,
        text: "Proyectos finalizados",
        lineRight: true,
        lineRightMobile: true,
    },
    {
        id: 3,
        endCounter: 0,
        text: "Premios ganadores",
        lineRight: false,
        lineRightMobile: false,
    },
];

export const serviceData = [
    {
        icon: <Laptop />,
        title: "Web development",
        description: "React Development implementing dynamic interfaces Optimization with Next.js for faster loading."


    },

    {
        icon: <Server />,
        title: "Backend Development",
        description: "Developing backend applications using Node.js for building fast and scalable solutions",
    },

];

export const dataPortfolio = [
    {
        id: 1,
        title: "Project Dashboard",
        image: "/image-1.jpg",
        urlGithub: "https://github.com/Nicoj3000/Project-Dashboard",
        urlDemo: "https://dashboard-nicodev.netlify.app/",
    },
    {
        id: 2,
        title: "Vale-project",
        image: "/image-2.jpg",
        urlGithub: "https://github.com/Nicoj3000/Vale-project",
        urlDemo: "https://valnick.netlify.app/",
    },
    
];

export const dataTestimonials = [
    {
        id: 1,
        name: "Juan Esteban Villada",
        description:
            "¡Increíble plataforma! Muy bueno. ¡Altamente recomendado!",
        imageUrl: "/juanescode.png",
    },

    {
        id: 2,
        name: "Valeria Gomez",
        description:
            "¡Increíble plataforma! Muy bueno. ¡Altamente recomendado!",
        imageUrl: "/valeria.png",
    },

];