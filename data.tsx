import {
  BookText,
  CodeSquare,
  HomeIcon,
  UserRound,
  Speech,
  Laptop,
  Server,
  Mail,
  Target,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export const socialNetworks = [
  {
    id: 1,
    name: "GitHub",
    logo: <GithubIcon size={30} />,
    src: "https://github.com/Nicoj3000",
  },
  {
    id: 2,
    name: "LinkedIn",
    logo: <LinkedinIcon size={30} />,
    src: "https://www.linkedin.com/in/nicolas-delgado-6b22372b7/",
  },
];


export const DATA = {
  name: "Nicoj Landing Page",
  url: "https://nicoj3000.netlify.app/",
  description: "Landing page made by Nicoj.",
  navbar: [{ href: "/", icon: HomeIcon, labelKey: "nav.home" }],
  mail: [
    { href: "mailto:nicoj3000its@gmail.com", icon: Mail, labelKey: "nav.mail" },
  ],
  contact: {
    social: {
      User: {
        labelKey: "nav.about",
        url: "/about-me",
        icon: UserRound,
      },
      Services: {
        labelKey: "nav.services",
        url: "/services",
        icon: BookText,
      },
      Portafolio: {
        labelKey: "nav.portfolio",
        url: "/portfolio",
        icon: CodeSquare,
      },
    },
  },
};

export const dataAboutPage = [
  {
    id: 2,
    titleKey: "timeline.title2",
    subtitleKey: "timeline.subtitle2",
    descriptionKey: "timeline.description2",
    dateKey: "timeline.date2",
  },
  {
    id: 3,
    titleKey: "timeline.title3",
    subtitleKey: "timeline.subtitle3",
    descriptionKey: "timeline.description3",
    dateKey: "timeline.date3",
  },
  {
    id: 4,
    titleKey: "timeline.title4",
    subtitleKey: "timeline.subtitle4",
    descriptionKey: "timeline.description4",
    dateKey: "timeline.date4",
  },
  {
    id: 1,
    titleKey: "timeline.title1",
    subtitleKey: "timeline.subtitle1",
    descriptionKey: "timeline.description1",
    dateKey: "timeline.date1",
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
    endCounter: 8,
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
    descriptionKey: "portfolio.project1",
    image: "/image-1.jpg",
    urlGithub: "https://github.com/Nicoj3000/Project-Dashboard",
    urlDemo: "https://dashboard-nicodev.netlify.app/",
  },
  {
    id: 3,
    title: "Helios-9",
    descriptionKey: "portfolio.project3",
    image: "/universe.jpg",
    urlGithub: "https://github.com/Nicoj3000/Universe-3D",
    urlDemo: "https://nickdev-universe.netlify.app/",
  },
  {
    id: 4,
    title: "App Egresados ULP",
    descriptionKey: "portfolio.project4",
    image: "/image-4.jpg",
    urlGithub: "",
    urlDemo: "https://db-ulp-egresados.vercel.app/",
  },
  {
    id: 5,
    title: "Rental Cars",
    descriptionKey: "portfolio.project5",
    image: "/image-5.jpg",
    urlGithub: "https://github.com/Nicoj3000/RentalCars",
    urlDemo: "https://rental-cars-eosin.vercel.app/",
  },
];

