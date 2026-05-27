"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-32 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#0d1326]/80 text-slate-300 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-secondary/60 hover:text-white hover:shadow-[0_0_16px_rgba(63,92,255,0.4)] sm:bottom-8 sm:right-6"
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default ScrollToTop;
