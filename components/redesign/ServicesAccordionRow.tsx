import type services from "@/lib/redesign/data/services.data";
import PillLink from "./PillLink";
import ServicesAccordionImage from "./ServicesAccordionImage";

type Props = {
  service: (typeof services)[number];
  number: string;
  image: string;
  cta?: { label: string; href: string };
  open: boolean;
  onSelect: () => void;
};

/**
 * One service. Both its closed and open states are always rendered; `useScrollAccordion` scrubs
 * between them through the `data-part` elements as the page scrolls.
 */
export default function ServicesAccordionRow({ service, number, image, cta, open, onSelect }: Props) {
  const panelId = `${service.slug}-panel`;
  return (
    <li id={service.slug} className="relative flex flex-col border-b border-rule last:border-b-0">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onSelect}
          className="flex min-h-11 w-full cursor-pointer flex-wrap items-start gap-x-7 gap-y-3 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:flex-nowrap"
        >
          <span
            className={`w-8 shrink-0 pt-2.5 text-label leading-4 transition-colors lg:w-20 ${open ? "text-studio-orange" : "text-ash"}`}
          >
            {number}
          </span>
          <span data-part="titles" className="relative flex-1 basis-0 font-display uppercase">
            <span data-part="closed" className="block text-services-row">
              {service.title.replace("\n", " ")}
            </span>
            <span
              data-part="open"
              aria-hidden="true"
              className="absolute inset-x-0 top-0 text-services-open whitespace-pre-line text-studio-orange opacity-0"
            >
              {service.title}
            </span>
          </span>
          <span
            data-part="tags"
            className="order-last w-full pl-15 text-label leading-4 text-ash uppercase lg:order-none lg:w-130 lg:shrink-0 lg:self-center lg:pl-0"
          >
            {service.tags}
          </span>
          <span
            aria-hidden="true"
            className={`w-10 shrink-0 text-right text-3xl leading-10 transition-colors ${open ? "text-studio-orange" : ""}`}
          >
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>
      <div data-part="panel" id={panelId} inert={!open} className="mt-auto grid overflow-hidden">
        <div className="min-h-0">
          <div className="flex flex-col gap-5 pb-10 lg:ml-27 lg:w-130">
            <p className="text-lg leading-6.5">{service.summary}</p>
            <p className="text-label leading-4 text-ash uppercase">{service.tags}</p>
            {cta && <PillLink href={cta.href}>{cta.label}</PillLink>}
          </div>
        </div>
      </div>
      <ServicesAccordionImage src={image} />
    </li>
  );
}
