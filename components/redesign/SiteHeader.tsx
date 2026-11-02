"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import useScrolled from "@/lib/redesign/useScrolled";
import BrandLogo from "./BrandLogo";
import SiteMenu from "./SiteMenu";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const scrolled = useScrolled(24);
  return (
    // The header band lies over the home hero's own nav links, so only its controls take clicks.
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40 px-7 py-7">
      <div data-motion="fade" className="flex h-10 items-center in-data-hero-box-visible:invisible">
        <Link href="/" aria-label="Beyond Creative home" className="pointer-events-auto">
          <BrandLogo />
        </Link>
      </div>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(true)}
        className={`pointer-events-auto fixed top-6.5 right-7 z-40 min-h-11 min-w-11 rounded-full px-4 font-body text-base leading-5 font-normal transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:in-data-hero-box-visible:invisible ${
          scrolled ? "bg-studio-orange text-white hover:bg-white hover:text-black in-data-hero-box-visible:bg-black in-data-footer-visible:bg-black" : "bg-transparent text-white"
        }`}
      >
        Menu
      </button>
      <SiteMenu open={open} onClose={() => setOpen(false)} onClosed={() => button.current?.focus()} />
    </header>
  );
}
