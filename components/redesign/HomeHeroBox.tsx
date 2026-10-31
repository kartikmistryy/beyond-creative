"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type home from "@/lib/redesign/data/home.data";
import navigation from "@/lib/redesign/data/navigation.data";
import useHeroBoxFlag from "@/lib/redesign/useHeroBoxFlag";
import HomeHeroCue from "./HomeHeroCue";
import HomeHeroTaglines from "./HomeHeroTaglines";
import HomeHeroTitle from "./HomeHeroTitle";

const links = navigation.filter((link) => link.href !== "/");
const linkClass =
  "pointer-events-auto hidden hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current md:block";

/** The orange box: nav and taglines first; once open, the orange fades to the showreel and its headline. */
export default function HomeHeroBox({ content }: { content: typeof home.hero }) {
  const box = useRef<HTMLDivElement>(null);
  useHeroBoxFlag(box);
  const link = (item: (typeof links)[number]) => (
    <Link key={item.href} href={item.href} className={linkClass}>
      {item.label}
    </Link>
  );
  return (
    <div
      ref={box}
      data-home-box=""
      className="pointer-events-none absolute inset-x-4 top-32 bottom-24 z-20 overflow-hidden text-black md:inset-x-1/4 md:top-1/6 md:bottom-1/6 motion-reduce:inset-0 motion-reduce:text-white"
    >
      {/* The shade sits under the orange fill; as the fill fades it leaves the showreel's readability gradient. */}
      <div data-home-shade="" className="absolute inset-0 bg-linear-to-b from-black/55 via-black/10 via-40% to-black/70 opacity-0 motion-reduce:opacity-100" />
      <div data-home-fill="" className="absolute inset-0 bg-studio-orange motion-reduce:hidden" />
      <nav aria-label="Primary" className="relative mx-7 mt-7 flex h-10 items-center justify-center text-lg leading-6 md:justify-between">
        {links.slice(0, 2).map(link)}
        <Image
          src="/images/beyond-logo.png"
          alt="Beyond Creative"
          width={764}
          height={192}
          loading="eager"
          fetchPriority="high"
          data-home-logo=""
          className="h-auto w-28 brightness-0 motion-reduce:brightness-100 lg:w-37.5"
        />
        {links.slice(2).map(link)}
      </nav>
      <HomeHeroTaglines lines={content.taglines} />
      <HomeHeroTitle content={content} />
      <HomeHeroCue text={content.cue} />
    </div>
  );
}
