"use client";

import useVoiceAgent from "@/lib/redesign/useVoiceAgent";

export default function VoiceButton({
  prominent = false,
  children,
}: {
  prominent?: boolean;
  children: React.ReactNode;
}) {
  const { open, status } = useVoiceAgent();
  return (
    <button
      type="button"
      onClick={open}
      disabled={status !== "ready"}
      className={
        prominent
          ? "inline-flex min-h-14 items-center justify-center gap-4 bg-studio-orange px-6 py-4 text-lg font-medium text-studio-bg hover:bg-studio-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-text disabled:cursor-wait disabled:opacity-60"
          : "inline-flex min-h-11 items-center gap-3 font-studio-mono text-label uppercase hover:underline disabled:opacity-60"
      }
    >
      {status === "error" ? "Voice demo unavailable" : children}
      <span aria-hidden="true">↘</span>
    </button>
  );
}
