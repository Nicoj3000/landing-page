import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import ContainerMainPage from "./container-main-page";
import Link from "next/link";

const Introduction = () => {
  return (
    <div className="z-20 w-full bg-darkBg/60">
      <ContainerMainPage>
        <div className="z-20 grid items-center h-full p-10 py-26 md:py-14 md:grid-cols-2">
          <Image src="/home-4.png" alt="Profile pic" width={800} height={800} />
          <div className="flex flex-col justify-center max-w-xl">
            <h1 className="mb-5 text-3xl leading-tight md:text-left md:text-5xl md:mb-10">
              If you can think it, <br />
              <TypeAnimation
                sequence={[
                  "you can program it",
                  1000,
                  "you can design it",
                  1000,
                  "you can create it",
                  1000,
                  "you can build it",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-bold text-secondary"
              />
            </h1>

            <p className="mx-auto mb-4 text-lg md:text-3xl md:mx-0 md:mb-8">
              On the path to becoming a Fullstack Developer to create fantastic
              digital experiences, eager to learn more every day.
            </p>

            <div className="flex items-center justify-center gap-4 md:justify-start md:gap-14">
              <a
                href="/portfolio"
                className="px-6 py-3 my-2 transition-all border-2 cursor-pointer text-sm w-fit rounded-xl hover:shadow-xl hover:shadow-white/50"
              >
                See my work
              </a>
              <Link
                className="px-6 py-3 my-2 transition-all border-2 cursor-pointer text-sm w-fit rounded-xl hover:shadow-xl hover:shadow-white/50"
                href="/CV.pdf"
                target="_blank"
              >
                Contact me
              </Link>
            </div>
          </div>
        </div>
      </ContainerMainPage>
    </div>
  );
};

export default Introduction;
