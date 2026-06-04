'use client'

import { Suspense, lazy, useCallback, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  /** Accessible label for the loading state, already localized by the caller. */
  loadingLabel?: string
}

export function SplineScene({ scene, className, loadingLabel }: SplineSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Desktop only: the robot follows the cursor (Spline "mouseHover"). When the
  // pointer leaves, Spline freezes looking at the last position, so we aim a
  // synthetic move at the canvas center to ease it back to a neutral pose.
  // On touch devices Spline has no hover — it handles drag-to-rotate natively —
  // so this is a no-op there.
  const recenter = useCallback(() => {
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
        <Spline scene={scene} className="h-full w-full" />
      </Suspense>
    </div>
  )
}
