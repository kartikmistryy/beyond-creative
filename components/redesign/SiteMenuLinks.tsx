import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import navigation from "@/lib/redesign/data/navigation.data";

type Props = { pathname: string; variants: Variants };

export default function SiteMenuLinks({ pathname, variants }: Props) {
  return (
    <nav aria-label="Main">
      <ol className="flex flex-col items-end gap-1.5 lg:gap-1">
        {navigation.map((link, index) => {
          const current = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <motion.li key={link.href} variants={variants} custom={index + 1}>
              <Link
                href={link.href}
                aria-current={current ? "page" : undefined}
                className="group flex items-start gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black lg:gap-3"
              >
                <span className="pt-1.5 text-xs leading-3.5 lg:pt-3 lg:text-label lg:leading-4">
                  ({String(index + 1).padStart(2, "0")})
                </span>
                <span
                  className={`relative font-display text-menu uppercase transition-transform duration-300 group-hover:-translate-x-4 group-focus-visible:-translate-x-4 lg:text-menu-lg ${current ? "text-white" : "text-black"}`}
                >
                  <span aria-hidden="true" className="absolute top-1/2 right-full -translate-y-1/2 pr-3 font-body text-4xl leading-none opacity-0 lg:text-6xl transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    ⟶
                  </span>
                  {link.label}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}
