import SectionLabel from "./SectionLabel";

type Props = {
  label: string;
  title: string | readonly string[];
  intro?: string;
  items: readonly { question: string; answer: string }[];
};

export default function FaqSection({ label, title, intro, items }: Props) {
  return (
    <section
      className="border-t border-studio-line px-gutter py-section"
      aria-label="Frequently asked questions"
    >
      <div className="mx-auto grid max-w-studio gap-12 lg:grid-cols-3 lg:gap-18">
        <div className="space-y-7">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="whitespace-pre-line text-heading tracking-heading">
            {typeof title === "string" ? title : title.join("\n")}
          </h2>
          {intro && <p className="max-w-sm text-xl leading-7 text-studio-muted">{intro}</p>}
        </div>
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div data-motion="row" key={item.question} className="space-y-4 border-t border-studio-line py-7">
              <h3 className="text-2xl leading-8 tracking-tight md:text-3xl">{item.question}</h3>
              <p className="max-w-4xl text-lg leading-7 text-studio-muted md:text-xl">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
