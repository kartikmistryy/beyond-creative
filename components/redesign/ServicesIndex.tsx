import type servicesPage from "@/lib/redesign/data/servicesPage.data";
import type services from "@/lib/redesign/data/services.data";
import Eyebrow from "./Eyebrow";
import Lines from "./Lines";
import ServicesAccordion from "./ServicesAccordion";

type Props = {
  content: typeof servicesPage.index;
  services: typeof services;
};

export default function ServicesIndex({ content, services }: Props) {
  return (
    <section
      id="all-services"
      aria-labelledby="services-index-title"
      className="flex flex-col gap-10 bg-black px-7 pt-20 pb-28 font-body font-normal text-white lg:pb-40"
    >
      <div className="flex flex-col-reverse gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="services-index-title" className="text-statement font-light tracking-tight">
          <Lines text={content.title} />
        </h2>
        <Eyebrow index="02">{content.label}</Eyebrow>
      </div>
      <ServicesAccordion services={services} ctas={content.ctas} />
    </section>
  );
}
