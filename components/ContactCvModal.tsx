"use client";
import { useTranslation } from "react-i18next";

interface Props {
  buttonText: string;
}

export default function ContactCvModal({ buttonText }: Props) {
  const { i18n } = useTranslation();

  const handleDownload = () => {
    const file = i18n.language.startsWith("es")
      ? "/Hoja de vida Español.pdf"
      : "/Hoja de vida Ingles.pdf";
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop() || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <button
        className="my-2 w-fit cursor-pointer rounded-xl border border-[#4e66ff]/30 bg-[#3f5cff] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#526cff] hover:shadow-[0_12px_28px_-16px_rgba(63,92,255,0.8)]"
        onClick={handleDownload}
      >
        {buttonText}
      </button>
    </>
  );
}