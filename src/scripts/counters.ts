/**
 * Count-up for [data-counter]. The server renders the final number; this only
 * replays 0 -> N when the element enters the viewport. Skipped entirely under
 * reduced motion (final numbers stay untouched).
 */
const DURATION = 1400;

const run = (el: HTMLElement) => {
  const target = Number(el.dataset.counterTo);
  const start = performance.now();
  const frame = (now: number) => {
    const t = Math.min((now - start) / DURATION, 1);
    el.textContent = String(t === 1 ? target : Math.round(target * (1 - 2 ** (-10 * t))));
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

const init = () => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  const pending = document.querySelectorAll<HTMLElement>("[data-counter]:not([data-armed])");
  if (!pending.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        run(entry.target as HTMLElement);
      }
    },
    { threshold: 0.6 },
  );
  pending.forEach((el) => {
    el.dataset.armed = "";
    el.textContent = "0";
    observer.observe(el);
  });
};

document.addEventListener("astro:page-load", init);

export {};
