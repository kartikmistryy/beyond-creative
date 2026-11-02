import type { Metadata } from "next";
import content from "@/lib/redesign/data/contact.data";
import metadataContent from "@/lib/redesign/data/metadata.data";
import ContactHero from "@/components/redesign/ContactHero";

export const metadata: Metadata = {
  title: { absolute: metadataContent.contact.title },
  description: metadataContent.contact.description,
};

export default function ContactPage() {
  return <ContactHero content={content} />;
}
