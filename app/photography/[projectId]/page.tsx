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
    title: "Architectural Series",
    category: "Architecture",
    year: "2024",
    description: "Documentary photography of contemporary residential projects, capturing architecture in its landscape context.",
    longDescription: `This ongoing architectural photography series documents exceptional residential projects across Southern California. Our approach emphasizes the relationship between architecture and environment—capturing buildings as they exist in their landscape rather than in isolation.

We work closely with architects to understand their design intent, then spend time with each project across different times of day and weather conditions to capture its essential character.`,
    client: "Multiple Architects",
    location: "Southern California",
    scope: ["Architectural Photography", "Aerial Photography", "Detail Documentation"],
    gallery: [
      { id: "1", alt: "Hillside residence", caption: "Dawn light on hillside home" },
      { id: "2", alt: "Interior view", caption: "Living space with mountain views" },
      { id: "3", alt: "Pool at dusk", caption: "Infinity pool at blue hour" },
      { id: "4", alt: "Detail shot", caption: "Material and light study" },
      { id: "5", alt: "Aerial view", caption: "Drone perspective in context" },
      { id: "6", alt: "Night exterior", caption: "Architecture illuminated at night" },
    ],
  },
  "2": {
    title: "Interior Portraits",
    category: "Interior",
    year: "2024",
    description: "Intimate captures of designed spaces and their inhabitants, revealing the stories behind the interiors.",
    longDescription: `This interior photography project goes beyond typical documentation to capture the soul of lived-in spaces. Working primarily with natural light, we photograph interiors as they are actually used—with signs of life, personal objects, and the patina of daily living.

The resulting images feel more like portraits of the people who inhabit these spaces, even when the rooms appear empty.`,
    client: "Interior Designers",
    location: "Various",
    scope: ["Interior Photography", "Lifestyle Photography"],
    gallery: [
      { id: "1", alt: "Morning light living room", caption: "Morning light through vintage curtains" },
      { id: "2", alt: "Kitchen moment", caption: "A pause in the kitchen" },
      { id: "3", alt: "Bedroom stillness", caption: "Unmade bed, morning light" },
      { id: "4", alt: "Reading corner", caption: "Well-worn reading nook" },
      { id: "5", alt: "Collected objects", caption: "Stories in objects" },
    ],
  },
  "3": {
    title: "Hotel Collection",
    category: "Hospitality",
    year: "2023",
    description: "Visual storytelling for boutique hotel chain across three properties, creating a cohesive brand narrative.",
    longDescription: `This comprehensive hospitality photography project spanned three distinct properties, requiring a consistent visual approach that celebrates each location's unique character while reinforcing brand identity.

We documented guest experiences from arrival to departure, capturing both the designed spaces and the moments of hospitality that make each property special.`,
    client: "Boutique Hotel Group",
    location: "California & Arizona",
    scope: ["Hotel Photography", "Brand Photography", "Food & Beverage"],
    gallery: [
      { id: "1", alt: "Hotel exterior", caption: "Desert property at golden hour" },
      { id: "2", alt: "Guest room", caption: "Signature suite composition" },
      { id: "3", alt: "Restaurant", caption: "Dining experience captured" },
      { id: "4", alt: "Pool scene", caption: "Resort pool lifestyle" },
      { id: "5", alt: "Spa detail", caption: "Wellness amenity detail" },
      { id: "6", alt: "Lobby moment", caption: "Guest arrival experience" },
    ],
  },
  "4": {
    title: "Product Catalog",
    category: "Commercial",
    year: "2023",
    description: "Studio and lifestyle photography for design furniture brand, showcasing craftsmanship and context.",
    longDescription: `This product photography project required two distinct approaches: clean studio shots that highlight materials and construction, and lifestyle images that show pieces in designed environments.

The studio work emphasized the sculptural qualities and material integrity of each piece, while the lifestyle photography demonstrated scale, versatility, and how the furniture lives in real spaces.`,
    client: "Furniture Brand",
    location: "Studio & On Location",
    scope: ["Product Photography", "Lifestyle Photography", "Detail Photography"],
    gallery: [
      { id: "1", alt: "Hero product shot", caption: "Signature chair, studio light" },
      { id: "2", alt: "Material detail", caption: "Wood grain and joinery detail" },
      { id: "3", alt: "Lifestyle context", caption: "Chair in living room setting" },
      { id: "4", alt: "Collection overview", caption: "Full collection composition" },
    ],
  },
  "5": {
    title: "Urban Landscapes",
    category: "Fine Art",
    year: "2022",
    description: "Personal project exploring the geometry of city architecture, finding abstraction in the built environment.",
    longDescription: `This personal project represents our exploration of cities as abstract compositions. Removed from their functional context, buildings become studies in geometry, light, and material—surfaces and shadows creating their own visual language.

Shot primarily in Los Angeles but including images from travels, the series finds unexpected beauty in the everyday urban environment.`,
    client: "Personal Project",
    location: "Los Angeles & Beyond",
    scope: ["Fine Art Photography", "Urban Photography"],
    gallery: [
      { id: "1", alt: "Geometric facade", caption: "Light and shadow on concrete" },
      { id: "2", alt: "Abstract reflection", caption: "City reflected in glass" },
      { id: "3", alt: "Parking structure", caption: "Brutalist geometry" },
      { id: "4", alt: "Rooftop study", caption: "Rooftops at blue hour" },
      { id: "5", alt: "Detail pattern", caption: "Repeating architectural elements" },
      { id: "6", alt: "Night geometry", caption: "Illuminated patterns after dark" },
    ],
  },
}

export default function PhotographyProjectPage() {
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
      accentColor="#5C6B73"
      serviceName="Photography"
      serviceHref="/photography"
    />
  )
}
