"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { serviceData } from "@/data";
import { useTranslation } from "react-i18next";
import ContactCvModal from "./ContactCvModal";

const SliderServices = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="max-w-[400px] mb-12">
        <h1 className="text-3xl leading-tight text-center mb-8 md:text-left md:text-4xl md:mb-5">
          {t("titleS1")}{" "}
          <span className="font-bold text-secondary">{t("titleS2")}</span>
        </h1>
        <div className="mb-3 text-lg text-gray-300 space-y-3">
          <div className="mb-3 text-lg text-gray-300 space-y-3">
            <p>{t("pageserv.title1")} </p>
            <p>{t("pageserv.title2")} </p>
            <p>{t("pageserv.title3")} </p>
            <p>{t("pageserv.title4")} </p>
            <p>{t("pageserv.title5")} </p>
          </div>
        </div>
        <div className="mt-8">
          <ContactCvModal buttonText={t("titleS3")}/>
        </div>
      </div>
      <div className="relative">
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="h-[400px] md:h-[400px] w-[300px] md:w-[850px]"
        >
          {serviceData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex px-8 py-10 h-auto md:h-[330px] rounded-lg cursor-pointer bg-[rgba(65,47,123,0.15)] sm:flex-col gap-x-8 sm:gap-x-0 group hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 hover:border-secondary border-2">
                
                <div className="mb-4 text-5xl text-secondary">{item.icon}</div>
                <div>
                  <h3 className="mb-4 text-xl">{t(item.titleKey)}</h3>
                  <p className="text-base">{t(item.descriptionKey)}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SliderServices;
