// Approved Paper copy. Project descriptions and contact details remain preview content.
const servicesPage = {
  hero: {
    label: "Services",
    reel: "Artwork for each of our services",
    title: ["Good ideas.", "Built to work."],
    intro: "Seven specialist-led services. From how your brand looks and sounds to how your business runs.",
  },
  index: {
    label: "What we do",
    title: "Creative, marketing\nand automation.",
    // Only AI Business Automation has a CTA in the approved design.
    ctas: {
      "ai-business-automation": { label: "Try the AI receptionist", href: "/services/ai-business-automation" },
    } as Partial<Record<string, { label: string; href: string }>>,
  },
  faq: {
    index: "03",
    label: "Working together",
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
      {
        question: "Can I book just one service?",
        answer:
          "The scope is built around the services you need. Tell us whether you have a specific task in mind or need help deciding where to start, and we’ll discuss the most useful approach.",
      },
      {
        question: "What is the difference between SEO and AI automation?",
        answer:
          "SEO and AI search visibility help people find your business. AI automation supports the work inside it, such as answering calls, qualifying enquiries and handling repetitive workflows.",
      },
      {
        question: "What should I bring to a discovery call?",
        answer:
          "A short overview of your business, your goals and any existing brand, website or campaign material is a useful start. Share any deadlines and budget considerations so the proposed scope reflects what you need.",
      },
    ],
  },
} as const;

export default servicesPage;
