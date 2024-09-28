"use client";

import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ContainerTestimonialPage from "@/components/container-testimonial-page";

import { dataTestimonials } from "@/data";

import TransitionPage from "@/components/transition-page";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "lucide-react";

const TestimonialsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <ContainerTestimonialPage>
        <TransitionPage />
        <div className="flex flex-col justify-center h-lvh">
          <h1 className="text-4xl leading-tight text-center md:text-5xl md:mb-5">
            {t("titleT1")}
            <span className="block font-bold text-secondary">
              {" "}
              {t("titleT2")}{" "}
            </span>
          </h1>
          <div className="flex items-center justify-center">
            <div>
              <Swiper
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                  },
                }}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="h-[430px] md:h-[500px] w-[370px] md:w-[650px] "
              >
                {dataTestimonials.map(({ id, name, description, imageUrl }) => (
                  <SwiperSlide key={id}>
                    <ArrowRightIcon className="absolute right  md:block right-4  mt-16 transform -translate-y-1" />

                    <Image
                      src={imageUrl}
                      alt={name}
                      width={1000}
                      height={1000}
                      className="mx-auto md:w-[200px] md:h-[200px] h-[150px] w-[150px] rounded-full"
                    />
                    <h4 className="text-center text-2xl mt-6">{t(name)}</h4>
                    <div className="mt-5 text-center text-xl">
                      {t(description)}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </ContainerTestimonialPage>
    </>
  );
};

export default TestimonialsPage;
