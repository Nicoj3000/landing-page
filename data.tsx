import {
  BookText,
  CodeSquare,
  HomeIcon,
  UserRound,
  Speech,
  Laptop,
  Server,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faXTwitter,
  faTwitch,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
export const socialNetworks = [
  {
    id: 4,
    logo: <FontAwesomeIcon icon={faGithub} size="2x" />,
    src: "https://github.com/Nicoj3000",
  },

  

  {
    id: 2,
    logo: <FontAwesomeIcon icon={faLinkedin} size="2x" />,
    src: "https://www.linkedin.com/in/nicolas-delgado-6b22372b7/",
  },

  {
    id: 1,
    logo: <FontAwesomeIcon icon={faWhatsapp} size="2x" />,
    src: "https://wa.link/lhrth3",
  },
  {
    id: 3,
    logo: <FontAwesomeIcon icon={faXTwitter} size="2x" />,
    src: "https://x.com/Nicoj3000",
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
    subtitle: "Universidad libre of Pereira",
    description:
      "I am in the 8th semester of software engineering at the Universidad Libre de Pereira, where I am acquiring technical skills and specialized knowledge in software development and web application design..",
    date: "2021 - 2024 ",
  },
  {
    id: 2,
    title: "Developer Frontend and Backend",
    subtitle: "Own Studio",
    description:
      "Throughout my career, I have acquired skills in frontend and backend development, which has allowed me to work on challenging projects and collaborate with multidisciplinary teams, with experience in technologies such as React, Node.js, MongoDB, SQL, Postgres, TypeScript, JavaScript, HTML, CSS, Python among others.",
    date: "Sep 2024",
  },
];

export const dataCounter = [
  {
    id: 0,
    endCounter: 1,
    text: "Experience years",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 1,
    endCounter: 2,
    text: "Clients satisfied",
    lineRight: true,
    lineRightMobile: false,
  },
  {
    id: 2,
    endCounter: 4,
    text: "Projects completed",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 3,
    endCounter: 0,
    text: "Awards won",
    lineRight: false,
    lineRightMobile: false,
  },
];

export const serviceData = [
  {
    icon: <Laptop />,
    title: "Web development",
    description:
      "React Development implementing dynamic interfaces Optimization with Next.js for faster loading. Responsive design for mobile and desktop devices.",
  },

  {
    icon: <Server />,
    title: "Backend Development",
    description:
      "Developing backend applications using Node.js for building fast and scalable solutions with Express.js and MongoDB.",
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
    description: "This platform has exceeded my expectations in every way. The features are robust and the performance is outstanding.  I highly recommend this developer to anyone looking for a reliable and efficient solution.",
    imageUrl: "/juanescode.png",
  },

  {
    id: 2,
    name: "Valeria Gomez",
    description: "I had an exceptional experience with this platform. The user interface is intuitive and easy to navigate. The customer support team is responsive and very helpful. I was able to achieve my goals efficiently and effectively.",
    imageUrl: "/valeria.png",
  },
];
