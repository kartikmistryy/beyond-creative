import type { Metadata } from "next";
import content from "@/lib/redesign/data/automation.data";
import metadataContent from "@/lib/redesign/data/metadata.data";
import services from "@/lib/redesign/data/services.data";
import serviceArtwork from "@/lib/redesign/serviceArtwork";
import AutomationHero from "@/components/redesign/AutomationHero";
import AutomationDemo from "@/components/redesign/AutomationDemo";
import AutomationCapabilities from "@/components/redesign/AutomationCapabilities";
import AutomationWorkflows from "@/components/redesign/AutomationWorkflows";
import StepStack from "@/components/redesign/StepStack";
import FaqList from "@/components/redesign/FaqList";
import VoiceAgentProvider from "@/components/redesign/VoiceAgentProvider";

export const metadata: Metadata = {
  title: { absolute: metadataContent.automation.title },
  description: metadataContent.automation.description,
};

export default function AutomationPage() {
  return (
    <VoiceAgentProvider>
      <AutomationHero content={content.hero} stills={services.filter((service) => service.slug === "ai-business-automation").map((service) => ({ src: serviceArtwork(service) }))} />
      <AutomationDemo content={content.demo} />
      <AutomationCapabilities content={content.capabilities} />
      <AutomationWorkflows content={content.workflows} />
      <StepStack {...content.process} />
      <FaqList index="06" {...content.faq} />
    </VoiceAgentProvider>
  );
}
