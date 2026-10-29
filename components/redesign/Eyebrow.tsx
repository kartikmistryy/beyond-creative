import type { ReactNode } from "react";

export default function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p data-motion="fade" className="whitespace-pre font-body text-label leading-4 tracking-wide text-white uppercase">
      {index ? `( ${index}.    ` : "(    "}
      {children}
      {"    )"}
    </p>
  );
}
