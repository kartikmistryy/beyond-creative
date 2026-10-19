import type { Block } from "@/lib/db";
import CmsMedia from "./CmsMedia";

export default function CmsGalleryBlock({ block }: { block: Block }) {
  const text = (
    <div className="space-y-6 p-6 md:p-10">
      {block.heading && <h2 className="text-3xl tracking-tight">{block.heading}</h2>}
      {block.text && <p className="whitespace-pre-line text-xl leading-8 text-studio-muted">{block.text}</p>}
    </div>
  );
  if (block.layout === "text") return text;
  if (block.layout === "two-up")
    return (
      <div className="grid items-start gap-6 md:grid-cols-2">
        {block.media.map((media, index) => (
          <CmsMedia media={media} key={`${media.url}-${index}`} />
        ))}
      </div>
    );
  if (block.layout === "media-text")
    return (
      <div className="grid items-center gap-6 md:grid-cols-2">
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
