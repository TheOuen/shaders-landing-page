"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { BubbleContainer } from "@/components/bubble-container"
import { CursorRevealBackground } from "@/components/cursor-reveal-background"
import { useCallback, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const services = [
  { label: "Architecture", href: "/architecture" },
  { label: "Interior", href: "/interior" },
  { label: "Styling", href: "/styling" },
  { label: "Photography", href: "/photography" },
]

export default function Home() {
  const router = useRouter()
  const [introComplete, setIntroComplete] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [skipIntro, setSkipIntro] = useState(false)

  // Check if user has already seen the intro
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("aquadro-intro-seen")
    if (hasSeenIntro) {
      setSkipIntro(true)
      setIntroComplete(true)
      setShowTitle(true)
    }
  }, [])

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
    // Mark intro as seen in session storage
    sessionStorage.setItem("aquadro-intro-seen", "true")
    // Delay the title fade-in for a smoother reveal
    setTimeout(() => {
      setShowTitle(true)
    }, 300)
  }, [])

  const handleContactClick = () => {
    router.push("/contact")
  }

  return (
    <main
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#e7e5e0" }}
    >
      <CursorRevealBackground />
      <CustomCursor />
      <GrainOverlay />

      {/* Central branding - AQUADRO / STUDIO */}
      <div
        className={`fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none transition-all duration-[1500ms] ease-out ${
          showTitle ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1
          className={`font-sans text-6xl md:text-8xl lg:text-9xl font-extralight tracking-[0.2em] text-foreground/90 select-none uppercase transition-all duration-[1500ms] ease-out ${
            showTitle ? "translate-y-0" : "translate-y-4"
          }`}
        >
          Aquadro
        </h1>
        <p
          className={`mt-2 md:mt-4 font-sans text-2xl md:text-3xl lg:text-4xl font-extralight tracking-[0.5em] text-foreground/60 uppercase transition-all duration-[1500ms] ease-out ${
            showTitle ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: showTitle ? "200ms" : "0ms" }}
        >
          Studio
        </p>
        <p
          className={`mt-6 font-sans text-xs tracking-[0.4em] text-foreground/40 uppercase transition-all duration-[1500ms] ease-out ${
            showTitle ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: showTitle ? "400ms" : "0ms" }}
        >
          Design & Photography
        </p>
      </div>

      {/* Bubble intro and service words */}
      <BubbleContainer
        services={services}
        onIntroComplete={handleIntroComplete}
        skipIntro={skipIntro}
      />

      {/* Contact link at bottom */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-1000 ${
          showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: showTitle ? "600ms" : "0ms" }}
      >
        <button
          onClick={handleContactClick}
          className="font-sans text-xs tracking-[0.3em] text-foreground/40 uppercase hover:text-foreground/70 transition-colors duration-300 cursor-pointer"
        >
          Let's Talk
        </button>
      </div>
    </main>
  )
}
