"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"

export default function ContactPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for reaching out. We'll be in touch soon!")
    setFormData({ name: "", email: "", company: "", service: "", message: "" })
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
            style={{ border: "1px solid rgba(0, 71, 171, 0.1)" }}
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
      </header>

      {/* Content */}
      <section
        className={`relative pt-32 pb-24 px-8 md:px-16 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left side - Info */}
            <div>
              <p
                className="font-mono text-xs tracking-widest uppercase mb-4"
                style={{ color: "#0047AB" }}
              >
                Get In Touch
              </p>
              <h1 className="font-sans text-5xl md:text-7xl font-extralight tracking-tight text-foreground mb-8">
                Let's Talk
              </h1>
              <p className="font-sans text-lg text-foreground/60 leading-relaxed mb-12">
                We'd love to hear about your project. Whether you're planning a new space,
                need interior styling, or want to capture your architecture through photography,
                we're here to help bring your vision to life.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="font-sans text-sm tracking-widest uppercase text-foreground/40 mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@aquadrostudio.com"
                    className="font-sans text-lg text-foreground hover:text-foreground/70 transition-colors"
                  >
                    hello@aquadrostudio.com
                  </a>
                </div>

                <div>
                  <h3 className="font-sans text-sm tracking-widest uppercase text-foreground/40 mb-2">
                    Location
                  </h3>
                  <p className="font-sans text-lg text-foreground">
                    Los Angeles, California
                  </p>
                </div>

                <div>
                  <h3 className="font-sans text-sm tracking-widest uppercase text-foreground/40 mb-2">
                    Follow
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="font-sans text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="font-sans text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                      Pinterest
                    </a>
                    <a
                      href="#"
                      className="font-sans text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs text-foreground/50 mb-2 tracking-wide uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-foreground/10 rounded-lg font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-foreground/50 mb-2 tracking-wide uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-foreground/10 rounded-lg font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs text-foreground/50 mb-2 tracking-wide uppercase">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 border border-foreground/10 rounded-lg font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs text-foreground/50 mb-2 tracking-wide uppercase">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 border border-foreground/10 rounded-lg font-sans text-foreground focus:outline-none focus:border-foreground/30 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    <option value="architecture">Architecture</option>
                    <option value="interior">Interior Design</option>
                    <option value="styling">Styling</option>
                    <option value="photography">Photography</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-xs text-foreground/50 mb-2 tracking-wide uppercase">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/50 border border-foreground/10 rounded-lg font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                    placeholder="Describe your vision..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full font-sans text-sm tracking-wide text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: "#0047AB" }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-foreground/10" />
          <span className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
            Contact
          </span>
        </div>
        <span className="font-mono text-xs text-foreground/20">
          Aquadro Studio / {new Date().getFullYear()}
        </span>
      </footer>
    </main>
  )
}
