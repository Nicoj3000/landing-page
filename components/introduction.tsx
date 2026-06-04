'use client'

import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SplineScene } from '@/components/ui/splite';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';
import ContainerPage from './container-page';
import ContactCvModal from './ContactCvModal';

const Introduction = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

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
          <Card className="glass-card relative w-full overflow-hidden rounded-3xl bg-black/[0.55]">
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
                  <span className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
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
                    className="block !whitespace-normal break-words bg-gradient-to-r from-[#8ca3ff] to-[#3f5cff] bg-clip-text font-bold text-transparent lg:text-5xl xl:text-6xl 2xl:text-7xl"
                  />
                </h1>

                <p className="mx-auto mb-4 mt-4 max-w-lg text-center text-base leading-relaxed text-slate-300 [text-wrap:pretty] sm:text-lg lg:text-xl xl:mx-0 xl:text-left xl:text-2xl 2xl:text-[30px]">
                  {t('titleI5')}
                </p>

                <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 xl:justify-start xl:gap-6">
                  <a
                    href="/portfolio"
                    className="group my-2 inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(63,92,255,0.25)] xl:px-7 xl:py-3.5 xl:text-base"
                  >
                    {t('titleI6')}
                  </a>
                  <ContactCvModal buttonText={t('titleI7')} />
                </div>
              </motion.div>

              {/* Right: interactive 3D scene */}
              <div className="pointer-events-none relative h-[300px] w-full sm:h-[360px] md:h-[460px] xl:h-[520px] xl:pointer-events-auto">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="h-full w-full"
                />
              </div>
            </div>
          </Card>
        </div>
      </ContainerPage>
    </div>
  );
};

export default Introduction;
