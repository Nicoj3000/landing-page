'use client'

import { Suspense, lazy, useCallback, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // When the pointer leaves the canvas, Spline stops receiving pointermove
  // events and the robot freezes looking at the last position. We dispatch a
  // synthetic centered move so it eases back to a neutral, forward-facing pose.
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
    <div ref={wrapperRef} className={className} onPointerLeave={recenter}>
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
