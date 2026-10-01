/**
 * Theme toggle island (vanilla, no framework). Cycles system -> light -> dark.
 * The preference is persisted and resolved by the inline head script
 * (window.__setTheme); this file only drives the button and the reveal.
 */
const ORDER: readonly ThemePreference[] = ["system", "light", "dark"];
const DURATION = 520;

const currentPref = (): ThemePreference => {
  const value = document.documentElement.dataset.themePref;
  return ORDER.find((pref) => pref === value) ?? "system";
};

/** Keeps every toggle's accessible name in sync: "Change theme: dark". */
const sync = () => {
  const pref = currentPref();
  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
    const state = button.dataset[`state${pref[0]?.toUpperCase()}${pref.slice(1)}`];
    button.setAttribute("aria-label", `${button.dataset.label}: ${state}`);
  });
};

// A view transition applies the theme on a later frame; rapid clicks chain from the queued value.
let queued: ThemePreference | null = null;
// The transition that currently owns `data-theme-vt` (only the latest one may clear it).
let running: ViewTransition | null = null;

const cycle = (button: HTMLElement) => {
  const next = ORDER[(ORDER.indexOf(queued ?? currentPref()) + 1) % ORDER.length] ?? "system";
  queued = next;
  const apply = () => {
    window.__setTheme?.(next);
    if (queued === next) queued = null;
    sync();
  };

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || typeof document.startViewTransition !== "function") {
    apply();
    return;
  }

  // Circle reveal growing from the button (global.css disables the default cross-fade).
  const { left, top, width, height } = button.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const root = document.documentElement;
  root.setAttribute("data-theme-vt", "");

  // Overlapping transitions would fight over the pseudo-element animation and the flag.
  running?.skipTransition();
  const transition = document.startViewTransition(apply);
  running = transition;
  void transition.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: DURATION, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
      ),
    )
    .catch(() => {});
  void transition.finished.finally(() => {
    if (running !== transition) return;
    running = null;
    root.removeAttribute("data-theme-vt");
  });
};

// Delegated: the button node is replaced on every ClientRouter navigation.
document.addEventListener("click", (event) => {
  const button = (event.target as Element | null)?.closest<HTMLElement>("[data-theme-toggle]");
  if (button) cycle(button);
});
document.addEventListener("astro:page-load", sync);
sync();

export {};
