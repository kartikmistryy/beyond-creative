import Link from "next/link";
import type { Metadata } from "next";
import { aiAutomation } from "@/lib/site";
import { listProjects } from "@/lib/db";
import { WorkGrid } from "@/components/WorkGrid";
import { Arrow } from "@/components/Footer";

export const metadata: Metadata = { title: aiAutomation.title, description: aiAutomation.blurb };

const useCases = [
  ["Sales & leads", "Capture every enquiry, enrich it, score it and route it to the right person — with the follow-up already drafted."],
  ["Content operations", "Briefs in, drafts, resizes and captions out. Approvals in Slack, publishing on schedule."],
  ["Customer support", "Agents trained on your docs that answer, triage and hand off to a human when it matters."],
  ["Finance & admin", "Invoices, receipts and reconciliations read, filed and synced to your accounting tool."],
  ["Internal knowledge", "Ask your company anything. Search across Drive, Notion, email and CRM in one place."],
  ["Reporting", "Weekly numbers pulled, summarised and sent — no more Monday-morning spreadsheet."],
];
const steps = [
  ["Map", "A half-day workshop to trace how work actually flows and where hours leak."],
  ["Prototype", "We build the highest-value workflow first, on your real data, in two weeks."],
  ["Ship", "Hardened, monitored, documented. Plugged into the tools you already use."],
  ["Improve", "Monthly reviews of what ran, what broke and what to automate next."],
];
const faqs = [
  ["Do we need to change our tools?", "Usually not. We connect to what you already use — Google Workspace, HubSpot, Notion, Slack, WhatsApp, Zoho and hundreds more."],
  ["Is our data safe?", "Workflows run in accounts you own, with least-privilege access. Sensitive steps can run on private models."],
  ["How fast will we see results?", "The first workflow is typically live within two to three weeks of the mapping workshop."],
  ["What does it cost?", "Projects start with a fixed-price map + prototype, then move to a monthly retainer for running and improving."],
];

export default function AIAutomation() {
  const cases = listProjects().filter((p) => p.tags.includes("AI Automation"));

  return (
    <>
      <section data-theme="blue" className="wrap flex min-h-svh flex-col justify-end bg-blue pt-40 pb-12 text-white">
        <p className="t-2 serif mb-6"><span className="bg-white px-1 text-blue">Primary service</span></p>
        <h1 data-reveal className="t-xxl">
          Automate the <span className="hl on-blue">busywork.</span>
        </h1>
        <div className="grid12 mt-14 gap-y-8 border-t border-white/30 pt-6">
          <p className="t-2 col-span-12 md:col-span-6">{aiAutomation.blurb}</p>
          <div className="col-span-12 flex md:col-span-6 md:justify-end">
            <Link href="/contact?service=ai" className="cta t-3 self-start text-white">Book a workflow audit <Arrow /></Link>
          </div>
        </div>
      </section>

      <section data-theme="light" className="wrap bg-paper py-[clamp(100px,16vw,240px)]">
        <div className="grid12 gap-y-8">
          <p className="t-3 col-span-12 self-end md:col-span-6">The problem.</p>
          <p data-reveal className="t-1 col-span-12 md:col-span-6">
            Your team didn&apos;t sign up to copy data between tabs. We take the repetitive work off their plate and
            give them the <span className="hl">hours back.</span>
          </p>
        </div>
      </section>

      <section data-theme="dark" className="wrap bg-ink py-[clamp(80px,10vw,140px)] text-white">
        <h2 className="t-3 mb-10 text-blue">What we automate</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map(([t, d], i) => (
            <div
              key={t}
              data-reveal
              style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties}
              className="group flex aspect-[4/3] flex-col justify-between bg-white/[0.04] p-6 transition-colors duration-500 hover:bg-blue"
            >
              <span className="t-1 serif text-blue transition-colors group-hover:text-white">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="t-1">{t}</h3>
                <p className="t-3 mt-3 text-white/65 group-hover:text-white/90">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section data-theme="blue" className="wrap bg-blue py-[clamp(80px,10vw,140px)] text-white">
        <h2 className="t-3 mb-12">How it works</h2>
        <ol className="grid gap-x-3 gap-y-12 md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} data-reveal style={{ "--d": `${i * 100}ms` } as React.CSSProperties} className="border-t border-white/40 pt-5">
              <span className="t-xl serif">{i + 1}</span>
              <h3 className="t-1 mt-8">{t}</h3>
              <p className="t-3 mt-3 text-white/80">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {cases.length > 0 && (
        <section data-theme="dark" className="wrap bg-ink pt-[clamp(80px,10vw,140px)] text-white">
          <h2 className="t-3 mb-10 text-blue">Automation case studies</h2>
          <WorkGrid projects={cases} />
        </section>
      )}

      <section data-theme="light" className="wrap bg-paper pt-[clamp(80px,10vw,140px)]">
        <div className="grid12 gap-y-8">
          <h2 className="t-3 col-span-12 md:col-span-6">Questions</h2>
          <div className="col-span-12 md:col-span-6">
            {faqs.map(([q, a]) => (
              <details key={q} className="group border-b border-line py-5 first:border-t">
                <summary className="t-2 flex cursor-pointer list-none items-center justify-between gap-6">
                  {q}
                  <span className="transition-transform duration-500 group-open:rotate-45">+</span>
                </summary>
                <p className="t-3 mt-4 max-w-xl text-ink/70">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
