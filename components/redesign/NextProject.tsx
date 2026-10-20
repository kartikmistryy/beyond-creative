import Image from "next/image";
import Link from "next/link";
import type previews from "@/lib/redesign/data/projectPreviews.data";
import SectionLabel from "./SectionLabel";

export default function NextProject({ project }: { project: (typeof previews)[number] }) {
  return (
    <Link
      data-motion-hover="project"
      href={`/projects/${project.slug}`}
      className="group mx-auto grid max-w-studio items-center gap-10 border-t border-studio-line py-section lg:grid-cols-3 lg:gap-18"
    >
      <div className="space-y-6 lg:col-span-2">
        <SectionLabel>Next project</SectionLabel>
        <h2 className="text-section-title tracking-display group-hover:text-studio-orange">
          {project.title}
        </h2>
        <p className="font-studio-mono text-label uppercase">View project ↗</p>
      </div>
      <div data-motion="image" className="relative aspect-video overflow-hidden">
        <Image
          data-motion-zoom=""
          src={project.gallery[0].src}
          alt={project.gallery[0].alt}
          fill
          sizes="(max-width: 1023px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
    </Link>
  );
}
