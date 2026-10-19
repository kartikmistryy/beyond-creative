import Image from "next/image";
import type automation from "@/lib/redesign/data/automation.data";
import voiceAgent from "@/lib/redesign/data/voiceAgent.data";
import SectionLabel from "./SectionLabel";
import VoiceButton from "./VoiceButton";

export default function AutomationDemo({ content }: { content: typeof automation.demo }) {
  return (
    <section className="px-gutter pb-section">
      <div className="mx-auto flex max-w-studio flex-col items-center gap-12 lg:flex-row lg:gap-18">
        <div className="relative aspect-work-equal w-full lg:w-5/12 lg:shrink-0">
          <Image
            src={content.image}
            alt="Rotary telephone with broken ASCII streaks"
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
        <div className="flex-1 space-y-6">
          <SectionLabel>{content.label}</SectionLabel>
          <h2 className="whitespace-pre-line text-heading tracking-heading">{content.title}</h2>
          <p className="max-w-2xl text-lg leading-8 text-studio-muted md:text-copy">{content.body}</p>
          <ol className="space-y-3 border-y border-studio-line py-5">
            {content.steps.map((step) => (
              <li key={step} className="font-studio-mono text-xs leading-5 text-studio-muted">
                {step}
              </li>
            ))}
          </ol>
          <VoiceButton>Open the voice bot</VoiceButton>
          <p className="max-w-xl text-sm leading-5 text-studio-muted">{voiceAgent.sampleNotice}</p>
        </div>
      </div>
    </section>
  );
}
