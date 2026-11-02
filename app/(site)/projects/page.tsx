import type { Metadata } from "next";
import projects from "@/lib/redesign/data/projectPreviews.data";
import metadataContent from "@/lib/redesign/data/metadata.data";
import WorkHero from "@/components/redesign/WorkHero";
import WorkIndex from "@/components/redesign/WorkIndex";

export const metadata: Metadata = {
  title: { absolute: metadataContent.work.title },
  description: metadataContent.work.description,
};

export default function WorkPage() {
  return (
    <>
      <WorkHero projects={projects} />
      <WorkIndex projects={projects} />
    </>
  );
}
