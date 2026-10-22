# Beyond Creative redesign

Source: the approved desktop artboards in [Paper](https://app.paper.design/file/01M54C501FGCTMKR6R15QGYC3B).

## Preview

```sh
npm run dev -- --port 3001
```

Public routes: `/`, `/about`, `/services`, `/projects`, `/contact`, and `/services/ai-business-automation`.
`/ai-automation` redirects permanently to the new service URL.
The three Paper project templates live under `/projects/moti-mahal`, `/projects/indian-care`, and `/projects/beta-panels`.
Legacy CMS project slugs still resolve through their original data loader.

## Structure

- `components/redesign/`: shared shell, editorial sections, project templates and voice controls.
- `components/redesign/theme.css`: Tailwind theme tokens from Paper; the existing `app/globals.css` is untouched.
- `lib/redesign/data/`: approved page copy, clearly separated project-preview content, navigation and widget configuration.
- `lib/redesign/`: page derivation, legacy CMS loading and interaction hooks.
- `public/images/paper/`: local WebP exports of the actual approved imagery. The logo is an exported transparent PNG.

The original `lib/db.ts`, authentication, admin screens, upload routes and backend actions remain unchanged.
The work index uses equal cards; only the homepage uses the editorial bento layout.
Services stay a horizontal carousel on the homepage. AI is first in the services-page listing.

## Motion

Framer Motion powers the public-page motion through `SiteMotion` and `useSiteMotion`.
Shared timing and reveal presets live in `lib/redesign/data/motion.data.ts`.
Headings reveal line by line; marked copy, service rows, process steps, FAQ rows,
client logos and footer columns enter as they reach the viewport. Project imagery
uses a curtain reveal, with image zoom and arrow movement on hover or keyboard focus.
The homepage background moves gently with desktop scrolling, and an orange reading
progress line follows each page. The mobile menu uses Framer Motion enter/exit states.

The motion scope remounts on route changes without remounting the voice assistant.
Content is visible in server HTML before motion initializes. Reveals run once per
page visit; mobile timings are shorter and hero parallax is desktop-only. Changing
the reduced-motion preference restores the static content immediately.
The provider-owned voice orb keeps its existing animation.

## Content and integration limits

- Contact email, phone, social destinations and the founder portrait are placeholders approved for this preview.
- Client imagery is real, but the project services and descriptions remain the approved dummy template copy, not verified case-study claims.
- The voice assistant retains the existing Beta Panels test integration. Its external provider owns the conversation UI, microphone flow, recording and session limits. The native floating orb launcher and all demo CTAs use the same instance. Replace the configuration with the production Beyond agent before publishing; do not add credentials to frontend source.
- Metadata titles and descriptions are present. No production domain, canonical URL or business contact structured data is invented.

## Checks

```sh
npm run lint
npx tsc --noEmit
npm run build
node scripts/check-redesign.mjs
```

The small content/navigation check also checks local asset references and the copied frontend file-size/style rules.
Browser review covers desktop and mobile layouts, menu navigation, carousel controls, service hover/focus states, project links, contact details and voice-widget opening/closing. It does not verify a real spoken conversation or production bot configuration.

Motion review: desktop/mobile scroll sweeps across the public routes; timed image-reveal assertions; one-shot reveal behavior; keyboard hover/reset; last carousel-card reveal; mobile-menu navigation; and live reduced-motion preference changes. No new browser runtime errors were observed.
