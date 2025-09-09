import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';
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

  const [showModal, setShowModal] = useState(false);

  const handleDownload = (lang: 'es' | 'en') => {
    const file = lang === 'es' ? '/Hoja de vida Español.pdf' : '/Hoja de vida Ingles.pdf';
    const link = document.createElement('a');
    link.href = file;
    link.download = file.split('/').pop() || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowModal(false);
  };

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
            <button
              className="px-6 py-3 my-2 transition-all border-2 cursor-pointer text-sm w-fit rounded-xl hover:shadow-xl hover:shadow-white/50"
              onClick={() => setShowModal(true)}
            >
              {t('titleI7')}
            </button>
          </div>
          {showModal && (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
                <div className="bg-white rounded-xl p-8 flex flex-col gap-4 items-center w-80 shadow-2xl animate-scale-in">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {i18n.language === 'es' ? 'Selecciona el CV a descargar' : 'Select the CV to download'}
                  </h2>
                  <button
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => handleDownload('es')}
                  >
                    {i18n.language === 'es' ? 'Descargar CV en Español' : 'Download CV in Spanish'}
                  </button>
                  <button
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => handleDownload('en')}
                  >
                    {i18n.language === 'es' ? 'Descargar CV en Inglés' : 'Download CV in English'}
                  </button>
                  <button
                    className="mt-2 text-gray-500 hover:text-gray-800 text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    {i18n.language === 'es' ? 'Cancelar' : 'Cancel'}
                  </button>
                </div>
              </div>
              <style jsx global>{`
                @keyframes fade-in {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                .animate-fade-in {
                  animation: fade-in 0.2s ease;
                }
                @keyframes scale-in {
                  from { transform: scale(0.95); opacity: 0; }
                  to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                  animation: scale-in 0.2s cubic-bezier(.4,0,.2,1);
                }
              `}</style>
            </>
          )}
        </div>
      </div>
      </ContainerPage>
    </div>
  );
};

export default Introduction;