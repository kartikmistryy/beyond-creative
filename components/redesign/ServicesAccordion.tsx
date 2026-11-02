"use client";

import type services from "@/lib/redesign/data/services.data";
import type servicesPage from "@/lib/redesign/data/servicesPage.data";
import serviceArtwork from "@/lib/redesign/serviceArtwork";
import useScrollAccordion from "@/lib/redesign/useScrollAccordion";
import ServicesAccordionRow from "./ServicesAccordionRow";

type Props = {
  services: typeof services;
  ctas: typeof servicesPage.index.ctas;
};

/** Every service row, pinned on screen and opened one at a time as the page scrolls (or by clicking a title). */
export default function ServicesAccordion({ services, ctas }: Props) {
  const { track, list, active, select } = useScrollAccordion();
  return (
    <div ref={track} className="relative">
      {/* `clip`, not `hidden`: a jump to /services#<row> would otherwise scroll this box and shift the list. */}
      <div data-motion="row" className="sticky top-0 h-svh overflow-clip">
        <ol ref={list} className="absolute inset-x-0 top-0 border-t border-rule will-change-transform">
          {services.map((service, index) => (
            <ServicesAccordionRow
              key={service.slug}
              service={service}
              number={String(index + 1).padStart(2, "0")}
              image={serviceArtwork(service)}
              cta={ctas[service.slug]}
              open={index === active}
              onSelect={() => select(index)}
            />
          ))}
        </ol>
      </div>
      {/* The scroll the list stays pinned for: `segment` per handover plus one `rest`, as in useScrollAccordion. */}
      <div aria-hidden="true">
        {services.slice(1).map((service) => (
          <div key={service.slug} className="h-137.5" />
        ))}
        <div className="h-25" />
      </div>
    </div>
  );
}
