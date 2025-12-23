"use client"

import { ServicePageLayout } from "@/components/service-page-layout"

const projects = [
  {
    id: "1",
    title: "Coastal Residence",
    category: "Residential",
    year: "2024",
    description: "A minimalist beachfront home blending natural materials with contemporary design.",
  },
  {
    id: "2",
    title: "Urban Loft Complex",
    category: "Commercial",
    year: "2024",
    description: "Adaptive reuse of an industrial warehouse into modern living spaces.",
  },
  {
    id: "3",
    title: "Mountain Retreat",
    category: "Residential",
    year: "2023",
    description: "Sustainable alpine cabin with panoramic views and passive solar design.",
  },
  {
    id: "4",
    title: "Gallery Pavilion",
    category: "Cultural",
    year: "2023",
    description: "Light-filled exhibition space celebrating the intersection of art and nature.",
  },
  {
    id: "5",
    title: "Terrace House",
    category: "Residential",
    year: "2022",
    description: "Multi-generational home with cascading gardens and private courtyards.",
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
