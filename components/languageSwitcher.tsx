import { ChevronDown, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(event.target.value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const currentLanguage = i18n.language ? capitalizeFirstLetter(i18n.language) : 'En';

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="mt-1 flex cursor-pointer items-center text-2xl font-bold text-white select-none md:text-3xl bg-transparent border-0 p-0"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="mr-2">{currentLanguage}</span>
        <span className="mr-2">
          <Globe className="h-6 w-6" />
        </span>
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>
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