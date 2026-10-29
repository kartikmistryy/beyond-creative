import Eyebrow from "./Eyebrow";
import Lines from "./Lines";

type Step = { title: string; body: string };
type Props = { label: string; title: string; steps: readonly Step[] };

// Each step is 120px taller than the last (compressed on short screens) and fills in its own colour.
const tones = [
  { fill: "bg-ember", ink: "text-white", body: "text-ash", height: "lg:h-stair-1" },
  { fill: "bg-white", ink: "text-black", body: "text-black/75", height: "lg:h-stair-2" },
  { fill: "bg-orange-light", ink: "text-black", body: "text-black/80", height: "lg:h-stair-3" },
  { fill: "bg-studio-orange", ink: "text-black", body: "text-black", height: "lg:h-stair-4" },
];

function renderCopy(step: Step, index: number, body: string) {
  return (
    <>
      <span className="block font-display text-8xl leading-22">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-7 text-question">
        <Lines text={step.title} />
      </h3>
      <p className={`mt-7 text-base leading-6 ${body}`}>{step.body}</p>
    </>
  );
}

/** Setup staircase. Server HTML is fully filled; createStackMotion fills it on scroll while the steps are pinned. */
export default function StepStack({ label, title, steps }: Props) {
  return (
    <section className="border-t border-rule bg-black px-7 py-35 font-body font-normal text-white lg:py-0">
      <div data-stair-track="">
        <div className="flex flex-col gap-16 lg:sticky lg:top-0 lg:h-svh lg:justify-center lg:gap-12">
          <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-end lg:justify-between">
            <Eyebrow index="05">{label}</Eyebrow>
            <h2 className="text-statement font-light tracking-tight">
              <Lines text={title} />
            </h2>
          </div>
          <ol className="flex flex-col lg:flex-row lg:items-end">
          {steps.map((step, index) => {
            const tone = tones[index % tones.length];
            return (
              <li
                key={step.title}
                data-stair-step=""
                className={`relative flex-1 overflow-hidden border-t border-white/20 lg:border-l lg:border-l-rule lg:first:border-l-0 ${tone.height}`}
              >
                <div data-stair-fill="" aria-hidden="true" className={`absolute inset-0 origin-bottom ${tone.fill}`} />
                <div data-stair-edge="" aria-hidden="true" className="absolute inset-0 border-t border-white opacity-0" />
                <div className="relative px-7 pt-5 pb-10">
                  <div data-stair-ink="" className={tone.ink}>
                    {renderCopy(step, index, tone.body)}
                  </div>
                  <div data-stair-ghost="" aria-hidden="true" className="absolute inset-0 px-7 pt-5 text-white opacity-0">
                    {renderCopy(step, index, "")}
                  </div>
                </div>
              </li>
            );
          })}
          </ol>
        </div>
        <div data-stair-spacer="" aria-hidden="true" className="hidden h-svh" />
      </div>
    </section>
  );
}
