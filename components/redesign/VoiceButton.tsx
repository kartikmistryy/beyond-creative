"use client";

import type { ReactNode } from "react";
import useVoiceAgent from "@/lib/redesign/useVoiceAgent";
import voiceAgent from "@/lib/redesign/data/voiceAgent.data";

export default function VoiceButton({ children }: { children: ReactNode }) {
  const { open, status } = useVoiceAgent();
  return (
    <button
      data-motion-hover="action"
      type="button"
      onClick={open}
      disabled={status !== "ready"}
      className="mt-3 inline-flex min-h-11 items-center justify-center gap-3.5 rounded-full bg-studio-orange px-6.5 py-4.5 text-label leading-4 tracking-wide text-black uppercase transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-wait disabled:opacity-60"
    >
      {status === "error" ? voiceAgent.status.error : children}
      <span aria-hidden="true" data-motion-arrow="right" className="text-lg leading-5.5">
        ⟶
      </span>
    </button>
  );
}
