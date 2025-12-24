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
    title: "Meta Hotel",
    category: "Hospitality",
    year: "2009",
    description: "A boutique hotel exploring the boundaries between digital presence and physical space.",
    longDescription: `Meta Hotel represents a groundbreaking exploration of how architecture can mediate between our physical and digital lives. The design challenges conventional hospitality spaces by creating environments that respond to and reflect the guest's presence.

Each space within the hotel serves as a canvas for light, shadow, and reflection—creating moments of introspection while fostering connection. The material palette emphasizes transparency and layering, with surfaces that shift and change throughout the day.`,
    client: "Private Developer",
    location: "South Africa",
    scope: ["Architecture", "Interior Design", "Experience Design"],
    gallery: [
      { id: "1", url: "/meta/Screenshot 2025-12-24 at 17.32.46.png", alt: "Hotel exterior", caption: "The facade responds to natural light" },
      { id: "2", url: "/meta/Screenshot 2025-12-24 at 17.32.55.png", alt: "Lobby space", caption: "Layered spaces create depth and intrigue" },
      { id: "3", url: "/meta/Screenshot 2025-12-24 at 17.33.02.png", alt: "Interior detail", caption: "Material studies in light and shadow" },
      { id: "4", url: "/meta/Screenshot 2025-12-24 at 17.33.12.png", alt: "Architectural detail", caption: "Precision meets poetry in every corner" },
    ],
  },
  "2": {
    title: "Lanthorn on Main",
    category: "Mixed Use",
    year: "2010",
    description: "Historic lantern factory transformed into a vibrant community hub and creative workspace.",
    longDescription: `Lanthorn on Main breathes new life into a historic lantern factory, honoring its industrial heritage while creating spaces for contemporary creative practice and community gathering.

The adaptive reuse strategy preserved original elements—exposed brick, steel trusses, and timber columns—while introducing modern interventions that complement rather than compete. The result is a dynamic mixed-use space that serves as a beacon for the local creative community.`,
    client: "Urban Development Partners",
    location: "Johannesburg, South Africa",
    scope: ["Architecture", "Historic Preservation", "Urban Design"],
    gallery: [
      { id: "1", url: "/lanthorn-on-main/Screenshot 2025-12-24 at 17.33.24.png", alt: "Building exterior", caption: "Historic facade meets contemporary vision" },
      { id: "2", url: "/lanthorn-on-main/Screenshot 2025-12-24 at 17.33.30.png", alt: "Interior workspace", caption: "Open floor plans encourage collaboration" },
      { id: "3", url: "/lanthorn-on-main/Screenshot 2025-12-24 at 17.33.37.png", alt: "Community space", caption: "Flexible spaces for events and gathering" },
      { id: "4", url: "/lanthorn-on-main/Screenshot 2025-12-24 at 17.33.45.png", alt: "Architectural detail", caption: "Original industrial elements restored" },
    ],
  },
  "3": {
    title: "Memetic Lab",
    category: "Commercial",
    year: "2012",
    description: "Research facility designed to foster collaboration and the free flow of ideas.",
    longDescription: `Memetic Lab was conceived as an architecture of ideas—a space where knowledge spreads and evolves through human interaction. The design prioritizes visual and physical connectivity, creating environments that encourage spontaneous exchange.

The building's form and circulation are designed to maximize chance encounters, while providing quiet zones for focused work. The result is a dynamic ecosystem that supports the full spectrum of creative and analytical work.`,
    client: "Research Foundation",
    location: "Cape Town, South Africa",
    scope: ["Architecture", "Workplace Strategy", "Interior Design"],
    gallery: [
      { id: "1", alt: "Laboratory exterior", caption: "Form follows function" },
      { id: "2", alt: "Collaboration space", caption: "Designed for knowledge exchange" },
      { id: "3", alt: "Research area", caption: "Flexible research environments" },
      { id: "4", alt: "Detail", caption: "Material and light interplay" },
    ],
  },
  "4": {
    title: "Silverstream Primary",
    category: "Educational",
    year: "2012",
    description: "Learning environment that nurtures curiosity through light, nature, and flexible spaces.",
    longDescription: `Silverstream Primary reimagines educational architecture for the 21st century. The design creates a landscape of learning opportunities, where indoor and outdoor spaces flow seamlessly and every corner invites exploration.

Natural light, ventilation, and connection to nature are prioritized throughout, creating healthy environments that support focus and creativity. Flexible classroom configurations allow teachers to adapt spaces to different learning modes and group sizes.`,
    client: "Department of Education",
    location: "Pretoria, South Africa",
    scope: ["Architecture", "Educational Design", "Landscape Integration"],
    gallery: [
      { id: "1", url: "/silverstream-primary/Screenshot 2025-12-24 at 17.34.08.png", alt: "School exterior", caption: "Learning spaces open to nature" },
      { id: "2", url: "/silverstream-primary/Screenshot 2025-12-24 at 17.34.26.png", alt: "Classroom interior", caption: "Light-filled learning environments" },
      { id: "3", url: "/silverstream-primary/Screenshot 2025-12-24 at 17.34.39.png", alt: "Common area", caption: "Spaces for gathering and play" },
      { id: "4", url: "/silverstream-primary/Screenshot 2025-12-24 at 17.34.52.png", alt: "Outdoor learning", caption: "Nature as classroom" },
    ],
  },
  "5": {
    title: "Opuntiagenesis",
    category: "Residential",
    year: "2013",
    description: "Desert dwelling inspired by the resilience and geometry of native cacti.",
    longDescription: `Opuntiagenesis takes its name and form from the prickly pear cactus native to its arid setting. Like its botanical inspiration, the dwelling is designed to thrive in extreme conditions while creating protected, nurturing spaces within.

Thick walls provide thermal mass, while carefully placed openings capture cooling breezes and frame views of the surrounding landscape. The architecture works with rather than against the desert environment, creating a sustainable sanctuary.`,
    client: "Private Client",
    location: "Northern Cape, South Africa",
    scope: ["Architecture", "Sustainable Design", "Landscape Architecture"],
    gallery: [
      { id: "1", alt: "Desert approach", caption: "The house emerges from the landscape" },
      { id: "2", alt: "Courtyard", caption: "Protected outdoor living" },
      { id: "3", alt: "Interior", caption: "Cool interiors in the desert heat" },
      { id: "4", alt: "Detail", caption: "Geometry inspired by nature" },
    ],
  },
  "6": {
    title: "The Order of Chaos",
    category: "Cultural",
    year: "2013",
    description: "Gallery space where controlled disorder creates unexpected moments of clarity.",
    longDescription: `The Order of Chaos is an experimental gallery that challenges conventional exhibition architecture. The design embraces complexity and contradiction, creating spaces that disorient and reorient visitors in unexpected ways.

Walls angle and intersect at unconventional degrees, ceilings vary in height, and light enters from surprising directions. Within this apparent disorder, moments of clarity emerge—perfect viewing conditions that feel discovered rather than prescribed.`,
    client: "Arts Foundation",
    location: "Durban, South Africa",
    scope: ["Architecture", "Exhibition Design", "Lighting Design"],
    gallery: [
      { id: "1", alt: "Gallery exterior", caption: "Geometry in tension" },
      { id: "2", alt: "Main hall", caption: "Controlled chaos in action" },
      { id: "3", alt: "Exhibition space", caption: "Unexpected viewing angles" },
      { id: "4", alt: "Detail", caption: "Order within disorder" },
    ],
  },
  "7": {
    title: "Vertical Studio",
    category: "Commercial",
    year: "2013",
    description: "Multi-story creative workspace maximizing vertical circulation and natural light.",
    longDescription: `Vertical Studio responds to urban density constraints by reimagining the creative workspace as a vertical village. The design stacks diverse program elements around a dramatic central atrium, creating visual connections across floors and encouraging interaction.

A sculptural staircase becomes the social spine of the building, providing exercise, daylight, and chance encounters. Each floor plate offers distinct spatial qualities while maintaining connection to the whole.`,
    client: "Creative Agency Collective",
    location: "Johannesburg, South Africa",
    scope: ["Architecture", "Workplace Strategy", "Interior Design"],
    gallery: [
      { id: "1", alt: "Building exterior", caption: "Vertical expression" },
      { id: "2", alt: "Central atrium", caption: "Light well connecting all floors" },
      { id: "3", alt: "Workspace", caption: "Creative environments" },
      { id: "4", alt: "Staircase", caption: "Circulation as social infrastructure" },
    ],
  },
  "8": {
    title: "Colliding Cultures",
    category: "Cultural",
    year: "2013",
    description: "Community center celebrating the intersection of diverse traditions and modern expression.",
    longDescription: `Colliding Cultures creates architecture from the productive friction between diverse community traditions and contemporary culture. The design provides flexible spaces for cultural expression, education, and gathering.

The building's form references multiple architectural traditions without replicating any single one, creating a new language that belongs to the community it serves. Materials are locally sourced and craft techniques are celebrated throughout.`,
    client: "Community Development Trust",
    location: "Port Elizabeth, South Africa",
    scope: ["Architecture", "Community Engagement", "Cultural Design"],
    gallery: [
      { id: "1", alt: "Center exterior", caption: "A new community landmark" },
      { id: "2", alt: "Gathering hall", caption: "Flexible space for events" },
      { id: "3", alt: "Workshop", caption: "Spaces for making and learning" },
      { id: "4", alt: "Detail", caption: "Local materials, universal appeal" },
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
