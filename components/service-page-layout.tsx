"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"

interface Project {
  id: string
  title: string
  category: string
  year: string
  description: string
  imageUrl?: string
}

interface ServicePageLayoutProps {
  title: string
  subtitle: string
  description: string
  projects: Project[]
  accentColor?: string
}

export function ServicePageLayout({
  title,
  subtitle,
  description,
  projects,
  accentColor = "#0047AB",
}: ServicePageLayoutProps) {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState<"portfolio" | "query">("portfolio")
  const [queryText, setQueryText] = useState("")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle query submission - could integrate with AI, email, etc.
    alert(`Thank you for your inquiry about ${title.toLowerCase()}. We'll get back to you soon!`)
    setQueryText("")
  }

  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: "#e7e5e0" }}
    >
      <CustomCursor />
      <GrainOverlay />

      {/* Header */}
      <header
        className={`fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-8 py-6 transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: "rgba(231, 229, 224, 0.9)", backdropFilter: "blur(10px)" }}
      >
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-3 group"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ border: `1px solid ${accentColor}20` }}
          >
            <svg
              className="w-4 h-4 text-foreground/60 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="font-sans text-sm font-light tracking-widest text-foreground/60 uppercase group-hover:text-foreground/80 transition-colors">
            Aquadro Studio
          </span>
        </button>

        <nav className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`font-sans text-sm tracking-wide transition-all ${
              activeTab === "portfolio"
                ? "text-foreground"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab("query")}
            className={`font-sans text-sm tracking-wide transition-all ${
              activeTab === "query"
                ? "text-foreground"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            Inquire
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className={`relative pt-32 pb-16 px-8 md:px-16 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: accentColor }}
          >
            {subtitle}
          </p>
          <h1 className="font-sans text-6xl md:text-8xl font-extralight tracking-tight text-foreground mb-8">
            {title}
          </h1>
          <p className="font-sans text-lg text-foreground/60 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Content based on active tab */}
      {activeTab === "portfolio" ? (
        <section
          className={`px-8 md:px-16 pb-24 transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-1">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group border-b border-foreground/10 py-8 md:py-12 cursor-pointer transition-all duration-500 ${
                    isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => router.push(`${window.location.pathname}/${project.id}`)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-6">
                      {/* Square image placeholder */}
                      <div
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: `${accentColor}08` }}
                      >
                        {project.imageUrl ? (
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ border: `1px solid ${accentColor}15` }}
                          >
                            <svg
                              className="w-6 h-6"
                              style={{ color: `${accentColor}30` }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span
                        className="font-mono text-sm transition-colors hidden md:block"
                        style={{
                          color: hoveredProject === project.id ? accentColor : "rgba(0,0,0,0.2)",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3
                          className={`font-sans text-2xl md:text-4xl font-light transition-all duration-300 ${
                            hoveredProject === project.id ? "translate-x-4" : ""
                          }`}
                        >
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs text-foreground/40 mt-1">{project.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <p className="font-sans text-sm text-foreground/60 max-w-xs hidden lg:block">
                        {project.description}
                      </p>
                      <span className="font-mono text-xs text-foreground/30">{project.year}</span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          hoveredProject === project.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
                        }`}
                        style={{ backgroundColor: `${accentColor}10` }}
                      >
                        <svg
                          className="w-3 h-3"
                          style={{ color: accentColor }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section
          className={`px-8 md:px-16 pb-24 transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleQuerySubmit} className="space-y-8">
              <div>
                <label className="block font-sans text-sm text-foreground/60 mb-3 tracking-wide">
                  Tell us about your project
                </label>
                <textarea
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder={`Describe your ${title.toLowerCase()} vision...`}
                  rows={8}
                  className="w-full px-6 py-4 bg-white/50 border border-foreground/10 rounded-lg font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-sm text-foreground/60 mb-3 tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-white/50 border border-foreground/10 rounded-lg font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-sm text-foreground/60 mb-3 tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-white/50 border border-foreground/10 rounded-lg font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm text-foreground/60 mb-3 tracking-wide">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-3">
                  {["Residential", "Commercial", "Renovation", "Consultation", "Other"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className="px-5 py-2.5 bg-white/50 border border-foreground/10 rounded-full font-sans text-sm text-foreground/60 hover:bg-white/80 hover:border-foreground/20 transition-all focus:outline-none"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full font-sans text-sm tracking-wide text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: accentColor }}
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-foreground/10" />
          <span className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
            {title}
          </span>
        </div>
        <span className="font-mono text-xs text-foreground/20">
          Aquadro Studio / {new Date().getFullYear()}
        </span>
      </footer>
    </main>
  )
}
