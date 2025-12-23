"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"

interface GalleryImage {
  id: string
  url?: string
  alt: string
  caption?: string
}

interface ProjectDetailLayoutProps {
  title: string
  category: string
  year: string
  description: string
  longDescription?: string
  client?: string
  location?: string
  scope?: string[]
  gallery: GalleryImage[]
  accentColor?: string
  serviceName: string
  serviceHref: string
}

export function ProjectDetailLayout({
  title,
  category,
  year,
  description,
  longDescription,
  client,
  location,
  scope,
  gallery,
  accentColor = "#0047AB",
  serviceName,
  serviceHref,
}: ProjectDetailLayoutProps) {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleImageClick = (imageId: string) => {
    setSelectedImage(selectedImage === imageId ? null : imageId)
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
          onClick={() => router.push(serviceHref)}
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
            {serviceName}
          </span>
        </button>

        <button
          onClick={() => router.push("/")}
          className="font-sans text-sm font-light tracking-widest text-foreground/40 uppercase hover:text-foreground/60 transition-colors"
        >
          Aquadro Studio
        </button>
      </header>

      {/* Hero Section */}
      <section
        className={`relative pt-32 pb-16 px-8 md:px-16 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <p
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: accentColor }}
            >
              {category}
            </p>
            <span className="font-mono text-xs text-foreground/30">|</span>
            <span className="font-mono text-xs text-foreground/30">{year}</span>
          </div>
          <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-foreground mb-8">
            {title}
          </h1>
          <p className="font-sans text-xl text-foreground/60 max-w-3xl leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Project Details */}
      <section
        className={`px-8 md:px-16 pb-16 transition-all duration-700 delay-200 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 border-t border-foreground/10 pt-8">
            {client && (
              <div>
                <h4 className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-2">
                  Client
                </h4>
                <p className="font-sans text-foreground">{client}</p>
              </div>
            )}
            {location && (
              <div>
                <h4 className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-2">
                  Location
                </h4>
                <p className="font-sans text-foreground">{location}</p>
              </div>
            )}
            {scope && scope.length > 0 && (
              <div>
                <h4 className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-2">
                  Scope
                </h4>
                <p className="font-sans text-foreground">{scope.join(", ")}</p>
              </div>
            )}
          </div>

          {longDescription && (
            <div className="mt-12 max-w-3xl">
              <p className="font-sans text-foreground/70 leading-relaxed whitespace-pre-line">
                {longDescription}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section
        className={`px-8 md:px-16 pb-32 transition-all duration-700 delay-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="font-mono text-xs text-foreground/40 uppercase tracking-widest mb-8">
            Gallery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gallery.map((image, index) => (
              <div
                key={image.id}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group transition-all duration-500 ${
                  selectedImage === image.id ? "md:col-span-2" : ""
                } ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${index * 100 + 400}ms`,
                  backgroundColor: `${accentColor}08`,
                }}
                onClick={() => handleImageClick(image.id)}
              >
                {image.url ? (
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ border: `1px solid ${accentColor}10` }}
                  >
                    <svg
                      className="w-12 h-12 mb-4"
                      style={{ color: `${accentColor}25` }}
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
                    <span className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
                      {image.alt}
                    </span>
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                {/* Caption */}
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-sans text-sm text-white">{image.caption}</p>
                  </div>
                )}
                {/* Expand indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-4 h-4 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {selectedImage === image.id ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    )}
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
