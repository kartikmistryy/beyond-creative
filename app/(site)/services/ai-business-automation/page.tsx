import type { Metadata } from "next";
import content from "@/lib/redesign/data/automation.data";
import metadataContent from "@/lib/redesign/data/metadata.data";
import AutomationHero from "@/components/redesign/AutomationHero";
import AutomationDemo from "@/components/redesign/AutomationDemo";
import AutomationCapabilities from "@/components/redesign/AutomationCapabilities";
import AutomationWorkflows from "@/components/redesign/AutomationWorkflows";
import ProcessSection from "@/components/redesign/ProcessSection";
import FaqSection from "@/components/redesign/FaqSection";

export const metadata: Metadata = {
  title: { absolute: metadataContent.automation.title },
  description: metadataContent.automation.description,
};

export default function AutomationPage() {
  return (
    <>
      <AutomationHero content={content.hero} />
      <AutomationDemo content={content.demo} />
      <AutomationCapabilities content={content.capabilities} />
      <AutomationWorkflows content={content.workflows} />
      <ProcessSection {...content.process} />
      <FaqSection {...content.faq} />
    </>
  );
}
