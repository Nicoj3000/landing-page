import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import ContainerPage from './container-page';

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
    <div className="z-20 w-full  h-full ">
      <ContainerPage>
        <div className="z-20 grid items-center p-10 py-32 md:py-0 md:grid-cols-2">
          <div className="relative flex justify-center items-center">
            <Image
              src="/Foto-CV.png"
              alt="Profile pic"
              width={350}
              height={350}
              className="rounded-full"
            />
          </div>
        <div className="flex flex-col justify-center max-w-xl mt-5">
          <h1 className="text-3xl leading-tight md:text-left md:text-5xl md:mb-10">
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
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5d90ff] to-[#0d00ff] md:text-5xl"
            />
          </h1>
          <p className="mx-auto mb-4 text-lg md:text-3xl md:mx-0 md:mb-8">
            {t('titleI5')}
          </p>
          <div className="flex items-center justify-center gap-4 md:justify-start md:gap-14">
            <a
              href="/portfolio"
              className="px-6 py-3 my-2 transition-all border-2 cursor-pointer text-sm w-fit rounded-xl hover:shadow-xl hover:shadow-white/50"
            >
              {t('titleI6')}
            </a>
            <Link
              className="px-6 py-3 my-2 transition-all border-2 cursor-pointer text-sm w-fit rounded-xl hover:shadow-xl hover:shadow-white/50"
              href="/CV.pdf"
              target="_blank"
            >
              {t('titleI7')}
            </Link>
          </div>
        </div>
      </div>
      </ContainerPage>
    </div>
  );
};

export default Introduction;