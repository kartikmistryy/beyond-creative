"use client";

import Link from "next/link";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import navigation from "@/lib/redesign/data/navigation.data";
import animation from "@/lib/redesign/data/motion.data";

export default function MobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-mobile-menu"
            aria-label="Main menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: animation.ease }}
            className="absolute inset-x-0 top-20 flex flex-col border-b border-studio-line bg-studio-bg px-gutter py-6 md:hidden"
          >
            {navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                className={`border-t border-studio-line py-4 text-2xl hover:text-studio-orange ${pathname.startsWith(link.href) ? "text-studio-orange" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
