import Image from "next/image";
import Link from "next/link";
import type previews from "@/lib/redesign/data/projectPreviews.data";

export default function ProjectCard({
  project,
  tall = false,
  editorial = false,
  eager = false,
}: {
  project: (typeof previews)[number];
  tall?: boolean;
  editorial?: boolean;
  eager?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-orange"
    >
      <div
        className={`relative overflow-hidden ${editorial ? (tall ? "aspect-work-tall" : "aspect-work-wide") : "aspect-work-equal"}`}
      >
        <Image
          src={project.gallery[0].src}
          alt={project.gallery[0].alt}
          fill
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          sizes="(max-width: 767px) 100vw, 55vw"
          className={`object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none ${project.slug === "beta-panels" ? "object-top" : ""}`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-studio-bg/85 via-transparent to-transparent" />
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-6 md:bottom-6">
          <div className="flex items-center gap-3">
            <Image
              src={project.logo}
              alt=""
              width={120}
              height={48}
              className="h-10 w-auto max-w-28 object-contain"
            />
            <h3 className="text-xl tracking-tight md:text-2xl">{project.title}</h3>
          </div>
          <span aria-hidden="true" className="text-2xl">
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}
