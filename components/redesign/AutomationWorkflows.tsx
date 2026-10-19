import type automation from "@/lib/redesign/data/automation.data";
import SectionLabel from "./SectionLabel";

export default function AutomationWorkflows({ content }: { content: typeof automation.workflows }) {
  return (
    <section className="border-t border-studio-line px-gutter py-section">
      <div className="mx-auto max-w-studio space-y-16">
        <SectionLabel>{content.label}</SectionLabel>
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-18">
          <h2 className="text-section-title tracking-display">
            <span className="block">{content.title[0]}</span>{" "}
            <span className="block text-studio-orange">{content.title[1]}</span>
          </h2>
          <p className="text-xl leading-8 text-studio-muted md:text-2xl">{content.body}</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
          {content.items.map((item) => (
            <div key={item.title} className="space-y-5 border-t border-studio-line pt-6">
              <h3 className="text-3xl leading-9 tracking-tight">{item.title}</h3>
              <p className="text-xl leading-7 text-studio-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
