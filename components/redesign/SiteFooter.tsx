"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import getFooterContent from "@/lib/redesign/getFooterContent";
import BrandLogo from "./BrandLogo";
import ActionLink from "./ActionLink";
import SectionLabel from "./SectionLabel";

export default function SiteFooter() {
  const content = getFooterContent(usePathname());
  return (
    <footer className="border-t border-studio-line px-gutter pb-28 pt-16 lg:pt-24">
      <div className="mx-auto max-w-studio space-y-16">
        {!content.compact && (
          <div className="grid gap-12 lg:grid-cols-3 lg:items-end lg:gap-18">
            <h2 className="text-footer-title tracking-display lg:col-span-2">
              <span className="block">{content.title[0]}</span>{" "}
              <span className="block text-studio-orange">{content.title[1]}</span>
            </h2>
            <div className="space-y-6 pb-3">
              <SectionLabel>Let’s talk</SectionLabel>
              <ActionLink href="/contact">{content.action}</ActionLink>
              <p className="max-w-lg text-xl leading-7 text-studio-muted">{content.body}</p>
            </div>
          </div>
        )}
        <div
          data-motion="stagger"
          className={`grid gap-12 md:grid-cols-4 lg:grid-cols-6 ${content.compact ? "" : "border-t border-studio-line pt-8"}`}
        >
          <div className="space-y-6 md:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-block">
              <BrandLogo large />
            </Link>
            <p className="whitespace-pre-line text-base leading-6 text-studio-muted">{content.location}</p>
            <p className="max-w-2xl text-sm leading-5 text-studio-muted">{content.acknowledgement}</p>
          </div>
          <nav aria-label="Footer navigation" className="space-y-5">
            <SectionLabel>Menu</SectionLabel>
            <ul>
              {content.links.map((link) => (
                <li key={link.href}>
                  <Link className="inline-block py-1 text-lg hover:text-studio-orange" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Social links" className="space-y-5">
            <SectionLabel>Socials</SectionLabel>
            <ul>
              {content.socials.map((link) => (
                <li key={link.label}>
                  <a
                    className="inline-block py-1 text-lg hover:text-studio-orange"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-studio-line pt-6 font-studio-mono text-xs leading-5 text-studio-muted">
          <p>{content.copyright}</p>
          <a href="#top" className="inline-flex min-h-11 items-center hover:text-studio-text">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
