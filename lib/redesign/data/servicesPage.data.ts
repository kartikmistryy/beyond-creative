// Approved Paper copy. Project descriptions and contact details remain preview content.
const servicesPage = {
  hero: {
    label: "OUR SERVICES / CREATIVE, MARKETING & AI",
    title: ["Good ideas.", "Built to work."],
    intro: "Seven specialist-led services. From how your brand looks and sounds to how your business runs.",
    anchor: "all-services",
    anchorLabel: "Explore the services",
  },
  label: "01—07 / OUR SERVICES",
  title: "Creative, marketing\nand automation.",
  faq: {
    label: "WORKING TOGETHER",
    title: "Before\nwe begin.",
    items: [
      {
        question: "How quickly can projects be delivered?",
        answer:
          "Timelines depend on scope. We’ll agree a clear schedule during discovery, whether you need a brand identity or an ongoing content retainer.",
      },
      {
        question: "What’s included in a project?",
        answer:
          "Direct access to the person leading your account, a clear process from discovery through launch, and transparent reporting.",
      },
      {
        question: "Are invoices and contracts included?",
        answer:
          "Yes. Every project includes a proper tax invoice and a clear agreement, so both sides know what’s included.",
      },
    ],
  },
} as const;

export default servicesPage;
