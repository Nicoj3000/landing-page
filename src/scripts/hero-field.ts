/**
 * Pointer-reactive dot field for the hero. Vanilla canvas, loaded at idle:
 * never touches LCP, pauses off-screen / in background tabs, DPR capped at 2,
 * and does nothing at all under prefers-reduced-motion or on coarse pointers (the CSS dot
 * pattern stays).
 * The frame loop only runs while the pointer is moving the field.
 */
const GAP = 26;
const RADIUS = 150;

const init = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("canvas[data-dot-field]");
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx || canvas.dataset.ready || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // Touch devices never get the pointer effect: skip the canvas (CSS hides it, the static pattern stays).
  if (matchMedia("(pointer: coarse)").matches) {
    canvas.dataset.skipped = "coarse-pointer";
    return;
  }

  let w = 0;
  let h = 0;
  let tx = -1e4;
  let ty = -1e4;
  let px = tx;
  let py = ty;
  let raf = 0;
  let onScreen = true;

  const active = () => onScreen && !document.hidden;
  const publish = () => (canvas.dataset.active = String(active()));

  const draw = () => {
    const css = getComputedStyle(canvas);
    const base = css.getPropertyValue("--dot");
    const accent = css.getPropertyValue("--accent");
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = base;
    ctx.beginPath();
    const lit: Array<[number, number, number]> = [];
    for (let x = GAP / 2; x < w; x += GAP) {
      for (let y = GAP / 2; y < h; y += GAP) {
        const dx = x - px;
        const dy = y - py;
        const d = Math.hypot(dx, dy);
        if (d >= RADIUS) {
          ctx.rect(x - 1, y - 1, 2, 2);
        } else {
          const t = 1 - d / RADIUS;
          const push = (t * t * 16) / (d || 1);
          lit.push([x + dx * push, y + dy * push, t]);
        }
      }
    }
    ctx.fill();
    ctx.fillStyle = accent;
    for (const [x, y, t] of lit) {
      ctx.globalAlpha = 0.3 + 0.7 * t;
      ctx.beginPath();
      ctx.arc(x, y, 1.2 + t * 2.4, 0, 6.2832);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const tick = () => {
    px += (tx - px) * 0.18;
    py += (ty - py) * 0.18;
    draw();
    raf = Math.abs(tx - px) + Math.abs(ty - py) > 0.5 && active() ? requestAnimationFrame(tick) : 0;
  };
  const wake = () => {
    if (!raf && active()) raf = requestAnimationFrame(tick);
  };

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    ({ width: w, height: h } = canvas.getBoundingClientRect());
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  };

  addEventListener(
    "pointermove",
    (e) => {
      if (!active()) return;
      const r = canvas.getBoundingClientRect();
      if (px < -1e3) [px, py] = [e.clientX - r.left, e.clientY - r.top];
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      wake();
    },
    { passive: true },
  );
  document.documentElement.addEventListener(
    "pointerleave",
    () => {
      tx = ty = -1e4;
      wake();
    },
  );
  document.addEventListener("visibilitychange", publish);

  const io = new IntersectionObserver(([entry]) => {
    onScreen = !!entry?.isIntersecting;
    publish();
    wake();
  });
  const ro = new ResizeObserver(resize);
  const theme = new MutationObserver(draw);
  io.observe(canvas);
  ro.observe(canvas);
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  resize();
  publish();
  canvas.dataset.ready = "true";
};

const schedule = () => {
  if ("requestIdleCallback" in window) requestIdleCallback(init, { timeout: 1500 });
  else setTimeout(init, 200);
};

// Module scripts are deferred: the DOM is parsed, and each page is a fresh document.
schedule();

export {};
