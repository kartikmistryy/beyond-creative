"use client";

import Link from "next/link";
import useVoiceAgent from "@/lib/redesign/useVoiceAgent";

export default function VoiceLauncher() {
  const { status, isOpen, toggle } = useVoiceAgent();
  return (
    <aside
      aria-label="Voice assistant"
      className="fixed right-4 bottom-4 z-50 flex max-w-72 flex-col items-end gap-2 font-studio text-studio-text md:right-7 md:bottom-6"
    >
      {status === "error" ? (
        <Link
          href="/contact"
          className="rounded-full border border-studio-line bg-studio-bg px-6 py-4 text-sm shadow-xl"
        >
          Voice demo unavailable · Contact us ↗
        </Link>
      ) : (
        <button
          type="button"
          disabled={status !== "ready"}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Minimize voice assistant" : "Open voice assistant"}
          onClick={toggle}
          className="flex min-h-16 items-center gap-4 rounded-full border border-studio-line bg-studio-bg py-2.5 pr-3 pl-6 shadow-xl transition-colors hover:border-studio-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-text disabled:opacity-60"
        >
          <span className="text-left">
            <span className="block text-lg leading-6">{isOpen ? "Close assistant" : "Talk to our AI"}</span>
            <span className="block font-studio-mono text-xs leading-4 uppercase text-studio-muted">
              {status === "loading" ? "Loading assistant" : isOpen ? "Back to the page" : "Try it yourself"}
            </span>
          </span>
          <span className="flex size-12 items-center justify-center rounded-full bg-studio-orange text-studio-bg">
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
              <path
                d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      )}
    </aside>
  );
}
