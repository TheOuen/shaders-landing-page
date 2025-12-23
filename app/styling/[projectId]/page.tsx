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
    title: "Editorial Home",
    category: "Editorial",
    year: "2024",
    description: "A complete styling transformation for a major shelter magazine feature, creating layered, livable luxury.",
    longDescription: `This editorial styling project showcases our approach to creating spaces that photograph beautifully while remaining authentically livable. Working with the magazine's creative team, we developed a layered aesthetic that tells a story.

Every object was chosen with intention—from the perfect vintage chair to the precisely arranged stack of books. The result feels effortless, though every detail was carefully considered.`,
    client: "Architectural Digest",
    location: "Pacific Palisades, California",
    scope: ["Prop Styling", "Set Design", "Art Direction"],
    gallery: [
      { id: "1", alt: "Living room hero shot", caption: "Hero living room composition" },
      { id: "2", alt: "Styled vignette", caption: "Collected objects tell a story" },
      { id: "3", alt: "Bedroom styling", caption: "Layered bedroom with texture" },
      { id: "4", alt: "Table setting", caption: "Intimate dining moment" },
      { id: "5", alt: "Kitchen detail", caption: "Styled kitchen corner" },
    ],
  },
  "2": {
    title: "Brand Campaign",
    category: "Commercial",
    year: "2024",
    description: "Product styling and set design for a luxury furniture brand's seasonal campaign.",
    longDescription: `This commercial styling project required creating distinct environments that showcase each piece while maintaining brand consistency. We developed a series of sets that range from minimal and sculptural to warm and inviting.

The styling approach emphasized the quality of materials and craftsmanship, using light and composition to highlight details that might be missed in a retail setting.`,
    client: "Furniture Brand",
    location: "Studio",
    scope: ["Product Styling", "Set Design", "Creative Direction"],
    gallery: [
      { id: "1", alt: "Campaign hero", caption: "Hero image for campaign" },
      { id: "2", alt: "Product detail", caption: "Highlighting material quality" },
      { id: "3", alt: "Lifestyle set", caption: "Lifestyle context shot" },
      { id: "4", alt: "Minimal set", caption: "Sculptural minimal composition" },
    ],
  },
  "3": {
    title: "Model Home",
    category: "Real Estate",
    year: "2023",
    description: "Staging and styling a model residence for a luxury development, creating aspirational yet attainable interiors.",
    longDescription: `Model home staging requires balancing aspiration with accessibility—creating spaces that inspire buyers while helping them envision their own lives in the home. We approached this project as interior design rather than typical staging.

Every room tells part of a cohesive story about the imagined residents, using furniture, art, and accessories that feel collected over time rather than purchased all at once.`,
    client: "Luxury Developer",
    location: "Newport Beach, California",
    scope: ["Staging", "Styling", "Furniture Procurement"],
    gallery: [
      { id: "1", alt: "Entry statement", caption: "First impression matters" },
      { id: "2", alt: "Family room", caption: "Inviting family gathering space" },
      { id: "3", alt: "Primary suite", caption: "Resort-style primary bedroom" },
      { id: "4", alt: "Outdoor living", caption: "Styled outdoor room" },
      { id: "5", alt: "Kids room", caption: "Playful children's room" },
      { id: "6", alt: "Home office", caption: "Sophisticated work-from-home space" },
    ],
  },
  "4": {
    title: "Restaurant Opening",
    category: "Hospitality",
    year: "2023",
    description: "Complete styling for a new restaurant's opening, including tabletop design and seasonal decorations.",
    longDescription: `This restaurant styling project extended beyond the obvious to create a complete sensory experience. We developed the tabletop program, selected plants and flowers, and created a styling guide for seasonal updates.

The goal was to create an environment that feels organic and uncontrived while supporting the chef's vision and the restaurant's brand identity.`,
    client: "Restaurant Group",
    location: "West Hollywood, California",
    scope: ["Tabletop Design", "Floral Direction", "Styling Guide"],
    gallery: [
      { id: "1", alt: "Dining room overview", caption: "Opening night dining room" },
      { id: "2", alt: "Table setting", caption: "Signature table setting" },
      { id: "3", alt: "Bar detail", caption: "Styled bar display" },
      { id: "4", alt: "Floral arrangement", caption: "Seasonal floral design" },
    ],
  },
  "5": {
    title: "Private Event",
    category: "Events",
    year: "2022",
    description: "Styling and design for an intimate private celebration, transforming a residence into a magical setting.",
    longDescription: `This private event styling transformed a client's home into the perfect setting for an intimate celebration. Every element was custom designed—from table linens to lighting to floral installations.

The design referenced the client's personal aesthetic and the significance of the occasion, creating a one-of-a-kind environment that felt both extraordinary and deeply personal.`,
    client: "Private Client",
    location: "Holmby Hills, California",
    scope: ["Event Design", "Floral Design", "Styling"],
    gallery: [
      { id: "1", alt: "Table landscape", caption: "Dramatic table installation" },
      { id: "2", alt: "Place setting", caption: "Custom place setting detail" },
      { id: "3", alt: "Floral installation", caption: "Overhead floral moment" },
      { id: "4", alt: "Lounge area", caption: "Post-dinner lounge styling" },
      { id: "5", alt: "Evening ambiance", caption: "Candlelit atmosphere" },
    ],
  },
}

export default function StylingProjectPage() {
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
      accentColor="#2D5A4A"
      serviceName="Styling"
      serviceHref="/styling"
    />
  )
}
