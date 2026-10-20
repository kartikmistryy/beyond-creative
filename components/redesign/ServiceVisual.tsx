import Image from "next/image";

export default function ServiceVisual({
  src,
  active = false,
  thumbnail = false,
}: {
  src: string;
  active?: boolean;
  thumbnail?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${thumbnail ? "aspect-square w-28 shrink-0 md:w-45" : "h-90 w-full md:h-service-art"}`}
    >
      <Image
        data-motion-zoom=""
        src={src}
        alt=""
        fill
        sizes={thumbnail ? "180px" : "(max-width: 640px) 90vw, 445px"}
        className={`object-cover transition-all duration-300 motion-reduce:transition-none ${active ? "" : "grayscale group-hover:grayscale-0 group-focus-within:grayscale-0"}`}
      />
    </div>
  );
}
