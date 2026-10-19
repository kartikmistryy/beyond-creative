import type { Metadata } from "next";
import content from "@/lib/redesign/data/workPage.data";
import projects from "@/lib/redesign/data/projectPreviews.data";
import metadataContent from "@/lib/redesign/data/metadata.data";
import PageHero from "@/components/redesign/PageHero";
import ProjectGrid from "@/components/redesign/ProjectGrid";

export const metadata: Metadata = {
  title: { absolute: metadataContent.work.title },
  description: metadataContent.work.description,
};

export default function WorkPage() {
  return (
    <>
      <PageHero {...content.hero} />
      <section
        id="all-projects"
        aria-label="All projects"
        className="scroll-mt-12 px-gutter pb-section pt-12"
      >
        <div className="mx-auto max-w-studio">
          <ProjectGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
