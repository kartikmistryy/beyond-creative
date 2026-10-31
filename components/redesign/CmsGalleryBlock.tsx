import type { Block } from "@/lib/db";
import CmsMedia from "./CmsMedia";

export default function CmsGalleryBlock({ block }: { block: Block }) {
  const text = (
    <div className="flex flex-col gap-3.5 py-6 md:p-10">
      {block.heading && <h2 className="text-project-title font-light tracking-tight">{block.heading}</h2>}
      {block.text && <p className="whitespace-pre-line text-lg leading-6.5 text-ash">{block.text}</p>}
    </div>
  );
  if (block.layout === "text") return text;
  if (block.layout === "two-up")
    return (
      <div className="grid items-start gap-3 md:grid-cols-2">
        {block.media.map((media, index) => (
          <CmsMedia media={media} key={`${media.url}-${index}`} />
        ))}
      </div>
    );
  if (block.layout === "media-text")
    return (
      <div className="grid items-center gap-3 md:grid-cols-2">
        <div className={block.mediaRight ? "md:order-2" : ""}>
          <CmsMedia media={block.media[0]} />
        </div>
        {text}
      </div>
    );
  return (
    <div className={block.layout === "inset" ? "px-6 md:px-12" : ""}>
      <CmsMedia media={block.media[0]} />
    </div>
  );
}
