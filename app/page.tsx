"use client"


import  "@/utils/i18n";
import i18n from "../utils/i18n";
import { I18nextProvider } from "react-i18next";

import { CoverParticles } from "@/components/cover-particles";
import Introduction from "@/components/introduction";
import TransitionPage from "@/components/transition-page";

export default function Home() {
  return (
      <I18nextProvider i18n={i18n}>
      <TransitionPage />
  <div className="flex h-full bg-no-repeat bg-gradient-cover">
        <CoverParticles />
        <Introduction />
      </div>
      </I18nextProvider>
  );
}
