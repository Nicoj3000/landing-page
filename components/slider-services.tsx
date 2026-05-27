"use client";

import { serviceData } from "@/data";
import { useTranslation } from "react-i18next";
import ContactCvModal from "./ContactCvModal";
import { motion } from "framer-motion";

const SliderServices = () => {
  const { t } = useTranslation();
  const serviceHighlights = [
    "pageserv.title1",
    "pageserv.title2",
    "pageserv.title3",
    "pageserv.title4",
    "pageserv.title5",
  ];

  return (
    <div className="mx-auto grid w-full max-w-[1280px] items-start gap-10 xl:grid-cols-[minmax(360px,460px)_minmax(0,1fr)] xl:gap-12">
      <div className="mb-4 max-w-[560px] lg:mb-0">
        <h1 className="mb-8 text-center text-3xl leading-tight sm:text-4xl md:mb-5 md:text-left xl:text-5xl">
          {t("titleS1")} {" "}
          <span className="font-bold text-secondary">{t("titleS2")}</span>
        </h1>
        <div className="mb-5 space-y-2.5 break-words text-sm leading-relaxed text-slate-300 [text-wrap:pretty] sm:text-base lg:text-[1.05rem]">
          {serviceHighlights.map((key) => (
            <p key={key} className="flex gap-2">
              <span className="mt-1 shrink-0 text-secondary">→</span>
              <span>{t(key)}</span>
            </p>
          ))}
        </div>
        <div className="mt-6">
          <ContactCvModal buttonText={t("titleS3")} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
        {serviceData.map((item, index) => {
          const isLast = index === serviceData.length - 1;
          const isOddTotal = serviceData.length % 2 !== 0;
          return (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            className={`transform-gpu will-change-transform flex min-h-[240px] flex-col gap-4 rounded-xl border border-white/12 bg-[#0d1326]/60 px-5 py-6 shadow-[0_0_0_0_rgba(44,88,255,0)] transition-all duration-200 hover:-translate-y-1 hover:border-secondary/70 hover:bg-[#121a32]/80 hover:shadow-[0_16px_36px_-24px_rgba(63,92,255,0.65)]${isLast && isOddTotal ? " sm:col-span-2 sm:max-w-[calc(50%-8px)] sm:mx-auto 2xl:col-span-1 2xl:max-w-none 2xl:mx-0" : ""}`}
          >
            <div className="text-3xl text-[#6d86ff]">{item.icon}</div>
            <div className="min-w-0">
              <h3 className="mb-2 break-words text-xl leading-snug text-slate-100">{t(item.titleKey)}</h3>
              <p className="break-words whitespace-normal text-sm leading-relaxed text-slate-300 sm:text-[0.96rem]">
                {t(item.descriptionKey)}
              </p>
            </div>
          </motion.article>
          );
        })}
      </div>
    </div>
  );
};

export default SliderServices;
