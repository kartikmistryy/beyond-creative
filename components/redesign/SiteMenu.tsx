"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import footer from "@/lib/redesign/data/footer.data";
import { fadeMotion, itemMotion, panelMotion } from "@/lib/redesign/data/menu.data";
import BrandLogo from "./BrandLogo";
import PillLink from "./PillLink";
import SiteMenuLinks from "./SiteMenuLinks";

type Props = { open: boolean; onClose: () => void; onClosed: () => void };

/** Full-screen orange menu, built on a native modal <dialog> for focus trapping, Esc and an inert page. */
export default function SiteMenu({ open, onClose, onClosed }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const item = reduced ? fadeMotion : itemMotion;

  useEffect(() => {
    const element = dialog.current;
    if (!open || !element || element.open) return;
    element.showModal();
    document.documentElement.classList.add("overflow-hidden");
    element.querySelector<HTMLElement>("nav a")?.focus();
  }, [open]);

  // Page navigation remounts the header, unmounting the menu before its close animation can release the lock.
  useEffect(() => () => document.documentElement.classList.remove("overflow-hidden"), []);

  const finish = (definition: unknown) => {
    if (definition !== "closed" || !dialog.current?.open) return;
    dialog.current.close();
    document.documentElement.classList.remove("overflow-hidden");
    onClosed();
  };

  return (
    <dialog
      ref={dialog}
      id="site-menu"
      aria-label="Site menu"
      data-lenis-prevent=""
      onClick={(event) => (event.target as HTMLElement).closest("a") && onClose()}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-transparent p-0 font-body font-normal text-black backdrop:bg-transparent"
    >
      <motion.div
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={reduced ? fadeMotion : undefined}
        onAnimationComplete={reduced ? finish : undefined}
        className="relative flex min-h-full flex-col justify-between gap-12 p-7"
      >
        <motion.div
          aria-hidden="true"
          variants={reduced ? fadeMotion : panelMotion}
          onAnimationComplete={reduced ? undefined : finish}
          className="absolute inset-0 origin-top bg-studio-orange"
        />
        <motion.div variants={item} custom={0} className="relative flex h-10 items-center justify-between">
          <span className="brightness-0">
            <BrandLogo />
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 min-w-11 px-1 text-base leading-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Close
          </button>
        </motion.div>
        <div className="relative flex flex-col items-end gap-8 lg:flex-row-reverse lg:items-end lg:justify-between lg:gap-12">
          <SiteMenuLinks pathname={pathname} variants={item} />
          <motion.div variants={item} custom={6} className="flex flex-col items-end gap-2 lg:flex-row lg:items-center lg:gap-7">
            <ul className="flex gap-6 lg:gap-7">
              {footer.socials.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="inline-flex min-h-11 items-center text-base leading-5 hover:underline focus-visible:outline-2 focus-visible:outline-black">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <PillLink href="/contact" variant="dark">
              {footer.action}
            </PillLink>
          </motion.div>
        </div>
      </motion.div>
    </dialog>
  );
}
