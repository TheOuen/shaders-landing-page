"use client"

import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ServiceWord {
  label: string
  href: string
  x: number
  y: number
  targetX: number
  targetY: number
  opacity: number
  scale: number
}

interface BubbleContainerProps {
  services: { label: string; href: string }[]
  onIntroComplete: () => void
  skipIntro?: boolean
}

export function BubbleContainer({ services, onIntroComplete, skipIntro = false }: BubbleContainerProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<"growing" | "holding" | "bursting" | "words-visible" | "words-flying" | "done">("growing")
  const [words, setWords] = useState<ServiceWord[]>([])
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)
  const [gradientOffset, setGradientOffset] = useState({ x: 0, y: 0, angle: 0 })
  const animationRef = useRef<number>()
  const gradientAnimationRef = useRef<number>()

  // Animate the gradient drifting
  useEffect(() => {
    let time = 0
    const animateGradient = () => {
      time += 0.008
      setGradientOffset({
        x: Math.sin(time * 0.7) * 20 + Math.sin(time * 1.3) * 10,
        y: Math.cos(time * 0.5) * 15 + Math.cos(time * 1.1) * 8,
        angle: time * 15,
      })
      gradientAnimationRef.current = requestAnimationFrame(animateGradient)
    }

    gradientAnimationRef.current = requestAnimationFrame(animateGradient)

    return () => {
      if (gradientAnimationRef.current) {
        cancelAnimationFrame(gradientAnimationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const centerX = width / 2
    const centerY = height / 2
    const isMobile = width < 768

    // Calculate corner positions for words - adjust for mobile
    const padding = isMobile ? 20 : 60
    // On mobile, position items below title (title is at ~40% from top due to -mt-24 offset)
    const mobileStartY = height * 0.52
    const mobileSpacing = 50
    const corners = isMobile
      ? [
          // On mobile: stack vertically below the title
          { x: centerX, y: mobileStartY },
          { x: centerX, y: mobileStartY + mobileSpacing },
          { x: centerX, y: mobileStartY + mobileSpacing * 2 },
          { x: centerX, y: mobileStartY + mobileSpacing * 3 },
        ]
      : [
          { x: padding + 80, y: padding + 40 }, // top-left
          { x: width - padding - 80, y: padding + 40 }, // top-right
          { x: padding + 80, y: height - padding - 40 }, // bottom-left
          { x: width - padding - 80, y: height - padding - 40 }, // bottom-right
        ]

    // Position words around the bubble initially
    const wordPositions = isMobile
      ? [
          { x: centerX, y: centerY },
          { x: centerX, y: centerY },
          { x: centerX, y: centerY },
          { x: centerX, y: centerY },
        ]
      : [
          { x: centerX - 100, y: centerY - 60 }, // top-left of center
          { x: centerX + 100, y: centerY - 60 }, // top-right of center
          { x: centerX - 100, y: centerY + 60 }, // bottom-left of center
          { x: centerX + 100, y: centerY + 60 }, // bottom-right of center
        ]

    // If skipping intro, go directly to final state
    if (skipIntro) {
      const finalWords: ServiceWord[] = services.map((service, i) => ({
        label: service.label,
        href: service.href,
        x: corners[i].x,
        y: corners[i].y,
        targetX: corners[i].x,
        targetY: corners[i].y,
        opacity: 1,
        scale: 1,
      }))
      setWords(finalWords)
      setPhase("done")
      return
    }

    const initialWords: ServiceWord[] = services.map((service, i) => ({
      label: service.label,
      href: service.href,
      x: wordPositions[i].x,
      y: wordPositions[i].y,
      targetX: corners[i].x,
      targetY: corners[i].y,
      opacity: 0,
      scale: 0.8,
    }))

    setWords(initialWords)

    // Slower animation timeline
    // Phase 1: Bubble grows in (1.5s)
    const growTimer = setTimeout(() => setPhase("holding"), 1500)

    // Phase 2: Hold the bubble (1s more)
    const holdTimer = setTimeout(() => setPhase("bursting"), 2500)

    // Phase 3: Bubble bursts, words become visible at center (0.5s)
    const wordsVisibleTimer = setTimeout(() => {
      setPhase("words-visible")
      setWords(prev => prev.map(w => ({ ...w, opacity: 1, scale: 1 })))
    }, 3000)

    // Phase 4: Words hover in place for a moment (1.5s)
    const wordsHoverTimer = setTimeout(() => {
      setPhase("words-flying")
    }, 4500)

    // Phase 5: Words reach corners, intro complete (1.5s more)
    const doneTimer = setTimeout(() => {
      setPhase("done")
      onIntroComplete()
    }, 6000)

    return () => {
      clearTimeout(growTimer)
      clearTimeout(holdTimer)
      clearTimeout(wordsVisibleTimer)
      clearTimeout(wordsHoverTimer)
      clearTimeout(doneTimer)
    }
  }, [services, onIntroComplete, skipIntro])

  // Animate words flying to corners
  useEffect(() => {
    if (phase !== "words-flying" && phase !== "done") return

    const animate = () => {
      setWords(prev => prev.map(word => {
        const dx = word.targetX - word.x
        const dy = word.targetY - word.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 1) {
          return { ...word, x: word.targetX, y: word.targetY, scale: 1 }
        }

        const speed = 0.06
        return {
          ...word,
          x: word.x + dx * speed,
          y: word.y + dy * speed,
          scale: 1,
        }
      }))

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [phase])

  const handleWordClick = (word: ServiceWord) => {
    router.push(word.href)
  }

  return (
    <>
      {/* Central gradient bubble */}
      {(phase === "growing" || phase === "holding" || phase === "bursting") && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div
            className={`rounded-full transition-all ease-out relative overflow-hidden ${
              phase === "bursting" ? "scale-[2] opacity-0" : ""
            }`}
            style={{
              width: phase === "growing" ? 0 : 340,
              height: phase === "growing" ? 0 : 340,
              transitionDuration: phase === "growing" ? "1500ms" : phase === "bursting" ? "500ms" : "0ms",
              transitionTimingFunction: phase === "growing" ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "ease-out",
            }}
          >
            {/* Base layer */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "#e7e5e0",
              }}
            />

            {/* Drifting gradient blobs */}
            <div
              className="absolute rounded-full blur-xl"
              style={{
                width: "70%",
                height: "70%",
                left: `${15 + gradientOffset.x * 0.5}%`,
                top: `${10 + gradientOffset.y * 0.5}%`,
                background: "radial-gradient(circle, #0047AB 0%, transparent 70%)",
                opacity: 0.7,
              }}
            />
            <div
              className="absolute rounded-full blur-xl"
              style={{
                width: "60%",
                height: "60%",
                right: `${10 - gradientOffset.x * 0.4}%`,
                top: `${20 + gradientOffset.y * 0.6}%`,
                background: "radial-gradient(circle, #F5D0D0 0%, transparent 70%)",
                opacity: 0.8,
              }}
            />
            <div
              className="absolute rounded-full blur-xl"
              style={{
                width: "55%",
                height: "55%",
                left: `${25 + gradientOffset.y * 0.3}%`,
                bottom: `${5 - gradientOffset.x * 0.4}%`,
                background: "radial-gradient(circle, #FFF9E6 0%, transparent 70%)",
                opacity: 0.75,
              }}
            />
            <div
              className="absolute rounded-full blur-lg"
              style={{
                width: "45%",
                height: "45%",
                right: `${20 + gradientOffset.x * 0.3}%`,
                bottom: `${15 + gradientOffset.y * 0.5}%`,
                background: "radial-gradient(circle, #d4d1cc 0%, transparent 70%)",
                opacity: 0.6,
              }}
            />

            {/* Iridescent shimmer overlay */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  linear-gradient(
                    ${gradientOffset.angle}deg,
                    transparent 0%,
                    rgba(255, 255, 255, 0.15) 20%,
                    transparent 40%,
                    rgba(255, 255, 255, 0.1) 60%,
                    transparent 80%,
                    rgba(255, 255, 255, 0.12) 100%
                  )
                `,
              }}
            />

            {/* Glass-like border */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.5)",
                boxShadow: `
                  inset 0 0 60px rgba(255, 255, 255, 0.3),
                  0 0 40px rgba(0, 71, 171, 0.1),
                  0 0 80px rgba(245, 208, 208, 0.08)
                `,
              }}
            />

            {/* Main highlight */}
            <div
              className="absolute rounded-full"
              style={{
                width: "45%",
                height: "35%",
                top: "8%",
                left: "10%",
                background: `
                  radial-gradient(ellipse at center,
                    rgba(255, 255, 255, 0.9) 0%,
                    rgba(255, 255, 255, 0.4) 30%,
                    transparent 70%
                  )
                `,
                transform: "rotate(-30deg)",
              }}
            />

            {/* Secondary highlight */}
            <div
              className="absolute rounded-full"
              style={{
                width: "20%",
                height: "12%",
                top: "20%",
                left: "55%",
                background: `
                  radial-gradient(ellipse at center,
                    rgba(255, 255, 255, 0.6) 0%,
                    transparent 70%
                  )
                `,
                transform: "rotate(-15deg)",
              }}
            />
          </div>

          {/* Burst particles */}
          {phase === "bursting" && (
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(16)].map((_, i) => {
                const angle = (i / 16) * Math.PI * 2
                const colors = ["#0047AB", "#F5D0D0", "#FFF9E6", "#d4d1cc"]
                return (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 6 + (i % 3) * 4,
                      height: 6 + (i % 3) * 4,
                      background: colors[i % 4],
                      opacity: 0.7,
                      transform: `rotate(${angle}rad) translateX(0)`,
                      animation: `burst-particle-${i % 4} 0.8s ease-out forwards`,
                    }}
                  />
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Service words */}
      {(phase === "words-visible" || phase === "words-flying" || phase === "done") && (
        <div className="fixed inset-0 z-30 pointer-events-none">
          {words.map((word) => (
            <button
              key={word.label}
              onClick={() => handleWordClick(word)}
              onMouseEnter={() => setHoveredWord(word.label)}
              onMouseLeave={() => setHoveredWord(null)}
              onTouchStart={() => setHoveredWord(word.label)}
              onTouchEnd={() => setTimeout(() => setHoveredWord(null), 150)}
              className="absolute pointer-events-auto cursor-pointer transition-all duration-500"
              style={{
                left: word.x,
                top: word.y,
                transform: `translate(-50%, -50%) scale(${word.scale})`,
                opacity: word.opacity,
                padding: '12px 16px',
              }}
            >
              <span
                className={`
                  font-sans text-base md:text-base tracking-[0.25em] uppercase
                  transition-all duration-300
                  ${hoveredWord === word.label
                    ? "text-foreground/90"
                    : "text-foreground/50"
                  }
                `}
                style={{
                  textShadow: hoveredWord === word.label
                    ? "0 0 20px rgba(0, 71, 171, 0.2)"
                    : "none",
                }}
              >
                {word.label}
              </span>
              {/* Underline on hover */}
              <div
                className={`
                  absolute left-1/2 -translate-x-1/2 bottom-2 h-px bg-foreground/30
                  transition-all duration-300 origin-center
                  ${hoveredWord === word.label ? "scale-x-100 w-full" : "scale-x-0 w-full"}
                `}
                style={{ maxWidth: 'calc(100% - 32px)' }}
              />
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes burst-particle-0 {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateX(-150px) translateY(-100px) scale(0); opacity: 0; }
        }
        @keyframes burst-particle-1 {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateX(150px) translateY(-100px) scale(0); opacity: 0; }
        }
        @keyframes burst-particle-2 {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateX(-150px) translateY(100px) scale(0); opacity: 0; }
        }
        @keyframes burst-particle-3 {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateX(150px) translateY(100px) scale(0); opacity: 0; }
        }
      `}</style>
    </>
  )
}
