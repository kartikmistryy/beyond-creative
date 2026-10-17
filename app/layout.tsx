import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const grotesk = Inter_Tight({ variable: "--font-grotesk", subsets: ["latin"], weight: "variable" });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", style: "italic" });

export const metadata: Metadata = {
  title: { default: `${site.name} — Film, Brand & AI Studio`, template: `%s — ${site.name}` },
  description: "Beyond Creative is a studio for film, brand, digital and AI automation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${grotesk.variable} ${serif.variable}`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
