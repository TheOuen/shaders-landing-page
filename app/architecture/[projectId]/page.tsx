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
    title: "Coastal Residence",
    category: "Residential",
    year: "2024",
    description: "A modern beachfront home that blurs the line between indoor and outdoor living, featuring floor-to-ceiling glass and sustainable materials.",
    longDescription: `This coastal residence represents our commitment to creating spaces that exist in harmony with their natural surroundings. The design philosophy centered on transparency and connection—allowing the ocean views to become an integral part of the interior experience.

The structure utilizes a combination of reclaimed timber, local stone, and expansive glass panels that retract fully, transforming the living spaces into covered outdoor areas. Sustainable practices were paramount, incorporating solar orientation, rainwater harvesting, and passive cooling strategies.`,
    client: "Private Client",
    location: "Malibu, California",
    scope: ["Architecture", "Interior Design", "Landscape Integration"],
    gallery: [
      { id: "1", alt: "Exterior view at sunset", caption: "The home glows warmly against the Pacific horizon" },
      { id: "2", alt: "Living room with ocean view", caption: "Floor-to-ceiling glass maximizes the coastal views" },
      { id: "3", alt: "Kitchen detail", caption: "Custom kitchen with reclaimed wood accents" },
      { id: "4", alt: "Bedroom suite", caption: "Master suite with private terrace" },
      { id: "5", alt: "Outdoor terrace", caption: "Seamless indoor-outdoor transition" },
      { id: "6", alt: "Architectural detail", caption: "Material palette detail" },
    ],
  },
  "2": {
    title: "Urban Loft Complex",
    category: "Mixed-Use",
    year: "2024",
    description: "Transforming an abandoned industrial building into vibrant live-work spaces while preserving its historic character.",
    longDescription: `The Urban Loft Complex project breathed new life into a century-old warehouse, converting it into 24 distinctive live-work units while maintaining the building's industrial heritage.

Original features—exposed brick, steel trusses, and timber columns—were carefully restored and celebrated. New interventions were designed to complement rather than compete, using a material palette of blackened steel, concrete, and glass.`,
    client: "Urban Development Partners",
    location: "Downtown Los Angeles",
    scope: ["Architecture", "Historic Preservation", "Interior Design"],
    gallery: [
      { id: "1", alt: "Building exterior", caption: "Restored facade with modern additions" },
      { id: "2", alt: "Loft interior", caption: "Double-height living space" },
      { id: "3", alt: "Industrial details", caption: "Original timber trusses preserved" },
      { id: "4", alt: "Courtyard", caption: "Central courtyard gathering space" },
    ],
  },
  "3": {
    title: "Mountain Retreat",
    category: "Residential",
    year: "2023",
    description: "A timber and stone sanctuary nestled in the Sierra Nevada, designed for year-round mountain living.",
    longDescription: `Perched on a forested slope, this mountain retreat was designed to embrace its alpine setting while providing comfortable shelter from the elements year-round.

The architecture draws inspiration from traditional mountain vernacular, reinterpreted through a contemporary lens. Massive timber frames create dramatic interior volumes, while stone walls provide thermal mass and a connection to the rocky terrain.`,
    client: "Private Client",
    location: "Lake Tahoe, California",
    scope: ["Architecture", "Landscape Design"],
    gallery: [
      { id: "1", alt: "Winter exterior", caption: "The retreat in winter dress" },
      { id: "2", alt: "Great room", caption: "Timber-framed great room with fireplace" },
      { id: "3", alt: "Kitchen", caption: "Chef's kitchen with mountain views" },
      { id: "4", alt: "Deck view", caption: "Expansive deck overlooking the valley" },
      { id: "5", alt: "Master bedroom", caption: "Wake up to forest views" },
    ],
  },
  "4": {
    title: "Gallery Pavilion",
    category: "Cultural",
    year: "2023",
    description: "A minimalist exhibition space for a private art collection, where architecture serves as a neutral canvas.",
    longDescription: `The Gallery Pavilion was conceived as a vessel for experiencing art. Every architectural decision was made in service of the collection, creating spaces that enhance rather than compete with the works on display.

Natural light is carefully controlled through a system of north-facing skylights and motorized screens, allowing curators to tune the illumination for each exhibition.`,
    client: "Private Foundation",
    location: "Palm Springs, California",
    scope: ["Architecture", "Exhibition Design", "Lighting Design"],
    gallery: [
      { id: "1", alt: "Exterior approach", caption: "Minimalist entrance sequence" },
      { id: "2", alt: "Main gallery", caption: "Naturally lit main exhibition hall" },
      { id: "3", alt: "Sculpture court", caption: "Open-air sculpture garden" },
      { id: "4", alt: "Detail wall", caption: "Textured concrete detail" },
    ],
  },
  "5": {
    title: "Desert Oasis",
    category: "Residential",
    year: "2022",
    description: "A courtyard house that creates intimate gardens within the desert landscape.",
    longDescription: `Inspired by traditional desert architecture from around the world, this residence is organized around a series of courtyards that create protected outdoor spaces within the harsh desert climate.

Thick rammed-earth walls provide excellent thermal mass, while carefully placed openings frame views of the surrounding mountains and capture cooling breezes.`,
    client: "Private Client",
    location: "Joshua Tree, California",
    scope: ["Architecture", "Landscape Architecture"],
    gallery: [
      { id: "1", alt: "Desert approach", caption: "The house emerges from the landscape" },
      { id: "2", alt: "Central courtyard", caption: "Protected courtyard with native plantings" },
      { id: "3", alt: "Living room", caption: "Rammed earth walls frame the view" },
      { id: "4", alt: "Pool terrace", caption: "Infinity pool overlooking the desert" },
      { id: "5", alt: "Night view", caption: "The house glows at dusk" },
      { id: "6", alt: "Bedroom", caption: "Serene bedroom retreat" },
    ],
  },
}

export default function ArchitectureProjectPage() {
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
      accentColor="#0047AB"
      serviceName="Architecture"
      serviceHref="/architecture"
    />
  )
}
