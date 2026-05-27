"use client"

import { useEffect, useId, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";

let engineReady = false;
let enginePromise: Promise<void> | null = null;

function getEngine(): Promise<void> {
  if (engineReady) return Promise.resolve();
  if (!enginePromise) {
    enginePromise = initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      engineReady = true;
    });
  }
  return enginePromise;
}

export const CoverParticles = () => {
  const id = useId();
  const [init, setInit] = useState(engineReady);

  useEffect(() => {
    if (engineReady) return;
    getEngine().then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <div className="w-[0px]">
      <Particles
        id={`tsparticles-${id}`}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
            },
            modes: {
              push: { quantity: 3 },
              repulse: { distance: 180, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: { enable: true },
              value: 40,
            },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};
