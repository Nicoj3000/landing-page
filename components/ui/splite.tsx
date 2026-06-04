'use client'

import { Suspense, lazy, useCallback, useEffect, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

// Distance (px) below which a touch is treated as a tap, not a scroll swipe.
const TAP_THRESHOLD = 12
// How long the robot holds the glance before easing back to center.
const GLANCE_MS = 1400

export function SplineScene({ scene, className }: SplineSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const downRef = useRef<{ x: number; y: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  // Spline reads pointer position to orient the robot. We can drive it with a
  // synthetic event aimed at any screen point — used for both desktop recenter
  // and the mobile tap-to-look gesture.
  const lookAt = useCallback((clientX: number, clientY: number) => {
    const canvas = wrapperRef.current?.querySelector('canvas')
    if (!canvas) return

    const init: PointerEventInit & MouseEventInit = {
      clientX,
      clientY,
      bubbles: true,
      pointerId: 1,
      pointerType: 'mouse',
      isPrimary: true,
    }
    canvas.dispatchEvent(new PointerEvent('pointermove', init))
    canvas.dispatchEvent(new MouseEvent('mousemove', init))
  }, [])

  // When the pointer leaves the canvas, Spline stops receiving pointermove
  // events and the robot freezes looking at the last position. Ease it back to
  // a neutral, forward-facing pose by aiming at the canvas center.
  const recenter = useCallback(() => {
    const canvas = wrapperRef.current?.querySelector('canvas')
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    lookAt(rect.left + rect.width / 2, rect.top + rect.height / 2)
  }, [lookAt])

  // On touch devices the canvas is pointer-events-none (see wrapper classes), so
  // Spline never traps scroll. The wrapper catches the tap here and, only if the
  // finger barely moved (a tap, not a scroll swipe), makes the robot glance at
  // the touch point and then recenter.
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return
    downRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse' || !downRef.current) return
      const dx = e.clientX - downRef.current.x
      const dy = e.clientY - downRef.current.y
      downRef.current = null
      if (Math.hypot(dx, dy) > TAP_THRESHOLD) return // it was a scroll swipe

      lookAt(e.clientX, e.clientY)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(recenter, GLANCE_MS)
    },
    [lookAt, recenter],
  )

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <div
      ref={wrapperRef}
      // touch-action: pan-y keeps vertical scrolling with the browser. The canvas
      // is non-interactive on touch (tap-to-look) and only follows the cursor on
      // desktop (xl+), where Spline handles hover natively.
      className={`${className ?? ''} [touch-action:pan-y] [&_canvas]:pointer-events-none xl:[&_canvas]:pointer-events-auto`}
      onPointerLeave={recenter}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <span className="loader" aria-label="Loading 3D scene" />
          </div>
        }
      >
        <Spline scene={scene} className="h-full w-full" />
      </Suspense>
    </div>
  )
}
