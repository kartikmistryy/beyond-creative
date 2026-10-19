import type { Metadata } from "next";
import Link from "next/link";
import content from "@/lib/redesign/data/about.data";
import services from "@/lib/redesign/data/services.data";
import projects from "@/lib/redesign/data/projectPreviews.data";
import metadataContent from "@/lib/redesign/data/metadata.data";
import PageHero from "@/components/redesign/PageHero";
import AboutStory from "@/components/redesign/AboutStory";
import AboutFounder from "@/components/redesign/AboutFounder";
import ClientLogos from "@/components/redesign/ClientLogos";
import ServiceList from "@/components/redesign/ServiceList";
import SectionLabel from "@/components/redesign/SectionLabel";
import ProcessSection from "@/components/redesign/ProcessSection";
import FaqSection from "@/components/redesign/FaqSection";

export const metadata: Metadata = {
  title: { absolute: metadataContent.about.title },
  description: metadataContent.about.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero {...content.hero} />
      <AboutStory content={content.story} />
      <AboutFounder content={content.founder} />
      <ClientLogos projects={projects} />
      <section className="px-gutter pb-section">
        <div className="mx-auto max-w-studio space-y-12">
          <SectionLabel>{content.capabilities.label}</SectionLabel>
          <h2 className="whitespace-pre-line text-heading tracking-heading">{content.capabilities.title}</h2>
          <ServiceList services={[services[0], services[1], services[3]]} firstActive />
          <div className="flex justify-end">
            <Link href="/services" className="font-studio-mono text-label uppercase hover:text-studio-orange">
              Explore all seven services ↗
            </Link>
          </div>
        </div>
      </section>
      <ProcessSection {...content.process} />
      <FaqSection {...content.faq} />
    </>
  );
}
