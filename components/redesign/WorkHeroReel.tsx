"use client";

import Image from "next/image";
import useCycle from "@/lib/redesign/useCycle";

type Props = {
  label: string;
  projects: readonly { title: string; services: readonly string[]; src: string }[];
};

/**
 * Work hero backdrop (Paper W3): one still per project, full bleed, with a "Now showing" caption and a
 * progress bar per project that fills while its still is up. The interval matches --animate-reel-fill.
 */
export default function WorkHeroReel({ label, projects }: Props) {
  const active = useCycle(projects.length, 5000);
  const current = projects[active];
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {projects.map((project, index) => (
          <Image
            key={project.src}
            src={project.src}
            alt=""
            fill
            sizes="100vw"
            priority={index === 0}
            className={`object-cover transition-opacity duration-1000 ${index === active ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        {/* Darkens the top for the nav and the bottom for the headline and caption. */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/90" />
      </div>
      <div data-motion="fade" className="flex w-full max-w-90 shrink-0 flex-col gap-3.5 lg:pb-3.5">
        <p className="text-label leading-4 tracking-widest text-studio-orange uppercase">{label}</p>
        <p className="font-display text-4xl leading-none uppercase">{current.title}</p>
        <p className="text-base">{current.services.join(" · ")}</p>
        <div aria-hidden="true" className="flex gap-1.5 pt-2">
          {projects.map((project, index) => (
            <span key={project.src} className="h-0.5 flex-1 overflow-hidden bg-white/30">
              {index === active && (
                <span key={active} className="block h-full origin-left bg-studio-orange motion-safe:animate-reel-fill" />
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
