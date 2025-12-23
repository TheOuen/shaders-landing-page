"use client"

import { ServicePageLayout } from "@/components/service-page-layout"

const projects = [
  {
    id: "1",
    title: "Editorial Residence",
    category: "Photo Styling",
    year: "2024",
    description: "Lifestyle editorial showcasing modern living through curated vignettes.",
  },
  {
    id: "2",
    title: "Brand Campaign",
    category: "Commercial",
    year: "2024",
    description: "Product styling for luxury homeware brand's seasonal collection.",
  },
  {
    id: "3",
    title: "Set Design",
    category: "Film",
    year: "2023",
    description: "Period-accurate interiors for independent film production.",
  },
  {
    id: "4",
    title: "Showroom Staging",
    category: "Commercial",
    year: "2023",
    description: "Immersive retail experience for furniture design showroom.",
  },
  {
    id: "5",
    title: "Cover Story",
    category: "Editorial",
    year: "2022",
    description: "Art direction and styling for architectural magazine feature.",
  },
]

export default function StylingPage() {
  return (
    <ServicePageLayout
      title="Styling"
      subtitle="Art Direction"
      description="We bring spaces to life through considered styling and art direction. From editorial shoots to commercial campaigns, we create visual narratives that captivate and communicate brand essence."
      projects={projects}
      accentColor="#C4A484"
    />
  )
}
