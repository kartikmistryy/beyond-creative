import Link from "next/link";

type Props = {
  heading: string;
  links: readonly { label: string; href: string }[];
  external?: boolean;
};

const linkClass =
  "inline-flex min-h-6 items-center underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function FooterColumn({ heading, links, external }: Props) {
  return (
    <div className="flex flex-col">
      <h2 className="mb-6 text-xl leading-none lg:text-2xl">{heading}</h2>
      <ul className="flex flex-col gap-2 text-sm break-words lg:text-base">
        {links.map((link) => (
          <li key={link.href}>
            {external ? (
              <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
