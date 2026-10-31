"use client";

import useCycle from "@/lib/redesign/useCycle";

/** Taglines stacked in one spot, cross-fading in turn. Fades out as the hero box opens. */
export default function HomeHeroTaglines({ lines }: { lines: readonly string[] }) {
  const active = useCycle(lines.length, 2600);
  return (
    <div data-home-tagline="" className="absolute inset-x-0 top-1/2 grid -translate-y-1/2 px-7 motion-reduce:hidden">
      {lines.map((line, index) => (
        <p
          key={line}
          aria-hidden={index !== active}
          className={`col-start-1 row-start-1 text-center font-display text-heading text-balance uppercase transition-all duration-700 ${
            index === active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
