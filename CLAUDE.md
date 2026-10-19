@AGENTS.md
# Frontend rules (read before any frontend change)

## When these rules apply

- **Scope: frontend code only.** Everything below applies when you touch UI code — files under `app/`, `components/`, and the frontend helpers/data in `lib/`, plus any `.tsx`, `.jsx`, or stylesheet file.
- **Out of scope:** build and tool config (`next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `package.json`), docs and markdown, scripts, and any backend/server-only module. Use normal good judgement there; do not apply the limits below to them.
- If a change spans both, apply these rules to the frontend files in it and leave the rest to ordinary practice.

These rules are mandatory for frontend work. They keep the UI layer clean, modular, and easy to reason about. Do not violate them, and do not silently work around them — if a rule blocks you, stop and flag it.

## Separation of concerns

- Keep concerns in separate files/layers: **UI rendering**, **data loading**, **dummy/mock data**, **real data fetching**, and **styling** must not be mixed in one file.
- UI components render props/state only. They do not fetch data, hold business logic, or define data.
- Data fetching (real) lives in its own modules (loaders/server functions/services), separate from the components that consume it.
- Dummy/mock data lives in dedicated, clearly named files (e.g. `*.data.ts` / a `data/` folder), kept apart from real fetching so it can be swapped out without touching UI.
- Derivation/business logic goes in `lib/` helpers, not inline in JSX.

## shadcn components

- **Never edit the generated shadcn component files** (e.g. `components/ui/*`). Their default source stays exactly as installed.
- Customize only at the call site by passing/overriding `className` (and props) where you use the component. No forking, no edits to the base file.

## Styling

- **Never edit `globals.css`** (the global stylesheet). Style with Tailwind utility classes / component-level classes instead.
- **Use only Tailwind's predefined utility classes.** No arbitrary values in square brackets: no `w-[372px]`, `text-[13px]`, `bg-[#1a1a1a]`, `mt-[7px]`, `grid-cols-[1fr_2fr]`, and no arbitrary properties like `[mask-type:luminance]`. Pick the nearest value from the scale (`w-96`, `text-sm`, `mt-2`) or a theme token (`bg-muted`, `text-foreground`). If nothing on the scale fits, stop and flag it rather than reaching for brackets.
- **No inline styles.** Never use the `style={{ ... }}` prop; style only through Tailwind utility classes in `className`. The same fallback applies: if a style can't be expressed with a predefined class, stop and flag it.
- Keep styling out of logic files; co-locate styles with the component that uses them.

## File size & scope

- Except dummy/mock data files, **no frontend file may exceed 150 lines of code.** If a file grows past that, split it into smaller components/helpers along concern boundaries.
- **Only build what is asked.** Do not add features, props, options, or config for hypothetical future cases.
- **Do not abstract too soon.** Prefer concrete, duplicated-but-clear code over premature shared abstractions; extract a shared piece only once there is a real, repeated need.

## Code quality & accessibility

- Follow accessibility best practices: semantic HTML, correct roles/labels, alt text, keyboard navigation, and sufficient color contrast.
- Follow general coding best practices: clear names, single responsibility per file/function, no dead or commented-out code, full TypeScript types (avoid `any`).
- Reuse existing components, helpers, and patterns before writing new ones.
- One primary component/export per file, named to match the file.
- Match the conventions, naming, and structure of the surrounding code.

## Naming conventions (frontend files)

- **Components:** `CapitalizedCase` (PascalCase) for both the component and its file — e.g. `ProfileHeader.tsx`, `LadderCellGrid.tsx`.
- **Hooks:** `camelCase` starting with `use` for both the hook and its file — e.g. `useRosterData.ts`, `useCohortFilter.ts`. Never kebab-case.
- **Non-component modules** (helpers, data, services): `camelCase` files — e.g. `roster.ts`, `aiActivity.ts`, `cohorts.ts`.

## Frontend development commands

Run the Passport UI against the mock fixture in `data/passport.data.ts`. It serves on
`http://localhost:3000`. No `.env`, database, or Identity service is required.

```sh
npm run dev
```

Run every gate below before pushing a frontend branch. All three must pass.

```sh
npm run lint
npx tsc --noEmit
npm run build
```

## Build the UI against the seeded backend data only

The seeded Skill Passport backend is the source of truth for what the UI may show. It is
fixed. Never change it, top it up, or invent data to fill a design.

**The seeded data is the ceiling.** If a design wants a field the backend does not
return, that part of the design does not ship until the backend returns it. Do not
invent the field, do not derive a plausible stand-in, and do not reach into a mock
fixture for it. A thin page on real data is information, not a bug to paper over.

Worked example: the seeded passports carry `person.displayName`, `person.avatarUrl`,
`publication.cohortLabel` and `publication.profileVerdict` as `null`. The hero therefore
renders an em dash on the API path while mock shows a name. That is correct. Filling it
from mock would make the page lie about what is published.

- **Never write to the backend or its database.** No inserts, updates, deletes, or direct
  SQL. The frontend client is `GET`-only and must stay that way.
- **Do not edit the backend's fixtures, seed script, or migrations** to make a page look
  better, and do not add rows to make a list longer.
- **Never fall back to a fixture on the API path.** A section with nothing behind it
  renders its unavailable or empty state. This is the whole point of the data-source
  split, and `src/architecture/importBoundaries.test.ts` enforces it.
- **Editing mock fixtures does not close an API-mode gap.** Both builders must keep
  describing the same shape, and mock must not become the richer of the two.
- **Check a change in fetch mode, not just mock**, before calling it done. Mock hides
  exactly the gaps this rule is about.
- **Re-run the seed only when the database is missing or broken.** It resets the
  `skill_passport` and `drizzle` schemas and destroys what is there. Capture the passport
  URLs it prints on the first run rather than re-running it to read them again.

Read `README.md` for the seed and fetch-mode commands. A change set that touches
`apps/skill-passport/` must leave `services/skill-passport-backend/` untouched, per the
service-boundary rule in `AGENTS.md`.
