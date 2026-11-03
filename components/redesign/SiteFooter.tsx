"use client";

import getFooterContent from "@/lib/redesign/getFooterContent";
import useFooterFlag from "@/lib/redesign/useFooterFlag";
import FooterColumn from "./FooterColumn";

const linkClass =
  "underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const bigLinkClass =
  "w-fit text-3xl leading-none font-light tracking-heading break-all decoration-4 underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-4xl md:text-5xl lg:text-7xl";
// Ink bounds of the wordmark set in Anton at 100px, so the SVG spans edge to edge with no side bearing or descender gap.
const wordmarkViewBox = "3.81 -86.72 632.96 87.5";

/** Orange closing panel: contact lines, link columns, then the edge-to-edge wordmark. */
export default function SiteFooter() {
  const content = getFooterContent();
  useFooterFlag();
  return (
    <footer
      className="flex flex-col gap-20 bg-studio-orange px-7 pt-10 font-body font-normal text-white lg:sticky lg:bottom-0 lg:gap-16"
    >
      <div className="flex flex-col gap-12 lg:gap-6">
        <div className="flex flex-col gap-4">
          {content.phone && (
            <a href={content.phone.href} className={bigLinkClass}>
              {content.phone.value}
            </a>
          )}
          {content.email && (
            <a href={content.email.href} className={bigLinkClass}>
              {content.email.value}
            </a>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 text-base leading-6 lg:grid-cols-6 lg:text-lg lg:leading-7">
          <div className="col-span-2 lg:col-span-3">
            <h2 className="mb-3 font-semibold">{content.headings.address}</h2>
            <address className="not-italic">
              {content.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-x-5 gap-y-10 sm:flex sm:justify-between sm:gap-x-8 sm:pr-6 lg:col-span-3">
            {content.columns.map((column) => (
              <FooterColumn key={column.heading} {...column} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{content.copyright}</p>
          <a
            href="#top"
            aria-label={content.backToTop}
            className="inline-flex size-11 items-center justify-center rounded-full bg-black text-xl leading-none text-white transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          >
            <span aria-hidden="true">↑</span>
          </a>
        </div>
        <svg aria-hidden="true" viewBox={wordmarkViewBox} className="-mx-7 block fill-white">
          <text fontSize="100" className="font-display uppercase">
            {content.wordmark}
          </text>
        </svg>
      </div>
    </footer>
  );
}
