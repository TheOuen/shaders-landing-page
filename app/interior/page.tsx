"use client"

import { ServicePageLayout } from "@/components/service-page-layout"

const projects = [
  {
    id: "1",
    title: "Penthouse Suite",
    category: "Residential",
    year: "2024",
    description: "Luxurious city living with bespoke furnishings and curated art collection.",
  },
  {
    id: "2",
    title: "Boutique Hotel",
    category: "Hospitality",
    year: "2024",
    description: "Intimate guest experience through tactile materials and thoughtful details.",
  },
  {
    id: "3",
    title: "Creative Office",
    category: "Commercial",
    year: "2023",
    description: "Flexible workspace designed to foster collaboration and focused work.",
  },
  {
    id: "4",
    title: "Private Library",
    category: "Residential",
    year: "2023",
    description: "A sanctuary for collectors featuring custom millwork and ambient lighting.",
  },
  {
    id: "5",
    title: "Restaurant Concept",
    category: "Hospitality",
    year: "2022",
    description: "Farm-to-table dining experience with natural textures and warm atmosphere.",
  },
]

export default function InteriorPage() {
  return (
    <ServicePageLayout
      title="Interior"
      subtitle="Interior Design"
      description="We craft interiors that tell stories through texture, light, and carefully considered details. Our spaces balance beauty with functionality, creating environments that feel both timeless and personal."
      projects={projects}
      accentColor="#7B5E57"
    />
  )
}
