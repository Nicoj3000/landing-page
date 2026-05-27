"use client"

import React, { useEffect, useRef, useState } from "react"
import { renderToString } from "react-dom/server"

interface Icon {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}

interface IconCloudProps {
  icons?: React.ReactNode[]
  images?: string[]
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function IconCloud({ icons, images }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<Icon[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetRotation, setTargetRotation] = useState<{
    x: number; y: number; startX: number; startY: number
    distance: number; startTime: number; duration: number
  } | null>(null)
  const animationFrameRef = useRef<number>(0)
  const rotationRef = useRef({ x: 0, y: 0 })
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])

  useEffect(() => {
    if (!icons && !images) return
    const items = icons ?? images ?? []
    imagesLoadedRef.current = new Array(items.length).fill(false)

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = 40
      offscreen.height = 40
      const offCtx = offscreen.getContext("2d")
      if (offCtx) {
        if (images) {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = items[index] as string
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.beginPath()
            offCtx.arc(20, 20, 20, 0, Math.PI * 2)
            offCtx.closePath()
            offCtx.clip()
            offCtx.drawImage(img, 0, 0, 40, 40)
            imagesLoadedRef.current[index] = true
          }
        } else {
          offCtx.scale(0.4, 0.4)
          const svgString = renderToString(item as React.ReactElement)
          const img = new Image()
          img.src = "data:image/svg+xml;base64," + btoa(svgString)
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.drawImage(img, 0, 0)
            imagesLoadedRef.current[index] = true
          }
        }
      }
      return offscreen
    })
    iconCanvasesRef.current = newIconCanvases
  }, [icons, images])

  useEffect(() => {
    const items = icons ?? images ?? []
    const newIcons: Icon[] = []
    const numIcons = items.length || 20
    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment
      newIcons.push({ x: Math.cos(phi) * r * 100, y: y * 100, z: Math.sin(phi) * r * 100, scale: 1, opacity: 1, id: i })
    }
    setIconPositions(newIcons)
  }, [icons, images])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !canvasRef.current) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x), sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y), sinY = Math.sin(rotationRef.current.y)
      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX
      const screenX = canvasRef.current!.width / 2 + rotatedX
      const screenY = canvasRef.current!.height / 2 + rotatedY
      const scale = (rotatedZ + 200) / 300
      const dx = x - screenX, dy = y - screenY
      if (dx * dx + dy * dy < (20 * scale) ** 2) {
        const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x ** 2 + icon.z ** 2))
        const targetY = Math.atan2(icon.x, icon.z)
        const currentX = rotationRef.current.x, currentY = rotationRef.current.y
        const distance = Math.sqrt((targetX - currentX) ** 2 + (targetY - currentY) ** 2)
        setTargetRotation({ x: targetX, y: targetY, startX: currentX, startY: currentY, distance, startTime: performance.now(), duration: Math.min(2000, Math.max(800, distance * 1000)) })
      }
    })
    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    if (isDragging) {
      rotationRef.current = { x: rotationRef.current.x + (e.clientY - lastMousePos.y) * 0.002, y: rotationRef.current.y + (e.clientX - lastMousePos.x) * 0.002 }
      setLastMousePos({ x: e.clientX, y: e.clientY })
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const centerX = canvas.width / 2, centerY = canvas.height / 2
      const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2)
      const dx = mousePos.x - centerX, dy = mousePos.y - centerY
      const speed = 0.003 + (Math.sqrt(dx ** 2 + dy ** 2) / maxDistance) * 0.01

      if (targetRotation) {
        const progress = Math.min(1, (performance.now() - targetRotation.startTime) / targetRotation.duration)
        const ep = easeOutCubic(progress)
        rotationRef.current = { x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * ep, y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * ep }
        if (progress >= 1) setTargetRotation(null)
      } else if (!isDragging) {
        rotationRef.current = { x: rotationRef.current.x + (dy / canvas.height) * speed, y: rotationRef.current.y + (dx / canvas.width) * speed }
      }

      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x), sinX = Math.sin(rotationRef.current.x)
        const cosY = Math.cos(rotationRef.current.y), sinY = Math.sin(rotationRef.current.y)
        const rotatedX = icon.x * cosY - icon.z * sinY
        const rotatedZ = icon.x * sinY + icon.z * cosY
        const rotatedY = icon.y * cosX + rotatedZ * sinX
        const scale = (rotatedZ + 200) / 300
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200))
        ctx.save()
        ctx.translate(canvas.width / 2 + rotatedX, canvas.height / 2 + rotatedY)
        ctx.scale(scale, scale)
        ctx.globalAlpha = opacity
        if ((icons || images) && iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
          ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40)
        }
        ctx.restore()
      })
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current) }
  }, [icons, images, iconPositions, isDragging, mousePos, targetRotation])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      className="rounded-lg block max-w-full h-auto mx-auto"
      style={{ width: "100%", maxWidth: 400, aspectRatio: "1 / 1" }}
      aria-label="Interactive 3D Icon Cloud"
      role="img"
    />
  )
}
