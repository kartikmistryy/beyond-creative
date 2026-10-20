"use client";

import Link from "next/link";
import type servicesData from "@/lib/redesign/data/services.data";
import serviceArtwork from "@/lib/redesign/serviceArtwork";
import useCarousel from "@/lib/redesign/useCarousel";
import ServiceVisual from "./ServiceVisual";
import SectionLabel from "./SectionLabel";

type Props = {
  services: readonly (typeof servicesData)[number][];
  label: string;
  title: string;
  subtitle: string;
};

export default function ServiceCarousel({ services, label, title, subtitle }: Props) {
  const { ref, scroll } = useCarousel();
  return (
    <section className="py-section" aria-labelledby="capabilities-title">
      <div className="mx-auto max-w-studio space-y-16">
        <div className="grid gap-8 px-gutter lg:grid-cols-3">
          <SectionLabel>{label}</SectionLabel>
          <div className="flex items-end justify-between gap-6 lg:col-span-2">
            <h2 id="capabilities-title" className="text-heading tracking-heading">
              {title}
              <br />
              {subtitle}
            </h2>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                aria-label="Previous services"
                onClick={() => scroll(-1)}
                className="flex size-12 items-center justify-center border border-studio-line text-2xl hover:border-studio-text"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next services"
                onClick={() => scroll(1)}
                className="flex size-12 items-center justify-center border border-studio-line text-2xl hover:border-studio-text"
              >
                →
              </button>
            </div>
          </div>
        </div>
        <div
          ref={ref}
          role="region"
          tabIndex={0}
          aria-label="Seven services, scroll horizontally"
          className="flex snap-x snap-mandatory scroll-px-gutter gap-4 overflow-x-auto overscroll-x-contain px-gutter pb-5"
        >
          {services.map((service, index) => (
            <Link
              data-motion="rise"
              data-motion-hover="service"
              key={service.slug}
              href={service.href}
              className="group relative flex h-160 w-80 shrink-0 snap-start flex-col justify-between overflow-hidden border border-studio-line p-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-orange md:h-service-height md:w-service-card"
            >
              <div className="absolute inset-x-0 top-0">
                <ServiceVisual src={serviceArtwork(service)} />
              </div>
              <span className="relative font-studio-mono text-2xl tracking-tight text-studio-orange">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative flex h-50 flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="h-20 whitespace-pre-line text-3xl leading-10 tracking-heading md:text-4xl">
                    {service.title}
                  </h3>
                  <span data-motion-arrow="" aria-hidden="true" className="pt-2 text-xl">
                    ↗
                  </span>
                </div>
                <p className="text-lg leading-6.5 text-studio-muted">{service.homeBody}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
