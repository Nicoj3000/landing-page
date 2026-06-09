'use client'

import { Suspense, lazy, useCallback, useRef } from 'react'
import type { Application } from '@splinetool/runtime'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  /** Accessible label for the loading state, already localized by the caller. */
  loadingLabel?: string
  /**
   * When true, the scene's baked-in background color is overridden to
   * `transparent` once the runtime loads, so the page/card shows through
   * instead of the scene's opaque backdrop.
   */
  transparentBackground?: boolean
}

export function SplineScene({ scene, className, loadingLabel, transparentBackground }: SplineSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // The robot scene ships with an opaque royal-blue backdrop that clashes with
  // the dark glass card. The runtime can only be told the real background color
  // after it loads, so we override it here via the Application instance.
  const handleLoad = useCallback(
    (app: Application) => {
      if (transparentBackground) app.setBackgroundColor('transparent')
    },
    [transparentBackground],
  )

  // Desktop only: the robot follows the cursor (Spline "mouseHover"). When the
  // pointer leaves, Spline freezes looking at the last position, so we aim a
  // synthetic move at the canvas center to ease it back to a neutral pose.
  //
  // This MUST be gated to true hover/mouse devices. On touch, `pointerleave`
  // still fires when the finger lifts after a scroll, and dispatching a
  // synthetic mouse move makes the robot crane toward the canvas center
  // (looking up/down) instead of staying neutral. We only want it where a real
  // cursor exists; touch handles drag-to-rotate natively.
  const recenter = useCallback(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const canvas = wrapperRef.current?.querySelector('canvas')
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const init: PointerEventInit & MouseEventInit = {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
      bubbles: true,
      pointerId: 1,
      pointerType: 'mouse',
      isPrimary: true,
    }
    canvas.dispatchEvent(new PointerEvent('pointermove', init))
    canvas.dispatchEvent(new MouseEvent('mousemove', init))
  }, [])

  return (
    <div
      ref={wrapperRef}
      // touch-action: pan-y lets the browser keep vertical scrolling while
      // horizontal drags reach Spline's native touch controls to rotate the
      // robot. The canvas stays interactive on every breakpoint.
      className={`${className ?? ''} [touch-action:pan-y] [&_canvas]:[touch-action:pan-y]`}
      onPointerLeave={recenter}
    >
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <span className="loader" aria-label={loadingLabel ?? 'Loading 3D scene'} />
          </div>
        }
      >
        <Spline scene={scene} className="h-full w-full" onLoad={handleLoad} />
      </Suspense>
    </div>
  )
}
