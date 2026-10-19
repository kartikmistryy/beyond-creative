import Image from "next/image";

export default function BrandLogo({ large = false }: { large?: boolean }) {
  return (
    <Image
      src="/images/beyond-logo.png"
      alt="Beyond Creative"
      width={764}
      height={192}
      className={large ? "h-auto w-72" : "h-auto w-40 md:w-48"}
      loading={large ? "lazy" : "eager"}
      fetchPriority={large ? "auto" : "high"}
    />
  );
}
