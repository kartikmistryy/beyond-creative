import Image from "next/image";
import type contact from "@/lib/redesign/data/contact.data";
import PillLink from "./PillLink";

export default function ContactDetails({ content }: { content: typeof contact }) {
  return (
    <section
      aria-label="Contact details"
      className="flex flex-col gap-20 border-t border-rule bg-black px-7 pt-20 pb-24 font-body font-normal text-white lg:flex-row lg:pb-40"
    >
      <div className="flex flex-col gap-12 lg:w-130 lg:shrink-0">
        <dl data-motion="stagger" className="border-t border-rule">
          {content.details.map((item) => (
            <div key={item.label} className="flex flex-col gap-2 border-b border-rule py-5">
              <dt className="text-label leading-4 text-ash uppercase">{item.label}</dt>
              <dd className="text-xl leading-7 break-words sm:text-question">
                {item.href ? (
                  <a href={item.href} className="transition-colors hover:text-studio-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div data-motion="rise">
          <PillLink href={content.booking.href}>{content.booking.label}</PillLink>
        </div>
      </div>
      <figure className="flex min-w-0 grow flex-col gap-2.5">
        <div data-motion="image" className="relative h-105 overflow-hidden lg:h-150">
          <Image src={content.image} alt={content.imageAlt} fill sizes="(max-width: 1023px) 100vw, 60vw" className="object-cover" />
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
    </section>
  );
}
