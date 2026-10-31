import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Inter_Tight, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400", display: "swap" });
const grotesk = Inter_Tight({ variable: "--font-grotesk", subsets: ["latin"], weight: "variable" });
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});
const sans = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: `${site.name} | Melbourne Creative & AI Agency`, template: `%s | ${site.name}` },
  description:
    "Founder-led creative, content, performance marketing and AI business automation in Melbourne.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${grotesk.variable} ${serif.variable} ${sans.variable} ${mono.variable} bg-studio-bg!`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
