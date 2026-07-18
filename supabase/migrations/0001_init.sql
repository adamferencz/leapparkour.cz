-- Leap Parkour — přihlášky na kroužky a tábory
-- Spusťte v Supabase SQL editoru (nebo `supabase db push`).

-- ===== Přihlášky na kroužek =====
create table public.club_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  season text not null default 'jaro-2027',

  child_name text not null,
  email text not null,
  phone text not null,
  whatsapp_choice text not null check (whatsapp_choice in ('add', 'no_add', 'cannot', 'other')),
  whatsapp_other text,
  terms text[] not null,          -- vybrané termíny kroužku (id z konfigurace)
  health_notes text,

  status text not null default 'new' check (status in ('new', 'confirmed', 'paid', 'cancelled')),
  admin_notes text
);

-- ===== Přihlášky na tábor =====
create table public.camp_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  camp text not null default 'leapcamp-2027',

  child_name text not null,
  father_name text not null,
  mother_name text not null,
  email text not null,
  child_age int not null check (child_age between 1 and 25),
  child_birthdate date not null,
  phone_mother text not null,
  phone_father text not null,
  health_notes text not null,
  sports text[] not null,         -- vybrané sporty
  sports_other text,
  roommates text,                 -- s kým chce být v chatce/pokoji

  status text not null default 'new' check (status in ('new', 'confirmed', 'paid', 'cancelled')),
  admin_notes text
);

-- ===== RLS =====
alter table public.club_registrations enable row level security;
alter table public.camp_registrations enable row level security;

-- Kdokoliv může odeslat přihlášku (insert), číst a spravovat smí jen přihlášený admin.
create policy "anon insert club" on public.club_registrations
  for insert to anon, authenticated with check (true);

create policy "admin select club" on public.club_registrations
  for select to authenticated using (true);

create policy "admin update club" on public.club_registrations
  for update to authenticated using (true);

create policy "admin delete club" on public.club_registrations
  for delete to authenticated using (true);

create policy "anon insert camp" on public.camp_registrations
  for insert to anon, authenticated with check (true);

create policy "admin select camp" on public.camp_registrations
  for select to authenticated using (true);

create policy "admin update camp" on public.camp_registrations
  for update to authenticated using (true);

create policy "admin delete camp" on public.camp_registrations
  for delete to authenticated using (true);

-- Indexy pro admin přehled
create index club_registrations_created_idx on public.club_registrations (created_at desc);
create index camp_registrations_created_idx on public.camp_registrations (created_at desc);
