// Approved Paper copy. Project descriptions and contact details remain preview content.
const about = {
  hero: {
    label: "About us",
    reel: "Stills from our client projects",
    title: ["Good people.", "Great work."],
    intro: "Creative direction, specialist craft and a direct line to the person leading your project.",
  },
  story: {
    label: "Who we are",
    title: "Every discipline should be led by someone who’s actually good at it.",
    paragraphs: [
      "Beyond Creative is a Melbourne studio bringing creative direction, content, performance marketing and AI systems together.",
      "We’re founder-led and specialist-backed, with a curated bench of freelance experts and an in-house editor. The right people, brought in for the right work.",
    ],
  },
  founder: {
    label: "The people behind the work",
    name: "Rishabh",
    role: "Founder & Creative Director",
    title: "One point of contact.\nA team built for your brief.",
    paragraphs: [
      "Rishabh leads every client relationship directly and sets the creative and strategic direction.",
      "Our in-house editor and freelance specialists bring the craft \u2014 across branding, content, web, performance and AI. You work with the person steering your account, from the first conversation onwards.",
    ],
    image: "/images/paper/27H9AP0AYEN620Y4HX90SQCCAC.webp",
    alt: "Temporary engraved avatar; Rishabh’s portrait will replace it",
  },
  capabilities: {
    label: "What we bring",
    title: "Different disciplines.\nOne standard.",
    body: "From how your brand looks and sounds to how your business runs.",
    action: "All services",
  },
  process: {
    label: "How we work",
    title: "A clear process.\nRoom for good ideas.",
    steps: [
      {
        title: "Discover\n& Define",
        body: "We learn your business, audience and goals, then define success together.",
      },
      {
        title: "Plan\n& Align",
        body: "We agree the strategy, scope and priorities, then map out the work ahead.",
      },
      {
        title: "Create\n& Build",
        body: "Our specialists create the brands, content, campaigns or AI systems in your plan.",
      },
      {
        title: "Launch\n& Refine",
        body: "We launch, track results and refine the work based on what we learn.",
      },
      {
        title: "Report\n& Grow",
        body: "We share clear results, identify what’s working and plan the next move.",
      },
    ],
  },
  faq: {
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
        question: "Who will I work with directly?",
        answer:
          "Rishabh, our founder and creative director, leads client relationships and sets the creative and strategic direction. You have a direct line to the person steering your project.",
      },
      {
        question: "How is your team put together?",
        answer:
          "Beyond Creative combines an in-house editor with a network of freelance specialists. The team is shaped around the disciplines your project needs, rather than using the same setup for every brief.",
      },
      {
        question: "Do you only work with Melbourne businesses?",
        answer:
          "We’re based in Melbourne and work with businesses across Australia. If a project needs an on-location shoot or an in-person session, we can discuss the practical requirements when defining the scope.",
      },
    ],
  },
} as const;

export default about;
