"use client";

import useLocalTime from "@/lib/redesign/useLocalTime";

export default function ContactClock({ timeZone }: { timeZone: string }) {
  const time = useLocalTime(timeZone);
  return (
    <p className="flex flex-col items-end gap-1">
      <span className="text-label leading-4 tracking-widest uppercase">Local time</span>
      <time className="font-display text-5xl leading-none text-studio-orange tabular-nums">{time || "--:--"}</time>
    </p>
  );
}
