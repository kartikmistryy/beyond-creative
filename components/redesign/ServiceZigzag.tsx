import Link from "next/link";
import type servicesData from "@/lib/redesign/data/services.data";

type Service = (typeof servicesData)[number];
type Props = { services: readonly Service[]; names: Record<Service["slug"], string> };

/** Service names stepping left and right, each with its (01)–(07) index. */
export default function ServiceZigzag({ services, names }: Props) {
  return (
    <ol data-motion="zigzag" className="flex w-full overflow-x-clip grow flex-col gap-7 xl:basis-0">
      {services.map((service, index) => (
        <li key={service.slug} className={index % 2 ? "self-end" : "self-start"}>
          <Link
            href={service.href}
            className="flex items-start gap-2.5 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span className="shrink-0 pt-2 text-label leading-4 tracking-wide">
              ({String(index + 1).padStart(2, "0")})
            </span>
            <span className="font-display text-home-service text-studio-orange uppercase">{names[service.slug]}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
