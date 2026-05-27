"use client";

import ContainerPage from "@/components/container-page";
import CounterServices from "@/components/counter-services";
import { CoverParticles } from "@/components/cover-particles";
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
        <h1 className="text-center text-3xl leading-tight sm:text-4xl md:mt-6 md:text-left lg:text-5xl xl:text-6xl">
          {t("titleA")}{" "}
          <span className="font-bold text-secondary">{t("titleA1")}</span>
        </h1>
        <CounterServices />
        <TimeLine />
      </ContainerPage>
    </>
  );
}
