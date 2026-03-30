import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [, setLanguage] = useState(i18n.language); // Estado local para forzar la actualización

  const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(event.target.value).then(() => {
      setLanguage(event.target.value); // Actualiza el estado local para forzar la actualización
    });
    setIsOpen(false); // Cierra el menú desplegable después de seleccionar un idioma
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const currentLanguage = i18n.language ? capitalizeFirstLetter(i18n.language) : 'En';

  return (
    <div className="relative">
      <legend
        className="mt-1 flex cursor-pointer items-center text-2xl font-bold text-white select-none md:text-3xl"
        onClick={toggleDropdown}
      >
        <span className="mr-2">{currentLanguage}</span>
        <span className="mr-2">
          <FontAwesomeIcon icon={faEarthAmericas} />
        </span>
        <ChevronDown className="w-4 h-4 ml-1" />
      </legend>
      {isOpen && (
        <div className="absolute left-0 z-50 mt-2 w-[160px] rounded-lg border border-white/20 bg-black/90 p-2 shadow-lg backdrop-blur-sm">
          <label
            htmlFor="en"
            className="relative flex h-10 cursor-pointer items-center gap-2 rounded-lg px-3 font-medium transition-all duration-300 hover:bg-white/10 has-[:checked]:bg-white/10 has-[:checked]:text-blue-400 has-[:checked]:ring-2 has-[:checked]:ring-blue-500 select-none"
          >
            <span className="text-white">English</span>
            <input
              type="radio"
              name="language"
              className="peer/en w-3 h-3 absolute accent-blue-400 right-3 transition-all duration-300"
              id="en"
              value="en"
              onChange={changeLanguage}
              checked={i18n.language === 'en'}
            />
            <span className="absolute right-3 h-3 w-3 rounded-full border-2 border-white/30 transition-all duration-300 peer-checked/en:border-blue-400 peer-checked/en:bg-blue-400"></span>
          </label>
          <label
            htmlFor="es"
            className="relative flex h-10 cursor-pointer items-center gap-2 rounded-lg px-3 font-medium transition-all duration-300 hover:bg-white/10 has-[:checked]:bg-white/10 has-[:checked]:text-blue-400 has-[:checked]:ring-2 has-[:checked]:ring-blue-500 select-none"
          >
            <span className="text-white">Español</span>
            <input
              type="radio"
              name="language"
              className="peer/es w-3 h-3 absolute accent-blue-400 right-3 transition-all duration-300"
              id="es"
              value="es"
              onChange={changeLanguage}
              checked={i18n.language === 'es'}
            />
            <span className="absolute right-3 h-3 w-3 rounded-full border-2 border-white/30 transition-all duration-300 peer-checked/es:border-blue-400 peer-checked/es:bg-blue-400"></span>
          </label>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;