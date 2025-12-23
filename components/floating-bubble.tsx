"use client"

import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface FloatingBubbleProps {
  label: string
  href: string
  size?: number
  initialPosition: { x: number; y: number }
  delay?: number
}

export function FloatingBubble({
  label,
  href,
  size = 180,
  initialPosition,
  delay = 0,
}: FloatingBubbleProps) {
  const router = useRouter()
  const bubbleRef = useRef<HTMLButtonElement>(null)
  const [isBursting, setIsBursting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState(initialPosition)
  const [isHovered, setIsHovered] = useState(false)
  const velocityRef = useRef({ x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (isBursting || isHovered) return

    const animate = () => {
      setPosition((prev) => {
        let newX = prev.x + velocityRef.current.x
        let newY = prev.y + velocityRef.current.y

        // Add slight randomness to movement
        velocityRef.current.x += (Math.random() - 0.5) * 0.02
        velocityRef.current.y += (Math.random() - 0.5) * 0.02

        // Limit velocity
        velocityRef.current.x = Math.max(-1, Math.min(1, velocityRef.current.x))
        velocityRef.current.y = Math.max(-1, Math.min(1, velocityRef.current.y))

        // Bounce off edges with some padding
        const padding = size / 2 + 50
        if (newX < padding || newX > window.innerWidth - padding) {
          velocityRef.current.x *= -0.8
          newX = Math.max(padding, Math.min(window.innerWidth - padding, newX))
        }
        if (newY < padding || newY > window.innerHeight - padding) {
          velocityRef.current.y *= -0.8
          newY = Math.max(padding, Math.min(window.innerHeight - padding, newY))
        }

        return { x: newX, y: newY }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isBursting, isHovered, size])

  const handleClick = () => {
    setIsBursting(true)

    // Navigate after burst animation
    setTimeout(() => {
      router.push(href)
    }, 500)
  }

  return (
    <button
      ref={bubbleRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed z-30 cursor-pointer
        transition-all duration-500
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        ${isBursting ? "bubble-burst pointer-events-none" : ""}
      `}
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) ${isHovered ? "scale(1.1)" : "scale(1)"}`,
        width: size,
        height: size,
      }}
    >
      {/* Outer iridescent glow */}
      <div
        className="absolute inset-0 rounded-full opacity-60"
        style={{
          background: `
            radial-gradient(circle at 30% 30%,
              rgba(0, 71, 171, 0.3) 0%,
              rgba(245, 208, 208, 0.2) 30%,
              rgba(255, 255, 255, 0.1) 60%,
              transparent 70%
            )
          `,
          filter: "blur(8px)",
          transform: "scale(1.2)",
        }}
      />

      {/* Main bubble body */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden iridescent-shimmer"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(0, 71, 171, 0.15) 0%,
              rgba(245, 208, 208, 0.2) 25%,
              rgba(255, 255, 255, 0.3) 50%,
              rgba(255, 249, 230, 0.2) 75%,
              rgba(0, 71, 171, 0.15) 100%
            )
          `,
          backgroundSize: "200% 200%",
          backdropFilter: "blur(2px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: `
            inset 0 0 30px rgba(255, 255, 255, 0.3),
            inset -10px -10px 40px rgba(0, 71, 171, 0.1),
            inset 10px 10px 40px rgba(245, 208, 208, 0.15),
            0 4px 20px rgba(0, 0, 0, 0.05)
          `,
        }}
      />

      {/* Highlight reflection */}
      <div
        className="absolute rounded-full"
        style={{
          width: "40%",
          height: "30%",
          top: "12%",
          left: "15%",
          background: `
            radial-gradient(ellipse at center,
              rgba(255, 255, 255, 0.6) 0%,
              rgba(255, 255, 255, 0.2) 50%,
              transparent 70%
            )
          `,
          transform: "rotate(-25deg)",
        }}
      />

      {/* Secondary highlight */}
      <div
        className="absolute rounded-full"
        style={{
          width: "15%",
          height: "10%",
          top: "25%",
          left: "55%",
          background: `
            radial-gradient(ellipse at center,
              rgba(255, 255, 255, 0.4) 0%,
              transparent 70%
            )
          `,
          transform: "rotate(-15deg)",
        }}
      />

      {/* Bottom reflection */}
      <div
        className="absolute rounded-full"
        style={{
          width: "50%",
          height: "20%",
          bottom: "15%",
          right: "10%",
          background: `
            radial-gradient(ellipse at center,
              rgba(245, 208, 208, 0.2) 0%,
              transparent 70%
            )
          `,
          transform: "rotate(15deg)",
        }}
      />

      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`
            font-sans text-lg tracking-wide
            transition-all duration-300
            ${isHovered ? "text-foreground font-medium" : "text-foreground/70"}
          `}
          style={{
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.5)",
          }}
        >
          {label}
        </span>
      </div>
    </button>
  )
}
