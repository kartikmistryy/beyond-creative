import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="font-studio-mono text-label font-normal uppercase text-studio-muted">{children}</p>;
}
