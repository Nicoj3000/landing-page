
import SliderServices from "@/components/slider-services";
import TransitionPage from "@/components/transition-page";

const ServicesPage = () => {
  return (
    <>
      <TransitionPage />


      <div className="grid items-center justify-center h-screen max-w-5xl gap-6 mx-auto md:grid-cols-2">
        <div className="max-w-[450px]">
          <h1 className="text-2xl leading-tight text-center md:text-left md:text-4xl md:mb-5">
            Mis <span className="font-bold text-secondary"> servicios.</span>
          </h1>
          <div className="mb-3 text-xl text-gray-300">
            <p>Hi! I'm Nicolas. I am a software engineer.</p>
            <p>🔭 I’m currently student.</p>
            <p>🌱 I’m currently learning TypeScript.</p>
            <p>👯 I’m looking to collaborate on projects.</p>
            <p>
              💬 Ask me about SQL, JavaScript, Postgres, MongoDB, NodeJS,
              TypeScript, Python, Java and much more.
            </p>
          </div>
          <button className="px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/65">
            Contacta conmigo
          </button>
        </div>

        {/* SLIDER */}
        <div>
          <SliderServices />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
