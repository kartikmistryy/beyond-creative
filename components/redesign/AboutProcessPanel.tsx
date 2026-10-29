import Lines from "./Lines";

type Props = {
  step: { title: string; body: string };
  index: number;
  count: number;
  open: boolean;
  onSelect: () => void;
};

const pad = (value: number) => String(value).padStart(2, "0");

/** One "How we work" step: a strip button when closed, the orange panel when open, an accordion row below lg. */
export default function AboutProcessPanel({ step, index, count, open, onSelect }: Props) {
  const id = `about-step-${index + 1}`;
  const stripTitle = `transition-opacity duration-300 motion-reduce:transition-none ${open ? "lg:opacity-0" : ""}`;
  return (
    <li
      className={`relative overflow-hidden border-t border-rule transition-all duration-600 ease-spring motion-reduce:transition-none lg:basis-37.5 lg:shrink-0 lg:border-t-0 lg:border-l lg:first:border-l-0 ${
        open ? "bg-studio-orange text-black lg:grow" : "text-white lg:grow-0"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onSelect}
        className="flex min-h-11 w-full cursor-pointer items-baseline gap-5 px-6 py-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white lg:absolute lg:inset-0 lg:flex-col lg:py-8"
      >
        <span className="block font-display text-5xl lg:text-7xl lg:leading-16.5">{pad(index + 1)}</span>
        <span
          className={`block font-display text-3xl whitespace-nowrap uppercase lg:absolute lg:bottom-8 lg:left-6 lg:origin-top-left lg:translate-y-full lg:-rotate-90 lg:text-about-strip ${stripTitle}`}
        >
          {step.title.replace("\n", " ")}
        </span>
      </button>
      <div
        id={id}
        className={`px-6 pb-8 transition-all duration-300 motion-reduce:transition-none lg:pointer-events-none lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-between lg:px-6 lg:py-8 ${
          open ? "visible opacity-100 lg:delay-300" : "invisible opacity-0 max-lg:hidden"
        }`}
      >
        <div aria-hidden="true" className="flex justify-end max-lg:hidden">
          <span className="font-studio-mono text-label leading-4">
            {pad(index + 1)} / {pad(count)}
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-display text-about-step-title uppercase max-lg:hidden">
            <Lines text={step.title} />
          </h3>
          <p className="text-xl lg:max-w-115">{step.body}</p>
        </div>
      </div>
    </li>
  );
}
