import type { Metadata } from "next";
import { notFound } from "next/navigation";
import loadPreviewProject from "@/lib/redesign/loadPreviewProject";
import loadCmsProject from "@/lib/redesign/loadCmsProject";
import PreviewProject from "@/components/redesign/PreviewProject";
import CmsProject from "@/components/redesign/CmsProject";

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const content = loadPreviewProject(slug) ?? (await loadCmsProject(slug));
  return content
    ? { title: content.project.title, description: content.project.summary }
    : { title: "Project not found" };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const preview = loadPreviewProject(slug);
  if (preview) return <PreviewProject content={preview} />;
  const cms = await loadCmsProject(slug);
  if (!cms) notFound();
  return <CmsProject content={cms} />;
}
