import { Fragment } from "react";
import Link from "next/link";
import content from "@/lib/redesign/data/workPage.data";
import type previews from "@/lib/redesign/data/projectPreviews.data";
import WorkTile from "./WorkTile";

export default function WorkGrid({ projects }: { projects: readonly (typeof previews)[number][] }) {
  const { note, cta } = content;
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {projects.map((project, index) => (
        <Fragment key={project.slug}>
          <WorkTile project={project} wide={index % 3 !== 1} eager={index === 0} />
          {index === 1 && (
            <div className="flex flex-col justify-between gap-10 py-1 md:h-105 md:pr-4.5">
              <span aria-hidden="true" className="text-xl leading-5 text-studio-orange">+</span>
              <p data-motion="rise" className="text-lg leading-6.5">{note}</p>
            </div>
          )}
        </Fragment>
      ))}
      <div className="flex flex-col justify-between gap-16 bg-studio-orange p-6 text-black md:col-span-3 md:h-105">
        <span aria-hidden="true" className="text-xl leading-5">+</span>
        <div className="flex flex-col gap-5">
          <p className="font-display text-6xl uppercase">
            {cta.title[0]}
            <br />
            {cta.title[1]}
          </p>
          <Link
            data-motion-hover="action"
            href={cta.href}
            className="inline-flex min-h-11 items-center gap-3.5 self-start rounded-full bg-black px-5.5 py-3.5 text-label leading-4 tracking-wide text-white uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            {cta.action}
            <span aria-hidden="true" data-motion-arrow="right" className="text-lg leading-5.5 text-studio-orange">
              ⟶
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
