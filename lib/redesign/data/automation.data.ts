// Approved Paper copy. Project descriptions and contact details remain preview content.
const automation = {
  hero: {
    label: "AI business automation",
    reel: "AI business automation artwork",
    title: ["Pick up.", "Even when you can’t."],
    intro:
      "Beyond Creative builds AI voice receptionists for Melbourne businesses. Answer enquiries, qualify callers and route calls while your team gets on with the work.",
  },
  demo: {
    label: "Try the AI receptionist",
    title: "Your first call.\nRight here.",
    body: "Open the voice bot in the bottom-right corner and start a conversation. Ask a question, try an enquiry and hear how our AI assistant responds. No form or sign-up.",
    steps: [
      "Open the voice bot",
      "Allow your microphone when prompted",
      "Start talking and see how it responds",
    ],
    questions: [
      "What are your opening hours?",
      "Can I book an appointment for Tuesday?",
      "How do I get a quote?",
      "Where are you located?",
    ],
  },
  capabilities: {
    label: "What it handles",
    title: "What can an AI\nreceptionist do?",
    body: "An AI receptionist is a voice agent that answers business calls, asks relevant questions and directs the enquiry. Beyond Creative configures it around your services, your callers and the handovers your team needs.",
    rows: [
      {
        title: "Answer the enquiry",
        body: "Give callers a first response when your team is busy. The agent uses your business information to handle the questions you’ve agreed it should answer.",
      },
      {
        title: "Ask the right questions",
        body: "Capture who’s calling, what they need and the details your team needs to respond. The questions are configured around your business.",
      },
      {
        title: "Route the next step",
        body: "Direct the enquiry to the appropriate person or capture a message. Booking and handover options are agreed as part of your setup.",
      },
      {
        title: "Keep your team in the loop",
        body: "Pass on call summaries and contact details so your team can follow up with context, rather than start the conversation again.",
      },
    ],
  },
  workflows: {
    label: "Workflow automation",
    title: ["Beyond", "the phone."],
    body: "AI business automation also covers the work around an enquiry. We build custom workflows and customer service automations around the tasks your team repeats, then monitor and refine them as your needs change.",
    items: [
      {
        title: "Workflows that fit",
        body: "Custom automation built around your day-to-day processes. Start with a repeated task and agree what a useful outcome looks like.",
      },
      {
        title: "Customer service support",
        body: "Help your team manage routine enquiries and clear handovers. We define what the system handles and when a person steps in.",
      },
      {
        title: "Ongoing care",
        body: "Monitor how the automation performs, refine its responses and adjust the workflow as your business changes.",
      },
    ],
  },
  process: {
    label: "Setup",
    title: "Built around your calls.\nTested before it takes one.",
    steps: [
      {
        title: "Understand\nyour calls",
        body: "We map the enquiries you receive, what gets missed and where your team needs support.",
      },
      {
        title: "Build around\nyour business",
        body: "We configure the agent with your services, tone of voice and the questions callers ask.",
      },
      {
        title: "Test the\nhandover",
        body: "We test realistic calls and refine responses, routing and escalation before launch.",
      },
      {
        title: "Launch,\nthen refine",
        body: "We monitor the system after launch and improve it as we learn from real enquiries.",
      },
    ],
  },
  faq: {
    label: "FAQ",
    title: "Good questions.\nClear answers.",
    items: [
      {
        question: "Who is an AI receptionist for?",
        answer:
          "An AI receptionist can suit small businesses and busy teams that receive repeat enquiries or struggle to answer calls while working. We start by reviewing your call types, workload and handover needs to see where automation would be useful.",
      },
      {
        question: "What happens when the AI can’t answer?",
        answer:
          "The agent follows the handover rules agreed for your business: route the call or take a message with the caller’s details. We define those limits during setup and test the situations that need a person.",
      },
      {
        question: "Will callers know they’re speaking to AI?",
        answer:
          "We recommend introducing the agent clearly as an AI assistant. Its opening message, tone and handover language are configured with you so callers understand who they’re speaking to and what help is available.",
      },
      {
        question: "Can I keep my existing business phone number?",
        answer:
          "We review your current phone setup and confirm the available connection options before you commit. Your provider and configuration determine what’s possible, so we confirm compatibility and any changes needed during discovery.",
      },
      {
        question: "How long does AI receptionist setup take?",
        answer:
          "Setup depends on the call flows, business information and connections required. We agree the scope and timeframe after discovery, then allow time to test and refine the agent before launch.",
      },
      {
        question: "How much does AI business automation cost?",
        answer:
          "The scope depends on call volume, the tasks your agent handles and the workflows involved. Book a discovery call and we’ll prepare a proposal around your requirements, including the setup and ongoing support.",
      },
    ],
  },
  footer: {
    title: ["More time.", "For your team."],
    body: "Tell us where calls or repetitive tasks slow you down. We’ll scope a useful place to start.",
  },
} as const;

export default automation;
