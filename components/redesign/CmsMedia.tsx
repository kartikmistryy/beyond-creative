/* eslint-disable @next/next/no-img-element -- Legacy CMS uploads support arbitrary image hosts. */
import type { Media } from "@/lib/db";

export default function CmsMedia({
  media,
  className = "block h-auto w-full",
}: {
  media: Media | null | undefined;
  className?: string;
}) {
  if (!media?.url) return null;
  return media.type === "video" ? (
    <video
      data-motion="image"
      src={media.url}
      controls
      playsInline
      preload="metadata"
      aria-label={media.alt || "Project video"}
      className={className}
    />
  ) : (
    <img
      data-motion="image"
      src={media.url}
      alt={media.alt || ""}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
