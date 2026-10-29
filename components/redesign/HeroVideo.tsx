"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function HeroVideo({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    // The source can fail before hydration, when onError is not yet attached.
    if (video.current?.error) return setFailed(true);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      video.current?.play().catch(() => {});
  }, []);
  const toggle = () =>
    video.current?.paused
      ? video.current.play().catch(() => {})
      : video.current?.pause();
  return (
    <>
      <div className="absolute inset-0">
        <video
          ref={video}
          data-motion="hero-image"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      </div>
      {!failed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause showreel" : "Play showreel"}
          className="absolute top-20 right-7 z-10 inline-flex min-h-11 items-center gap-2 text-label leading-4 tracking-wide uppercase hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:top-auto md:bottom-4"
        >
          {playing ? "Pause reel" : "Play reel"}
          {playing ? (
            <Pause aria-hidden="true" className="size-4" strokeWidth={1.5} />
          ) : (
            <Play aria-hidden="true" className="size-4" strokeWidth={1.5} />
          )}
        </button>
      )}
    </>
  );
}
