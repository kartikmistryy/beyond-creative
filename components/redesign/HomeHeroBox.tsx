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

/** Full-screen layer over the hero frame: nav and taglines first; once the frame has opened, the headline. */
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
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden text-black motion-reduce:text-white"
    >
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
