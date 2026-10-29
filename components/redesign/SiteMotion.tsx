"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import useSmoothScroll from "@/lib/redesign/useSmoothScroll";
import MotionScene from "./MotionScene";

export default function SiteMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useSmoothScroll(pathname);
  return <MotionScene key={pathname}>{children}</MotionScene>;
}
