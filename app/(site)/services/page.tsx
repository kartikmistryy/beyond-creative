import type { Metadata } from "next";
import content from "@/lib/redesign/data/servicesPage.data";
import services from "@/lib/redesign/data/services.data";
import metadataContent from "@/lib/redesign/data/metadata.data";
import PageHero from "@/components/redesign/PageHero";
import ServiceList from "@/components/redesign/ServiceList";
import SectionLabel from "@/components/redesign/SectionLabel";
import FaqSection from "@/components/redesign/FaqSection";

export const metadata: Metadata = {
  title: { absolute: metadataContent.services.title },
  description: metadataContent.services.description,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero {...content.hero} />
      <section id="all-services" className="scroll-mt-12 px-gutter py-section">
        <div className="mx-auto max-w-studio space-y-12">
          <SectionLabel>{content.label}</SectionLabel>
          <h2 className="whitespace-pre-line text-heading tracking-heading">{content.title}</h2>
          <ServiceList services={services} />
        </div>
      </section>
      <FaqSection {...content.faq} />
    </>
  );
}
