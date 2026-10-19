import type { Metadata } from "next";
import content from "@/lib/redesign/data/contact.data";
import metadataContent from "@/lib/redesign/data/metadata.data";
import ContactDetails from "@/components/redesign/ContactDetails";

export const metadata: Metadata = {
  title: { absolute: metadataContent.contact.title },
  description: metadataContent.contact.description,
};

export default function ContactPage() {
  return <ContactDetails content={content} />;
}
