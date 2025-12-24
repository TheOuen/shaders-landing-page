"use client"

import { useEffect, useRef } from "react"

export function CursorRevealBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null)
  const animationRef = useRef<number>(0)
  const imageLoadedRef = useRef(false)

  // Brush settings
  const BRUSH_SIZE = 60
  const FADE_AMOUNT = 0.008 // How fast strokes fade (lower = slower fade)
  const MIN_DISTANCE = 2 // Minimum distance to trigger a stroke

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create offscreen mask canvas
    const maskCanvas = document.createElement("canvas")
    maskCanvasRef.current = maskCanvas

    // Load the background image
    const img = new Image()
    img.onload = () => {
      imageRef.current = img
      imageLoadedRef.current = true
    }
    img.src = "/PHOTO-2025-12-24-13-13-54.jpg"

    const resizeCanvases = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width
      canvas.height = height

      // Preserve mask content when resizing
      const maskCtx = maskCanvas.getContext("2d")
      if (maskCtx && maskCanvas.width > 0 && maskCanvas.height > 0) {
        const imageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height)
        maskCanvas.width = width
        maskCanvas.height = height
        maskCtx.putImageData(imageData, 0, 0)
      } else {
        maskCanvas.width = width
        maskCanvas.height = height
      }
    }

    resizeCanvases()
    window.addEventListener("resize", resizeCanvases)

    // Drawing function
    const draw = () => {
      const ctx = canvas.getContext("2d")
      const maskCtx = maskCanvas.getContext("2d")
      const image = imageRef.current

      if (!ctx || !maskCtx || !image || !imageLoadedRef.current) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }

      // Fade the mask canvas gradually
      const maskImageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height)
      const data = maskImageData.data
      for (let i = 3; i < data.length; i += 4) {
        // Reduce alpha channel
        if (data[i] > 0) {
          data[i] = Math.max(0, data[i] - FADE_AMOUNT * 255)
        }
      }
      maskCtx.putImageData(maskImageData, 0, 0)

      // Clear main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate image dimensions to cover the canvas
      const imageAspect = image.width / image.height
      const canvasAspect = canvas.width / canvas.height

      let drawWidth, drawHeight, drawX, drawY

      if (canvasAspect > imageAspect) {
        drawWidth = canvas.width
        drawHeight = canvas.width / imageAspect
        drawX = 0
        drawY = (canvas.height - drawHeight) / 2
      } else {
        drawHeight = canvas.height
        drawWidth = canvas.height * imageAspect
        drawX = (canvas.width - drawWidth) / 2
        drawY = 0
      }

      // Draw background image
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight)

      // Use mask to reveal only painted areas
      ctx.globalCompositeOperation = "destination-in"
      ctx.drawImage(maskCanvas, 0, 0)
      ctx.globalCompositeOperation = "source-over"

      animationRef.current = requestAnimationFrame(draw)
    }

    // Brush stroke function
    const paintStroke = (x: number, y: number, lastX: number, lastY: number) => {
      const maskCtx = maskCanvas.getContext("2d")
      if (!maskCtx) return

      // Calculate velocity for dynamic brush size
      const dx = x - lastX
      const dy = y - lastY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const speed = Math.min(distance, 50)

      // Brush size varies slightly with speed (faster = slightly larger)
      const brushSize = BRUSH_SIZE + speed * 0.3

      // Create gradient for soft brush edge
      const gradient = maskCtx.createRadialGradient(x, y, 0, x, y, brushSize)
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.3)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      // Draw line from last position to current for continuous stroke
      maskCtx.strokeStyle = gradient
      maskCtx.lineWidth = brushSize * 2
      maskCtx.lineCap = "round"
      maskCtx.lineJoin = "round"

      maskCtx.beginPath()
      maskCtx.moveTo(lastX, lastY)
      maskCtx.lineTo(x, y)
      maskCtx.stroke()

      // Also draw a circle at current position for extra coverage
      maskCtx.fillStyle = gradient
      maskCtx.beginPath()
      maskCtx.arc(x, y, brushSize, 0, Math.PI * 2)
      maskCtx.fill()
    }

    // Interpolate points for smooth strokes
    const interpolateAndPaint = (x: number, y: number) => {
      if (!lastMouseRef.current) {
        lastMouseRef.current = { x, y }
        return
      }

      const lastX = lastMouseRef.current.x
      const lastY = lastMouseRef.current.y
      const dx = x - lastX
      const dy = y - lastY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < MIN_DISTANCE) return

      // Interpolate for smooth continuous strokes
      const steps = Math.max(1, Math.floor(distance / 4))

      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const interpX = lastX + dx * t
        const interpY = lastY + dy * t
        const prevX = i === 0 ? lastX : lastX + dx * ((i - 1) / steps)
        const prevY = i === 0 ? lastY : lastY + dy * ((i - 1) / steps)

        paintStroke(interpX, interpY, prevX, prevY)
      }

      lastMouseRef.current = { x, y }
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      interpolateAndPaint(e.clientX, e.clientY)
    }

    // Touch support
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        interpolateAndPaint(touch.clientX, touch.clientY)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        lastMouseRef.current = { x: touch.clientX, y: touch.clientY }
      }
    }

    // Reset last position when mouse leaves/enters
    const handleMouseLeave = () => {
      lastMouseRef.current = null
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("resize", resizeCanvases)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  )
}
