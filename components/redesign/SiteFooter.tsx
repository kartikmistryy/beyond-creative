"use client";

import { usePathname } from "next/navigation";
import getFooterContent from "@/lib/redesign/getFooterContent";
import FooterNav from "./FooterNav";
import FooterStar from "./FooterStar";
import FooterWordmark from "./FooterWordmark";
import PillLink from "./PillLink";

export default function SiteFooter() {
  const content = getFooterContent(usePathname());
  return (
    <footer className={`overflow-hidden bg-black font-body font-normal text-white ${content.voiceAgent ? "pb-24" : ""}`}>
      <div className="flex flex-col gap-16 px-7 pt-20 pb-16 lg:flex-row lg:justify-between lg:pt-28 lg:pb-24">
        <div className="flex max-w-xl flex-col gap-8">
          <FooterStar />
          <h2 className="text-5xl leading-none font-light tracking-tighter lg:text-7xl">
            <span className="block">{content.title[0]}</span>
            <span className="block">{content.title[1]}</span>
          </h2>
          <p className="max-w-100 text-base leading-6 text-ash">{content.body}</p>
          {content.showAction && (
            <div>
              <PillLink href="/contact">{content.action}</PillLink>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-8 lg:items-end lg:self-end">
          <ul aria-label="Social links" className="flex items-center gap-8 text-2xl font-light tracking-tight lg:text-3xl">
            {content.socials.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group inline-flex min-h-11 items-center gap-2 transition-colors duration-300 hover:text-studio-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-studio-orange transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <FooterNav />
        </div>
      </div>
      <FooterWordmark text={content.wordmark} video={content.wordmarkVideo} poster={content.wordmarkPoster} />
      <p className="px-7 pt-2 pb-6 text-label text-ash">{content.copyright}</p>
    </footer>
  );
}
