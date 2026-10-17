/* eslint-disable @next/next/no-img-element -- CMS media can be any host/upload; plain <img> avoids remotePatterns config */
import type { Media as M } from "@/lib/db";

type Props = { media: M | null | undefined; className?: string; priority?: boolean; hoverPlay?: boolean; natural?: boolean };

/** `natural` keeps the file's own aspect ratio (full-bleed blocks). Renders an image or an autoplaying muted loop. `hoverPlay` = paused until hovered (see WorkGrid). */
export function Media({ media, className = "", priority, hoverPlay, natural }: Props) {
  if (!media?.url) return <div className={`bg-ink/10 ${className}`} />;
  const cls = `block w-full ${natural ? "h-auto" : "h-full object-cover"} ${className}`;
  if (media.type === "video")
    return (
      <video
        src={media.url}
        className={cls}
        muted
        loop
        playsInline
        autoPlay={!hoverPlay}
        preload={priority ? "auto" : "metadata"}
        aria-label={media.alt}
      />
    );
  return (
    <img
      src={media.url}
      alt={media.alt ?? ""}
      className={cls}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
