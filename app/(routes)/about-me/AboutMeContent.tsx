"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ContainerPage from "@/components/container-page";
import CounterServices from "@/components/counter-services";
import { CoverParticles } from "@/components/cover-particles";
import SkillsSection from "@/components/skills-section";
import TimeLine from "@/components/time-line";
import TransitionPage from "@/components/transition-page";
import { useTranslation } from "react-i18next";

export default function AboutMeContent() {
  const { t } = useTranslation();
  return (
    <>
      <TransitionPage />
      <CoverParticles />
      <ContainerPage>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-6 md:mt-6 md:flex-row md:items-center md:gap-10"
        >
          <div className="glass relative shrink-0 rounded-full p-1.5 shadow-[0_8px_40px_rgba(63,92,255,0.25)]">
            <Image
              src="/Foto-CV.png"
              alt={t("profilePicAlt")}
              width={460}
              height={460}
              priority
              className="h-[150px] w-[150px] rounded-full object-cover object-top sm:h-[180px] sm:w-[180px] md:h-[200px] md:w-[200px]"
            />
          </div>
          <h1 className="text-center text-3xl leading-tight sm:text-4xl md:text-left lg:text-5xl xl:text-6xl">
            {t("titleA")}{" "}
            <span className="font-bold text-secondary">{t("titleA1")}</span>
          </h1>
        </motion.div>
        <CounterServices />
        <TimeLine />
        <SkillsSection />
      </ContainerPage>
    </>
  );
}
