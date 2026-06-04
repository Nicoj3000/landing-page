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
 */
export function PreloadResources() {
  ReactDOM.preconnect("https://prod.spline.design", { crossOrigin: "anonymous" });
  ReactDOM.preconnect("https://unpkg.com", { crossOrigin: "anonymous" });
  ReactDOM.preload(SPLINE_ROBOT_SCENE, { as: "fetch", crossOrigin: "anonymous" });
  return null;
}
