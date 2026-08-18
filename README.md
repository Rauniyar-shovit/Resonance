# Resonance

An AI voice-generation platform. Clone a voice from a few seconds of audio, then
use it to generate speech — with every voice and every generation owned by an
organization rather than by one person.

Built on Next.js 16 (App Router), Clerk organizations, Prisma 7 + Postgres,
Cloudflare R2, and a Chatterbox TTS backend, with usage metered through Polar.

---

## What it does

- **Voice cloning.** Upload or record an audio sample (5 s minimum, up to 4 MB)
  and Resonance creates a reusable custom voice for the whole workspace.
- **Text to speech.** Write up to 5,000 characters, pick a voice, and shape the
  read with temperature, top-p, top-k and repetition-penalty controls.
- **A shared library.** 20 built-in system voices plus whatever the team clones,
  searchable by name, description, category and locale.
- **Generation history.** Every generation is stored and replayable, with its
  audio served through the app rather than from a public bucket URL.
- **Usage billing.** Voice creation and speech generation are metered to Polar
  and charged per use.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16.2 (App Router), React 19.2 |
| Auth & tenancy | Clerk, organizations only (personal accounts disabled) |
| API | tRPC 11 + TanStack Query |
| Database | Postgres via Prisma 7 (`@prisma/adapter-pg` driver adapter) |
| Object storage | Cloudflare R2 (S3-compatible) |
| Speech model | Chatterbox Turbo, called over a typed OpenAPI client |
| Billing | Polar (checkout, customer portal, usage meters) |
| UI | shadcn (`base-nova` style) on `@base-ui/react`, Tailwind v4 |
| Forms & state | TanStack Form, `nuqs` for URL state, `zod` for schemas |
| Monitoring | Sentry |

---

## Getting started

### Prerequisites

- Node.js 20+
- A Postgres database
- Accounts for Clerk, Cloudflare R2, and Polar
- A reachable Chatterbox TTS API

### Setup

```bash
npm install                 # also runs `prisma generate` via postinstall
cp .env.example .env        # then fill it in — see Environment below
npx prisma migrate deploy   # apply migrations
npx prisma db seed          # upload + register the 20 built-in system voices
npm run dev                 # http://localhost:3000
```

> The seed script uploads the `.wav` files in `scripts/system-voices/` to R2 and
> writes the matching `Voice` rows, so R2 credentials must be set before it runs.

### Environment

Server variables are validated at startup by `lib/env.ts`
([@t3-oss/env-nextjs](https://env.t3.gg) + zod). Add new variables **there**
rather than reading `process.env` directly, so they stay type-checked. Set
`SKIP_ENV_VALIDATION=1` to bypass validation for tooling and builds.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `APP_URL` | Public origin, used as the Polar checkout return URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend key |
| `CLERK_SECRET_KEY` | Clerk backend key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `..._SIGN_UP_URL` | Auth route paths |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL` / `..._SIGN_UP_...` | Post-auth destinations |
| `R2_ACCOUNT_ID` | Cloudflare account the bucket lives in |
| `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | R2 API token pair |
| `R2_BUCKET_NAME` | Bucket holding voice samples and generated audio |
| `CHATTERBOX_API_URL` | Base URL of the TTS API |
| `CHATTERBOX_API_KEY` | Sent as the `x-api-key` header |
| `POLAR_ACCESS_TOKEN` | Polar API token |
| `POLAR_SERVER` | `sandbox` (default) or `production` |
| `POLAR_PRODUCT_ID` | Product used for checkout |
| `POLAR_METER_VOICE_CREATION` | Meter for voice clones |
| `POLAR_METER_TTS_GENERATION` | Meter for speech generations |
| `POLAR_METER_TTS_PROPERTY` | Meter property carrying the billable amount |
| `SENTRY_AUTH_TOKEN` | Source-map upload at build time (optional locally) |

Only variables listed in `lib/env.ts` are validated; the Clerk and Sentry ones
are read by their own SDKs.

---

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (flat config, eslint.config.mjs)
npm run sync-api   # regenerate Chatterbox API types from its OpenAPI spec
```

Prisma:

```bash
npx prisma migrate dev --name <name>   # create + apply a migration
npx prisma generate                    # regenerate the client
npx prisma db seed                     # seed system voices
npx prisma studio                      # inspect data
```

There is **no test framework configured** — no test script, runner, or test
files exist.

---

## Architecture

### Middleware lives in `proxy.ts`

Next.js 16 renamed `middleware.ts` to **`proxy.ts`**. That file runs
`clerkMiddleware` on every non-static route and enforces the whole auth flow:

1. `/`, `/sign-in*` and `/sign-up*` pass through as public routes.
2. Everything else requires a signed-in user (`auth.protect()`).
3. A signed-in user **without an active organization** is redirected to
   `/org-selection`.

Because of step 3, essentially all app code can assume both a `userId` and an
`orgId` exist.

### The organization is the tenant boundary

Both Prisma models — `Voice` and `Generation` — carry an `orgId` and are indexed
on it. Every query must be scoped by the current org. `Voice.variant`
distinguishes `SYSTEM` voices (shared, `orgId` null) from `CUSTOM` ones
(org-owned).

tRPC enforces this with `orgProcedure` in `trpc/init.ts`, which rejects requests
without an organization and puts `orgId` on the context.

### Audio never leaves the app's control

`r2ObjectKey` columns point at objects in R2. Clients fetch audio through
`/api/audio/[generationId]` and `/api/voices/[voiceId]`, which check org
ownership first — the bucket is never addressed directly from the browser.

### Voice creation is a route handler, not a tRPC mutation

`POST /api/voices/create` takes the raw audio body (tRPC is a poor fit for
binary uploads). It checks the Polar subscription, validates size and duration,
writes the `Voice` row, uploads to R2, then ingests the usage event — rolling
back the row if the upload fails.

### Database access

Import the shared client from `lib/db.ts` (`import { prisma } from "@/lib/db"`).
It uses the `@prisma/adapter-pg` driver adapter over a `pg` pool and memoizes the
client on `global` outside production to survive hot reloads.

The generated client lands in `lib/generated/prisma/` (git-ignored, rebuilt by
the `postinstall` hook) — **import Prisma types from
`@/lib/generated/prisma/client`, not `@prisma/client`**, and never edit
generated files.

`prisma.config.ts` supplies the connection URL and loads `.env` via `dotenv`;
the `datasource` block in `schema.prisma` deliberately has **no `url`**.

---

## Project structure

```
app/                    routes (App Router)
  api/                  route handlers: trpc, audio streaming, voice upload
  dashboard/            the signed-in workspace
  sign-in/ sign-up/     Clerk-hosted auth pages
  org-selection/        organization picker
features/               feature-first modules
  billing/              Polar checkout, portal, usage meters
  dashboards/           workspace shell and sidebar
  landing/              marketing page
  text-to-speech/       the generation editor
  voices/               voice library, cloning, recorder
components/ui/          shadcn primitives (base-nova)
lib/                    db, env, r2, polar, chatterbox, formatting helpers
trpc/                   router, context, server/client wiring
prisma/                 schema and migrations
scripts/                seeding and API type generation
proxy.ts                Clerk middleware (Next.js 16 name)
```

## Conventions

- Path alias `@/*` maps to the project root.
- TypeScript is `strict`; Server Components are the default — mark client
  components with `"use client"`.
- Add UI primitives with the `shadcn` CLI rather than hand-authoring them, and
  merge classes with `cn()` from `lib/utils.ts`.
- Prices are formatted through `lib/currency.ts` (billing quotes AUD) rather
  than hand-written dollar signs; shared rate copy lives in `lib/specs.ts`.
- Theming is a `.dark` class on `<html>`, driven by `useIsDarkTheme` in
  `components/theme-toggle.tsx`. `next-themes` is installed but no provider is
  mounted — don't run both.
- Clerk's components are styled from `lib/clerk-appearance.ts`, which restates
  the palette in sRGB because Clerk is handed colours as values rather than
  reading the cascade.


