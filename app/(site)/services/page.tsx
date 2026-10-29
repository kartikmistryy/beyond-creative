import type { Metadata } from "next";
import content from "@/lib/redesign/data/servicesPage.data";
import services from "@/lib/redesign/data/services.data";
import metadataContent from "@/lib/redesign/data/metadata.data";
import serviceArtwork from "@/lib/redesign/serviceArtwork";
import ServicesHero from "@/components/redesign/ServicesHero";
import ServicesIndex from "@/components/redesign/ServicesIndex";
import FaqList from "@/components/redesign/FaqList";

export const metadata: Metadata = {
  title: { absolute: metadataContent.services.title },
  description: metadataContent.services.description,
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero content={content.hero} stills={services.map((service) => ({ src: serviceArtwork(service) }))} />
      <ServicesIndex content={content.index} services={services} />
      <FaqList {...content.faq} />
    </>
  );
}
