import Image from "next/image";

type Props = { src: string };

/**
 * An open service row's artwork: stacked under the text on phones, pinned to the row's right edge
 * from lg up. Out of flow there, so while it folds shut it never squeezes the row's title.
 */
export default function ServicesAccordionImage({ src }: Props) {
  return (
    <div data-part="art" className="grid overflow-hidden lg:absolute lg:top-7 lg:right-17 lg:w-130">
      <div className="min-h-0">
        <div className="pb-10 lg:pb-0">
          <div className="relative aspect-services-image w-full overflow-hidden">
            <Image src={src} alt="" fill sizes="(max-width: 1024px) 100vw, 520px" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
