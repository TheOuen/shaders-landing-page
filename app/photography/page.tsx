"use client"

import { ServicePageLayout } from "@/components/service-page-layout"

const projects = [
  {
    id: "1",
    title: "Architectural Series",
    category: "Architecture",
    year: "2024",
    description: "Documentary photography of contemporary residential projects.",
  },
  {
    id: "2",
    title: "Interior Portraits",
    category: "Interior",
    year: "2024",
    description: "Intimate captures of designed spaces and their inhabitants.",
  },
  {
    id: "3",
    title: "Hotel Collection",
    category: "Hospitality",
    year: "2023",
    description: "Visual storytelling for boutique hotel chain across three properties.",
  },
  {
    id: "4",
    title: "Product Catalog",
    category: "Commercial",
    year: "2023",
    description: "Studio and lifestyle photography for design furniture brand.",
  },
  {
    id: "5",
    title: "Urban Landscapes",
    category: "Fine Art",
    year: "2022",
    description: "Personal project exploring the geometry of city architecture.",
  },
]

export default function PhotographyPage() {
  return (
    <ServicePageLayout
      title="Photography"
      subtitle="Visual Documentation"
      description="We capture architecture and interiors with an eye for light, composition, and atmosphere. Our photography reveals the essence of designed spaces, creating images that honor both the architecture and the photographer's vision."
      projects={projects}
      accentColor="#5C6B73"
    />
  )
}
