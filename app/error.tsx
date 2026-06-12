"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-[1400px] flex-col items-center justify-center gap-4 px-5 pb-40 pt-28 text-center md:pb-10">
      <p className="text-6xl font-extrabold text-secondary md:text-7xl">¡Ups!</p>
      <h1 className="text-2xl font-bold text-foreground md:text-3xl">
        Algo salió mal
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-subtle-foreground md:text-base">
        Ocurrió un error inesperado. Puedes intentar de nuevo.
        <br />
        Something unexpected happened. You can try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl border border-[#4e66ff]/30 bg-[#3f5cff] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#526cff] hover:shadow-[0_12px_28px_-16px_rgba(63,92,255,0.8)]"
      >
        Reintentar / Try again
      </button>
    </div>
  );
}
