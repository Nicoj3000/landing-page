import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada | NicoX",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-[1400px] flex-col items-center justify-center gap-4 px-5 pb-40 pt-28 text-center md:pb-10">
      <p className="text-7xl font-extrabold text-secondary md:text-8xl">404</p>
      <h1 className="text-2xl font-bold text-foreground md:text-3xl">
        Página no encontrada
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-subtle-foreground md:text-base">
        La página que buscas no existe o fue movida.
        <br />
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl border border-[#4e66ff]/30 bg-[#3f5cff] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#526cff] hover:shadow-[0_12px_28px_-16px_rgba(63,92,255,0.8)]"
      >
        Volver al inicio / Back home
      </Link>
    </div>
  );
}
