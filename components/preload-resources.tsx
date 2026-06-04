"use client";

import ReactDOM from "react-dom";
import { SPLINE_ROBOT_SCENE } from "@/utils/spline";

/**
 * Warms the network path for the 3D hero on first paint.
 *
 * The Spline robot is a cold serial waterfall: the runtime chunk loads, then
 * the ~1.35 MB scene is fetched from prod.spline.design, then a WASM module is
 * pulled from unpkg.com. Without hints, all of that starts late and serially,
 * which on mobile shows as a slow/blank robot until a reload warms the cache.
 *
 * preconnect opens the TLS connections to both external origins early, and
 * preload starts the scene download in parallel with the JS instead of after.
 *
 * The scene preload is gated behind `(prefers-reduced-motion: no-preference)`
 * so users who ask for reduced motion — who get the static hero instead of the
 * Spline robot — never download the ~1.35 MB scene. The media query is resolved
 * by the browser at parse time, so it works without client JS.
 */
export function PreloadResources() {
  ReactDOM.preconnect("https://prod.spline.design", { crossOrigin: "anonymous" });
  ReactDOM.preconnect("https://unpkg.com", { crossOrigin: "anonymous" });
  return (
    <link
      rel="preload"
      as="fetch"
      href={SPLINE_ROBOT_SCENE}
      crossOrigin="anonymous"
      media="(prefers-reduced-motion: no-preference)"
    />
  );
}
