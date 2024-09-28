import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [,setLanguage] = useState(i18n.language); // Estado local para forzar la actualización

  const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(event.target.value).then(() => {
      setLanguage(event.target.value); // Actualiza el estado local para forzar la actualización
    });
    setIsOpen(false); // Cierra el menú desplegable después de seleccionar un idioma
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <legend
        className="text-3xl mt-1 font-bold text-white select-none cursor-pointer flex items-center"
        onClick={toggleDropdown}
      >
        <span className="mr-2">
          <FontAwesomeIcon icon={faEarthAmericas} />
        </span>
        <ChevronDown className="w-4 h-4 ml-1" />
      </legend>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-[150px] bg-#0a0a0a p-2 rounded-lg shadow-lg z-50">
          <label
            htmlFor="en"
            className="font-medium h-10 relative hover:bg-#0a0a0a transition-all duration-300 flex items-center px-3 gap-2 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-#0a0a0a has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
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
            <span className="absolute right-3 w-3 h-3 rounded-full border-2 border-#0a0a0a peer-checked/en:border-blue-400 peer-checked/en:bg-blue-400 transition-all duration-300"></span>
          </label>
          <label
            htmlFor="es"
            className="font-medium h-10 relative hover:bg-#0a0a0a transition-all duration-300 flex items-center px-3 gap-2 rounded-lg has-[:checked]:text-blue-400 has-[:checked]:bg-#0a0a0a has-[:checked]:ring-blue-500 has-[:checked]:ring-2 select-none cursor-pointer"
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
            <span className="absolute right-3 w-3 h-3 rounded-full border-2 border-#0a0a0a peer-checked/es:border-blue-400 peer-checked/es:bg-blue-400 transition-all duration-300"></span>
          </label>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;