"use client";

import Link from "next/link";
import { useState } from "react";
import type servicesData from "@/lib/redesign/data/services.data";
import serviceArtwork from "@/lib/redesign/serviceArtwork";
import ServiceVisual from "./ServiceVisual";

export default function ServiceList({
  services,
  firstActive = false,
}: {
  services: readonly (typeof servicesData)[number][];
  firstActive?: boolean;
}) {
  const [active, setActive] = useState<number | null>(firstActive ? 0 : null);
  return (
    <ol onMouseLeave={() => setActive(firstActive ? 0 : null)}>
      {services.map((service, index) => (
        <li
          data-motion="row"
          data-motion-hover="service"
          key={service.slug}
          id={service.slug}
          onMouseEnter={() => setActive(index)}
          onFocusCapture={() => setActive(index)}
          className="scroll-mt-12 border-t border-studio-line"
        >
          <div className="group flex flex-col gap-6 py-6 md:flex-row md:items-center lg:gap-12 xl:gap-18">
            <span className="w-12 shrink-0 font-studio-mono text-label text-studio-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="shrink-0 whitespace-pre-line text-3xl leading-tight tracking-heading md:w-56 xl:w-80 xl:text-4xl">
              <Link href={service.href} className="underline-offset-8 hover:underline">
                {service.title}
                {service.slug === "ai-business-automation" && (
                  <span className="text-studio-orange" aria-hidden="true">
                    {" "}
                    ↗
                  </span>
                )}
              </Link>
            </h3>
            <div className="flex-1 space-y-5">
              <p className="text-lg leading-7 text-studio-muted lg:text-copy">{service.summary}</p>
              <p className="font-studio-mono text-xs leading-5 text-studio-muted">{service.tags}</p>
            </div>
            <ServiceVisual src={serviceArtwork(service)} thumbnail active={active === index} />
          </div>
        </li>
      ))}
    </ol>
  );
}
