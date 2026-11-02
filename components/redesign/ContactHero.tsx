import type contact from "@/lib/redesign/data/contact.data";
import ContactPostcard from "./ContactPostcard";
import PillLink from "./PillLink";

/** Contact hero (Paper C4): the headline, the ways to reach us and a Melbourne postcard, all on one screen. */
export default function ContactHero({ content }: { content: typeof contact }) {
  const [first, second] = content.hero.titleLines;
  return (
    <section className="flex min-h-svh flex-col gap-12 bg-black px-7 pt-36 pb-7 font-body font-normal text-white lg:flex-row lg:gap-7 lg:pt-24">
      <div className="flex flex-col justify-between gap-12 lg:w-155 lg:shrink-0">
        {/* Each direct child slides in from a screen edge once the preloader clears (createHeroMotion). */}
        <h1 data-hero-title="" className="font-display text-contact-hero uppercase">
          <span className="block">{first}</span>
          <span className="block text-studio-orange">{second}</span>
        </h1>
        <div className="flex flex-col gap-8">
          <p data-motion="rise" className="max-w-110 text-xl leading-7 font-light">
            {content.hero.intro}
          </p>
          <dl data-motion="stagger" className="border-t border-rule">
            {content.details.map((item) => (
              <div key={item.label} className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-rule py-3.5 text-lg">
                <dt>{item.label}</dt>
                <dd className="break-words">
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
          {/* No reveal: its 80px start offset would push it below the fold, where it never triggers. */}
          <PillLink href={content.booking.href}>{content.booking.label}</PillLink>
        </div>
      </div>
      <ContactPostcard content={content} />
    </section>
  );
}
