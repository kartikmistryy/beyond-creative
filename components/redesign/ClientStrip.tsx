import Image from "next/image";
import clients from "@/lib/redesign/data/clients.data";

// Repeat the few logos so one half of the strip outruns a wide screen; the second half is the seamless loop.
const run = [0, 1, 2, 3].flatMap(() => clients.items);

/** Client logos on an endless marquee, shown as one-colour light marks so every logo reads on black. */
export default function ClientStrip() {
  return (
    <section aria-labelledby="clients-title" className="overflow-hidden bg-studio-bg py-section font-body font-normal text-white">
      <h2 id="clients-title" className="px-7 text-section-title font-light tracking-heading">
        <span className="block">{clients.title[0]}</span>
        <span className="block text-ash">{clients.title[1]}</span>
      </h2>
      <div aria-hidden="true" className="mt-10 h-px w-full bg-rule" />
      <ul className="sr-only">
        {clients.items.map((client) => (
          <li key={client.name}>{client.name}</li>
        ))}
      </ul>
      <div aria-hidden="true" data-motion="row" className="mt-16 lg:mt-20">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {[...run, ...run].map((client, index) => (
            <div key={index} className="flex h-20 shrink-0 items-center px-10 md:h-24 md:px-14">
              <Image
                src={client.logo}
                alt=""
                width={240}
                height={96}
                className="h-full w-auto object-contain opacity-80 grayscale invert transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
