import Image from "next/image";
import Link from "next/link";
import content from "@/lib/redesign/data/workPage.data";
import type previews from "@/lib/redesign/data/projectPreviews.data";

export default function WorkTile({
  project,
  wide,
  eager,
}: {
  project: (typeof previews)[number];
  wide: boolean;
  eager: boolean;
}) {
  const image = project.gallery[0];
  return (
    <Link
      data-motion-hover="project"
      href={`/projects/${project.slug}`}
      className={`group relative flex aspect-4/3 flex-col justify-end overflow-hidden p-4.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-orange md:aspect-auto md:h-105 ${wide ? "md:col-span-2" : ""}`}
    >
      <Image
        data-motion-zoom=""
        src={image.src}
        alt={image.alt}
        fill
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        sizes={wide ? "(max-width: 767px) 100vw, 60vw" : "(max-width: 767px) 100vw, 30vw"}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent from-60% to-black/60" />
      <div className="relative flex justify-between gap-4 text-label leading-4 uppercase">
        <h2>
          {project.title}
          <span className="text-studio-orange">{"//"}</span>
          {project.summary}
        </h2>
        <span aria-hidden="true" className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {content.view}
        </span>
      </div>
    </Link>
  );
}
