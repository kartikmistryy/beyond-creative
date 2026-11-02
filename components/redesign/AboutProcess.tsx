"use client";

import { useState } from "react";
import type about from "@/lib/redesign/data/about.data";
import AboutProcessPanel from "./AboutProcessPanel";
import Eyebrow from "./Eyebrow";
import Lines from "./Lines";

/** "How we work": five expanding panels; hovering or clicking a step opens it. */
export default function AboutProcess({ content }: { content: typeof about.process }) {
  const [active, setActive] = useState(0);
  return (
    <section className="border-t border-rule bg-black px-7 py-35 font-body font-normal text-white lg:py-0">
      <div className="flex flex-col gap-16 lg:h-svh lg:justify-center lg:gap-12">
        <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-end lg:justify-between">
          <Eyebrow index="05">{content.label}</Eyebrow>
          <h2 className="text-statement font-light tracking-tight">
            <Lines text={content.title} />
          </h2>
        </div>
        <ol className="flex flex-col border-b border-rule lg:h-about-panels lg:flex-row lg:border-t">
          {content.steps.map((step, index) => (
            <AboutProcessPanel
              key={step.title}
              step={step}
              index={index}
              count={content.steps.length}
              open={index === active}
              onSelect={() => setActive(index)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
