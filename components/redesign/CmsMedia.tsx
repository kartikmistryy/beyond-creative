/* eslint-disable @next/next/no-img-element -- Legacy CMS uploads support arbitrary image hosts. */
import type { Media } from "@/lib/db";

export default function CmsMedia({ media }: { media: Media | null | undefined }) {
  if (!media?.url) return null;
  return media.type === "video" ? (
    <video
      data-motion="image"
      src={media.url}
      controls
      playsInline
      preload="metadata"
      aria-label={media.alt || "Project video"}
      className="block h-auto w-full"
    />
  ) : (
    <img
      data-motion="image"
      src={media.url}
      alt={media.alt || ""}
      loading="lazy"
      decoding="async"
      className="block h-auto w-full"
    />
  );
}
