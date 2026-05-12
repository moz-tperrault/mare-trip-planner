# Maré

**Live:** https://mare-trip-planner.vercel.app

A luxury wellness travel concierge — wellness retreats, spa resorts, and slow-travel sanctuaries. UI was translated from a Figma file (Travenor) then rebranded around emotional escape, quiet luxury, and sensory immersion (inspirations: Explora Journeys, Kempinski, Castelfalfi, Miraval, Mirbeau).

## Stack

- **Next.js 16** (App Router, async params) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** with a luxury wellness palette (ivory / deep ocean / sunset gold / seafoam / sand / sage)
- **Typography:** Cormorant Garamond (display) + Geist (body)
- **shadcn/ui** primitives (Base UI under the hood)
- **Leaflet + react-leaflet** for the destination map (SSR-safe via `next/dynamic`)
- **Supabase** (Postgres + RLS) backing the `destinations` table
- Deployed on **Vercel**

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in the two values
npm run dev
```

Visit http://localhost:3000.

## Database

To rebuild the destinations table from scratch in any Supabase project, paste `supabase/schema.sql` into Supabase SQL Editor and run it. The script is idempotent (`on conflict (slug) do update`).

## Routes

- `/` — Atlas (home, hero + editor's picks from Supabase)
- `/destinations` — the collection
- `/destinations/[slug]` — detail (Supabase row, Leaflet map)
- `/destinations/[slug]/gallery` — the view / photo gallery
- `/destinations/all` — curated retreats (date-bounded packages)
- `/trips` · `/trips/[id]/schedule` · `/trips/[id]/messages`
- `/messages` · `/messages/[id]` — concierge inbox
- `/profile` · `/profile/edit`
- `/notifications` · `/search`
- `/splash` · `/onboarding` · `/auth/{sign-in,sign-up,forgot-password,verify}` (UI only)

See `CLAUDE.md` for editorial voice rules, brand tokens, and contribution conventions.
