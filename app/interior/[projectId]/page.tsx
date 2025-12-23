"use client"

import { useParams, notFound } from "next/navigation"
import { ProjectDetailLayout } from "@/components/project-detail-layout"

const projects: Record<string, {
  title: string
  category: string
  year: string
  description: string
  longDescription?: string
  client?: string
  location?: string
  scope?: string[]
  gallery: { id: string; url?: string; alt: string; caption?: string }[]
}> = {
  "1": {
    title: "Penthouse Suite",
    category: "Residential",
    year: "2024",
    description: "A sophisticated urban retreat high above the city, blending contemporary comfort with timeless elegance.",
    longDescription: `This penthouse transformation creates a sanctuary above the urban landscape. The design balances openness with intimacy, using carefully curated materials and furnishings to define distinct zones within the flowing floor plan.

A restrained palette of warm neutrals, natural stones, and rich textiles creates a sense of calm sophistication, while curated art pieces and custom millwork add layers of visual interest.`,
    client: "Private Client",
    location: "Beverly Hills, California",
    scope: ["Interior Design", "Custom Furniture", "Art Curation"],
    gallery: [
      { id: "1", alt: "Living room panorama", caption: "Living room with city views" },
      { id: "2", alt: "Dining area", caption: "Custom dining table and lighting" },
      { id: "3", alt: "Primary suite", caption: "Serene primary bedroom" },
      { id: "4", alt: "Kitchen detail", caption: "Chef's kitchen with marble island" },
      { id: "5", alt: "Bathroom spa", caption: "Spa-like primary bathroom" },
    ],
  },
  "2": {
    title: "Creative Office",
    category: "Commercial",
    year: "2024",
    description: "A dynamic workspace designed to inspire collaboration and creativity for a leading design agency.",
    longDescription: `This creative office challenges conventional workplace design by creating a series of varied environments that support different modes of work. From focused individual work to collaborative brainstorming sessions, each space is thoughtfully designed.

The material palette draws from the agency's brand identity while introducing unexpected elements—vintage furniture alongside custom pieces, industrial finishes softened by plants and textiles.`,
    client: "Creative Agency",
    location: "Venice Beach, California",
    scope: ["Interior Design", "Space Planning", "Brand Integration"],
    gallery: [
      { id: "1", alt: "Reception area", caption: "Welcoming reception with custom desk" },
      { id: "2", alt: "Open workspace", caption: "Flexible open work area" },
      { id: "3", alt: "Meeting room", caption: "Glass-walled meeting room" },
      { id: "4", alt: "Lounge space", caption: "Casual collaboration lounge" },
    ],
  },
  "3": {
    title: "Historic Renovation",
    category: "Residential",
    year: "2023",
    description: "Breathing new life into a 1920s Spanish Colonial while honoring its original character.",
    longDescription: `This historic renovation required a delicate balance between preservation and modernization. Original details—hand-painted tiles, wrought iron, arched doorways—were carefully restored, while contemporary interventions were introduced with sensitivity.

The result is a home that feels both authentically historic and thoroughly modern, where antique pieces coexist naturally with contemporary furniture and art.`,
    client: "Private Client",
    location: "Los Feliz, California",
    scope: ["Interior Design", "Historic Preservation", "Custom Millwork"],
    gallery: [
      { id: "1", alt: "Entry foyer", caption: "Restored entry with original tiles" },
      { id: "2", alt: "Living room", caption: "Living room with original fireplace" },
      { id: "3", alt: "Kitchen", caption: "Modern kitchen with period details" },
      { id: "4", alt: "Courtyard", caption: "Interior courtyard with fountain" },
      { id: "5", alt: "Primary bedroom", caption: "Primary suite with garden views" },
      { id: "6", alt: "Bathroom detail", caption: "Restored vintage bathroom" },
    ],
  },
  "4": {
    title: "Boutique Hotel",
    category: "Hospitality",
    year: "2023",
    description: "A 24-room boutique hotel that brings contemporary coastal style to a historic downtown building.",
    longDescription: `This boutique hotel project transformed a former bank building into an intimate hospitality experience. The design celebrates the building's grand bones—soaring ceilings, marble floors, ornate details—while introducing a fresh, coastal-inspired sensibility.

Each of the 24 rooms is individually designed with a mix of vintage and custom pieces, creating the feeling of a well-traveled friend's guest room rather than a typical hotel.`,
    client: "Hospitality Group",
    location: "Santa Barbara, California",
    scope: ["Interior Design", "FF&E", "Branding"],
    gallery: [
      { id: "1", alt: "Lobby", caption: "Grand lobby with original details" },
      { id: "2", alt: "Guest room", caption: "Ocean-view guest suite" },
      { id: "3", alt: "Restaurant", caption: "Hotel restaurant and bar" },
      { id: "4", alt: "Rooftop", caption: "Rooftop lounge with city views" },
    ],
  },
  "5": {
    title: "Art Collector's Home",
    category: "Residential",
    year: "2022",
    description: "A residence designed around an important contemporary art collection.",
    longDescription: `For this passionate collector, we designed spaces that serve equally well for daily living and art viewing. The architecture provides generous wall space and carefully controlled lighting, while the interiors create a warm, livable atmosphere.

Furniture was selected and commissioned to complement rather than compete with the art, using a restrained palette that allows the collection to take center stage.`,
    client: "Private Collector",
    location: "Bel Air, California",
    scope: ["Interior Design", "Art Installation", "Lighting Design"],
    gallery: [
      { id: "1", alt: "Gallery living room", caption: "Living room as gallery space" },
      { id: "2", alt: "Sculpture hall", caption: "Corridor with sculpture display" },
      { id: "3", alt: "Dining room", caption: "Dining room with major work" },
      { id: "4", alt: "Study", caption: "Private study with collection pieces" },
      { id: "5", alt: "Bedroom", caption: "Serene bedroom with artwork" },
    ],
  },
}

export default function InteriorProjectPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const project = projects[projectId]

  if (!project) {
    notFound()
  }

  return (
    <ProjectDetailLayout
      title={project.title}
      category={project.category}
      year={project.year}
      description={project.description}
      longDescription={project.longDescription}
      client={project.client}
      location={project.location}
      scope={project.scope}
      gallery={project.gallery}
      accentColor="#8B4513"
      serviceName="Interior"
      serviceHref="/interior"
    />
  )
}
