import {
  BookText,
  CodeSquare,
  HomeIcon,
  UserRound,
  Speech,
  Laptop,
  Server,
  Github,
  Linkedin,
  Mail,
  Phone,
  Youtube,
  Target,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
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


];

interface NavItem {
  id: number;
  link: string;
  title: string;
  icon: React.ElementType; // Ensures `icon` is a valid React component
}

export const itemsNavbar: NavItem[] = [
  {
    id: 1,
    title: "Home",
    icon: HomeIcon, // Pass the component, not JSX
    link: "/",
  },
  {
    id: 2,
    title: "User",
    icon: UserRound, // Pass the component, not JSX
    link: "/about-me",
  },
  {
    id: 3,
    title: "Book",
    icon: BookText, // Pass the component, not JSX
    link: "/services",
  },
  {
    id: 4,
    title: "Target",
    icon: CodeSquare, // Pass the component, not JSX
    link: "/portfolio",
  },
  
];

export const DATA = {
  name: "Nicoj Landing Page",
  url: "https://nicoj3000.netlify.app/",
  description: "Landing page made by Nicoj.",
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  mail:[{href: "mailto:nicoj3000its@gmail.com", icon: Mail, label: "Mail"}],
  contact: {
    social: {
      User: {
        name: "User",
        url: "/about-me",
        icon: UserRound,
      },
      Services: {
        name: "My services",
        url: "/services",
        icon: BookText,
      },
      Portafolio: {
        name: "Youtube",
        url: "/portfolio",
        icon: CodeSquare
      },
      
    },
  },
};

export const dataAboutPage = [
  {
    id: 2,
    titleKey: "timeline.title2",
    subtitleKey: "timeline.subtitle2",
    descriptionKey:
      "timeline.description2",
    date: "2026 - Hoy",
  },
  {
    id: 3,
    titleKey: "timeline.title3",
    subtitleKey: "timeline.subtitle3",
    descriptionKey: "timeline.description3",
    date: "2025 - Hoy",
  },
  {
    id: 4,
    titleKey: "timeline.title4",
    subtitleKey: "timeline.subtitle4",
    descriptionKey: "timeline.description4",
    date: "2023 - 2025",
  },
  {
    id: 1,
    titleKey: "timeline.title1",
    subtitleKey: "timeline.subtitle1",
    descriptionKey:
      "timeline.description1",
    date: "2021 - 2025",
  },
];

export const dataCounter = [
  {
    id: 0,
    endCounter: 2,
    text: "counters.title1",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 1,
    endCounter: 4,
    text: "counters.title2",
    lineRight: true,
    lineRightMobile: false,
  },
  {
    id: 2,
    endCounter: 10,
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
  {
    icon: <CodeSquare />,
    titleKey: "fullstack.title",
    descriptionKey:
      "fullstack.description",
  },
  {
    icon: <Target />,
    titleKey: "itstrategy.title",
    descriptionKey:
      "itstrategy.description",
  },
  {
    icon: <Speech />,
    titleKey: "mentoring.title",
    descriptionKey:
      "mentoring.description",
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
    id: 3,
    title: "PythonWebFlask",
    image: "/image-3.jpg",
    urlGithub: "https://github.com/Nicoj3000/project-python-flask-mysql",
    urlDemo: "#",

  },
  {
    id: 4,
    title: "App Egresados ULP",
    image: "/image-4.jpg",
    urlGithub: "",
    urlDemo: "https://db-ulp-egresados.vercel.app/",
  },
  {
    id: 5,
    title: "Rental Cars",
    image: "/image-5.jpg",
    urlGithub: "https://github.com/Nicoj3000/RentalCars",
    urlDemo: "https://rental-cars-eosin.vercel.app/",
  }
];

