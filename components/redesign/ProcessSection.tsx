import SectionLabel from "./SectionLabel";

type Props = { label: string; title: string; steps: readonly { title: string; body: string }[] };

export default function ProcessSection({ label, title, steps }: Props) {
  return (
    <section className="border-t border-studio-line px-gutter py-section">
      <div className="mx-auto max-w-studio space-y-16">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-18">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="whitespace-pre-line text-heading tracking-heading lg:col-span-2">{title}</h2>
        </div>
        <ol
          className={`grid gap-10 sm:grid-cols-2 ${steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}
        >
          {steps.map((step, index) => (
            <li data-motion="rise" key={step.title} className="space-y-6">
              <p className="font-studio-mono text-label text-studio-orange">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="whitespace-pre-line text-3xl leading-9 tracking-tight">{step.title}</h3>
              <p className="text-lg leading-7 text-studio-muted lg:text-xl">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
