"use client";
import Link from "next/link";
import type { Project } from "@/lib/db";
import { Media } from "./Media";

// Repeating rhythm: wide + two squares, then two smalls + wide.
const RHYTHM = [
  { span: "md:col-span-6", aspect: "aspect-[16/9]" },
  { span: "md:col-span-3", aspect: "aspect-square", offset: "md:mt-[46px]" },
  { span: "md:col-span-3", aspect: "aspect-square", offset: "md:mt-[46px]" },
  { span: "md:col-span-3", aspect: "aspect-[16/9]" },
  { span: "md:col-span-3", aspect: "aspect-[4/3]" },
  { span: "md:col-span-6", aspect: "aspect-[16/9]" },
];

/** Navy work grid: blue italic client over white title; hover tightens the frame and plays the video. */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const play = (e: React.PointerEvent<HTMLElement>, on: boolean) => {
    const v = e.currentTarget.querySelector("video");
    if (!v) return;
    if (on) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <div className="grid12">
      {projects.map((p, i) => {
        const r = RHYTHM[i % RHYTHM.length];
        const video = p.hero?.type === "video" ? p.hero : null;
        return (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            data-reveal
            style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties}
            className={`tile col-span-12 block pb-[70px] ${i % 3 ? "sm:col-span-6" : ""} ${r.span} ${r.offset ?? ""}`}
            onPointerEnter={(e) => play(e, true)}
            onPointerLeave={(e) => play(e, false)}
          >
            <div className={`tile-media relative overflow-hidden bg-white/5 ${r.aspect}`}>
              <Media media={p.cover ?? p.hero} className="absolute inset-0" />
              {video && <Media media={video} hoverPlay className="absolute inset-0 opacity-0 [.tile:hover_&]:opacity-100" />}
            </div>
            <p className="t-2 serif py-3 text-blue">{p.client || p.tags[0]}</p>
            <p className="t-2 text-white">{p.title}</p>
          </Link>
        );
      })}
    </div>
  );
}
