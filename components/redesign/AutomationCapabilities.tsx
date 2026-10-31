import type automation from "@/lib/redesign/data/automation.data";
import Eyebrow from "./Eyebrow";
import Lines from "./Lines";

export default function AutomationCapabilities({ content }: { content: typeof automation.capabilities }) {
  return (
    <section className="flex flex-col justify-between gap-20 bg-black px-7 pt-40 pb-35 font-body font-normal text-white lg:flex-row">
      <div className="flex flex-col gap-7 lg:w-120 lg:shrink-0">
        <Eyebrow index="03">{content.label}</Eyebrow>
        <h2 className="text-statement font-light tracking-tight">
          <Lines text={content.title} />
        </h2>
        <p data-motion="rise" className="text-lg leading-6.5 text-ash">
          {content.body}
        </p>
      </div>
      <ol className="border-t border-rule lg:w-205 lg:shrink-0">
        {content.rows.map((row, index) => (
          <li data-motion="row" key={row.title} className="flex gap-7 border-b border-rule py-7">
            <span className="w-12 shrink-0 text-label leading-8 text-studio-orange">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-2.5">
              <h3 className="text-question">{row.title}</h3>
              <p className="max-w-155 text-lg leading-6.5 text-ash">{row.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
