# AGENTS.md

Small single-package Next.js 16 app (task-flow client): auth UI + MongoDB via better-auth. Not a monorepo. Package manager is npm (`package-lock.json`).

## Commands

- Dev: `npm run dev` (Turbopack; rewrites the `nextjs-agent-rules` block below — commit it, don't delete it)
- Lint: `npm run lint` (runs bare `eslint` over the repo; passes clean as of 10/2026)
- No test or typecheck scripts exist. Fast typecheck: `npx tsc --noEmit` — but it only works after `next dev` or `next build` has run at least once, because `next-env.d.ts` (gitignored, auto-generated) imports `.next/dev/types/routes.d.ts`, where the global `LayoutProps` etc. live. On a fresh clone, run `npm run dev` first or fall back to `npm run build` (typechecks during build).

## Architecture

- App Router under `src/app/`; path alias `@/*` → `./src/*`.
- Auth: `src/lib/auth.ts` (better-auth server + `@better-auth/mongo-adapter`, DB name hardcoded to `"user"`). It **throws at import time if `MONGODB_URI` is unset** — a `.env` file is required even for `next build`/dev if anything imports it.
- Auth client: `src/lib/auth-client.ts` — note it exports `authClient` (configured with hardcoded `baseURL: http://localhost:3000`) but also destructures `signIn, signUp, useSession` from a *second unconfigured* `createAuthClient()`. Pick deliberately; the hardcoded localhost URL breaks in deployed environments.
- Better-auth catch-all route lives at `src/app/api/auth/[...all]/route.ts`. Auth pages: `src/app/(auth)/sign-in|sign-up`. Placeholder pages `(auth)/dashboard` and `(auth)/profile` exist (currently empty).
- Route protection: `src/proxy.ts` — **Next 16 renamed `middleware.ts` → `proxy.ts` (middleware is deprecated; export `proxy`, not `middleware`)**. It session-checks `/dashboard` and `/profile` and redirects to `/sign-in`. It imports `auth.ts`, so it needs `MONGODB_URI` at runtime too. Don't "fix" it back to `middleware.ts`.

## UI shell

- `src/components/SideNavbar.tsx` (`"use client"`) wraps `{children}` in the root layout — the DaisyUI drawer markup *requires* that wrapper (`drawer-content` holds page content, `drawer-side` holds the nav). Keep the structure `<SideNavbar>{children}</SideNavbar>` when editing the layout; don't unwrap children.
- Two component libs coexist: **DaisyUI v5** (`@plugin "daisyui"` in `globals.css`; drawer/nav/buttons in SideNavbar, `data-theme="light"` set on `<html>`) and **HeroUI v3** (`@heroui/styles` import; used by the auth pages). Don't mix them within one component.
- SideNavbar is intentionally UI-only: nav items are placeholder buttons and auth buttons have empty TODO `onClick`s — wiring routes/`Link`, `useSession`, and `signOut()` is future work, not a bug.

## Toolchain quirks

- Next 16 with non-default flags in `next.config.ts`: `cacheComponents`, `partialPrefetching`, `experimental.agentFeedback` — consult `node_modules/next/dist/docs/` before assuming App Router defaults from older versions.
- Tailwind v4 is loaded via a Turbopack rule (`@tailwindcss/turbopack` loader for `*.css`), not PostCSS — CSS setup lives in `next.config.ts` and `src/app/globals.css` (no `tailwind.config`). `globals.css` also imports `@heroui/styles` (HeroUI v3 is the component library used by the auth pages).
- Layouts/pages use Next 16 generated global types (e.g. `LayoutProps<"/">`) — don't add manual prop types for those.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
