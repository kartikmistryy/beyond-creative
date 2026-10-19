import projects from "./data/projectPreviews.data";

export default function loadPreviewProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return null;
  return {
    project: projects[index],
    index,
    next: projects[(index + 1) % projects.length],
    total: projects.length,
  };
}
