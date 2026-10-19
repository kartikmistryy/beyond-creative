"use client";

import Script from "next/script";
import { useRef, type ReactNode } from "react";
import voiceAgentContext from "@/lib/redesign/voiceAgentContext";
import useVoiceAgentController from "@/lib/redesign/useVoiceAgentController";
import voiceAgent from "@/lib/redesign/data/voiceAgent.data";
import VoiceLauncher from "./VoiceLauncher";

export default function VoiceAgentProvider({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const controller = useVoiceAgentController(host);
  return (
    <voiceAgentContext.Provider value={controller}>
      <link rel="stylesheet" href={voiceAgent.stylesheet} />
      {children}
      <div ref={host} data-chat-widget="" />
      <VoiceLauncher />
      <Script
        id="beyond-voice-agent"
        src={voiceAgent.script}
        strategy="lazyOnload"
        onReady={controller.initialize}
        onError={controller.fail}
      />
    </voiceAgentContext.Provider>
  );
}
