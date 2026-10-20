import Image from "next/image";
import Link from "next/link";
import type home from "@/lib/redesign/data/home.data";

export default function HomeHero({ content }: { content: typeof home.hero }) {
  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden px-gutter pb-56 pt-44 md:h-svh md:min-h-180 md:pb-21 md:pt-72">
      <Image
        data-motion="hero-image"
        src={content.image}
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-linear-to-t from-studio-bg/40 via-transparent to-studio-bg/20" />
      <div data-motion="rise" className="relative mb-10 max-w-72 space-y-4 self-end md:absolute md:right-gutter md:bottom-56 md:mb-0 md:max-w-65">
        <p className="font-studio-mono text-xs leading-5 uppercase">{content.label}</p>
        <p className="whitespace-pre-line text-xl leading-7">{content.description}</p>
      </div>
      <h1 className="relative text-home-display tracking-display">
        <span className="block">{content.title[0]}</span> <span className="block">{content.title[1]}</span>
      </h1>
      <div data-motion="stagger" className="absolute inset-x-gutter bottom-28 flex flex-col items-start gap-2 font-studio-mono text-xs uppercase md:bottom-6 md:flex-row md:items-center md:justify-between md:gap-5 md:pr-64">
        <Link href="/contact" className="inline-flex min-h-11 items-center hover:underline">
          Book a discovery call ↗
        </Link>
        <a
          href="#selected-work"
          className="inline-flex min-h-11 items-center text-studio-orange hover:underline"
        >
          View our work ↓
        </a>
      </div>
    </section>
  );
}
