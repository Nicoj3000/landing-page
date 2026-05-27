import { Metadata } from "next";
import AboutMeContent from "./AboutMeContent";

export const metadata: Metadata = {
  title: "Sobre mí | NicoX",
  description:
    "Conocé la trayectoria profesional de Nicolás Delgado: Director de TI, desarrollador fullstack y mentor técnico con más de 2 años de experiencia.",
  openGraph: {
    title: "Sobre mí | NicoX",
    description:
      "Conocé la trayectoria profesional de Nicolás Delgado: Director de TI, desarrollador fullstack y mentor técnico.",
    url: "https://nicoj3000.netlify.app/about-me",
  },
};

export default function AboutMePage() {
  return <AboutMeContent />;
}
