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
    titleKey: "timeline.title1",
    subtitleKey: "timeline.subtitle1",
    descriptionKey:
      "timeline.description1",
    date: "2021 - 2024",
  },
  {
    id: 2,
    titleKey: "timeline.title2",
    subtitleKey: "timeline.subtitle2",
    descriptionKey:
      "timeline.description2",
    date: "Sep 2024",
  },
];

export const dataCounter = [
  {
    id: 0,
    endCounter: 1,
    text: "counters.title1",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 1,
    endCounter: 2,
    text: "counters.title2",
    lineRight: true,
    lineRightMobile: false,
  },
  {
    id: 2,
    endCounter: 4,
    text: "counters.title3",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 3,
    endCounter: 0,
    text: "counters.title4",
    lineRight: false,
    lineRightMobile: false,
  },
];

export const serviceData = [
  {
    icon: <Laptop />,
    titleKey: "webdevelop.title",
    descriptionKey:
      "webdevelop.description",
  },

  {
    icon: <Server />,
    titleKey: "backenddev.title",
    descriptionKey:
      "backenddev.description",
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
  {
    id: 3,
    title: "Admin PythonWebFlask",
    image: "/image-3.jpg",
    urlGithub: "https://github.com/Nicoj3000/project-python-flask-mysql",
    urlDemo: "#",

  },
];

export const dataTestimonials = [
  {
    id: 1,
    name: "testimonial1.title",
    description: "testimonial1.description",
    imageUrl: "/juanescode.png",
  },

  {
    id: 2,
    name: "testimonial2.title",
    description: "testimonial2.description",
    imageUrl: "/valeria.png",
  },
];
