"use client";

import Image from "next/image";
import type services from "@/lib/redesign/data/services.data";
import type servicesPage from "@/lib/redesign/data/servicesPage.data";
import serviceArtwork from "@/lib/redesign/serviceArtwork";
import useScrollAccordion from "@/lib/redesign/useScrollAccordion";
import PillLink from "./PillLink";

type Props = {
  services: typeof services;
  ctas: typeof servicesPage.index.ctas;
};

/** Every service row, opened one at a time by scroll position (or by clicking its title). */
export default function ServicesAccordion({ services, ctas }: Props) {
  const { list, active, select } = useScrollAccordion(services.length);
  return (
    <ol ref={list} className="border-t border-rule">
      {services.map((service, index) => {
        const open = index === active;
        const panelId = `${service.slug}-panel`;
        const cta = ctas[service.slug];
        return (
          <li
            data-motion="row"
            key={service.slug}
            id={service.slug}
            className={`relative flex scroll-mt-12 flex-col border-b border-rule lg:flex-row ${open ? "gap-7 pt-7 pb-10 lg:pr-17" : ""}`}
          >
            <div className="flex flex-1 flex-col justify-between gap-10">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={open ? panelId : undefined}
                  onClick={() => select(index)}
                  className={`flex min-h-11 w-full cursor-pointer flex-wrap gap-x-7 gap-y-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:flex-nowrap ${open ? "items-start" : "items-center py-6"}`}
                >
                  <span className={`w-8 shrink-0 text-label leading-4 lg:w-20 ${open ? "pt-2.5 text-studio-orange" : "text-ash"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 basis-0 font-display uppercase ${open ? "text-services-open whitespace-pre-line text-studio-orange" : "text-services-row"}`}
                  >
                    {open ? service.title : service.title.replace("\n", " ")}
                  </span>
                  {!open && (
                    <span className="order-last w-full pl-15 text-label leading-4 text-ash uppercase lg:order-none lg:w-130 lg:shrink-0 lg:pl-0">
                      {service.tags}
                    </span>
                  )}
                  <span
                    aria-hidden="true"
                    className={`w-10 shrink-0 text-right text-3xl leading-10 ${open ? "text-studio-orange lg:absolute lg:top-7 lg:right-0" : ""}`}
                  >
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>
              {open && (
                <div id={panelId} className="flex flex-col gap-5 lg:ml-27 lg:w-130">
                  <p className="text-lg leading-6.5">{service.summary}</p>
                  <p className="text-label leading-4 text-ash uppercase">{service.tags}</p>
                  {cta && <PillLink href={cta.href}>{cta.label}</PillLink>}
                </div>
              )}
            </div>
            {open && (
              <div className="relative aspect-services-image w-full shrink-0 overflow-hidden lg:w-130">
                <Image src={serviceArtwork(service)} alt="" fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
