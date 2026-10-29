import Image from "next/image";

type Props = { text: string; video: string; poster: string };

/**
 * The footer wordmark filled with the showreel. A black strip with white type, multiplied over the
 * footage, keeps the footage only inside the letters. Reduced motion shows the still poster instead.
 */
export default function FooterWordmark({ text, video, poster }: Props) {
  return (
    <div aria-hidden="true" className="relative isolate overflow-hidden">
      <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 size-full object-cover motion-reduce:hidden"
      />
      <p className="relative bg-black px-5 pt-2 pb-3 font-display text-wordmark whitespace-nowrap text-white uppercase mix-blend-multiply">
        {text}
      </p>
    </div>
  );
}
