import Link from "next/link";
import type { Metadata } from "next";
import { aiAutomation, services } from "@/lib/site";
import { Arrow } from "@/components/Footer";

export const metadata: Metadata = { title: "Services" };

export default function Services() {
  return (
    <>
      <section data-theme="light" className="wrap bg-paper pt-[clamp(140px,16vw,240px)] pb-[clamp(80px,10vw,140px)]">
        <div className="grid12 gap-y-10">
          <h1 data-reveal className="t-xxl col-span-12">Services</h1>
          <p className="t-3 col-span-12 self-end md:col-span-6">One crew, idea to final frame.</p>
          <p data-reveal className="t-1 col-span-12 md:col-span-6">
            We make the film, the brand and the site — and build the <span className="hl">systems behind them</span> so
            the work keeps working.
          </p>
        </div>
      </section>

      {/* Primary service */}
      <Link href="/ai-automation" data-theme="blue" className="group wrap block bg-blue py-[clamp(60px,8vw,110px)] text-white">
        <div className="grid12 gap-y-6">
          <p className="t-2 serif col-span-12 md:col-span-6"><span className="bg-white px-1 text-blue">00 — Primary</span></p>
          <div data-reveal className="col-span-12 md:col-span-6">
            <h2 className="t-xl">{aiAutomation.title}</h2>
            <p className="t-3 mt-5 max-w-xl text-white/80">{aiAutomation.blurb}</p>
            <span className="cta t-3 mt-10 text-white">Explore <Arrow /></span>
          </div>
        </div>
      </Link>

      <section data-theme="dark" className="wrap bg-ink py-[clamp(60px,8vw,110px)] text-white">
        <ol>
          {services.map((s, i) => (
            <li key={s.slug} id={s.slug} className="grid12 scroll-mt-28 gap-y-6 border-t border-white/15 py-[clamp(40px,6vw,80px)]">
              <p className="t-2 serif col-span-12 text-blue md:col-span-6">{String(i + 1).padStart(2, "0")}</p>
              <div data-reveal className="col-span-12 md:col-span-6">
                <h2 className="t-1">{s.title}</h2>
                <p className="t-3 mt-4 text-white/70">{s.blurb}</p>
                <ul className="t-3 mt-8 flex flex-wrap gap-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="border border-white/20 px-3 py-1.5">{d}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
