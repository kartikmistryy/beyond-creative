import type { Metadata } from "next";
import Link from "next/link";
import loadHomePage from "@/lib/redesign/loadHomePage";
import metadataContent from "@/lib/redesign/data/metadata.data";
import HomeHero from "@/components/redesign/HomeHero";
import HomeStudio from "@/components/redesign/HomeStudio";
import ProjectGrid from "@/components/redesign/ProjectGrid";
import ServiceCarousel from "@/components/redesign/ServiceCarousel";
import FaqSection from "@/components/redesign/FaqSection";

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
      <section id="selected-work" className="scroll-mt-8 px-gutter pb-section pt-5">
        <div className="mx-auto max-w-studio space-y-16">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h2 className="text-heading tracking-heading">Selected Work</h2>
            <Link href="/projects" className="font-studio-mono text-label uppercase hover:text-studio-orange">
              All projects ↗
            </Link>
          </div>
          <ProjectGrid projects={projects} editorial />
        </div>
      </section>
      <ServiceCarousel services={services} {...content.capabilities} />
      <FaqSection {...content.faq} />
    </>
  );
}
