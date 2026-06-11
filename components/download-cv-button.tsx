"use client";
import { useTranslation } from "react-i18next";

interface Props {
  buttonText: string;
}

export default function DownloadCvButton({ buttonText }: Props) {
  const { i18n } = useTranslation();

  const file = i18n.language.startsWith("es")
    ? "/hoja-de-vida-es.pdf"
    : "/hoja-de-vida-en.pdf";

  return (
    <a
      href={file}
      download
      className="my-2 inline-block w-fit cursor-pointer rounded-xl border border-[#4e66ff]/30 bg-[#3f5cff] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#526cff] hover:shadow-[0_12px_28px_-16px_rgba(63,92,255,0.8)]"
    >
      {buttonText}
    </a>
  );
}
