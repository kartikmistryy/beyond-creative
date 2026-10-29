import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  solid: "bg-studio-orange text-black hover:bg-white",
  outline: "border border-white text-white hover:bg-white hover:text-black",
  dark: "bg-black text-white hover:bg-white hover:text-black",
};

export default function PillLink({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
}) {
  return (
    <Link
      data-motion-hover="action"
      href={href}
      className={`inline-flex min-h-11 items-center gap-3.5 self-start rounded-full px-6.5 py-3.5 font-body text-label leading-4 tracking-wide uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${variants[variant]}`}
    >
      {children}
      <span aria-hidden="true" data-motion-arrow="right" className="text-lg leading-5.5">
        ⟶
      </span>
    </Link>
  );
}
