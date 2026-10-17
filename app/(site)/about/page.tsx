import type { Metadata } from "next";
import { listProjects } from "@/lib/db";
import { Media } from "@/components/Media";

export const metadata: Metadata = { title: "About" };

// TODO(content): placeholder numbers & principles — replace with the studio's real ones.
const stats = [
  ["120+", "Projects shipped"],
  ["40+", "Brands"],
  ["9", "Years"],
  ["1", "Crew, end to end"],
];
const principles = [
  ["Taste over trend", "We'd rather make something that lasts than something that's loud this month."],
  ["Small crew, senior hands", "The people in the pitch are the people on set and in the edit."],
  ["Make it work, then beautiful", "Strategy and craft in the same room, so neither gets lost in a handoff."],
  ["Systems, not one-offs", "Every brand, site and workflow is built to be used — and reused — after we leave."],
];

export default function About() {
  const visual = listProjects()[1];
  return (
    <>
      <section data-theme="light" className="wrap bg-paper pt-[clamp(140px,16vw,240px)] pb-[clamp(80px,10vw,140px)]">
        <div className="grid12 gap-y-10">
          <h1 data-reveal className="t-xxl col-span-12">
            We go <span className="hl">beyond</span> the brief.
          </h1>
          <p className="t-3 col-span-12 self-end md:col-span-6">Independent. Director-led. Built to last.</p>
          <div className="col-span-12 space-y-8 md:col-span-6">
            <p data-reveal className="t-1">
              Beyond Creative is an independent studio for film, brand, digital and AI automation. We started as
              filmmakers and grew into the team you call when the idea, the picture and the plumbing all need to work.
            </p>
            <p data-reveal className="t-2">
              Directors, designers, editors and engineers under one roof — so the story on screen and the system behind
              it are made by the same people.
            </p>
          </div>
        </div>
      </section>

      <div data-theme="dark" className="h-[70svh] overflow-hidden bg-ink md:h-svh">
        <Media media={visual?.hero ?? visual?.cover} />
      </div>

      <section data-theme="dark" className="wrap bg-ink py-[clamp(80px,10vw,140px)] text-white">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(([n, l], i) => (
            <div key={l} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className="border-t border-white/20 pt-5">
              <p className="t-xxl">{n}</p>
              <p className="t-2 serif mt-3 text-blue">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-theme="blue" className="wrap bg-blue py-[clamp(80px,10vw,140px)] text-white">
        <div className="grid12 gap-y-8">
          <h2 className="t-3 col-span-12 md:col-span-6">How we work</h2>
          <ol className="col-span-12 md:col-span-6">
            {principles.map(([t, d], i) => (
              <li key={t} data-reveal className="border-t border-white/30 py-6">
                <p className="t-2 serif">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-1 mt-2">{t}</h3>
                <p className="t-3 mt-2 text-white/80">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
