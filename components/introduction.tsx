import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';
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
        <div className="z-20 mx-auto grid w-full max-w-[1240px] items-center gap-10 py-10 md:grid-cols-2 md:gap-10 md:py-8 xl:grid-cols-[minmax(330px,430px)_minmax(0,1fr)] xl:gap-12">
          <div className="relative flex items-center justify-center xl:justify-end">
            <Image
              src="/Foto-CV.png"
              alt="Profile pic"
              width={460}
              height={460}
              className="h-[210px] w-[210px] rounded-full object-cover object-top sm:h-[260px] sm:w-[260px] md:h-[300px] md:w-[300px] lg:h-[320px] lg:w-[320px] xl:h-[350px] xl:w-[350px] 2xl:h-[380px] 2xl:w-[380px]"
            />
          </div>
        <div className="mt-2 flex max-w-2xl flex-col justify-center lg:mt-5">
          <h1 className="min-h-[4.8em] text-3xl leading-tight sm:min-h-[4.6em] sm:text-4xl md:min-h-[4.2em] md:text-left lg:min-h-[4em] lg:text-5xl xl:min-h-[3.9em] xl:text-6xl xl:leading-tight 2xl:min-h-[3.7em] 2xl:text-7xl 2xl:leading-[1.05]">
            {t('titleI')} <br />
            <TypeAnimation
              key={language} // Forzar re-renderización cuando cambie el idioma
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
              className="block bg-gradient-to-r from-[#8ca3ff] to-[#3f5cff] bg-clip-text font-bold text-transparent lg:text-5xl xl:whitespace-nowrap xl:text-6xl 2xl:text-7xl"
            />
          </h1>
          <p className="mx-auto mb-4 mt-4 text-base leading-relaxed text-slate-300 sm:text-lg md:mx-0 lg:text-xl xl:text-2xl 2xl:text-[30px]">
            {t('titleI5')}
          </p>
          <div className="flex items-center justify-center gap-4 md:justify-start md:gap-6 xl:gap-8">
            <a
              href="/portfolio"
              className="my-2 w-fit cursor-pointer rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm text-white transition-all duration-200 hover:border-white/35 hover:bg-white/10 xl:px-7 xl:py-3.5 xl:text-base"
            >
              {t('titleI6')}
            </a>
            <ContactCvModal buttonText={t('titleI7')} />
          </div>
        </div>
      </div>
      </ContainerPage>
    </div>
  );
};

export default Introduction;