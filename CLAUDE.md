# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This is a **specification-only repository**. There is no application code yet — no `package.json`, no scaffold, no git. The repo currently holds five Russian-language planning documents that define an MVP to be built. Your first implementation task will be scaffolding the Next.js app from scratch per the specs below.

**Hunar** (working codename, placeholder to be find-replaced later) is a curated, niche IT hiring marketplace for Uzbekistan. Its wedge against incumbents (hh.uz) is **quality over volume**: every job is moderated, profiles can be verified, and salaries are shown transparently in **both UZS and USD**. In the MVP the platform looks fully automated but matching is actually done by humans through an admin panel (concierge mode) to bypass the two-sided cold-start problem.

## Source-of-truth documents

Read these before implementing. They are authoritative and in Russian; defer to them over assumptions.

| Doc | Role |
|---|---|
| `PROMPT.md` | The dev-agent contract — hard rules, code conventions, working method, Definition of Done. Treat as your standing instructions. |
| `TZ.md` | Master technical spec — roles, full route map, data model, RLS rules, acceptance criteria, build phases. |
| `TZ-LANDING.md` | Spec for the `/` landing page (sections, copy guide, SEO, animations). |
| `TECH-STACK.md` | Locked stack, rationale, env vars, what is deliberately excluded. |
| `ABOUT.md` | Product/market context (the "why"). Background, not implementation. |

When code hits a fork not covered by the specs: pick the simplest working option, leave a `// ASSUMPTION:` comment, and surface it at the end rather than silently expanding scope.

## Stack (locked — do not change without asking)

- **Next.js** App Router, TypeScript strict, **Server Components by default** (`'use client'` only for interactivity)
- **Supabase** — PostgreSQL + Auth + Storage + **Row Level Security**
- **Tailwind CSS** (mobile-first, utility-first, no separate design system at start)
- **Motion (framer-motion)** — restrained animations only; must respect `prefers-reduced-motion` and never block first render
- **Zod** — server-side validation
- **Auth:** Google OAuth (primary) + GitHub OAuth (IT audience). No email/password, no SMS in MVP.

## Non-negotiable rules

These come from `PROMPT.md` §"Жёсткие правила" and `TZ.md`. Violating them means rework.

1. **RLS-first.** Every table with user data has RLS enabled with explicit policies written *alongside the schema*, before any app access. Never "turn it on later." RLS is the primary security boundary — test every policy from *other* users' accounts.
2. **CVs are private.** Resumes live only in a **private Supabase Storage bucket** enforced by Storage policies (owner + the employer whose job the candidate applied to). Never imgbb, never public, never a direct shareable link.
3. **PD consent is mandatory.** On signup, an explicit consent checkbox (linking the privacy policy); the consent fact + timestamp is written to the DB (`profiles.consent_pd_at`). Uzbekistan personal-data law applies.
4. **Contact disclosure instead of chat.** No built-in chat in MVP. After an employer sets an application to `approved`, both sides see each other's contact (Telegram/phone); further talk happens off-platform. Disclosure requires the candidate's separate consent (`applications.contact_disclosed`).
5. **Job moderation is mandatory.** A job publishes only after admin approval. Status flow: `draft → pending → approved / rejected`.
6. **Server-side validation always.** Never trust the client. Every mutation is validated server-side (Zod) and additionally protected by RLS.
7. **SEO is a requirement, not polish.** `/jobs` and `/jobs/[slug]` render server-side with `schema.org/JobPosting`, correct meta/OpenGraph, sitemap, and human-readable slugs.

## Architecture

**Three roles:** `candidate` (builds profile, applies), `employer` (posts jobs, reviews applicants), `admin/ops` (moderates jobs, verifies, runs the hidden manual matching engine, fights spam).

**Route groups** (see `TZ.md` §5 for the full map): `(public)` landing + `/jobs` + `/jobs/[slug]` + `/companies/[slug]` (SSR, SEO-critical) · `(auth)` `/login` + `/onboarding` (role choice + PD consent) · `candidate/*` · `employer/*` · `admin` · `api/` route handlers.

**Planned project structure** (from `TECH-STACK.md` §8 / `PROMPT.md`):
```
app/         # routes, organized by the groups above
components/   # reusable UI (PascalCase)
lib/
  supabase/  # server + browser clients (separate)
  db/        # DB queries
  validation/# zod schemas
types/        # shared types
```

**Two Supabase clients:** a server client (`createServerClient`) and a browser client (`createBrowserClient`). The `service_role` key is **server-only** — never in the browser bundle. Admin full-access goes through server code with `service_role`, never the client.

**Data model** (PostgreSQL, snake_case, all user tables RLS-on — full columns in `TZ.md` §6):
`profiles` · `candidate_profiles` · `companies` · `jobs` · `applications` · `moderation_logs`.

Key RLS invariants: candidate sees/edits only their own profile + applications; employer sees applications only for their own jobs; candidate contact fields are visible to an employer only when `application.status = approved` AND `contact_disclosed = true`; publicly only `jobs.status = approved` are visible.

**Search & matching (v1):** Postgres full-text search + `pg_trgm` + GIN index on the `skills` array — no Elasticsearch. Matching is **rule-based scoring** (skills overlap + format/location + salary-band overlap + grade) shown as a *hint to the admin*; the final match is made by a human. No ML.

**Localization:** UI in RU + UZ (toggle). The candidate's English CV is a separate entity (intentional, in scope).

## Conventions

- snake_case for table/column names; PascalCase for components.
- Server Components by default; `'use client'` only where interactivity is needed.
- Form validation = Zod + Server Actions / Route Handlers for mutations.
- Secrets only via env vars, never in code. `service_role` and `IMGBB_API_KEY` are server-only.
- Env vars (`TECH-STACK.md` §10): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `IMGBB_API_KEY`, `NEXT_PUBLIC_SITE_URL`.
- Supabase migrations live in the repo (Supabase CLI).

## Explicitly out of MVP scope

Real-time chat · email/SMS/push notifications · payments/billing (employers enabled manually by a flag) · automated skill tests (verification badge is set manually by admin) · ML matching · native mobile app (responsive web / PWA only) · full English UI · microservices / Kubernetes / Elasticsearch / Redis.

Do not add any of these "while you're at it" — ask first.

## Working method

1. Propose an implementation plan + folder structure and wait for an OK before coding.
2. Build in **vertical slices**: DB schema + RLS → auth → one full feature (UI + server + policy) → next.
3. After each slice, give a short summary: what's done, any `ASSUMPTION`s, what remains.
4. Never widen scope silently.
5. Verify RLS separately per role — confirm other users' data is inaccessible.

Build phases (`TZ.md` §14): (1) skeleton + DB schema + RLS + auth/onboarding → (2) candidate → (3) employer → (4) admin → (5) landings + SEO + legal pages + RLS/security hardening.

## Commands

No toolchain exists yet — there is no `package.json`. Once the Next.js app is scaffolded, the standard commands will apply (`npm run dev` / `build` / `lint`) plus the Supabase CLI for migrations. **Update this section with the real, verified commands as soon as the project is scaffolded.**
