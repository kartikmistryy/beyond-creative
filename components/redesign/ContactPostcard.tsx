import Image from "next/image";
import type contact from "@/lib/redesign/data/contact.data";
import ContactClock from "./ContactClock";

/** The studio's city as a postcard: the Flinders Street photo with the city name and its live local time. */
export default function ContactPostcard({ content }: { content: typeof contact }) {
  return (
    <figure className="flex min-w-0 grow flex-col gap-2.5">
      <div data-motion="image" className="relative flex h-105 grow flex-col justify-between overflow-hidden p-6 lg:h-auto">
        <Image src={content.image} alt={content.imageAlt} fill priority sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/70" />
        <p className="relative text-label leading-4 tracking-widest uppercase">{content.imageAlt}</p>
        <div className="relative flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <p className="font-display text-6xl leading-none uppercase md:text-7xl">{content.city}</p>
          <ContactClock timeZone={content.timeZone} />
        </div>
      </div>
      <figcaption>
        <a
          href={content.photoSource}
          target="_blank"
          rel="noreferrer"
          className="text-label leading-4 text-ash transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {content.photoCredit}
        </a>
      </figcaption>
    </figure>
  );
}
