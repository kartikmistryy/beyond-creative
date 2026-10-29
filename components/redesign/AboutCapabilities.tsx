import type about from "@/lib/redesign/data/about.data";
import type servicesData from "@/lib/redesign/data/services.data";
import Eyebrow from "./Eyebrow";
import Lines from "./Lines";
import PillLink from "./PillLink";
import ServiceZigzag from "./ServiceZigzag";

type Service = (typeof servicesData)[number];
type Props = {
  content: typeof about.capabilities;
  services: readonly Service[];
  names: Record<Service["slug"], string>;
};

export default function AboutCapabilities({ content, services, names }: Props) {
  return (
    <section aria-labelledby="about-capabilities-title" className="flex flex-col items-start gap-16 bg-black px-7 pb-30 font-body font-normal text-white xl:flex-row xl:gap-7">
      <div className="flex shrink-0 flex-col gap-7 xl:w-115">
        <Eyebrow index="04">{content.label}</Eyebrow>
        <h2 id="about-capabilities-title" className="text-statement font-light tracking-tight">
          <Lines text={content.title} />
        </h2>
        <p className="text-lg leading-6.5 text-ash">{content.body}</p>
        <PillLink href="/services" variant="outline">
          {content.action}
        </PillLink>
      </div>
      <ServiceZigzag services={services} names={names} />
    </section>
  );
}
