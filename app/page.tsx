"use client"

import { CoverParticles } from "@/components/cover-particles";
import Introduction from "@/components/introduction";
import TransitionPage from "@/components/transition-page";

export default function Home() {
  return (
    <>
      <TransitionPage />
      <div className="flex min-h-screen">
        <CoverParticles />
        <Introduction />
      </div>
    </>
  );
}
