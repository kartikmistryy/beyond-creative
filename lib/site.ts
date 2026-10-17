// Static site copy. Projects live in the CMS (/admin); everything else is edited here.
// TODO(content): placeholder contact details — replace before launch.
export const site = {
  name: "Beyond Creative",
  email: "hello@beyondcreative.studio",
  phone: "+91 00000 00000",
  city: "Mumbai, India",
  // Home background reel (mp4/webm URL or /uploads/… path). Empty = first featured project's hero.
  reel: "",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Vimeo", href: "https://vimeo.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
};

// px of scroll over which the home intro card opens to full screen (shared by Header + home spacer)
export const INTRO_RANGE = 650;

export const nav = [
  { href: "/projects", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/ai-automation", label: "AI Automation" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type Service = { slug: string; title: string; blurb: string; deliverables: string[] };

export const services: Service[] = [
  {
    slug: "film-production",
    title: "Film & Video Production",
    blurb: "Brand films, commercials and launch videos — from treatment to final grade, made by one crew that cares about every frame.",
    deliverables: ["Concept & treatment", "Production", "Direction", "Edit, grade & sound", "Cutdowns for every platform"],
  },
  {
    slug: "content",
    title: "Social & Content Creation",
    blurb: "Always-on content that looks like it belongs in the feed and still feels like your brand. Reels, shorts, series.",
    deliverables: ["Content strategy", "Reels & shorts", "Episodic series", "Creator collaborations", "Monthly retainers"],
  },
  {
    slug: "brand-identity",
    title: "Brand Identity",
    blurb: "Names, marks and visual systems built to move — designed for motion and screens first, print second.",
    deliverables: ["Strategy & positioning", "Logo & identity system", "Motion language", "Guidelines", "Launch toolkit"],
  },
  {
    slug: "web",
    title: "Websites & Digital",
    blurb: "Fast, editorial websites with a CMS your team will actually use. Designed and built in-house.",
    deliverables: ["UX & art direction", "Design systems", "Next.js builds", "CMS setup", "Performance & SEO"],
  },
  {
    slug: "motion",
    title: "Motion & 3D",
    blurb: "Product renders, title sequences and animated systems that explain the complicated and sell the simple.",
    deliverables: ["2D motion graphics", "3D product visuals", "Title sequences", "Explainers", "Animated brand assets"],
  },
];

export const aiAutomation = {
  title: "AI Automation & Workflows",
  blurb: "We map how work actually moves through your business, then build AI agents and automations that take the repetitive parts off your team's plate.",
};
