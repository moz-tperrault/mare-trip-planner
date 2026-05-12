-- Maré · destinations schema + seed
-- Run this in Supabase Dashboard → SQL Editor → New query → Run.

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------
-- Table
-- ---------------------------------------------------------
create table if not exists public.destinations (
  id                uuid primary key default uuid_generate_v4(),
  slug              text unique not null,
  name              text not null,
  country           text not null,
  location          text not null,
  description       text not null,
  image_url         text not null,
  gallery_urls      text[] not null default '{}',
  latitude          double precision not null,
  longitude         double precision not null,
  rating            numeric(3,1) not null,
  review_count      integer not null,
  price_per_person  integer not null,
  created_at        timestamptz not null default now()
);

create index if not exists destinations_slug_idx on public.destinations (slug);

-- ---------------------------------------------------------
-- Trips table (a saved journey)
-- ---------------------------------------------------------
create table if not exists public.trips (
  id                uuid primary key default uuid_generate_v4(),
  destination_id    uuid references public.destinations(id) on delete set null,
  destination_slug  text not null,
  start_date        date not null,
  end_date          date not null,
  notes             text,
  created_at        timestamptz not null default now()
);

create index if not exists trips_destination_slug_idx on public.trips (destination_slug);
create index if not exists trips_start_date_idx on public.trips (start_date);

alter table public.trips enable row level security;

drop policy if exists "public can read trips" on public.trips;
create policy "public can read trips"
  on public.trips
  for select
  using (true);

-- No auth yet, so allow public inserts. Replace with `auth.uid()`-scoped
-- policies once user accounts are wired up.
drop policy if exists "public can insert trips" on public.trips;
create policy "public can insert trips"
  on public.trips
  for insert
  with check (true);

-- ---------------------------------------------------------
-- Row Level Security
-- The anon (public) key needs a SELECT policy to read rows.
-- ---------------------------------------------------------
alter table public.destinations enable row level security;

drop policy if exists "public can read destinations" on public.destinations;
create policy "public can read destinations"
  on public.destinations
  for select
  using (true);

-- ---------------------------------------------------------
-- Seed: the Maré collection
-- ---------------------------------------------------------
insert into public.destinations
  (slug, name, country, location, description, image_url, gallery_urls, latitude, longitude, rating, review_count, price_per_person)
values
  (
    'casa-del-mare',
    'Casa del Mare',
    'Amalfi Coast, Italy',
    'Praiano, Salerno',
    'A cliffside villa above the Tyrrhenian — lemon groves, linen sheets, and an infinity pool that disappears into the sea at golden hour. Days move at the speed of the tide.',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=75',
    array[
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=75',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=75',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=75'
    ],
    40.6094, 14.5350, 4.9, 421, 980
  ),
  (
    'olive-grove-estate',
    'Olive Grove Estate',
    'Tuscany, Italy',
    'Castelfalfi, Pisa',
    'A restored stone borgo set in 1,100 hectares of olive groves and forest. Long lunches, cold-pressed mornings, and an unhurried walk to the village for espresso.',
    'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1600&q=75',
    array[
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=75',
      'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?auto=format&fit=crop&w=1200&q=75'
    ],
    43.5050, 10.7975, 4.8, 286, 740
  ),
  (
    'quiet-reef',
    'The Quiet Reef',
    'North Malé Atoll, Maldives',
    'Baros Lagoon',
    'An overwater suite where the floorboards open onto turquoise. No clocks, no Wi-Fi past the threshold — only reef breakfasts, free-diving lessons, and bioluminescent nights.',
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=75',
    array[
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=75',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=75'
    ],
    4.2833, 73.4317, 4.9, 1142, 1480
  ),
  (
    'marsila-springs',
    'Marsila Springs',
    'Berkshires, USA',
    'Stockbridge, Massachusetts',
    'A wooded sanctuary of cedar saunas, salt grottoes, and silent breakfasts. Curated by Miraval-trained practitioners; designed for the digital detox you keep postponing.',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=75',
    array[
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=75',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=75'
    ],
    42.2767, -73.3170, 4.8, 537, 690
  ),
  (
    'auberge-saint-bertrand',
    'Auberge Saint-Bertrand',
    'Hautes-Pyrénées, France',
    'Saint-Bertrand-de-Comminges',
    'A nineteenth-century mountain inn restored as a thermal retreat. Mineral baths, alpine wool, and the dignified quiet of a village that closes at sundown.',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=75',
    array[
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=75'
    ],
    43.0269, 0.5781, 4.7, 312, 520
  ),
  (
    'vondre-house',
    'The Vondré House',
    'Vestland, Norway',
    'Hardangerfjord',
    'A glass-fronted cabin on the fjord with a wood-fired sauna, ice plunge, and a private dock. Northern light. Long silences. Suited to two.',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=75',
    array[
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=75',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=75'
    ],
    60.2444, 6.5237, 4.9, 198, 1120
  )
on conflict (slug) do update set
  name             = excluded.name,
  country          = excluded.country,
  location         = excluded.location,
  description      = excluded.description,
  image_url        = excluded.image_url,
  gallery_urls     = excluded.gallery_urls,
  latitude         = excluded.latitude,
  longitude        = excluded.longitude,
  rating           = excluded.rating,
  review_count     = excluded.review_count,
  price_per_person = excluded.price_per_person;
