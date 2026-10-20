import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return <p data-motion="fade" className="font-studio-mono text-label font-normal uppercase text-studio-muted">{children}</p>;
}
