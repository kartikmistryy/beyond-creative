export default async function loadCmsProject(slug: string) {
  // Legacy CMS projects keep their original route; approved Paper previews never write to the CMS.
  const { getProject, listProjects } = await import("@/lib/db");
  const project = getProject({ slug });
  if (!project) return null;
  const projects = listProjects();
  const index = projects.findIndex((item) => item.id === project.id);
  return { project, next: projects.length > 1 ? projects[(index + 1) % projects.length] : null };
}
