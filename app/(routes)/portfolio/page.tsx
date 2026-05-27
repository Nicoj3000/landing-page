import { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio | NicoX",
  description:
    "Proyectos destacados de Nicolás Delgado: aplicaciones fullstack, dashboards, plataformas web y soluciones empresariales.",
  openGraph: {
    title: "Portfolio | NicoX",
    description:
      "Proyectos destacados de Nicolás Delgado: aplicaciones fullstack, dashboards, plataformas web y soluciones empresariales.",
    url: "https://nicoj3000.netlify.app/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
