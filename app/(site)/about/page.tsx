import type { Metadata } from "next";
import content from "@/lib/redesign/data/about.data";
import home from "@/lib/redesign/data/home.data";
import services from "@/lib/redesign/data/services.data";
import metadataContent from "@/lib/redesign/data/metadata.data";
import projects from "@/lib/redesign/data/projectPreviews.data";
import getHeroStills from "@/lib/redesign/getHeroStills";
import AboutHero from "@/components/redesign/AboutHero";
import AboutStory from "@/components/redesign/AboutStory";
import AboutFounder from "@/components/redesign/AboutFounder";
import AboutCapabilities from "@/components/redesign/AboutCapabilities";
import AboutProcess from "@/components/redesign/AboutProcess";
import FaqList from "@/components/redesign/FaqList";

export const metadata: Metadata = {
  title: { absolute: metadataContent.about.title },
  description: metadataContent.about.description,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero content={content.hero} stills={getHeroStills(projects)} />
      <AboutStory content={content.story} />
      <AboutFounder content={content.founder} />
      <AboutCapabilities content={content.capabilities} services={services} names={home.capabilities.names} />
      <AboutProcess content={content.process} />
      <FaqList index="06" {...content.faq} />
    </>
  );
}
