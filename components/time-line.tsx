"use client";

import { dataAboutPage } from "@/data";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

const TimeLine = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center">
      <div className="mx-auto w-full max-w-[1180px] pt-4 md:pb-16 md:pt-16 xl:pt-20">
        <div className="-my-6">
          {dataAboutPage.map((data, i) => (
            <motion.div
              key={data.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="relative py-6 pl-8 sm:pl-32 group"
            >
              <h3 className="mb-1 text-xl font-bold sm:mb-0 lg:text-2xl xl:text-3xl">{t(data.titleKey)}</h3>
              <div className="flex flex-col sm:flex-row items-start mb-1
                group-last:before:hidden before:absolute
                before:left-2 sm:before:left-0 before:h-full
                before:px-px before:bg-slate-300 sm:before:ml-[6.5rem]
                before:self-start before:-translate-x-1/2
                before:translate-y-3 after:absolute after:left-2
                sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600
                after:border-4 after:box-content after:border-slate-50
                after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2
                after:translate-y-1.5">
                <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">{data.date}</time>
                <div className="text-lg font-bold text-gray-300 lg:text-xl">{t(data.subtitleKey)}</div>
              </div>
              <div className="max-w-3xl text-sm leading-relaxed text-slate-400 [text-wrap:pretty] lg:text-base xl:text-lg">{t(data.descriptionKey)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
