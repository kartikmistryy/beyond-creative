import Link from "next/link";
import navigation from "@/lib/redesign/data/navigation.data";

export default function FooterNav() {
  return (
    <nav aria-label="Footer navigation" className="lg:max-w-2xl lg:self-end">
      <ul className="flex flex-wrap gap-x-4 lg:justify-end lg:gap-x-5">
        {navigation.map((link, index) => (
          <li key={link.href} className="flex font-display text-5xl leading-none uppercase lg:text-7xl">
            <Link
              href={link.href}
              className="group relative inline-flex min-h-11 items-center transition-colors duration-300 hover:text-studio-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {link.label}
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-studio-orange transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none" />
            </Link>
            <span aria-hidden="true" className="text-studio-orange">
              {index < navigation.length - 1 ? "," : "."}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
