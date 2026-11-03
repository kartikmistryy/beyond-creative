import footer from "./data/footer.data";
import contact from "./data/contact.data";
import navigation from "./data/navigation.data";
import services from "./data/services.data";

export default function getFooterContent() {
  const email = contact.details.find((detail) => detail.label === "Email");
  const phone = contact.details.find((detail) => detail.label === "Phone");
  const studio = contact.details.find((detail) => detail.label === "Studio");
  return {
    ...footer,
    email,
    phone,
    address: [footer.company, studio?.value].filter(Boolean),
    columns: [
      { heading: footer.headings.company, links: navigation, external: false },
      {
        heading: footer.headings.services,
        links: services.map((service) => ({ label: service.title.replace("\n", " "), href: service.href })),
        external: false,
      },
      { heading: footer.headings.socials, links: footer.socials, external: true },
    ],
  };
}
