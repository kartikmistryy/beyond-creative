import type automation from "@/lib/redesign/data/automation.data";
import SectionLabel from "./SectionLabel";
import ActionLink from "./ActionLink";
import VoiceButton from "./VoiceButton";

export default function AutomationHero({ content }: { content: typeof automation.hero }) {
  return (
    <section className="px-gutter pb-28 pt-36 lg:pb-55 lg:pt-page-top">
      <div className="mx-auto max-w-studio space-y-7">
        <SectionLabel>{content.label}</SectionLabel>
        <h1 className="text-ai-display tracking-display">
          <span className="block">{content.title[0]}</span>{" "}
          <span className="block text-studio-orange">{content.title[1]}</span>
        </h1>
        <div data-motion="stagger" className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <p className="font-studio-mono text-label">{content.tagline}</p>
          <p className="max-w-xl text-xl leading-8 tracking-tight text-studio-muted md:text-2xl">
            {content.intro}
          </p>
        </div>
        <div data-motion="rise" className="flex justify-end">
          <div className="flex w-full max-w-xl flex-wrap items-center gap-8">
            <VoiceButton prominent>Try our AI receptionist</VoiceButton>
            <ActionLink href="/contact">Book a discovery call</ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
