import Link from "next/link";
import { listProjects } from "@/lib/db";
import { INTRO_RANGE, aiAutomation, services, site } from "@/lib/site";
import { Media } from "@/components/Media";
import { WorkGrid } from "@/components/WorkGrid";
import { Arrow } from "@/components/Footer";

export default function Home() {
  const projects = listProjects();
  const featured = projects.filter((p) => p.featured);
  // featured first, topped up with the rest so the grid always has full rows
  const work = [...featured, ...projects.filter((p) => !p.featured)].slice(0, 9);
  const reelSrc = projects.find((p) => p.featured && p.hero?.type === "video")?.hero;
  const reel = site.reel ? { url: site.reel, type: "video" as const } : (reelSrc ?? work[0]?.hero ?? work[0]?.cover);
  const cards = [
    { slug: "ai-automation", href: "/ai-automation", tag: "Primary", title: aiAutomation.title },
    ...services.map((s) => ({ slug: s.slug, href: `/services#${s.slug}`, tag: "Service", title: s.title })),
  ];

  return (
    <>
      {/* Reel sits behind the opening card; the spacer is the scroll distance the card needs to open */}
      {/* above page content, below the header card; Header hides it once the card fills the screen */}
      <div id="reel" className="fixed inset-0 z-40 bg-ink">
        <Media media={reel} priority />
      </div>
      <div style={{ height: INTRO_RANGE + 50 }} aria-hidden />

      {/* Intro */}
      <section data-theme="light" className="wrap bg-paper pt-[clamp(120px,22vw,315px)] pb-[clamp(80px,12vw,180px)]">
        <div className="grid12 gap-y-16">
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p data-reveal className="t-1">
              We&apos;re Beyond Creative — a studio for film, brand and digital, built for{" "}
              <span className="hl">ideas that outlast the brief.</span>
            </p>
          </div>
          <p data-reveal className="t-3 col-span-12 self-end md:col-span-6">
            Sharp ideas. Honest craft. Nothing wasted.
          </p>
          <div className="col-span-12 md:col-span-6">
            <p data-reveal className="t-1">
              Directors, designers and engineers in one room. We make work people remember — and the{" "}
              <span className="hl">systems that keep it running</span> long after launch.
            </p>
          </div>
        </div>
      </section>

      {/* Work */}
      <section data-theme="dark" className="wrap bg-ink pt-[120px] pb-[60px] text-white">
        <WorkGrid projects={work} />
        <div className="flex justify-end">
          <Link href="/projects" className="cta t-3 text-white">
            All work ({projects.length}) <Arrow />
          </Link>
        </div>
      </section>

      {/* Services band */}
      <section data-theme="blue" className="bg-blue pb-[clamp(60px,8vw,120px)] text-white">
        <div className="wrap grid12 gap-y-8 pt-[clamp(120px,22vw,315px)] pb-10">
          <p className="t-3 col-span-12 self-end md:col-span-6">What we do: film, brand, digital, automation.</p>
          <p data-reveal className="t-1 col-span-12 md:col-span-6">
            Six disciplines, one crew. Pick one — or bring us the{" "}
            <span className="hl on-blue">whole problem.</span>
          </p>
        </div>
        <div className="hpin">
          <div className="hpin-sticky">
          <div data-reveal className="hpin-track wrap flex gap-3">
            {cards.map((c, i) => (
              <Link
                key={c.slug}
                href={c.href}
                data-curtain
                style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
                className="group relative flex aspect-[446/645] h-[min(645px,74svh)] shrink-0 flex-col justify-between overflow-hidden bg-ink p-5"
              >
                <span className="serif t-1 text-white/25 transition-colors duration-500 group-hover:text-blue">
                  {String(i).padStart(2, "0")}
                </span>
                <span className="block transition-transform duration-700 ease-[var(--ease)] group-hover:-translate-y-2">
                  <span className="t-2 serif mb-3 inline-block bg-blue px-1 text-white">{c.tag}</span>
                  <span className="t-1 block pr-3 text-white">{c.title}</span>
                </span>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-blue transition-transform duration-700 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
