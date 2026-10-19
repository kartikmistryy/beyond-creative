import Image from "next/image";
import type contact from "@/lib/redesign/data/contact.data";
import SectionLabel from "./SectionLabel";

export default function ContactDetails({ content }: { content: typeof contact }) {
  return (
    <section className="grid lg:min-h-225 lg:grid-cols-2">
      <div className="relative h-112 lg:h-auto">
        <Image
          src={content.image}
          alt="Flinders Street Station in Melbourne"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-studio-bg/70 via-studio-bg/10 to-studio-bg/20" />
        <div className="absolute inset-x-gutter bottom-10 space-y-3">
          <p className="text-3xl tracking-tight">
            {content.city}, {content.country}.
          </p>
          <p className="font-studio-mono text-label text-studio-muted">CREATIVE / MARKETING / AI</p>
          <a
            href={content.photoSource}
            target="_blank"
            rel="noreferrer"
            className="font-studio-mono text-xs uppercase text-studio-muted hover:text-studio-text"
          >
            {content.photoCredit}
          </a>
        </div>
      </div>
      <div className="space-y-12 px-gutter py-16 lg:px-16 lg:pb-12 lg:pt-35">
        <div className="space-y-6">
          <SectionLabel>{content.label}</SectionLabel>
          <h1 className="whitespace-pre-line text-6xl leading-none tracking-display xl:text-7xl">
            {content.title}
          </h1>
          <p className="whitespace-pre-line text-xl leading-7 text-studio-muted">{content.intro}</p>
        </div>
        <div className="space-y-8 border-t border-studio-line pt-8">
          <div className="space-y-3">
            <SectionLabel>New business</SectionLabel>
            <a
              href={`mailto:${content.email}`}
              className="block break-words text-2xl leading-10 tracking-tight text-studio-orange xl:text-3xl"
            >
              {content.email} ↗
            </a>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <SectionLabel>Call us</SectionLabel>
              <a href="tel:+61300000000" className="text-2xl leading-9 tracking-tight">
                {content.phone}
              </a>
            </div>
            <div className="space-y-3">
              <SectionLabel>Based in</SectionLabel>
              <p className="text-2xl leading-8">
                {content.city}
                <br />
                {content.country}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <SectionLabel>Follow along</SectionLabel>
            <div className="flex gap-8 text-xl">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-studio-orange"
              >
                Instagram ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-studio-orange"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
