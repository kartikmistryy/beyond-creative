// Approved Paper copy (artboards 02 · Work and 03 · Project).
const workPage = {
  hero: {
    title: ["Made to make", "an impression."],
    nowShowing: "Now showing",
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
