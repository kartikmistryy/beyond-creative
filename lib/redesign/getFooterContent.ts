import footer from "./data/footer.data";
import contact from "./data/contact.data";
import navigation from "./data/navigation.data";
import services from "./data/services.data";

export default function getFooterContent(pathname: string) {
  const automationPage = pathname.includes("ai-business-automation") || pathname === "/ai-automation";
  const email = contact.details.find((detail) => detail.label === "Email");
  return {
    ...footer,
    email,
    columns: [
      { heading: footer.headings.socials, links: footer.socials, external: true },
      { heading: footer.headings.company, links: navigation, external: false },
      {
        heading: footer.headings.services,
        links: services.map((service) => ({ label: service.title.replace("\n", " "), href: service.href })),
        external: false,
      },
    ],
    contactDetails: contact.details,
    voiceAgent: automationPage,
  };
}
