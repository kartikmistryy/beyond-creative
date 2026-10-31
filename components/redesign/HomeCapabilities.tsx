import type home from "@/lib/redesign/data/home.data";
import type servicesData from "@/lib/redesign/data/services.data";
import Eyebrow from "./Eyebrow";
import PillLink from "./PillLink";
import ServiceZigzag from "./ServiceZigzag";

type Props = { content: typeof home.capabilities; services: readonly (typeof servicesData)[number][] };

export default function HomeCapabilities({ content, services }: Props) {
  return (
    <section aria-labelledby="home-capabilities-title" className="flex flex-col items-start gap-16 bg-black px-7 pb-30 font-body font-normal text-white xl:flex-row xl:gap-7">
      <div className="flex shrink-0 flex-col gap-7 xl:w-115">
        <Eyebrow index="03">{content.label}</Eyebrow>
        <h2 id="home-capabilities-title" className="text-statement font-light tracking-tight">
          {content.title}
        </h2>
        <p className="text-lg leading-6.5 text-ash">{content.body}</p>
        <PillLink href="/services" variant="outline">
          {content.action}
        </PillLink>
      </div>
      <ServiceZigzag services={services} names={content.names} />
    </section>
  );
}
