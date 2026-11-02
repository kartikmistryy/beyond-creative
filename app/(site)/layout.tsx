import type { ReactNode } from "react";
import SiteHeader from "@/components/redesign/SiteHeader";
import SiteFooter from "@/components/redesign/SiteFooter";
import SiteMotion from "@/components/redesign/SiteMotion";
import Preloader from "@/components/redesign/Preloader";
import "@/components/redesign/theme.css";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div
      id="top"
      className="relative isolate min-h-svh bg-studio-bg font-studio font-medium tracking-normal text-studio-text selection:bg-studio-orange selection:text-studio-bg"
    >
      <a
        href="#main-content"
        className="sr-only z-50 bg-studio-orange p-4 text-studio-bg focus:not-sr-only focus:absolute"
      >
        Skip to content
      </a>
      <Preloader />
      <SiteMotion>
        <SiteHeader />
        {/* Above the sticky footer so the footer is uncovered as the page scrolls away. A negative z on the footer would also hide it from clicks. */}
        <main id="main-content" className="relative z-10 bg-studio-bg">{children}</main>
        <SiteFooter />
      </SiteMotion>
    </div>
  );
}
