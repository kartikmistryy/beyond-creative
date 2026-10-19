import type { ReactNode } from "react";
import SiteHeader from "@/components/redesign/SiteHeader";
import SiteFooter from "@/components/redesign/SiteFooter";
import VoiceAgentProvider from "@/components/redesign/VoiceAgentProvider";
import "@/components/redesign/theme.css";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div
      id="top"
      className="relative min-h-svh bg-studio-bg font-studio font-normal tracking-normal text-studio-text selection:bg-studio-orange selection:text-studio-bg"
    >
      <VoiceAgentProvider>
        <a
          href="#main-content"
          className="sr-only z-50 bg-studio-orange p-4 text-studio-bg focus:not-sr-only focus:absolute"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </VoiceAgentProvider>
    </div>
  );
}
