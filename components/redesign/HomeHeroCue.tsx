// Two identical halves, so the marquee's shift by half its width loops without a seam.
const items = Array.from({ length: 24 }, (_, index) => index);

/** Black ticker along the foot of the hero box, prompting a scroll. Fades out as the box opens. */
export default function HomeHeroCue({ text }: { text: string }) {
  return (
    <div data-home-cue="" aria-hidden="true" className="absolute inset-x-0 bottom-0 overflow-hidden bg-black py-1.5 text-sm text-white motion-reduce:hidden">
      <div className="flex w-max animate-marquee">
        {items.map((index) => (
          <span key={index} className="flex gap-4 px-2">
            {text}
            <span className="text-studio-orange">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
