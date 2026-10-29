import type { Metadata } from "next";
import loadHomePage from "@/lib/redesign/loadHomePage";
import metadataContent from "@/lib/redesign/data/metadata.data";
import HomeHero from "@/components/redesign/HomeHero";
import HomeStudio from "@/components/redesign/HomeStudio";
import SelectedWork from "@/components/redesign/SelectedWork";
import HomeCapabilities from "@/components/redesign/HomeCapabilities";
import FaqList from "@/components/redesign/FaqList";

export const metadata: Metadata = {
  title: { absolute: metadataContent.home.title },
  description: metadataContent.home.description,
};

export default function HomePage() {
  const { content, projects, services } = loadHomePage();
  return (
    <>
      <HomeHero content={content.hero} />
      <HomeStudio content={content.studio} />
      <SelectedWork content={content.work} projects={projects} />
      <HomeCapabilities content={content.capabilities} services={services} />
      <FaqList index="04" {...content.faq} />
    </>
  );
}
