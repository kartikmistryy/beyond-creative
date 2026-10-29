import type projectPreviews from "./data/projectPreviews.data";

/** One landscape still per project for the Work hero reel. */
export default function getHeroStills(projects: typeof projectPreviews) {
  return projects.map((project) => project.gallery.find((image) => !image.portrait) ?? project.gallery[0]);
}
