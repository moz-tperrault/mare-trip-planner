@AGENTS.md

# Maré (formerly Trip Planner)

A luxury wellness travel concierge — wellness retreats, spa resorts, and slow-travel sanctuaries. UI was originally translated from the Travenor Figma file (`zSxLNW6SW2zEFoN4nQA1ob`) then rebranded around emotional escape, quiet luxury, and sensory immersion (inspirations: Explora Journeys, Kempinski, Castelfalfi, Miraval, Mirbeau).

## Stack

- Next.js 16 (App Router, async params) + React 19
- TypeScript (strict)
- Tailwind CSS v4 with brand tokens in `src/app/globals.css`
- Typography: Geist (body) + Cormorant Garamond (display, mapped to `--font-display` and applied to h1/h2/h3 and `.font-display`)
- shadcn/ui (neutral base, CSS variables) — components live in `src/components/ui/`
- Planned: Supabase for database, auth, and AI features

## Domain model

Defined in `src/types/index.ts`:

- `Destination` — name, country, location, description, image + gallery, rating, review count, price, friends going, extra friend count
- `Trip` — `destinationId`, date range, notes, itinerary of `ScheduleItem[]`
- `ScheduleItem` — one itinerary entry (date, optional times, title, location, notes)
- `Message` — a note/message attached to a trip

Mock data lives in `src/lib/data.ts` (destinations, trips, conversations, chat threads, notifications) and `src/lib/trip-packages.ts` (curated trip packages).

## Route groups

- `src/app/(app)/` — main app shell (top bar + bottom nav on mobile via `AppShell`)
- `src/app/(auth)/` — full-bleed splash, onboarding, and auth screens

## Routes

Main app:
- `/` — Home (hero + destination grid)
- `/destinations` — Popular Places
- `/destinations/all` — All Popular Trip Package
- `/destinations/[id]` — Destination Details
- `/destinations/[id]/gallery` — gallery + map "View"
- `/trips` — Your Trips + Favorite Places
- `/trips/[id]` — redirects to `/trips/[id]/schedule`
- `/trips/[id]/schedule` — Schedule with date strip
- `/trips/[id]/messages` — per-trip notes thread (placeholder)
- `/messages` — conversations inbox
- `/messages/[id]` — Chat thread
- `/search` — Search Places
- `/profile` — Profile + stats + menu
- `/profile/edit` — Edit Profile
- `/notifications` — Notification tabs + list

Auth + onboarding:
- `/splash` — brand splash
- `/onboarding` — 3-step carousel
- `/auth/sign-in` / `/auth/sign-up`
- `/auth/forgot-password` / `/auth/forgot-password/success`
- `/auth/verify` — OTP

## Brand tokens

In `src/app/globals.css` `:root` (luxury wellness palette):
- `--background` `#f7f1e4` (warm ivory), `--foreground` `#1b2a31` (deep ocean ink)
- `--primary` `#0e3a4a` (deep ocean blue) — main CTA color
- `--action` `#b58239` (sunset gold) — accents, italic display words, "see all" links
- `--muted-foreground` `#76705f` (warm stone)
- `--accent` / `--frame-shape` `#d6e3da` (seafoam)
- `--success` `#6e8b6a` (sage)
- Named tones also exported: `seafoam`, `sand`, `sage`, `stone`, `ocean-deep`, `ocean-soft`, `gold`
- Shadows: `--shadow-card` / `--shadow-card-hover` (now softer, ocean-tinted)

## Voice & copy

- Editorial, sensory, restrained — never "travel influencer."
- Use roman numerals (I., II., III.) for onboarding steps, em-dashes liberally, italics on display accent words via `<em className="not-italic text-action">`.
- Don't say "Book Now" — say "Reserve a stay." Don't say "Trips" — say "Journeys." Don't say "Best Destination" — say "Editor's picks." Don't say "Favorite Places" — say "Saved escapes."
- Destination IDs reflect the rebrand: `casa-del-mare`, `olive-grove-estate`, `quiet-reef`, `marsila-springs`, `auberge-saint-bertrand`, `vondre-house`. Trip IDs: `trip-amalfi-2026`, `trip-fjord-2026`.

## Rules

- Dynamic route `params` are async (`Promise<{...}>`) — always `await` them.
- The shadcn `Button` here is `@base-ui/react` based and does NOT support `asChild` — use a styled `Link`/`<a>` directly when you want a link styled like a button.
- Components that use `onClick`, `useState`, etc. must be `"use client"` (e.g. `destination-card.tsx`, `page-header.tsx`, `onboarding/page.tsx`).
- Brand icons (Facebook, Twitter, …) aren't in this version of lucide-react — inline custom SVGs instead.
- Mock data is fine while there's no backend; swap to Supabase queries later without changing component shapes.
- Keep types in `src/types/index.ts` as the single source of truth.
- Import alias: `@/*` → `src/*`.
