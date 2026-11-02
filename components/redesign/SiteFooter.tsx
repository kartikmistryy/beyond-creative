"use client";

import { usePathname } from "next/navigation";
import getFooterContent from "@/lib/redesign/getFooterContent";
import useFooterFlag from "@/lib/redesign/useFooterFlag";
import FooterColumn from "./FooterColumn";

const linkClass =
  "underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Orange closing panel. On large screens it sits pinned behind the page and is uncovered as the content scrolls away. */
export default function SiteFooter() {
  const content = getFooterContent(usePathname());
  useFooterFlag();
  return (
    <footer
      className={`flex flex-col justify-between gap-20 bg-studio-orange px-7 pt-14 font-body font-normal text-white lg:sticky lg:bottom-0 lg:min-h-svh lg:gap-24 ${content.voiceAgent ? "pb-28" : "pb-8"}`}
    >
      {content.email && (
        <a
          href={content.email.href}
          className="w-fit text-3xl leading-none font-light tracking-heading break-all decoration-4 underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-5xl lg:text-7xl xl:text-8xl"
        >
          {content.email.value}
        </a>
      )}
      <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:flex lg:justify-between">
        {content.columns.map((column) => (
          <FooterColumn key={column.heading} {...column} />
        ))}
        <FooterColumn heading={content.headings.contact}>
          {content.contactDetails.map((detail) => (
            <li key={detail.label}>
              {detail.href ? (
                <a href={detail.href} className={linkClass}>
                  {detail.value}
                </a>
              ) : (
                detail.value
              )}
            </li>
          ))}
        </FooterColumn>
      </div>
      <div className="flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>{content.copyright}</p>
        <a href="#top" className={`inline-flex min-h-11 items-center gap-2 ${linkClass}`}>
          {content.backToTop}
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
