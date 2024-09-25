import SliderServices from "@/components/slider-services";
import TransitionPage from "@/components/transition-page";
import ContainerPage from "@/components/container-page";
import Link from "next/link";

const ServicesPage = () => {
  return (
    <>
      <TransitionPage />
      <ContainerPage>
        <div className="grid items-center justify-center  max-w-6xl gap-6 mx-auto md:grid-cols-2">
          <div className="max-w-[450px] mt-16">
            <h1 className="text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-5">
              My <span className="font-bold text-secondary"> services.</span>
            </h1>
            <div className="mb-3 text-xl text-gray-300 space-y-4 ">
              <p>Hi! I&apos;m Nicolas. I am a software engineer.</p>
              <p>🔭 I&apos;m currently a student.</p>
              <p>🌱 I&apos;m currently learning TypeScript.</p>
              <p>👯 I&apos;m looking to collaborate on projects.</p>
              <p>
                💬 Ask me about SQL, JavaScript, Postgres, MongoDB, NodeJS,
                TypeScript, Python, Java and much more.
              </p>
            </div>
            <Link
              className="px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/65 text-white hover:text-white/90"
              href="/CV.pdf"
              target="_blank"
            >
              Contact me
            </Link>
          </div>

          {/* SLIDER */}
          <div>
            <SliderServices />
          </div>
        </div>
      </ContainerPage>
    </>
  );
};

export default ServicesPage;
