"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import MotionScene from "./MotionScene";

export default function SiteMotion({ children }: { children: ReactNode }) {
  return <MotionScene key={usePathname()}>{children}</MotionScene>;
}
