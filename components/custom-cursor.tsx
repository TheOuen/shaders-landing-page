"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const isPointerRef = useRef(false)
  const [gradientAngle, setGradientAngle] = useState(0)
  const angleRef = useRef(0)

  useEffect(() => {
    let animationFrameId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateCursor = () => {
      positionRef.current.x = lerp(positionRef.current.x, targetPositionRef.current.x, 0.15)
      positionRef.current.y = lerp(positionRef.current.y, targetPositionRef.current.y, 0.15)

      // Smoothly rotate the gradient angle
      angleRef.current = (angleRef.current + 0.5) % 360
      setGradientAngle(angleRef.current)

      if (outerRef.current && innerRef.current) {
        const scale = isPointerRef.current ? 1.5 : 1
        const innerScale = isPointerRef.current ? 0.5 : 1

        outerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
        innerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${innerScale})`
      }

      if (gradientRef.current) {
        gradientRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`
        gradientRef.current.style.background = `conic-gradient(
          from ${angleRef.current}deg,
          #0047AB 0deg,
          #6B7FD7 90deg,
          #F5D0D0 180deg,
          #FFFFFF 240deg,
          #FFF9E6 300deg,
          #0047AB 360deg
        )`
      }

      animationFrameId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      isPointerRef.current =
        window.getComputedStyle(target).cursor === "pointer" || target.tagName === "BUTTON" || target.tagName === "A"
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    animationFrameId = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Gradient glow that follows cursor */}
      <div
        ref={gradientRef}
        className="pointer-events-none fixed left-0 top-0 z-40 will-change-transform"
        style={{
          contain: "layout style paint",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          opacity: 0.15,
          filter: "blur(60px)",
        }}
      />

      {/* Outer ring */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-50 will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        <div
          className="h-6 w-6 rounded-full"
          style={{
            border: "2px solid transparent",
            background: `linear-gradient(#e7e5e0, #e7e5e0) padding-box,
                        linear-gradient(${gradientAngle}deg, #0047AB, #F5D0D0, #FFFFFF, #FFF9E6) border-box`,
          }}
        />
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-50 will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        <div
          className="h-2 w-2 rounded-full"
          style={{
            background: `linear-gradient(${gradientAngle}deg, #0047AB, #F5D0D0)`,
          }}
        />
      </div>
    </>
  )
}
