# AI Coding Agent Instructions

Use this file for implementation guidance. Keep the user-facing project overview, setup, and deployment instructions in `README.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project architecture

- This is a single Next.js App Router application. There is no separate backend service.
- `app/page.js` renders the portfolio. `app/layout.js` supplies the root layout and metadata, and `app/globals.css` contains the global design system and responsive styles.
- `app/components/portfolio.js` contains the portfolio UI and client-side interactions, including theme switching, navigation, motion, video modal, and contact form.
- `app/api/contact/route.js` is the server-side contact submission endpoint. It validates requests and inserts messages into the existing Supabase `public.contact_messages` table.
- `lib/supabase/server.js` creates the server-only Supabase client. Never import this module into client components.
- `public/images/`, `public/videos/`, and `public/resume/` contain assets referenced by the portfolio. Preserve their current public paths when replacing assets.

## Language and coding conventions

- Use JavaScript and JSX only. Do not add TypeScript files, TypeScript configuration, or TypeScript dependencies.
- Follow the existing App Router and functional React component patterns. Add `"use client"` only to modules that require client-side state, browser APIs, or event handlers.
- Preserve existing content, section structure, responsive behavior, accessibility, and reduced-motion support unless the user explicitly requests a change.
- Keep visual styles in the existing `app/globals.css` conventions and reuse current class names where possible. Avoid unrelated redesigns and broad formatting changes.
- Keep imports and dependencies minimal. Update `package-lock.json` whenever npm dependencies are intentionally changed.
- Do not move or rename assets without updating and checking every reference.

## Environment and security

- Local secrets belong in the root `.env.local`; use `.env.example` only for placeholder names and values. `.gitignore` excludes `.env*` while allowing `.env.example`.
- Never read secrets into reports, hard-code them, log them, or copy them into documentation or source control.
- `SUPABASE_SECRET_KEY` must remain server-side. Do not prefix it with `NEXT_PUBLIC_`, pass it to client components, or expose it in API responses.
- Keep Supabase access in server-only code. Contact submissions are stored in Supabase; do not add Resend, email notifications, authentication, or another backend unless the user explicitly asks.
- Do not create or modify Supabase tables, policies, or schema unless explicitly authorized.

## Verification and change boundaries

- For application code changes, run `npm run lint` and `npm run build`, then report the results. Do not add a test framework or run unrelated optional tests unless requested.
- Inspect relevant implementation and configuration before changing them. Keep changes focused on the user's request and avoid unnecessary restructuring.
- Preserve existing routes, form behavior, project content, and asset paths unless the user asks to change them.
- Do not push to GitHub, commit, deploy to Vercel, or modify external services without explicit authorization.
