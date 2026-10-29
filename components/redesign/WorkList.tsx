import Link from "next/link";
import type previews from "@/lib/redesign/data/projectPreviews.data";

export default function WorkList({ projects }: { projects: readonly (typeof previews)[number][] }) {
  return (
    <ul data-motion="stagger" className="border-t border-rule">
      {projects.map((project) => (
        <li key={project.slug} className="border-b border-rule">
          <Link
            data-motion-hover="action"
            href={`/projects/${project.slug}`}
            className="group flex flex-wrap items-center gap-x-6 gap-y-2 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-orange lg:flex-nowrap lg:gap-0"
          >
            <span aria-hidden="true" className="hidden w-15 shrink-0 text-xl leading-6 group-hover:text-studio-orange lg:block">
              +
            </span>
            <h2 className="grow font-display text-work-row uppercase group-hover:text-studio-orange lg:w-155 lg:grow-0 lg:shrink-0">
              {project.title}
            </h2>
            <span aria-hidden="true" data-motion-arrow="right" className="w-15 shrink-0 text-right text-question lg:order-last">
              ⟶
            </span>
            <p className="w-full text-label leading-4.5 text-ash uppercase group-hover:text-white lg:w-auto lg:grow">
              {project.services.join(" · ")}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
