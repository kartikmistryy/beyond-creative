"use client";

import Image from "next/image";
import useCycle from "@/lib/redesign/useCycle";

type Props = { stills: readonly { src: string }[]; label: string };

/** Hero backdrop of project stills that cross-fade in turn; it opens out to full bleed as the page scrolls. */
export default function HeroReel({ stills, label }: Props) {
  const active = useCycle(stills.length, 2400);
  return (
    <figure data-motion-grow="" role="img" aria-label={label} className="absolute inset-0 overflow-hidden">
      {stills.map((still, index) => (
        <Image
          key={still.src}
          src={still.src}
          alt=""
          fill
          sizes="100vw"
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${index === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {/* Keeps the orange title and white copy readable over bright frames. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/60" />
    </figure>
  );
}
