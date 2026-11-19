# Muhammad Fuzail — Developer Portfolio

A responsive, single-page portfolio built with Next.js. It presents Muhammad Fuzail’s background, skills, projects, learning journey, and contact information in a dark-first design with a light theme option.

## Features

- Responsive portfolio sections for introduction, about, skills, projects, learning journey, and contact.
- Dark theme by default with a light/dark toggle.
- Scroll reveals and motion effects that respect reduced-motion preferences.
- Profile image, introduction video, and downloadable resume.
- Contact form that validates submissions on the server and stores messages in Supabase.
- Contact messages are stored in Supabase only; email notifications are not configured.

## Technologies

- Next.js 16 App Router and React 19
- JavaScript (no TypeScript)
- Tailwind CSS 4 and project styles in `app/globals.css`
- Framer Motion
- Supabase JavaScript client
- ESLint

## Getting started

You’ll need Node.js and npm installed.

1. Install the project dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add the values for your Supabase project. Keep `.env.local` private; it is excluded by `.gitignore`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The contact endpoint expects a Supabase table named `public.contact_messages` with `name`, `email`, and `message` columns. The API route inserts submissions into this existing table; database schema is managed in Supabase, not by this project.

## Environment variables

Set these in the root `.env.local` file for local development:

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL used by the server-side contact route. |
| `SUPABASE_SECRET_KEY` | Supabase secret API key used by the server-side contact route to insert messages. |

The secret key is privileged. Keep both values server-side: do not add a `NEXT_PUBLIC_` prefix, hard-code the key, commit `.env.local`, or expose the key in client components. Use the placeholder values in `.env.example` as a template.

## Common commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run lint` | Check JavaScript and JSX with ESLint. |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Serve the production build; run `npm run build` first. |

## Deployment

The project can be deployed on [Vercel](https://vercel.com):

1. Import the project’s Git repository into Vercel.
2. Add `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in the Vercel project’s Environment Variables settings for each environment where the contact form should work.
3. Build and deploy using the Next.js framework settings. The project build command is `npm run build`.

Keep the Supabase secret in Vercel’s environment settings; never place it in source files. The contact route only stores submissions in Supabase. Resend and other email notification services are not part of this project setup.
