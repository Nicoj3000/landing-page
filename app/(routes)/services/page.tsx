import SliderServices from "@/components/slider-services";
import TransitionPage from "@/components/transition-page";
import ContainerPage from "@/components/container-page";
import Link from "next/link";

const ServicesPage = () => {
  return (
    <>
      <TransitionPage />
      <ContainerPage>
        <div className="grid items-center justify-center  max-w-5xl gap-5 mx-auto md:grid-cols-2">
          <div className="max-w-[400px] mt-16">
            <h1 className="text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-5">
              My <span className="font-bold text-secondary"> services.</span>
            </h1>
            <div className="mb-3 text-lg text-gray-300 space-y-3 ">
              <p>Hi! I&apos;m Nicolas. I am a software engineer.</p>
              <p>🔭 I&apos;m currently a student.</p>
              <p>🌱 I&apos;m currently learning TypeScript.</p>
              <p>👯 I&apos;m looking to collaborate on projects.</p>
              <p>
                💬 Ask me about SQL, JavaScript, Postgres, MongoDB, NodeJS,
                TypeScript, Python, Java and much more.
              </p>
            </div>
            <div className="mt-8">
            <Link
              className="px-6 py-3 my-2 transition-all border-2 cursor-pointer text-sm w-fit rounded-xl hover:shadow-xl hover:shadow-white/50"
              href="/CV.pdf"
              target="_blank"
            >
              Contact me
            </Link>
            </div>
          </div>

          {/* SLIDER */}
          <div className="mt-6">
            <SliderServices />
          </div>
        </div>
      </ContainerPage>
    </>
  );
};

export default ServicesPage;
