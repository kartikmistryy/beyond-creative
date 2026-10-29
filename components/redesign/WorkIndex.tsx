"use client";

import { useState } from "react";
import content from "@/lib/redesign/data/workPage.data";
import type previews from "@/lib/redesign/data/projectPreviews.data";
import WorkGrid from "./WorkGrid";
import WorkList from "./WorkList";

const views = ["grid", "list"] as const;

export default function WorkIndex({ projects }: { projects: readonly (typeof previews)[number][] }) {
  const [view, setView] = useState<(typeof views)[number]>("grid");
  return (
    <section
      aria-label="All projects"
      className="flex flex-col gap-6 bg-black px-7 pb-30 font-body font-normal text-white md:flex-row md:gap-3"
    >
      <div role="group" aria-label={content.views.label} className="flex shrink-0 gap-4 self-start md:w-46">
        {views.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={view === option}
            onClick={() => setView(option)}
            className={`min-h-11 text-label leading-4.5 uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-orange ${view === option ? "text-studio-orange" : "text-ash hover:text-white"}`}
          >
            {view === option && <span aria-hidden="true">● </span>}
            {content.views[option]}
          </button>
        ))}
      </div>
      {/* Both views stay mounted so the site motion helpers bound on load keep working after a toggle. */}
      <div className={`min-w-0 grow ${view === "grid" ? "" : "hidden"}`}>
        <WorkGrid projects={projects} />
      </div>
      <div className={`min-w-0 grow ${view === "list" ? "" : "hidden"}`}>
        <WorkList projects={projects} />
      </div>
    </section>
  );
}
