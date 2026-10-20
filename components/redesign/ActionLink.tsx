import Link from "next/link";
import type { ReactNode } from "react";

export default function ActionLink({
  href,
  children,
  prominent = false,
}: {
  href: string;
  children: ReactNode;
  prominent?: boolean;
}) {
  return (
    <Link
      data-motion-hover="action"
      href={href}
      className={
        prominent
          ? "inline-flex min-h-14 items-center justify-center gap-6 bg-studio-orange px-6 py-4 text-lg font-medium text-studio-bg transition-colors hover:bg-studio-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-text"
          : "inline-flex min-h-11 items-center gap-3 font-studio-mono text-label uppercase underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-orange"
      }
    >
      {children}
      <span data-motion-arrow="" aria-hidden="true">↗</span>
    </Link>
  );
}
