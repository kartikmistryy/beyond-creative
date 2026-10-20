import ActionLink from "./ActionLink";
import SectionLabel from "./SectionLabel";

type Props = { label: string; title: readonly string[]; intro: string; anchor: string; anchorLabel: string };

export default function PageHero({ label, title, intro, anchor, anchorLabel }: Props) {
  return (
    <section className="px-gutter pb-16 pt-36 lg:pb-8 lg:pt-page-top">
      <div className="mx-auto flex max-w-studio flex-col gap-10 lg:gap-13">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="text-display tracking-display">
          <span className="block">{title[0]}</span>{" "}
          <span className="block text-studio-orange">{title[1]}</span>
        </h1>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <a
            href={`#${anchor}`}
            className="inline-flex min-h-11 items-center font-studio-mono text-label uppercase hover:text-studio-orange"
          >
            {anchorLabel} ↓
          </a>
          <div data-motion="rise" className="max-w-lg space-y-6 lg:pb-6">
            <p className="text-xl leading-8 tracking-tight text-studio-muted md:text-2xl">{intro}</p>
            <ActionLink href="/contact">Book a discovery call</ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
