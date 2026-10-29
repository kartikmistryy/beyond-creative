"use client";

import { useRef } from "react";
import voiceAgent from "@/lib/redesign/data/voiceAgent.data";
import useVoiceAgent from "@/lib/redesign/useVoiceAgent";
import useHideFloatingOrb from "@/lib/redesign/useHideFloatingOrb";
import BotOrb from "./BotOrb";
import BotQuestions from "./BotQuestions";
import VoiceButton from "./VoiceButton";

export default function BotStage({ questions }: { questions: readonly string[] }) {
  const { status, isOpen } = useVoiceAgent();
  const stage = useRef<HTMLDivElement>(null);
  useHideFloatingOrb(stage);
  return (
    <div ref={stage} className="flex flex-col items-center gap-10 lg:w-150 lg:shrink-0">
      <p aria-live="polite" className="sr-only">
        AI receptionist: {status === "ready" && isOpen ? voiceAgent.listening : voiceAgent.status[status]}
      </p>
      <div className="relative flex w-full flex-col items-center gap-8 md:py-24">
        <BotOrb />
        <BotQuestions questions={questions} />
      </div>
      <div className="flex flex-col gap-2.5 self-stretch">
        <VoiceButton>Start a call</VoiceButton>
        <p className="pt-2 text-sm leading-5 text-black/60">{voiceAgent.sampleNotice}</p>
      </div>
    </div>
  );
}
