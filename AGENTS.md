# AGENTS.md

Small single-package Next.js 16 app (task-flow client): auth UI + MongoDB via better-auth. Not a monorepo. Package manager is npm (`package-lock.json`).

## Commands

- Dev: `npm run dev` (Turbopack; rewrites the `nextjs-agent-rules` block below — commit it, don't delete it)
- Lint: `npm run lint` (runs bare `eslint` over the repo; passes clean as of 10/2026)
- No test or typecheck scripts exist. Fast typecheck: `npx tsc --noEmit` — but it only works after `next dev` or `next build` has run at least once, because `next-env.d.ts` (gitignored, auto-generated) imports `.next/dev/types/routes.d.ts`, where the global `LayoutProps` etc. live. On a fresh clone, run `npm run dev` first or fall back to `npm run build` (typechecks during build).

## Architecture

- App Router under `src/app/` with two route groups: `(auth)` (sign-in, sign-up — standalone pages under the root layout) and `(app)` (dashboard, tasks, profile — all share `src/app/(app)/layout.tsx`, a flex shell that renders `SideNavbar` beside `<main>`). Path alias `@/*` → `./src/*`.
- Auth: `src/lib/auth.ts` (better-auth server + `@better-auth/mongo-adapter`, DB name hardcoded to `"user"`). It **throws at import time if `MONGODB_URI` is unset** — a `.env` file is required even for `next build`/dev if anything imports it.
- Auth client: `src/lib/auth-client.ts` — exports `authClient` (configured with hardcoded `baseURL: http://localhost:3000`) plus `signIn, signUp, signOut, useSession` destructured from a *second unconfigured* `createAuthClient()`. Components use the latter; pick deliberately — the hardcoded localhost URL breaks in deployed environments.
- Better-auth catch-all route lives at `src/app/api/auth/[...all]/route.ts`.
- Route protection: `src/proxy.ts` — **Next 16 renamed `middleware.ts` → `proxy.ts` (middleware is deprecated; export `proxy`, not `middleware`)**. It session-checks and redirects to `/sign-in`. Its matcher covers only `/dashboard` and `/profile` — `/tasks` is currently unprotected. It imports `auth.ts`, so it needs `MONGODB_URI` at runtime too. Don't "fix" it back to `middleware.ts`.
- The dashboard fetches tasks from a **separate backend** at hardcoded `http://localhost:5000/tasks` (`getAllTasks` in `src/components/DashboardCard.tsx`) — that server is not part of this repo; the dashboard page needs it running to render.

## UI shell

- `src/components/SideNavbar.tsx` (`"use client"`) is rendered by the `(app)` layout as a flex sibling of `<main>` — it is *not* in the root layout and does not wrap `{children}`. Keep it inside `(app)/layout.tsx`; auth pages intentionally get no nav.
- Two component libs coexist: **DaisyUI v5** (`@plugin "daisyui"` in `globals.css`; utility classes like `btn`/`avatar`/`base-100` in SideNavbar and dashboard components, `data-theme="light"` set on `<html>`) and **HeroUI v3** (`@heroui/styles` import; form components on the auth pages). Don't mix them within one component.
- Still placeholders (render empty divs): `(app)/tasks`, `(app)/profile`, and the home page `src/app/page.tsx`. Sign-up redirects to `/` (the empty home page), sign-in to `/dashboard` — that's current behavior, not a bug.

## Toolchain quirks

- Next 16 with non-default flags in `next.config.ts`: `cacheComponents`, `partialPrefetching`, `experimental.agentFeedback` — consult `node_modules/next/dist/docs/` before assuming App Router defaults from older versions.
- Tailwind v4 is loaded via a Turbopack rule (`@tailwindcss/turbopack` loader for `*.css`), not PostCSS — CSS setup lives in `next.config.ts` and `src/app/globals.css` (3 lines total; no `tailwind.config`).
- Layouts/pages use Next 16 generated global types (e.g. `LayoutProps<"/">`) — don't add manual prop types for those.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
