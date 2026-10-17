"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { INTRO_RANGE, nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

const LOGO_W = 160;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Fixed header. On the home page it starts as a centred grey card over the reel;
 * scrolling grows the card to full screen while the wordmark shrinks into the header slot.
 * Text colour follows the section underneath ([data-theme="dark" | "blue"]).
 */
export function Header({ count }: { count: number }) {
  const path = usePathname();
  const home = path === "/";
  const card = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLAnchorElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vw = innerWidth, vh = innerHeight, y = scrollY;
      const mobile = vw < 768;
      const p = home ? Math.min(1, y / INTRO_RANGE) : 1; // linear, so the card tracks the scrollbar 1:1

      const w0 = mobile ? vw - 32 : Math.min(vw * 0.524, 1000);
      const h0 = mobile ? vh * 0.6 : vh * 0.54;
      const w = lerp(w0, vw, p), h = lerp(h0, vh, p);
      const x = (vw - w) / 2, top = (vh - h) / 2;
      const c = card.current!.style;
      c.left = `${x}px`; c.top = `${top}px`; c.width = `${w}px`; c.height = `${h}px`;
      const reel = document.getElementById("reel");
      if (reel) reel.style.visibility = p >= 1 ? "hidden" : "visible";
      c.setProperty("--np", `${lerp(home ? 24 : 120, 120, p)}px`);
      bg.current!.style.opacity = home ? String(1 - Math.min(1, Math.max(0, (y - INTRO_RANGE) / 60))) : "0";

      // logo: big at the card's bottom-left -> 160px at top centre
      const pad = mobile ? 16 : 40;
      const bigW = w0 - pad * 2;
      const el = logo.current!;
      el.style.width = `${home ? bigW : LOGO_W}px`;
      if (home) {
        const s = lerp(1, LOGO_W / bigW, p);
        const lh = el.offsetHeight;
        const fromX = pad, fromY = h0 - pad - lh; // relative to card
        const toX = (vw - LOGO_W) / 2 - x, toY = 22 - top;
        el.style.transform = `translate(${lerp(fromX, toX, p)}px, ${lerp(fromY, toY, p)}px) scale(${s})`;
      } else {
        el.style.transform = `translate(${(vw - LOGO_W) / 2 - x}px, 22px)`;
      }
      if (strip.current) {
        strip.current.style.opacity = String(Math.max(0, 1 - p * 3));
        strip.current.style.transform = `translateY(${p * 30}px)`;
      }

      // colour from the section under the header
      const t = home && y < INTRO_RANGE + 30
        ? "light"
        : (document.elementsFromPoint(vw / 2, 44).find((n) => n.closest("[data-theme]"))?.closest("[data-theme]") as HTMLElement | undefined)?.dataset.theme ?? "light";
      setTheme(t);
    };
    const req = () => (raf ||= requestAnimationFrame(update));
    update();
    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", req);
    return () => (removeEventListener("scroll", req), removeEventListener("resize", req), cancelAnimationFrame(raf));
  }, [home]);

  const color = open ? "text-blue" : theme === "light" ? "text-blue" : "text-white";
  const navItem = (n: (typeof nav)[number]) => (
    <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined} className="link relative">
      {n.label}
      {n.href === "/projects" && <sup className="absolute -right-3.5 -top-1 text-[11px]">{count}</sup>}
    </Link>
  );

  return (
    <>
      <div ref={card} className={`pointer-events-none fixed z-50 ${color} transition-colors duration-300`} style={{ left: 0, top: 0, width: "100%", height: "100%" }}>
        <div ref={bg} className="absolute inset-0 bg-paper" style={{ opacity: home ? 1 : 0 }} />
        <nav className="t-3 pointer-events-auto relative hidden items-start px-10 pt-[30px] md:flex">
          <div className="flex w-1/2 justify-between gap-4 pr-[var(--np)]">{nav.slice(0, 3).map(navItem)}</div>
          <div className="flex w-1/2 justify-between gap-4 pl-[var(--np)]">{nav.slice(3).map(navItem)}</div>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu"
          className="t-3 pointer-events-auto absolute right-4 top-6 md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
        <Link ref={logo} href="/" aria-label="Beyond Creative — home" className="pointer-events-auto absolute left-0 top-0 origin-top-left will-change-transform">
          <Wordmark />
        </Link>
        {home && (
          <div ref={strip} className="absolute inset-x-0 top-full h-[30px] overflow-hidden bg-blue">
            <div className="marquee t-s h-full items-center text-paper-d [--speed:14s]">
              {[0, 1].map((k) => (
                <span key={k} className="flex">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className="px-3">scroll down <span className="pl-3">·</span></span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* mobile menu */}
      <div id="menu" hidden={!open} className="fixed inset-0 z-[60] flex flex-col justify-end bg-paper px-4 pb-10 text-blue md:hidden">
        <button onClick={() => setOpen(false)} className="t-3 absolute right-4 top-6">Close</button>
        <ul className="space-y-2">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={() => setOpen(false)} className="t-xl block">{n.label}</Link>
            </li>
          ))}
        </ul>
        <a href={`mailto:${site.email}`} className="t-3 mt-10">{site.email}</a>
      </div>
    </>
  );
}
