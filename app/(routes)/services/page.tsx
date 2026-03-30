import TransitionPage from "@/components/transition-page";
import ContainerPage from "@/components/container-page";
import SliderServices from "@/components/slider-services";
import { CoverParticles } from "@/components/cover-particles";

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
