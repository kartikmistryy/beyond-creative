import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export const Arrow = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <path d="M2 11h17M12 4l7 7-7 7" />
  </svg>
);

export function Footer() {
  return (
    <footer data-theme="dark" className="bg-ink text-blue">
      {/* CTA band */}
      <div data-theme="light" className="wrap bg-paper pt-[clamp(140px,22vw,315px)] pb-[70px]">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <p data-reveal className="t-xl">
            Got an idea worth chasing?
            <br />
            <span className="hl">Let&apos;s go beyond it.</span>
          </p>
          <Link href="/contact" className="cta t-3 text-ink">
            Get in touch <Arrow />
          </Link>
        </div>
      </div>

      <div className="wrap pb-3">
        <div className="grid12 gap-y-10 py-[70px]">
          <div className="col-span-12 md:col-span-6" />
          <div className="t-1 col-span-12 flex flex-wrap gap-x-[clamp(24px,4vw,64px)] gap-y-8 md:col-span-6">
            {[nav.slice(0, 3), nav.slice(3), site.socials.slice(0, 2)].map((col, k) => (
              <ul key={k} className="space-y-2">
                {col.map((n) => {
                  const ext = n.href.startsWith("http");
                  return (
                    <li key={n.href}>
                      <a href={n.href} {...(ext ? { target: "_blank", rel: "noreferrer" } : {})} className="link inline-flex items-start gap-1 transition-colors hover:text-white">
                        {n.label}
                        {ext && <span className="text-[0.4em]">↗</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
        <Link href="/" aria-label="Beyond Creative — home" className="block transition-colors hover:text-white">
          <Wordmark />
        </Link>
        <div className="t-s mt-4 flex flex-wrap justify-between gap-4 text-blue/80">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <a href={`mailto:${site.email}`} className="link">{site.email}</a>
          <span>{site.city}</span>
        </div>
      </div>
    </footer>
  );
}
