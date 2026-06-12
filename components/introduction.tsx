'use client'

import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { SplineScene } from '@/components/ui/splite';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';
import { SPLINE_ROBOT_SCENE } from '@/utils/spline';
import ContainerPage from './container-page';
import DownloadCvButton from './download-cv-button';

const Introduction = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const prefersReducedMotion = useReducedMotion();
  // SSR and the first client render always render the Spline path so the markup
  // matches and hydration stays clean. Only after mounting do we know the real
  // motion preference; reduced-motion users then swap to a static placeholder
  // and the lazy Spline chunk never mounts (the 1.35MB scene is also skipped via
  // the media-gated preload in PreloadResources).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const showStaticHero = mounted && prefersReducedMotion;

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <div className="z-20 h-full w-full">
      <ContainerPage>
        <div className="z-20 mx-auto w-full max-w-[1440px] py-10 md:py-8">
          <Card className="glass-card relative w-full overflow-hidden rounded-3xl bg-white/70 dark:bg-black/[0.55]">
            <Spotlight
              className="-top-40 left-0 md:-top-20 md:left-60"
              fill="#6d86ff"
            />

            <div className="grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,480px)] xl:gap-10">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10 flex flex-col justify-center p-6 sm:p-8 md:p-10 xl:p-12"
              >
                <h1 className="min-h-[4.8em] text-center text-3xl leading-tight sm:min-h-[4.6em] sm:text-4xl md:min-h-[4.2em] lg:min-h-[4em] lg:text-5xl xl:min-h-[3.9em] xl:text-left xl:text-6xl xl:leading-tight 2xl:min-h-[3.7em] 2xl:text-7xl 2xl:leading-[1.05]">
                  <span className="text-gradient-hero">
                    {t('titleI')}
                  </span>{' '}
                  <br />
                  <TypeAnimation
                    key={language}
                    sequence={[
                      t('titleI1'),
                      1000,
                      t('titleI2'),
                      1000,
                      t('titleI3'),
                      1000,
                      t('titleI4'),
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-gradient-accent block !whitespace-normal break-words font-bold lg:text-5xl xl:text-6xl 2xl:text-7xl"
                  />
                </h1>

                <p className="mx-auto mb-4 mt-4 max-w-lg text-center text-base leading-relaxed text-muted-foreground [text-wrap:pretty] sm:text-lg lg:text-xl xl:mx-0 xl:text-left xl:text-2xl 2xl:text-[30px]">
                  {t('titleI5')}
                </p>

                <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 xl:justify-start xl:gap-6">
                  <Link
                    href="/portfolio"
                    className="group my-2 inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-contrast/20 bg-contrast/5 px-6 py-3 text-sm text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-contrast/40 hover:bg-contrast/10 hover:shadow-[0_8px_30px_rgba(63,92,255,0.25)] xl:px-7 xl:py-3.5 xl:text-base"
                  >
                    {t('titleI6')}
                  </Link>
                  <DownloadCvButton buttonText={t('titleI7')} />
                </div>
              </motion.div>

              {/* Right: interactive 3D scene (hover on desktop, tap-to-look on touch).
                  The scene is rendered larger than its panel and anchored to the
                  top so the robot reads as a head-and-shoulders portrait that fills
                  the frame instead of a small full-body shot floating in empty space.
                  Mobile/tablet zoom in hard (175%); desktop uses a gentler 120% so
                  the robot has presence without losing the torso. Centered on every
                  breakpoint via left-1/2 / -translate-x-1/2. */}
              <div className="relative h-[300px] w-full overflow-hidden sm:h-[360px] md:h-[460px] xl:h-[520px]">
                {showStaticHero ? (
                  // Lightweight branded glow stands in for the auto-animating 3D
                  // robot when the user prefers reduced motion. Purely decorative.
                  <div
                    aria-hidden
                    className="flex h-full w-full items-center justify-center"
                  >
                    <div className="h-40 w-40 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(140,163,255,0.55),rgba(63,92,255,0.22)_45%,transparent_70%)] blur-[2px] sm:h-52 sm:w-52 md:h-60 md:w-60" />
                  </div>
                ) : (
                  <div className="absolute left-1/2 top-0 h-[175%] w-[175%] -translate-x-1/2 xl:h-[120%] xl:w-[120%]">
                    <SplineScene
                      scene={SPLINE_ROBOT_SCENE}
                      className="h-full w-full"
                      loadingLabel={t('loading3D')}
                      transparentBackground
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </ContainerPage>
    </div>
  );
};

export default Introduction;
