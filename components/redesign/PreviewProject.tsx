import Image from "next/image";
import type loadPreviewProject from "@/lib/redesign/loadPreviewProject";
import ProjectSidebar from "./ProjectSidebar";
import NextProject from "./NextProject";

export default function PreviewProject({
  content,
}: {
  content: NonNullable<ReturnType<typeof loadPreviewProject>>;
}) {
  return (
    <article className="px-gutter pt-36">
      <div className="mx-auto grid max-w-studio gap-11 pb-section lg:grid-cols-12">
        <ProjectSidebar project={content.project} index={content.index} total={content.total} />
        <div className="flex min-w-0 flex-col items-start gap-6 lg:col-span-9">
          {content.project.gallery.map((image, index) => (
            <figure key={image.src} className={image.portrait ? "w-full md:w-2/3" : "w-full"}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.portrait ? 1352 : 2080}
                height={image.portrait ? 1800 : 1300}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(max-width: 1023px) 100vw, 75vw"
                className="h-auto w-full"
              />
            </figure>
          ))}
        </div>
      </div>
      <NextProject project={content.next} />
    </article>
  );
}
