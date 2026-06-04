"use client";

import { dataPortfolio } from "@/data";
import TransitionPage from "@/components/transition-page";
import ContainerPage from "@/components/container-page";
import PortfolioBox from "@/components/portfolio-box";
import { useTranslation } from "react-i18next";
import { CoverParticles } from "@/components/cover-particles";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function PortfolioContent() {
  const { t } = useTranslation();
  return (
    <ContainerPage>
      <TransitionPage />
      <CoverParticles />
      <ScrollReveal>
        <h1 className="text-center text-3xl leading-tight sm:text-4xl lg:text-5xl xl:text-6xl">
          {t("titleP1")} <span className="font-bold text-secondary">{t("titleP2")}</span>
        </h1>
      </ScrollReveal>
      <div className="flex flex-col justify-center h-full">
        <div className="relative z-10 mx-auto mt-8 grid w-full max-w-[1240px] gap-6 md:grid-cols-2 xl:mt-10 xl:grid-cols-3 xl:gap-7 2xl:grid-cols-4">
          {dataPortfolio.map((data, index) => (
            <ScrollReveal key={data.id} delay={(index % 4) * 0.07}>
              <PortfolioBox data={data} priority={index < 2} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ContainerPage>
  );
}
