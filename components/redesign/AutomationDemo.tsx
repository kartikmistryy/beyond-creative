import type automation from "@/lib/redesign/data/automation.data";
import BotStage from "./BotStage";
import Eyebrow from "./Eyebrow";
import Lines from "./Lines";

// ponytail: bg-stone-100 / text-orange-700 stand in for Paper's #F4F1EC / #C42A00 until colour tokens exist.
export default function AutomationDemo({ content }: { content: typeof automation.demo }) {
  return (
    <section className="flex flex-col justify-between gap-20 bg-stone-100 px-7 py-35 font-body font-normal text-black lg:flex-row">
      <div className="flex flex-col gap-10 lg:w-160 lg:shrink-0">
        <div className="*:text-black">
          <Eyebrow index="02">{content.label}</Eyebrow>
        </div>
        <h2 className="font-display text-automation-title text-orange-700 uppercase">
          <Lines text={content.title} />
        </h2>
        <p data-motion="rise" className="max-w-130 text-lg leading-6.5">
          {content.body}
        </p>
        <ol data-motion="stagger" className="border-t border-black/20">
          {content.steps.map((step, index) => (
            <li key={step} className="flex gap-5 border-b border-black/20 py-4 text-lg leading-6">
              <span className="w-10 shrink-0 text-orange-700">{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <BotStage questions={content.questions} />
    </section>
  );
}
