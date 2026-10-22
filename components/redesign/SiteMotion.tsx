"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import useSmoothScroll from "@/lib/redesign/useSmoothScroll";
import MotionScene from "./MotionScene";

export default function SiteMotion({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return <MotionScene key={usePathname()}>{children}</MotionScene>;
}
