"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  buttonText: string;
}

export default function ContactCvModal({ buttonText }: Props) {
  const [showModal, setShowModal] = useState(false);
  const { i18n } = useTranslation();

  const handleDownload = (lang: "es" | "en") => {
    const file = lang === "es" ? "/Hoja de vida Español.pdf" : "/Hoja de vida Ingles.pdf";
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop() || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowModal(false);
  };

  return (
    <>
      <button
        className="px-6 py-3 my-2 transition-all border-2 cursor-pointer text-sm w-fit rounded-xl hover:shadow-xl hover:shadow-white/50"
        onClick={() => setShowModal(true)}
      >
        {buttonText}
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
          <div className="bg-white rounded-xl p-8 flex flex-col gap-4 items-center w-80 shadow-2xl animate-scale-in">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {i18n.language === 'es' ? 'Selecciona el CV a descargar' : 'Select the CV to download'}
            </h2>
            <button
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => handleDownload("es")}
            >
              {i18n.language === 'es' ? 'Descargar CV en Español' : 'Download CV in Spanish'}
            </button>
            <button
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => handleDownload("en")}
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
      )}
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
  );
}