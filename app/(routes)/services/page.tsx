import TransitionPage from "@/components/transition-page";
import ContainerPage from "@/components/container-page";
import SliderServices from "@/components/slider-services";

const ServicesPage = () => {
  return (
    <>
      <TransitionPage />
      <ContainerPage>
        <div className="grid items-center justify-center max-w-5xl gap-5 mx-auto md:grid-cols-2">
          <SliderServices />
        </div>
      </ContainerPage>
    </>
  );
};

export default ServicesPage;
