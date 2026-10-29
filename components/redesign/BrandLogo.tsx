import Image from "next/image";

export default function BrandLogo() {
  return (
    <Image
      src="/images/beyond-logo.png"
      alt="Beyond Creative"
      width={764}
      height={192}
      className="h-auto w-37.5"
      loading="eager"
      fetchPriority="high"
    />
  );
}
