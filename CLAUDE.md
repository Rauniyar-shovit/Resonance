# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Resonance is an AI voice-generation platform built on Next.js 16 (App Router) with Clerk auth, Prisma 7 + Postgres, and shadcn/base-ui components.

## Critical: Next.js 16

This project pins **Next.js 16.2** and **React 19.2**, which differ from older conventions. Before writing framework code, read the relevant guide under `node_modules/next/dist/docs/`. Two concrete consequences already in this repo:

- **Middleware lives in `proxy.ts`** at the project root, not `middleware.ts`. This is where the Clerk auth flow runs.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint.config.mjs)
```

There is **no test framework configured** — no `test` script, runner, or test files exist.

### Prisma / database

```bash
npx prisma migrate dev --name <name>   # create + apply a migration
npx prisma generate                    # regenerate the client (also runs on postinstall)
npx prisma studio                      # inspect data
```

- The Prisma client is generated to `lib/generated/prisma/` (git-ignored, regenerated via the `postinstall` hook). Never edit generated files.
- Config lives in `prisma.config.ts`, which loads `DATABASE_URL` from `.env` via `dotenv`. The `schema.prisma` `datasource` block intentionally has **no `url`** — the connection is supplied through the driver adapter and config file instead.

## Architecture

**Auth & multi-tenancy (Clerk organizations).** `proxy.ts` runs `clerkMiddleware` on every non-static route. The flow: public routes (`/sign-in*`, `/sign-up*`) pass through; unauthenticated users hit `auth.protect()`; **authenticated users without an active organization are redirected to `/org-selection`**. As a result, essentially all app logic can assume both a `userId` and an `orgId` exist. Personal accounts are disabled (`hidePersonal` on the org list).

**Data model is org-scoped.** Both Prisma models (`Voice`, `Generation` in `prisma/schema.prisma`) carry an `orgId` and are indexed on it. When querying, always scope by the current org's `orgId` — this is the tenant boundary. `r2ObjectKey` fields reference audio objects stored in Cloudflare R2. `Voice.variant` distinguishes `SYSTEM` (shared, `orgId` null) from `CUSTOM` (org-owned) voices.

**Database access.** Import the shared client from `lib/db.ts` (`import { prisma } from "@/lib/db"`). It uses the `@prisma/adapter-pg` driver adapter over a `pg` pool and memoizes the client on `global` outside production to survive hot reloads. Import Prisma types from `lib/generated/prisma/client`, **not** `@prisma/client`.

**Environment variables** are validated with `@t3-oss/env-nextjs` + zod in `lib/env.ts`. Add new vars there (not raw `process.env` reads) so they're type-checked; set `SKIP_ENV_VALIDATION` to bypass during tooling.

**UI layer.** shadcn components (style `base-nova`, built on `@base-ui/react`) live in `components/ui/`; add new ones via the `shadcn` CLI rather than hand-authoring. Use the `cn()` helper from `lib/utils.ts` for class merging. The root `app/layout.tsx` wraps everything in `ClerkProvider`, loads Inter + Geist Mono fonts as CSS variables, and mounts the `sonner` `<Toaster />`. Theming uses `next-themes`.

## Conventions

- Path alias `@/*` maps to the project root (e.g. `@/components/ui/button`, `@/lib/db`).
- TypeScript is `strict`. Server Components are the default (`rsc: true`); mark client components with `"use client"`.
