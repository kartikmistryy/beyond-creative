import type automation from "@/lib/redesign/data/automation.data";
import Eyebrow from "./Eyebrow";

export default function AutomationWorkflows({ content }: { content: typeof automation.workflows }) {
  return (
    <section className="flex flex-col gap-20 border-t border-rule bg-black px-7 py-35 font-body font-normal text-white">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-5">
          <Eyebrow index="04">{content.label}</Eyebrow>
          <h2 className="font-display text-automation-display text-studio-orange uppercase">
            <span className="block">{content.title[0]}</span>{" "}
            <span className="block md:pl-35">{content.title[1]}</span>
          </h2>
        </div>
        <p data-motion="rise" className="text-lg leading-6.5 text-ash lg:w-95 lg:shrink-0">
          {content.body}
        </p>
      </div>
      <ul className="flex flex-col gap-10 md:flex-row md:gap-3">
        {content.items.map((item) => (
          <li data-motion="rise" key={item.title} className="flex flex-1 flex-col gap-4 border-t border-white pt-6">
            <span aria-hidden="true" className="text-xl leading-6 text-studio-orange">
              +
            </span>
            <h3 className="text-question">{item.title}</h3>
            <p className="text-lg leading-6.5 text-ash">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
