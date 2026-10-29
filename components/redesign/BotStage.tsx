"use client";

import voiceAgent from "@/lib/redesign/data/voiceAgent.data";
import useVoiceAgent from "@/lib/redesign/useVoiceAgent";
import BotOrb from "./BotOrb";
import BotQuestions from "./BotQuestions";
import VoiceButton from "./VoiceButton";

export default function BotStage({ questions }: { questions: readonly string[] }) {
  const { status, isOpen } = useVoiceAgent();
  return (
    <div className="flex flex-col items-center justify-between gap-12 bg-black p-7 text-white md:p-12 lg:w-150 lg:shrink-0">
      <div className="flex justify-between gap-4 self-stretch text-label leading-4">
        <p aria-live="polite" className="text-ash uppercase">
          AI RECEPTIONIST<span className="text-studio-orange">{"//"}</span>
          {status === "ready" && isOpen ? voiceAgent.listening : voiceAgent.status[status]}
        </p>
        {status === "ready" && (
          <p aria-hidden="true" className="text-studio-orange">
            ● LIVE
          </p>
        )}
      </div>
      <BotOrb />
      <div className="flex flex-col gap-2.5 self-stretch">
        <BotQuestions questions={questions} />
        <VoiceButton>Start a call</VoiceButton>
        <p className="pt-2 text-sm leading-5 text-ash">{voiceAgent.sampleNotice}</p>
      </div>
    </div>
  );
}
