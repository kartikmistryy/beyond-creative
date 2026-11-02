"use client";

import useWordSlot from "@/lib/redesign/useWordSlot";

// Lines above and below the current word, plus one waiting below to roll in.
const offsets = [-2, -1, 0, 1, 2];

function shade(distance: number) {
  if (distance === 0) return "text-studio-orange";
  if (distance === 1) return "text-white/25";
  // The outer lines only show beside the intro (xl); stacked above it they would run into it.
  return distance === 2 ? "text-transparent xl:text-white/10" : "text-transparent";
}

/**
 * The hero's last word in a rolling stack that moves up to the next word every few seconds. Only the
 * current line takes up room; the faded lines spill above and below it. Decorative: the heading
 * carries the approved line for screen readers.
 */
export default function HeroWords({ words }: { words: readonly string[] }) {
  const { active, sliding, settle } = useWordSlot(words.length, 2400);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a));
  const word = (offset: number) => words[(active + offset + words.length) % words.length];
  // Colours only animate during the roll, so the instant reset after it never shows.
  const tone = (offset: number) =>
    `${shade(Math.abs(offset - (sliding ? 1 : 0)))} ${sliding ? "transition-colors duration-700" : ""}`;
  return (
    <span aria-hidden="true" className="relative block">
      <span className="invisible">{longest}</span>
      <span className="absolute top-1/2 left-0 -translate-y-1/2">
        <span
          onTransitionEnd={(event) => event.target === event.currentTarget && settle()}
          className={`relative block ${sliding ? "-translate-y-1/5 transition-transform duration-700 ease-in-out" : ""}`}
        >
          {offsets.map((offset) => (
            <span key={offset} className={`block ${tone(offset)}`}>
              {word(offset)}
            </span>
          ))}
          <span className={`absolute top-full left-0 ${tone(3)}`}>{word(3)}</span>
        </span>
      </span>
    </span>
  );
}
