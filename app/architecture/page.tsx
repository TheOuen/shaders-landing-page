"use client"

import { ServicePageLayout } from "@/components/service-page-layout"

const projects = [
  {
    id: "1",
    title: "Meta Hotel",
    category: "Hospitality",
    year: "2009",
    description: "A boutique hotel exploring the boundaries between digital presence and physical space.",
  },
  {
    id: "2",
    title: "Lanthorn on Main",
    category: "Mixed Use",
    year: "2010",
    description: "Historic lantern factory transformed into a vibrant community hub and creative workspace.",
  },
  {
    id: "3",
    title: "Memetic Lab",
    category: "Commercial",
    year: "2012",
    description: "Research facility designed to foster collaboration and the free flow of ideas.",
  },
  {
    id: "4",
    title: "Silverstream Primary",
    category: "Educational",
    year: "2012",
    description: "Learning environment that nurtures curiosity through light, nature, and flexible spaces.",
  },
  {
    id: "5",
    title: "Opuntiagenesis",
    category: "Residential",
    year: "2013",
    description: "Desert dwelling inspired by the resilience and geometry of native cacti.",
  },
  {
    id: "6",
    title: "The Order of Chaos",
    category: "Cultural",
    year: "2013",
    description: "Gallery space where controlled disorder creates unexpected moments of clarity.",
  },
  {
    id: "7",
    title: "Vertical Studio",
    category: "Commercial",
    year: "2013",
    description: "Multi-story creative workspace maximizing vertical circulation and natural light.",
  },
  {
    id: "8",
    title: "Colliding Cultures",
    category: "Cultural",
    year: "2013",
    description: "Community center celebrating the intersection of diverse traditions and modern expression.",
  },
]

export default function ArchitecturePage() {
  return (
    <ServicePageLayout
      title="Architecture"
      subtitle="Spatial Design"
      description="We design buildings that respond to their context, embrace sustainability, and create meaningful spaces for human experience. Every project begins with listening and ends with spaces that inspire."
      projects={projects}
      accentColor="#0047AB"
    />
  )
}
