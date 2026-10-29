"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import useVoiceAgent from "@/lib/redesign/useVoiceAgent";

export default function VoiceAgentFallback() {
  const { status } = useVoiceAgent();
  if (status !== "error") return null;
  return (
    <aside
      aria-label="Voice assistant"
      className="fixed right-4 bottom-4 z-50 flex max-w-72 flex-col items-end gap-2 font-studio text-studio-text md:right-7 md:bottom-6"
    >
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-full border border-studio-line bg-studio-bg px-6 py-4 text-sm shadow-xl"
      >
        Voice demo unavailable · Contact us
        <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
      </Link>
    </aside>
  );
}
