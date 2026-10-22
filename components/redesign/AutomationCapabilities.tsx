import type automation from "@/lib/redesign/data/automation.data";
import Lines from "./Lines";
import SectionLabel from "./SectionLabel";

export default function AutomationCapabilities({ content }: { content: typeof automation.capabilities }) {
  return (
    <section className="border-t border-studio-line px-gutter py-section">
      <div className="mx-auto max-w-studio space-y-14">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-18">
          <SectionLabel>{content.label}</SectionLabel>
          <div className="space-y-7 lg:col-span-2">
            <h2 className="text-heading tracking-heading">
            <Lines text={content.title} />
          </h2>
            <p className="max-w-reading text-xl leading-8 tracking-tight text-studio-muted md:text-2xl">
              {content.body}
            </p>
          </div>
        </div>
        <ol>
          {content.rows.map((row, index) => (
            <li
              data-motion="row"
              key={row.title}
              className="grid gap-6 border-t border-studio-line py-8 md:grid-cols-12 md:gap-10 lg:gap-18"
            >
              <span className="font-studio-mono text-label text-studio-muted md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-3xl leading-tight tracking-heading md:col-span-4 lg:text-4xl">
                {row.title}
              </h3>
              <p className="text-lg leading-8 text-studio-muted md:col-span-7 lg:text-copy">{row.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
