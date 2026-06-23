# IT Hunar

Curated IT hiring marketplace for Uzbekistan. Every job is moderated, profiles can be
verified, and salaries are shown transparently in both **UZS and USD**. Built as an MVP;
`Hunar` ("craft/skill" in Uzbek) is the working codename.

> Product specs live in the repository root: `TZ.md` (master), `TZ-LANDING.md`,
> `TECH-STACK.md`, `PROMPT.md`, `ABOUT.md`. `CLAUDE.md` is the agent-facing guide.

## Stack

Next.js 16 (App Router, RSC) · React 19 · TypeScript · Tailwind CSS v4 · Supabase
(`@supabase/ssr`) · Zod · Motion · Phosphor icons. Package manager: **bun**.

## Architecture

Frontend follows **Feature-Sliced Design** under `src/` with a thin Next routing layer:

```
src/
  app/        # Next.js routing only (layouts, pages, sitemap.ts, robots.ts)
  views/      # page compositions (FSD "pages" layer, renamed)
  widgets/    # composed blocks (site header, footer)
  features/   # user actions (job-search)
  entities/   # domain models + UI (job)
  shared/     # ui, lib, config, supabase clients
```

Import rule: a layer may only import from layers below it
(`app → views → widgets → features → entities → shared`). Each slice exposes a public API
via `index.ts`. Alias `@/*` → `src/*`. See `CLAUDE.md` for the full guide.

## Getting started

```bash
bun install
cp .env.example .env   # fill Supabase values
bun run dev            # http://localhost:3000
```

## Scripts

| Command | Purpose |
|---|---|
| `bun run dev` | Dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` / `lint:fix` | ESLint |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run format` / `format:check` | Prettier |

## Status

Scaffolded skeleton plus the Uzbek landing page (`/`). SEO is wired via the metadata API,
`app/sitemap.ts`, and `app/robots.ts`. Fresh-jobs data is currently mock and swaps for a
Supabase query once the DB schema lands. Not built yet: auth, DB schema/RLS, and the
candidate/employer/admin flows (see `TZ.md` §14 for phases).
