import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default async function Contact({ searchParams }: PageProps<"/contact">) {
  const { service } = await searchParams;
  return (
    <section data-theme="light" className="wrap bg-paper pt-[clamp(140px,16vw,240px)] pb-10">
      <div className="grid12 gap-y-16">
        <div className="col-span-12 flex flex-col justify-between gap-12 md:col-span-6">
          <h1 data-reveal className="t-xl">
            Tell us what you&apos;re
            <br />
            <span className="hl">making.</span>
          </h1>
          <dl className="t-3 space-y-6">
            <div>
              <dt className="t-2 serif">Email</dt>
              <dd><a className="t-1 link" href={`mailto:${site.email}`}>{site.email}</a></dd>
            </div>
            <div>
              <dt className="t-2 serif">Phone</dt>
              <dd><a className="link" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></dd>
            </div>
            <div>
              <dt className="t-2 serif">Studio</dt>
              <dd>{site.city}</dd>
            </div>
          </dl>
        </div>
        <div className="col-span-12 md:col-span-6">
          <ContactForm defaultService={service === "ai" ? "AI Automation & Workflows" : ""} />
        </div>
      </div>
    </section>
  );
}
