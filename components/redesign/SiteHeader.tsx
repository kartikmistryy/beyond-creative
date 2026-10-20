"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import navigation from "@/lib/redesign/data/navigation.data";
import BrandLogo from "./BrandLogo";
import MobileMenu from "./MobileMenu";

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-40 px-gutter py-5 md:px-10">
      <div data-motion="fade" className="relative mx-auto flex h-12 max-w-studio items-center justify-between">
        <nav aria-label="Work and services" className="hidden gap-10 md:flex">
          {navigation.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              className={`py-2 text-lg underline-offset-8 hover:underline ${pathname.startsWith(link.href) ? "underline" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          aria-label="Beyond Creative home"
          className="md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          <BrandLogo />
        </Link>
        <nav aria-label="Studio and contact" className="hidden gap-10 md:flex">
          {navigation.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              className={`py-2 text-lg underline-offset-8 hover:underline ${pathname.startsWith(link.href) ? "underline" : ""} ${link.href === "/contact" ? "text-studio-orange" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="min-h-11 px-2 text-lg underline-offset-8 hover:underline md:hidden"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
      <MobileMenu open={menuOpen} pathname={pathname} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
