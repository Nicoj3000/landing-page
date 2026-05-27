import { Metadata } from "next";
import TransitionPage from "@/components/transition-page";
import ContainerPage from "@/components/container-page";
import SliderServices from "@/components/slider-services";
import { CoverParticles } from "@/components/cover-particles";

export const metadata: Metadata = {
  title: "Servicios | NicoX",
  description:
    "Servicios de desarrollo web, backend, arquitectura TI y mentoría técnica ofrecidos por Nicolás Delgado, Ingeniero de Sistemas fullstack.",
  openGraph: {
    title: "Servicios | NicoX",
    description:
      "Servicios de desarrollo web, backend, arquitectura TI y mentoría técnica ofrecidos por Nicolás Delgado.",
    url: "https://nicoj3000.netlify.app/services",
  },
};

const ServicesPage = () => {
  return (
    <>
      <TransitionPage />
      <CoverParticles />
      <ContainerPage>
        <SliderServices />
      </ContainerPage>
    </>
  );
};

export default ServicesPage;
