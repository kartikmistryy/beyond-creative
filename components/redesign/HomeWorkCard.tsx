import Image from "next/image";
import Link from "next/link";
import type previews from "@/lib/redesign/data/projectPreviews.data";

type Props = { project: (typeof previews)[number]; view: string; className?: string };

export default function HomeWorkCard({ project, view, className = "" }: Props) {
  const image = project.gallery[0];
  return (
    <Link
      data-motion-hover="project"
      href={`/projects/${project.slug}`}
      className={`group relative flex h-80 flex-col justify-end overflow-hidden p-4.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:h-105 ${className}`}
    >
      <Image
        data-motion-zoom=""
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 767px) 100vw, 66vw"
        className={`object-cover ${project.slug === "beta-panels" ? "object-top" : ""}`}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent from-60% to-black/60" />
      <div className="relative flex justify-between gap-4 text-label leading-4 uppercase">
        <p>
          {project.title}
          <span className="text-studio-orange">{"//"}</span>
          {project.services.slice(0, 2).join(" · ")}
        </p>
        <span aria-hidden="true" className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {view}
        </span>
      </div>
    </Link>
  );
}
