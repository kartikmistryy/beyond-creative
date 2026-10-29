// Approved Paper copy (artboards 02 · Work and 03 · Project).
const workPage = {
  hero: {
    title: ["Made to make", "an impression."],
    label: "Selected work",
    reel: "Stills from selected projects",
    intro: "A selection of projects for brands with something to say. Film, social media and content creation.",
  },
  views: { grid: "Grid", list: "List", label: "Project view" },
  view: "( VIEW )",
  note: "Every project pairs cinematography with content made for social.",
  cta: { title: ["Your project", "here."], action: "Bring us the brief", href: "/contact" },
  project: {
    label: "Project",
    details: "Project details",
    services: "Services",
    website: "Website",
    client: "Client",
    year: "Year",
    team: "Team",
    story: "The story",
    approach: "Approach",
    mark: "Client mark",
    next: "Next project",
  },
} as const;

export default workPage;
